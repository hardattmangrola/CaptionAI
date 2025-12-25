import React, { useState } from 'react';
import ThreeBackground from './components/Visuals/ThreeBackground';
import { History, Moon } from 'lucide-react';

// Placeholders for now
import HomeSlide from './components/Slides/HomeSlide';
import ProcessingSlide from './components/Slides/ProcessingSlide';
import ConfigureSlide from './components/Slides/ConfigureSlide';
import ResultSlide from './components/Slides/ResultSlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [file, setFile] = useState(null);

  // New State for Gemini Options
  const [options, setOptions] = useState({
    count: 3,
    tone: 'Creative',
    length: 'Medium',
    platform: 'Instagram',
    language: 'English',
    temperature: 0.7
  });

  const [data, setData] = useState({ captions: [], hashtags: [] });
  const [imagePreview, setImagePreview] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history on mount
  useState(() => {
    const saved = localStorage.getItem('caption_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (newData, imgUrl) => {
    const entry = {
      id: Date.now(),
      image: imgUrl, // Note: storing blobs/urls in localstorage is tricky, usually we store base64 or just transient session history. For now session history.
      timestamp: new Date().toLocaleString(),
      ...newData
    };

    const updated = [entry, ...history].slice(0, 10); // keep last 10
    setHistory(updated);
    localStorage.setItem('caption_history', JSON.stringify(updated));
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
    setCurrentSlide(1); // Move to Configure
  };

  const handleConfigureComplete = () => {
    setCurrentSlide(2); // Move to Processing
  };

  const handleProcessingComplete = (resultData) => {
    setData(resultData);
    saveToHistory(resultData, imagePreview);
    setCurrentSlide(3); // Move to Result
  };

  const handleReset = () => {
    setFile(null);
    setData({ captions: [], hashtags: [] });
    setImagePreview(null);
    setCurrentSlide(0);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans">
      <ThreeBackground />

      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-brand-orange">Caption</span>AI
        </div>
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 text-gray-300">
            <li><button onClick={() => setShowHistory(!showHistory)} className="hover:text-white transition-colors flex items-center gap-2"><History className="w-4 h-4" /> History</button></li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
          </ul>
          <button className="p-2 rounded-full hover:bg-white/10 transition">
            {/* Always dark mode visually, but icon implies toggle */}
            <Moon className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">

        <div className="w-full max-w-4xl relative min-h-[500px] flex items-center justify-center">

          {currentSlide === 0 && (
            <HomeSlide onFileSelect={handleFileSelect} />
          )}

          {currentSlide === 1 && (
            <ConfigureSlide
              options={options}
              setOptions={setOptions}
              onNext={handleConfigureComplete}
            />
          )}

          {currentSlide === 2 && (
            <ProcessingSlide
              file={file}
              options={options}
              onComplete={handleProcessingComplete}
              onError={() => {
                alert("Error generating caption.");
                handleReset();
              }}
            />
          )}

          {currentSlide === 3 && (
            <ResultSlide
              image={imagePreview}
              data={data}
              onReset={handleReset}
            />
          )}

        </div>

        {/* History Drawer (Simple Overlay) */}
        {showHistory && (
          <div className="absolute top-20 right-4 w-80 bg-dark-800/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl z-50 max-h-[500px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Recent History</h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="space-y-4">
              {history.length === 0 && <p className="text-sm text-gray-400">No history yet.</p>}
              {history.map((entry) => (
                <div key={entry.id} className="border-b border-white/10 pb-2">
                  <p className="text-xs text-gray-500 mb-1">{entry.timestamp}</p>
                  <p className="text-sm line-clamp-2 text-gray-200">{entry.captions[0]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Dots (Visual Only or Functional) */}
        <div className="absolute bottom-10 flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-brand-orange w-6' : 'bg-gray-600'
                }`}
            />
          ))}
        </div>

      </main>

      <footer className="absolute bottom-2 w-full text-center text-xs text-gray-500">
        &copy; 2025 CaptionAI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
