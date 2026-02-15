'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

// ========================================
// OPTIMIZED IMAGE COMPONENT
// ========================================
// Features:
// - Automatic lazy loading (native)
// - Blur placeholder with gradient fallback
// - Smooth fade-in on load
// - WebP/AVIF automatic conversion
// - Responsive srcset generation

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  wrapperClassName?: string;
  showSkeleton?: boolean;
  fadeIn?: boolean;
}

// Generate a simple gradient blur placeholder
function generateBlurDataURL(
  primaryColor: string = 'rgba(59, 130, 246, 0.1)',
  secondaryColor: string = 'rgba(139, 92, 246, 0.1)'
): string {
  // Simple SVG placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primaryColor}"/>
          <stop offset="100%" stop-color="${secondaryColor}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#g)"/>
    </svg>
  `;
  
  // Convert to base64
  const base64 = typeof window !== 'undefined' 
    ? btoa(svg) 
    : Buffer.from(svg).toString('base64');
  
  return `data:image/svg+xml;base64,${base64}`;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  wrapperClassName = '',
  priority = false,
  showSkeleton = true,
  fadeIn = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate blur placeholder
  const blurDataURL = generateBlurDataURL();

  if (hasError) {
    return (
      <div 
        className={`bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center ${wrapperClassName}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Skeleton/placeholder while loading */}
      {showSkeleton && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 animate-pulse"
          style={{ width: '100%', height: '100%' }}
        />
      )}
      
      {fadeIn ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            placeholder="blur"
            blurDataURL={blurDataURL}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            {...props}
          />
        </motion.div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      )}
    </div>
  );
}

// ========================================
// HERO IMAGE - Priority loaded, optimized
// ========================================
export function HeroImage({
  src,
  alt,
  className = '',
  ...props
}: Omit<OptimizedImageProps, 'priority' | 'loading'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority={true}
      fadeIn={false}
      {...props}
    />
  );
}

// ========================================
// BACKGROUND IMAGE - Full coverage
// ========================================
export function BackgroundImage({
  src,
  alt,
  className = '',
  overlay = false,
  overlayClassName = 'bg-black/30',
}: {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  overlayClassName?: string;
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      {overlay && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}
    </div>
  );
}
