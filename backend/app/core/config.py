import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "CaptionAI"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    CORS_ORIGINS: list = ["*"]

settings = Settings()
