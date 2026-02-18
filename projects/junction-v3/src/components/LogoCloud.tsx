'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Placeholder logo component - generates professional-looking placeholder logos
function PlaceholderLogo({ 
  name, 
  index 
}: { 
  name: string; 
  index: number;
}) {
  // Different visual styles for variety
  const styles = [
    'font-black tracking-tight',
    'font-bold tracking-wide uppercase text-sm',
    'font-extrabold italic',
    'font-medium tracking-[0.2em] uppercase text-xs',
    'font-black tracking-tighter',
    'font-bold',
  ];
  
  const style = styles[index % styles.length];
  
  return (
    <div className={`text-gray-400 group-hover:text-gray-600 transition-colors duration-300 ${style}`}>
      {name}
    </div>
  );
}

// Individual logo with hover effect
function LogoItem({ 
  name, 
  index,
  delay 
}: { 
  name: string; 
  index: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group relative flex items-center justify-center h-20 px-8 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-accent-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <PlaceholderLogo name={name} index={index} />
    </motion.div>
  );
}

// Animated infinite scroll row
function LogoRow({ 
  logos, 
  reverse = false,
  speed = 40,
}: { 
  logos: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex items-center gap-16"
        animate={{
          x: reverse ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ willChange: 'transform' }}
      >
        {duplicatedLogos.map((name, index) => (
          <div 
            key={`${name}-${index}`}
            className="shrink-0 flex items-center justify-center min-w-[180px] h-16 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer group"
          >
            <PlaceholderLogo name={name} index={index} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface LogoCloudProps {
  variant?: 'grid' | 'marquee' | 'stacked';
  showTitle?: boolean;
  className?: string;
}

export default function LogoCloud({ 
  variant = 'marquee',
  showTitle = true,
  className = '',
}: LogoCloudProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Real clients only - no fake company names
  // Using descriptive placeholders that don't claim fake partnerships
  const clients = [
    'Deep Blue Health',
    'Your Brand Here',
    'Your Brand Here',
    'Your Brand Here',
  ];
  
  const clientsRow2 = [
    'By Application Only',
    'AI-Native Operations',
    'Apply to Work With Us',
    'Select Partners',
  ];

  if (variant === 'marquee') {
    return (
      <section className={`py-16 relative overflow-hidden ${className}`} ref={containerRef}>
        {showTitle && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
              Trusted by forward-thinking companies
            </span>
          </motion.div>
        )}
        
        <LogoRow logos={clients} speed={45} />
        <LogoRow logos={clientsRow2} reverse speed={50} />
      </section>
    );
  }

  if (variant === 'stacked') {
    return (
      <section className={`py-20 ${className}`} ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          {showTitle && (
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">
                Our Partners
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Trusted by Industry Leaders
              </h2>
            </motion.div>
          )}
          
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 via-transparent to-accent-100/20 rounded-3xl blur-3xl" />
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
              {clients.map((name, index) => (
                <LogoItem 
                  key={name} 
                  name={name} 
                  index={index} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default: grid variant
  return (
    <section className={`py-20 bg-gray-50 ${className}`} ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        {showTitle && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
              Trusted by innovative brands
            </span>
          </motion.div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {clients.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <PlaceholderLogo name={name} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Export for use elsewhere
export { LogoRow, LogoItem, PlaceholderLogo };
