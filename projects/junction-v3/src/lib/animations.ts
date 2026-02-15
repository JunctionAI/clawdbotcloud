'use client';

import { Variants, TargetAndTransition } from 'framer-motion';

// ============================================
// ANIMATION CONFIGURATION
// ============================================

export const EASE = {
  // Smooth, premium feeling
  smooth: [0.215, 0.61, 0.355, 1] as const,
  // Snappy, responsive
  snappy: [0.175, 0.885, 0.32, 1.275] as const,
  // Elastic bounce
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
  // Gentle ease out
  gentle: [0.25, 0.46, 0.45, 0.94] as const,
  // Quick ease in-out
  quick: [0.4, 0, 0.2, 1] as const,
};

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.2,
};

export const STAGGER = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
  slower: 0.12,
};

// ============================================
// SCROLL REVEAL VARIANTS
// ============================================

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.snappy,
    },
  },
};

export const rotateIn: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -10,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

// ============================================
// STAGGER CONTAINER VARIANTS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.fast,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.slower,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// TEXT ANIMATION VARIANTS
// ============================================

export const letterReveal: Variants = {
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

export const wordReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.smooth,
    },
  },
};

export const lineReveal: Variants = {
  hidden: { 
    y: '100%',
    opacity: 0,
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverScale: TargetAndTransition = {
  scale: 1.05,
  transition: { duration: DURATION.fast, ease: EASE.snappy },
};

export const hoverLift: TargetAndTransition = {
  y: -8,
  transition: { duration: DURATION.fast, ease: EASE.snappy },
};

export const hoverGlow: TargetAndTransition = {
  boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.35)',
  transition: { duration: DURATION.normal },
};

export const tapScale: TargetAndTransition = {
  scale: 0.95,
  transition: { duration: DURATION.instant },
};

// ============================================
// SVG PATH VARIANTS
// ============================================

export const pathDraw: Variants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0,
  },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: EASE.smooth },
      opacity: { duration: 0.3 },
    },
  },
};

export const pathDrawFast: Variants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0,
  },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: EASE.smooth },
      opacity: { duration: 0.2 },
    },
  },
};

// ============================================
// PARALLAX HELPERS
// ============================================

export const parallaxSlow = {
  inputRange: [0, 1],
  outputRange: ['0%', '10%'],
};

export const parallaxMedium = {
  inputRange: [0, 1],
  outputRange: ['0%', '20%'],
};

export const parallaxFast = {
  inputRange: [0, 1],
  outputRange: ['0%', '30%'],
};

// ============================================
// PAGE TRANSITION VARIANTS
// ============================================

export const pageEnter: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATION.normal,
      ease: EASE.smooth,
    },
  },
};

export const pageSlide: Variants = {
  initial: { 
    x: '100%',
    opacity: 0,
  },
  animate: { 
    x: 0,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
  exit: { 
    x: '-100%',
    opacity: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.smooth,
    },
  },
};

// ============================================
// LOADING SKELETON VARIANTS
// ============================================

export const skeletonPulse: Variants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const spinnerRotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ============================================
// SPRING CONFIGURATIONS
// ============================================

export const springConfig = {
  default: { type: 'spring' as const, stiffness: 300, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 100, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 10 },
  stiff: { type: 'spring' as const, stiffness: 500, damping: 40 },
};
