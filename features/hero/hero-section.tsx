'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { siteConfig } from '@/content/site';
import { Magnetic } from '@/components/motion/magnetic';
import { useCursor } from '@/features/cursor/cursor-context';
import { copyToClipboard } from '@/lib/utils';
import { HeroAvatar3D } from '@/components/canvas/hero-avatar-3d';
import { ArrowDownRight, ArrowDown, Copy, Check, MapPin, Sparkles, Terminal } from 'lucide-react';

const HeroParticles = dynamic(
  () => import('@/components/canvas/hero-particles').then((m) => m.HeroParticles),
  { ssr: false }
);

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
          initial={{ opacity: 0.9, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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
          initial={{ opacity: 0.9, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 font-mono text-xs text-neutral-400"
        >
          <MapPin className="h-3.5 w-3.5 text-blue-400" />
          <span>{siteConfig.location}</span>
          <span className="text-neutral-600">•</span>
          <span>{siteConfig.timezone}</span>
        </motion.div>
      </div>

      {/* Main Hero Grid Content */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 my-auto py-8">
        {/* Left Typography & Hero Message */}
        <div className="space-y-8 lg:col-span-7">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0.9, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>{siteConfig.subRole}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0.95, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl hero-title-main"
            >
              VARUN <br />
              <span className="hero-title-gradient">NAYAK.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0.9, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl text-lg font-light text-neutral-300 leading-relaxed sm:text-xl"
            >
              {siteConfig.tagline}
            </motion.p>
          </div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Magnetic>
              <a
                href="#projects"
                onMouseEnter={() => setCursorState('button', 'Projects')}
                onMouseLeave={resetCursorState}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-blue-600 px-7 py-3.5 font-mono text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 keep-white"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => setCursorState('button', copied ? 'Copied!' : 'Copy Email')}
              onMouseLeave={resetCursorState}
              className="group flex items-center gap-2 rounded-2xl bg-white/5 px-5 py-3.5 font-mono text-xs font-semibold text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                  <span>{siteConfig.email}</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Right 3D Interactive Cybernetic Avatar Card (Statically imported for instant SSG rendering) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <HeroAvatar3D />
        </div>
      </div>

      {/* Bottom Terminal Scroll Teaser Bar */}
      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-neutral-400"
      >
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span>PORTFOLIO_SYSTEM // ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-neutral-200">
          <span>SCROLL TO DISCOVER</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4 text-blue-400 stroke-[2.5]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
