'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const pillars = [
  {
    icon: '🎯',
    title: 'Dedicated strategist who knows your business',
    description: 'You work directly with Tom — not a rotating account team. One person who understands your category, your customers, and your goals.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🤖',
    title: 'AI systems customised to your workflows',
    description: "We don't retrofit off-the-shelf tools. We build AI marketing infrastructure designed around how your business actually operates.",
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: '📲',
    title: 'Direct access, not ticket queues',
    description: 'Slack, email, or call — you reach us directly. No helpdesk. No waiting. We move at business speed.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: '🗺️',
    title: 'Quarterly roadmaps, weekly execution',
    description: 'Strategy that connects to daily action. Every week you see real work ship — not decks about work we plan to do.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: '📈',
    title: 'Results, not reports',
    description: 'We care about revenue, customer acquisition, and business impact — not impressions and clicks. If it doesn\'t move the needle, we stop doing it.',
    gradient: 'from-rose-500 to-pink-500',
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div className="relative h-full glass-card rounded-3xl p-8 border border-white/60 group-hover:border-primary-200/50 transition-colors duration-300">
        {/* Icon */}
        <div className="relative text-4xl mb-5 w-fit">
          <div className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} opacity-20 blur-xl scale-150`} />
          <span className="relative">{pillar.icon}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
          {pillar.title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-sm">
          {pillar.description}
        </p>

        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${pillar.gradient} opacity-5 rounded-bl-[80px]`} />
      </div>
    </motion.div>
  );
}

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/20 to-white" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              The Way We Work
            </span>
          </SlideUpReveal>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">How We</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Work</span>
            </LineReveal>
          </h2>

          <SlideUpReveal delay={0.3}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We partner with businesses that understand the leverage of AI-native
              marketing systems. Strategy and execution, unified. Human creativity
              amplified by autonomous agents.
            </p>
          </SlideUpReveal>
        </div>

        {/* Positioning statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16 p-8 rounded-3xl bg-gray-50 border border-gray-100"
        >
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              If you&apos;re looking for an agency to manage your Google Ads,{' '}
              <strong className="text-gray-900">we&apos;re not it.</strong>
            </p>
            <p>
              If you&apos;re looking to build a marketing operation that scales with
              you —{' '}
              <strong className="text-primary-600">let&apos;s talk.</strong>
            </p>
          </div>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We work with{' '}
            <strong className="text-gray-900">4–5 clients at a time.</strong>{' '}
            Quality of attention matters more than quantity of accounts.
          </p>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-10"
          >
            <svg
              className="w-6 h-6 mx-auto text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
