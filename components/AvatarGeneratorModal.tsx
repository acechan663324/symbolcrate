import React from 'react';

interface AvatarGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string | null;
  avatarData: string | null; // base64 string
  isGenerating: boolean;
  onGenerateAgain: () => void;
}

const LoadingState: React.FC = () => {
    const messages = [
        "Brewing your avatar...",
        "Inking the details...",
        "Adding a dash of whimsy...",
        "Polishing the pixels...",
        "It's a knockout!"
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = messages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 2000); // Change message every 2 seconds
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 h-64">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mb-4"></div>
            <p className="font-semibold text-lg">{message}</p>
            <p className="text-sm text-gray-500">This can take a few moments...</p>
        </div>
    );
};

const AvatarGeneratorModal: React.FC<AvatarGeneratorModalProps> = ({
  isOpen,
  onClose,
  nickname,
  avatarData,
  isGenerating,
  onGenerateAgain,
}) => {
  if (!isOpen) return null;

  const downloadImage = () => {
    if (!avatarData || !nickname) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${avatarData}`;
    const safeNickname = nickname.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `avatar_${safeNickname}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
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
            <div className="p-2 bg-orange-100 rounded-lg mr-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
            </div>
            <div>
                 <h2 className="text-xl font-bold text-gray-800">Avatar Studio</h2>
                 <p className="text-sm text-gray-500">Cuphead-Style Generator</p>
            </div>
        </div>

        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border">
            {isGenerating ? (
                <LoadingState />
            ) : avatarData ? (
                <img src={`data:image/png;base64,${avatarData}`} alt={`Cuphead-style avatar for ${nickname}`} className="w-full h-full object-cover"/>
            ) : null}
        </div>
        
        {nickname && !isGenerating && (
             <p className="text-center text-sm text-gray-500 mt-2">
                Your avatar for: <span className="font-bold font-mono">{nickname}</span>
             </p>
        )}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
             <button
                onClick={onGenerateAgain}
                disabled={isGenerating}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
                Try Again
            </button>
            <button
                onClick={downloadImage}
                disabled={isGenerating || !avatarData}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
            </button>
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

export default AvatarGeneratorModal;
