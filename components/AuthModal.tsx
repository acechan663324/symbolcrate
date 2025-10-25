import React, { useState, useEffect, useRef } from 'react';

declare global {
    interface Window {
        google: any;
    }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSignIn: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onEmailSignIn }) => {
  const [email, setEmail] = useState('');
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && typeof window.google !== 'undefined' && googleButtonRef.current) {
        // Prevent duplicate rendering
        if (googleButtonRef.current.childElementCount === 0) {
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "pill", width: "300" }
            );
            window.google.accounts.id.prompt();
        }
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSignIn(email);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
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

        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sign In or Sign Up</h2>
            <p className="text-sm text-gray-500 mt-1">Enter your email to continue.</p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
            </div>
            <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
                Continue with Email
            </button>
        </form>

        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <div ref={googleButtonRef} id="google-signin-button-modal" className="flex justify-center"></div>
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

export default AuthModal;
