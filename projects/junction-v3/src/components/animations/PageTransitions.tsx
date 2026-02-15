'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/animations';

// ============================================
// PAGE TRANSITION WRAPPER
// ============================================

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className = '',
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: EASE.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SLIDE PAGE TRANSITION
// ============================================

interface SlideTransitionProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export function SlideTransition({
  children,
  direction = 'right',
  className = '',
}: SlideTransitionProps) {
  const variants = {
    left: { initial: { x: '-100%' }, exit: { x: '100%' } },
    right: { initial: { x: '100%' }, exit: { x: '-100%' } },
    up: { initial: { y: '-100%' }, exit: { y: '100%' } },
    down: { initial: { y: '100%' }, exit: { y: '-100%' } },
  };
  
  return (
    <motion.div
      initial={{ ...variants[direction].initial, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ ...variants[direction].exit, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: EASE.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// FADE SCALE TRANSITION
// ============================================

export function FadeScaleTransition({
  children,
  className = '',
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{
        duration: 0.4,
        ease: EASE.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// REVEAL TRANSITION (Curtain Effect)
// ============================================

interface RevealTransitionProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function RevealTransition({
  children,
  className = '',
  color = '#3b82f6',
}: RevealTransitionProps) {
  return (
    <>
      {/* Overlay curtain */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ backgroundColor: color, originY: 0 }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.6,
          ease: EASE.smooth,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.3,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
}

// ============================================
// STAGGERED PAGE TRANSITION
// ============================================

interface StaggeredTransitionProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggeredTransition({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggeredTransitionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.4,
            ease: EASE.smooth,
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================
// MORPH TRANSITION
// ============================================

export function MorphTransition({
  children,
  className = '',
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        borderRadius: '50%',
        scale: 0,
      }}
      animate={{ 
        opacity: 1, 
        borderRadius: '0%',
        scale: 1,
      }}
      exit={{ 
        opacity: 0, 
        borderRadius: '50%',
        scale: 0,
      }}
      transition={{
        duration: 0.6,
        ease: EASE.smooth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SECTION TRANSITION (For scroll sections)
// ============================================

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function SectionTransition({
  children,
  className = '',
  threshold = 0.2,
}: SectionTransitionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: 0.8,
        ease: EASE.smooth,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ============================================
// HERO TRANSITION
// ============================================

interface HeroTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function HeroTransition({
  children,
  className = '',
  delay = 0.5,
}: HeroTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
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
// SMOOTH SCROLL LINK
// ============================================

interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function SmoothScrollLink({
  href,
  children,
  className = '',
  offset = 0,
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };
  
  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}

// ============================================
// ANIMATED PRESENCE WRAPPER
// ============================================

interface AnimatedPresenceWrapperProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
}

export function AnimatedPresenceWrapper({
  children,
  isVisible,
  className = '',
}: AnimatedPresenceWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            duration: 0.3,
            ease: EASE.smooth,
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
