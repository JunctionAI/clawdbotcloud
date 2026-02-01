import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

const ComparisonSlider = ({ beforeImage, afterImage, className = '' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Before Image (full) */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-white text-[10px] font-black uppercase tracking-widest">
          Original
        </div>
      </div>

      {/* After Image (clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={afterImage} 
          alt="After"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-xl rounded-full text-white text-[10px] font-black uppercase tracking-widest">
          AI Enhanced
        </div>
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <MoveHorizontal size={20} className="text-black" />
        </div>

        {/* Instruction hint (shows initially) */}
        {sliderPosition === 50 && !isDragging && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full text-white text-[9px] font-bold uppercase tracking-wider whitespace-nowrap animate-bounce pointer-events-none">
            ← Drag to Compare →
          </div>
        )}
      </div>

      {/* Percentage indicators */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
        <div className={`px-2 py-1 bg-black/40 backdrop-blur-xl rounded-full text-white text-[8px] font-bold transition-opacity ${sliderPosition < 50 ? 'opacity-100' : 'opacity-30'}`}>
          {(100 - sliderPosition).toFixed(0)}% Original
        </div>
        <div className={`px-2 py-1 bg-black/40 backdrop-blur-xl rounded-full text-white text-[8px] font-bold transition-opacity ${sliderPosition > 50 ? 'opacity-100' : 'opacity-30'}`}>
          {sliderPosition.toFixed(0)}% Enhanced
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
