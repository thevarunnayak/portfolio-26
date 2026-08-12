import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { projectsData } from '@/content/projects';
import { ProjectsArchiveClient } from './_components/projects-client';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Engineered Products Archive',
  description: 'Complete portfolio of production web applications, mobile systems, hardware-accelerated WebGL labs, and real-time streaming tools engineered by Varun Nayak.',
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: `Engineered Products Archive | ${siteConfig.name}`,
    description: 'Complete portfolio of production web applications, mobile systems, hardware-accelerated WebGL labs, and real-time streaming tools.',
    url: `${siteConfig.url}/projects`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `Engineered Products Archive — ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Engineered Products Archive | ${siteConfig.name}`,
    description: 'Complete portfolio of production web applications, mobile systems, hardware-accelerated WebGL labs, and real-time streaming tools.',
    images: ['/og-image.png'],
  },
};

export default function ProjectsArchivePage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Engineered Products & Case Studies',
    description: 'Catalog of web applications, mobile software, and WebGL graphics engines engineered by Varun Nayak.',
    url: `${siteConfig.url}/projects`,
    numberOfItems: projectsData.length,
    itemListElement: projectsData.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.tagline,
        applicationCategory: project.category,
        url: project.liveUrl || `${siteConfig.url}/projects`,
        author: {
          '@type': 'Person',
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <ProjectsArchiveClient />
    </>
  );
}
