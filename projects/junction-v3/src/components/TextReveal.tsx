'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

// Line reveal with mask - simple and performant
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
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Slide up reveal - simple and performant
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
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Word by word reveal - simplified, no blur filter
export function WordReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: { children: string; className?: string; delay?: number; once?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const words = children.split(' ');

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Character reveal - simplified, no rotateX or blur
export function CharacterReveal({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: { children: string; className?: string; delay?: number; once?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.span>
  );
}
