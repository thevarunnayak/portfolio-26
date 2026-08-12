import React from 'react';
import { HomeClient } from './_components/home-client';
import { HeroSection } from '@/features/hero/hero-section';
import { ExperienceSection } from '@/features/experience/experience-section';
import { ProjectsSection } from '@/features/projects/projects-section';
import { SkillsSection } from '@/features/skills/skills-section';
import { CertificationsSection } from '@/features/certifications/certifications-section';
import { PlaygroundSection } from '@/features/playground/playground-section';
import { ResumeSection } from '@/features/resume/resume-section';
import { ContactSection } from '@/features/contact/contact-section';
import { Footer } from '@/features/footer/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/content/site';

/**
 * Home page — Server Component.
 *
 * All section components are imported here so that their markup is included in
 * the initial server-rendered HTML.
 *
 * Render Person, ProfilePage, and WebSite JSON-LD structured data.
 */
export default function Home() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    description: siteConfig.bio,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location,
    },
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.twitter].filter(Boolean),
    knowsAbout: [
      'React.js',
      'Next.js',
      'Angular',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Frontend Development',
      'Software Architecture',
      'UI/UX Engineering'
    ],
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    mainEntity: {
      '@id': `${siteConfig.url}/#person`,
    },
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.tagline,
    publisher: {
      '@id': `${siteConfig.url}/#person`,
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD Structured Data */}
      <JsonLd data={[personSchema, profilePageSchema, webSiteSchema]} />

      {/* Client boundary: preloader + command menu + ambient canvas + navbar */}
      <HomeClient />

      {/* Main portfolio content — server-rendered */}
      <main className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white">
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
