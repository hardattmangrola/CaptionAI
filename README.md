# 📸 CaptionAI

**Unleash the stories hidden in your photos.**  
CaptionAI transforms your static images into compelling narratives, witty one-liners, and viral-ready social posts instantly. Powered by next-generation AI, it sees what you see—and finds the perfect words to say it.

<div align="center">
  <video src="demo.mp4" controls autoplay loop muted width="100%"></video>
  <br/>
  <em>See CaptionAI in action</em>
</div>

---

## ✨ Why CaptionAI?

CaptionAI isn't just an image tagger; it's your creative writing partner. Whether you need a professional LinkedIn description or a hilarious caption for Instagram, CaptionAI adapts to your voice.

### 🌟 Key Features
- **🧠 Advanced Visual Understanding**: Goes beyond basic object detection to understand context, mood, and lighting.
- **🎨 Infinite Variations**: Never settle for the first draft. Generate multiple unique angles for every image.
- **🎭 Tone Chameleon**: Switch modes instantly—from **Professional** and **Descriptive** to **Sarcastic**, **Funny**, or **Poetic**.
- **🌡️ Creativity Control**: Dial in the perfect balance between accurate description and wild imagination with our custom temperature slider.
- **🌍 Global Speak**: Instantly generate captions in **English, Spanish, Hindi, French, German**, and more.
- **📱 Platform Optimized**: Get output tailored specifically for **Instagram**, **Twitter/X**, **LinkedIn**, or **TikTok** layouts.
- **#️⃣ Smart Hashtags**: Boost your reach with AI-curated, trending hashtags relevant to your image content.
- **📜 Session History**: Automatically saves your generated captions so you never lose a great idea.

---

## 🛠 Tech Stack

Built with a modern, modular architecture designed for speed and scalability.

- **Backend**: 
    - **Framework**: FastAPI (High-performance, async Python web framework)
    - **AI Engine**: **Google Gemini 2.5 Flash** (State-of-the-art multimodal model)
    - **Architecture**: Modular service-based design with Pydantic validation
- **Frontend**: 
    - **Core**: React 19 + Vite (Blazing fast build & HMR)
    - **Styling**: Tailwind CSS v3 (Custom design system)
    - **Animations**: Framer Motion & Three.js (Immersive particle backgrounds)
    - **Icons**: Lucide React

---

## 🚀 Getting Started

Follow these steps to run CaptionAI locally on your machine.

### 1. Backend Setup
The brain of the operation.
```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install google-generativeai python-dotenv

# Create .env file with your API Key
echo "GEMINI_API_KEY=your_key_here" > .env

# Run the server
uvicorn main:app --reload
```
Server runs at: `http://localhost:8000`

### 2. Frontend Setup
The beautiful interface.
```bash
cd frontend
npm install
npm run dev
```
App runs at: `http://localhost:5173`

---

## 📂 Project Structure
```plaintext
CaptionAI/
├── backend/            # Python FastAPI Server
│   ├── app/
│   │   ├── api/        # REST API Routes
│   │   ├── core/       # Configuration & Secrets
│   │   ├── models/     # Data Validation Schemas
│   │   └── services/   # Business Logic (Gemini Code)
│   └── main.py         # Application Entry Point
├── frontend/           # React Client
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   └── App.jsx     # Main Application State
└── requirements.txt    # Python Dependencies
```

---

<p align="center">
  Made with ❤️ using <a href="https://deepmind.google/technologies/gemini/">Gemini</a>
</p>
