'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import MagneticButton from './MagneticButton';

export default function CTA() {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:tom@junctionmedia.ai?subject=Partnership%20Inquiry&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
  };

  return (
    <section id="apply" className="py-32 relative overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Simplified gradient orbs - no animation */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center" ref={formRef}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-10 border border-white/20">
            <span className="text-sm font-semibold text-white">Now Accepting Applications</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="block">Work</span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            With Us
          </span>
        </motion.h2>

        <motion.p 
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          We&apos;re selective because depth matters. Every partner gets our full attention,
          not a junior account manager who Googles your product before each call.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-5 mb-10"
        >
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-colors duration-200"
          />
          
          <textarea
            placeholder="Tell us about your business..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/15 transition-colors duration-200 resize-none"
          />
          
          {/* FIXED: High visibility button */}
          <MagneticButton
            className="w-full"
            strength={0.15}
          >
            <button
              type="submit"
              className="w-full relative py-6 rounded-2xl font-bold text-lg text-white overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <span className="relative flex items-center justify-center gap-3">
                Submit Application
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </MagneticButton>
        </motion.form>

        {/* Direct email */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-400"
        >
          Or email directly:{' '}
          <a 
            href="mailto:tom@junctionmedia.ai" 
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline"
          >
            tom@junctionmedia.ai
          </a>
        </motion.p>
      </div>
    </section>
  );
}
