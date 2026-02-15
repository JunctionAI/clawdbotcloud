'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { EASE } from '@/lib/animations';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

// ============================================
// LINE REVEAL - Premium mask animation
// ============================================

export function LineReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%', rotate: 3 }}
        animate={isInView ? { y: 0, rotate: 0 } : { y: '110%', rotate: 3 }}
        transition={{
          duration: 0.8,
          delay,
          ease: EASE.smooth,
        }}
        style={{ transformOrigin: 'left bottom' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================
// SLIDE UP REVEAL - Smooth fade + slide
// ============================================

export function SlideUpReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay,
        ease: EASE.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// WORD REVEAL - Word by word with blur
// ============================================

export function WordReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: { children: string; className?: string; delay?: number; once?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const words = children.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(8px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: EASE.smooth,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================
// CHARACTER REVEAL - Character by character
// ============================================

export function CharacterReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: { children: string; className?: string; delay?: number; once?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const characters = children.split('');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.4,
        ease: EASE.smooth,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: 1000 }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={charVariants}
          style={{ 
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            transformStyle: 'preserve-3d',
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================
// FADE BLUR REVEAL - Premium blur effect
// ============================================

export function FadeBlurReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: 'blur(20px)', y: 30 }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(20px)', y: 30 }}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SCALE REVEAL - Scale + fade
// ============================================

export function ScaleReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.6,
        delay,
        ease: EASE.snappy,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// GRADIENT LINE REVEAL - With animated line
// ============================================

export function GradientLineReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true,
  linePosition = 'bottom' as 'top' | 'bottom',
}: AnimatedTextProps & { linePosition?: 'top' | 'bottom' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Animated gradient line */}
      <motion.div
        className={`absolute left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${
          linePosition === 'top' ? '-top-2' : '-bottom-2'
        }`}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.8,
          delay: delay + 0.2,
          ease: EASE.smooth,
        }}
        style={{ transformOrigin: 'left' }}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          delay,
          ease: EASE.smooth,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================
// HIGHLIGHT REVEAL - With animated highlight
// ============================================

export function HighlightReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true,
  highlightColor = 'rgba(59, 130, 246, 0.2)',
}: AnimatedTextProps & { highlightColor?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <span ref={ref} className={`relative inline ${className}`}>
      {/* Highlight background */}
      <motion.span
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: highlightColor, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.1,
          ease: EASE.smooth,
        }}
      />
      
      {/* Text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: 0.4,
          delay,
          ease: EASE.smooth,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
