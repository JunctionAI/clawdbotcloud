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

const awardBadges: Badge[] = [
  {
    id: 'partner',
    label: 'Google Partner',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    description: 'Premier Partner',
    color: 'from-blue-400 to-green-400',
  },
  {
    id: 'meta',
    label: 'Meta Partner',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2"/>
      </svg>
    ),
    description: 'Business Partner',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'hubspot',
    label: 'HubSpot Certified',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.194v.067c0 .87.506 1.62 1.24 1.978v2.846a5.49 5.49 0 00-2.374 1.109l-6.26-4.921a2.468 2.468 0 00.072-.574A2.478 2.478 0 005.18 1.069a2.478 2.478 0 00-2.475 2.475 2.478 2.478 0 002.475 2.475c.47 0 .908-.133 1.284-.36l6.146 4.832a5.502 5.502 0 00-.784 2.84c0 1.017.277 1.968.756 2.784l-2.268 2.268a2.154 2.154 0 00-.656-.108 2.198 2.198 0 00-2.194 2.194 2.198 2.198 0 002.194 2.194 2.198 2.198 0 002.194-2.194c0-.238-.04-.466-.108-.683l2.223-2.223a5.494 5.494 0 003.07.94 5.506 5.506 0 005.497-5.498 5.506 5.506 0 00-5.497-5.498c-.634 0-1.24.107-1.808.305z" fill="#FF7A59"/>
      </svg>
    ),
    description: 'Solutions Partner',
    color: 'from-orange-400 to-red-400',
  },
  {
    id: 'award',
    label: 'Top Agency 2024',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    description: 'Clutch Award',
    color: 'from-yellow-400 to-orange-400',
  },
];

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

  // Default: horizontal variant
  return (
    <section className={`py-12 border-y border-gray-100 bg-gray-50/50 ${className}`} ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {/* Label */}
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Trusted & Certified
          </span>
          
          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-200" />
          
          {/* Badges */}
          {allBadges.slice(0, 6).map((badge, index) => (
            <BadgeItem key={badge.id} badge={badge} index={index} variant="compact" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { BadgeItem, securityBadges, awardBadges };
