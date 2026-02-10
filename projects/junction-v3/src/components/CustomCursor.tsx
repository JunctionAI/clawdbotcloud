'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Simplified custom cursor - reduced complexity for better performance
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Skip on mobile/tablet
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    // Use RAF for smooth updates instead of spring physics
    const updatePosition = () => {
      // Simple lerp for smooth following
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      setPosition({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleHoverStart, { passive: true });
    document.addEventListener('mouseout', handleHoverEnd, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: position.x,
        y: position.y,
        translateX: '-50%',
        translateY: '-50%',
        willChange: 'transform',
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.15 }}
    >
      <div className="w-4 h-4 rounded-full bg-gray-900 border-2 border-white shadow-lg" />
    </motion.div>
  );
}
