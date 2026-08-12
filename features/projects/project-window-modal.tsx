'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCaseStudy } from '@/types';
import { useCursor } from '@/features/cursor/cursor-context';
import { GithubIcon } from '@/components/ui/icons';
import { X, Maximize2, ExternalLink, Code2 } from 'lucide-react';
import { useSmoothScroll } from '@/components/providers/smooth-scroll-provider';
import { ProjectGalleryGrid } from '@/components/ui/project-gallery-grid';

interface ProjectWindowModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export function ProjectWindowModal({ project, onClose }: ProjectWindowModalProps) {
  const { setCursorState, resetCursorState } = useCursor();
  const { lenis } = useSmoothScroll();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features' | 'metrics'>('overview');

  // Lock main body scroll & pause Lenis when modal is open & listen for ESC key
  React.useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, lenis, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className={`flex flex-col w-full bg-neutral-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'h-full max-w-full' : 'max-w-5xl h-[88vh]'
          }`}
        >
          {/* macOS Desktop Window Title Bar */}
          <div
            onMouseEnter={() => setCursorState('window', project.title)}
            onMouseLeave={resetCursorState}
            className="flex items-center justify-between px-6 py-4 bg-neutral-950/80 border-b border-white/10 select-none shrink-0"
          >
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="h-3.5 w-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
                aria-label="Close project modal"
              >
                <X className="h-2.5 w-2.5 text-black opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-3.5 w-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                aria-label="Minimize project modal"
              />
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-3.5 w-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors flex items-center justify-center group focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
                aria-label="Toggle fullscreen view"
              >
                <Maximize2 className="h-2.5 w-2.5 text-black opacity-0 group-hover:opacity-100" />
              </button>
            </div>

            {/* Window Title & Tag */}
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
              <span id="project-modal-title" className="text-blue-400 font-bold">{project.title}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">{project.category}</span>
            </div>

            {/* Quick External Actions */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono text-blue-400 hover:underline"
                  aria-label={`Visit live site for ${project.title}`}
                >
                  <span>Live App</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Window Sub-Navigation Tabs */}
          <div
            role="tablist"
            aria-label="Project case study sections"
            className="flex items-center gap-4 px-6 py-3 bg-black/40 border-b border-white/10 font-mono text-xs shrink-0 overflow-x-auto"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              01 // Overview
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'architecture'}
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'architecture' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              02 // Architecture Diagram
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'features'}
              onClick={() => setActiveTab('features')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'features' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              03 // Key Features & Code
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'metrics' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              04 // Metrics & Lessons
            </button>
          </div>

          {/* Scrollable Desktop Window Body Content - data-lenis-prevent enables independent inner scrolling */}
          <div
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-10 focus:outline-none"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Hero Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-neutral-950 border border-white/10">
                  {project.heroImage && (
                    <div className="relative w-full aspect-[16/9] max-h-80 overflow-hidden bg-neutral-950">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 via-40% to-transparent" />
                    </div>
                  )}
                  <div className={`p-6 sm:p-8 space-y-3 ${project.heroImage ? 'relative z-10 -mt-28 sm:-mt-32 pt-12 bg-gradient-to-b from-transparent via-neutral-950/90 to-neutral-950' : 'bg-neutral-950'}`}>
                    <h1 className="text-3xl font-extrabold text-white keep-white sm:text-4xl tracking-tight">
                      {project.title}
                    </h1>
                    <p className="text-base sm:text-lg text-neutral-200 keep-white max-w-2xl font-light leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Problem vs Solution Split Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 rounded-2xl space-y-3 border-red-500/20">
                    <h3 className="font-mono text-xs font-semibold text-red-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      THE PROBLEM
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="glass-panel p-6 rounded-2xl space-y-3 border-emerald-500/20">
                    <h3 className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      THE ENGINEERED SOLUTION
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Multi-Image Gallery Showcase */}
                {((project.galleryImages && project.galleryImages.length > 0) || (project.columnGroups && project.columnGroups.length > 0)) && (
                  <div className="space-y-4 pt-2">
                    <ProjectGalleryGrid
                      images={project.galleryImages}
                      columnGroups={project.columnGroups}
                      fullWidthImages={project.fullWidthImages}
                      columns={project.galleryColumns || 2}
                      title="SYSTEM SCREENSHOTS & INTERFACE GALLERY"
                    />
                  </div>
                )}

                {/* Detailed Overview Paragraph */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    SYSTEM OVERVIEW
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    TECHNOLOGY STACK
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="tech-pill rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-neutral-200 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">System Architecture & Data Flow</h3>
                  <p className="text-sm text-neutral-400 font-mono">{project.architecture.summary}</p>
                </div>

                {/* Interactive Flowchart Diagram Nodes */}
                <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {project.architecture.nodes.map((node) => (
                      <div
                        key={node.id}
                        className="rounded-xl bg-black/60 p-4 border border-blue-500/30 space-y-2 text-center relative"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400">
                          [{node.type}]
                        </span>
                        <p className="font-bold text-sm text-white">{node.label}</p>
                        <p className="font-mono text-xs text-neutral-400">{node.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Flow Steps List */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase">DATA EXECUTION SEQUENCE</h4>
                    <div className="space-y-2">
                      {project.architecture.dataFlow.map((flowStep, idx) => (
                        <div key={idx} className="flex items-center gap-3 font-mono text-xs text-neutral-300">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{flowStep}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8 animate-fadeIn">
                <h3 className="text-2xl font-bold text-white">Core Engineering Features</h3>
                <div className="space-y-6">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-2xl space-y-4">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-blue-400" />
                        <h4 className="font-bold text-lg text-white">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-neutral-300 leading-relaxed">{feature.description}</p>
                      {feature.codeSnippet && (
                        <div className="rounded-xl bg-black/80 p-4 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto">
                          <pre>{feature.codeSnippet}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-8 animate-fadeIn">
                <h3 className="text-2xl font-bold text-white">Performance Metrics & Lessons</h3>
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-2xl space-y-2 text-center">
                      <span className="font-mono text-4xl font-extrabold text-blue-400">{metric.value}</span>
                      <p className="font-bold text-xs text-white uppercase">{metric.label}</p>
                      <p className="text-xs text-neutral-400">{metric.description}</p>
                    </div>
                  ))}
                </div>

                {/* Challenges & Lessons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="glass-panel p-6 rounded-2xl space-y-3">
                    <h4 className="font-mono text-xs font-semibold text-amber-400 uppercase">ENGINEERING CHALLENGES</h4>
                    <ul className="space-y-2">
                      {project.challenges.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-panel p-6 rounded-2xl space-y-3">
                    <h4 className="font-mono text-xs font-semibold text-teal-400 uppercase">KEY TAKEAWAYS</h4>
                    <ul className="space-y-2">
                      {project.lessons.map((l, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <span className="text-teal-400 font-bold">•</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
