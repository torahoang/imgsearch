import torch
from flask import Flask, jsonify
import os
import moondream as md
from PIL import Image
from sentence_transformers import SentenceTransformer
import numpy as np
import chromadb
from chromadb.config import Settings

app = Flask(__name__)
sentence_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2', model_kwargs={"torch_dtype": "bfloat16"})
sentence_model.bfloat16()  # convert all model weight to 16bit
backend_dir = os.path.dirname(os.path.abspath(__file__))
app_data_path = os.path.join(backend_dir, 'AppData')
model_path = os.path.join(backend_dir, 'moondream-2b-int8.mf')


# Create persistent client
client = chromadb.PersistentClient(
    path=app_data_path, #change this to user path using os
    settings=Settings(allow_reset=True)

)

###
# Create or get chroma collection
collection = client.get_or_create_collection(
    name="image_embeddings",
    metadata={"hnsw:space": "cosine"}  # Use appropriate distance metric
)

@app.route('/encode_img/<path:folder>')
def encoding_img(folder):
    files = os.listdir(folder)
    image = []  # store
    model = md.vl(model=model_path)

    for file in files:
        if (file.endswith(".png") or file.endswith(".jpg")):
            image.append(file)
    for img in image:
        full_path = os.path.join(folder, img)
        img_encoder(full_path, model)

    # del model  # Delete the Moondream model object
    # model = None  # Set to None to indicate it's unloaded
    # torch.cuda.empty_cache()  # Clear GPU cache
    return jsonify("done")


def img_encoder(img_path, model, img_id=None):
    if img_id is None:
        img_id = f"{os.path.basename(img_path)}"

    image = Image.open(img_path)
    encoded_image = model.encode_image(image)  # get the img vector embed
    captioned_image = model.caption(image=encoded_image, length="normal")["caption"]  # captioned the img and output text, single sentence
    text_embedding = paragraph_to_avg_embedding(captioned_image)

    # Store in ChromaDB
    collection.add(
        ids=[img_id],
        embeddings=text_embedding,
        metadatas=[{"file_path": img_path}]  # Add metadata with file path
        #metadata={"hnsw:space": "cosine", "hnsw:search_ef": 100} to expand neighborsearch
    )


def paragraph_to_avg_embedding(paragraph: str):
    """
        Takes a paragraph, splits it into sentences by '.', applies sentence embedding to each,
        and returns the average embedding.

        Parameters:
        - paragraph: The input paragraph.

        Returns:
        - A numpy array representing the average embedding of the paragraph.
        """
    # Split paragraph into sentences
    sentences = [s.strip() for s in paragraph.split('.') if s.strip()]

    # Get embeddings for each sentence
    embeddings = [sentence_model.encode(sentence) for sentence in sentences]

    # Average the embeddings
    avg_embedding = np.mean(embeddings, axis=0)
    return avg_embedding


@app.route('/querying/<query>')
def find_similar_images(query, n_results=3):
    # Query the collection
    query_embedding = paragraph_to_avg_embedding(query)
    result_img = []
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=n_results,
        include=['metadatas']
    )
    if results and 'metadatas' in results and results['metadatas']:
        for metadata in results['metadatas'][0]:
            if metadata and 'file_path' in metadata:
                result_img.append(metadata['file_path'])
    return jsonify(result_img)

if __name__ == '__main__':
    app.run(debug=True)
