'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { playgroundData } from '@/content/playground';
import { playgroundDetails, PlaygroundDetail } from '@/content/playground-prompts';
import { articlesData } from '@/content/articles';
import { PlaygroundCanvas } from './playground-canvas';
import { useCursor } from '@/features/cursor/cursor-context';
import {
  FlaskConical,
  X,
  Code2,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  Sparkles,
  Clock,
  ChevronRight,
  ImageIcon
} from 'lucide-react';

export function PlaygroundSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [activeTab, setActiveTab] = useState<'demos' | 'articles'>('demos');
  const [selectedDetail, setSelectedDetail] = useState<PlaygroundDetail | null>(null);

  // Prevent background page scroll when inspection modal is open
  useEffect(() => {
    if (selectedDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDetail]);

  return (
    <section
      id="playground"
      className="relative w-full bg-noise px-6 py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <FlaskConical className="h-4 w-4" />
              <span>SOFTWARE ENGINEERING & RESEARCH LABS</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              CREATIVE <br />
              <span className="text-neutral-500">PLAYGROUND</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 md:text-right">
            Interactive laboratories featuring WebGL 3D, Motion physics, RxJS streams, and deep-dive engineering case studies & executive blueprints.
          </p>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-2xl bg-white/5 p-1.5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('demos')}
              onMouseEnter={() => setCursorState('button', 'Demos')}
              onMouseLeave={resetCursorState}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'demos'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FlaskConical className="h-3.5 w-3.5" />
              <span>INTERACTIVE DEMOS & LABS</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                {playgroundData.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              onMouseEnter={() => setCursorState('button', 'Articles')}
              onMouseLeave={resetCursorState}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'articles'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>R&D CASE STUDIES & ARTICLES</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                {articlesData.length}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE DEMOS & LABS */}
        {activeTab === 'demos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {playgroundData.map((exp, index) => {
              const detailItem = playgroundDetails.find((p) => p.id === exp.id);

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="glass-panel glass-panel-hover overflow-hidden rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-400 border border-blue-500/30">
                        {exp.category}
                      </span>

                      {/* Quick Live Link */}
                      <div className="flex items-center gap-3">
                        {exp.liveDemoUrl && (
                          <a
                            href={exp.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorState('link', 'Live')}
                            onMouseLeave={resetCursorState}
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-mono"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {exp.title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Live Interactive Canvas Demo */}
                  <PlaygroundCanvas demoId={exp.interactiveDemoId} />

                  {/* Footer Controls & Tech Tags */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-neutral-400 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {detailItem && (
                      <button
                        onClick={() => setSelectedDetail(detailItem)}
                        onMouseEnter={() => setCursorState('button', 'Inspect')}
                        onMouseLeave={resetCursorState}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
                      >
                        <Code2 className="h-3.5 w-3.5 text-blue-400" />
                        <span>Inspect Architecture & Details</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* TAB 2: R&D CASE STUDIES & ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-8">
            {articlesData.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-panel glass-panel-hover overflow-hidden rounded-3xl p-6 sm:p-10 space-y-6 border border-white/15"
              >
                {/* Article Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-white/10 pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-400 border border-blue-500/30 font-semibold">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <Clock className="h-3.5 w-3.5 text-blue-400" />
                      <span>{article.readTime}</span>
                    </span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-neutral-400">{article.date}</span>
                  </div>

                  <span className="text-neutral-400 font-medium">
                    By {article.author}
                  </span>
                </div>

                {/* Optional Cover Image Banner */}
                {article.coverImage && (
                  <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 group">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-neutral-300">
                      <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-white/10">
                        <ImageIcon className="h-3.5 w-3.5 text-blue-400" />
                        <span>SDV Cockpit Vision Blueprint</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-base font-medium text-blue-300">
                    {article.subtitle}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Key Architecture Pillars Highlights */}
                <div className="rounded-2xl bg-white/5 p-4 sm:p-5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 uppercase">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>KEY ARCHITECTURE PILLARS ANALYZED</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {article.keyPillars.map((pillar, pIdx) => (
                      <li
                        key={pIdx}
                        className="rounded-xl bg-black/40 p-3.5 text-xs text-neutral-300 border border-white/10 leading-relaxed"
                      >
                        {pillar}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keywords & Reader Action (Next.js Link to dedicated route) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.slice(0, 4).map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-neutral-400 border border-white/10"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/articles/${article.id}`}
                    onMouseEnter={() => setCursorState('button', 'Read Article')}
                    onMouseLeave={resetCursorState}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-mono text-xs font-bold text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Read Executive Case Study</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* DEMO ARCHITECTURE INSPECTION MODAL */}
      <AnimatePresence>
        {selectedDetail && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 flex justify-center items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl my-auto glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-white/20"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="font-mono text-xs text-blue-400 uppercase tracking-wider">
                    {selectedDetail.category} // ENGINEERING LAB SPEC
                  </div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {selectedDetail.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDetail(null)}
                  className="rounded-full bg-white/10 p-2 text-neutral-400 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  TECHNICAL HIGHLIGHTS & ARCHITECTURE
                </h4>
                <ul className="space-y-2">
                  {selectedDetail.architectureInsights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-neutral-300"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedDetail.developerPurpose && (
                <div className="space-y-3 rounded-2xl bg-black/40 p-4 border border-white/10">
                  <div className="font-mono text-xs font-semibold text-blue-400">
                    LIBRARY: {selectedDetail.libraryUsed}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedDetail.developerPurpose}
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedDetail(null)}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-mono font-bold text-white hover:bg-blue-500 transition-colors"
                >
                  Close Laboratory Spec
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
