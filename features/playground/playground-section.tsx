'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { playgroundData } from '@/content/playground';
import { articlesData } from '@/content/articles';
import { useCursor } from '@/features/cursor/cursor-context';
import { useSmoothScroll } from '@/components/providers/smooth-scroll-provider';
import {
  FlaskConical,
  Code2,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  Clock,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export function PlaygroundSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const { lenis } = useSmoothScroll();
  const [activeTab, setActiveTab] = useState<'demos' | 'articles'>('demos');

  useEffect(() => {
    const scrollToPlayground = () => {
      const scrollTarget = typeof window !== 'undefined' ? sessionStorage.getItem('scrollToSection') : null;
      const hash = typeof window !== 'undefined' ? window.location.hash : '';

      if (scrollTarget === 'playground' || hash === '#playground') {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('scrollToSection');
        }
        const el = document.getElementById('playground');
        if (el) {
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(el, { offset: -40, duration: 1.2 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }
    };

    scrollToPlayground();
  }, [lenis]);

  return (
    <section
      id="playground"
      className="relative w-full bg-noise px-6 py-14 md:py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <FlaskConical className="h-4 w-4" />
              <span>EXPERIMENTS, SYNTHESIZERS & ARTICLES</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              INTERACTIVE <br />
              <span className="text-neutral-500">PLAYGROUND</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 md:text-right">
            Standalone WebGL shader labs, real-time data stream simulators, motion spring visualizers, and deep architectural case studies.
          </p>
        </div>

        {/* Tab Selector Navigation Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('demos')}
              onMouseEnter={() => setCursorState('button', 'Demos')}
              onMouseLeave={resetCursorState}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-semibold transition-all ${
                activeTab === 'demos'
                  ? 'bg-blue-600 text-white! shadow-lg shadow-blue-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
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
                  ? 'bg-blue-600 text-white! shadow-lg shadow-blue-500/20'
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

        {/* TAB 1: INTERACTIVE DEMOS & LABS (SNAPSHOT BANNER + DIRECT ROUTE) */}
        {activeTab === 'demos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {playgroundData.map((exp, index) => {
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="glass-panel glass-panel-hover overflow-hidden rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex md:items-center justify-between font-mono text-xs flex-col md:flex-row gap-2 items-start">
                      <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-400 border border-blue-500/30">
                        {exp.category}
                      </span>

                      {/* Quick External Link */}
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
                            <span>Live App</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <Link href={`/playground/${exp.id}`} className="block group space-y-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </Link>
                  </div>

                  {/* Clean SVG Snapshot Banner Image with Hover Link */}
                  {exp.previewImage && (
                    <Link
                      href={`/playground/${exp.id}`}
                      onMouseEnter={() => setCursorState('button', 'Open Lab')}
                      onMouseLeave={resetCursorState}
                      className="relative h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-inner group cursor-pointer block"
                    >
                      <img
                        src={exp.previewImage}
                        alt={exp.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="flex items-center gap-2 rounded-full bg-blue-600/90 backdrop-blur-md px-3.5 py-1.5 font-mono text-xs font-bold text-white! border border-blue-400/30 shadow-lg">
                          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                          <span>LAUNCH INTERACTIVE LAB</span>
                        </span>
                        <span className="rounded-full bg-white/10 p-2 text-white group-hover:bg-blue-600 transition-colors">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  )}

                  {/* Tech stack tags & direct launcher button */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs text-neutral-400 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/playground/${exp.id}`}
                      onMouseEnter={() => setCursorState('button', 'Inspect Spec')}
                      onMouseLeave={resetCursorState}
                      className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-3 font-mono text-xs font-bold text-neutral-200 hover:bg-blue-600 hover:text-white border border-white/10 transition-all shadow-md active:scale-98 group"
                    >
                      <Code2 className="h-4 w-4 text-blue-400 group-hover:text-white" />
                      <span>Inspect Lab Spec & Launch Canvas</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* TAB 2: ARTICLES & CASE STUDIES */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articlesData.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover overflow-hidden rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-purple-400 border border-purple-500/30">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-neutral-400">
                      <Clock className="h-3.5 w-3.5 text-blue-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/articles/${article.id}`} className="block group space-y-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {article.summary}
                    </p>
                  </Link>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs text-neutral-400 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/articles/${article.id}`}
                    onMouseEnter={() => setCursorState('button', 'Read Article')}
                    onMouseLeave={resetCursorState}
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-500/10 py-3 font-mono text-xs font-bold text-purple-400 hover:bg-purple-600 hover:text-white border border-purple-500/20 transition-all shadow-md active:scale-98 group"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
