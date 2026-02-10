'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Simplified page loader - fewer animations, faster load
export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return prev + 20; // Faster progress
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-gray-900 flex flex-col items-center justify-center"
        >
          {/* Static gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[100px]"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
                left: '20%',
                top: '30%',
              }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[80px]"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                right: '20%',
                bottom: '30%',
              }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative mb-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <span className="text-white font-black text-4xl">J</span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
