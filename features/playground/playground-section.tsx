'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playgroundData } from '@/content/playground';
import { playgroundDetails, PlaygroundDetail } from '@/content/playground-prompts';
import { PlaygroundCanvas } from './playground-canvas';
import { useCursor } from '@/features/cursor/cursor-context';
import { GithubIcon } from '@/components/ui/icons';
import { FlaskConical, X, Layers, Cpu, Code2, ArrowUpRight, ExternalLink } from 'lucide-react';

export function PlaygroundSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [selectedDetail, setSelectedDetail] = useState<PlaygroundDetail | null>(null);

  return (
    <section
      id="playground"
      className="relative w-full bg-noise px-6 py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <FlaskConical className="h-4 w-4" />
              <span>SOFTWARE ENGINEERING TOOLING LABS</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              CREATIVE <br />
              <span className="text-neutral-500">PLAYGROUND</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400">
            Interactive laboratories featuring core software engineering libraries (Three.js WebGL, Framer Motion, RxJS Streams, Web Audio API). Click inspect to view live demos and source code.
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {playgroundData.map((exp, index) => {
            const detailItem = playgroundDetails.find((p) => p.id === exp.id);

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover overflow-hidden rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-400 border border-blue-500/30">
                      {exp.category}
                    </span>

                    {/* Quick Live & Source Links */}
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
                      {exp.githubLink && (
                        <a
                          href={exp.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorState('link', 'GitHub')}
                          onMouseLeave={resetCursorState}
                          className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors font-mono"
                        >
                          <span>GitHub</span>
                          <GithubIcon className="h-3.5 w-3.5" />
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
      </div>

      {/* Architecture & Engineering Inspection Modal */}
      <AnimatePresence>
        {selectedDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-white/15"
            >
              {/* Modal Header */}
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
                  className="rounded-full bg-white/10 p-2 text-neutral-400 hover:bg-white/20 hover:text-white transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Action Buttons: Live Demo & GitHub Repo */}
              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href={selectedDetail.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-xs font-semibold text-white keep-white hover:bg-blue-600 transition-all shadow-lg"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={selectedDetail.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/20 border border-white/15 transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>

              {/* Core Library Purpose */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-teal-400 uppercase">
                  <Cpu className="h-4 w-4" />
                  <span>LIBRARY USED & TECHNICAL PURPOSE</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {selectedDetail.libraryUsed}
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedDetail.developerPurpose}
                </p>
              </div>

              {/* Architectural Insights */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase">
                  <Layers className="h-4 w-4" />
                  <span>KEY ARCHITECTURAL INSIGHTS</span>
                </div>
                <ul className="space-y-2 text-sm text-neutral-300 list-disc list-inside">
                  {selectedDetail.architectureInsights.map((insight, i) => (
                    <li key={i}>{insight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
