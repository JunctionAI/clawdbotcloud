'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animated line that draws itself
export function AnimatedLine({ 
  className = '', 
  direction = 'horizontal',
  delay = 0,
}: {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`${direction === 'horizontal' ? 'h-px w-full' : 'w-px h-full'} ${className}`}
      initial={{ 
        scaleX: direction === 'horizontal' ? 0 : 1,
        scaleY: direction === 'vertical' ? 0 : 1,
      }}
      animate={isInView ? { 
        scaleX: 1,
        scaleY: 1,
      } : {}}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{ 
        originX: 0,
        originY: 0,
        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), transparent)',
      }}
    />
  );
}

// Gradient divider with glow
export function GradientDivider({ className = '' }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`relative py-16 ${className}`}>
      <motion.div
        className="relative h-px w-full max-w-4xl mx-auto"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {/* Main line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
        
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent blur-sm" />
        
        {/* Center accent */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-ping opacity-40" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Wave divider
export function WaveDivider({ 
  className = '', 
  flip = false,
  color = 'white',
}: {
  className?: string;
  flip?: boolean;
  color?: string;
}) {
  return (
    <div className={`relative ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
          fill={color}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
      </svg>
    </div>
  );
}

// Decorative section break with animated elements
export function DecorativeDivider({ className = '' }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`relative py-20 overflow-hidden ${className}`}>
      {/* Left line */}
      <motion.div
        className="absolute left-0 top-1/2 w-1/3 h-px bg-gradient-to-r from-transparent to-gray-200"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
      />
      
      {/* Right line */}
      <motion.div
        className="absolute right-0 top-1/2 w-1/3 h-px bg-gradient-to-l from-transparent to-gray-200"
        initial={{ scaleX: 0, originX: 1 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
      />
      
      {/* Center diamond */}
      <motion.div
        className="relative mx-auto"
        initial={{ scale: 0, rotate: 45 }}
        animate={isInView ? { scale: 1, rotate: 45 } : {}}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 border border-primary-200">
          <motion.div
            className="absolute inset-1 bg-gradient-to-br from-primary-500 to-accent-500"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          />
        </div>
      </motion.div>

      {/* Floating dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-400/30"
          style={{
            left: `${25 + i * 15}%`,
            top: '50%',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 + i * 0.1 }}
        />
      ))}
    </div>
  );
}

// Simple gradient section divider
export default function SectionDivider({ 
  variant = 'gradient',
  className = '',
}: {
  variant?: 'gradient' | 'wave' | 'decorative' | 'line';
  className?: string;
}) {
  switch (variant) {
    case 'wave':
      return <WaveDivider className={className} />;
    case 'decorative':
      return <DecorativeDivider className={className} />;
    case 'line':
      return <AnimatedLine className={className} />;
    default:
      return <GradientDivider className={className} />;
  }
}
