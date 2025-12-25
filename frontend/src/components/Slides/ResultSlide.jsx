import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Share2, RotateCcw, Check, Hash } from 'lucide-react';

const ResultSlide = ({ image, data, onReset }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const { captions, hashtags } = data;

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleDownload = () => {
        const content = `Captions:\n\n${captions.join('\n\n')}\n\nHashtags:\n${hashtags.join(' ')}`;
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "caption-ai-result.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-start bg-dark-800/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
        >
            {/* Image Preview */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/5 sticky top-6">
                <img src={image} alt="Uploaded" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="flex flex-col h-full gap-6">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-brand-orange">Generated Captions</h2>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {captions && captions.length > 0 ? (
                            captions.map((caption, index) => (
                                <div key={index} className="bg-dark-900/80 p-4 rounded-xl border border-white/5 group hover:border-brand-orange/30 transition-colors">
                                    <p className="text-gray-200 mb-3 leading-relaxed">{caption}</p>
                                    <button
                                        onClick={() => handleCopy(caption, index)}
                                        className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {copiedIndex === index ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                                        {copiedIndex === index ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No captions generated.</p>
                        )}
                    </div>
                </div>

                {/* Hashtags */}
                {hashtags && hashtags.length > 0 && (
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-300 font-medium">
                            <Hash className="w-4 h-4 text-brand-yellow" /> Recommended Hashtags
                        </div>
                        <p className="text-sm text-brand-yellow/80 leading-relaxed font-mono">
                            {hashtags.join(' ')}
                        </p>
                    </div>
                )}

                <div className="mt-auto space-y-3">
                    <div className="flex gap-3">
                        <button
                            onClick={handleDownload}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl transition text-sm font-medium"
                        >
                            <Download className="w-4 h-4" /> Download All
                        </button>
                    </div>

                    <button
                        onClick={onReset}
                        className="w-full py-4 bg-gradient-to-r from-brand-red to-brand-orange rounded-xl font-bold hover:shadow-lg hover:shadow-brand-orange/20 transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" /> Start Over
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultSlide;
