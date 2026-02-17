'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const services = [
  // Hero card - SEO/GEO/AEO (large)
  {
    id: "seo",
    title: "SEO / GEO / AEO",
    subtitle: "Search, Generative & Answer Engine Optimization",
    description: "Get found everywhere AI is looking. From Google to ChatGPT to Perplexity.",
    expandedDescription: "We optimize for traditional search, AI-powered answer engines, and generative search results. As AI transforms how people find information, we ensure your brand appears in every context.",
    features: ["Technical SEO", "Content optimization", "AI search visibility", "Schema markup", "Voice search"],
    category: "discovery",
    aiLevel: "full",
    size: "hero",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    accentColor: "#0ea5e9",
    illustration: "seo"
  },
  // Large card - Google Ads
  {
    id: "google-ads",
    title: "Google Ads",
    subtitle: "AI-Powered Campaign Management",
    description: "Real-time bid optimization running 24/7. Catch wasted spend instantly, scale what works.",
    expandedDescription: "Our AI monitors every campaign metric in real-time, adjusting bids, pausing underperformers, and scaling winners before you even wake up.",
    features: ["Real-time bidding", "Search term mining", "Conversion tracking", "PMAX optimization"],
    category: "growth",
    aiLevel: "full",
    size: "large",
    gradient: "from-emerald-500 to-green-600",
    accentColor: "#10b981",
    illustration: "google"
  },
  // Large card - Meta Ads
  {
    id: "meta-ads",
    title: "Meta Ads",
    subtitle: "Facebook & Instagram Mastery",
    description: "Campaigns that convert. AI manages budgets, creatives that stop thumbs.",
    expandedDescription: "From awareness to conversion, we build full-funnel campaigns with AI-optimized audiences and human-crafted creatives that capture attention.",
    features: ["Audience optimization", "Creative testing", "Retargeting flows", "Lookalike audiences"],
    category: "growth",
    aiLevel: "hybrid",
    size: "large",
    gradient: "from-pink-500 to-rose-600",
    accentColor: "#ec4899",
    illustration: "meta"
  },
  // Medium - Email & Loyalty
  {
    id: "email",
    title: "Email & Loyalty",
    subtitle: "Automated Nurture Flows",
    description: "Welcome series, abandoned carts, win-backs — all on autopilot.",
    expandedDescription: "We build sophisticated email flows that nurture leads, recover lost sales, and turn one-time buyers into loyal customers.",
    features: ["Klaviyo/Mailchimp", "Flow automation", "Segmentation", "A/B testing"],
    category: "engagement",
    aiLevel: "full",
    size: "medium",
    gradient: "from-violet-500 to-purple-600",
    accentColor: "#8b5cf6",
    illustration: "email"
  },
  // Medium - Content & Social
  {
    id: "social",
    title: "Content & Social",
    subtitle: "Multi-Platform Presence",
    description: "Consistent posting across all platforms. AI creates, strategists curate.",
    expandedDescription: "Your brand, everywhere — with content that's always on-message. We handle the daily grind so you can focus on strategy.",
    features: ["Multi-platform", "Community management", "Trend monitoring", "Content calendar"],
    category: "engagement",
    aiLevel: "hybrid",
    size: "medium",
    gradient: "from-orange-500 to-amber-500",
    accentColor: "#f59e0b",
    illustration: "social"
  },
  // Medium - Video Production
  {
    id: "video",
    title: "Video Production",
    subtitle: "AI + Hero Content",
    description: "AI-generated videos at scale. Plus strategic shoots for hero content.",
    expandedDescription: "From quick social clips to polished brand videos, we blend AI efficiency with human creativity.",
    features: ["AI video generation", "Short-form content", "Hero production", "Motion graphics"],
    category: "engagement",
    aiLevel: "hybrid",
    size: "medium",
    gradient: "from-red-500 to-pink-600",
    accentColor: "#ef4444",
    illustration: "video"
  },
  // Standard - Influencer
  {
    id: "influencer",
    title: "Influencer Management",
    subtitle: "Discovery to ROI",
    description: "AI finds perfect matches. We handle everything else.",
    expandedDescription: "From micro-influencers to celebrities, we identify, negotiate, and manage partnerships that deliver real results.",
    features: ["AI discovery", "Outreach", "Campaign management", "ROI tracking"],
    category: "growth",
    aiLevel: "hybrid",
    size: "standard",
    gradient: "from-teal-500 to-cyan-500",
    accentColor: "#14b8a6",
    illustration: "influencer"
  },
  // Standard - Website
  {
    id: "website",
    title: "Website & Shopify",
    subtitle: "Continuous Optimization",
    description: "Your site gets better every week. Not just built and forgotten.",
    expandedDescription: "Ongoing CRO, performance tuning, and feature development. We treat your website as a living product.",
    features: ["CRO optimization", "Performance tuning", "Feature development", "Analytics"],
    category: "infrastructure",
    aiLevel: "hybrid",
    size: "standard",
    gradient: "from-indigo-500 to-blue-600",
    accentColor: "#6366f1",
    illustration: "website"
  },
  // Standard - Strategy
  {
    id: "strategy",
    title: "Strategy & Consulting",
    subtitle: "Senior Expertise",
    description: "Strategists who actually know your business. Weekly calls, quarterly roadmaps.",
    expandedDescription: "Direct access to senior marketing strategists who understand your industry, your competition, and your goals.",
    features: ["Business intelligence", "Competitive analysis", "Growth planning", "Weekly calls"],
    category: "infrastructure",
    aiLevel: "human",
    size: "standard",
    gradient: "from-slate-600 to-gray-700",
    accentColor: "#475569",
    illustration: "strategy"
  },
  // Standard - Branding
  {
    id: "branding",
    title: "Branding & Design",
    subtitle: "Continuous Creative Output",
    description: "Social graphics, ad creative, email design — all on-brand, always.",
    expandedDescription: "A dedicated design pipeline that keeps your brand looking fresh across every touchpoint.",
    features: ["Visual identity", "Campaign creative", "Template systems", "Brand guidelines"],
    category: "infrastructure",
    aiLevel: "hybrid",
    size: "standard",
    gradient: "from-fuchsia-500 to-purple-600",
    accentColor: "#d946ef",
    illustration: "branding"
  },
  // Wide - OpenCore
  {
    id: "opencore",
    title: "OpenCore Setup",
    subtitle: "Deploy Your Own AI Infrastructure",
    description: "Custom autonomous systems tailored to your business operations.",
    expandedDescription: "We build and deploy AI agent systems that handle repetitive tasks, freeing your team to focus on high-value work.",
    features: ["Agent deployment", "Custom workflows", "System integration", "Training"],
    category: "infrastructure",
    aiLevel: "full",
    size: "wide",
    gradient: "from-cyan-500 to-blue-600",
    accentColor: "#06b6d4",
    illustration: "opencore"
  },
  // Standard - Training
  {
    id: "training",
    title: "AI Training for Staff",
    subtitle: "Upskill Your Team",
    description: "From basics to advanced prompt engineering and automation.",
    expandedDescription: "Hands-on workshops that transform your team into AI power users, with ongoing support.",
    features: ["Hands-on workshops", "Custom curriculum", "Ongoing support", "Certification"],
    category: "infrastructure",
    aiLevel: "human",
    size: "standard",
    gradient: "from-emerald-500 to-green-600",
    accentColor: "#10b981",
    illustration: "training"
  },
];

