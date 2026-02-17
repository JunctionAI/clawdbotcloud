'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const painPoints = [
  {
    icon: "📊",
    title: "Monthly reports you can't tie to revenue",
    description: "Your agency sends impressive decks full of impressions and clicks. But when your CEO asks 'what are we getting for this?' — you have no answer.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "💸",
    title: "Paying for overhead & junior managers",
    description: "Your 'senior partnership' means a strategy call once a month. Day-to-day? It's the 6-month account manager who Googles your product before each call.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: "🤖",
    title: "AI is changing how people find businesses",
    description: "ChatGPT, Perplexity, AI search — the discovery landscape is shifting. Brands that adapt early will capture the attention.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: "🔄",
    title: "Same playbook for every client",
    description: "Your 'custom strategy' looks suspiciously like every other client's strategy. Because it is. Template thinking, template results.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: "⏰",
    title: "Marketing only runs during business hours",
    description: "Your campaigns pause when people go home. Your competitors' AI keeps optimizing, learning, and converting at 3am.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: "📉",
    title: "Diminishing returns, growing costs",
    description: "Every year the spend goes up, but the results plateau. You're told 'the market is harder' while they bill more hours.",
    color: "from-red-500 to-rose-500",
  }
];

function PainCard({ point, index }: { point: typeof painPoints[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative h-full glass-card rounded-3xl p-8 border border-white/60 group-hover:border-primary-200/50 transition-colors duration-300">
        {/* Icon */}
        <div className="relative text-5xl mb-6 w-fit">
          <div className={`absolute inset-0 bg-gradient-to-r ${point.color} opacity-20 blur-xl scale-150`} />
          <span className="relative">{point.icon}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
          {point.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {point.description}
        </p>
        
        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${point.color} opacity-5 rounded-bl-[100px]`} />
      </div>
    </motion.div>
  );
}

export default function PainPoints() {
  return (
    <section id="pain-points" className="py-32 relative overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/20 to-white" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl translate-x-1/2" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              Sound Familiar?
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">We Built Junction Media For</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Owners Tired of Moving Too Slow</span>
            </LineReveal>
          </h2>
          
          <SlideUpReveal delay={0.3}>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              If any of these sound familiar, you&apos;re in the right place.
            </p>
          </SlideUpReveal>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <PainCard key={index} point={point} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-700 font-medium">
            One of these hit home?{' '}
            <span className="gradient-text font-bold">Keep reading.</span>
          </p>
          
          {/* Animated arrow */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-8"
          >
            <svg className="w-6 h-6 mx-auto text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
