'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import { copyToClipboard } from '@/lib/utils';
import { useThemeService } from '@/lib/theme-service';
import { useSmoothScroll } from '@/components/providers/smooth-scroll-provider';
import { Search, X, Mail, Sun, Moon, ArrowRight, Check } from 'lucide-react';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, toggleTheme } = useThemeService();
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, lenis, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    await copyToClipboard(siteConfig.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1500);
  };

  const filteredNav = navigationItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl glass-panel rounded-2xl border border-white/20 bg-neutral-900/95 shadow-2xl overflow-hidden"
        >
          {/* Command Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
            <Search className="h-4 w-4 text-neutral-400 shrink-0" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or section name..."
              aria-label="Search sections or actions"
              className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none focus-visible:outline-none outline-none font-mono"
              autoFocus
            />
            <button
              onClick={onClose}
              aria-label="Close command palette"
              className="text-neutral-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Command List */}
          <div
            data-lenis-prevent
            className="p-2 max-h-80 overflow-y-auto space-y-1 font-mono text-xs focus:outline-none"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="px-3 py-1.5 text-[10px] text-neutral-500 uppercase tracking-wider">
              SECTION NAVIGATION
            </div>
            {filteredNav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-300 hover:bg-blue-500 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-500 group-hover:text-white" />
                  <span>Jump to {item.label}</span>
                </div>
                <span className="text-[10px] text-neutral-500 group-hover:text-white">
                  [{item.shortcut}]
                </span>
              </a>
            ))}

            <div className="px-3 py-1.5 pt-3 text-[10px] text-neutral-500 uppercase tracking-wider">
              QUICK ACTIONS
            </div>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-300 hover:bg-blue-500 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Mail className="h-3.5 w-3.5" />}
                <span>{copied ? 'Email Copied!' : `Copy Email (${siteConfig.email})`}</span>
              </div>
            </button>

            <button
              onClick={() => {
                toggleTheme();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-300 hover:bg-blue-500 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2">
                {resolvedTheme === 'dark' ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-blue-400" />}
                <span>Toggle Theme Mode ({resolvedTheme === 'dark' ? 'Light' : 'Dark'})</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
