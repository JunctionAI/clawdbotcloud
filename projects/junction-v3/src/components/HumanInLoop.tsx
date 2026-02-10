'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const pillars = [
  {
    icon: "🎯",
    title: "Strategic Oversight",
    description: "Senior strategists review every campaign, every week. AI proposes, humans decide.",
    detail: "Your dedicated strategist knows your business, your market, and your goals — not just your metrics."
  },
  {
    icon: "✨",
    title: "Creative Direction",
    description: "AI generates at scale. Human creatives ensure it's on-brand, on-message, and compelling.",
    detail: "We catch the nuances machines miss — tone, timing, cultural context, brand voice."
  },
  {
    icon: "🧠",
    title: "Judgment & Quality",
    description: "Every client-facing output passes through human review. No exceptions.",
    detail: "AI handles volume. Humans handle the moments that matter — the decisions that shape your brand."
  },
  {
    icon: "🤝",
    title: "Relationship Layer",
    description: "Weekly calls. Real conversations. A partner who picks up the phone.",
    detail: "You're not talking to a bot. Your strategist is a human who cares about your success."
  },
];

export default function HumanInLoop() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-accent-50/30 to-transparent" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <SlideUpReveal>
            <span className="inline-block text-accent-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              Human in the Loop
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">AI Does the Heavy Lifting.</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Humans Steer the Ship.</span>
            </LineReveal>
          </h2>
          
          <SlideUpReveal delay={0.3}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI without oversight is just automation. We combine the tireless execution 
              of AI agents with the judgment, creativity, and strategic thinking of 
              experienced strategists. Best of both worlds.
            </p>
          </SlideUpReveal>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-100 group-hover:border-gray-200 transition-all duration-300 group-hover:shadow-lg">
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {pillar.description}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {pillar.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-700 italic max-w-4xl mx-auto">
            &ldquo;The future isn&apos;t AI replacing humans. It&apos;s AI amplifying humans. 
            That&apos;s what we&apos;ve built.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
