'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/features/cursor/cursor-context';
import { siteConfig } from '@/content/site';
import { FileText, Download, ShieldCheck, Sparkles } from 'lucide-react';

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
              href="/Varun_Resume.pdf"
              download="Varun_Resume.pdf"
              onMouseEnter={() => setCursorState('button', 'Download PDF')}
              onMouseLeave={resetCursorState}
              className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white keep-white hover:bg-blue-600 shadow-xl transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume PDF</span>
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
            {/* Embedded Visual Resume Reader Header */}
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>OFFICIAL VERIFIED RESUME // PANGALA VARUN NAYAK</span>
              </div>
              <span className="text-neutral-500">2 PAGES</span>
            </div>

            {/* Resume Content Body */}
            <div className="space-y-8 max-w-4xl mx-auto text-neutral-200 font-sans">
              {/* Header */}
              <div className="space-y-2 border-b border-white/10 pb-6 text-center">
                <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight">PANGALA VARUN NAYAK</h1>
                <p className="font-mono text-xs text-neutral-300">
                  +91 8073319391 • Udupi, Karnataka, India
                </p>
                <p className="font-mono text-xs text-blue-400">
                  iamvarunnayak@gmail.com • linkedin.com/in/pvarunnayak • github.com/thevarunnayak
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-white/10 pb-1">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Frontend and Full Stack Software Engineer with 3+ years of experience building enterprise web and mobile applications using React.js, Next.js, Angular, React Native, TypeScript, JavaScript, Node.js, Supabase, MongoDB, PostgreSQL, REST APIs, and SCSS. Experienced in developing scalable SaaS products, AI-powered applications, reusable component libraries, responsive user interfaces, and performance optimized web applications using Agile methodologies.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="space-y-2">
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-white/10 pb-1">
                  TECHNICAL SKILLS
                </h2>
                <div className="space-y-1.5 font-mono text-xs">
                  <div><strong className="text-white">Languages:</strong> <span className="text-neutral-300">JavaScript, TypeScript, HTML5, CSS3, SQL</span></div>
                  <div><strong className="text-white">Frontend:</strong> <span className="text-neutral-300">React.js, Next.js, Angular, Redux, Tailwind CSS, SCSS</span></div>
                  <div><strong className="text-white">Backend:</strong> <span className="text-neutral-300">Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, Supabase</span></div>
                  <div><strong className="text-white">Mobile:</strong> <span className="text-neutral-300">React Native, Expo, Ionic</span></div>
                  <div><strong className="text-white">AI:</strong> <span className="text-neutral-300">Generative AI, Prompt Engineering, Ollama, OpenAI APIs</span></div>
                  <div><strong className="text-white">Cloud & DevOps:</strong> <span className="text-neutral-300">Vercel, GitHub Actions, CI/CD</span></div>
                  <div><strong className="text-white">Tools:</strong> <span className="text-neutral-300">Git, GitHub, Jira, Postman, Figma, VS Code, Jest</span></div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-white/10 pb-1">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="space-y-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>Software Engineer <span className="font-normal text-neutral-400">| Robosoft Technologies</span></span>
                      <span className="font-mono text-xs text-neutral-400">Jul 2025 – Present</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                      <li>Engineered reusable Angular and Kendo UI components for the BSI Connect auditing platform including Sankey, Funnel and Pyramid visualizations.</li>
                      <li>Developed the Connect Assistant, an AI-powered enterprise search and knowledge discovery feature using Angular, reusable components, dynamic filters, sorting, and contextual search workflows to improve user productivity and information retrieval.</li>
                      <li>Developed image editing workflows, camera integrations and reusable UI libraries improving maintainability and user experience.</li>
                      <li>Expanded engineering capabilities by developing React Native mobile applications.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>Associate Software Engineer <span className="font-normal text-neutral-400">| Robosoft Technologies</span></span>
                      <span className="font-mono text-xs text-neutral-400">Sep 2023 – Jun 2025</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                      <li>Delivered Angular modules for UTI Mutual Fund distributor and investor portals serving millions of users.</li>
                      <li>Built a mobile web UPI payment proof of concept using intent based deep linking.</li>
                      <li>Developed enterprise applications for Trinity Broadcasting Network and British Standards Institution.</li>
                      <li>Built SEO optimized Angular and Next.js applications with reusable components and improved performance.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>Trainee Software Engineer <span className="font-normal text-neutral-400">| Robosoft Technologies</span></span>
                      <span className="font-mono text-xs text-neutral-400">Aug 2022 – Aug 2023</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                      <li>Developed React.js features for the Room to Read platform supporting global education initiatives.</li>
                      <li>Built training projects using React.js, JavaScript and SCSS.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>Software Engineering Intern <span className="font-normal text-neutral-400">| Robosoft Technologies / IISc Bangalore</span></span>
                      <span className="font-mono text-xs text-neutral-400">Mar 2022 – Jul 2022</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                      <li>Developed React based admin interfaces for an e-learning platform.</li>
                      <li>Contributed to Bhojpuri-Hindi ASR research and data collection during internship at IISc.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/10">
                <div className="space-y-2">
                  <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-white/10 pb-1">
                    EDUCATION
                  </h2>
                  <div className="text-xs text-neutral-300 space-y-1">
                    <p className="font-bold text-white">Bachelor of Engineering in ECE</p>
                    <p className="text-neutral-400">N.M.A.M Institute of Technology (2018–2022)</p>
                    <p className="text-emerald-400 font-mono font-semibold">CGPA: 8.57</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-white/10 pb-1">
                    CERTIFICATIONS
                  </h2>
                  <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                    <li>Google AI Professional Certificate (Coursera)</li>
                    <li>Become a Professional React Developer Specialization (Coursera/Scrimba)</li>
                    <li>IBM – Databases and SQL for Data Science with Python</li>
                  </ul>
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
              <p className="text-xs text-neutral-400">React.js, Next.js, Angular, React Native, TypeScript, Node.js & Supabase.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl space-y-2 text-center">
              <span className="font-mono text-5xl font-extrabold text-purple-400">3+ YRS</span>
              <p className="font-bold text-xs text-white uppercase">ENTERPRISE EXPERIENCE</p>
              <p className="text-xs text-neutral-400">Robosoft Technologies & IISc Bangalore research internship.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
