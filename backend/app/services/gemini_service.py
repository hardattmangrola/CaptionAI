import google.generativeai as genai
from PIL import Image
import json
from app.core.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def generate_content(
        self, 
        image: Image.Image, 
        count: int = 3,
        tone: str = "Creative",
        length: str = "Medium",
        platform: str = "Instagram",
        language: str = "English",
        temperature: float = 0.7
    ):
        prompt = f"""
        Analyze the provided image and generate captions based on the following constraints:
        
        1. **Quantity**: Generate exactly {count} distinct captions.
        2. **Tone/Style**: {tone}.
        3. **Length**: {length}.
        4. **Target Platform**: {platform} (Optimize for this platform's audience).
        5. **Language**: Translate/Write in {language}.
        6. **Hashtags**: Generate 5-10 relevant and trending hashtags based on visual content.
        
        **Output Format**:
        Return ONLY a raw JSON object (no markdown formatting, no backticks) with the following structure:
        {{
            "captions": ["Caption 1", "Caption 2", ...],
            "hashtags": ["#tag1", "#tag2", ...]
        }}
        """

        generation_config = genai.types.GenerationConfig(
            temperature=temperature,
            max_output_tokens=1000,
        )

        try:
            # Gemini supports PIL images directly
            response = await self.model.generate_content_async(
                [prompt, image],
                generation_config=generation_config
            )
            
            text_response = response.text.strip()
            
            # Clean up potential markdown code blocks if the model ignores instructions
            if text_response.startswith("```json"):
                text_response = text_response[7:-3]
            elif text_response.startswith("```"):
                text_response = text_response[3:-3]
                
            return json.loads(text_response)

        except Exception as e:
            print(f"Gemini API Error: {e}")
            # Fallback in case of parsing error or API failure
            return {
                "captions": ["Could not generate specific captions. Please try again."],
                "hashtags": []
            }

gemini_service = GeminiService()
