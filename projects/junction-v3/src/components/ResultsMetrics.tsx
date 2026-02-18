'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  color: string;
}

// UPDATED 2026-02-18: Replaced unverified inflated stats with real/defensible claims
// Sources: DBH campaign (30% store record), AI agent stack (24/7 true), client cap (4-5 true)
const metrics: Metric[] = [
  {
    value: 30,
    suffix: '%+',
    label: 'Sales Lift',
    description: 'DBH — beat store record',
    color: 'from-green-400 to-emerald-500',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'AI Active',
    description: 'Agents running continuously',
    color: 'from-blue-400 to-primary-500',
  },
  {
    value: 4,
    suffix: '-5',
    label: 'Max Clients',
    description: 'Selective for depth of focus',
    color: 'from-purple-400 to-accent-500',
  },
  {
    value: 100,
    suffix: '%',
    label: 'AI-Native',
    description: 'Built on frontier models',
    color: 'from-orange-400 to-red-400',
  },
  {
    value: 1,
    suffix: '',
    label: 'Spot Open',
    description: 'Apply to work with us',
    color: 'from-pink-400 to-rose-500',
  },
  {
    value: 0,
    suffix: ' agencies',
    label: 'Like This in NZ',
    description: 'First-mover advantage',
    color: 'from-teal-400 to-cyan-500',
  },
];

// Animated counter with spring physics
function AnimatedMetric({ 
  metric, 
  isInView,
  delay = 0,
}: { 
  metric: Metric; 
  isInView: boolean;
  delay?: number;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
  });

  const display = useTransform(spring, (value) => Math.floor(value));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        spring.set(metric.value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, spring, metric.value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect */}
      <motion.div 
        className={`absolute -inset-2 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500`}
      />
      
      <div className="relative p-8 bg-white rounded-2xl border border-gray-100 group-hover:border-primary-200 shadow-sm group-hover:shadow-xl transition-all duration-300">
        {/* Value */}
        <div className="mb-4">
          <span className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent tabular-nums`}>
            {metric.prefix}{displayValue}{metric.suffix}
          </span>
        </div>
        
        {/* Label */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{metric.label}</h3>
        
        {/* Description */}
        <p className="text-gray-500 text-sm">{metric.description}</p>
        
        {/* Progress bar (decorative) */}
        <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Big hero-style single metric
function HeroMetric({ 
  metric, 
  isInView 
}: { 
  metric: Metric; 
  isInView: boolean;
}) {
  const spring = useSpring(0, { stiffness: 30, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => setDisplayValue(Math.floor(v)));
    return unsubscribe;
  }, [spring]);

  useEffect(() => {
    if (isInView) {
      spring.set(metric.value);
    }
  }, [isInView, spring, metric.value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative text-center"
    >
      {/* Huge number */}
      <div className="relative">
        {/* Background glow */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-20 blur-3xl`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <span className={`relative text-[8rem] md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent leading-none tabular-nums`}>
          {metric.prefix}{displayValue}
        </span>
        <span className={`text-6xl md:text-8xl lg:text-[10rem] font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
          {metric.suffix}
        </span>
      </div>
      
      {/* Label */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">{metric.label}</h3>
      <p className="text-xl text-gray-500 mt-2">{metric.description}</p>
    </motion.div>
  );
}

// Inline metrics bar
function MetricsBar({ isInView }: { isInView: boolean }) {
  const compactMetrics = metrics.slice(0, 4);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {compactMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100"
        >
          <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
            {metric.prefix}{metric.value}{metric.suffix}
          </div>
          <div className="text-sm font-bold text-gray-900 mt-2">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

interface ResultsMetricsProps {
  variant?: 'grid' | 'hero' | 'bar';
  showTitle?: boolean;
  className?: string;
}

export default function ResultsMetrics({
  variant = 'grid',
  showTitle = true,
  className = '',
}: ResultsMetricsProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  if (variant === 'hero') {
    return (
      <section className={`py-32 relative overflow-hidden ${className}`} ref={containerRef}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <HeroMetric metric={metrics[0]} isInView={isInView} />
        </div>
      </section>
    );
  }

  if (variant === 'bar') {
    return (
      <section className={`py-16 ${className}`} ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          {showTitle && (
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
                Proven Results
              </span>
            </motion.div>
          )}
          
          <MetricsBar isInView={isInView} />
        </div>
      </section>
    );
  }

  // Default: grid variant
  return (
    <section className={`py-24 relative overflow-hidden ${className}`} ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-100/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        {showTitle && (
          <div className="text-center mb-16">
            <SlideUpReveal>
              <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
                The Numbers Don&apos;t Lie
              </span>
            </SlideUpReveal>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              <LineReveal delay={0.1}>
                <span className="block">Results That</span>
              </LineReveal>
              <LineReveal delay={0.2}>
                <span className="gradient-text block mt-2">Speak Volumes</span>
              </LineReveal>
            </h2>
            
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Real metrics from real clients. No vanity numbers—just pure, measurable impact.
            </motion.p>
          </div>
        )}

        {/* Metrics grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <AnimatedMetric 
              key={metric.label} 
              metric={metric} 
              isInView={isInView}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-gray-500 mb-6">
            Ready to see what we can do for your business?
          </p>
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-full shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
          >
            Get Your Growth Audit
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export { AnimatedMetric, HeroMetric, MetricsBar, metrics };
