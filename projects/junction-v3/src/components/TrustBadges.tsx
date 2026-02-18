'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Badge {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  color: string;
}

// CLEANED: Removed unearned certifications (SOC 2, ISO 27001, GDPR)
// Only keeping legitimate trust signals that are actually true
const securityBadges: Badge[] = [
  {
    id: 'ssl',
    label: 'SSL Secured',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    description: '256-bit encryption',
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 'nz',
    label: 'NZ Based',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Auckland, New Zealand',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'ai-native',
    label: 'AI-Native',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Built on Claude & GPT',
    color: 'from-purple-400 to-violet-500',
  },
  {
    id: 'select',
    label: 'Select Clients',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    description: 'Limited availability',
    color: 'from-amber-400 to-orange-500',
  },
];

// NOTE: awardBadges (Google Partner, Meta Partner, HubSpot Certified) removed — unverified.
// Replaced with honest stat row in the horizontal variant below.
const awardBadges: Badge[] = [];

// Individual badge component
function BadgeItem({ 
  badge, 
  index,
  variant = 'default',
}: { 
  badge: Badge; 
  index: number;
  variant?: 'default' | 'compact' | 'detailed';
}) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="group relative"
      >
        <div className="flex flex-col items-center gap-2 p-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
            {badge.icon}
          </div>
          <span className="text-xs font-bold text-gray-600 text-center">{badge.label}</span>
        </div>
      </motion.div>
    );
  }

  if (variant === 'detailed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="group relative"
      >
        <div className="relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
            {badge.icon}
          </div>
          
          {/* Text */}
          <h4 className="font-bold text-gray-900 mb-1">{badge.label}</h4>
          {badge.description && (
            <p className="text-sm text-gray-500">{badge.description}</p>
          )}
          
          {/* Hover glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group relative"
    >
      <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-md`}>
          {badge.icon}
        </div>
        <div className="text-center">
          <span className="font-bold text-gray-900 text-sm">{badge.label}</span>
          {badge.description && (
            <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid' | 'compact';
  showSecurity?: boolean;
  showAwards?: boolean;
  className?: string;
}

export default function TrustBadges({
  variant = 'horizontal',
  showSecurity = true,
  showAwards = true,
  className = '',
}: TrustBadgesProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  
  const allBadges = [
    ...(showSecurity ? securityBadges : []),
    ...(showAwards ? awardBadges : []),
  ];

  if (variant === 'compact') {
    return (
      <div className={`py-8 ${className}`} ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            {allBadges.map((badge, index) => (
              <BadgeItem key={badge.id} badge={badge} index={index} variant="compact" />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <section className={`py-20 ${className}`} ref={containerRef}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">
              Trust & Security
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Enterprise-Grade Protection
            </h2>
          </motion.div>

          {/* Security badges */}
          {showSecurity && (
            <div className="mb-12">
              <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                Security & Compliance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {securityBadges.map((badge, index) => (
                  <BadgeItem key={badge.id} badge={badge} index={index} variant="detailed" />
                ))}
              </div>
            </div>
          )}

          {/* Award badges */}
          {showAwards && (
            <div>
              <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                Certifications & Awards
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {awardBadges.map((badge, index) => (
                  <BadgeItem key={badge.id} badge={badge} index={index} variant="detailed" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Default: horizontal variant — honest stat row
  return (
    <section className={`py-12 border-y border-gray-100 bg-gray-50/50 ${className}`} ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {[
            { stat: '5+', label: 'Clients' },
            { stat: '$2M+', label: 'Revenue Generated' },
            { stat: '2024', label: 'AI-Native Since' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-2xl font-black gradient-text">{item.stat}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
            </motion.div>
          ))}

          {/* Divider dots */}
          {[0, 1].map((i) => (
            <div key={i} className="hidden md:block w-1 h-1 rounded-full bg-gray-300" />
          ))}

          {/* Security badges (legitimate) */}
          {securityBadges.map((badge, index) => (
            <BadgeItem key={badge.id} badge={badge} index={index} variant="compact" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { BadgeItem, securityBadges, awardBadges };
