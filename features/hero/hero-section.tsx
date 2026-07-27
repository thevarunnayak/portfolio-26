'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/content/site';
import { HeroParticles } from '@/components/canvas/hero-particles';
import { HeroAvatar3D } from '@/components/canvas/hero-avatar-3d';
import { Magnetic } from '@/components/motion/magnetic';
import { useCursor } from '@/features/cursor/cursor-context';
import { copyToClipboard } from '@/lib/utils';
import { ArrowDownRight, Copy, Check, Calendar, MapPin, Sparkles, Terminal } from 'lucide-react';

export function HeroSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(siteConfig.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-noise bg-grid-pattern px-6 pt-28 pb-12 md:px-12 lg:px-20"
    >
      {/* Hero Dedicated WebGL Background Particles Canvas */}
      <HeroParticles />

      {/* Top Status & Availability Badges */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 backdrop-blur-md border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs text-neutral-300">
            {siteConfig.availability}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 font-mono text-xs text-neutral-400"
        >
          <MapPin className="h-3.5 w-3.5 text-blue-400" />
          <span>{siteConfig.location}</span>
          <span className="text-neutral-600">•</span>
          <span>{siteConfig.timezone}</span>
        </motion.div>
      </div>

      {/* Hero Grid Container: Typography on Left (7 cols), 3D Avatar Card on Right (5 cols) */}
      <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-12 py-4 max-w-7xl w-full mx-auto">
        {/* Left Column: Headline, Bio, and CTAs */}
        <div className="space-y-6 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest text-blue-400 uppercase"
          >
            <Terminal className="h-4 w-4" />
            <span>{siteConfig.role} // {siteConfig.subRole}</span>
          </motion.div>

          {/* Large Typography Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-extrabold tracking-tight hero-title-main sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.95]"
          >
            SOFTWARE <br />
            <span className="hero-title-gradient text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              ENGINEER
            </span>
          </motion.h1>

          {/* Tagline Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl text-base font-normal leading-relaxed text-neutral-300 sm:text-lg md:text-xl"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Bio Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-lg text-sm font-normal leading-relaxed text-neutral-400"
          >
            {siteConfig.bio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Main Case Studies CTA */}
            <Magnetic strength={0.2}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorState('button', 'Explore')}
                onMouseLeave={resetCursorState}
                className="group relative flex items-center gap-2 rounded-full bg-slate-900 dark:bg-white px-7 py-3.5 text-sm font-semibold text-white keep-white dark:text-black transition-all hover:bg-blue-500 hover:text-white shadow-xl"
              >
                <span>Explore Case Studies</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>

            {/* Copy Email CTA */}
            <Magnetic strength={0.3}>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorState('button', copied ? 'Copied!' : 'Copy Email')}
                onMouseLeave={resetCursorState}
                className="flex items-center gap-2 rounded-full bg-white/5 px-6 py-3.5 text-sm font-medium text-neutral-200 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-md"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="font-mono text-xs text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-neutral-400" />
                    <span>{siteConfig.email}</span>
                  </>
                )}
              </button>
            </Magnetic>

            {/* Schedule 1:1 Intro */}
            {siteConfig.calendarUrl && (
              <Magnetic strength={0.3}>
                <a
                  href={siteConfig.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorState('link', 'Cal.com')}
                  onMouseLeave={resetCursorState}
                  className="flex items-center gap-2 rounded-full bg-white/5 px-6 py-3.5 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all backdrop-blur-md"
                >
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>Book Intro</span>
                </a>
              </Magnetic>
            )}
          </motion.div>
        </div>

        {/* Right Column: 3D Holographic Tilt Portrait Card */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          <HeroAvatar3D />
        </div>
      </div>

      {/* Bottom Scroll Indicator Pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono text-neutral-500"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>ENGINEERED WITH NEXT.JS 16 & THREE.JS</span>
        </div>
        <div className="flex items-center gap-1 text-neutral-400">
          <span>SCROLL TO DISCOVER</span>
          <span className="animate-bounce font-bold text-white">↓</span>
        </div>
      </motion.div>
    </section>
  );
}
