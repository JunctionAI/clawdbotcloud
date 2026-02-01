'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ClothingItem } from '../types';
import { clothingCatalog, categories } from '../data/clothing';

interface ClothingCatalogProps {
  onSelectItem: (item: ClothingItem) => void;
  selectedItem?: ClothingItem;
  disabled?: boolean;
}

export default function ClothingCatalog({ onSelectItem, selectedItem, disabled }: ClothingCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? clothingCatalog
    : clothingCatalog.filter(item => item.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Style</h2>
        <p className="text-gray-400 text-sm">
          Browse our collection and find your perfect look
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              whitespace-nowrap transition-all duration-200
              ${activeCategory === category.id
                ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white'
                : 'bg-dark-card text-gray-400 hover:bg-dark-border hover:text-white'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Clothing Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectItem(item)}
            disabled={disabled}
            className={`
              relative group rounded-xl overflow-hidden bg-dark-card
              border-2 transition-all duration-300
              ${selectedItem?.id === item.id
                ? 'border-accent-purple ring-4 ring-accent-purple/20'
                : 'border-transparent hover:border-accent-purple/50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {selectedItem?.id === item.id && (
                <div className="absolute inset-0 bg-accent-purple/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent-purple flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
                {item.name}
              </h3>
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 bg-dark-bg px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No items found in this category</p>
        </div>
      )}
    </motion.div>
  );
}
