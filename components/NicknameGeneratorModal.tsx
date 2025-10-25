import React from 'react';

export interface NicknameOptions {
  symbolNumber: number;
  useObfuscation: boolean;
  platform: string;
  keywords: string;
}

interface NicknameGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  options: NicknameOptions;
  onOptionChange: (options: NicknameOptions) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  nicknames: string[];
  onCopy: (text: string) => void;
}

const Spinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const NicknameGeneratorModal: React.FC<NicknameGeneratorModalProps> = ({
  isOpen,
  onClose,
  inputValue,
  onInputChange,
  options,
  onOptionChange,
  onGenerate,
  isGenerating,
  nicknames,
  onCopy,
}) => {
  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onGenerate();
    }
  };

  const handleOptionChange = (field: keyof NicknameOptions, value: any) => {
    onOptionChange({ ...options, [field]: value });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animationFillMode: 'forwards' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Stylish Nickname Generator</h2>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">Enter your name and customize the options to let AI create a unique, stylish nickname for you.</p>

        <div className="space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your name or a base word..."
            className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2.5 px-4 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition-colors"
            aria-label="Enter your name"
          />

          <div className="border-t pt-4">
             <h3 className="text-sm font-semibold text-gray-600 mb-2">Advanced Options</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="symbolNumber" className="block text-xs font-medium text-gray-500 mb-1">Symbol Number</label>
                    <input
                        id="symbolNumber"
                        type="number"
                        value={options.symbolNumber}
                        onChange={(e) => handleOptionChange('symbolNumber', parseInt(e.target.value, 10) || 0)}
                        min="0"
                        max="10"
                        className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                </div>
                <div className="flex items-end pb-1">
                     <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.useObfuscation}
                            onChange={(e) => handleOptionChange('useObfuscation', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                         <span className="text-sm text-gray-600">Obfuscated Characters</span>
                    </label>
                </div>
                <div>
                    <label htmlFor="platform" className="block text-xs font-medium text-gray-500 mb-1">Platform (optional)</label>
                    <input
                        id="platform"
                        type="text"
                        value={options.platform}
                        onChange={(e) => handleOptionChange('platform', e.target.value)}
                        placeholder="e.g., Discord, Xbox, Twitter"
                        className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                </div>
                 <div>
                    <label htmlFor="keywords" className="block text-xs font-medium text-gray-500 mb-1">Keywords (optional)</label>
                    <input
                        id="keywords"
                        type="text"
                        value={options.keywords}
                        onChange={(e) => handleOptionChange('keywords', e.target.value)}
                        placeholder="e.g., fire, dark, cute"
                        className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                </div>
             </div>
          </div>
        </div>

        <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="mt-6 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
            {isGenerating ? <Spinner /> : 'Generate'}
        </button>

        <div className="min-h-[200px] border-t mt-6 pt-4">
          {isGenerating ? (
            <div className="flex flex-col justify-center items-center h-full text-gray-500 pt-12">
              <svg className="animate-spin h-8 w-8 text-purple-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm">Generating masterpieces...</p>
            </div>
          ) : nicknames.length > 0 ? (
            <ul className="space-y-2">
              {nicknames.map((name, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                  <span className="font-mono text-base text-gray-800 tracking-wide">{name}</span>
                  <button
                    onClick={() => onCopy(name)}
                    className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label={`Copy nickname ${name}`}
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-400 pt-16">
                <p>Your stylish nicknames will appear here!</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NicknameGeneratorModal;
