'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '@/content/skills';
import { TechSkill } from '@/types';
import { useCursor } from '@/features/cursor/cursor-context';
import {
  Cpu,
  Atom,
  Layers,
  Code2,
  ShieldCheck,
  Box,
  Sparkles,
  Palette,
  Database,
  Users,
  Server,
  LayoutGrid,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

function getSkillIcon(iconName: string, className = "h-4 w-4") {
  switch (iconName) {
    case 'Atom':
      return <Atom className={`${className} text-cyan-400`} />;
    case 'Smartphone':
      return <Smartphone className={`${className} text-sky-400`} />;
    case 'Layers':
      return <Layers className={`${className} text-blue-400`} />;
    case 'Code2':
      return <Code2 className={`${className} text-blue-500`} />;
    case 'ShieldCheck':
      return <ShieldCheck className={`${className} text-red-400`} />;
    case 'Box':
      return <Box className={`${className} text-amber-400`} />;
    case 'Sparkles':
      return <Sparkles className={`${className} text-purple-400`} />;
    case 'Palette':
      return <Palette className={`${className} text-teal-400`} />;
    case 'Database':
      return <Database className={`${className} text-emerald-400`} />;
    case 'Cpu':
      return <Cpu className={`${className} text-emerald-500`} />;
    case 'Users':
      return <Users className={`${className} text-orange-400`} />;
    case 'Server':
      return <Server className={`${className} text-indigo-400`} />;
    case 'LayoutGrid':
      return <LayoutGrid className={`${className} text-pink-400`} />;
    default:
      return <Code2 className={`${className} text-blue-400`} />;
  }
}

export function SkillsSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [selectedSkill, setSelectedSkill] = useState<TechSkill>(skillsData[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frameworks & Mobile', 'Frontend Core', 'Backend & Cloud', 'Graphics & Physics', 'Design & Architecture'];

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full bg-noise px-6 py-14 md:py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl space-y-10 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <Cpu className="h-4 w-4" />
              <span>TECHNICAL MATRIX & ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight section-title-main sm:text-5xl lg:text-6xl uppercase">
              ENGINEERING <br />
              <span className="text-neutral-500">CAPABILITIES</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 md:text-right">
            No superficial percentages or arbitrary progress bars. Hover any technology node to inspect experience depth, project deployments, and architectural capabilities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-blue-500 text-white keep-white font-semibold shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid: Interactive Cloud Matrix + Live Inspector Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Skill Cloud Matrix (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredSkills.map((skill, idx) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => {
                    setSelectedSkill(skill);
                    setCursorState('button', skill.name);
                  }}
                  onMouseLeave={resetCursorState}
                  className={`glass-panel p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between h-28 border ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/15 shadow-xl shadow-blue-500/10 scale-[1.02]'
                      : 'border-white/10 bg-neutral-900/50 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[10px] uppercase text-neutral-500">
                      {skill.proficiency}
                    </span>
                    <span className="font-mono text-xs font-bold text-blue-400">
                      {skill.experienceYears}y
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-white leading-tight flex items-center gap-2">
                      {getSkillIcon(skill.iconName, "h-4 w-4 shrink-0")}
                      <span className="truncate">{skill.name}</span>
                    </h3>
                    <p className="font-mono text-[10px] text-neutral-400 truncate">
                      {skill.category}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Live Skill Inspector Panel (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-neutral-900/90 shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-inner">
                      {getSkillIcon(selectedSkill.iconName, "h-5 w-5")}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider">
                        [{selectedSkill.category}]
                      </span>
                      <h3 className="text-lg md:text-2xl font-extrabold text-white mt-0.5">
                        {selectedSkill.name}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-2xl font-extrabold text-white">{selectedSkill.experienceYears}</span>
                    <span className="text-xs text-neutral-400 block">YEARS EXP</span>
                  </div>
                </div>

                {/* Description Context */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase">ARCHITECTURAL CONTEXT</h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>

                {/* Featured Deployments */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase">FEATURED IN PROJECTS</h4>
                  <div className="space-y-2">
                    {selectedSkill.featuredIn.map((proj, idx) => (
                      <div key={idx} className="flex items-center gap-2 font-mono text-xs text-neutral-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mastery Level Badge */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10 font-mono text-xs text-neutral-400">
                  <span>MASTERY LEVEL</span>
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-blue-400 font-bold border border-blue-500/30">
                    {selectedSkill.proficiency}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
