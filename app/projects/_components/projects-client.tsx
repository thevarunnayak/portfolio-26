'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { projectsData } from '@/content/projects';
import { ProjectCaseStudy } from '@/types';
import { ProjectsNavHeader } from '../projects-nav-header';
import { ProjectWindowModal } from '@/features/projects/project-window-modal';
import { useCursor } from '@/features/cursor/cursor-context';
import { Layers, ArrowUpRight, Search, Filter } from 'lucide-react';

export function ProjectsArchiveClient() {
  const { setCursorState, resetCursorState } = useCursor();
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-blue-500 selection:text-white pb-24">
      {/* Sticky Top Header */}
      <ProjectsNavHeader totalCount={projectsData.length} />

      {/* Main Content Container */}
      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16 space-y-12">
        {/* Header Title & Intro */}
        <header className="space-y-4 pb-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
            <Layers className="h-4 w-4" />
            <span>FULL ENGINEERED PRODUCT ARCHIVE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase">
            ENGINEERED <span className="text-neutral-500">PRODUCTS</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Complete portfolio of production web apps, mobile systems, hardware-accelerated WebGL labs, and real-time streaming tools. Every new product engineered is automatically cataloged here.
          </p>
        </header>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-start gap-2 font-mono text-xs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                onMouseEnter={() => setCursorState('button', category)}
                onMouseLeave={resetCursorState}
                className={`rounded-full px-4 py-2 transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search tech, title, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-[var(--card-bg)] pl-10 pr-4 py-2.5 font-mono text-xs text-[var(--text-primary)] border border-[var(--border-subtle)] focus:border-blue-500 focus:outline-none transition-all placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>

        {/* Projects Count Indicator */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
          <span>SHOWING {filteredProjects.length} OF {projectsData.length} ENGINEERED PRODUCTS</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE AUTOMATIC CATALOG
          </span>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setCursorState('window', 'Open App')}
              onMouseLeave={resetCursorState}
              className="group cursor-pointer glass-panel glass-panel-hover overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--card-bg)] flex flex-col justify-between transition-all duration-300"
            >
              {/* Desktop Window Visual Bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-black/40 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-[var(--text-secondary)] group-hover:text-blue-400 transition-colors">
                  {project.title}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                  {project.category}
                </span>
              </div>

              {/* Hero Image Preview Banner */}
              {project.heroImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-[var(--border-subtle)] bg-neutral-950 flex items-center justify-center">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent opacity-80" />
                </div>
              )}

              {/* Card Body Content */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h2>
                    <a
                      href={project.liveUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!project.liveUrl) {
                          e.preventDefault();
                          setSelectedProject(project);
                        }
                      }}
                      onMouseEnter={() => setCursorState('button', 'Visit Site')}
                      onMouseLeave={resetCursorState}
                      className="flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-blue-600 px-3.5 py-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-white border border-[var(--border-subtle)] hover:border-blue-500 transition-all duration-300 shadow-sm shrink-0"
                    >
                      <span className="font-semibold text-[11px]">Visit Site</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-subtle)] space-y-3">
            <Filter className="h-8 w-8 text-[var(--text-muted)] mx-auto" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">No Matching Projects Found</h3>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Try adjusting your search filter or selecting &quot;All&quot; categories.
            </p>
          </div>
        )}
      </main>

      {/* Desktop Window Case Study Modal */}
      <ProjectWindowModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
