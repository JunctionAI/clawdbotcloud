'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 bg-gray-900 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a 
            href="/"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            {/* Junction Mark */}
            <motion.div 
              className="relative w-10 h-10"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#3B82F6'}}/>
                    <stop offset="50%" style={{stopColor: '#8B5CF6'}}/>
                    <stop offset="100%" style={{stopColor: '#EC4899'}}/>
                  </linearGradient>
                </defs>
                <path d="M25 8 Q8 8 8 25" stroke="url(#footerLogoGradient)" strokeWidth="8" strokeLinecap="round" fill="none"/>
                <path d="M55 8 Q72 8 72 25" stroke="url(#footerLogoGradient)" strokeWidth="8" strokeLinecap="round" fill="none"/>
                <path d="M25 72 Q8 72 8 55" stroke="url(#footerLogoGradient)" strokeWidth="8" strokeLinecap="round" fill="none"/>
                <path d="M55 72 Q72 72 72 55" stroke="url(#footerLogoGradient)" strokeWidth="8" strokeLinecap="round" fill="none"/>
              </svg>
            </motion.div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-white tracking-tight">Junction</span>
              <span className="text-xl font-normal text-gray-400">Media</span>
            </div>
          </motion.a>

          {/* Links */}
          <div className="flex items-center gap-8">
            {['Privacy', 'Terms'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} Junction Media. All rights reserved.
          </p>
        </div>

        {/* Decorative gradient line */}
        <motion.div 
          className="mt-12 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-gray-600 text-sm"
        >
          Built with AI. Driven by results.
        </motion.p>
      </div>
    </footer>
  );
}
