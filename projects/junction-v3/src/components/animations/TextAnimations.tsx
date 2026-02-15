'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useEffect, useState, ReactNode } from 'react';
import { EASE, DURATION } from '@/lib/animations';

// ============================================
// SPLIT TEXT REVEAL (Character by Character)
// ============================================

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function SplitText({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  as: _Component = 'div',
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  const characters = children.split('');
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };
  
  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: DURATION.normal,
        ease: EASE.smooth,
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: 1000 }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className="inline-block"
          style={{ 
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            willChange: 'transform, opacity',
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ============================================
// WORD BY WORD REVEAL
// ============================================

interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  highlight?: string[]; // Words to highlight with gradient
}

export function WordReveal({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.08,
  once = true,
  highlight = [],
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  
  const words = children.split(' ');
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };
  
  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: DURATION.slow,
        ease: EASE.smooth,
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={`inline-block mr-[0.25em] ${
            highlight.includes(word) ? 'gradient-text font-bold' : ''
          }`}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ============================================
// LINE BY LINE REVEAL
// ============================================

interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function LineRevealText({
  children,
  className = '',
  delay = 0,
  once = true,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: DURATION.slow,
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
// TYPEWRITER EFFECT
// ============================================

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    const startTyping = () => {
      timeout = setTimeout(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
          startTyping();
        } else {
          onComplete?.();
        }
      }, currentIndex === 0 ? delay : speed);
    };
    
    startTyping();
    
    // Blinking cursor
    const cursorIntervalId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(cursorIntervalId);
    };
  }, [text, speed, delay, onComplete]);
  
  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="text-primary-500"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}

// ============================================
// GRADIENT TEXT ANIMATION
// ============================================

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className = '',
  animate = true,
}: GradientTextProps) {
  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      animate={animate ? { backgroundPosition: ['0%', '200%'] } : undefined}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}

// ============================================
// COUNTING TEXT
// ============================================

interface CountingTextProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  decimals?: number;
}

export function CountingText({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2000,
  decimals = 0,
}: CountingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = value * eased;
      
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration, decimals]);
  
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ============================================
// SCRAMBLE TEXT
// ============================================

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  trigger?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function ScrambleText({
  text,
  className = '',
  speed = 30,
  trigger = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    if (!isInView || !trigger) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (i < iteration) return text[i];
            if (char === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, speed);
    
    return () => clearInterval(interval);
  }, [isInView, text, speed, trigger]);
  
  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
}

// ============================================
// HIGHLIGHT TEXT (On Scroll)
// ============================================

interface HighlightTextProps {
  children: string;
  className?: string;
  highlightColor?: string;
}

export function HighlightText({
  children,
  className = '',
  highlightColor = 'rgba(59, 130, 246, 0.2)',
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  
  return (
    <span ref={ref} className={`relative inline ${className}`}>
      {children}
      <motion.span
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: highlightColor, originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: EASE.smooth, delay: 0.2 }}
      />
    </span>
  );
}
