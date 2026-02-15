'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, rotateIn, EASE } from '@/lib/animations';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

const directionVariants: Record<RevealDirection, Variants> = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
  scale: scaleIn,
  rotate: rotateIn,
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  const variants = directionVariants[direction];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={{ willChange: 'transform, opacity' }}
      transition={{
        duration,
        delay,
        ease: EASE.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STAGGERED REVEAL CONTAINER
// ============================================

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.08,
  once = true,
  threshold = 0.1,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STAGGER ITEM
// ============================================

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
}: StaggerItemProps) {
  return (
    <motion.div
      variants={directionVariants[direction]}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PARALLAX REVEAL
// ============================================

interface ParallaxRevealProps {
  children: ReactNode;
  className?: string;
  offset?: number;
  direction?: 'up' | 'down';
}

export function ParallaxReveal({
  children,
  className = '',
  offset = 50,
  direction = 'up',
}: ParallaxRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: direction === 'up' ? offset : -offset 
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0 
      } : undefined}
      transition={{
        duration: 0.8,
        ease: EASE.smooth,
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// BLUR REVEAL (Premium Effect)
// ============================================

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BlurReveal({
  children,
  className = '',
  delay = 0,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        filter: 'blur(20px)',
        y: 30,
      }}
      animate={isInView ? { 
        opacity: 1, 
        filter: 'blur(0px)',
        y: 0,
      } : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE.smooth,
      }}
      className={className}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// CLIP REVEAL (Mask Animation)
// ============================================

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
}

export function ClipReveal({
  children,
  className = '',
  direction = 'left',
  delay = 0,
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0%)',
    },
    top: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)',
    },
    bottom: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)',
    },
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// COUNTER REVEAL
// ============================================

interface CounterRevealProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function CounterReveal({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2000,
}: CounterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : undefined}
    >
      {prefix}
      <Counter end={value} duration={duration} isActive={isInView} />
      {suffix}
    </motion.span>
  );
}

function Counter({ 
  end, 
  duration, 
  isActive 
}: { 
  end: number; 
  duration: number; 
  isActive: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(end * eased));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isActive, end, duration]);
  
  return <>{count}</>;
}

import { useState, useEffect } from 'react';