// Custom SVG illustrations for each service
const ServiceIllustration = ({ type, className = "" }: { type: string; className?: string }) => {
  const illustrations: Record<string, JSX.Element> = {
    seo: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        <defs>
          <linearGradient id="seo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Search magnifier with AI sparkles */}
        <circle cx="80" cy="80" r="45" stroke="url(#seo-grad)" strokeWidth="6" fill="none" opacity="0.3" />
        <circle cx="80" cy="80" r="35" stroke="url(#seo-grad)" strokeWidth="4" fill="none" />
        <line x1="115" y1="115" x2="155" y2="155" stroke="url(#seo-grad)" strokeWidth="8" strokeLinecap="round" />
        {/* AI sparkles */}
        <path d="M140 40 L145 50 L155 45 L150 55 L160 60 L150 65 L155 75 L145 70 L140 80 L135 70 L125 75 L130 65 L120 60 L130 55 L125 45 L135 50 Z" fill="#fbbf24" opacity="0.8" />
        <path d="M170 90 L173 97 L180 95 L177 102 L185 105 L177 108 L180 115 L173 113 L170 120 L167 113 L160 115 L163 108 L155 105 L163 102 L160 95 L167 97 Z" fill="#fbbf24" opacity="0.6" />
        {/* Graph lines inside */}
        <polyline points="55,95 70,75 85,85 100,65" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
    google: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Stylized G with bar chart */}
        <path d="M100 35 C65 35 40 65 40 100 C40 135 65 165 100 165 C120 165 135 155 145 140 L115 115 L145 115" 
              stroke="#10b981" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Rising bars */}
        <rect x="125" y="70" width="15" height="60" rx="4" fill="#10b981" opacity="0.3" />
        <rect x="145" y="50" width="15" height="80" rx="4" fill="#10b981" opacity="0.5" />
        <rect x="165" y="30" width="15" height="100" rx="4" fill="#10b981" opacity="0.8" />
        {/* AI bolt */}
        <path d="M175 140 L160 155 L170 155 L165 175 L185 155 L175 155 Z" fill="#fbbf24" />
      </svg>
    ),
    meta: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Infinity-inspired Meta shape */}
        <path d="M50 100 C50 60 80 60 100 100 C120 140 150 140 150 100 C150 60 120 60 100 100 C80 140 50 140 50 100"
              stroke="#ec4899" strokeWidth="8" fill="none" />
        {/* Floating hearts/engagement */}
        <path d="M160 50 L165 45 C170 40 180 45 175 55 L160 70 L145 55 C140 45 150 40 155 45 Z" fill="#ec4899" opacity="0.6" />
        <path d="M45 55 L48 52 C51 49 57 52 54 58 L45 67 L36 58 C33 52 39 49 42 52 Z" fill="#ec4899" opacity="0.4" />
        {/* Target circles */}
        <circle cx="100" cy="100" r="12" fill="#ec4899" opacity="0.3" />
        <circle cx="100" cy="100" r="6" fill="#ec4899" />
      </svg>
    ),
    email: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Envelope with automation gear */}
        <rect x="30" y="55" width="120" height="90" rx="8" stroke="#8b5cf6" strokeWidth="4" fill="none" />
        <polyline points="30,55 90,105 150,55" stroke="#8b5cf6" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Gear */}
        <circle cx="155" cy="130" r="25" stroke="#8b5cf6" strokeWidth="4" fill="none" opacity="0.5" />
        <circle cx="155" cy="130" r="10" fill="#8b5cf6" opacity="0.5" />
        {/* Automation lines */}
        <path d="M155 95 L155 105 M180 130 L170 130 M155 155 L155 165 M130 130 L140 130" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
        {/* Sparkle */}
        <path d="M175 65 L178 72 L185 70 L182 77 L190 80 L182 83 L185 90 L178 88 L175 95 L172 88 L165 90 L168 83 L160 80 L168 77 L165 70 L172 72 Z" fill="#fbbf24" opacity="0.7" />
      </svg>
    ),
    social: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Connected nodes */}
        <circle cx="100" cy="100" r="25" stroke="#f59e0b" strokeWidth="4" fill="none" />
        <circle cx="50" cy="60" r="15" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.7" />
        <circle cx="150" cy="60" r="15" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.7" />
        <circle cx="50" cy="150" r="15" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.7" />
        <circle cx="150" cy="150" r="15" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.7" />
        {/* Connections */}
        <line x1="75" y1="85" x2="60" y2="72" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
        <line x1="125" y1="85" x2="140" y2="72" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
        <line x1="75" y1="115" x2="60" y2="138" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
        <line x1="125" y1="115" x2="140" y2="138" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
        {/* Center icon */}
        <circle cx="100" cy="100" r="10" fill="#f59e0b" />
        {/* Notification bubbles */}
        <circle cx="160" cy="50" r="8" fill="#ef4444" />
        <text x="160" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
      </svg>
    ),
    video: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Play button with film reel */}
        <circle cx="100" cy="100" r="50" stroke="#ef4444" strokeWidth="4" fill="none" />
        <path d="M85 75 L130 100 L85 125 Z" fill="#ef4444" />
        {/* Film reel elements */}
        <rect x="25" y="60" width="20" height="80" rx="4" stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.5" />
        <rect x="155" y="60" width="20" height="80" rx="4" stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.5" />
        {/* Perforations */}
        <circle cx="35" cy="75" r="4" fill="#ef4444" opacity="0.5" />
        <circle cx="35" cy="100" r="4" fill="#ef4444" opacity="0.5" />
        <circle cx="35" cy="125" r="4" fill="#ef4444" opacity="0.5" />
        <circle cx="165" cy="75" r="4" fill="#ef4444" opacity="0.5" />
        <circle cx="165" cy="100" r="4" fill="#ef4444" opacity="0.5" />
        <circle cx="165" cy="125" r="4" fill="#ef4444" opacity="0.5" />
        {/* AI sparkle */}
        <path d="M155 40 L158 47 L165 45 L162 52 L170 55 L162 58 L165 65 L158 63 L155 70 L152 63 L145 65 L148 58 L140 55 L148 52 L145 45 L152 47 Z" fill="#fbbf24" opacity="0.8" />
      </svg>
    ),
    influencer: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Person silhouette with megaphone */}
        <circle cx="80" cy="60" r="25" stroke="#14b8a6" strokeWidth="4" fill="none" />
        <path d="M55 95 Q80 130 105 95" stroke="#14b8a6" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Megaphone */}
        <path d="M120 70 L170 50 L170 110 L120 90 Z" stroke="#14b8a6" strokeWidth="3" fill="none" />
        <ellipse cx="120" cy="80" rx="8" ry="15" stroke="#14b8a6" strokeWidth="3" fill="none" />
        {/* Sound waves */}
        <path d="M175 65 Q185 80 175 95" stroke="#14b8a6" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M180 55 Q195 80 180 105" stroke="#14b8a6" strokeWidth="2" fill="none" opacity="0.3" />
        {/* Stars */}
        <path d="M60 140 L63 148 L55 152 L63 156 L60 165 L67 159 L75 165 L72 156 L80 152 L72 148 Z" fill="#fbbf24" opacity="0.6" />
      </svg>
    ),
    website: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Browser window */}
        <rect x="30" y="40" width="140" height="110" rx="8" stroke="#6366f1" strokeWidth="4" fill="none" />
        <line x1="30" y1="65" x2="170" y2="65" stroke="#6366f1" strokeWidth="2" />
        {/* Browser dots */}
        <circle cx="45" cy="52" r="5" fill="#ef4444" />
        <circle cx="62" cy="52" r="5" fill="#fbbf24" />
        <circle cx="79" cy="52" r="5" fill="#10b981" />
        {/* Code lines */}
        <rect x="45" y="80" width="60" height="8" rx="2" fill="#6366f1" opacity="0.5" />
        <rect x="45" y="95" width="90" height="8" rx="2" fill="#6366f1" opacity="0.3" />
        <rect x="45" y="110" width="45" height="8" rx="2" fill="#6366f1" opacity="0.5" />
        <rect x="95" y="110" width="55" height="8" rx="2" fill="#6366f1" opacity="0.2" />
        {/* Speed indicator */}
        <path d="M155 125 L165 135 L155 145" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Chess piece (knight) */}
        <path d="M80 160 L120 160 L115 130 Q130 110 120 90 Q140 85 135 65 Q130 50 100 50 Q70 50 70 80 Q60 90 75 110 Q65 120 80 130 Z" 
              stroke="#475569" strokeWidth="4" fill="none" />
        {/* Strategy lines */}
        <line x1="145" y1="50" x2="175" y2="50" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="145" y1="70" x2="185" y2="70" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
        <line x1="145" y1="90" x2="170" y2="90" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        {/* Checkmarks */}
        <path d="M175 47 L180 52 L190 42" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        <path d="M185 67 L190 72 L200 62" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
    branding: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Paint palette */}
        <ellipse cx="100" cy="100" rx="65" ry="55" stroke="#d946ef" strokeWidth="4" fill="none" transform="rotate(-15 100 100)" />
        <circle cx="70" cy="80" r="12" fill="#ef4444" />
        <circle cx="95" cy="65" r="12" fill="#f59e0b" />
        <circle cx="125" cy="70" r="12" fill="#10b981" />
        <circle cx="140" cy="95" r="12" fill="#3b82f6" />
        <circle cx="130" cy="125" r="12" fill="#8b5cf6" />
        {/* Thumb hole */}
        <ellipse cx="70" cy="115" rx="15" ry="12" fill="white" stroke="#d946ef" strokeWidth="3" />
        {/* Brush */}
        <rect x="155" y="40" width="8" height="40" rx="2" fill="#d946ef" transform="rotate(35 155 40)" />
        <path d="M170 65 Q180 75 175 85" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" transform="rotate(35 170 75)" />
      </svg>
    ),
    opencore: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Central AI core */}
        <circle cx="100" cy="100" r="30" stroke="#06b6d4" strokeWidth="4" fill="none" />
        <circle cx="100" cy="100" r="15" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="100" cy="100" r="5" fill="#06b6d4" />
        {/* Orbiting elements */}
        <ellipse cx="100" cy="100" rx="60" ry="20" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.3" transform="rotate(0 100 100)" />
        <ellipse cx="100" cy="100" rx="60" ry="20" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.3" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="60" ry="20" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.3" transform="rotate(120 100 100)" />
        {/* Nodes */}
        <circle cx="160" cy="100" r="8" fill="#06b6d4" />
        <circle cx="70" cy="55" r="8" fill="#06b6d4" opacity="0.7" />
        <circle cx="70" cy="145" r="8" fill="#06b6d4" opacity="0.7" />
        {/* Data streams */}
        <path d="M45 45 L55 55 L45 65 L55 75" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M155 130 L165 140 L155 150 L165 160" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.5" />
      </svg>
    ),
    training: (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Graduation cap */}
        <path d="M100 60 L40 90 L100 120 L160 90 Z" stroke="#10b981" strokeWidth="4" fill="none" />
        <line x1="100" y1="120" x2="100" y2="150" stroke="#10b981" strokeWidth="3" />
        <path d="M70 105 L70 140 Q100 160 130 140 L130 105" stroke="#10b981" strokeWidth="3" fill="none" />
        {/* AI brain waves */}
        <path d="M60 55 Q70 45 80 55 Q90 65 100 55" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M100 55 Q110 45 120 55 Q130 65 140 55" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.5" />
        {/* Certificate/badge */}
        <circle cx="160" cy="145" r="20" stroke="#fbbf24" strokeWidth="3" fill="none" />
        <path d="M152 145 L158 151 L170 139" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  };

  return illustrations[type] || <div className={className} />;
};

