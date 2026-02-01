import React from 'react';

const LookDetailScreen = ({ look, celebrity, onSelectItem, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-md z-40 px-4 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">{look.event}</h1>
            <p className="text-sm text-gray-600">{celebrity.name}</p>
          </div>
        </div>
      </div>

      {/* Look Image */}
      <div className="max-w-screen-xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-6">
          <div className="relative">
            <img
              src={look.image}
              alt={look.event}
              className="w-full max-h-[60vh] object-contain bg-gray-100"
            />
            {/* Info overlay */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              Tap items below to try on
            </div>
          </div>

          {/* Description */}
          <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
            <p className="text-gray-700 mb-4">{look.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(look.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Items Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop This Look</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {look.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
              >
                <div className="flex items-start gap-4">
                  {/* Item Type Icon */}
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.type === 'top' && '👕'}
                    {item.type === 'bottom' && '👖'}
                    {item.type === 'dress' && '👗'}
                    {item.type === 'accessory' && '👒'}
                    {item.type === 'full' && '🎽'}
                  </div>

                  {/* Item Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-pink-600 text-xl group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Try Full Look Button */}
        <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
          Try Full Look ✨
        </button>
      </div>
    </div>
  );
};

export default LookDetailScreen;
