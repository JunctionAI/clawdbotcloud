'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/animations';

// ============================================
// SKELETON LOADER
// ============================================

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animate?: boolean;
}

export function Skeleton({
  className = '',
  width = '100%',
  height = 20,
  rounded = 'md',
  animate = true,
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  
  return (
    <motion.div
      className={`bg-gray-200 ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
      animate={animate ? {
        opacity: [0.5, 0.8, 0.5],
        backgroundPosition: ['200% 0', '-200% 0'],
      } : undefined}
      transition={{
        opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
      }}
      initial={{
        background: 'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
        backgroundSize: '200% 100%',
      }}
    />
  );
}

// ============================================
// SKELETON TEXT
// ============================================

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

export function SkeletonText({
  lines = 3,
  className = '',
  lastLineWidth = '60%',
}: SkeletonTextProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
}

// ============================================
// SKELETON CARD
// ============================================

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  imageHeight?: number;
}

export function SkeletonCard({
  className = '',
  showImage = true,
  imageHeight = 200,
}: SkeletonCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      {showImage && (
        <Skeleton 
          height={imageHeight} 
          rounded="lg" 
          className="mb-4" 
        />
      )}
      <Skeleton height={24} width="70%" className="mb-3" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 mt-4">
        <Skeleton height={28} width={80} rounded="full" />
        <Skeleton height={28} width={80} rounded="full" />
      </div>
    </div>
  );
}

// ============================================
// SHIMMER EFFECT
// ============================================

interface ShimmerProps {
  children: ReactNode;
  className?: string;
  show?: boolean;
}

export function Shimmer({
  children,
  className = '',
  show = true,
}: ShimmerProps) {
  if (!show) return <>{children}</>;
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full"
        animate={{ x: ['0%', '200%'] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1,
        }}
      />
    </div>
  );
}

// ============================================
// SPINNER
// ============================================

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const spinnerSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export function Spinner({
  size = 'md',
  color = 'currentColor',
  className = '',
}: SpinnerProps) {
  const pixelSize = spinnerSizes[size];
  
  return (
    <motion.svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.2"
      />
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="45"
      />
    </motion.svg>
  );
}

// ============================================
// GRADIENT SPINNER
// ============================================

export function GradientSpinner({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const pixelSize = spinnerSizes[size];
  
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="url(#spinnerGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="50 20"
        />
      </svg>
    </motion.div>
  );
}

// ============================================
// DOTS LOADER
// ============================================

export function DotsLoader({
  size = 'md',
  color = 'currentColor',
  className = '',
}: SpinnerProps) {
  const dotSize = spinnerSizes[size] / 4;
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -dotSize, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// PULSE LOADER
// ============================================

export function PulseLoader({
  size = 'md',
  color = 'currentColor',
  className = '',
}: SpinnerProps) {
  const pixelSize = spinnerSizes[size];
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ 
          backgroundColor: color,
          transform: 'scale(0.6)',
        }}
      />
    </div>
  );
}

// ============================================
// PROGRESS BAR
// ============================================

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  color?: 'primary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  progress,
  className = '',
  showLabel = false,
  color = 'gradient',
  size = 'md',
}: ProgressBarProps) {
  const heights = { sm: 4, md: 8, lg: 12 };
  
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: heights[size] }}
      >
        <motion.div
          className={`h-full rounded-full ${
            color === 'gradient' 
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
              : 'bg-blue-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5, ease: EASE.smooth }}
        />
      </div>
    </div>
  );
}

// ============================================
// LOADING OVERLAY
// ============================================

interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
  blur?: boolean;
}

export function LoadingOverlay({
  isLoading,
  children,
  className = '',
  blur = true,
}: LoadingOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 flex items-center justify-center bg-white/80 z-10 ${
              blur ? 'backdrop-blur-sm' : ''
            }`}
          >
            <GradientSpinner size="lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// CONTENT PLACEHOLDER
// ============================================

interface ContentPlaceholderProps {
  isLoading: boolean;
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function ContentPlaceholder({
  isLoading,
  children,
  fallback,
  className = '',
}: ContentPlaceholderProps) {
  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {fallback || <SkeletonCard />}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE.smooth }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
