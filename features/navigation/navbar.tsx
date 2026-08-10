'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeService } from '@/lib/theme-service';
import { navigationItems } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import { useCursor } from '@/features/cursor/cursor-context';
import { Magnetic } from '@/components/motion/magnetic';
import { Sun, Moon, Search, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenCommandMenu?: () => void;
}

export function Navbar({ onOpenCommandMenu }: NavbarProps) {
  const { resolvedTheme, toggleTheme, isMounted } = useThemeService();
  const { setCursorState, resetCursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100 && currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
        setIsVisible(false);
      } else if (lastScrollY - currentScrollY > 5 || currentScrollY <= 50) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      const sections = navigationItems.map((item) => item.id);
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 sm:top-6 inset-x-0 z-40 flex justify-center px-3 sm:px-4"
        >
          <nav className="glass-panel flex items-center justify-between gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-2 shadow-2xl backdrop-blur-xl border border-white/10 max-w-5xl w-full">
            {/* Logo Mark with 28px Fascinate Font VN Monogram (90% height of 32px avatar, 0 gap) */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              onMouseEnter={() => setCursorState('link', 'Varun')}
              onMouseLeave={resetCursorState}
              className="group flex items-center gap-2.5 px-2 py-1 rounded-full text-white hover:text-blue-400 transition-colors shrink-0"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-white/20 shadow-md group-hover:border-blue-400 group-hover:scale-105 transition-all shrink-0">
                <img
                  src="/images/prof.jpg"
                  alt="Varun Nayak"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div
                style={{ fontFamily: 'var(--font-fascinate), display, sans-serif' }}
                className="text-[28px] leading-none font-normal text-white group-hover:text-blue-400 transition-colors flex items-center select-none"
              >
                <span>VN</span>
              </div>
            </a>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center gap-0.5 overflow-x-auto no-scrollbar">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setCursorState('button', item.label)}
                    onMouseLeave={resetCursorState}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Command Palette Trigger */}
              <Magnetic strength={0.2}>
                <button
                  onClick={onOpenCommandMenu}
                  onMouseEnter={() => setCursorState('button', 'Search (⌘K)')}
                  onMouseLeave={resetCursorState}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  {/* Mobile: search icon only */}
                  <Search className="h-3.5 w-3.5 sm:hidden text-blue-400" />
                  {/* Desktop: text + ⌘K badge */}
                  <span className="hidden sm:inline-block">Search</span>
                  <kbd className="hidden sm:inline-flex items-center gap-0 rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-neutral-400">
                    ⌘K
                  </kbd>
                </button>
              </Magnetic>

              {/* Theme Toggle Button */}
              <Magnetic strength={0.2}>
                <button
                  onClick={toggleTheme}
                  onMouseEnter={() => setCursorState('button', 'Toggle Theme')}
                  onMouseLeave={resetCursorState}
                  aria-label="Toggle theme"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  {isMounted && resolvedTheme === 'dark' ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-blue-400" />
                  )}
                </button>
              </Magnetic>

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="flex lg:hidden h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:text-white bg-white/5 border border-white/10 transition-all"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 inset-x-4 max-w-md mx-auto rounded-3xl glass-panel p-4 shadow-2xl backdrop-blur-2xl border border-white/15 flex flex-col gap-2 z-50 lg:hidden"
              >
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-4 py-2.5 rounded-2xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-all flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
