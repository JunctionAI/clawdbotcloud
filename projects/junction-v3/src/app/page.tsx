'use client';

import { motion } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import JunctionModel from '@/components/JunctionModel';
import ServicesGrid from '@/components/ServicesGrid';
import AIAdvantage from '@/components/AIAdvantage';
import HumanInLoop from '@/components/HumanInLoop';
import TheModel from '@/components/TheModel';
import AutonomyJourney from '@/components/AutonomyJourney';
// Comparison removed - using the one in AIAdvantage only
import CaseStudy from '@/components/CaseStudy';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { NoiseOverlay } from '@/components/AnimatedBackground';
import PageLoader from '@/components/PageLoader';
import FloatingShapes from '@/components/FloatingShapes';
import ScrollProgress from '@/components/ScrollProgress';
import { LogoMarquee } from '@/components/MarqueeText';
import SectionDivider from '@/components/SectionDivider';

export default function Home() {
  return (
    <SmoothScroll>
      {/* Premium page loader */}
      <PageLoader />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
      
      {/* Noise overlay for texture */}
      <NoiseOverlay />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="min-h-screen relative"
      >
        <Navigation />
        <Hero />
        
        {/* Brands/keywords marquee */}
        <LogoMarquee className="border-y border-gray-100" />
        
        <PainPoints />
        
        <SectionDivider variant="decorative" />
        
        <JunctionModel />
        
        {/* Full service range */}
        <ServicesGrid />
        
        <SectionDivider variant="gradient" />
        
        {/* The AI Advantage */}
        <AIAdvantage />
        
        {/* Human oversight */}
        <HumanInLoop />
        
        <SectionDivider variant="decorative" />
        
        {/* The partnership model */}
        <TheModel />
        
        {/* Journey to autonomy */}
        <AutonomyJourney />
        
        <SectionDivider variant="gradient" />
        
        <CaseStudy />
        
        <CTA />
        <Footer />
      </motion.main>
    </SmoothScroll>
  );
}
