from pydantic import BaseModel, Field
from typing import List, Optional

class CaptionRequest(BaseModel):
    # Additional parameters can be passed via Form data, 
    # but we define schemas for documentation and potential future usage
    pass

class CaptionResponse(BaseModel):
    captions: List[str]
    hashtags: List[str]
    detected_language: Optional[str] = "English"

class ErrorResponse(BaseModel):
    detail: str
