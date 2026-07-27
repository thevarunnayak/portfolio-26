'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useThemeService } from '@/lib/theme-service';

interface ArticleNavHeaderProps {
  category: string;
  readTime: string;
}

export function ArticleNavHeader({ category, readTime }: ArticleNavHeaderProps) {
  const { resolvedTheme, toggleTheme } = useThemeService();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--glass-bg)] backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-blue-400" />
          <span>BACK TO HOME</span>
        </Link>

        {/* Category & Theme Switcher (Matching Normal Navbar Format) */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="hidden sm:inline-block rounded-full bg-blue-500/20 px-3 py-1 text-blue-400 border border-blue-500/30 font-semibold">
            {category}
          </span>
          <span className="hidden sm:inline text-neutral-500">•</span>
          <span className="hidden sm:inline text-[var(--text-muted)]">{readTime}</span>

          {/* Theme Toggle Button matching normal Navbar format */}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all shadow-sm"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? (
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
