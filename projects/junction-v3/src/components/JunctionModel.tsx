'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const modelPillars = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Autonomous AI Agents",
    description: "A fleet of AI agents working around the clock. Continuously optimizing, testing, and finding opportunities — delivering 10x the output of traditional teams.",
    features: ["24/7 execution", "Real-time optimization", "Pattern recognition at scale"],
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Strategic Creativity",
    description: "AI handles execution. Human strategists provide the creative vision, catch edge cases, and apply judgment that drives breakthrough results.",
    features: ["Strategic oversight", "Creative direction", "Business context"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Your AI Infrastructure",
    description: "We become an extension of your business. Full integration with your systems, your data, your goals — optimizing for revenue, not vanity metrics.",
    features: ["Full integration", "Revenue optimization", "Scalable systems"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
  }
];

function PillarCard({ pillar, index }: { pillar: typeof modelPillars[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group h-full"
    >
      {/* Card */}
      <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
        {/* Icon */}
        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center text-white mb-8 shadow-lg`}>
          {pillar.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {pillar.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {pillar.description}
        </p>
        
        {/* Features list */}
        <ul className="space-y-3">
          {pillar.features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-center gap-3 text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.3 + i * 0.08 }}
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pillar.gradient} flex items-center justify-center flex-shrink-0`}>
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium">{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        {/* Number indicator */}
        <div className={`absolute bottom-6 right-6 text-8xl font-black bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent opacity-10`}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
}

export default function JunctionModel() {
  return (
    <section id="model" className="py-32 relative overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-primary-50/40 to-transparent" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              The Junction Model
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">AI Power +</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Human Wisdom</span>
            </LineReveal>
          </h2>
          
          <SlideUpReveal delay={0.3}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agents + Strategy = Revenue. A true synthesis of AI execution 
              and strategic creativity that delivers results neither could achieve alone.
            </p>
          </SlideUpReveal>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modelPillars.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Formula visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-20"
        >
          <div className="relative bg-white/80 backdrop-blur-xl rounded-full px-12 py-6 flex items-center gap-6 border border-gray-100 shadow-xl">
            <span className="text-4xl">🤖</span>
            <span className="text-3xl font-bold text-gray-300">+</span>
            <span className="text-4xl">🧠</span>
            <span className="text-3xl font-bold text-gray-300">=</span>
            <span className="text-4xl">📈</span>
            <span className="text-2xl font-black gradient-text">Revenue</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
