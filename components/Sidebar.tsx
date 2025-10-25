import React from 'react';
import { SymbolCategory } from '../constants/symbols';

interface SidebarProps {
  categories: SymbolCategory[];
  activeCategory: string;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory }) => {

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryName: string) => {
    e.preventDefault();
    const formattedId = `category-${categoryName.replace(/\s+/g, '-')}`;
    const element = document.getElementById(formattedId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Manually update URL hash without causing a page jump
      window.history.pushState(null, '', `#${formattedId}`);
    }
  };

  return (
    <aside className="w-56 p-4 flex-shrink-0 hidden lg:block">
      <nav className="sticky top-20">
        <h2 className="text-lg font-semibold text-gray-600 mb-4 px-3">Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.name} className="mb-1">
              <a
                href={`#category-${cat.name.replace(/\s+/g, '-')}`}
                onClick={(e) => handleNavClick(e, cat.name)}
                className={`w-full block text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  activeCategory === cat.name
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
