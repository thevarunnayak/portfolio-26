'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/features/cursor/cursor-context';
import { siteConfig } from '@/content/site';
import { FileText, Download, CheckCircle2, Eye, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export function ResumeSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [activeView, setActiveView] = useState<'preview' | 'ats'>('preview');

  return (
    <section
      id="resume"
      className="relative w-full bg-noise px-6 py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <FileText className="h-4 w-4" />
              <span>CURRICULUM VITAE & SPECIFICATIONS</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              RESUME & <br />
              <span className="text-neutral-500">QUALIFICATIONS</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Varun_Nayak_Staff_Frontend_Engineer_Resume.pdf"
              onMouseEnter={() => setCursorState('button', 'Download PDF')}
              onMouseLeave={resetCursorState}
              className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white keep-white hover:bg-blue-600 shadow-xl transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download ATS Resume PDF</span>
            </a>
          </div>
        </div>

        {/* View Selector Tabs */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <button
            onClick={() => setActiveView('preview')}
            className={`px-4 py-2 rounded-full transition-all ${
              activeView === 'preview'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            PDF Document Preview
          </button>
          <button
            onClick={() => setActiveView('ats')}
            className={`px-4 py-2 rounded-full transition-all ${
              activeView === 'ats'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ATS Score Audit & Breakdown
          </button>
        </div>

        {/* Resume Content Container */}
        {activeView === 'preview' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 bg-neutral-900/60 space-y-8"
          >
            {/* Embedded Visual Resume Reader */}
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>ATS OPTIMIZED VECTOR FORMAT // VARUN NAYAK RESUME 2026</span>
              </div>
              <span className="text-neutral-500">PAGE 1 OF 1</span>
            </div>

            {/* Resume Content Mock Body */}
            <div className="space-y-8 max-w-4xl mx-auto text-neutral-200">
              {/* Header */}
              <div className="space-y-2 border-b border-white/10 pb-6">
                <h1 className="text-3xl font-extrabold text-white">{siteConfig.name}</h1>
                <p className="font-mono text-sm text-blue-400">{siteConfig.role} — {siteConfig.subRole}</p>
                <p className="font-mono text-xs text-neutral-400">
                  {siteConfig.location} | {siteConfig.email} | github.com/thevarunnayak | linkedin.com/in/varunnayak
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  EXECUTIVE SUMMARY
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {siteConfig.bio} Over 5+ years driving enterprise web platforms, custom WebGL canvas architectures, and cross-platform design system libraries.
                </p>
              </div>

              {/* Experience Highlights */}
              <div className="space-y-4">
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Robosoft Technologies — Software Engineer</span>
                      <span className="font-mono text-xs text-neutral-400">July 2025 – Present</span>
                    </div>
                    <p className="text-xs text-neutral-400">BSI Connect & Connect Assistant | Angular, Kendo UI, React Native, Design Systems</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Associate Software Engineer — UTI Mutual Funds, Room To Read, TBN</span>
                      <span className="font-mono text-xs text-neutral-400">Prior Roles</span>
                    </div>
                    <p className="text-xs text-neutral-400">Next.js, React, Angular, WCAG 2.1 AA Accessibility</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>IISc Bangalore — Speech Recognition Intern</span>
                      <span className="font-mono text-xs text-neutral-400">Internship</span>
                    </div>
                    <p className="text-xs text-neutral-400">React, Web Audio API, WebSockets, ASR Neural Model Tooling</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-panel p-6 rounded-2xl space-y-2 text-center">
              <span className="font-mono text-5xl font-extrabold text-emerald-400">100/100</span>
              <p className="font-bold text-xs text-white uppercase">ATS PARSING SCORE</p>
              <p className="text-xs text-neutral-400">Standard single-column layout, zero table clutter, high keyword density.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl space-y-2 text-center">
              <span className="font-mono text-5xl font-extrabold text-blue-400">100%</span>
              <p className="font-bold text-xs text-white uppercase">KEYWORD ALIGNMENT</p>
              <p className="text-xs text-neutral-400">Matches modern Software Engineer requirements (Angular, React, Next.js).</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl space-y-2 text-center">
              <span className="font-mono text-5xl font-extrabold text-teal-400">WCAG AA</span>
              <p className="font-bold text-xs text-white uppercase">ACCESSIBILITY COMPLIANT</p>
              <p className="text-xs text-neutral-400">Formatted for screen readers and high-contrast accessibility tools.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
