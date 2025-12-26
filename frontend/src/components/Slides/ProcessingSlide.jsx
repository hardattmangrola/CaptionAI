import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Search, Wand2, Image as ImageIcon } from 'lucide-react';

const ProcessingSlide = ({ file, options, onComplete, onError }) => {
    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { icon: ImageIcon, label: "Image Loaded" },
        { icon: Search, label: "Analyzing" },
        { icon: Wand2, label: "Generating" },
        { icon: CheckCircle, label: "Complete" },
    ];

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 1.5; // speed logic
            if (currentProgress > 100) currentProgress = 100;

            setProgress(currentProgress);

            if (currentProgress > 20) setActiveStep(1);
            if (currentProgress > 60) setActiveStep(2);
            if (currentProgress >= 100) {
                setActiveStep(3);
                clearInterval(interval);
            }
        }, 50);

        // Use a promise to sync animation and API
        const process = async () => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("count", options.count);
            formData.append("tone", options.tone);
            formData.append("length", options.length);
            formData.append("platform", options.platform);
            formData.append("language", options.language);
            formData.append("temperature", options.temperature);

            try {
                // Use environment variable for API URL or default to localhost
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

                const apiPromise = fetch(`${API_URL}/generate_caption/`, {
                    method: "POST",
                    body: formData,
                }).then(res => {
                    if (!res.ok) throw new Error("Failed");
                    return res.json();
                });

                // Wait for at least 3 seconds of animation for better UX
                const delayPromise = new Promise(resolve => setTimeout(resolve, 3500));

                const [data] = await Promise.all([apiPromise, delayPromise]);

                setProgress(100);
                setActiveStep(3);
                setTimeout(() => onComplete(data), 500); // Pass full data object

            } catch (error) {
                console.error(error);
                onError();
            }
        };

        process();

        return () => clearInterval(interval);
    }, [file]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl text-center"
        >
            <h2 className="text-3xl font-bold mb-8">Processing Image</h2>

            <div className="mb-12">
                <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden mb-4 relative">
                    <motion.div
                        className="h-full bg-gradient-to-r from-brand-red to-brand-yellow"
                        style={{ width: `${progress}%` }}
                    />
                    <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-r from-transparent to-black/20" />
                </div>
                <p className="text-brand-orange font-mono font-bold text-xl">{Math.round(progress)}%</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= activeStep;

                    return (
                        <div key={index} className={`flex flex-col items-center gap-3 transition-colors duration-500 ${isActive ? 'text-brand-yellow' : 'text-gray-600'}`}>
                            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center
                                ${isActive ? 'border-brand-yellow bg-brand-yellow/10' : 'border-gray-700 bg-gray-800'}
                            `}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium">{step.label}</span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default ProcessingSlide;
