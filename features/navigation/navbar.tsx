'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeService } from '@/lib/theme-service';
import { navigationItems } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import { useCursor } from '@/features/cursor/cursor-context';
import { Magnetic } from '@/components/motion/magnetic';
import { Sun, Moon, Command, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenCommandMenu?: () => void;
}

export function Navbar({ onOpenCommandMenu }: NavbarProps) {
  const { resolvedTheme, toggleTheme } = useThemeService();
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
            {/* Logo Mark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              onMouseEnter={() => setCursorState('link', 'VN')}
              onMouseLeave={resetCursorState}
              className="flex items-center gap-2 px-2 py-1 rounded-full text-white hover:text-blue-400 transition-colors shrink-0"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-mono text-xs font-bold text-white border border-white/20">
                VN
              </span>
              <span className="hidden font-mono text-xs font-semibold tracking-tight sm:inline-block">
                {siteConfig.shortName}
              </span>
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
                  onMouseEnter={() => setCursorState('button', 'Cmd+K')}
                  onMouseLeave={resetCursorState}
                  className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
                  aria-label="Open Command Menu"
                >
                  <Command className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="hidden font-mono text-[10px] sm:inline-block text-neutral-400">
                    K
                  </span>
                </button>
              </Magnetic>

              {/* Theme Toggle */}
              <Magnetic strength={0.2}>
                <button
                  onClick={toggleTheme}
                  onMouseEnter={() => setCursorState('button', 'Theme')}
                  onMouseLeave={resetCursorState}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
                  aria-label="Toggle Theme"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                  ) : (
                    <Moon className="h-3.5 w-3.5 text-blue-400" />
                  )}
                </button>
              </Magnetic>

              {/* Mobile / Tablet Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-neutral-300 lg:hidden border border-white/10"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>

          {/* Responsive Mobile / Tablet Overlay Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-16 left-4 right-4 rounded-2xl glass-panel p-4 border border-white/10 bg-neutral-900/95 backdrop-blur-2xl shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto"
              >
                <div className="flex flex-col space-y-1">
                  {navigationItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
