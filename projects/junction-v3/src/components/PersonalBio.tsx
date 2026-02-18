'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const background = [
  'Started in traditional digital marketing (SEO, paid media, content)',
  'Moved into operational leadership at scale',
  'Recognized the AI shift before most agencies',
  'Built AI systems that replaced entire departments',
  'Currently: Operating AI-native at Deep Blue Health + select clients',
  'Building ALTERNATE — an AI-native creative studio',
];

export default function PersonalBio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-gray-950"
    >
      {/* Subtle gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-blue-400 font-bold text-sm uppercase tracking-[0.25em] mb-8">
            The Background
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: editorial copy */}
          <div className="lg:col-span-7 space-y-6">
            {[
              "I've spent over a decade in digital marketing — from SEO and paid media to operational leadership at scale. I've worked with brands across e-commerce, health & wellness, and creative industries.",
              "The old playbook is dead. Traditional agencies charging $20k/month for strategy decks and junior account managers are obsolete. The future belongs to operators who understand AI not as a buzzword, but as infrastructure.",
              "I made that transition early. Now I help select businesses do the same.",
            ].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className={`leading-relaxed ${
                  i === 2
                    ? 'text-xl font-semibold text-white'
                    : 'text-lg text-gray-400'
                }`}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Background list */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-4"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-5">
                My background
              </p>
              <ul className="space-y-3">
                {background.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: stat card */}
          <div className="lg:col-span-5 flex items-start justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="w-full max-w-sm"
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-2xl" />

                <div className="relative">
                  <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">
                    Case Result
                  </p>

                  <div className="mb-4">
                    <span className="block text-6xl font-black text-white leading-none">
                      30%+
                    </span>
                    <span className="block text-lg font-semibold text-gray-300 mt-2">
                      above store record
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    AI marketing systems deployed at Deep Blue Health achieved revenue results more than 30% above the store&apos;s previous records.
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 text-sm font-bold">D</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Deep Blue Health</p>
                      <p className="text-xs text-gray-500">AI marketing systems</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-4 text-center"
              >
                <span className="text-xs text-gray-600 tracking-wide">
                  Real result. Real business.
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
