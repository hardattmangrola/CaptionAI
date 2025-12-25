from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from PIL import Image
import io
import hashlib
from app.services.gemini_service import gemini_service
from app.services.cache_service import cache
from app.models.schemas import CaptionResponse

router = APIRouter()

@router.post("/generate_caption/", response_model=CaptionResponse)
async def generate_caption(
    file: UploadFile = File(...),
    count: int = Form(3),
    tone: str = Form("Creative"),
    length: str = Form("Medium"),
    platform: str = Form("Instagram"),
    language: str = Form("English"),
    temperature: float = Form(0.7)
):
    try:
        image_bytes = await file.read()
        
        # Generate Cache Key (Image Hash + Params)
        image_hash = hashlib.md5(image_bytes).hexdigest()
        cache_key = f"{image_hash}-{count}-{tone}-{length}-{platform}-{language}-{temperature}"
        
        # Check Cache
        cached_result = cache.get(cache_key)
        if cached_result:
            return cached_result

        # Process Image
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Call Gemini
        result = await gemini_service.generate_content(
            image=image,
            count=count,
            tone=tone,
            length=length,
            platform=platform,
            language=language,
            temperature=temperature
        )
        
        # Determine detected language (simplified, just echoing requested)
        result["detected_language"] = language
        
        # Save to Cache
        cache.set(cache_key, result)
        
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
