import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
// Fix: import NicknameOptions from GeneratorPage.tsx as GeneratorStudio.tsx is empty and not a module.
import { NicknameOptions } from './GeneratorPage';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface SymbolDetailProps {
  symbol: string;
  onBack: () => void;
  onCopy: (text: string) => void;
  onSave: (nickname: string) => void;
  showToast: (message: string) => void;
  onGenerateAvatar: (nickname: string, context?: { theme?: string; keywords?: string; }) => void;
}

const Spinner: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ActionButton: React.FC<{ onClick: () => void; label: string; children: React.ReactNode; className: string; }> = ({ onClick, label, children, className }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${className}`}
    >
      {children}
    </button>
);

const SymbolDetail: React.FC<SymbolDetailProps> = ({ symbol, onBack, onCopy, onSave, showToast, onGenerateAvatar }) => {
    const [nicknames, setNicknames] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [theme, setTheme] = useState('');
    const [options, setOptions] = useState<NicknameOptions>({
        symbolNumber: 1, // Default to 1 additional symbol
        useObfuscation: false,
        platform: '',
        keywords: '',
    });

    const handleOptionChange = (field: keyof NicknameOptions, value: any) => {
        setOptions({ ...options, [field]: value });
    };

    const generatePrompt = () => {
        const basePrompt = theme.trim()
            ? `Generate 5 cool and stylish nicknames for the name or theme '${theme}'.`
            : `Generate 5 cool and stylish nicknames based on the selected options.`;
    
        return `
          ${basePrompt}
          
          **CRITICAL RULE: Every single nickname generated MUST include the symbol or emoji '${symbol}'.**
    
          Please follow these additional rules for the generation:
          - Nicknames must be unique and visually appealing.
          - Additional Symbol Number: In addition to the required symbol '${symbol}', insert exactly ${options.symbolNumber} other random symbols or emojis. If the number is 0, do not add any other symbols.
          - Symbol Placement: Distribute all symbols (the required one and any additional ones) randomly within the nickname. They can appear at the beginning, middle, or end. Avoid predictable patterns.
          - Use Obfuscated Characters (like l33t speak or visually similar symbols): ${options.useObfuscation ? 'Yes, be creative with it.' : 'No, use standard alphabet characters.'}.
          - Platform Style: Tailor the style to be suitable for '${options.platform || 'general online use'}'.
          - Keywords: Creatively incorporate the following themes or keywords: '${options.keywords || 'none'}'.
    
          Return the result as a JSON object with a single key 'nicknames' which is an array of strings.
        `;
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setNicknames([]);
        try {
            const prompt = generatePrompt();
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            nicknames: { type: Type.ARRAY, items: { type: Type.STRING } }
                        }
                    }
                }
            });
            const jsonString = response.text.trim();
            const result = JSON.parse(jsonString);
            setNicknames(result.nicknames || []);

        } catch (error) {
            console.error("Error generating nicknames for symbol:", error);
            showToast(`Failed to generate nicknames for ${symbol}. Please try again later.`);
            setNicknames([]);
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <div className="w-full max-w-4xl animate-fade-in">
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to all symbols
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col md:flex-row gap-8">
                {/* Left Side: Symbol & Generator */}
                <div className="w-full md:w-1/2">
                    <div className="text-center mb-6">
                        <span className="text-8xl md:text-9xl font-mono select-all">{symbol}</span>
                         <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
                            Nickname Studio
                        </h1>
                    </div>
                    
                    {/* Generator Form */}
                     <div className="space-y-4">
                        <input
                        type="text"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        placeholder="Enter name or theme..."
                        className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                        disabled={isGenerating}
                        />

                        <div className="border-t pt-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Advanced Options</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="sd-symbolNumber" className="block text-xs font-medium text-gray-500 mb-1">Additional Symbols</label>
                                <input
                                    id="sd-symbolNumber"
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
                                    <span className="text-sm text-gray-600">Obfuscated</span>
                                </label>
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Platform (optional)</label>
                                <input
                                    type="text"
                                    value={options.platform}
                                    onChange={(e) => handleOptionChange('platform', e.target.value)}
                                    placeholder="e.g., Discord, Xbox, Twitter"
                                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    disabled={isGenerating}
                                />
                            </div>
                                <div className="col-span-1 sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Keywords (optional)</label>
                                <input
                                    type="text"
                                    value={options.keywords}
                                    onChange={(e) => handleOptionChange('keywords', e.target.value)}
                                    placeholder="e.g., fire, dark, cute"
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
                        className="mt-6 w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? <Spinner className="h-5 w-5 text-white" /> : `Generate with '${symbol}'`}
                    </button>
                </div>

                {/* Right Side: Results */}
                <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                     <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Generated Nicknames</h2>
                     <div className="min-h-[300px]">
                        {isGenerating ? (
                           <div className="flex flex-col justify-center items-center h-full text-gray-500 pt-16">
                                <Spinner className="h-8 w-8 text-purple-500 mb-3" />
                                <p className="text-sm">Conjuring creative nicknames...</p>
                            </div>
                        ) : nicknames.length > 0 ? (
                            <ul className="space-y-2">
                                {nicknames.map((name, index) => (
                                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:shadow-md hover:bg-purple-50 transition-all">
                                        <span className="font-mono text-base text-gray-800 tracking-wide truncate pr-2">{name}</span>
                                        <div className="flex-shrink-0 flex items-center space-x-1">
                                            <ActionButton onClick={() => onGenerateAvatar(name, { theme, keywords: options.keywords })} label={`Create avatar for ${name}`} className="text-orange-500 bg-orange-100 hover:bg-orange-200 focus:ring-orange-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                </svg>
                                            </ActionButton>
                                            <ActionButton onClick={() => onSave(name)} label={`Save nickname ${name}`} className="text-blue-500 bg-blue-100 hover:bg-blue-200 focus:ring-blue-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                                </svg>
                                            </ActionButton>
                                            <ActionButton onClick={() => onCopy(name)} label={`Copy nickname ${name}`} className="text-purple-500 bg-purple-100 hover:bg-purple-200 focus:ring-purple-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                                    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
                                                </svg>
                                            </ActionButton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-gray-400 pt-24">
                                <p>Your stylish nicknames will appear here!</p>
                            </div>
                        )}
                     </div>
                </div>
            </div>

            <style>{`
              @keyframes fade-in {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in {
                animation: fade-in 0.3s ease-out;
              }
            `}</style>
        </div>
    );
};

export default SymbolDetail;