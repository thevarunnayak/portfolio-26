'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CORE ENGINE...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const statusMessages = [
      'INITIALIZING CORE ENGINE...',
      'PRELOADING FONTS & GRAPHICS...',
      'COMPILING GLSL SHADER PIPELINE...',
      'HYDRATING STRUCTURED CONTENT...',
      'SYSTEM READY'
    ];

    let currentProgress = 0;

    // Hyper-optimized fast progress animation (~150ms) for sub-second FCP & high performance score
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 25) + 20;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText('SYSTEM READY');
        clearInterval(interval);

        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 120);
        }, 50);
      } else {
        setProgress(currentProgress);
        const textIdx = Math.min(
          Math.floor((currentProgress / 100) * (statusMessages.length - 1)),
          statusMessages.length - 2
        );
        setStatusText(statusMessages[textIdx]);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[var(--bg-primary,#0a0a0a)] text-[var(--text-primary,#ffffff)] px-8 py-12 select-none pointer-events-none transition-colors duration-300"
        >
          {/* Top minimal status bar */}
          <div className="flex w-full items-center justify-between font-mono text-xs text-neutral-400 dark:text-neutral-400">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="tracking-wider text-[var(--text-primary)] font-bold">PANGALA VARUN NAYAK</span>
            </div>
            <span className="tracking-widest opacity-60">2026.1.0</span>
          </div>

          {/* Center Notion-Style Tile with Fascinate Font & 4px Letter Gap */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Ambient Rotating Glow Aura */}
            <motion.div
              animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
              transition={{
                rotate: { repeat: Infinity, duration: 3, ease: 'linear' },
                scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
              }}
              className="absolute h-40 w-40 rounded-full bg-gradient-to-tr from-blue-500/25 via-teal-400/20 to-indigo-500/25 blur-2xl opacity-80"
            />

            {/* Notion-Style Card Tile */}
            <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl sm:rounded-3xl bg-neutral-900/90 dark:bg-neutral-950/90 border-2 border-white/20 dark:border-white/25 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.25)]">
              {/* Fascinate Google Font Monogram with 4px Gap between V and N */}
              <div
                style={{ fontFamily: 'var(--font-fascinate), display, sans-serif' }}
                className="relative z-10 flex items-center justify-center text-4xl sm:text-5xl font-normal text-white drop-shadow-[0_2px_12px_rgba(59,130,246,0.6)]"
              >
                <span>V</span>
                <span className="ml-[4px]">N</span>
              </div>
            </div>
          </div>

          {/* Bottom progress bar & status text */}
          <div className="w-full max-w-md space-y-3">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-neutral-500/20 dark:bg-neutral-800">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
              <span className="tracking-wider text-[var(--text-primary)] opacity-80">{statusText}</span>
              <span className="opacity-60 tabular-nums">{progress}/100</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
