'use client';

import React, { useState } from 'react';
import { Preloader } from '@/features/loading-screen/preloader';
import { Navbar } from '@/features/navigation/navbar';
import { CommandMenu } from '@/components/ui/command-menu';
import { GlobalAmbientCanvas } from '@/components/canvas/global-ambient-canvas';
import { HeroSection } from '@/features/hero/hero-section';
import { ExperienceSection } from '@/features/experience/experience-section';
import { ProjectsSection } from '@/features/projects/projects-section';
import { SkillsSection } from '@/features/skills/skills-section';
import { CertificationsSection } from '@/features/certifications/certifications-section';
import { PlaygroundSection } from '@/features/playground/playground-section';
import { ResumeSection } from '@/features/resume/resume-section';
import { ContactSection } from '@/features/contact/contact-section';
import { Footer } from '@/features/footer/footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
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
      )}
    </>
  );
}
