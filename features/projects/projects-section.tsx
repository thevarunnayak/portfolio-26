'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectsData } from '@/content/projects';
import { ProjectCaseStudy } from '@/types';
import { ProjectWindowModal } from './project-window-modal';
import { useCursor } from '@/features/cursor/cursor-context';
import { Layers, ArrowUpRight } from 'lucide-react';

export function ProjectsSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  // Show top 4 featured projects on home page
  const featuredProjects = projectsData.filter((project) => project.featured).slice(0, 4);

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
              <span>FEATURED CASE STUDIES & ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              ENGINEERED <br />
              <span className="text-neutral-500">PRODUCTS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 md:text-right">
            Click any product to launch its interactive desktop window view with system architecture flowcharts, metrics, and live source specs.
          </p>
        </div>

        {/* 4 Featured Desktop-Window Style Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
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
                  {project.title}
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Hero Image Banner Preview (Immersive Full-Bleed Cover) */}
              {project.heroImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-white/10 bg-neutral-950 flex items-center justify-center">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent opacity-80" />
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
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
                      className="flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-blue-600 px-3.5 py-1.5 text-xs font-mono text-neutral-300 hover:text-white border border-white/10 hover:border-blue-500 transition-all duration-300 shadow-sm shrink-0"
                    >
                      <span className="font-semibold text-[11px]">Visit Site</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                  <p className="text-sm font-normal text-neutral-300 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="tech-pill rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-neutral-400 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button to Full Projects Archive Route */}
        <div className="flex items-center justify-center pt-8 border-t border-white/5">
          <Link
            href="/projects"
            onMouseEnter={() => setCursorState('button', 'Archive')}
            onMouseLeave={resetCursorState}
            className="group flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-mono text-xs font-bold text-white! hover:bg-blue-500 shadow-xl shadow-blue-500/25 transition-all keep-white"
          >
            <Layers className="h-4 w-4 text-white!" />
            <span className="text-white!">EXPLORE OTHER PROJECTS</span>
            <ArrowUpRight className="h-4 w-4 text-white! transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
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