// AI Level Badge component
const AIBadge = ({ level }: { level: string }) => {
  const badges = {
    full: {
      label: "Full AI",
      icon: (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
        </svg>
      ),
      className: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
    },
    hybrid: {
      label: "AI + Human",
      icon: (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20v-2a8 8 0 0 1 16 0v2" />
        </svg>
      ),
      className: "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
    },
    human: {
      label: "Human-Led",
      icon: (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      className: "bg-gradient-to-r from-slate-500 to-gray-600 text-white"
    }
  };

  const badge = badges[level as keyof typeof badges];
  if (!badge) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.className} shadow-lg`}>
      {badge.icon}
      <span>{badge.label}</span>
    </div>
  );
};

// Individual service card with hover expansion
function ServiceCard({ 
  service, 
  index 
}: { 
  service: typeof services[0]; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(false);

  // Size-specific classes
  const sizeClasses = {
    hero: "md:col-span-2 md:row-span-2",
    large: "md:col-span-2 md:row-span-1",
    wide: "md:col-span-2 md:row-span-1",
    medium: "md:col-span-1 md:row-span-1",
    standard: "md:col-span-1 md:row-span-1",
  };

  // Stagger delay based on position
  const getDelay = () => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    return (row * 0.1) + (col * 0.05);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: getDelay(),
        ease: [0.215, 0.61, 0.355, 1]
      }}
      className={`relative group ${sizeClasses[service.size as keyof typeof sizeClasses] || ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div 
        className={`
          relative h-full overflow-hidden rounded-3xl
          bg-white/80 backdrop-blur-xl
          border border-gray-100/80
          transition-all duration-500 ease-out
          ${isExpanded ? 'shadow-2xl border-gray-200/80' : 'shadow-lg'}
        `}
        animate={{
          y: isExpanded ? -8 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500`}
          animate={{ opacity: isExpanded ? 0.05 : 0 }}
        />
        
        {/* Animated border glow */}
        <motion.div
          className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500`}
          style={{
            boxShadow: `0 0 40px ${service.accentColor}30, inset 0 0 40px ${service.accentColor}10`
          }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
        />

        <div className={`relative h-full p-6 ${service.size === 'hero' ? 'md:p-8' : ''} flex flex-col`}>
          {/* Header row: Badge + Illustration */}
          <div className="flex justify-between items-start mb-4">
            <AIBadge level={service.aiLevel} />
            
            {/* Illustration - larger for hero cards */}
            <motion.div
              className={`
                ${service.size === 'hero' ? 'w-24 h-24 md:w-32 md:h-32' : 'w-16 h-16 md:w-20 md:h-20'}
                flex-shrink-0
              `}
              animate={{
                scale: isExpanded ? 1.1 : 1,
                rotate: isExpanded ? 5 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ServiceIllustration type={service.illustration} className="w-full h-full" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {/* Subtitle */}
            <span className={`text-xs font-semibold uppercase tracking-wider mb-1 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
              {service.subtitle}
            </span>
            
            {/* Title */}
            <h3 className={`
              font-black text-gray-900 mb-2 leading-tight
              ${service.size === 'hero' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
            `}>
              {service.title}
            </h3>
            
            {/* Description - switches on hover for hero/large */}
            <AnimatePresence mode="wait">
              <motion.p
                key={isExpanded ? 'expanded' : 'collapsed'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`
                  text-gray-600 leading-relaxed flex-1
                  ${service.size === 'hero' ? 'text-base md:text-lg' : 'text-sm'}
                `}
              >
                {isExpanded && (service.size === 'hero' || service.size === 'large') 
                  ? service.expandedDescription 
                  : service.description}
              </motion.p>
            </AnimatePresence>

            {/* Features - revealed on hover */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
                marginTop: isExpanded ? 16 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`
                      text-xs px-3 py-1.5 rounded-full font-medium
                      bg-gradient-to-r ${service.gradient} bg-opacity-10
                      text-gray-700 border border-gray-200/50
                    `}
                    style={{
                      background: `linear-gradient(135deg, ${service.accentColor}15, ${service.accentColor}05)`,
                    }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Static features for non-expanded (only on larger cards) */}
            {!isExpanded && (service.size === 'hero' || service.size === 'large') && (
              <div className="mt-4 flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500"
                  >
                    {feature}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                    +{service.features.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Hover indicator arrow */}
          <motion.div
            className="absolute bottom-4 right-4"
            animate={{
              x: isExpanded ? 4 : 0,
              opacity: isExpanded ? 1 : 0.3,
            }}
            transition={{ duration: 0.2 }}
          >
            <svg 
              className={`w-5 h-5 transition-colors duration-300`}
              style={{ color: isExpanded ? service.accentColor : '#9ca3af' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Category filter tabs
function CategoryTabs({ 
  activeCategory, 
  onCategoryChange 
}: { 
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}) {
  const categories = [
    { id: null, label: "All Services", icon: "✦" },
    { id: "discovery", label: "Discovery", icon: "🔍" },
    { id: "growth", label: "Growth", icon: "📈" },
    { id: "engagement", label: "Engagement", icon: "💬" },
    { id: "infrastructure", label: "Infrastructure", icon: "⚙️" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat.id ?? 'all'}
          onClick={() => onCategoryChange(cat.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-300
            ${activeCategory === cat.id 
              ? 'bg-gray-900 text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}

export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredServices = activeCategory 
    ? services.filter(s => s.category === activeCategory)
    : services;

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
        
        {/* Mesh gradient blobs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-50/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-primary-400" />
              Full-Service Capabilities
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-primary-400" />
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
            <LineReveal delay={0.1}>
              <span className="block">Everything You Need.</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">One Partnership.</span>
            </LineReveal>
          </h2>
          
          <SlideUpReveal delay={0.3}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              No more juggling agencies. No more gaps in coverage. We deliver 
              the complete marketing stack — <span className="font-semibold text-gray-900">powered by AI</span>, guided by experts.
            </p>
          </SlideUpReveal>
        </div>

        {/* Category filter */}
        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
        />

        {/* Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-fr"
          style={{ gridAutoRows: 'minmax(240px, auto)' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Value proposition callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl" />
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-100 shadow-2xl">
              <div className="text-center">
                <p className="text-sm text-primary-600 font-semibold uppercase tracking-wider mb-4">One Partnership</p>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  All 12 services. One team. Unified execution.
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  We don&apos;t sell services piecemeal. We become your fractional marketing department — 
                  strategy and execution unified under one roof.
                </p>
                <motion.a
                  href="#apply"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply to Work With Us
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
