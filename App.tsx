import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import Header from './components/Header';
import SymbolGrid from './components/SymbolGrid';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Search from './components/Search';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { SEARCHABLE_CATEGORIES } from './constants/symbols';
import SymbolDetail from './components/SymbolDetail';
import SavedNicknames from './components/SavedNicknames';
import PlatformNicknamesPage from './components/PlatformNicknamesPage';
import BlogPage from './components/BlogPage';
import BlogPostDetail from './components/BlogPostDetail';
import { blogPosts } from './constants/blogPosts';
import AvatarGeneratorModal from './components/AvatarGeneratorModal';
import GeneratorPage from './components/GeneratorPage';
import GeneratorStudio from './components/GeneratorStudio';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import PricingPage from './components/PricingPage';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type View = 'home' | 'generator' | 'saved' | 'platform' | 'blog' | 'blogDetail' | 'pricing';

interface UserInfo {
  email: string;
  name?: string;
  picture?: string;
  isSubscribed?: boolean;
  plan?: 'monthly' | 'yearly' | '2-year' | string;
}

declare global {
    interface Window {
        google: any;
    }
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const copyToClipboard = useCopyToClipboard();
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [initialGeneratorData, setInitialGeneratorData] = useState<{ platform?: string }>({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    try {
      const item = window.localStorage.getItem('userInfo');
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading userInfo from localStorage", error);
      return null;
    }
  });

  // State for homepage Generator Studio
  const [studioRequiredSymbols, setStudioRequiredSymbols] = useState<string[]>([]);

  // State for Avatar Generator
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [nicknameForAvatar, setNicknameForAvatar] = useState<string | null>(null);
  const [generatedAvatarData, setGeneratedAvatarData] = useState<string | null>(null);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState<boolean>(false);

  const [activeCategory, setActiveCategory] = useState<string>(SEARCHABLE_CATEGORIES[0]?.name || '');
  
  // Persist user info to local storage
  useEffect(() => {
    try {
      if (userInfo) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
      } else {
        window.localStorage.removeItem('userInfo');
      }
    } catch (error) {
      console.error("Error saving userInfo to localStorage", error);
    }
  }, [userInfo]);
  
  const handleSignOut = () => {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    setUserInfo(null);
    showToast("You've been signed out.");
  };

  useEffect(() => {
    if (currentView !== 'home' || selectedSymbol) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryName = entry.target.id.replace('category-', '').replace(/-/g, ' ');
            setActiveCategory(categoryName);
          }
        });
      },
      {
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll('section[id^="category-"]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [currentView, selectedSymbol, searchQuery]);


  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000); // Hide toast after 3 seconds
  }, []);

  const handleCopy = useCallback(async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      showToast(`Copied "${text}" to clipboard!`);
    } else {
      showToast('Failed to copy.');
    }
  }, [copyToClipboard, showToast]);
  
  const handleSaveNickname = (nicknameToSave: string) => {
    try {
        const NICKNAMES_STORAGE_KEY = 'symbolCrate_savedNicknames';
        const existingNicknamesRaw = localStorage.getItem(NICKNAMES_STORAGE_KEY);
        const existingNicknames: string[] = existingNicknamesRaw ? JSON.parse(existingNicknamesRaw) : [];
        
        if (existingNicknames.includes(nicknameToSave)) {
            showToast(`"${nicknameToSave}" is already saved!`);
            return;
        }

        const updatedNicknames = [...existingNicknames, nicknameToSave];
        localStorage.setItem(NICKNAMES_STORAGE_KEY, JSON.stringify(updatedNicknames));
        showToast(`Saved "${nicknameToSave}"!`);
    } catch (error) {
        console.error("Failed to save nickname to localStorage", error);
        showToast("Could not save nickname. Storage might be full.");
    }
  };

    const handleEmailSignIn = (email: string) => {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            showToast("Please enter a valid email address.");
            return;
        }
        setUserInfo({ email });
        setIsAuthModalOpen(false);
        showToast(`Welcome, ${email}!`);
    };
  
    // Google Sign-In Initialization
    useEffect(() => {
        if (typeof window === 'undefined' || !window.google) return;

        const handleGoogleSignIn = (response: any) => {
            try {
                const payload = JSON.parse(atob(response.credential.split('.')[1]));
                setUserInfo({
                    name: payload.name,
                    email: payload.email,
                    picture: payload.picture,
                });
                setIsAuthModalOpen(false); // Close modal on success
                showToast(`Welcome, ${payload.name}!`);
            } catch (error) {
                console.error("Error decoding Google credential response:", error);
                showToast("Failed to sign in.");
            }
        };

        window.google.accounts.id.initialize({
            // IMPORTANT: Replace with your actual Google Client ID from Google Cloud Console
            client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
            callback: handleGoogleSignIn,
        });
        
    }, [showToast]);

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedSymbol(null);
    setSelectedPlatform(null);
    setCurrentView('home');
  };
  
  const handleNavigate = (view: View) => {
    setSelectedSymbol(null); 
    setSelectedPlatform(null);
    setSelectedPostSlug(null);
    setInitialGeneratorData({}); // Clear initial data on normal navigation
    setCurrentView(view);
    window.scrollTo(0, 0);
  }

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    setCurrentView('platform');
    window.scrollTo(0, 0);
  };

  const handleGenerateForPlatform = (platformName: string) => {
    setInitialGeneratorData({ platform: platformName });
    setCurrentView('generator');
    setSelectedPlatform(null);
    window.scrollTo(0, 0);
  };

  const handlePostSelect = (slug: string) => {
    setSelectedPostSlug(slug);
    setCurrentView('blogDetail');
    window.scrollTo(0, 0);
  };

  const handleInsertSymbolToStudio = (symbol: string) => {
    if (!studioRequiredSymbols.includes(symbol)) {
      setStudioRequiredSymbols(prev => [...prev, symbol].slice(0, 5)); // Limit to 5
      showToast(`Added '${symbol}' to Generator Studio`);
    } else {
      showToast(`'${symbol}' is already in the studio`);
    }
  };
  
  const handleRemoveSymbolFromStudio = (symbolToRemove: string) => {
    setStudioRequiredSymbols(prev => prev.filter(s => s !== symbolToRemove));
  };
  
  const handleGenerateAvatar = useCallback(async (nickname: string, context?: { theme?: string; keywords?: string }) => {
    if (!userInfo) {
        setIsAuthModalOpen(true);
        showToast("Please sign in to use the Avatar Generator.");
        return;
    }
    if (!userInfo.isSubscribed) {
        showToast("Avatar Generation is a premium feature.");
        handleNavigate('pricing');
        return;
    }
    if (!nickname) return;
    setNicknameForAvatar(nickname);
    setIsAvatarModalOpen(true);
    setIsGeneratingAvatar(true);
    setGeneratedAvatarData(null);

    try {
      let inspiration = `inspired by the nickname: "${nickname}".`;
      if (context) {
          const themePart = context.theme ? `the theme "${context.theme}"` : '';
          const keywordsPart = context.keywords ? `the keywords "${context.keywords}"` : '';
          const contextParts = [themePart, keywordsPart].filter(Boolean);
          if (contextParts.length > 0) {
              inspiration += ` The character should also incorporate elements from ${contextParts.join(' and ')}.`;
          }
      }

      const prompt = `Create a profile picture avatar in the iconic 1930s "Cuphead" cartoon art style. The character should be ${inspiration} The character should be fun, expressive, and unique, with exaggerated features, rubber hose style limbs (if visible), and pie eyes. The background should be a simple, solid color or a subtle vintage pattern that complements the character. The image must be a square headshot, perfect for a profile picture.`;
      
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
      });

      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      setGeneratedAvatarData(base64ImageBytes);

    } catch (error) {
      console.error("Error generating avatar:", error);
      showToast("Failed to create avatar. The art machine might be busy!");
      // Close modal on error after a short delay
      setTimeout(() => {
          setIsAvatarModalOpen(false);
          setNicknameForAvatar(null);
      }, 2000);
    } finally {
      setIsGeneratingAvatar(false);
    }
  }, [showToast, userInfo]);

  const handleCloseAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setNicknameForAvatar(null);
    setGeneratedAvatarData(null);
  };
  
  const handleSubscribe = (plan: 'monthly' | 'yearly' | '2-year' | string, planName: string) => {
    if (!userInfo) {
        setIsAuthModalOpen(true);
        showToast("Please sign in to subscribe.");
        return;
    }
    setUserInfo(prev => ({
        ...prev!,
        isSubscribed: true,
        plan: plan,
    }));
    handleNavigate('generator');
    showToast(`Successfully subscribed to the ${planName} plan!`);
  };

  const displayedCategories = useMemo(() => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return SEARCHABLE_CATEGORIES;
    }
    const lowerCaseQuery = trimmedQuery.toLowerCase();
  
    const filteredCategories = SEARCHABLE_CATEGORIES.map(cat => {
      // If category name matches, include all its symbols
      if (cat.name.toLowerCase().includes(lowerCaseQuery)) {
        return cat;
      }
      // Filter symbols within the category by symbol or name
      const filteredSymbols = cat.symbols.filter(s => 
        s.symbol.toLowerCase().includes(lowerCaseQuery) || s.name.toLowerCase().includes(lowerCaseQuery)
      );
  
      if (filteredSymbols.length > 0) {
        return { ...cat, symbols: filteredSymbols };
      }
      return null;
    }).filter((c): c is NonNullable<typeof c> => c !== null);
  
    if (filteredCategories.length > 0) {
      return filteredCategories;
    }
  
    return [{
      name: `Results for "${trimmedQuery}"`,
      description: '',
      symbols: [],
    }];
  }, [searchQuery]);

  const renderContent = () => {
    if (selectedSymbol) {
      return (
        <SymbolDetail 
          symbol={selectedSymbol}
          onBack={handleBackToHome}
          onCopy={handleCopy}
          onSave={handleSaveNickname}
          showToast={showToast}
          onGenerateAvatar={handleGenerateAvatar}
        />
      );
    }
    
    if (currentView === 'platform' && selectedPlatform) {
      return (
        <PlatformNicknamesPage
          platform={selectedPlatform}
          onBack={handleBackToHome}
          onCopy={handleCopy}
          onSave={handleSaveNickname}
          showToast={showToast}
          onGenerateForPlatform={handleGenerateForPlatform}
        />
      );
    }
    
    if (currentView === 'blogDetail' && selectedPostSlug) {
      const post = blogPosts.find(p => p.slug === selectedPostSlug);
      if (post) {
        return <BlogPostDetail post={post} onBack={() => handleNavigate('blog')} />;
      }
    }

    switch (currentView) {
      case 'pricing':
        return <PricingPage onSubscribe={handleSubscribe} />;
      case 'generator':
        return <GeneratorPage 
          showToast={showToast} 
          onSaveNickname={handleSaveNickname}
          onCopy={handleCopy}
          onGenerateAvatar={handleGenerateAvatar}
          initialData={initialGeneratorData}
          onPlatformSelect={handlePlatformSelect}
          isSubscribed={!!userInfo?.isSubscribed}
          onNavigate={handleNavigate}
        />;
      case 'saved':
        return <SavedNicknames onCopy={handleCopy} onNavigate={handleNavigate} onGenerateAvatar={handleGenerateAvatar} />;
      case 'blog':
        return <BlogPage posts={blogPosts} onPostSelect={handlePostSelect} />;
      case 'home':
      default:
        return (
            <div className="flex flex-col lg:flex-row w-full gap-8">
                <Sidebar categories={SEARCHABLE_CATEGORIES} activeCategory={activeCategory} />
                <div className="w-full lg:flex-1 min-w-0">
                    <Search 
                        searchQuery={searchQuery} 
                        onSearchChange={setSearchQuery}
                    />
                    <GeneratorStudio
                      showToast={showToast}
                      onSaveNickname={handleSaveNickname}
                      onCopy={handleCopy}
                      onGenerateAvatar={handleGenerateAvatar}
                      requiredSymbols={studioRequiredSymbols}
                      onRemoveRequiredSymbol={handleRemoveSymbolFromStudio}
                    />
                    <SymbolGrid
                        categories={displayedCategories}
                        onSymbolSelect={handleSymbolSelect}
                        onCopy={handleCopy}
                        onInsert={handleInsertSymbolToStudio}
                        onGenerateNickname={handleSymbolSelect}
                    />
                </div>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        userInfo={userInfo} 
        onSignOut={handleSignOut}
        onSignInClick={() => setIsAuthModalOpen(true)}
      />
      <main className="flex-1 container mx-auto w-full p-4 sm:p-6 lg:p-8 flex">
          {renderContent()}
      </main>
      <Footer />
      <Toast message={toastMessage} isVisible={isToastVisible} />
      <AvatarGeneratorModal 
        isOpen={isAvatarModalOpen}
        onClose={handleCloseAvatarModal}
        nickname={nicknameForAvatar}
        avatarData={generatedAvatarData}
        isGenerating={isGeneratingAvatar}
        onGenerateAgain={() => nicknameForAvatar && handleGenerateAvatar(nicknameForAvatar)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onEmailSignIn={handleEmailSignIn}
      />
    </div>
  );
};

export default App;