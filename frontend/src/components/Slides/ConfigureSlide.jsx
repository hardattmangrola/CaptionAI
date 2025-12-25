import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Type, Globe, Hash, Layout, Thermometer } from 'lucide-react';

const ConfigureSlide = ({ options, setOptions, onNext }) => {

    const handleChange = (key, value) => {
        setOptions(prev => ({ ...prev, [key]: value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-3xl bg-dark-800/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-orange/20 rounded-xl text-brand-orange">
                    <Settings className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Configure Captions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Count */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Hash className="w-4 h-4" /> Variations
                    </label>
                    <div className="flex bg-dark-900 rounded-lg p-1 border border-white/5">
                        {[1, 3, 5].map(num => (
                            <button
                                key={num}
                                onClick={() => handleChange('count', num)}
                                className={`flex-1 py-2 rounded-md transition-all text-sm font-medium ${options.count === num ? 'bg-brand-orange text-white shadow-lg' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tone */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Type className="w-4 h-4" /> Tone
                    </label>
                    <select
                        value={options.tone}
                        onChange={(e) => handleChange('tone', e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange outline-none appearance-none"
                    >
                        <option>Creative</option>
                        <option>Funny</option>
                        <option>Professional</option>
                        <option>Poetic</option>
                        <option>Descriptive</option>
                        <option>Sarcastic</option>
                    </select>
                </div>

                {/* Length */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Length
                    </label>
                    <div className="flex bg-dark-900 rounded-lg p-1 border border-white/5">
                        {['Short', 'Medium', 'Long'].map(len => (
                            <button
                                key={len}
                                onClick={() => handleChange('length', len)}
                                className={`flex-1 py-2 rounded-md transition-all text-sm font-medium ${options.length === len ? 'bg-brand-orange text-white shadow-lg' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {len}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Platform */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Platform
                    </label>
                    <select
                        value={options.platform}
                        onChange={(e) => handleChange('platform', e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange outline-none"
                    >
                        <option>Instagram</option>
                        <option>Twitter / X</option>
                        <option>LinkedIn</option>
                        <option>Facebook</option>
                        <option>TikTok</option>
                    </select>
                </div>

                {/* Language */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Language
                    </label>
                    <select
                        value={options.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-orange outline-none"
                    >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Hindi</option>
                        <option>Japanese</option>
                    </select>
                </div>

                {/* Creativity (Temperature) */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2"><Thermometer className="w-4 h-4" /> Creativity</div>
                        <span className="text-brand-orange font-mono text-xs">{options.temperature}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={options.temperature}
                        onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                        className="w-fullaccent-brand-orange h-2 bg-dark-900 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full mt-8 py-4 bg-gradient-to-r from-brand-red to-brand-orange rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-brand-orange/20 transition-all"
            >
                Generate Captions
            </button>
        </motion.div>
    );
};

export default ConfigureSlide;
