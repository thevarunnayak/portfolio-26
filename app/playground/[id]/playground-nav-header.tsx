'use client';

import React from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useThemeService } from '@/lib/theme-service';

interface PlaygroundNavHeaderProps {
  category: string;
  title: string;
}

export function PlaygroundNavHeader({ category }: PlaygroundNavHeaderProps) {
  const { resolvedTheme, toggleTheme, isMounted } = useThemeService();

  const handleReturnHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollToSection', 'playground');
      window.location.href = '/#playground';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--glass-bg)] backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Back to Home Link */}
        <a
          href="/#playground"
          onClick={handleReturnHome}
          className="group flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-blue-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-blue-400" />
          <span>BACK TO HOME</span>
        </a>

        {/* Category & Theme Switcher */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="hidden sm:inline-block rounded-full bg-blue-500/20 px-3 py-1 text-blue-400 border border-blue-500/30 font-semibold uppercase">
            {category}
          </span>
          <span className="hidden sm:inline text-neutral-500">•</span>
          <span className="hidden sm:inline text-[var(--text-muted)]">ENGINEERING LAB</span>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all shadow-sm"
            aria-label="Toggle Theme"
          >
            {isMounted && resolvedTheme === 'dark' ? (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-blue-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export function ReturnToPlaygroundButton() {
  const handleReturnHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollToSection', 'playground');
      window.location.href = '/#playground';
    }
  };

  return (
    <a
      href="/#playground"
      onClick={handleReturnHome}
      className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-mono text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25 cursor-pointer"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>RETURN TO PLAYGROUND LABS</span>
    </a>
  );
}
