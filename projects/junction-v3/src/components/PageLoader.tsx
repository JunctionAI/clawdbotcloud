'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { JunctionLogoDraw } from './animations/SVGAnimations';
import { EASE } from '@/lib/animations';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const loadingStages = [
      { progress: 20, text: 'Loading assets' },
      { progress: 40, text: 'Preparing experience' },
      { progress: 60, text: 'Optimizing performance' },
      { progress: 80, text: 'Almost there' },
      { progress: 100, text: 'Ready' },
    ];

    let currentStage = 0;
    
    const interval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        setProgress(loadingStages[currentStage].progress);
        setLoadingText(loadingStages[currentStage].text);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE.smooth }}
          className="fixed inset-0 z-[100] bg-gray-900 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background gradients */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Primary orb */}
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full blur-[120px]"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
                left: '10%',
                top: '20%',
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Secondary orb */}
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
                right: '10%',
                bottom: '20%',
              }}
              animate={{
                x: [0, -30, 0],
                y: [0, 20, 0],
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            
            {/* Pink accent */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
              style={{
                background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE.snappy }}
              className="mb-12"
            >
              <div className="relative">
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute inset-0 blur-xl rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(139,92,246,0.4))',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Logo container */}
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-2xl">
                  <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                    <JunctionLogoDraw size={60} duration={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loading text with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/60 text-sm font-medium tracking-wide"
              >
                {loadingText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              {/* Gradient progress */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: EASE.smooth }}
              />
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>

            {/* Progress percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <span className="text-white/40 text-xs font-mono tabular-nums">
                {progress}%
              </span>
            </motion.div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
