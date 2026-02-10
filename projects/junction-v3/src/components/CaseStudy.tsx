'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
// AnimatedCounter removed - not needed for current stats
import { LineReveal, SlideUpReveal } from './TextReveal';

export default function CaseStudy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  const features = [
    "10x productivity gain across operations",
    "Beat monthly sales record by 30%",
    "Consistent upward trend in results"
  ];

  return (
    <section id="results" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Animated background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-200/30 rounded-full blur-3xl" />
      </motion.div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              Real Results
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            <LineReveal delay={0.1}>
              <span className="block">What AI-Powered Growth</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Actually Looks Like</span>
            </LineReveal>
          </h2>
        </div>

        {/* Featured Case Study Card */}
        <motion.div
          ref={cardRef}
          style={{ scale: cardScale }}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div 
            className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 rounded-[2.5rem] blur-3xl"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative overflow-hidden rounded-[2rem] border border-white/50 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left - Visual side */}
              <motion.div 
                className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-12 lg:p-16 flex flex-col justify-center overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={isCardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl" />
                
                {/* Grid pattern */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />

                <div className="relative text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8"
                  >
                    <motion.span 
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm font-semibold">Featured Case Study</span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-4xl md:text-5xl font-black mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Deep Blue Health
                  </motion.h3>
                  
                  <motion.p 
                    className="text-xl text-white/80 mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    A health retailer with complex challenges: small team, wide product distribution, 
                    global markets. They needed maximum productivity from every dollar spent.
                  </motion.p>

                  <div className="space-y-4">
                    {features.map((feature, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isCardInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right - Stats side */}
              <motion.div 
                className="relative bg-white p-12 lg:p-16 flex flex-col justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={isCardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {/* Main stat */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="text-7xl md:text-8xl font-black gradient-text mb-3">
                    10x
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Productivity Multiplier
                  </h4>
                  <p className="text-gray-600 text-lg">
                    A small team achieving the output of a much larger operation through intelligent AI integration.
                  </p>
                </motion.div>

                {/* Secondary stats */}
                <motion.div
                  className="grid grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.div 
                    className="group relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="text-3xl font-black text-primary-600 mb-1">
                        +30%
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Record beaten</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="text-3xl font-black text-primary-600 mb-1">
                        📈
                      </div>
                      <p className="text-gray-600 text-sm font-medium">Upward trend</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Result summary */}
                <motion.div
                  className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-100/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <p className="text-gray-700">
                    <span className="font-bold text-gray-900">The Result:</span> A small team achieving the output of a much larger operation 
                    through intelligent automation and strategic AI application.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
