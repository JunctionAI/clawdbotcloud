'use client';

import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

// Animated counter with spring physics
function AnimatedStat({ 
  value, 
  suffix = '', 
  prefix = '',
  isInView,
  delay = 0,
}: { 
  value: number; 
  suffix?: string;
  prefix?: string;
  isInView: boolean;
  delay?: number;
}) {
  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => setDisplayValue(Math.floor(v)));
    return unsubscribe;
  }, [spring]);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => spring.set(value), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, spring, value, delay]);

  return (
    <span className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
}

// Timeline milestone
function TimelineMilestone({ 
  month, 
  title, 
  description, 
  isActive,
  index,
}: { 
  month: string;
  title: string;
  description: string;
  isActive: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      {/* Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 to-accent-500" />
      
      {/* Dot */}
      <motion.div 
        className={`absolute left-0 top-1 w-3 h-3 -translate-x-1/2 rounded-full ${
          isActive ? 'bg-primary-500' : 'bg-gray-300'
        }`}
        animate={isActive ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
      />
      
      <span className="text-sm font-bold text-primary-600">{month}</span>
      <h4 className="text-lg font-bold text-gray-900 mt-1">{title}</h4>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </motion.div>
  );
}

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

  const keyMetrics = [
    { value: 10, suffix: 'x', label: 'Productivity Gain', color: 'from-green-400 to-emerald-500' },
    { value: 30, suffix: '%', label: 'Above Sales Record', color: 'from-blue-400 to-primary-500' },
    { value: 45, suffix: '%', label: 'Cost Reduction', color: 'from-purple-400 to-accent-500' },
    { value: 500, suffix: '%', label: 'ROI Achieved', color: 'from-orange-400 to-red-400' },
  ];

  const timeline = [
    { month: 'Month 1', title: 'AI Infrastructure Setup', description: 'Deployed 12 autonomous agents across marketing channels' },
    { month: 'Month 2', title: 'Optimization Phase', description: 'Agents learned patterns and began self-improving' },
    { month: 'Month 3', title: 'Scaling Results', description: 'Broke monthly sales record by 30%' },
    { month: 'Ongoing', title: 'Continuous Growth', description: 'Upward trend maintained with minimal input' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '24/7 AI Optimization',
      description: 'Campaigns improving while you sleep',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Human Oversight',
      description: 'Strategic decisions always verified',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      title: 'Rapid Iteration',
      description: '100+ variations tested weekly',
    },
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
              Featured Case Study
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            <LineReveal delay={0.1}>
              <span className="block">How Deep Blue Health</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">10x&apos;d Their Output</span>
            </LineReveal>
          </h2>
        </div>

        {/* Key Metrics Bar - Hero style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity`} />
                
                <div className="relative p-6 bg-white rounded-2xl border border-gray-100 text-center shadow-sm group-hover:shadow-lg transition-all">
                  <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    <AnimatedStat 
                      value={metric.value} 
                      suffix={metric.suffix}
                      isInView={isCardInView}
                      delay={index * 0.15}
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-600 mt-2">{metric.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Case Study Card */}
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
          
          <div className="relative overflow-hidden rounded-[2rem] border border-white/50 shadow-2xl bg-white">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left - Visual side (3 cols) */}
              <motion.div 
                className="relative lg:col-span-3 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 p-12 lg:p-16 flex flex-col justify-center overflow-hidden"
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
                  {/* Company badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-black">
                      DBH
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">Deep Blue Health</h3>
                      <span className="text-white/70 text-sm">Health & Wellness Retail</span>
                    </div>
                  </motion.div>
                  
                  {/* The challenge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-8"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 block">The Challenge</span>
                    <p className="text-xl text-white/90 leading-relaxed">
                      A small team spread across complex operations: wide product distribution, 
                      global markets, and the constant pressure to do more with less. 
                      They needed maximum productivity from every marketing dollar.
                    </p>
                  </motion.div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4">
                    {features.map((feature, i) => (
                      <motion.div 
                        key={i}
                        className="p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                          {feature.icon}
                        </div>
                        <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-white/70">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right - Timeline and quote (2 cols) */}
              <motion.div 
                className="relative lg:col-span-2 p-12 lg:p-10 flex flex-col justify-center bg-gray-50"
                initial={{ opacity: 0, x: 50 }}
                animate={isCardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {/* Timeline */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                    The Journey
                  </h4>
                  {timeline.map((item, index) => (
                    <TimelineMilestone 
                      key={item.month}
                      {...item}
                      isActive={index === timeline.length - 1}
                      index={index}
                    />
                  ))}
                </div>

                {/* Results Summary - replaced fake testimonial */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="text-4xl text-primary-300 mb-3">📈</div>
                  <h4 className="font-bold text-gray-900 mb-2">Real Results</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Beat store record by 30% in November
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Full AI model running day-to-day operations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Expanded to Google Ads, Meta Ads, international
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">Verified case study • Deep Blue Health</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-gray-500 mb-6">
            Ready to write your own success story?
          </p>
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-full shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
          >
            Start Your Transformation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
