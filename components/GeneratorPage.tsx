import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { recommendedNicknames } from '../constants/recommendedNicknames';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const NICKNAMES_STORAGE_KEY = 'symbolCrate_savedNicknames';

export interface NicknameOptions {
  symbolNumber: number;
  useObfuscation: boolean;
  platform: string;
  keywords: string;
}

interface GeneratorPageProps {
  showToast: (message: string) => void;
  onSaveNickname: (nickname: string) => void;
  onCopy: (text: string) => void;
  onGenerateAvatar: (nickname: string, context?: { theme?: string; keywords?: string; }) => void;
  initialData?: { platform?: string };
  onPlatformSelect: (platform: string) => void;
  isSubscribed: boolean;
  onNavigate: (view: any) => void;
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
      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
);


const GeneratorPage: React.FC<GeneratorPageProps> = ({
  showToast,
  onSaveNickname,
  onCopy,
  onGenerateAvatar,
  initialData,
  onPlatformSelect,
  isSubscribed,
  onNavigate,
}) => {
  const [theme, setTheme] = useState('');
  const [generatedNicknames, setGeneratedNicknames] = useState<string[]>([]);
  const [isGeneratingSingle, setIsGeneratingSingle] = useState<boolean>(false);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState<boolean>(false);
  const [requiredSymbols, setRequiredSymbols] = useState<string[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [nicknameOptions, setNicknameOptions] = useState<NicknameOptions>({
    symbolNumber: 2,
    useObfuscation: false,
    platform: '',
    keywords: '',
  });

  useEffect(() => {
    if (initialData?.platform) {
      setNicknameOptions(prev => ({ ...prev, platform: initialData.platform }));
      showToast(`Generator ready for ${initialData.platform}!`);
    }
  }, [initialData, showToast]);

  const handleOptionChange = (field: keyof NicknameOptions, value: any) => {
    setNicknameOptions({ ...nicknameOptions, [field]: value });
  };
  
  const handleRemoveRequiredSymbol = (symbolToRemove: string) => {
    setRequiredSymbols(prev => prev.filter(s => s !== symbolToRemove));
  };

  const generatePrompt = (basePrompt: string) => {
    let rules = `Please follow these rules for the generation:`;

    if (requiredSymbols.length > 0) {
      rules += `\n- **CRITICAL RULE**: Every single nickname generated MUST include all of the following symbols: '${requiredSymbols.join("', '")}'.`;
      const additionalSymbolsNeeded = Math.max(0, nicknameOptions.symbolNumber - requiredSymbols.length);
      rules += `\n- Additional Symbol Number: In addition to the required symbols, insert exactly ${additionalSymbolsNeeded} other random symbols or emojis to meet the total target of ${nicknameOptions.symbolNumber} symbols. If this number is 0, do not add any other symbols.`;
    } else {
      rules += `\n- Symbol Number: Insert exactly ${nicknameOptions.symbolNumber} symbols or emojis. If the number is 0, do not add any.`;
    }

    rules += `
      - Nicknames must be unique and visually appealing.
      - Symbol Placement: Distribute all symbols (the required ones and any additional ones) randomly within the nickname. They can appear at the beginning, middle, or end. Avoid predictable patterns.
      - Use Obfuscated Characters (like l33t speak or visually similar symbols): ${nicknameOptions.useObfuscation ? 'Yes, be creative with it.' : 'No, use standard alphabet characters.'}.
      - Platform Style: Tailor the style to be suitable for '${nicknameOptions.platform || 'general online use'}'.
      - Keywords: Creatively incorporate the following themes or keywords: '${nicknameOptions.keywords || 'none'}'.

      Return the result as a JSON object with a single key 'nicknames' which is an array of strings.
    `;
    
    return `${basePrompt}\n\n${rules}`;
  }

  const handleGenerateSingle = async () => {
    setIsGeneratingSingle(true);
    setGeneratedNicknames([]);

    try {
        const basePrompt = theme.trim()
            ? `Generate 5 cool and stylish nicknames for the name or theme '${theme}'.`
            : `Generate 5 cool and stylish nicknames based on the selected options. Do not ask for a name or theme, just generate them.`;
        const prompt = generatePrompt(basePrompt);
        
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
        setGeneratedNicknames(result.nicknames || []);
    } catch (error) {
        console.error("Error generating single nicknames:", error);
        showToast("Failed to generate nicknames. Please try again.");
    } finally {
        setIsGeneratingSingle(false);
    }
  };

  const handleGenerateBatch = async () => {
    setIsGeneratingBatch(true);

    try {
      const basePrompt = theme.trim()
        ? `Generate 50 cool and stylish nicknames based on the theme '${theme}'.`
        : `Generate 50 cool and stylish nicknames based on the selected options. Do not ask for a theme, just generate them.`;
      const prompt = generatePrompt(basePrompt);

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: Type.OBJECT,
                  properties: { nicknames: { type: Type.ARRAY, items: { type: Type.STRING } } }
              }
          }
      });

      const jsonString = response.text.trim();
      const result = JSON.parse(jsonString);
      const newNicknames: string[] = result.nicknames || [];

      if (newNicknames.length > 0) {
        saveNicknamesToStorage(newNicknames);
      } else {
        showToast("No nicknames were generated for this theme.");
      }
    } catch (error) {
      console.error("Error generating batch nicknames:", error);
      showToast("Failed to generate nicknames. Please try again.");
    } finally {
      setIsGeneratingBatch(false);
    }
  };

  const saveNicknamesToStorage = (newNicknames: string[]) => {
    try {
        const existingNicknamesRaw = localStorage.getItem(NICKNAMES_STORAGE_KEY);
        const existingNicknames: string[] = existingNicknamesRaw ? JSON.parse(existingNicknamesRaw) : [];
        const combined = [...existingNicknames, ...newNicknames];
        const uniqueNicknames = Array.from(new Set(combined));
        localStorage.setItem(NICKNAMES_STORAGE_KEY, JSON.stringify(uniqueNicknames));
        showToast(`${newNicknames.length} nicknames generated & saved! You now have ${uniqueNicknames.length} total.`);
    } catch (error) {
        console.error("Failed to save nicknames to localStorage", error);
        showToast("Could not save nicknames. Storage might be full.");
    }
  };
  
  const isGenerating = isGeneratingSingle || isGeneratingBatch;

  return (
    <div className="w-full max-w-4xl animate-fade-in mx-auto">
        {/* Generator Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex items-center mb-2">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Generator Studio</h1>
            </div>
            <p className="text-gray-500 mb-6">Craft your perfect nickname with AI. Results from 'Generate 5' will show below.</p>

            <div className="space-y-4">
                 <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Enter name or theme..."
                    className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    disabled={isGenerating}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Paste Required Symbols</label>
                    <input
                        type="text"
                        onPaste={(e) => {
                            const pastedText = e.clipboardData.getData('text');
                            const symbols = Array.from(new Set([...requiredSymbols, ...pastedText.split('')]));
                            setRequiredSymbols(symbols.slice(0, 5));
                            e.preventDefault();
                        }}
                        placeholder="Copy symbols from the Symbols page and paste here..."
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    />
                </div>
                 <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg min-h-[44px] items-center border border-gray-200">
                    {requiredSymbols.length === 0 ? (
                        <span className="text-sm text-gray-400 px-2">Your required symbols will appear here.</span>
                    ) : (
                        requiredSymbols.map(symbol => (
                            <span key={symbol} className="flex items-center bg-purple-200 text-purple-800 text-sm font-mono px-2 py-1 rounded-md animate-fade-in-fast">
                                <span className="text-lg leading-none">{symbol}</span>
                                <button onClick={() => handleRemoveRequiredSymbol(symbol)} className="ml-1.5 w-4 h-4 flex items-center justify-center rounded-full text-purple-600 hover:bg-purple-300 hover:text-purple-900 transition-colors" aria-label={`Remove symbol ${symbol}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </span>
                        ))
                    )}
                </div>

                {/* Advanced Options */}
                <div>
                    <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className="flex justify-between items-center w-full text-sm font-semibold text-gray-600">
                        Advanced Options
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isAdvancedOpen && (
                        <div className="mt-4 border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-fast">
                            <div>
                                <label htmlFor="gp-symbolNumber" className="block text-xs font-medium text-gray-500 mb-1">Total Symbols</label>
                                <input id="gp-symbolNumber" type="number" value={nicknameOptions.symbolNumber} onChange={(e) => handleOptionChange('symbolNumber', parseInt(e.target.value, 10) || 0)} min="0" max="10" className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" disabled={isGenerating}/>
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={nicknameOptions.useObfuscation} onChange={(e) => handleOptionChange('useObfuscation', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" disabled={isGenerating}/><span className="text-sm text-gray-600">Obfuscated</span></label>
                            </div>
                            <div className="col-span-1 sm:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Platform (optional)</label><input type="text" value={nicknameOptions.platform} onChange={(e) => handleOptionChange('platform', e.target.value)} placeholder="e.g., Discord, Xbox" className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" disabled={isGenerating}/></div>
                            <div className="col-span-1 sm:col-span-2"><label className="block text-xs font-medium text-gray-500 mb-1">Keywords (optional)</label><input type="text" value={nicknameOptions.keywords} onChange={(e) => handleOptionChange('keywords', e.target.value)} placeholder="e.g., fire, dark, cute" className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" disabled={isGenerating}/></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                <button onClick={handleGenerateSingle} disabled={isGenerating} className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed">
                    {isGeneratingSingle ? <Spinner /> : 'Generate 5'}
                </button>
                {isSubscribed ? (
                    <button onClick={handleGenerateBatch} disabled={isGenerating} className="w-full inline-flex items-center justify-center px-4 py-3 border border-purple-600 text-base font-medium rounded-lg text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-100 disabled:text-purple-300 disabled:border-purple-200 disabled:cursor-not-allowed">
                        {isGeneratingBatch ? <Spinner /> : 'Gen & Save 50'}
                    </button>
                ) : (
                    <button onClick={() => onNavigate('pricing')} className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-opacity">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Unlock Batch Gen
                    </button>
                )}
            </div>
        </div>

        {/* Results Section */}
        <div className="min-h-[300px] mb-12">
            {isGeneratingSingle ? (
                <div className="flex flex-col justify-center items-center h-full text-gray-500 pt-8">
                    <Spinner className="h-8 w-8 text-purple-500 mb-3" />
                    <p>Generating masterpieces...</p>
                </div>
            ) : generatedNicknames.length > 0 ? (
                <ul className="space-y-3">
                    {generatedNicknames.map((name, index) => (
                        <li key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg hover:border-purple-300">
                             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <span className="font-mono text-lg text-gray-800 tracking-wide text-center sm:text-left truncate">{name}</span>
                                <div className="flex-shrink-0 flex items-center gap-2">
                                     <ActionButton onClick={() => onSaveNickname(name)} label={`Save nickname ${name}`} className="text-blue-500 bg-blue-100 hover:bg-blue-200 focus:ring-blue-400 focus:ring-offset-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg></ActionButton>
                                     <ActionButton onClick={() => onCopy(name)} label={`Copy nickname ${name}`} className="text-purple-500 bg-purple-100 hover:bg-purple-200 focus:ring-purple-400 focus:ring-offset-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" /></svg></ActionButton>
                                     <button onClick={() => onGenerateAvatar(name, { theme, keywords: nicknameOptions.keywords })} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg shadow-sm hover:scale-105 transform transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                        Create Avatar
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-400 pt-16">
                    <p>Your generated nicknames will appear here!</p>
                </div>
            )}
        </div>

        {/* Recommended Nicknames Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Platform-Specific Inspiration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {recommendedNicknames.map(rec => (
                <div key={rec.category}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-gray-600">{rec.category}</h3>
                        <button onClick={() => onPlatformSelect(rec.category)} className="text-sm font-semibold text-purple-600 hover:underline">View More &rarr;</button>
                    </div>
                    <ul className="space-y-2">
                    {rec.names.slice(0, 3).map((name, index) => (
                        <li key={`${rec.category}-${index}`} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                            <span className="font-mono text-sm text-gray-800 truncate pr-2">{name}</span>
                            <button onClick={() => onCopy(name)} className="flex-shrink-0 px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors">Copy</button>
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
        </div>

        <style>{`
            @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fade-in 0.3s ease-out; }
            @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out; }
        `}</style>
    </div>
  );
};

export default GeneratorPage;