from models.saleforcemodel import img_to_text_saleforce
from models.nlpmodel import img_to_text_nlp
img= 'football.png'
current_model = "saleforce_model"
if(current_model == "saleforce_model"):
    img_to_text_nlp(img)
if(current_model == "nlpmodel"):
    img_to_text_saleforce(img)

# def scan_convert_img(img_path):
#     if img_path.endswith(".png")
