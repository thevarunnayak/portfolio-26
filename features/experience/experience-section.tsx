'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceItems } from '@/content/experience';
import { useCursor } from '@/features/cursor/cursor-context';
import { Briefcase, ChevronDown, Sparkles, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export function ExperienceSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [expandedId, setExpandedId] = useState<string>(experienceItems[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <section
      id="experience"
      className="relative w-full bg-noise px-6 py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Briefcase className="h-4 w-4" />
              <span>CAREER HISTORY & IMPACT</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              PROFESSIONAL <br />
              <span className="text-neutral-500">EXPERIENCE</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 md:text-right">
            Interactive breakdown of engineering roles, enterprise architectural achievements, and quantitative impact metrics.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="space-y-6">
          {experienceItems.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`glass-panel glass-panel-hover relative overflow-hidden rounded-3xl transition-all duration-300 ${
                  isExpanded ? 'border-blue-500/30 bg-neutral-900/90 shadow-2xl' : 'bg-neutral-900/40'
                }`}
              >
                {/* Header Section Container with Dynamic Background Banner */}
                <div className="relative overflow-hidden">
                  {/* Company Background Banner */}
                  {item.bannerImage && (
                    <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
                      <Image
                        src={item.bannerImage}
                        alt={`${item.company} Banner`}
                        fill
                        className="object-cover object-center filter grayscale brightness-125"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/90" />
                    </div>
                  )}

                  {/* Header Bar & Summary Content */}
                  <div className="relative z-10">
                    <div
                      onClick={() => toggleExpand(item.id)}
                      onMouseEnter={() => setCursorState('button', isExpanded ? 'Collapse' : 'Expand')}
                      onMouseLeave={resetCursorState}
                      className="flex flex-col cursor-pointer p-6 sm:p-8 md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 font-mono text-sm font-bold text-white border border-white/10 shadow-inner">
                          {item.logoText}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                              {item.company}
                            </h3>
                            {item.isCurrent && (
                              <span className="rounded-full bg-blue-500/10 px-3 py-0.5 font-mono text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                                CURRENT ROLE
                              </span>
                            )}
                            {item.award && (
                              <span className="flex items-center gap-1 rounded-full bg-amber-500/15 px-3 py-0.5 font-mono text-[10px] font-bold text-amber-400 border border-amber-500/30 shadow-sm">
                                <Sparkles className="h-3 w-3 text-amber-400" />
                                <span>{item.award}</span>
                              </span>
                            )}
                          </div>
                          <p className="font-mono text-sm text-neutral-400">{item.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 font-mono text-xs text-neutral-400">
                        <div className="flex flex-col items-start md:items-end gap-1">
                          <div className="flex items-center gap-1.5 text-neutral-300">
                            <Calendar className="h-3.5 w-3.5 text-blue-400" />
                            <span>{item.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-500">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}`}>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Summary teaser line */}
                    <div className="px-6 pb-6 sm:px-8 font-normal text-sm text-neutral-300">
                      {item.summary}
                    </div>
                  </div>
                </div>

                {/* Expandable Content Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/10 px-6 py-8 sm:px-8 space-y-8 bg-black/60 backdrop-blur-md relative z-10"
                    >
                      {/* Impact Metrics Grid */}
                      {item.impact && item.impact.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="flex items-center gap-2 font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                            KEY IMPACT METRICS
                          </h4>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {item.impact.map((metric, idx) => (
                              <div
                                key={idx}
                                className="rounded-2xl bg-white/5 p-4 border border-white/10 space-y-1"
                              >
                                <span className="font-mono text-3xl font-extrabold text-blue-400">
                                  {metric.metric}
                                </span>
                                <p className="font-bold text-xs text-white uppercase">{metric.label}</p>
                                <p className="text-xs text-neutral-400 leading-snug">{metric.detail}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Responsibilities list */}
                      <div className="space-y-3">
                        <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                          CORE RESPONSIBILITIES & ARCHITECTURE
                        </h4>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {item.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="space-y-3">
                        <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                          TECHNOLOGIES & TOOLING
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
