import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { NicknameOptions } from './NicknameGeneratorModal'; // Re-use the type

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const NICKNAMES_STORAGE_KEY = 'symbolCrate_savedNicknames';

type View = 'home' | 'batch' | 'saved';

interface BatchGeneratorProps {
    showToast: (message: string) => void;
    onNavigate: (view: View) => void;
}

const Spinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const BatchGenerator: React.FC<BatchGeneratorProps> = ({ showToast, onNavigate }) => {
    const [theme, setTheme] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedNicknames, setGeneratedNicknames] = useState<string[] | null>(null);
    const [options, setOptions] = useState<NicknameOptions>({
        symbolNumber: 2,
        useObfuscation: false,
        platform: '',
        keywords: '',
    });

    const handleOptionChange = (field: keyof NicknameOptions, value: any) => {
        setOptions({ ...options, [field]: value });
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedNicknames(null);

        try {
            const basePrompt = theme.trim()
                ? `Generate 50 cool and stylish nicknames based on the theme '${theme}'.`
                : `Generate 50 cool and stylish nicknames based on the selected options. Do not ask for a theme, just generate them.`;
            
            const prompt = `
              ${basePrompt}
              Please follow these rules for the generation:
              - Nicknames must be unique, visually appealing, and suitable for social media or gaming profiles.
              - Symbol Number: Insert exactly ${options.symbolNumber} symbols or emojis. If the number is 0, do not add any.
              - Use Obfuscated Characters (like l33t speak or visually similar symbols): ${options.useObfuscation ? 'Yes, be creative with it.' : 'No, use standard alphabet characters.'}.
              - Platform Style: Tailor the style to be suitable for '${options.platform || 'general online use'}'.
              - Keywords: Creatively incorporate the following additional themes or keywords: '${options.keywords || 'none'}'.
    
              Return the result as a JSON object with a single key 'nicknames' which is an array of strings.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            nicknames: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        }
                    }
                }
            });

            const jsonString = response.text.trim();
            const result = JSON.parse(jsonString);
            const newNicknames: string[] = result.nicknames || [];

            if (newNicknames.length > 0) {
                setGeneratedNicknames(newNicknames);
                saveNicknames(newNicknames);
            } else {
                showToast("No nicknames were generated for this theme.");
            }

        } catch (error) {
            console.error("Error generating batch nicknames:", error);
            showToast("Failed to generate nicknames. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const saveNicknames = (newNicknames: string[]) => {
        try {
            const existingNicknamesRaw = localStorage.getItem(NICKNAMES_STORAGE_KEY);
            const existingNicknames: string[] = existingNicknamesRaw ? JSON.parse(existingNicknamesRaw) : [];
            
            const combined = [...existingNicknames, ...newNicknames];
            const uniqueNicknames = Array.from(new Set(combined));

            localStorage.setItem(NICKNAMES_STORAGE_KEY, JSON.stringify(uniqueNicknames));
            showToast(`${newNicknames.length} nicknames saved! You now have ${uniqueNicknames.length} total.`);
        } catch (error) {
            console.error("Failed to save nicknames to localStorage", error);
            showToast("Could not save nicknames. Your browser storage might be full or disabled.");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleGenerate();
        }
    };


    return (
        <div className="w-full max-w-4xl animate-fade-in">
             <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="flex items-center mb-4">
                     <div className="p-2 bg-purple-100 rounded-lg mr-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Batch Nickname Generator</h1>
                </div>
                <p className="text-gray-500 mb-6">Enter a theme and use the advanced options to generate 50 stylish nicknames and save them to your collection.</p>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter primary theme, e.g., cyberpunk, ocean..."
                        className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition-colors"
                        aria-label="Enter a theme for nickname generation"
                        disabled={isGenerating}
                    />
                    <div className="border-t pt-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Advanced Options</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="batch-symbolNumber" className="block text-xs font-medium text-gray-500 mb-1">Symbol Number</label>
                                <input
                                    id="batch-symbolNumber"
                                    type="number"
                                    value={options.symbolNumber}
                                    onChange={(e) => handleOptionChange('symbolNumber', parseInt(e.target.value, 10) || 0)}
                                    min="0"
                                    max="10"
                                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    disabled={isGenerating}
                                />
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={options.useObfuscation}
                                        onChange={(e) => handleOptionChange('useObfuscation', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        disabled={isGenerating}
                                    />
                                    <span className="text-sm text-gray-600">Obfuscated Characters</span>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="batch-platform" className="block text-xs font-medium text-gray-500 mb-1">Platform (optional)</label>
                                <input
                                    id="batch-platform"
                                    type="text"
                                    value={options.platform}
                                    onChange={(e) => handleOptionChange('platform', e.target.value)}
                                    placeholder="e.g., Twitch, Steam, Instagram"
                                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    disabled={isGenerating}
                                />
                            </div>
                            <div>
                                <label htmlFor="batch-keywords" className="block text-xs font-medium text-gray-500 mb-1">Additional Keywords (optional)</label>
                                <input
                                    id="batch-keywords"
                                    type="text"
                                    value={options.keywords}
                                    onChange={(e) => handleOptionChange('keywords', e.target.value)}
                                    placeholder="e.g., shadow, neon, cosmic"
                                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    disabled={isGenerating}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
                >
                    {isGenerating && <Spinner />}
                    {isGenerating ? 'Generating...' : 'Generate & Save 50 Nicknames'}
                </button>
            </div>

             {isGenerating && (
                <div className="text-center text-gray-500 mt-8">
                    <p>Generating 50 nicknames based on "{theme}"... this might take a moment.</p>
                </div>
             )}

            {generatedNicknames && (
                <div className="mt-8">
                     <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Generated & Saved</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                            {generatedNicknames.map((name, index) => (
                                <li key={index} className="bg-gray-50 p-2 rounded-md font-mono text-gray-700 truncate">
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <div className="text-center mt-6">
                            <button
                                onClick={() => onNavigate('saved')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                View All Saved Nicknames
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default BatchGenerator;
