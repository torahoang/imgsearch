from sentence_transformers import SentenceTransformer, util

def text_to_vectors(captions):
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    embeddings = model.encode(captions)
    #Compute embedding for both lists
    main_embedding_1= model.encode(captions[0], convert_to_tensor=True)
    compared_embedding_2 = model.encode(captions[1], convert_to_tensor=True)

    return util.pytorch_cos_sim(main_embedding_1, compared_embedding_2)