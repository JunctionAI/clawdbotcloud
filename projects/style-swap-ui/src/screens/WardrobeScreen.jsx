import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';

const WardrobeScreen = ({ onSelectItem, onTryOn }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'outfits'

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = () => {
    const saved = JSON.parse(localStorage.getItem('savedItems') || '[]');
    const items = saved
      .map((id) => productsData.products.find((p) => p.id === id))
      .filter(Boolean);
    setSavedItems(items);
  };

  const handleRemoveItem = (itemId) => {
    const saved = JSON.parse(localStorage.getItem('savedItems') || '[]');
    const updated = saved.filter((id) => id !== itemId);
    localStorage.setItem('savedItems', JSON.stringify(updated));
    loadSavedItems();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Wardrobe
          </h1>
          <p className="text-gray-600 text-lg">Your saved fashion favorites</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('items')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'items'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Saved Items ({savedItems.length})
          </button>
          <button
            onClick={() => setActiveTab('outfits')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'outfits'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Saved Outfits (0)
          </button>
        </div>

        {/* Content */}
        {activeTab === 'items' && (
          <>
            {savedItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">👔</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No saved items yet</h2>
                <p className="text-gray-600 mb-6">
                  Start exploring and save items you love by tapping the heart icon
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 group"
                  >
                    {/* Image */}
                    <button
                      onClick={() => onSelectItem(item)}
                      className="relative aspect-square overflow-hidden w-full"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        ❌
                      </button>
                    </button>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                        {item.name}
                      </h3>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onTryOn(item)}
                          className="flex-1 py-2 px-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg text-xs font-medium text-white transition-colors"
                        >
                          Try On
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'outfits' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎽</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-gray-600">
              Save complete outfits and create your own style collections
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobeScreen;
