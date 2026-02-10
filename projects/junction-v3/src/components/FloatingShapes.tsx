'use client';

import { motion } from 'framer-motion';

// Simplified floating shapes - fewer elements, simpler animations, no scroll-linked transforms
// This dramatically improves performance while maintaining visual interest

function FloatingRing({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay, duration: 1 }}
    >
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            strokeDasharray="20 10"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function FloatingTriangle({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ delay, duration: 1 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        <svg width="40" height="35" viewBox="0 0 40 35">
          <polygon
            points="20,0 40,35 0,35"
            fill="none"
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Simplified - only 4 shapes total, no scroll-linked transforms, simpler animations
export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ willChange: 'auto' }}>
      <FloatingRing className="top-[15%] left-[5%]" delay={0.5} />
      <FloatingTriangle className="top-[25%] right-[8%]" delay={0.7} />
      <FloatingRing className="top-[60%] right-[5%]" delay={0.9} />
      <FloatingTriangle className="top-[75%] left-[8%]" delay={1.1} />
    </div>
  );
}

// Keep exports for compatibility but simplified
export { FloatingRing, FloatingTriangle };
