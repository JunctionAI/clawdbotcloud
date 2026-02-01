import React from 'react';

const CelebProfileScreen = ({ celebrity, onSelectLook, onBack }) => {
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
          <div className="flex items-center gap-3 flex-1">
            <img
              src={celebrity.avatar}
              alt={celebrity.name}
              className="w-12 h-12 rounded-full border-2 border-pink-500"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">{celebrity.name}</h1>
              <p className="text-sm text-gray-600">{celebrity.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Looks Grid */}
      <div className="max-w-screen-xl mx-auto px-4 pt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {celebrity.name}'s Iconic Looks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {celebrity.looks.map((look) => (
            <button
              key={look.id}
              onClick={() => onSelectLook(look)}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={look.image}
                  alt={look.event}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Event label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{look.event}</h3>
                  <p className="text-sm opacity-90">
                    {new Date(look.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              </div>

              {/* Item count */}
              <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {look.items.length} {look.items.length === 1 ? 'Item' : 'Items'} Available
                  </span>
                  <span className="text-pink-600 font-semibold">View →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CelebProfileScreen;
