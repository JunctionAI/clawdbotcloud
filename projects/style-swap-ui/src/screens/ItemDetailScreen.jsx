import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';

const ItemDetailScreen = ({ item, onSelectItem, onTryOn, onBack, userLocation = 'global' }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [similarItems, setSimilarItems] = useState([]);

  useEffect(() => {
    // Load similar items based on similarity graph
    const similar = item.similar
      .map((id) => productsData.products.find((p) => p.id === id))
      .filter(Boolean);
    setSimilarItems(similar);

    // Check if item is saved
    const saved = JSON.parse(localStorage.getItem('savedItems') || '[]');
    setIsSaved(saved.includes(item.id));
  }, [item]);

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('savedItems') || '[]');
    if (isSaved) {
      const updated = saved.filter((id) => id !== item.id);
      localStorage.setItem('savedItems', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      saved.push(item.id);
      localStorage.setItem('savedItems', JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  // Filter buy links by user location
  const relevantLinks = item.buyLinks?.filter(
    (link) => link.region === userLocation || link.region === 'global'
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-md z-40 px-4 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          <button
            onClick={handleSave}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pt-6">
        {/* Product Image */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-6">
          <div className="relative aspect-square">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h1>
            <p className="text-gray-600 mb-4">{item.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Try On Button */}
            <button
              onClick={() => onTryOn(item)}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-4"
            >
              Try On This Item 📸
            </button>

            {/* Buy Links */}
            {relevantLinks.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Shop Similar Items</h3>
                <div className="space-y-2">
                  {relevantLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{link.retailer}</div>
                        <div className="text-sm text-gray-600">{link.price}</div>
                      </div>
                      <span className="text-pink-600">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Items Grid (Pinterest style) */}
        {similarItems.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">You Might Also Like</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {similarItems.map((similar) => (
                <button
                  key={similar.id}
                  onClick={() => onSelectItem(similar)}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={similar.image}
                      alt={similar.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Quick try-on overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">View Item</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                      {similar.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 capitalize">{similar.category}</span>
                      {similar.buyLinks?.[0] && (
                        <span className="text-xs font-semibold text-pink-600">
                          {similar.buyLinks[0].price}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Infinite scroll hint */}
            <div className="text-center mt-6 text-gray-500">
              <p className="text-sm">Tap any item to discover more styles ✨</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailScreen;
