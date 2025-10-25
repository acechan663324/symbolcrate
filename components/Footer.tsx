import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50/50 border-t border-gray-200 mt-auto py-4">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Symbol Crate. All Rights Reserved.</p>
        <p className="mt-1">Find and copy special characters with a single click.</p>
      </div>
    </footer>
  );
};

export default Footer;