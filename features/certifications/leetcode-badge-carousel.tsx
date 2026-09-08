'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leetcodeBadgesData, LeetCodeBadgeItem } from '@/content/leetcode-badges';
import { Flame, Sparkles, ExternalLink, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCursor } from '@/features/cursor/cursor-context';

// Subtle, low-opacity radial ambient gradients
const TIER_GLOW_MAP: Record<LeetCodeBadgeItem['tierColor'], string> = {
  emerald: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.28) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 72%)',
  amber: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.28) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 72%)',
  purple: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.28) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 72%)',
  blue: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.28) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 72%)',
  cyan: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.28) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 72%)',
  rose: 'radial-gradient(circle at center, rgba(244, 63, 94, 0.28) 0%, rgba(244, 63, 94, 0.08) 50%, transparent 72%)',
  orange: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.28) 0%, rgba(249, 115, 22, 0.08) 50%, transparent 72%)',
};

const TIER_BORDER_MAP: Record<LeetCodeBadgeItem['tierColor'], string> = {
  emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  amber: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
  purple: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
  rose: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
  orange: 'border-orange-500/30 text-orange-400 bg-orange-500/10',
};

export function LeetCodeBadgeCarousel() {
  const { setCursorState, resetCursorState } = useCursor();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [itemSpacing, setItemSpacing] = useState(96);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;
  const isInViewRef = useRef(isInView);
  isInViewRef.current = isInView;
  const lastManualStepTime = useRef(0);
  const syncTrackerRef = useRef<HTMLSpanElement>(null);

  const totalBadges = leetcodeBadgesData.length;

  // Viewport IntersectionObserver to pause animations and timing when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '120px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Responsive spacing between badges in step track
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (window.innerWidth >= 1024) {
        setItemSpacing(110);
      } else if (window.innerWidth >= 640) {
        setItemSpacing(92);
      } else {
        setItemSpacing(80);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextStep = useCallback((isManual = false) => {
    if (isManual) lastManualStepTime.current = Date.now();
    setActiveIndex((prev) => (prev + 1) % totalBadges);
  }, [totalBadges]);

  const prevStep = useCallback(() => {
    lastManualStepTime.current = Date.now();
    setActiveIndex((prev) => (prev - 1 + totalBadges) % totalBadges);
  }, [totalBadges]);

  // Synchronize carousel slide with 3D rotation: only when carousel is visible in viewport
  useEffect(() => {
    const el = syncTrackerRef.current;
    if (!el) return;

    const handleIteration = () => {
      if (!isInViewRef.current) return;
      if (isHoveredRef.current) return;
      if (Date.now() - lastManualStepTime.current < 1200) return;
      nextStep(false);
    };

    el.addEventListener('animationiteration', handleIteration);
    return () => el.removeEventListener('animationiteration', handleIteration);
  }, [nextStep]);

  const currentBadge = leetcodeBadgesData[activeIndex];

  return (
    <div
      ref={containerRef}
      className="badge-carousel-container relative w-full mt-12 sm:mt-16 space-y-6 pt-10 border-t border-white/10 select-none"
    >
      {/* 3D Rotation Animation Timing Tracker - only animates when in viewport */}
      <span
        ref={syncTrackerRef}
        className={`animate-badge-spin-sync absolute w-px h-px opacity-0 pointer-events-none -z-50 ${
          !isInView ? 'paused-animation' : ''
        }`}
        style={{ animationPlayState: isInView ? 'running' : 'paused' }}
        aria-hidden="true"
      />
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            COMPETITIVE PROGRAMMING <br className="hidden sm:inline" />
            <span className="text-neutral-500">& STREAK MEDALS</span>
          </h3>
          <p className="max-w-xl text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Continuous problem solving across data structures, algorithms, and system design. 
            Click any badge or use arrows to step through milestones.
          </p>
        </div>

        {/* Action Link & Stats */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-mono text-[11px] font-bold text-emerald-400">
            <Flame className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>500+ DAYS STREAK</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] font-bold text-neutral-300">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>{totalBadges} MEDALS</span>
          </div>
        </div>
      </div>

      {/* Stepped Motion Carousel Stage */}
      <div className="relative w-full overflow-hidden py-8 px-4 flex flex-col items-center [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
        {/* Navigation Arrow Controls */}
        <button
          onClick={prevStep}
          onMouseEnter={() => setCursorState('button', 'Previous')}
          onMouseLeave={resetCursorState}
          aria-label="Previous Badge"
          className="badge-carousel-nav-btn absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/80 border border-white/15 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all shadow-lg backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={() => nextStep(true)}
          onMouseEnter={() => setCursorState('button', 'Next')}
          onMouseLeave={resetCursorState}
          aria-label="Next Badge"
          className="badge-carousel-nav-btn absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/80 border border-white/15 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all shadow-lg backdrop-blur-md cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Stepped Badges Row */}
        <div
          className="relative h-24 sm:h-28 lg:h-32 w-full max-w-3xl flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {leetcodeBadgesData.map((badge, index) => {
            // Signed circular offset relative to activeIndex (-totalBadges/2 to +totalBadges/2)
            let diff = index - activeIndex;
            if (diff > totalBadges / 2) diff -= totalBadges;
            if (diff < -totalBadges / 2) diff += totalBadges;

            const absDiff = Math.abs(diff);
            // Virtualize: Only mount visible badges plus 1 buffer neighbor for fluid transitions (max 5 on mobile, 7 on desktop)
            const maxDiff = isMobile ? 2 : 3;
            if (absDiff > maxDiff) return null;

            // On mobile show 3 badges (absDiff <= 1: left, center, right); on desktop/tablet show 5 (absDiff <= 2)
            const isVisible = isMobile ? absDiff <= 1 : absDiff <= 2;
            const isCenter = diff === 0;
            const glowStyle = TIER_GLOW_MAP[badge.tierColor] || TIER_GLOW_MAP.amber;

            // Compute step positions and scales
            const scale = isCenter
              ? 1.35
              : absDiff === 1
              ? isMobile
                ? 0.92
                : 0.98
              : 0.78;

            const opacity = !isVisible
              ? 0
              : isCenter
              ? 1
              : absDiff === 1
              ? 0.75
              : 0.45;

            const zIndex = isCenter ? 30 : 20 - absDiff * 4;
            const translateX = diff * itemSpacing;

            return (
              <motion.div
                key={badge.id}
                initial={false}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.42,
                  ease: [0.25, 1, 0.5, 1],
                }}
                onClick={() => {
                  lastManualStepTime.current = Date.now();
                  setActiveIndex(index);
                }}
                className={`group/badge absolute flex flex-col items-center justify-center cursor-pointer will-change-transform ${
                  !isVisible ? 'pointer-events-none' : ''
                }`}
                style={{
                  zIndex,
                }}
              >
                {/* Radial Ambient Glow */}
                <span
                  className={`pointer-events-none absolute -inset-3 rounded-full transition-opacity duration-300 blur-sm -z-10 ${
                    isCenter ? 'opacity-65' : 'opacity-25 group-hover/badge:opacity-60'
                  }`}
                  style={{
                    background: glowStyle,
                  }}
                />

                {/* Synchronized 3D Rotating Badge Sprite (GPU Hardware Accelerated, pauses when offscreen) */}
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-full overflow-hidden flex items-center shrink-0 drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                  <img
                    src={badge.spritePath}
                    alt={badge.title}
                    draggable={false}
                    style={{
                      width: '5000%',
                      height: '100%',
                      maxWidth: 'none',
                      animationPlayState: isInView ? 'running' : 'paused',
                    }}
                    className={`animate-badge-spin-sync pointer-events-none select-none ${
                      !isInView ? 'paused-animation' : ''
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Centered Badge Detail Card */}
      <div
        className="badge-carousel-card relative mx-auto max-w-md rounded-2xl bg-neutral-950/80 p-4 border border-white/10 shadow-xl backdrop-blur-xl text-center space-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBadge.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-1.5"
          >
            {/* Title */}
            <div className="flex items-center justify-center">
              <h4 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                {currentBadge.title}
              </h4>
            </div>

            {/* Category & Date */}
            <div className="flex items-center justify-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold border ${
                  TIER_BORDER_MAP[currentBadge.tierColor] || TIER_BORDER_MAP.amber
                }`}
              >
                {currentBadge.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-400">
                <Calendar className="h-3 w-3" />
                <span>{currentBadge.date}</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-300 leading-relaxed font-normal pt-1">
              {currentBadge.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Link to LeetCode */}
        <a
          href="https://leetcode.com/u/thevarunnayak/"
          target="_blank"
          rel="noopener noreferrer"
          className="badge-carousel-link group/link inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-mono font-semibold text-neutral-200 hover:text-white transition-all shadow-sm mt-1"
        >
          <span>Verify on LeetCode</span>
          <ExternalLink className="h-3 w-3 text-neutral-400 group-hover/link:text-white transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}

