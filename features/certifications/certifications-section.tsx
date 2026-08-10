'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationsData } from '@/content/certifications';
import { useCursor } from '@/features/cursor/cursor-context';
import { Award, ChevronDown, ExternalLink, Calendar, CheckCircle2, ShieldCheck, BookOpen, Sparkles, Layers } from 'lucide-react';

export function CertificationsSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [expandedCert, setExpandedCert] = useState<string>(certificationsData[0].id);

  const toggleExpand = (id: string) => {
    setExpandedCert(expandedCert === id ? '' : id);
  };

  return (
    <section
      id="certifications"
      className="relative w-full bg-noise px-6 py-14 md:py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Award className="h-4 w-4" />
              <span>VERIFIED CREDENTIALS & SPECIALIZATIONS</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              INDUSTRY <br />
              <span className="text-neutral-500">CERTIFICATIONS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 md:text-right">
            Professional specializations and certifications from Google, Scrimba, and IBM covering Artificial Intelligence, Advanced React Systems, and Enterprise SQL.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="space-y-6">
          {certificationsData.map((cert, index) => {
            const isExpanded = expandedCert === cert.id;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`glass-panel glass-panel-hover overflow-hidden rounded-3xl transition-all duration-300 ${
                  isExpanded ? 'border-blue-500/30 bg-neutral-900/90 shadow-2xl' : 'bg-neutral-900/40'
                }`}
              >
                {/* Header Bar Clickable */}
                <div
                  onClick={() => toggleExpand(cert.id)}
                  onMouseEnter={() => setCursorState('button', isExpanded ? 'Collapse' : 'Expand')}
                  onMouseLeave={resetCursorState}
                  className="flex flex-col cursor-pointer p-6 sm:p-8 md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 font-mono text-sm font-bold text-blue-400 border border-blue-500/20 shadow-inner">
                      <ShieldCheck className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                          {cert.title}
                        </h3>
                        <span className="rounded-full bg-white/5 px-3 py-0.5 font-mono text-[10px] font-semibold text-neutral-300 border border-white/10">
                          {cert.issuer}
                        </span>
                        <span className={`rounded-full px-3 py-0.5 font-mono text-[10px] font-bold border ${
                          cert.credentialType === 'Specialization'
                            ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {cert.credentialType.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-neutral-400">
                        CREDENTIAL ID: <span className="text-neutral-300 font-semibold">{cert.credentialId}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Calendar className="h-3.5 w-3.5 text-blue-400" />
                      <span>{cert.issueDate}</span>
                    </div>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => setCursorState('link', 'Verify')}
                      onMouseLeave={resetCursorState}
                      className="flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-blue-400 hover:bg-blue-500 hover:text-white border border-white/10 transition-all"
                    >
                      <span className='md:block hidden'>Verify Certificate</span>
                      <span className='md:hidden block'>Certificate</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="px-6 pb-6 sm:px-8 text-sm text-neutral-300 leading-relaxed">
                  {cert.summary}
                </div>

                {/* Expandable Breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/10 px-6 py-8 sm:px-8 space-y-8 bg-black/40"
                    >
                      {/* Section 1: Official Credly Badge Earned Block */}
                      {cert.badgeImage && (
                        <div className="rounded-2xl bg-white/5 p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-5">
                            <div className="relative h-28 w-28 shrink-0 drop-shadow-2xl transition-transform hover:scale-105">
                              <Image
                                src={cert.badgeImage}
                                alt={`${cert.title} Credly Badge`}
                                fill
                                unoptimized
                                className="object-contain"
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>OFFICIAL VERIFIED BADGE EARNED</span>
                              </div>
                              <h4 className="text-lg font-bold text-white">
                                {cert.title}
                              </h4>
                              <p className="text-xs text-neutral-400 font-mono">
                                Issued by {cert.issuer} • Verified via Credly Platform
                              </p>
                            </div>
                          </div>

                          {cert.credlyUrl && (
                            <a
                              href={cert.credlyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              onMouseEnter={() => setCursorState('link', 'Credly')}
                              onMouseLeave={resetCursorState}
                              className="shrink-0 flex items-center gap-2 rounded-xl bg-amber-500/10 px-5 py-2.5 font-mono text-xs font-bold text-amber-400 hover:bg-amber-500 hover:text-black border border-amber-500/20 transition-all shadow-md"
                            >
                              <span>Verify Badge on Credly</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Section 2: Course Certificates Completed (For Specializations) */}
                      {cert.coursesCompleted && cert.coursesCompleted.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-purple-400 uppercase tracking-wider">
                            <Layers className="h-4 w-4" />
                            <span>COURSE CERTIFICATES COMPLETED ({cert.coursesCompleted.length})</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {cert.coursesCompleted.map((course, cIdx) => (
                              <div
                                key={cIdx}
                                className="flex items-center gap-2.5 rounded-xl bg-white/5 p-3.5 border border-white/10 text-xs font-medium text-white"
                              >
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                <span>{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section 3: Core Competencies & Key Highlights */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider">
                          <BookOpen className="h-4 w-4" />
                          <span>CORE COMPETENCIES & KEY HIGHLIGHTS</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {cert.keyLearnings.map((learning, lIdx) => (
                            <div
                              key={lIdx}
                              className="rounded-2xl bg-white/5 p-4 border border-white/10 text-xs leading-relaxed text-neutral-300"
                            >
                              {learning}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Skills Gained */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          <Sparkles className="h-4 w-4" />
                          <span>SKILLS GAINED ({cert.skillsGained.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cert.skillsGained.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-xs text-neutral-200 border border-white/10 hover:border-blue-500/40 transition-all"
                            >
                              {skill}
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
