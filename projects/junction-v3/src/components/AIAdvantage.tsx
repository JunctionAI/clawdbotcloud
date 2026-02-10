'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const advantages = [
  {
    metric: "400+",
    label: "hours of work per month",
    sublabel: "vs 40-60 human hours at traditional agencies",
    icon: "⏰",
  },
  {
    metric: "24/7",
    label: "optimization cycles",
    sublabel: "While you sleep, we optimize",
    icon: "🔄",
  },
  {
    metric: "∞",
    label: "iterations included",
    sublabel: "No revision fees, ever",
    icon: "🔁",
  },
  {
    metric: "<2h",
    label: "response time",
    sublabel: "Real issues, real-time solutions",
    icon: "⚡",
  },
];

const comparisons = [
  {
    traditional: "Rank checks once a week",
    junction: "Real-time rank monitoring",
    icon: "📊"
  },
  {
    traditional: "Content briefs in 2-3 days",
    junction: "Content briefs in 2 hours",
    icon: "📝"
  },
  {
    traditional: "Bid updates 1-2x daily",
    junction: "Real-time bid optimization",
    icon: "💰"
  },
  {
    traditional: "Creative refresh monthly",
    junction: "Weekly creative iterations",
    icon: "🎨"
  },
  {
    traditional: "Campaign monitoring 9-5",
    junction: "24/7 anomaly detection",
    icon: "🚨"
  },
  {
    traditional: "Reports on their schedule",
    junction: "On-demand dashboards",
    icon: "📈"
  },
];

function MetricCard({ item, index }: { item: typeof advantages[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      className="relative text-center"
    >
      <div className="text-4xl mb-3">{item.icon}</div>
      <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
        {item.metric}
      </div>
      <div className="text-lg font-semibold text-gray-900 mb-1">
        {item.label}
      </div>
      <div className="text-sm text-gray-500">
        {item.sublabel}
      </div>
    </motion.div>
  );
}

export default function AIAdvantage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              The AI Advantage
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">Agencies Sell Hours.</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">We Deliver Outcomes.</span>
            </LineReveal>
          </h2>
          
          <SlideUpReveal delay={0.3}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional agencies charge $15k-50k/month for 20 hours of human work.
              Our AI agents work around the clock, delivering 10x the output while 
              humans focus on what actually matters: strategy and creativity.
            </p>
          </SlideUpReveal>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {advantages.map((item, index) => (
            <MetricCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Comparison grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5 rounded-[2rem] blur-2xl" />
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-gradient-to-r from-gray-100 to-white border-b border-gray-100">
              <div className="p-6 border-r border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👔</span>
                  <div>
                    <h3 className="font-bold text-gray-600">Traditional Agency</h3>
                    <p className="text-xs text-gray-400">Limited by human hours</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-transparent to-primary-50/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h3 className="font-bold text-gray-900">Junction AI</h3>
                    <p className="text-xs text-primary-600">Powered by agents</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                className={`grid grid-cols-2 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <div className="p-5 border-r border-gray-100 flex items-center gap-3">
                  <span className="text-xl">{row.icon}</span>
                  <span className="text-gray-500">{row.traditional}</span>
                </div>
                <div className="p-5 flex items-center gap-3 bg-gradient-to-r from-transparent to-primary-50/30">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-900 font-medium">{row.junction}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#apply" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 hover:-translate-y-1"
          >
            See What AI Can Do For You
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
