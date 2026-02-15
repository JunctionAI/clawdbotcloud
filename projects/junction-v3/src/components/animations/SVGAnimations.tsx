'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { EASE } from '@/lib/animations';

// ============================================
// SVG PATH DRAW ANIMATION
// ============================================

interface SVGDrawProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  strokeColor?: string;
  once?: boolean;
}

export function SVGDraw({
  children,
  className = '',
  duration = 1.5,
  delay = 0,
  once = true,
}: SVGDrawProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : undefined}
        transition={{ duration: duration * 0.2, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================
// ANIMATED PATH COMPONENT
// ============================================

interface AnimatedPathProps {
  d: string;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  duration?: number;
  delay?: number;
}

export function AnimatedPath({
  d,
  className = '',
  strokeWidth = 2,
  stroke = 'currentColor',
  fill = 'none',
  duration = 1.5,
  delay = 0,
}: AnimatedPathProps) {
  const ref = useRef<SVGPathElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.path
      ref={ref}
      d={d}
      className={className}
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
      transition={{
        pathLength: { duration, delay, ease: EASE.smooth },
        opacity: { duration: 0.3, delay },
      }}
    />
  );
}

// ============================================
// ANIMATED CIRCLE
// ============================================

interface AnimatedCircleProps {
  cx: number;
  cy: number;
  r: number;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  duration?: number;
  delay?: number;
}

export function AnimatedCircle({
  cx,
  cy,
  r,
  className = '',
  strokeWidth = 2,
  stroke = 'currentColor',
  fill = 'none',
  duration = 1,
  delay = 0,
}: AnimatedCircleProps) {
  const ref = useRef<SVGCircleElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Calculate circumference for stroke animation
  const circumference = 2 * Math.PI * r;
  
  return (
    <motion.circle
      ref={ref}
      cx={cx}
      cy={cy}
      r={r}
      className={className}
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill={fill}
      strokeLinecap="round"
      initial={{ 
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        opacity: 0,
      }}
      animate={isInView ? { 
        strokeDashoffset: 0,
        opacity: 1,
      } : undefined}
      transition={{
        strokeDashoffset: { duration, delay, ease: EASE.smooth },
        opacity: { duration: 0.3, delay },
      }}
    />
  );
}

// ============================================
// ANIMATED LINE
// ============================================

interface AnimatedLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  duration?: number;
  delay?: number;
}

export function AnimatedLine({
  x1,
  y1,
  x2,
  y2,
  className = '',
  strokeWidth = 2,
  stroke = 'currentColor',
  duration = 0.8,
  delay = 0,
}: AnimatedLineProps) {
  const ref = useRef<SVGLineElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Calculate line length
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
  return (
    <motion.line
      ref={ref}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={className}
      strokeWidth={strokeWidth}
      stroke={stroke}
      strokeLinecap="round"
      initial={{
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      }}
      animate={isInView ? {
        strokeDashoffset: 0,
        opacity: 1,
      } : undefined}
      transition={{
        strokeDashoffset: { duration, delay, ease: EASE.smooth },
        opacity: { duration: 0.2, delay },
      }}
    />
  );
}

// ============================================
// ANIMATED ICON WRAPPER
// ============================================

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export function AnimatedIcon({
  children,
  className = '',
  size = 24,
  duration = 1.2,
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.3, delay }}
      style={{
        '--draw-duration': `${duration}s`,
        '--draw-delay': `${delay}s`,
      } as React.CSSProperties}
    >
      <style>{`
        svg path, svg circle, svg line, svg polyline, svg polygon, svg rect {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw var(--draw-duration) ease forwards;
          animation-delay: var(--draw-delay);
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      {children}
    </motion.svg>
  );
}

// ============================================
// PREMADE ANIMATED ICONS
// ============================================

export function AnimatedCheckIcon({ 
  className = '', 
  size = 24,
  color = 'currentColor',
  delay = 0,
}: { 
  className?: string; 
  size?: number;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {/* Circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{
          pathLength: { duration: 0.6, delay, ease: EASE.smooth },
          opacity: { duration: 0.2, delay },
        }}
      />
      {/* Checkmark */}
      <motion.path
        d="M8 12l2.5 2.5L16 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{
          pathLength: { duration: 0.4, delay: delay + 0.4, ease: EASE.smooth },
          opacity: { duration: 0.2, delay: delay + 0.4 },
        }}
      />
    </motion.svg>
  );
}

export function AnimatedArrowIcon({
  className = '',
  size = 24,
  color = 'currentColor',
  direction = 'right',
  delay = 0,
}: {
  className?: string;
  size?: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const rotation = {
    up: -90,
    down: 90,
    left: 180,
    right: 0,
  };
  
  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ rotate: rotation[direction] }}
    >
      {/* Line */}
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{
          pathLength: { duration: 0.4, delay, ease: EASE.smooth },
          opacity: { duration: 0.2, delay },
        }}
      />
      {/* Arrow head */}
      <motion.polyline
        points="14,6 20,12 14,18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{
          pathLength: { duration: 0.3, delay: delay + 0.3, ease: EASE.smooth },
          opacity: { duration: 0.2, delay: delay + 0.3 },
        }}
      />
    </motion.svg>
  );
}

export function AnimatedStarIcon({
  className = '',
  size = 24,
  color = 'currentColor',
  filled = false,
  delay = 0,
}: {
  className?: string;
  size?: number;
  color?: string;
  filled?: boolean;
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <motion.path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        initial={{ 
          pathLength: 0, 
          opacity: 0,
          scale: 0.5,
        }}
        animate={isInView ? { 
          pathLength: 1, 
          opacity: 1,
          scale: 1,
        } : undefined}
        transition={{
          pathLength: { duration: 1, delay, ease: EASE.smooth },
          opacity: { duration: 0.2, delay },
          scale: { duration: 0.5, delay: delay + 0.5, type: 'spring', stiffness: 200 },
        }}
      />
    </motion.svg>
  );
}

// ============================================
// LOGO DRAW ANIMATION
// ============================================

interface LogoDrawProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export function JunctionLogoDraw({
  className = '',
  size = 80,
  duration = 2,
  delay = 0,
}: LogoDrawProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="logoDrawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      
      {/* Four curved connectors */}
      {[
        { d: "M25 8 Q8 8 8 25", delay: 0 },
        { d: "M55 8 Q72 8 72 25", delay: 0.2 },
        { d: "M25 72 Q8 72 8 55", delay: 0.4 },
        { d: "M55 72 Q72 72 72 55", delay: 0.6 },
      ].map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke="url(#logoDrawGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{
            pathLength: { 
              duration: duration / 4, 
              delay: delay + path.delay, 
              ease: EASE.smooth 
            },
            opacity: { duration: 0.2, delay: delay + path.delay },
          }}
        />
      ))}
    </motion.svg>
  );
}
