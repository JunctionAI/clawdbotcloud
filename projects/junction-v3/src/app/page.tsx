'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// ========================================
// CRITICAL PATH (Above the fold) - Static imports
// ========================================
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { NoiseOverlay } from '@/components/AnimatedBackground';
import PageLoader from '@/components/PageLoader';
import ScrollProgress from '@/components/ScrollProgress';

// ========================================
// NON-CRITICAL (Below the fold) - Dynamic imports
// Code split these to reduce initial bundle size
// ========================================
const SmoothScroll = lazy(() => import('@/components/SmoothScroll'));
const FloatingShapes = lazy(() => import('@/components/FloatingShapes'));
const LogoMarquee = lazy(() => 
  import('@/components/MarqueeText').then(mod => ({ default: mod.LogoMarquee }))
);
const PainPoints = lazy(() => import('@/components/PainPoints'));
const SectionDivider = lazy(() => import('@/components/SectionDivider'));
const JunctionModel = lazy(() => import('@/components/JunctionModel'));
const ServicesGrid = lazy(() => import('@/components/ServicesGrid'));
const AIAdvantage = lazy(() => import('@/components/AIAdvantage'));
const HumanInLoop = lazy(() => import('@/components/HumanInLoop'));
const TheModel = lazy(() => import('@/components/TheModel'));
const AutonomyJourney = lazy(() => import('@/components/AutonomyJourney'));
const CaseStudy = lazy(() => import('@/components/CaseStudy'));
const CTA = lazy(() => import('@/components/CTA'));
const Footer = lazy(() => import('@/components/Footer'));

// ========================================
// SOCIAL PROOF COMPONENTS - Dynamic imports
// ========================================
const LogoCloud = lazy(() => import('@/components/LogoCloud'));
// const Testimonials = lazy(() => import('@/components/Testimonials')); // DISABLED: fabricated testimonials
const TrustBadges = lazy(() => import('@/components/TrustBadges'));
// const FeaturedIn = lazy(() => import('@/components/FeaturedIn')); // DISABLED: fake press mentions
const ResultsMetrics = lazy(() => import('@/components/ResultsMetrics'));

// ========================================
// LOADING FALLBACKS
// ========================================
function SectionSkeleton({ height = 'h-96' }: { height?: string }) {
  return (
    <div className={`${height} w-full flex items-center justify-center`}>
      <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin" />
    </div>
  );
}

function MarqueeSkeleton() {
  return (
    <div className="h-16 w-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse border-y border-gray-100" />
  );
}

function BadgesSkeleton() {
  return (
    <div className="py-12 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 flex justify-center gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-16 h-16 rounded-xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// ========================================
// MAIN PAGE COMPONENT
// ========================================
export default function Home() {
  return (
    <Suspense fallback={null}>
      <SmoothScroll>
        {/* Premium page loader */}
        <PageLoader />
        
        {/* Scroll progress indicator */}
        <ScrollProgress />
        
        {/* Floating geometric shapes - lazy loaded */}
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
        
        {/* Noise overlay for texture */}
        <NoiseOverlay />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="min-h-screen relative"
        >
          {/* ABOVE THE FOLD - Critical */}
          <Navigation />
          <Hero />
          
          {/* BELOW THE FOLD - Lazy loaded */}
          <Suspense fallback={<MarqueeSkeleton />}>
            <LogoMarquee className="border-y border-gray-100" />
          </Suspense>
          
          {/* SOCIAL PROOF #1: Client logos - immediate credibility */}
          <Suspense fallback={<SectionSkeleton height="h-32" />}>
            <LogoCloud variant="marquee" showTitle={true} />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <PainPoints />
          </Suspense>
          
          <Suspense fallback={null}>
            <SectionDivider variant="decorative" />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <JunctionModel />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
            <ServicesGrid />
          </Suspense>
          
          {/* SOCIAL PROOF #2: Trust badges - SIMPLIFIED: only legitimate claims */}
          <Suspense fallback={<BadgesSkeleton />}>
            <TrustBadges variant="horizontal" showSecurity={true} showAwards={false} />
          </Suspense>
          
          <Suspense fallback={null}>
            <SectionDivider variant="gradient" />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <AIAdvantage />
          </Suspense>
          
          {/* SOCIAL PROOF #3: Results metrics - proof of capability */}
          <Suspense fallback={<SectionSkeleton height="h-48" />}>
            <ResultsMetrics variant="bar" showTitle={true} />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <HumanInLoop />
          </Suspense>
          
          <Suspense fallback={null}>
            <SectionDivider variant="decorative" />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <TheModel />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton />}>
            <AutonomyJourney />
          </Suspense>
          
          <Suspense fallback={null}>
            <SectionDivider variant="gradient" />
          </Suspense>
          
          {/* CASE STUDY: Disabled per Tom's request - still in progress */}
          {/* <Suspense fallback={<SectionSkeleton />}>
            <CaseStudy />
          </Suspense> */}
          
          {/* SOCIAL PROOF #5: Testimonials - DISABLED: remove fabricated testimonials */}
          {/* <Suspense fallback={<SectionSkeleton />}>
            <Testimonials variant="carousel" />
          </Suspense> */}
          
          {/* SOCIAL PROOF #6: Featured in publications - DISABLED: remove fake press mentions */}
          {/* <Suspense fallback={<MarqueeSkeleton />}>
            <FeaturedIn variant="simple" />
          </Suspense> */}
          
          <Suspense fallback={<SectionSkeleton height="h-64" />}>
            <CTA />
          </Suspense>
          
          <Suspense fallback={<SectionSkeleton height="h-48" />}>
            <Footer />
          </Suspense>
        </motion.main>
      </SmoothScroll>
    </Suspense>
  );
}
