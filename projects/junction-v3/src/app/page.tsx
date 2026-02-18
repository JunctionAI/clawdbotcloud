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
// ========================================
const SmoothScroll = lazy(() => import('@/components/SmoothScroll'));
const FloatingShapes = lazy(() => import('@/components/FloatingShapes'));

// New personal brand sections
const PersonalBio = lazy(() => import('@/components/PersonalBio'));
const AlternateShowcase = lazy(() => import('@/components/AlternateShowcase'));
const EducationContent = lazy(() => import('@/components/EducationContent'));
const WorkWithMe = lazy(() => import('@/components/WorkWithMe'));

// Kept sections
const ResultsMetrics = lazy(() => import('@/components/ResultsMetrics'));
const HumanInLoop = lazy(() => import('@/components/HumanInLoop'));
const Footer = lazy(() => import('@/components/Footer'));

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

        {/* Floating geometric shapes */}
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
          {/* 1. HERO - above the fold */}
          <Navigation />
          <Hero />

          {/* 2. PERSONAL BIO – Tom's background & story */}
          <Suspense fallback={<SectionSkeleton height="h-[700px]" />}>
            <PersonalBio />
          </Suspense>

          {/* 3. RESULTS METRICS – real proof of work */}
          <Suspense fallback={<SectionSkeleton height="h-[400px]" />}>
            <ResultsMetrics />
          </Suspense>

          {/* 4. ALTERNATE SHOWCASE – creative proof */}
          <Suspense fallback={<SectionSkeleton height="h-[700px]" />}>
            <AlternateShowcase />
          </Suspense>

          {/* 5. HUMAN IN LOOP – AI + human approach */}
          <Suspense fallback={<SectionSkeleton />}>
            <HumanInLoop />
          </Suspense>

          {/* 6. EDUCATION & CONTENT – teaching thought leadership */}
          <Suspense fallback={<SectionSkeleton height="h-[800px]" />}>
            <EducationContent />
          </Suspense>

          {/* 7. WORK WITH ME – consulting CTA */}
          <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
            <WorkWithMe />
          </Suspense>

          {/* 7. FOOTER */}
          <Suspense fallback={<SectionSkeleton height="h-48" />}>
            <Footer />
          </Suspense>
        </motion.main>
      </SmoothScroll>
    </Suspense>
  );
}
