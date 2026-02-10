'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO / GEO / AEO",
    description: "Search, generative, and answer engine optimization. Get found everywhere AI is looking.",
    features: ["Technical SEO", "Content optimization", "AI search visibility"],
    gradient: "from-blue-500 to-cyan-500",
    tag: "Full AI"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Google Ads",
    description: "AI-driven bid optimization running 24/7. Catch wasted spend instantly, scale what works.",
    features: ["Real-time bidding", "Search term mining", "Conversion tracking"],
    gradient: "from-green-500 to-emerald-500",
    tag: "Full AI"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m10-4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4M3 20h18M4 20V10a2 2 0 012-2h2m8 0h2a2 2 0 012 2v10" />
      </svg>
    ),
    title: "Meta Ads",
    description: "Facebook & Instagram campaigns that convert. AI manages, creatives that stop thumbs.",
    features: ["Audience optimization", "Creative testing", "Retargeting flows"],
    gradient: "from-pink-500 to-rose-500",
    tag: "AI + Design"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email & Loyalty",
    description: "Automated flows that nurture and convert. Welcome series, abandoned carts, win-backs.",
    features: ["Klaviyo/Mailchimp", "Flow automation", "Segmentation"],
    gradient: "from-violet-500 to-purple-500",
    tag: "Full AI"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Content & Social",
    description: "Consistent posting across all platforms. AI creates, strategists curate, brands grow.",
    features: ["Multi-platform", "Community management", "Trend monitoring"],
    gradient: "from-orange-500 to-amber-500",
    tag: "AI + Strategy"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Video Production",
    description: "AI-generated videos at scale. Plus strategic shoots when you need hero content.",
    features: ["AI video (Higgsfield)", "Short-form content", "Hero production"],
    gradient: "from-red-500 to-pink-500",
    tag: "AI + Human"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Influencer Management",
    description: "AI finds the perfect matches. We handle outreach, negotiation, and campaign execution.",
    features: ["Prospect discovery", "Campaign management", "ROI tracking"],
    gradient: "from-teal-500 to-cyan-500",
    tag: "AI + Human"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Website & Shopify",
    description: "Continuous optimization, not one-off projects. Your site gets better every week.",
    features: ["CRO optimization", "Performance tuning", "Feature development"],
    gradient: "from-indigo-500 to-blue-500",
    tag: "AI + Dev"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Strategy & Consulting",
    description: "Senior strategists who actually know your business. Weekly calls, quarterly roadmaps.",
    features: ["Business intelligence", "Competitive analysis", "Growth planning"],
    gradient: "from-slate-500 to-gray-600",
    tag: "Human-Led"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Branding & Design",
    description: "Continuous design output. Social graphics, ad creative, email design — all on-brand, always.",
    features: ["Visual identity", "Campaign creative", "Template systems"],
    gradient: "from-fuchsia-500 to-purple-500",
    tag: "AI + Designer"
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group h-full"
    >
      <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 group-hover:border-gray-200 transition-all duration-300 group-hover:shadow-lg">
        {/* Tag */}
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white`}>
            {service.tag}
          </span>
        </div>
        
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-4 shadow-md`}>
          {service.icon}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 pr-16">
          {service.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {service.description}
        </p>
        
        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, i) => (
            <span 
              key={i} 
              className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-primary-50/30 to-white" />
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              Full-Service Capabilities
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No more juggling agencies. No more gaps in coverage. We deliver 
              the complete marketing stack — powered by AI, guided by experts.
            </p>
          </SlideUpReveal>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Value callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-5 border border-gray-100 shadow-xl">
            <div className="text-left">
              <p className="text-sm text-gray-500">Traditional agency cost for this</p>
              <p className="text-2xl font-black text-gray-400 line-through">$30k - $50k/month</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-left">
              <p className="text-sm text-primary-600 font-medium">Junction partnership</p>
              <p className="text-2xl font-black gradient-text">$10k/month</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
