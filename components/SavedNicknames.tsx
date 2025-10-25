import React, { useState, useEffect } from 'react';

const NICKNAMES_STORAGE_KEY = 'symbolCrate_savedNicknames';
type View = 'home' | 'saved' | 'platform' | 'blog' | 'blogDetail';

interface SavedNicknamesProps {
    onCopy: (text: string) => void;
    onNavigate: (view: View) => void;
    onGenerateAvatar: (nickname: string, context?: { theme?: string; keywords?: string; }) => void;
}

const SavedNicknames: React.FC<SavedNicknamesProps> = ({ onCopy, onNavigate, onGenerateAvatar }) => {
    const [savedNicknames, setSavedNicknames] = useState<string[]>([]);

    useEffect(() => {
        try {
            const rawData = localStorage.getItem(NICKNAMES_STORAGE_KEY);
            if (rawData) {
                setSavedNicknames(JSON.parse(rawData));
            }
        } catch (error) {
            console.error("Failed to load nicknames from localStorage", error);
        }
    }, []);

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to delete all saved nicknames? This action cannot be undone.")) {
            try {
                localStorage.removeItem(NICKNAMES_STORAGE_KEY);
                setSavedNicknames([]);
            } catch (error) {
                console.error("Failed to clear nicknames from localStorage", error);
            }
        }
    };

    return (
        <div className="w-full max-w-4xl animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">My Saved Nicknames ({savedNicknames.length})</h1>
                    {savedNicknames.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {savedNicknames.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {savedNicknames.map((name, index) => (
                            <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:shadow-md hover:bg-purple-50 transition-all">
                                <span className="font-mono text-base text-gray-800 tracking-wide truncate pr-2">{name}</span>
                                <div className="flex-shrink-0 flex items-center space-x-1">
                                    <button
                                        onClick={() => onGenerateAvatar(name)}
                                        aria-label={`Create avatar for ${name}`}
                                        className="p-2 rounded-full text-orange-500 bg-orange-100 hover:bg-orange-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onCopy(name)}
                                        className="p-2 rounded-full text-purple-500 bg-purple-100 hover:bg-purple-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400"
                                        aria-label={`Copy nickname ${name}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                          <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                          <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h6a2 2 0 00-2-2H5z" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-gray-400 py-16">
                        <p className="mb-4">You haven't saved any nicknames yet.</p>
                        <button
                            onClick={() => onNavigate('home')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Generate Some Nicknames
                        </button>
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

export default SavedNicknames;