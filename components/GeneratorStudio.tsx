import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface NicknameOptions {
  symbolNumber: number;
  useObfuscation: boolean;
  keywords: string;
}

interface GeneratorStudioProps {
  showToast: (message: string) => void;
  onSaveNickname: (nickname: string) => void;
  onCopy: (text: string) => void;
  onGenerateAvatar: (nickname: string, context?: { theme?: string; keywords?: string; }) => void;
  requiredSymbols: string[];
  onRemoveRequiredSymbol: (symbol: string) => void;
}

const Spinner: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
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


const GeneratorStudio: React.FC<GeneratorStudioProps> = ({
  showToast,
  onSaveNickname,
  onCopy,
  onGenerateAvatar,
  requiredSymbols,
  onRemoveRequiredSymbol
}) => {
  const [theme, setTheme] = useState('');
  const [generatedNicknames, setGeneratedNicknames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [options, setOptions] = useState<NicknameOptions>({
    symbolNumber: 2,
    useObfuscation: false,
    keywords: '',
  });

  const handleOptionChange = (field: keyof NicknameOptions, value: any) => {
    setOptions({ ...options, [field]: value });
  };

  const generatePrompt = () => {
    const basePrompt = theme.trim()
        ? `Generate 5 cool and stylish nicknames for the name or theme '${theme}'.`
        : `Generate 5 cool and stylish nicknames based on the selected options. Do not ask for a name or theme, just generate them.`;
    
    let rules = `Please follow these rules for the generation:`;

    if (requiredSymbols.length > 0) {
      rules += `\n- **CRITICAL RULE**: Every single nickname generated MUST include all of the following symbols: '${requiredSymbols.join("', '")}'.`;
      const additionalSymbolsNeeded = Math.max(0, options.symbolNumber - requiredSymbols.length);
      rules += `\n- Additional Symbol Number: In addition to the required symbols, insert exactly ${additionalSymbolsNeeded} other random symbols or emojis to meet the total target of ${options.symbolNumber} symbols. If this number is 0, do not add any other symbols.`;
    } else {
      rules += `\n- Symbol Number: Insert exactly ${options.symbolNumber} symbols or emojis. If the number is 0, do not add any.`;
    }
    
    rules += `
      - Nicknames must be unique and visually appealing.
      - Use Obfuscated Characters (like l33t speak or visually similar symbols): ${options.useObfuscation ? 'Yes, be creative with it.' : 'No, use standard alphabet characters.'}.
      - Keywords: Creatively incorporate the following themes or keywords: '${options.keywords || 'none'}'.

      Return the result as a JSON object with a single key 'nicknames' which is an array of strings.
    `;
    
    return `${basePrompt}\n\n${rules}`;
  }

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedNicknames([]);
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
      setGeneratedNicknames(result.nicknames || []);

    } catch (error) {
      console.error("Error generating nicknames in studio:", error);
      showToast("Failed to generate nicknames. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input Area */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Generator Studio</h2>
          </div>
          
          <div className="space-y-4 flex-grow">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Enter name or theme..."
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              disabled={isGenerating}
            />
            
            <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg min-h-[40px] items-center border border-gray-200">
              {requiredSymbols.length === 0 ? (
                <span className="text-sm text-gray-400 px-2">Required symbols appear here.</span>
              ) : (
                requiredSymbols.map(symbol => (
                  <span key={symbol} className="flex items-center bg-purple-200 text-purple-800 text-sm font-mono px-2 py-1 rounded-md animate-fade-in-fast">
                    <span className="text-lg leading-none">{symbol}</span>
                    <button onClick={() => onRemoveRequiredSymbol(symbol)} className="ml-1.5 w-4 h-4 flex items-center justify-center rounded-full text-purple-600 hover:bg-purple-300 hover:text-purple-900 transition-colors" aria-label={`Remove symbol ${symbol}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Advanced Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gs-symbolNumber" className="block text-xs font-medium text-gray-500 mb-1">Symbol Number</label>
                  <input id="gs-symbolNumber" type="number" value={options.symbolNumber} onChange={(e) => handleOptionChange('symbolNumber', parseInt(e.target.value, 10) || 0)} min="0" max="10" className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" disabled={isGenerating}/>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={options.useObfuscation} onChange={(e) => handleOptionChange('useObfuscation', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" disabled={isGenerating}/>
                    <span className="text-sm text-gray-600">Obfuscated</span>
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Keywords (optional)</label>
                  <input type="text" value={options.keywords} onChange={(e) => handleOptionChange('keywords', e.target.value)} placeholder="e.g., fire, dark, cute" className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" disabled={isGenerating}/>
                </div>
              </div>
            </div>
          </div>
          
          <button onClick={handleGenerate} disabled={isGenerating} className="mt-6 w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed">
            {isGenerating ? <Spinner /> : 'Generate'}
          </button>
        </div>
        
        {/* Right Column: Preview Area */}
        <div className="h-full flex flex-col">
           <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Preview</h3>
           <div className="bg-gray-50 rounded-lg p-4 min-h-[360px] border flex-grow">
              {isGenerating ? (
                <div className="flex flex-col justify-center items-center h-full text-gray-500">
                  <Spinner className="h-8 w-8 text-purple-500 mb-3" />
                  <p className="text-sm">Generating...</p>
                </div>
              ) : generatedNicknames.length > 0 ? (
                <ul className="space-y-2">
                  {generatedNicknames.map((name, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-purple-50 transition-colors border">
                      <span className="font-mono text-sm text-gray-800 tracking-wide truncate pr-2">{name}</span>
                       <div className="flex-shrink-0 flex items-center space-x-1">
                          <ActionButton onClick={() => onGenerateAvatar(name, { theme, keywords: options.keywords })} label={`Create avatar for ${name}`} className="text-orange-500 bg-orange-100 hover:bg-orange-200 focus:ring-orange-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                          </ActionButton>
                          <ActionButton onClick={() => onSaveNickname(name)} label={`Save nickname ${name}`} className="text-blue-500 bg-blue-100 hover:bg-blue-200 focus:ring-blue-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                          </ActionButton>
                          <ActionButton onClick={() => onCopy(name)} label={`Copy nickname ${name}`} className="text-purple-500 bg-purple-100 hover:bg-purple-200 focus:ring-purple-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" /></svg>
                          </ActionButton>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-400 flex items-center justify-center h-full">
                  <p className="text-sm">Your results will appear here!</p>
                </div>
              )}
           </div>
        </div>
      </div>
      <style>{`
          @keyframes fade-in-fast { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default GeneratorStudio;