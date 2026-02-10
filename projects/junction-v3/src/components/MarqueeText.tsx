'use client';

import { motion } from 'framer-motion';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
  reverse?: boolean;
  separator?: string;
}

export default function MarqueeText({ 
  text, 
  speed = 30, 
  className = '', 
  reverse = false,
  separator = '✦'
}: MarqueeTextProps) {
  const items = Array(4).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex items-center gap-8"
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ willChange: 'transform' }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-8 shrink-0">
            <span className="text-inherit">{item}</span>
            <span className="text-primary-500/50 text-lg">{separator}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Scrolling brands marquee - simplified
export function LogoMarquee({ 
  className = '',
  speed = 40,
}: {
  className?: string;
  speed?: number;
}) {
  const brands = [
    'SEO',
    'GOOGLE ADS',
    'META ADS',
    'EMAIL MARKETING',
    'CONTENT',
    'VIDEO',
    'INFLUENCER MANAGEMENT',
    'TIKTOK ADS',
    'LINKEDIN',
    'ANALYTICS',
    'CRO',
    'COPYWRITING',
  ];

  return (
    <div className={`relative py-8 overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 ${className}`}>
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{
          x: ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ willChange: 'transform' }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div 
            key={index} 
            className="flex items-center gap-16 shrink-0"
          >
            <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
              {brand}
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Premium marquee with gradient fade edges
export function PremiumMarquee({ 
  items,
  speed = 35,
  className = '',
  reverse = false,
}: {
  items: string[];
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ willChange: 'transform' }}
      >
        {duplicatedItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-12 shrink-0"
          >
            <span className="text-4xl md:text-6xl font-black text-gray-100 select-none">
              {item}
            </span>
            <span className="text-primary-500/30 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Vertical marquee - simplified
export function VerticalMarquee({
  items,
  speed = 25,
  className = '',
  reverse = false,
}: {
  items: React.ReactNode[];
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex flex-col gap-4"
        animate={{
          y: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ willChange: 'transform' }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
