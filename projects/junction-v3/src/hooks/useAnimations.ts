'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// ============================================
// SCROLL PROGRESS HOOK
// ============================================

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  return { scrollYProgress, scaleX };
}

// ============================================
// PARALLAX HOOK
// ============================================

interface ParallaxOptions {
  offset?: number;
  direction?: 'up' | 'down';
  speed?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { offset = 50, direction = 'up', speed = 1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [offset * speed, -offset * speed] 
      : [-offset * speed, offset * speed]
  );
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return { ref, y: smoothY, scrollYProgress };
}

// ============================================
// SCALE ON SCROLL HOOK
// ============================================

export function useScaleOnScroll(scaleRange: [number, number] = [0.95, 1]) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  return { ref, scale: smoothScale };
}

// ============================================
// OPACITY ON SCROLL HOOK
// ============================================

export function useOpacityOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  
  return { ref, opacity };
}

// ============================================
// STAGGERED REVEAL HOOK
// ============================================

interface StaggerRevealOptions {
  stagger?: number;
  threshold?: number;
  once?: boolean;
}

export function useStaggerReveal(
  itemCount: number,
  options: StaggerRevealOptions = {}
) {
  const { stagger = 0.05, threshold = 0.1, once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  const getDelay = useCallback((index: number) => index * stagger, [stagger]);
  
  return { ref, isInView, getDelay };
}

// ============================================
// MAGNETIC EFFECT HOOK
// ============================================

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { strength = 0.3, ease = 0.15 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;
      
      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      targetRef.current = {
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      };
    };
    
    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength, ease]);
  
  return { ref, x: position.x, y: position.y };
}

// ============================================
// TYPEWRITER EFFECT HOOK
// ============================================

interface TypewriterOptions {
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function useTypewriter(text: string, options: TypewriterOptions = {}) {
  const { speed = 50, delay = 0, loop = false } = options;
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    const startTyping = () => {
      timeout = setTimeout(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
          startTyping();
        } else {
          setIsComplete(true);
          if (loop) {
            setTimeout(() => {
              currentIndex = 0;
              setDisplayText('');
              setIsComplete(false);
              startTyping();
            }, 2000);
          }
        }
      }, currentIndex === 0 ? delay : speed);
    };
    
    startTyping();
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, loop]);
  
  return { displayText, isComplete };
}

// ============================================
// COUNTER ANIMATION HOOK
// ============================================

interface CounterOptions {
  duration?: number;
  delay?: number;
}

export function useCounter(
  end: number,
  options: CounterOptions = {}
) {
  const { duration = 2000, delay = 0 } = options;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    const startTime = Date.now() + delay;
    let rafId: number;
    
    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-quart)
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * eased));
      
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        hasAnimated.current = true;
      }
    };
    
    rafId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, duration, delay]);
  
  return { ref, count };
}

// ============================================
// CURSOR POSITION HOOK
// ============================================

export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return { position, isVisible };
}

// ============================================
// SMOOTH SCROLL HOOK
// ============================================

export function useSmoothScroll() {
  const scrollTo = useCallback((target: string | number, options?: ScrollToOptions) => {
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', ...options });
      }
    } else {
      window.scrollTo({ top: target, behavior: 'smooth', ...options });
    }
  }, []);
  
  return { scrollTo };
}

// ============================================
// INTERSECTION OBSERVER HOOK (Enhanced)
// ============================================

interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

export function useIntersection(options: IntersectionOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, hasBeenVisible]);
  
  return { ref, isVisible: once ? hasBeenVisible : isVisible };
}

// ============================================
// SCROLL VELOCITY HOOK
// ============================================

export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const [velocity, setVelocity] = useState(0);
  const prevScrollY = useRef(0);
  const prevTime = useRef(Date.now());
  
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const now = Date.now();
      const delta = latest - prevScrollY.current;
      const timeDelta = now - prevTime.current;
      
      if (timeDelta > 0) {
        setVelocity(delta / timeDelta);
      }
      
      prevScrollY.current = latest;
      prevTime.current = now;
    });
  }, [scrollY]);
  
  return velocity;
}
