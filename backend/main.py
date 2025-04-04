from fastapi import FastAPI, File, UploadFile,Form,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import torch
from torchvision import transforms
from transformers import BlipProcessor, BlipForConditionalGeneration
import io

# Initialize FastAPI
app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend's domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load AI Model (BLIP for image captioning)
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Define response model
class CaptionResponse(BaseModel):
    caption: str

# Preprocessing function
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    transform = transforms.Compose([
        transforms.Resize((384, 384)),  # Resize for model input
        transforms.ToTensor()
    ])
    return transform(image).unsqueeze(0)  # Add batch dimension

@app.post("/generate_caption/")
async def generate_caption(file: UploadFile = File(...), timestamp: int = Form(None)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        inputs = processor(image, return_tensors="pt")

        with torch.no_grad():
            output = model.generate(**inputs)
            caption = processor.decode(output[0], skip_special_tokens=True)

        return {"caption": caption, "timestamp": timestamp}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

# Run the API using: uvicorn main:app --reload
