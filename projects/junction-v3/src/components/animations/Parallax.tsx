'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// ============================================
// PARALLAX CONTAINER
// ============================================

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxContainer({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
  );
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
}

// ============================================
// PARALLAX LAYER
// ============================================

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ParallaxLayer({
  children,
  className = '',
  speed = 0.3,
  direction = 'up',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const transformValue = 100 * speed;
  
  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [transformValue, -transformValue]),
    down: useTransform(scrollYProgress, [0, 1], [-transformValue, transformValue]),
    left: useTransform(scrollYProgress, [0, 1], [transformValue, -transformValue]),
    right: useTransform(scrollYProgress, [0, 1], [-transformValue, transformValue]),
  };
  
  const isHorizontal = direction === 'left' || direction === 'right';
  const motion_style = isHorizontal 
    ? { x: transforms[direction] } 
    : { y: transforms[direction] };
  
  return (
    <motion.div
      ref={ref}
      style={motion_style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PARALLAX BACKGROUND
// ============================================

interface ParallaxBackgroundProps {
  src?: string;
  gradient?: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function ParallaxBackground({
  src,
  gradient,
  className = '',
  speed = 0.3,
  overlay = true,
  overlayOpacity = 0.5,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          y: smoothY,
          backgroundImage: src ? `url(${src})` : gradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

// ============================================
// PARALLAX TEXT
// ============================================

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxText({
  children,
  className = '',
  speed = 0.2,
  direction = 'up',
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [50 * speed, -50 * speed] : [-50 * speed, 50 * speed]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SCALE ON SCROLL
// ============================================

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  startScale?: number;
  endScale?: number;
}

export function ScaleOnScroll({
  children,
  className = '',
  startScale = 0.9,
  endScale = 1,
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [startScale, endScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// ROTATE ON SCROLL
// ============================================

interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  startRotation?: number;
  endRotation?: number;
}

export function RotateOnScroll({
  children,
  className = '',
  startRotation = -5,
  endRotation = 5,
}: RotateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [startRotation, endRotation]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      style={{ rotate: smoothRotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// HORIZONTAL SCROLL PARALLAX
// ============================================

interface HorizontalParallaxProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: 'left' | 'right';
}

export function HorizontalParallax({
  children,
  className = '',
  distance = 100,
  direction = 'left',
}: HorizontalParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [distance, -distance] : [-distance, distance]
  );
  
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// DEPTH PARALLAX (Multiple Layers)
// ============================================

interface DepthLayerProps {
  children: ReactNode;
  depth: number; // 0-1, where 1 is closest (fastest)
  className?: string;
}

export function DepthLayer({
  children,
  depth,
  className = '',
}: DepthLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Closer layers (higher depth) move faster
  const speed = depth * 100;
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const scale = 1 + (depth * 0.1);
  
  return (
    <motion.div
      ref={ref}
      style={{ 
        y,
        scale,
        zIndex: Math.floor(depth * 10),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// STICKY PARALLAX SECTION
// ============================================

interface StickyParallaxProps {
  children: ReactNode;
  className?: string;
  height?: string;
}

export function StickyParallax({
  children,
  className = '',
  height = '200vh',
}: StickyParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  
  return (
    <div ref={ref} style={{ height }} className={className}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="h-full"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
