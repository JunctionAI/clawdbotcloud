'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { MagneticButton, HoverLift, Float } from './animations/MicroInteractions';
import { SplitText, CountingText } from './animations/TextAnimations';
import { ParallaxLayer } from './animations/Parallax';
import { StaggerReveal, StaggerItem } from './animations/ScrollReveal';
import { GradientOrbs, AnimatedGrid } from './AnimatedBackground';
import { EASE } from '@/lib/animations';

// Animated stat card with premium effects
function StatCard({ value, suffix, label, sublabel, index }: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  index: number;
}) {
  return (
    <HoverLift lift={8}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 1.2 + index * 0.1,
          ease: EASE.smooth,
        }}
        className="relative group"
      >
        <div className="relative glass-card rounded-2xl p-8 border border-white/50 group-hover:border-primary-200/50 transition-all duration-300">
          {/* Subtle glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="relative">
            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
              {suffix === '∞' ? (
                <span>0<span className="ml-1">{suffix}</span></span>
              ) : (
                <CountingText value={value} suffix={suffix} duration={2000} />
              )}
            </div>
            <div className="text-gray-900 font-bold text-lg">{label}</div>
            <div className="text-gray-500 text-sm mt-1">{sublabel}</div>
          </div>
        </div>
      </motion.div>
    </HoverLift>
  );
}

// Premium animated badge - Boutique positioning
function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: EASE.snappy }}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-50/90 to-accent-50/90 backdrop-blur-md border border-primary-200/50 rounded-full px-6 py-3 mb-10 shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <span className="text-sm font-bold text-primary-700">
        By Application Only
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

  // Smooth parallax transforms
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax background elements */}
      <ParallaxLayer speed={0.2} direction="down" className="absolute inset-0 z-0">
        <GradientOrbs />
      </ParallaxLayer>
      <AnimatedGrid />

      {/* Main content with scroll effects */}
      <motion.div 
        style={{ 
          opacity, 
          y: smoothY, 
          scale: smoothScale,
          willChange: 'transform, opacity',
        }}
        className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10"
      >
        <StatusBadge />

        {/* Main headline with split text animation */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] tracking-tight">
            <div className="overflow-hidden pb-2">
              <SplitText delay={0.3} staggerDelay={0.02}>
                AI-Native Marketing Operations
              </SplitText>
            </div>
          </h1>
        </div>

        {/* Subheadline with blur reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 0.6, ease: EASE.smooth }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Selected partnerships. AI systems that replace entire marketing departments.<br />
            Strategy, execution, and optimisation — unified under one operator.
          </p>
        </motion.div>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: EASE.smooth }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <MagneticButton 
            href="#apply"
            className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden"
            strength={0.3}
          >
            {/* Animated gradient background */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Shine effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ x: ['0%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            
            {/* Shadow */}
            <span className="absolute inset-0 rounded-full shadow-xl shadow-blue-500/50" />
            
            {/* Text */}
            <span className="relative text-white flex items-center gap-2">
              Apply to Work With Us
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </MagneticButton>
          
          <MagneticButton 
            href="#about"
            className="group px-10 py-5 rounded-full text-gray-700 font-bold text-lg border-2 border-gray-300 hover:border-primary-400 hover:bg-primary-50/50 transition-all bg-white/80 backdrop-blur-sm"
            strength={0.3}
          >
            <span className="flex items-center gap-2">
              Our Approach
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

        {/* Stats grid with stagger animation */}
        <StaggerReveal staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { value: 11, suffix: '+', label: 'Years Experience', sublabel: 'Marketing & Strategy' },
            { value: 1, suffix: '', label: 'Spot Open', sublabel: 'Applications Reviewed Personally' },
            { value: 100, suffix: '%', label: 'AI-Native', sublabel: 'Built for the Future' },
          ].map((stat, index) => (
            <StaggerItem key={index} direction="up">
              <StatCard {...stat} index={index} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Scroll indicator with floating animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Float duration={2} distance={8}>
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-primary-500"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </Float>
        </motion.div>
      </motion.div>
    </section>
  );
}
