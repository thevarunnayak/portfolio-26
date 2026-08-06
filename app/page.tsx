'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Preloader } from '@/features/loading-screen/preloader';
import { Navbar } from '@/features/navigation/navbar';
import { HeroSection } from '@/features/hero/hero-section';
import { ExperienceSection } from '@/features/experience/experience-section';
import { ProjectsSection } from '@/features/projects/projects-section';
import { SkillsSection } from '@/features/skills/skills-section';
import { CertificationsSection } from '@/features/certifications/certifications-section';
import { PlaygroundSection } from '@/features/playground/playground-section';
import { ResumeSection } from '@/features/resume/resume-section';
import { ContactSection } from '@/features/contact/contact-section';
import { Footer } from '@/features/footer/footer';

// Dynamically import heavy canvas & modal components to minimize initial JS bundle size
const GlobalAmbientCanvas = dynamic(
  () => import('@/components/canvas/global-ambient-canvas').then((m) => m.GlobalAmbientCanvas),
  { ssr: false }
);

const CommandMenu = dynamic(
  () => import('@/components/ui/command-menu').then((m) => m.CommandMenu),
  { ssr: false }
);

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  useEffect(() => {
    // Check if deep link hash or return section exists
    if (typeof window !== 'undefined') {
      const targetSection = sessionStorage.getItem('scrollToSection') || (window.location.hash ? window.location.hash.substring(1) : null);

      if (targetSection) {
        setIsLoading(false);
        sessionStorage.removeItem('scrollToSection');
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, []);

  return (
    <>
      {/* Light & Dark Mode Compatible Circular Shimmer Preloader */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Portfolio Content */}
      <main className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white">
        {/* Subtle Ambient 3D Particle Canvas across all sections */}
        <GlobalAmbientCanvas />

        {/* Floating Navigation Header */}
        <Navbar onOpenCommandMenu={() => setCommandMenuOpen(true)} />

        {/* Raycast-style Spotlight Command Menu */}
        <CommandMenu
          isOpen={commandMenuOpen}
          onClose={() => setCommandMenuOpen(false)}
        />

        {/* Sections */}
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <PlaygroundSection />
        <ResumeSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}

export default Home;
