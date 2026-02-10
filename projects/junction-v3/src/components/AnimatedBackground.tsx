'use client';

import { motion } from 'framer-motion';

// Simplified gradient orbs - fewer, larger, slower animations
export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 -left-40 w-[500px] h-[500px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Noise texture overlay - static, no animation needed
export function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-[0.012] z-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Simplified grid - static, no animation
export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// Parallax section wrapper - simplified
interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxSection({ children, className = '' }: ParallaxSectionProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}

// REMOVED FloatingParticles - it was creating 30 individual animated elements
// which was a major performance killer
export function FloatingParticles() {
  // Disabled for performance - return null
  return null;
}
