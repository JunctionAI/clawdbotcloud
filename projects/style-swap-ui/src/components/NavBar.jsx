import React from 'react';

const NavBar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'discover', icon: '🔍', label: 'Discover' },
    { id: 'categories', icon: '📁', label: 'Categories' },
    { id: 'tryon', icon: '📸', label: 'Try On' },
    { id: 'wardrobe', icon: '👔', label: 'Wardrobe' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === tab.id
                ? 'text-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
