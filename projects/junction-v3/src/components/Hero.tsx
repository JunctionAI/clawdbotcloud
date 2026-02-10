'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';
import { GradientOrbs, AnimatedGrid } from './AnimatedBackground';

// Simplified character reveal - no blur filter (expensive), simpler animation
function SplitText({ 
  children, 
  className = '',
  delay = 0,
}: { 
  children: string; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span 
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.span>
  );
}

// Animated stat card - simplified hover effects
function StatCard({ value, suffix, label, sublabel, index }: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 1.2 + index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="relative glass-card rounded-2xl p-8 border border-white/50 group-hover:border-primary-200/50 transition-colors duration-300">
        <div className="relative">
          <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
            <AnimatedCounter end={value} suffix={suffix} />
          </div>
          <div className="text-gray-900 font-bold text-lg">{label}</div>
          <div className="text-gray-500 text-sm mt-1">{sublabel}</div>
        </div>
      </div>
    </motion.div>
  );
}

// Animated badge - simplified
function ScarcityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-50/90 to-accent-50/90 backdrop-blur-md border border-primary-200/50 rounded-full px-6 py-3 mb-10 shadow-lg"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span className="text-sm font-bold text-primary-700">
        Limited Capacity — Only 2 Partnership Spots Remaining
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Simplified scroll transforms
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Simplified backgrounds */}
      <GradientOrbs />
      <AnimatedGrid />

      {/* Main content with scroll effects */}
      <motion.div 
        style={{ opacity, y, willChange: 'transform, opacity' }}
        className="relative max-w-7xl mx-auto px-6 py-20 text-center"
      >
        <ScarcityBadge />

        {/* Main headline - simplified animation */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight">
            <div className="overflow-hidden pb-2">
              <SplitText delay={0.3}>Evolve Your Business</SplitText>
            </div>
            <div className="overflow-hidden pb-2 mt-2">
              <SplitText delay={0.5} className="gradient-text">At The Speed of AI</SplitText>
            </div>
          </h1>
        </div>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Your dedicated AI growth partner. Autonomous agents working 24/7 
            synthesizing strategy into domination.
          </p>
        </motion.div>

        {/* CTA Buttons - FIXED VISIBILITY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <MagneticButton 
            href="#apply"
            className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden"
            strength={0.3}
          >
            {/* Solid visible background - FIXED */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] animate-gradient-x" />
            
            {/* Strong shadow for visibility */}
            <span className="absolute inset-0 rounded-full shadow-xl shadow-blue-500/50" />
            
            {/* White text for contrast */}
            <span className="relative text-white flex items-center gap-2">
              Apply for Partnership
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </MagneticButton>
          
          <MagneticButton 
            href="#model"
            className="group px-10 py-5 rounded-full text-gray-700 font-bold text-lg border-2 border-gray-300 hover:border-primary-400 hover:bg-primary-50/50 transition-all bg-white/80 backdrop-blur-sm"
            strength={0.3}
          >
            <span className="flex items-center gap-2">
              See How It Works
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </span>
          </MagneticButton>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { value: 10, suffix: 'x', label: 'Productivity', sublabel: 'AI-Powered Output' },
            { value: 24, suffix: '/7', label: 'Daily Optimization', sublabel: 'Not Monthly Reports' },
            { value: 0, suffix: '∞', label: 'Iterations', sublabel: 'Unlimited Revisions' },
          ].map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </div>

        {/* Scroll indicator - simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary-500"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
