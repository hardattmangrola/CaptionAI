# 📸 CaptionAI - Gemini Edition

An advanced AI-powered Image Caption Generator using **Google's Gemini 2.5 Flash** model.  
Upload an image, configure your preferences, and generate creative, multilingual, platform-optimized captions instantly.

<div align="center">
  <video src="demo.mp4" autoplay loop muted playsinline width="100%"></video>
</div>

---

## ✨ New Features
- **♊ Powered by Gemini 1.5**: Faster, smarter, and more creative captions.
- **🎨 Caption Innovations**:
    - **Multiple Variations**: Generate 1-5 unique captions at once.
    - **Tone Control**: Choose from Creative, Funny, Professional, Poetic, etc.
    - **Creativity Slider**: Adjust the "temperature" for more predictable or wild results.
    - **Multilingual**: Instant translation to Spanish, Hindi, French, and more.
- **📱 Social Ready**: Optimized formats for Instagram, Twitter/X, LinkedIn.
- **#️⃣ Hashtag Generator**: Auto-generates trending hashtags based on the image.
- **📜 History**: Keeps track of your recent session generations.
- **⚡ Performance**: Async processing with server-side caching for duplicate requests.

---

## 🛠 Tech Stack
- **Backend**: FastAPI (Modular), Google Generative AI (Gemini), Pydantic
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Three.js
- **Model**: Gemini 2.5 Flash

---

## 🚀 Getting Started

### 1. Backend Setup
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
├── backend/
│   ├── app/
│   │   ├── api/         # Routes
│   │   ├── core/        # Config & Settings
│   │   ├── models/      # Pydantic Schemas
│   │   └── services/    # Gemini & Cache Logic
│   └── main.py          # Entry Point
├── frontend/
│   ├── src/
│   │   ├── components/  # Slides & UI
│   │   └── App.jsx      # Main Logic
└── requirements.txt
```
