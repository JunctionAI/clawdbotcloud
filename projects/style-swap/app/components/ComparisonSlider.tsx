'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  isProcessing?: boolean;
}

export default function ComparisonSlider({ 
  beforeImage, 
  afterImage, 
  isProcessing = false 
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Your New Look</h2>
        <p className="text-gray-400 text-sm">
          Slide to compare before and after
        </p>
      </div>

      <div
        className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-dark-card cursor-col-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <Image
            src={beforeImage}
            alt="Before"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
            <span className="text-white text-sm font-medium">Before</span>
          </div>
        </div>

        {/* After Image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {isProcessing ? (
            <div className="absolute inset-0 bg-dark-card flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mb-4 mx-auto rounded-full border-4 border-accent-purple border-t-transparent animate-spin" />
                <p className="text-white font-medium">Creating your look...</p>
                <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
              </div>
            </div>
          ) : (
            <>
              <Image
                src={afterImage}
                alt="After"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-accent-purple to-accent-pink backdrop-blur-sm rounded-full">
                <span className="text-white text-sm font-medium">After ✨</span>
              </div>
            </>
          )}
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 px-6 py-3 bg-dark-card hover:bg-dark-border text-white font-medium rounded-xl transition-colors">
          Share 📤
        </button>
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-pink text-white font-medium rounded-xl hover:shadow-lg hover:shadow-accent-purple/25 transition-all">
          Download 💾
        </button>
      </div>
    </motion.div>
  );
}
