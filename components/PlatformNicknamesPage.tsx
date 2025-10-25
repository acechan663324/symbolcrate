import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { recommendedNicknames } from '../constants/recommendedNicknames';
import PlatformLogo from './PlatformLogo';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface PlatformNicknamesPageProps {
  platform: string;
  onBack: () => void;
  onCopy: (text: string) => void;
  onSave: (nickname: string) => void;
  showToast: (message: string) => void;
  onGenerateForPlatform: (platform: string) => void;
}

const Spinner: React.FC = () => (
    <div className="flex flex-col justify-center items-center h-full text-gray-500 pt-16">
        <svg className="animate-spin h-8 w-8 text-purple-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-sm">Generating fresh ideas...</p>
    </div>
);

const PlatformNicknamesPage: React.FC<PlatformNicknamesPageProps> = ({ platform, onBack, onCopy, onSave, showToast, onGenerateForPlatform }) => {
    const [generatedNicknames, setGeneratedNicknames] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(true);

    const platformData = recommendedNicknames.find(p => p.category === platform);
    const curatedNames = platformData ? platformData.names : [];

    useEffect(() => {
        const generateMoreNicknames = async () => {
            setIsGenerating(true);
            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `Generate 30 cool, unique, and stylish nicknames suitable for the platform '${platform}'. These nicknames should creatively incorporate symbols or emojis. Return the result as a JSON object with a single key 'nicknames' which is an array of strings.`,
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
                setGeneratedNicknames(result.nicknames || []);
            } catch (error) {
                console.error(`Error generating nicknames for ${platform}:`, error);
                showToast(`Failed to generate new nicknames for ${platform}.`);
                setGeneratedNicknames([]);
            } finally {
                setIsGenerating(false);
            }
        };

        if (platform) {
            generateMoreNicknames();
        }
    }, [platform, showToast]);

    return (
        <div className="w-full max-w-4xl animate-fade-in">
            <div className="mb-6">
                <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex justify-center items-center gap-4">
                        <PlatformLogo platform={platform} className="h-10 w-10 sm:h-12 sm:w-12 text-gray-800" />
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-left">
                                {platform}
                            </h1>
                            <p className="text-gray-500 text-sm sm:text-base text-left">
                                Best Symbol Nickname Ideas
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => onGenerateForPlatform(platform)}
                        className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Generate one for me
                    </button>
                </div>
            </div>

            {curatedNames.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Curated Nicknames</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {curatedNames.map((name, index) => (
                            <li key={`curated-${index}`} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md hover:bg-purple-50 transition-all">
                                <span className="font-mono text-base text-gray-800 tracking-wide truncate pr-2">{name}</span>
                                <button onClick={() => onCopy(name)} className="flex-shrink-0 px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">Copy</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Freshly Generated Nicknames</h2>
                {isGenerating ? (
                    <Spinner />
                ) : generatedNicknames.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {generatedNicknames.map((name, index) => (
                            <li key={`generated-${index}`} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md hover:bg-purple-50 transition-all">
                                <span className="font-mono text-base text-gray-800 tracking-wide truncate pr-2">{name}</span>
                                <div className="flex-shrink-0 flex items-center space-x-2">
                                    <button
                                        onClick={() => onSave(name)}
                                        className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label={`Save nickname ${name}`}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => onCopy(name)}
                                        className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        aria-label={`Copy nickname ${name}`}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-gray-400 pt-16">
                        <p>Could not generate any new nicknames for this platform.</p>
                    </div>
                )}
            </div>

             <style>{`
              @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
              .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default PlatformNicknamesPage;