# 📸 CaptionAI

An AI-powered Image Caption Generator that creates meaningful captions for your images using [BLIP](https://huggingface.co/Salesforce/blip-image-captioning-base).  
Upload an image, and CaptionAI will generate a caption that you can **copy, download, or share** instantly.

---

## ✨ Features
- 🖼 Upload an image and generate AI-based captions
- 📋 One-click **Copy**, **Download**, or **Share** options
- ⚡ FastAPI backend with Hugging Face Transformers
- 🎨 Clean, responsive frontend using HTML, CSS, and JavaScript
- 🔄 Auto-reload backend during development
- 🌐 CORS-enabled API for smooth frontend-backend communication

---

## 🛠 Tech Stack
- **Backend**: FastAPI, Uvicorn, PyTorch, Hugging Face Transformers
- **Frontend**: HTML, CSS, JavaScript
- **Model**: BLIP (Salesforce/blip-image-captioning-base)
- **Others**: Pillow (image handling), python-multipart (form uploads)

---

## 📂 Project Structure

```plaintext
CaptionAI/
├── backend/
│   ├── main.py              # FastAPI backend
│   └── __pycache__/         # Python cache
├── frontend/
│   ├── index.html           # Frontend HTML
│   ├── script.js            # Frontend JS
│   └── styles.css           # Frontend CSS
├── requirements.txt         # Python dependencies

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/yourusername/CaptionAI.git
cd CaptionAI

2️⃣ Backend Setup
cd backend
pip install -r ../requirements.txt
uvicorn main:app --reload

3️⃣ Frontend Setup

Simply open frontend/index.html in your browser.
(Make sure the backend is running to generate captions!)
