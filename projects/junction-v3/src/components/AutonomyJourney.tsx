'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const benefits = [
  {
    icon: "🚀",
    title: "Early Adopter Advantage",
    description: "While competitors scramble to catch up, you're already leveraging AI that's been trained on your business."
  },
  {
    icon: "🔄",
    title: "Automatic Upgrades",
    description: "As AI capabilities improve, your campaigns get smarter automatically. No extra cost, no extra work."
  },
  {
    icon: "🎯",
    title: "Compounding Returns",
    description: "The AI learns your customers, your voice, your market. Every month it gets more effective."
  },
  {
    icon: "🛡️",
    title: "Future-Proof Marketing",
    description: "AGI is coming. When it arrives, you will have a partner who has already integrated it into your stack."
  },
];

const timeline = [
  { year: "2020", label: "GPT-3", position: 12 },
  { year: "2022", label: "ChatGPT", position: 22 },
  { year: "2023", label: "GPT-4", position: 35 },
  { year: "2024", label: "Agents", position: 48 },
  { year: "2026", label: "NOW", position: 62, highlight: true },
  { year: "2027", label: "AGI", position: 78 },
  { year: "→", label: "Beyond", position: 92 },
];

function ExponentialCurve() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="relative w-full h-[400px] md:h-[500px]">
      {/* SVG Curve */}
      <svg 
        viewBox="0 0 800 400" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Horizontal grid lines */}
        {[100, 200, 300].map((y) => (
          <line key={y} x1="50" y1={y} x2="750" y2={y} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5" />
        ))}
        
        {/* Vertical timeline markers */}
        {timeline.map((point) => (
          <line 
            key={point.year} 
            x1={point.position * 7 + 50} 
            y1="50" 
            x2={point.position * 7 + 50} 
            y2="350" 
            stroke={point.highlight ? "#8B5CF6" : "#E5E7EB"} 
            strokeWidth={point.highlight ? "2" : "1"} 
            strokeDasharray={point.highlight ? "0" : "5,5"} 
          />
        ))}
        
        {/* Area under curve */}
        <motion.path
          d="M50,350 Q200,340 300,320 T450,280 T550,200 T650,80 T750,10 L750,350 Z"
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* The exponential curve */}
        <motion.path
          d="M50,350 Q200,340 300,320 T450,280 T550,200 T650,80 T750,10"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* "You are here" marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5, type: "spring" }}
        >
          {/* Pulse animation */}
          <motion.circle
            cx="540"
            cy="210"
            r="20"
            fill="#8B5CF6"
            opacity="0.3"
            animate={{ r: [20, 35, 20], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Main dot */}
          <circle cx="540" cy="210" r="12" fill="#8B5CF6" />
          <circle cx="540" cy="210" r="6" fill="white" />
          
          {/* Label */}
          <rect x="460" y="145" width="160" height="50" rx="8" fill="white" stroke="#8B5CF6" strokeWidth="2" />
          <text x="540" y="168" textAnchor="middle" className="fill-gray-900 font-bold text-sm">📍 YOU ARE HERE</text>
          <text x="540" y="185" textAnchor="middle" className="fill-gray-500 text-xs">with Junction</text>
        </motion.g>
        
        {/* Timeline labels */}
        {timeline.map((point, index) => (
          <motion.g
            key={point.year}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <text 
              x={point.position * 7 + 50} 
              y="380" 
              textAnchor="middle" 
              className={`text-xs font-bold ${point.highlight ? 'fill-purple-600' : 'fill-gray-400'}`}
            >
              {point.year}
            </text>
            <text 
              x={point.position * 7 + 50} 
              y="395" 
              textAnchor="middle" 
              className={`text-xs ${point.highlight ? 'fill-purple-500' : 'fill-gray-300'}`}
            >
              {point.label}
            </text>
          </motion.g>
        ))}
        
        {/* Y-axis label */}
        <text x="30" y="200" textAnchor="middle" transform="rotate(-90, 30, 200)" className="fill-gray-400 text-xs font-medium">
          AI CAPABILITY
        </text>
        
        {/* Arrow at top of curve */}
        <motion.path
          d="M745,15 L755,5 L750,20 Z"
          fill="url(#curveGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        />
      </svg>
      
      {/* "The curve goes vertical" indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 2.2 }}
        className="absolute top-4 right-4 md:right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
      >
        AGI 2027 → Superintelligence
      </motion.div>
    </div>
  );
}

export default function AutonomyJourney() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              The AI Acceleration
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">The Curve Is Going Vertical.</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">We&apos;re Already On It.</span>
            </LineReveal>
          </h2>
          
          <SlideUpReveal delay={0.3}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI capabilities are accelerating exponentially. Most businesses are watching from the sidelines. 
              With Junction, you&apos;re already embedded in AI-powered processes — so as the technology improves, 
              your business capabilities, intelligence, and competitive advantage compound over time.
            </p>
          </SlideUpReveal>
        </div>

        {/* The Exponential Curve */}
        <div className="mb-20">
          <ExponentialCurve />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-100 group-hover:border-purple-200 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl px-12 py-10 text-white shadow-2xl shadow-purple-500/25">
            <div className="text-5xl">🌊</div>
            <div>
              <p className="text-2xl md:text-3xl font-bold mb-2">
                Don&apos;t watch the wave. Ride it.
              </p>
              <p className="text-purple-100 text-lg max-w-xl">
                Junction is your partner for the AI acceleration. We&apos;re already embedded at the cutting edge — 
                so you automatically benefit as capabilities explode.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Deeply Integrated</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Always Current</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Future-Proof</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
