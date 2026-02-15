'use client';

import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ReactNode, useRef, useState, useCallback, forwardRef } from 'react';
import { EASE } from '@/lib/animations';

// ============================================
// MAGNETIC BUTTON
// ============================================

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  disabled?: boolean;
}

export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
  disabled = false,
}, ref) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    const targetRef = buttonRef.current || (ref && typeof ref === 'object' && 'current' in ref ? ref.current : null);
    const rect = targetRef?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [strength, x, y, disabled, ref]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  const Wrapper = href ? motion.a : motion.button;
  
  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="inline-block"
    >
      <Wrapper
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={className}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </Wrapper>
    </motion.div>
  );
});

MagneticButton.displayName = 'MagneticButton';

// ============================================
// TILT CARD
// ============================================

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = '',
  tiltAmount = 10,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  
  const springConfig = { stiffness: 200, damping: 20 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  
  // Glare gradient - always compute to satisfy hooks rules
  const glareGradient = useTransform(
    [glareX, glareY],
    ([x, y]) => 
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
  );
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    rotateX.set((y - 0.5) * -tiltAmount);
    rotateY.set((x - 0.5) * tiltAmount);
    glareX.set(x * 100);
    glareY.set(y * 100);
  }, [tiltAmount, rotateX, rotateY, glareX, glareY]);
  
  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: glareGradient,
          }}
        />
      )}
    </motion.div>
  );
}

// ============================================
// HOVER SCALE
// ============================================

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function HoverScale({
  children,
  className = '',
  scale = 1.05,
}: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ duration: 0.2, ease: EASE.snappy }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// HOVER LIFT
// ============================================

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  lift?: number;
}

export function HoverLift({
  children,
  className = '',
  lift = 8,
}: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -lift,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      }}
      transition={{ duration: 0.3, ease: EASE.smooth }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// RIPPLE BUTTON
// ============================================

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function RippleButton({
  children,
  className = '',
  onClick,
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  }, [disabled, onClick]);
  
  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
            animate={{ 
              width: 300, 
              height: 300, 
              x: -150, 
              y: -150, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// GLOW ON HOVER
// ============================================

interface GlowOnHoverProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowOnHover({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)',
}: GlowOnHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-inherit blur-xl -z-10"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        style={{ backgroundColor: glowColor }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}

// ============================================
// BORDER GRADIENT ANIMATION
// ============================================

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
}

export function AnimatedBorder({
  children,
  className = '',
  borderWidth = 2,
}: AnimatedBorderProps) {
  return (
    <div className={`relative p-[${borderWidth}px] rounded-inherit ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-inherit -z-10"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          backgroundSize: '300% 100%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '300% 50%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative bg-white rounded-inherit">
        {children}
      </div>
    </div>
  );
}

// ============================================
// SHINE EFFECT
// ============================================

interface ShineEffectProps {
  children: ReactNode;
  className?: string;
}

export function ShineEffect({
  children,
  className = '',
}: ShineEffectProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
        variants={{
          hover: { x: '200%' },
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

// ============================================
// BOUNCE ON CLICK
// ============================================

interface BounceOnClickProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BounceOnClick({
  children,
  className = '',
  onClick,
}: BounceOnClickProps) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileTap={{ scale: [1, 0.9, 1.1, 1] }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// WIGGLE ON HOVER
// ============================================

interface WiggleOnHoverProps {
  children: ReactNode;
  className?: string;
}

export function WiggleOnHover({
  children,
  className = '',
}: WiggleOnHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        rotate: [0, -3, 3, -3, 0],
        transition: { duration: 0.4 },
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// FLOAT ANIMATION
// ============================================

interface FloatProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function Float({
  children,
  className = '',
  duration = 3,
  distance = 10,
}: FloatProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PULSE ANIMATION
// ============================================

interface PulseProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function Pulse({
  children,
  className = '',
  scale = 1.05,
}: PulseProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// ATTENTION SEEKER
// ============================================

interface AttentionSeekerProps {
  children: ReactNode;
  className?: string;
  type?: 'pulse' | 'shake' | 'bounce' | 'flash';
}

export function AttentionSeeker({
  children,
  className = '',
  type = 'pulse',
}: AttentionSeekerProps) {
  const animations = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 1, repeat: Infinity },
    },
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
    },
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 0.6, repeat: Infinity, repeatDelay: 1 },
    },
    flash: {
      opacity: [1, 0.5, 1],
      transition: { duration: 0.8, repeat: Infinity },
    },
  };
  
  return (
    <motion.div
      className={className}
      animate={animations[type]}
    >
      {children}
    </motion.div>
  );
}
