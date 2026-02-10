'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const comparisons = [
  {
    traditional: "Monthly reports full of impressions you can't action",
    junction: "Quarterly reviews showing pipeline influenced and revenue attributed"
  },
  {
    traditional: "Your account manager changes every 6 months",
    junction: "Your senior strategist knows your business inside and out"
  },
  {
    traditional: "Same playbook for every client",
    junction: "Custom strategies built from YOUR actual data"
  },
  {
    traditional: "Algorithm changes catch you off guard",
    junction: "We test emerging channels before your competitors know they exist"
  },
  {
    traditional: "You ask 'is this working?' and get a 40-slide deck",
    junction: "You ask 'is this working?' and we show you the pipeline. In dollars."
  },
  {
    traditional: "Marketing stops when people go home",
    junction: "AI systems optimize and convert 24/7"
  }
];

function ComparisonRow({ row, index }: { row: typeof comparisons[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      className={`grid grid-cols-1 md:grid-cols-2 group ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
      } hover:bg-primary-50/30 transition-colors duration-300`}
    >
      {/* Traditional */}
      <div className="p-6 md:p-8 border-r border-gray-100 flex items-start gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5"
        >
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>
        <p className="text-gray-600 leading-relaxed">{row.traditional}</p>
      </div>
      
      {/* Junction */}
      <div className="p-6 md:p-8 flex items-start gap-4 bg-gradient-to-r from-transparent group-hover:from-primary-50/50 to-transparent transition-all duration-300">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.4, type: 'spring' }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center mt-0.5"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <p className="text-gray-900 font-medium leading-relaxed">{row.junction}</p>
      </div>
    </motion.div>
  );
}

export default function Comparison() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50" ref={containerRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              The Difference
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">Traditional Agency vs.</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Junction Media</span>
            </LineReveal>
          </h2>
          
          <SlideUpReveal delay={0.4}>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We compete on outcomes, not services. Here&apos;s what actually changes.
            </p>
          </SlideUpReveal>
        </div>

        {/* Comparison Table */}
        <motion.div
          style={{ scale }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 rounded-[2rem] blur-3xl opacity-50" />
          
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-2xl shadow-gray-200/50">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-gray-100 via-gray-50 to-white border-b border-gray-100">
              <motion.div 
                className="p-6 md:p-8 border-r border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl">👔</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700 text-lg">Traditional Agency</h3>
                    <p className="text-sm text-gray-500">What you&apos;re used to</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="p-6 md:p-8 bg-gradient-to-r from-transparent to-primary-50/30"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-white font-black text-xl">J</span>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Junction Media</h3>
                    <p className="text-sm text-primary-600 font-medium">What you deserve</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Rows */}
            <div>
              {comparisons.map((row, index) => (
                <ComparisonRow key={index} row={row} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
