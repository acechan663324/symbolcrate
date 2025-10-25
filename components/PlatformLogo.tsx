import React from 'react';

interface PlatformLogoProps {
  platform: string;
  className?: string;
}

const PlatformLogo: React.FC<PlatformLogoProps> = ({ platform, className = "h-8 w-8" }) => {
  switch (platform.toLowerCase()) {
    case 'valorant':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.526 12.879l-6.491 8.24a.75.75 0 01-1.168-.088l-2.48-4.226a.75.75 0 01.12-1.02l7.15-4.99a.75.75 0 011.08.196l1.789 1.888zM2.474 12.879l6.491 8.24a.75.75 0 001.168-.088l2.48-4.226a.75.75 0 00-.12-1.02l-7.15-4.99a.75.75 0 00-1.08.196l-1.789 1.888zM12 2.25c.34 0 .67.098.95.28l5.65 3.82a.75.75 0 01.3 1.01l-2.3 4.15a.75.75 0 01-1.12.23l-3.48-2.33-3.48 2.33a.75.75 0 01-1.12-.23l-2.3-4.15a.75.75 0 01.3-1.01l5.65-3.82c.28-.182.61-.28.95-.28z" />
        </svg>
      );
    case 'fortnite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3h12v2H6zm0 3h12v2H6zm0 3h12v2H6zm0 3h12v2H6zM4 17.5A1.5 1.5 0 015.5 16h13a1.5 1.5 0 011.5 1.5v0a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5zM3 21h18v-2H3v2z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.38,8.47A6.44,6.44,0,0,1,20.21,12a6.32,6.32,0,0,1-4.23-1.5v6.52a7,7,0,1,1-7-7c0,.1,0,.2,0,.3v3.45a3.5,3.5,0,1,0,3.5,3.5V8.57a10.43,10.43,0,1,0,10.43,10.43A10.33,10.33,0,0,0,22.38,8.47Z" />
        </svg>
      );
    case 'instagram':
       return (
         <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
         </svg>
       );
    default:
      return null;
  }
};
export default PlatformLogo;