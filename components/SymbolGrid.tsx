import React from 'react';
import { SymbolCategory } from '../constants/symbols';
import EmojiListItem from './EmojiListItem';

interface SymbolGridProps {
  categories: SymbolCategory[];
  onSymbolSelect: (symbol: string) => void;
  onCopy: (symbol: string) => void;
  onInsert?: (symbol: string) => void;
  onGenerateNickname: (symbol: string) => void;
}

const SymbolGrid: React.FC<SymbolGridProps> = ({ categories, onSymbolSelect, onCopy, onInsert, onGenerateNickname }) => {
  if (categories.length === 1 && categories[0].symbols.length === 0) {
    return <p className="text-gray-500 mt-8 text-center">No symbols found for your search.</p>;
  }

  return (
    <div className="w-full">
      {categories.map((category) => (
        <section key={category.name} id={`category-${category.name.replace(/\s+/g, '-')}`} className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 tracking-tight text-center md:text-left">
            {category.name}
          </h2>
          {category.description && (
             <p className="text-gray-600 mb-6 text-center md:text-left max-w-3xl">{category.description}</p>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.symbols.map((item, index) => {
              const { symbol, name } = item;

              return (
                <EmojiListItem
                  key={`${category.name}-${symbol}-${index}`}
                  symbol={symbol}
                  name={name}
                  onSelect={onSymbolSelect}
                  onCopy={onCopy}
                  onGenerateNickname={onGenerateNickname}
                  onInsert={onInsert}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SymbolGrid;