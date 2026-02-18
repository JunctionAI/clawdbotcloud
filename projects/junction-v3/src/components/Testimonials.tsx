'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

// ─── Real result card ────────────────────────────────────────────────────────
function ResultCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="relative p-10 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 text-white shadow-2xl shadow-primary-500/30 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Metric badge */}
        <motion.div
          className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl font-black">30%+</span>
          <span className="text-white/80 font-medium text-sm">Sales lift — Month 1</span>
        </motion.div>

        {/* Quote */}
        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-white">
          Beat the store&apos;s all-time monthly revenue record within the first month of
          engagement. Integrated AI-native content, paid, and email into a unified
          system.
        </blockquote>

        {/* Attribution */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
            DBH
          </div>
          <div>
            <div className="font-bold text-white">Deep Blue Health</div>
            <div className="text-white/60 text-sm">NZ health supplement brand</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Case studies CTA ────────────────────────────────────────────────────────
function CaseStudiesCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-12 text-center"
    >
      <p className="text-gray-500 text-lg mb-6">
        Full case studies available on request.
      </p>
      <a
        href="mailto:tom@junctionmedia.ai?subject=Case%20Studies%20Request"
        className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors underline underline-offset-4 decoration-primary-300 hover:decoration-primary-500"
      >
        Request case studies
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
interface TestimonialsProps {
  className?: string;
}

export default function Testimonials({ className = '' }: TestimonialsProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      className={`py-24 relative overflow-hidden ${className}`}
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              Proven Results
            </span>
          </SlideUpReveal>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            <LineReveal delay={0.1}>
              <span className="block">Real Work.</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Real Outcomes.</span>
            </LineReveal>
          </h2>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We don&apos;t collect testimonials. We build systems that generate results.
          </motion.p>
        </div>

        {/* Featured result */}
        <ResultCard />

        {/* Case studies CTA */}
        <CaseStudiesCTA />
      </div>
    </section>
  );
}

export { ResultCard, CaseStudiesCTA };
