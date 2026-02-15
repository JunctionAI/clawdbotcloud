'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { LineReveal, SlideUpReveal } from './TextReveal';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
  videoThumbnail?: string;
  metric?: {
    value: string;
    label: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'Deep Blue Health',
    quote: "Junction didn't just improve our marketing—they transformed our entire operation. We went from struggling to keep up to absolutely dominating our category. The AI agents work around the clock, and the results speak for themselves.",
    metric: { value: '10x', label: 'productivity gain' },
  },
  {
    id: 2,
    name: 'Marcus Williams',
    role: 'Founder',
    company: 'TechVenture',
    quote: "I was skeptical about AI marketing at first. But seeing real-time optimization happening 24/7, with human oversight when it matters—that's the perfect balance. Our CAC dropped 40% in the first quarter.",
    metric: { value: '40%', label: 'lower CAC' },
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'CMO',
    company: 'GrowthLabs',
    quote: "The difference is night and day. Traditional agencies gave us monthly reports. Junction gives us continuous improvement. Every single day, our campaigns get smarter. It's like having a marketing team that never sleeps.",
    metric: { value: '3x', label: 'faster growth' },
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Director of Growth',
    company: 'Meridian Co',
    quote: "We've worked with agencies before. None of them come close. The combination of AI speed and human strategy is unmatched. Junction is the future of marketing, and we're glad we got in early.",
    metric: { value: '156%', label: 'revenue increase' },
  },
];

// Single testimonial card with video placeholder
function TestimonialCard({ 
  testimonial, 
  isActive = false,
  onClick,
}: { 
  testimonial: Testimonial; 
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 text-white shadow-2xl shadow-primary-500/30 scale-100' 
          : 'bg-white border border-gray-100 hover:border-primary-200 hover:shadow-xl text-gray-900 scale-95 opacity-70 hover:opacity-100'
      }`}
      whileHover={{ scale: isActive ? 1 : 0.98 }}
    >
      {/* Video play button (placeholder) */}
      {testimonial.videoThumbnail && (
        <div className="absolute top-4 right-4">
          <motion.div 
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isActive ? 'bg-white/20' : 'bg-primary-100'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary-600'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Metric badge */}
      {testimonial.metric && (
        <motion.div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 ${
            isActive ? 'bg-white/20' : 'bg-primary-50 text-primary-600'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xl">{testimonial.metric.value}</span>
          <span className={isActive ? 'text-white/80' : 'text-primary-500'}>
            {testimonial.metric.label}
          </span>
        </motion.div>
      )}

      {/* Quote */}
      <blockquote className={`text-lg md:text-xl leading-relaxed mb-8 ${isActive ? 'text-white' : 'text-gray-700'}`}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {/* Avatar placeholder */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
          isActive ? 'bg-white/20 text-white' : 'bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600'
        }`}>
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className={`font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>
            {testimonial.name}
          </div>
          <div className={`text-sm ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>

      {/* Active indicator line */}
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-8 right-8 h-1 bg-white/30 rounded-full"
          layoutId="activeIndicator"
        />
      )}
    </motion.div>
  );
}

// Quote carousel - auto-rotating
function QuoteCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Large quote display */}
      <div className="relative min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Big quote mark */}
            <div className="text-8xl text-primary-200 font-serif mb-4">&ldquo;</div>
            
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 leading-relaxed mb-8">
              {testimonials[activeIndex].quote}
            </blockquote>

            {/* Metric highlight */}
            {testimonials[activeIndex].metric && (
              <motion.div 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-full mb-8"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <span className="text-2xl font-black">{testimonials[activeIndex].metric.value}</span>
                <span className="text-sm font-medium opacity-90">{testimonials[activeIndex].metric.label}</span>
              </motion.div>
            )}

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center text-2xl font-bold text-primary-600">
                {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-lg">{testimonials[activeIndex].name}</div>
                <div className="text-gray-500">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="group relative"
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-primary-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`} />
            {index === activeIndex && (
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary-500/30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
          key={activeIndex}
        />
      </div>
    </div>
  );
}

// Video testimonial grid
function VideoTestimonialGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TestimonialCard 
            testimonial={testimonial}
            isActive={selectedId === testimonial.id}
            onClick={() => setSelectedId(selectedId === testimonial.id ? null : testimonial.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}

interface TestimonialsProps {
  variant?: 'carousel' | 'grid' | 'featured';
  className?: string;
}

export default function Testimonials({ 
  variant = 'carousel',
  className = '',
}: TestimonialsProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className={`py-24 relative overflow-hidden ${className}`} ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal>
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-[0.2em] mb-6">
              Client Success Stories
            </span>
          </SlideUpReveal>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            <LineReveal delay={0.1}>
              <span className="block">Don&apos;t Just Take</span>
            </LineReveal>
            <LineReveal delay={0.2}>
              <span className="gradient-text block mt-2">Our Word For It</span>
            </LineReveal>
          </h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Real results from real clients. See how AI-powered marketing transformed their businesses.
          </motion.p>
        </div>

        {/* Content based on variant */}
        {variant === 'carousel' && <QuoteCarousel />}
        {variant === 'grid' && <VideoTestimonialGrid />}
        {variant === 'featured' && (
          <div className="max-w-4xl mx-auto">
            <TestimonialCard 
              testimonial={testimonials[0]} 
              isActive={true}
            />
          </div>
        )}

        {/* Trust indicators */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 border-2 border-white"
                />
              ))}
            </div>
            <span className="text-gray-600 font-medium ml-2">50+ Happy Clients</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 font-medium">5.0 Average Rating</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600 font-medium">100% Satisfaction Guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { TestimonialCard, QuoteCarousel, VideoTestimonialGrid };
