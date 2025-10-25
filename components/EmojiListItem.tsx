import React from 'react';

interface EmojiListItemProps {
  symbol: string;
  name: string;
  onSelect: (symbol: string) => void;
  onCopy: (symbol: string) => void;
  onGenerateNickname: (symbol: string) => void;
  onInsert?: (symbol: string) => void;
}

const EmojiListItem: React.FC<EmojiListItemProps> = ({ symbol, name, onSelect, onCopy, onGenerateNickname, onInsert }) => {
  const baseButtonClasses = "w-full text-center px-3 py-2 text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";

  // Icons for buttons
  const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
  const DetailsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
  const AINicknameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
  const InsertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-row items-center justify-start gap-6 transition-shadow hover:shadow-xl border border-gray-200 min-h-[160px]">
      {/* Left Column: Symbol and Name */}
      <div className="flex flex-col items-center justify-center flex-shrink-0 w-28 text-center">
        <span className="text-7xl leading-none font-mono">{symbol}</span>
        <span className="text-gray-600 font-medium truncate mt-2 text-xs w-full">{name}</span>
      </div>

      {/* Right Column: Action Buttons */}
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={() => onCopy(symbol)}
          className={`${baseButtonClasses} text-purple-700 bg-purple-100 hover:bg-purple-200 focus:ring-purple-500`}
          aria-label={`Copy ${name || symbol}`}
        >
          <CopyIcon />
          <span>Copy</span>
        </button>
        <button
          onClick={() => onSelect(symbol)}
          className={`${baseButtonClasses} text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500`}
          aria-label={`Details for ${name || symbol}`}
        >
          <DetailsIcon />
          <span>Details</span>
        </button>
        <button
          onClick={() => onGenerateNickname(symbol)}
          className={`${baseButtonClasses} text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500`}
          aria-label={`Generate nickname for ${name || symbol}`}
        >
          <AINicknameIcon />
          <span>AI Nickname</span>
        </button>
        {onInsert && (
          <button
            onClick={() => onInsert(symbol)}
            className={`${baseButtonClasses} text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500`}
            aria-label={`Insert ${name || symbol} to Studio`}
          >
            <InsertIcon />
            <span>Insert to Studio</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EmojiListItem;