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
      'PRELOADING FONTS & SATOSHI TYPE...',
      'COMPILING GLSL SHADER PIPELINE...',
      'HYDRATING STRUCTURED CONTENT...',
      'PREPARING DIGITAL EXPERIENCE...'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText('SYSTEM READY');
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800);
        }, 300);
      } else {
        setProgress(currentProgress);
        const textIdx = Math.min(
          Math.floor((currentProgress / 100) * statusMessages.length),
          statusMessages.length - 1
        );
        setStatusText(statusMessages[textIdx]);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0a0a0a] px-8 py-12 text-white"
        >
          {/* Top minimal status indicator */}
          <div className="flex w-full items-center justify-between font-mono text-xs text-neutral-400">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              <span className="tracking-wider">VARUN NAYAK // ARCHITECTURE</span>
            </div>
            <span className="tracking-widest text-neutral-500">2026.1.0</span>
          </div>

          {/* Center animated logo mark */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex h-24 w-24 items-center justify-center"
            >
              <svg className="h-full w-full" viewBox="0 0 100 100" fill="none">
                <motion.rect
                  x="10"
                  y="10"
                  width="80"
                  height="80"
                  rx="20"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                />
                <motion.path
                  d="M30 35L50 65L70 35"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ ease: 'easeOut' }}
                />
                <motion.path
                  d="M30 65L50 35L70 65"
                  stroke="#2dd4bf"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                />
              </svg>
            </motion.div>

            {/* Percentage Display */}
            <div className="text-center">
              <motion.span
                className="font-mono text-6xl font-bold tracking-tight text-white md:text-7xl"
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Bottom progress bar & status text */}
          <div className="w-full max-w-md space-y-3">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-neutral-800">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400">
              <span className="tracking-wider text-neutral-300">{statusText}</span>
              <span className="text-neutral-500">{progress}/100</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
