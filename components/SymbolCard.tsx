import React, { useState } from 'react';

interface SymbolCardProps {
  symbol: string;
  onSelect: (symbol: string) => void;
  onCopy: (symbol: string) => void;
  onInsert?: (symbol: string) => void;
  onGenerateNickname: (symbol: string) => void;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ symbol, onSelect, onCopy, onInsert, onGenerateNickname }) => {
  const [isHovered, setIsHovered] = useState(false);

  // A wrapper for consistent icon styling
  const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-5 h-5 text-gray-400 mr-3">{children}</div>
  );

  const ViewIcon = () => (
    <IconWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </IconWrapper>
  );
  const CopyIcon = () => (
    <IconWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </IconWrapper>
  );
   const InsertIcon = () => (
    <IconWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </IconWrapper>
  );
  const AINicknameIcon = () => (
    <IconWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    </IconWrapper>
  );


  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white rounded-lg flex items-center justify-center aspect-square cursor-pointer transition-all duration-200 ease-in-out shadow-md ${isHovered ? 'bg-purple-50 ring-2 ring-purple-300' : ''}`}
    >
      <span className="text-4xl md:text-5xl font-mono select-none">
        {symbol}
      </span>

      {isHovered && (
        <div
          className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 origin-top animate-scale-in"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => onSelect(symbol)}
              className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              role="menuitem"
            >
              <ViewIcon />
              <span>View Details</span>
            </button>
            <button
              onClick={() => onCopy(symbol)}
              className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              role="menuitem"
            >
              <CopyIcon />
              <span>Copy Symbol</span>
            </button>
             {onInsert && (
              <button
                onClick={() => onInsert(symbol)}
                className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                role="menuitem"
              >
                <InsertIcon />
                <span>Insert to Studio</span>
              </button>
            )}
            <button
              onClick={() => onGenerateNickname(symbol)}
              className="w-full text-left flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              role="menuitem"
            >
              <AINicknameIcon />
              <span>AI Nickname</span>
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.1s ease-out forwards;
        }
        .origin-top {
          transform-origin: top;
        }
      `}</style>
    </div>
  );
};

export default SymbolCard;