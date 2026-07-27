'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationsData } from '@/content/certifications';
import { useCursor } from '@/features/cursor/cursor-context';
import { Award, ExternalLink, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';

export function CertificationsSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [expandedCert, setExpandedCert] = useState<string>(certificationsData[0].id);

  const toggleCert = (id: string) => {
    setExpandedCert(expandedCert === id ? '' : id);
  };

  return (
    <section
      id="certifications"
      className="relative w-full bg-noise px-6 py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Award className="h-4 w-4" />
              <span>VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              INDUSTRY <br />
              <span className="text-neutral-500">CERTIFICATIONS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400">
            Professional certifications from Google, Meta, and IBM covering Artificial Intelligence, Advanced React Systems, and Enterprise SQL.
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
                {/* Header Header */}
                <div
                  onClick={() => toggleCert(cert.id)}
                  onMouseEnter={() => setCursorState('button', isExpanded ? 'Close Modules' : 'View Modules')}
                  onMouseLeave={resetCursorState}
                  className="flex flex-col cursor-pointer p-6 sm:p-8 md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 font-mono text-sm font-bold text-blue-400 border border-blue-500/20">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
                        <span className="text-blue-400 font-semibold">{cert.issuer}</span>
                        <span>•</span>
                        <span>Issued {cert.issueDate}</span>
                        {cert.credentialId && (
                          <>
                            <span>•</span>
                            <span className="text-neutral-500">ID: {cert.credentialId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 font-mono text-xs">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => setCursorState('link', 'Verify')}
                      onMouseLeave={resetCursorState}
                      className="flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-blue-400 hover:bg-blue-500 hover:text-white border border-white/10 transition-all"
                    >
                      <span>Verify License</span>
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

                {/* Expandable Module Breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/10 px-6 py-8 sm:px-8 space-y-6 bg-black/40"
                    >
                      <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        COMPLETED MODULES & DOMAIN COMPETENCIES
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cert.modules.map((mod, idx) => (
                          <div key={idx} className="rounded-2xl bg-white/5 p-5 border border-white/10 space-y-3">
                            <h5 className="font-bold text-sm text-white flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 font-mono text-[10px] text-blue-400 font-bold">
                                {idx + 1}
                              </span>
                              {mod.name}
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                              {mod.skillsLearned.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="rounded-md bg-black/60 px-2.5 py-1 font-mono text-[11px] text-neutral-300 border border-white/5"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
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
