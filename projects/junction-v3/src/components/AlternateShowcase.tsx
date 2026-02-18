'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
  {
    icon: '🎬',
    title: 'Films & Content',
    description: 'Cinematic quality at indie budgets',
  },
  {
    icon: '🛍️',
    title: 'Merch & Products',
    description: 'Revenue from creative IP',
  },
  {
    icon: '🎭',
    title: 'Events',
    description: 'Premieres, community experiences',
  },
];

export default function AlternateShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1425 40%, #060810 100%)',
      }}
    >
      {/* Film-noir atmospheric gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-800/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/15 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-800/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Case Study: Creative Production
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 space-y-8">
            {/* Title */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-4"
              >
                The ALTERNATE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Story
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-400 font-medium"
              >
                What happens when AI meets cinematic production
              </motion.p>
            </div>

            {/* Body copy */}
            <div className="space-y-5">
              {[
                {
                  text: 'In 2025, I co-directed a short sci-fi film that would have cost $100,000+ in traditional production.',
                  bold: true,
                },
                {
                  text: 'We made it for a fraction of that.',
                  bold: true,
                  size: 'large',
                },
                {
                  text: 'Using Higgsfield AI, advanced image generation, and a tight creative team, we produced something that looked like it came out of a real studio. This wasn\'t a gimmick — it was proof of concept for everything I believe about AI-native creative.',
                  bold: false,
                },
              ].map((item, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.1 }}
                  className={`leading-relaxed ${
                    item.size === 'large'
                      ? 'text-2xl font-bold text-white'
                      : item.bold
                      ? 'text-xl font-semibold text-white'
                      : 'text-base text-gray-400'
                  }`}
                >
                  {item.text}
                </motion.p>
              ))}
            </div>

            {/* Three pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.58 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
            >
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
                  className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <span className="text-2xl mb-2 block">{pillar.icon}</span>
                  <p className="font-semibold text-white text-sm mb-1">{pillar.title}</p>
                  <p className="text-xs text-gray-500 leading-snug">{pillar.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2 text-blue-400 font-semibold text-base hover:text-blue-300 transition-colors duration-200"
              >
                Learn More About ALTERNATE
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>

              <p className="text-xs text-gray-600 italic max-w-xs leading-relaxed">
                &ldquo;The future of creative business is AI-native from day one.&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Right: visual placeholder */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 8 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative"
            >
              {/* Film still placeholder */}
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden border border-white/10">
                {/* Gradient fill simulating a dark cinematic frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black" />

                {/* Simulated film elements */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-3 h-4 bg-white/10 rounded-sm" />
                      ))}
                    </div>
                    <span className="text-white/20 text-xs font-mono tracking-widest">
                      4K
                    </span>
                  </div>

                  {/* Center: ALTERNATE logo text */}
                  <div className="text-center">
                    <div className="inline-block">
                      <p className="text-white/10 text-xs font-bold uppercase tracking-[0.4em] mb-3">
                        ALTERNATE
                      </p>
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-3" />
                      <p className="text-white/10 text-[10px] uppercase tracking-[0.3em]">
                        A film
                      </p>
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500/60 animate-pulse" />
                    <span className="text-white/20 text-xs font-mono">
                      HIGGSFIELD AI · 2025
                    </span>
                  </div>
                </div>

                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
                  }}
                />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/20" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/20" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/20" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/20" />
              </div>

              {/* Glow behind card */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-2xl -z-10 scale-110" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Horizontal rule bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-800/40 to-transparent" />
    </section>
  );
}
