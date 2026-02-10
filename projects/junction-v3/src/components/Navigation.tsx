'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)']
  );
  
  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#pain-points', label: 'Why Us' },
    { href: '#services', label: 'Services' },
    { href: '#model', label: 'Our Model' },
    { href: '#results', label: 'Results' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        style={{
          backgroundColor: navBackground,
          backdropFilter: navBlur,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a 
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative text-white font-black text-xl">J</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 tracking-tight">Junction</span>
                <span className="text-xs text-gray-500 -mt-1 font-medium">MEDIA</span>
              </div>
            </motion.a>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover="hover"
                >
                  <span className="relative">
                    {item.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 origin-left"
                      initial={{ scaleX: 0 }}
                      variants={{
                        hover: { scaleX: 1 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <MagneticButton
                href="#apply"
                className="group relative px-7 py-3 rounded-full text-white font-bold text-sm overflow-hidden"
                strength={0.4}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <span className="absolute inset-0 rounded-full shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow" />
                <span className="relative">Apply Now</span>
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="w-6 h-0.5 bg-gray-800 rounded-full"
                animate={{ 
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 4 : 0
                }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-gray-800 rounded-full"
                animate={{ 
                  opacity: mobileMenuOpen ? 0 : 1
                }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-gray-800 rounded-full"
                animate={{ 
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -4 : 0
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden"
          >
            <div className="mx-4 p-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100">
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-700 hover:text-primary-600 transition-colors py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 w-full text-center py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Apply Now
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
