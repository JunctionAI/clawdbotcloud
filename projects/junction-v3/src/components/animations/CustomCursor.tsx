'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click' | 'text' | 'hidden' | 'drag';

interface CursorConfig {
  size: number;
  borderWidth: number;
  color: string;
  mixBlendMode: string;
}

const cursorConfigs: Record<CursorState, CursorConfig> = {
  default: {
    size: 12,
    borderWidth: 2,
    color: '#1f2937',
    mixBlendMode: 'normal',
  },
  hover: {
    size: 48,
    borderWidth: 2,
    color: '#3b82f6',
    mixBlendMode: 'difference',
  },
  click: {
    size: 8,
    borderWidth: 2,
    color: '#8b5cf6',
    mixBlendMode: 'normal',
  },
  text: {
    size: 4,
    borderWidth: 0,
    color: '#3b82f6',
    mixBlendMode: 'difference',
  },
  hidden: {
    size: 0,
    borderWidth: 0,
    color: 'transparent',
    mixBlendMode: 'normal',
  },
  drag: {
    size: 64,
    borderWidth: 2,
    color: '#ec4899',
    mixBlendMode: 'difference',
  },
};

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  // Use motion values for smooth cursor following
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring-based smooth following
  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Trailing cursor (slower follow)
  const trailSpringConfig = { damping: 30, stiffness: 200 };
  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);
  
  const rafRef = useRef<number>();
  
  useEffect(() => {
    // Skip on mobile/tablet
    if (typeof window !== 'undefined') {
      const isMobile = window.matchMedia('(max-width: 1024px)').matches;
      const isTouch = 'ontouchstart' in window;
      if (isMobile || isTouch) return;
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    
    const handleMouseDown = () => {
      setCursorState('click');
    };
    
    const handleMouseUp = () => {
      // Restore previous state
      const target = document.elementFromPoint(cursorX.get(), cursorY.get());
      if (target) {
        updateCursorStateFromElement(target as HTMLElement);
      } else {
        setCursorState('default');
      }
    };
    
    const updateCursorStateFromElement = (element: HTMLElement) => {
      // Check for custom cursor states via data attributes
      const customState = element.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorState;
      const customText = element.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      
      if (customState) {
        setCursorState(customState);
        setCursorText(customText || '');
        return;
      }
      
      // Check for interactive elements
      const isLink = element.tagName === 'A' || element.closest('a');
      const isButton = element.tagName === 'BUTTON' || element.closest('button') || element.getAttribute('role') === 'button';
      const isInput = element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
      const isDraggable = element.getAttribute('draggable') === 'true';
      
      if (isDraggable) {
        setCursorState('drag');
        setCursorText('Drag');
      } else if (isLink || isButton) {
        setCursorState('hover');
        setCursorText('');
      } else if (isInput) {
        setCursorState('text');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      updateCursorStateFromElement(e.target as HTMLElement);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Copy ref value to variable for cleanup
    const currentRaf = rafRef.current;
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (currentRaf) cancelAnimationFrame(currentRaf);
    };
  }, [cursorX, cursorY]);
  
  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined') {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const isTouch = 'ontouchstart' in window;
    if (isMobile || isTouch) return null;
  }
  
  const config = cursorConfigs[cursorState];
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: config.size,
          height: config.size,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: '100%',
            height: '100%',
            borderWidth: config.borderWidth,
            borderColor: config.color,
            borderStyle: 'solid',
            backgroundColor: cursorState === 'hover' ? 'rgba(255,255,255,0.1)' : 'transparent',
            mixBlendMode: config.mixBlendMode as React.CSSProperties['mixBlendMode'],
          }}
          animate={{
            scale: cursorState === 'click' ? 0.8 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Cursor text */}
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              style={{ color: config.color }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: 4,
          height: 4,
          opacity: isVisible && cursorState !== 'hidden' ? 0.4 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{ backgroundColor: config.color }}
        />
      </motion.div>
    </>
  );
}

// ============================================
// CURSOR HOVER WRAPPER
// ============================================

interface CursorHoverProps {
  children: React.ReactNode;
  cursorType?: CursorState;
  cursorText?: string;
  className?: string;
}

export function CursorHover({
  children,
  cursorType = 'hover',
  cursorText,
  className = '',
}: CursorHoverProps) {
  return (
    <div
      data-cursor={cursorType}
      data-cursor-text={cursorText}
      className={className}
    >
      {children}
    </div>
  );
}

// ============================================
// MAGNETIC CURSOR WRAPPER
// ============================================

interface MagneticCursorProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticCursor({
  children,
  strength = 0.3,
  className = '',
}: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const smoothX = useSpring(x, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 20 });
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [strength, x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={className}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}
