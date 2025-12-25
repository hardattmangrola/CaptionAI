import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeSlide = ({ onFileSelect }) => {
    const inputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center w-full max-w-2xl px-6"
        >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-red via-brand-orange to-brand-yellow pb-2">
                Image Caption Generator
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                Upload any image and get an AI-generated caption instantly.
                Our advanced algorithm analyzes visual content to provide
                accurate and creative descriptions.
            </p>

            <div
                className="group relative border-2 border-dashed border-gray-600 hover:border-brand-orange rounded-3xl p-12 transition-all duration-300 bg-white/5 hover:bg-white/10 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => inputRef.current.click()}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-red to-brand-orange flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <p className="text-xl font-semibold mb-2">Click or Drag & Drop to Upload</p>
                        <p className="text-sm text-gray-400">Supports JPG, PNG, WEBP</p>
                    </div>
                </div>
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
        </motion.div>
    );
};

export default HomeSlide;
