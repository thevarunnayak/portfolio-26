'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/content/projects';
import { ProjectCaseStudy } from '@/types';
import { ProjectWindowModal } from './project-window-modal';
import { useCursor } from '@/features/cursor/cursor-context';
import { Layers, ArrowUpRight, Monitor, Cpu, Sparkles, Terminal } from 'lucide-react';

export function ProjectsSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Mobile & Cross-Platform', 'Productivity', 'Real-Time', 'Full-Stack', 'Healthcare'];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative w-full bg-noise px-6 py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Layers className="h-4 w-4" />
              <span>FEATURED CASE STUDIES</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              ENGINEERED <br />
              <span className="text-neutral-500">PRODUCTS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400">
            Click any product to launch its full desktop window case study view with architecture flowcharts, source code specs, and live performance benchmarks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-500 text-white keep-white font-semibold shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Desktop-Window Style Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setCursorState('window', 'Open App')}
              onMouseLeave={resetCursorState}
              className="group cursor-pointer glass-panel glass-panel-hover overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 flex flex-col justify-between"
            >
              {/* Window Bar Visual Top */}
              <div className="flex items-center justify-between px-6 py-3 bg-black/60 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-neutral-400 group-hover:text-blue-400 transition-colors">
                  {project.title}.app
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all text-neutral-400">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm font-normal text-neutral-300 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Key Metric Highlights */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="rounded-xl bg-black/40 p-4 border border-white/5 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase">{project.metrics[0].label}</span>
                      <span className="text-blue-400 font-bold text-base">{project.metrics[0].value}</span>
                    </div>
                    <span className="text-neutral-500 text-[11px] text-right max-w-[150px] truncate">
                      {project.metrics[0].description}
                    </span>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-neutral-400 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Window Modal */}
      <ProjectWindowModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
