'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const whatIBring = [
  'AI marketing systems custom-built for your business',
  'Direct access (no account managers, no ticket queues)',
  'Quarterly strategy + weekly execution',
  'Real results, not reports',
];

export default function WorkWithMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="apply"
      className="relative py-32 overflow-hidden bg-white"
    >
      {/* Subtle background detail */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block text-blue-600 font-bold text-sm uppercase tracking-[0.25em]">
            Work With Me
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: positioning + details */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                Strategic
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Partnership.
                </span>
                <br />
                Not Agency Work.
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                I work with a maximum of{' '}
                <strong className="text-gray-900">4–5 businesses at any time</strong>.
                Not as an agency vendor. As a strategic partner — embedded in your
                operations, building AI systems that create real competitive advantage.
              </p>
            </motion.div>

            {/* What I bring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                What I bring
              </p>
              <ul className="space-y-3">
                {whatIBring.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-base leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Who this is for */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Who this is for
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                Businesses doing{' '}
                <strong className="text-gray-900">$500k+ in revenue</strong> who understand
                the value of AI-native operations.{' '}
                <span className="text-gray-500">
                  If you&apos;re looking for someone to manage your Google Ads, I&apos;m not
                  it. If you want to build a marketing operation that scales with AI,
                  let&apos;s talk.
                </span>
              </p>
            </motion.div>
          </div>

          {/* Right: CTA card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <div className="relative rounded-3xl bg-gray-900 p-10 overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/10 rounded-3xl" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="relative space-y-8">
                  {/* Available spots indicator */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < 2 ? 'bg-gray-700' : 'bg-blue-500'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      <span className="text-blue-400 font-semibold">3 spots</span> currently open
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Ready to build something real?
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      Applications are reviewed personally by Tom. No automated
                      responses, no sales team.
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <a
                    href="mailto:tom@junctionmedia.ai?subject=Partnership%20Application&body=Hi%20Tom%2C%0A%0AI%27d%20like%20to%20apply%20to%20work%20with%20you.%0A%0ABusiness%3A%0AWebsite%3A%0ARevenue%20range%3A%0AChallenge%3A%0A%0AThanks"
                    className="group block w-full text-center px-8 py-4 rounded-xl bg-white text-gray-900 font-bold text-base hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Apply to Work With Me
                    <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-200">
                      →
                    </span>
                  </a>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-gray-600">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Secondary CTA */}
                  <div className="text-center">
                    <a
                      href="mailto:tom@junctionmedia.ai?subject=Strategy%20Call%20Request"
                      className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors duration-200 underline underline-offset-4 decoration-blue-400/30 hover:decoration-blue-300/50"
                    >
                      Book a Strategy Call
                    </a>
                    <p className="text-xs text-gray-600 mt-1">
                      30-minute intro call — no obligation
                    </p>
                  </div>

                  {/* Footer note */}
                  <p className="text-xs text-gray-600 text-center pt-2 border-t border-white/10">
                    Applications reviewed personally. Response within 5 business days.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
