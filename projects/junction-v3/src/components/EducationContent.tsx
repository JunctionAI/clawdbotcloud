'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const contentPillars = [
  {
    icon: '📱',
    title: 'Social Content',
    body:
      'Daily documentation of how I actually work. No theory \u2014 just execution. Follow along as I build systems, launch campaigns, and solve real problems in real time.',
    tag: 'Daily',
  },
  {
    icon: '🎓',
    title: 'Training & Workshops',
    body:
      'For teams ready to level up. I teach what I do — AI tools, automation, content systems, operational efficiency. Practical, applicable, no fluff.',
    tag: 'On-Demand',
  },
  {
    icon: '🤖',
    title: 'Unlocking Creativity with AI',
    body:
      'This isn\'t about replacing humans. It\'s about giving creative people superpowers. I show how AI becomes a collaborator, not a threat.',
    tag: 'Framework',
  },
];

export default function EducationContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="education"
      className="relative py-32 overflow-hidden bg-gray-950"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] translate-x-1/3" />
      </div>

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-800/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block text-blue-400 font-bold text-sm uppercase tracking-[0.25em]">
            Education & Content
          </span>
        </motion.div>

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Teaching the next
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                generation of marketers.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex items-end"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              The best way to build authority is to give away what you know. Not precious about
              it &mdash; the more people understand AI-native marketing, the better the industry gets.
            </p>
          </motion.div>
        </div>

        {/* Content pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contentPillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300" />

                <div className="relative">
                  {/* Tag */}
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400/80 mb-4">
                    {pillar.tag}
                  </span>

                  {/* Icon */}
                  <div className="text-3xl mb-4">{pillar.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>

                  {/* Body */}
                  <p className="text-gray-400 leading-relaxed text-sm">{pillar.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-10 md:p-14"
        >
          {/* Left accent */}
          <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-blue-500/60 to-transparent rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                The Philosophy
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white leading-snug">
                The best marketers in 2026 won&apos;t be the ones with the biggest budgets.
              </p>
              <p className="text-lg text-gray-400 mt-4 leading-relaxed">
                They&apos;ll be the ones who learned to work <em>with</em> the machines. Here to
                help that transition happen.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              {/* Social follow CTA */}
              <a
                href="https://www.linkedin.com/in/tomhalltaylor"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-blue-500/40 hover:bg-white/[0.07] transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 text-blue-400 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-white">Follow on LinkedIn</p>
                  <p className="text-xs text-gray-500">Daily insights & builds</p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              <a
                href="https://twitter.com/tomhalltaylor"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-blue-500/40 hover:bg-white/[0.07] transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 text-gray-300 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-white">Follow on X</p>
                  <p className="text-xs text-gray-500">Real-time thoughts</p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
