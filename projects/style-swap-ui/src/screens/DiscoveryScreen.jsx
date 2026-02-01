import React from 'react';
import celebritiesData from '../data/celebrities.json';

const DiscoveryScreen = ({ onSelectCelebrity }) => {
  const { celebrities } = celebritiesData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Style Swap
          </h1>
          <p className="text-gray-600 text-lg">Discover celebrity fashion & try it on</p>
        </div>

        {/* Celebrity Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fashion Icons</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {celebrities.map((celeb) => (
              <button
                key={celeb.id}
                onClick={() => onSelectCelebrity(celeb)}
                className="flex flex-col items-center group"
              >
                {/* Avatar Circle */}
                <div className="relative w-32 h-32 mb-3">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <img
                      src={celeb.avatar}
                      alt={celeb.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Gradient ring on hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-800 text-center group-hover:text-pink-600 transition-colors">
                  {celeb.name}
                </h3>

                {/* Bio */}
                <p className="text-xs text-gray-500 text-center mt-1 px-2">
                  {celeb.bio}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Browse Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Or Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Tops', icon: '👕', color: 'from-blue-400 to-blue-600' },
              { name: 'Bottoms', icon: '👖', color: 'from-purple-400 to-purple-600' },
              { name: 'Dresses', icon: '👗', color: 'from-pink-400 to-pink-600' },
              { name: 'Accessories', icon: '👒', color: 'from-amber-400 to-amber-600' },
            ].map((category) => (
              <button
                key={category.name}
                className={`bg-gradient-to-br ${category.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-semibold text-lg">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryScreen;
