import React from 'react';

interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, onSearchChange }) => {
  const recommendedKeywords = ['emoji', 'hearts', 'stars', 'arrows', 'currency', 'zodiac', 'math'];

  return (
    <div className="w-full max-w-2xl mb-8 mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-6 tracking-tighter">
          Forge Your Legend. Find Your Symbol.
        </h2>
        <div className="relative text-gray-500 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            </div>
            <input
            id="search"
            name="search"
            className="block w-full bg-white border border-gray-300 rounded-full py-3 pl-12 pr-4 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition-colors shadow-sm"
            placeholder="Search for symbols by category..."
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search symbols by category"
            />
        </div>
      <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
        <span className="text-sm text-gray-500 mr-2">Try:</span>
        {recommendedKeywords.map((keyword) => (
          <button
            key={keyword}
            onClick={() => onSearchChange(keyword)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-purple-200 hover:text-purple-800 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            aria-label={`Search for ${keyword}`}
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;