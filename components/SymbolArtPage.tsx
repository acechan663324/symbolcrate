import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface SymbolArtPageProps {
    showToast: (message: string) => void;
    onCopy: (text: string) => void;
}

const Spinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SymbolArtPage: React.FC<SymbolArtPageProps> = ({ showToast, onCopy }) => {
    const [prompt, setPrompt] = useState('');
    const [platform, setPlatform] = useState('');
    const [charsPerLine, setCharsPerLine] = useState('');
    const [generatedArt, setGeneratedArt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const examplePrompts = [
        'A cozy cabin in a snowy forest at night with a full moon.',
        'A vast desert landscape with pyramids and a setting sun.',
        'A futuristic city with flying cars and towering skyscrapers.',
        'A serene underwater scene with coral reefs and fish.',
        'An astronaut floating in space next to the earth.',
    ];

    const platforms = [
        'Default', 'TikTok', 'Telegram', 'WhatsApp', 'Messenger', 
        'Instagram', 'YouTube', 'Line', 'Facebook', 'Tinder'
    ];

    const generateArt = async () => {
        if (!prompt.trim()) {
            showToast('Please enter a description for your art.');
            return;
        }
        setIsGenerating(true);
        setGeneratedArt('');

        const fullPrompt = `
            You are an AI artist specializing in creating digital paintings using only text symbols, characters, and emojis (ASCII/Unicode art).
            Based on the user's request, generate a visually appealing and coherent piece of art.
            Use a variety of symbols to create texture, shading, and detail. Be creative.

            **CRITICAL CONSTRAINTS:**
            ${platform ? `- Optimize the symbols and formatting for sharing on **${platform}**. Ensure it looks good and doesn't break.` : ''}
            ${charsPerLine ? `- Each line of the artwork MUST NOT exceed **${charsPerLine}** characters in width. This is a strict rule.` : '- The art should be roughly 40-60 characters wide.'}
            - The art should be multi-line, typically around 10-15 lines high unless the prompt implies otherwise.

            User's request: "${prompt}"
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: fullPrompt,
            });
            setGeneratedArt(response.text);
        } catch (error) {
            console.error("Error generating symbol art:", error);
            showToast("Failed to generate art. The AI might be busy. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="text-center mb-6">
                     <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
                        AI Symbol Art Generator
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Describe a scene, and let AI paint it with symbols and emojis.
                    </p>
                </div>
                
                <div className="space-y-4">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A rocket launching into space from a planet's surface"
                        rows={3}
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                        disabled={isGenerating}
                    />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="platform-select" className="block text-sm font-medium text-gray-700 mb-1">
                                Optimize for Platform
                            </label>
                            <select
                                id="platform-select"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                disabled={isGenerating}
                                className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            >
                                {platforms.map(p => <option key={p} value={p === 'Default' ? '' : p}>{p}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="chars-per-line" className="block text-sm font-medium text-gray-700 mb-1">
                                Max Characters per Line
                            </label>
                            <input
                                id="chars-per-line"
                                type="number"
                                value={charsPerLine}
                                onChange={(e) => setCharsPerLine(e.target.value)}
                                min="10"
                                max="200"
                                placeholder="e.g., 40"
                                disabled={isGenerating}
                                className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-500">Try:</span>
                        {examplePrompts.map((p, i) => (
                            <button key={i} onClick={() => setPrompt(p)} className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-purple-200 hover:text-purple-800 transition-colors">
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={generateArt}
                    disabled={isGenerating}
                    className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
                >
                    {isGenerating ? <Spinner /> : 'Generate Art'}
                </button>

                <div className="mt-8">
                     <h2 className="text-lg font-bold text-gray-700 mb-2">Your Artwork:</h2>
                    <div className="relative bg-gray-900 text-white rounded-lg p-4 font-mono text-sm overflow-x-auto min-h-[250px] whitespace-pre flex items-center justify-center">
                         {isGenerating ? (
                           <div className="flex flex-col justify-center items-center h-full text-gray-400">
                                <svg className="animate-spin h-8 w-8 text-purple-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p className="text-sm">Painting with pixels and symbols...</p>
                            </div>
                        ) : generatedArt ? (
                            <>
                                <button
                                    onClick={() => onCopy(generatedArt)}
                                    className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-gray-900 bg-gray-200 rounded-full hover:bg-white transition-colors"
                                >
                                    Copy
                                </button>
                                <code>{generatedArt}</code>
                            </>
                        ) : (
                            <p className="text-gray-500">Your generated art will appear here.</p>
                        )}
                    </div>
                </div>
            </div>
             <style>{`
              @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
              .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default SymbolArtPage;
