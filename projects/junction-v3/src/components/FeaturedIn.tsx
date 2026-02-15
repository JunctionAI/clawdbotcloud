'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Publication {
  name: string;
  description?: string;
  quote?: string;
}

const publications: Publication[] = [
  { 
    name: 'TechCrunch',
    description: 'Featured as top AI marketing platform',
    quote: '"The future of marketing automation"',
  },
  { 
    name: 'Forbes',
    description: 'Top 10 AI Companies to Watch',
    quote: '"Revolutionary approach to growth"',
  },
  { 
    name: 'Marketing Week',
    description: 'Cover story on AI agents',
    quote: '"Game-changing technology"',
  },
  { 
    name: 'The Verge',
    description: 'Best emerging tech 2024',
    quote: '"Next-gen marketing intelligence"',
  },
  { 
    name: 'Wired',
    description: 'Future of business feature',
    quote: '"AI that actually delivers"',
  },
  { 
    name: 'Fast Company',
    description: 'Most Innovative Companies',
    quote: '"Redefining agency work"',
  },
];

// Placeholder publication logo
function PublicationLogo({ name }: { name: string }) {
  return (
    <span className="text-2xl md:text-3xl font-black tracking-tight text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
      {name}
    </span>
  );
}

interface FeaturedInProps {
  variant?: 'simple' | 'quotes' | 'detailed';
  className?: string;
}

export default function FeaturedIn({
  variant = 'simple',
  className = '',
}: FeaturedInProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  if (variant === 'quotes') {
    return (
      <section className={`py-20 bg-gradient-to-b from-gray-50 to-white ${className}`} ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
              As Seen In
            </span>
          </motion.div>

          {/* Publication quotes grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                  {/* Quote */}
                  {pub.quote && (
                    <p className="text-gray-600 italic mb-4">{pub.quote}</p>
                  )}
                  
                  {/* Publication */}
                  <div className="flex items-center justify-between">
                    <PublicationLogo name={pub.name} />
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'detailed') {
    return (
      <section className={`py-24 relative overflow-hidden ${className}`} ref={containerRef}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-gray-900 to-accent-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="inline-block text-primary-400 font-bold text-sm uppercase tracking-[0.2em] mb-4">
              Industry Recognition
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Featured By Leading Publications
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We&apos;re honored to be recognized by the world&apos;s top technology and business publications.
            </p>
          </motion.div>

          {/* Logo cloud with glow effect */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 blur-3xl" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  className="group flex flex-col items-center justify-center p-6"
                >
                  <span className="text-2xl font-black tracking-tight text-gray-500 group-hover:text-white transition-colors duration-300">
                    {pub.name}
                  </span>
                  {pub.description && (
                    <span className="text-xs text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                      {pub.description}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <motion.div 
            className="mt-16 flex flex-wrap items-center justify-center gap-12 pt-12 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {[
              { value: '50+', label: 'Media Mentions' },
              { value: '12', label: 'Industry Awards' },
              { value: '#1', label: 'Rated AI Agency' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // Default: simple variant
  return (
    <section className={`py-12 border-y border-gray-100 ${className}`} ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {/* Label */}
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wider shrink-0">
            As Featured In
          </span>
          
          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-200" />
          
          {/* Publications */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {publications.slice(0, 5).map((pub, index) => (
              <motion.div
                key={pub.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <PublicationLogo name={pub.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { PublicationLogo, publications };
