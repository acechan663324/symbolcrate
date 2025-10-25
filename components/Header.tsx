import React, { useState, useEffect, useRef } from 'react';

type View = 'home' | 'generator' | 'saved' | 'platform' | 'blog' | 'blogDetail' | 'pricing' | 'symbolArt';

interface UserInfo {
  email: string;
  name?: string;
  picture?: string;
  isSubscribed?: boolean;
}

interface HeaderProps {
    currentView: View;
    onNavigate: (view: View) => void;
    userInfo: UserInfo | null;
    onSignOut: () => void;
    onSignInClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, userInfo, onSignOut, onSignInClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const navLinkClasses = (view: View) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
        currentView === view || (currentView === 'blogDetail' && view === 'blog')
        ? 'bg-purple-100 text-purple-700'
        : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
    }`;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white/50 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center flex-shrink-0 cursor-pointer" 
            onClick={() => {
              onNavigate('home');
            }}
            role="button"
            aria-label="Go to homepage"
          >
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Symbol Crate
            </span>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-2">
              <button onClick={() => onNavigate('home')} className={navLinkClasses('home')}>
                Symbols
              </button>
              <button onClick={() => onNavigate('generator')} className={navLinkClasses('generator')}>
                Generator
              </button>
              <button onClick={() => onNavigate('symbolArt')} className={navLinkClasses('symbolArt')}>
                Symbol Art
              </button>
              <button onClick={() => onNavigate('blog')} className={navLinkClasses('blog')}>
                Blog
              </button>
               <button onClick={() => onNavigate('pricing')} className={navLinkClasses('pricing')}>
                Pricing
              </button>
              <button onClick={() => onNavigate('saved')} className={navLinkClasses('saved')}>
                Saved Nicknames
              </button>
            </nav>
            <div className="ml-4">
              {userInfo ? (
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex text-sm bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500 items-center justify-center h-9 w-9">
                      <span className="sr-only">Open user menu</span>
                      {userInfo.picture ? (
                        <img className="h-9 w-9 rounded-full" src={userInfo.picture} alt="User avatar" referrerPolicy="no-referrer" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      )}
                  </button>
                  {isDropdownOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30" role="menu" aria-orientation="vertical">
                          <div className="px-4 py-3 border-b">
                              <p className="text-sm font-medium text-gray-900 truncate">{userInfo.name || 'User'}</p>
                              <p className="text-sm text-gray-500 truncate">{userInfo.email}</p>
                               {userInfo.isSubscribed && (
                                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold text-purple-800 bg-purple-200 rounded-full">
                                    Premium Member
                                </span>
                               )}
                          </div>
                          <div className="py-1">
                              <button onClick={() => { onSignOut(); setIsDropdownOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                  Sign out
                              </button>
                          </div>
                      </div>
                  )}
                </div>
              ) : (
                <button
                    onClick={onSignInClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                    Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;