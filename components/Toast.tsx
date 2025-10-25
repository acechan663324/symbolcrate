
import React from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <div
      className={`fixed bottom-5 right-5 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {message}
    </div>
  );
};

export default Toast;
