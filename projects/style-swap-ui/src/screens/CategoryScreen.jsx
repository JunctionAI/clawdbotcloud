import React, { useState } from 'react';
import productsData from '../data/products.json';

const CategoryScreen = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'tops', name: 'Tops', icon: '👕', color: 'from-blue-400 to-blue-600' },
    { id: 'bottoms', name: 'Bottoms', icon: '👖', color: 'from-purple-400 to-purple-600' },
    { id: 'dresses', name: 'Dresses', icon: '👗', color: 'from-pink-400 to-pink-600' },
    { id: 'accessories', name: 'Accessories', icon: '👒', color: 'from-amber-400 to-amber-600' },
  ];

  const getProductsByCategory = (categoryId) => {
    return productsData.products.filter((p) => p.category === categoryId);
  };

  if (selectedCategory) {
    const products = getProductsByCategory(selectedCategory);
    const category = categories.find((c) => c.id === selectedCategory);

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20">
        {/* Header */}
        <div className="sticky top-0 bg-white shadow-md z-40 px-4 py-4">
          <div className="max-w-screen-xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-2xl hover:scale-110 transition-transform"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <h1 className="text-xl font-bold text-gray-800">{category.name}</h1>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-screen-xl mx-auto px-4 pt-6">
          <p className="text-gray-600 mb-4">{products.length} items available</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => onSelectItem(product)}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  {product.buyLinks?.[0] && (
                    <div className="text-sm font-semibold text-pink-600">
                      From {product.buyLinks[0].price}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Category selection view
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-20 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Browse by Category
          </h1>
          <p className="text-gray-600 text-lg">Find your perfect style</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const count = getProductsByCategory(category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`bg-gradient-to-br ${category.color} text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <div className="font-bold text-xl mb-2">{category.name}</div>
                <div className="text-sm opacity-90">{count} items</div>
              </button>
            );
          })}
        </div>

        {/* All Items Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productsData.products.slice(0, 12).map((product) => (
              <button
                key={product.id}
                onClick={() => onSelectItem(product)}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen;
