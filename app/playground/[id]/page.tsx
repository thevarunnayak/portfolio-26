import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlaygroundItemById, getAllPlaygroundIds, getPlaygroundDetailById } from '@/content/playground';
import { JsonLd } from '@/components/seo/json-ld';

import { PlaygroundNavHeader, ReturnToPlaygroundButton } from './playground-nav-header';
import { PlaygroundCanvas } from '@/features/playground/playground-canvas';
import { siteConfig } from '@/content/site';
import {
  FlaskConical,
  Code2,
  ArrowUpRight,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface PlaygroundPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllPlaygroundIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PlaygroundPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getPlaygroundItemById(id);

  if (!item) {
    return {
      title: 'Lab Not Found',
    };
  }

  const pageUrl = `${siteConfig.url}/playground/${item.id}`;
  const isRasterImage = item.previewImage && /\.(png|jpg|jpeg|webp)$/i.test(item.previewImage);
  const ogImageUrl = isRasterImage ? `${siteConfig.url}${item.previewImage}` : `${siteConfig.url}/og-image.png`;

  return {
    title: `${item.title} — ${siteConfig.name} R&D Lab`,
    description: item.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${item.title} | Varun Nayak Engineering Lab`,
      description: item.description,
      type: 'website',
      url: pageUrl,
      images: [
        {
          url: ogImageUrl,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.title} | Varun Nayak Engineering Lab`,
      description: item.description,
      images: [ogImageUrl],
    },
  };
}

export default async function PlaygroundDetailPage({ params }: PlaygroundPageProps) {
  const { id } = await params;
  const item = getPlaygroundItemById(id);
  const detail = getPlaygroundDetailById(id);

  if (!item || !detail) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}/playground/${item.id}`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${pageUrl}#webapp`,
    name: item.title,
    description: item.description,
    url: pageUrl,
    applicationCategory: item.category,
    creator: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    codeRepository: detail.githubUrl || undefined,
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-blue-500 selection:text-white pb-24">
      {/* Sticky Header */}
      <PlaygroundNavHeader category={item.category} title={item.title} />

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16 space-y-12">
        {/* Header Title Section */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 font-semibold text-blue-400 border border-blue-500/20 uppercase">
              <FlaskConical className="h-3.5 w-3.5" />
              <span>{item.category}</span>
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE INTERACTIVE CANVAS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[var(--text-primary)]">
            {item.title}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] leading-relaxed">
            {item.description}
          </p>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap gap-2">
              {item.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-white/5 px-3 py-1 text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                >
                  {t}
                </span>
              ))}
            </div>

            {item.liveDemoUrl && (
              <a
                href={item.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
              >
                <span>Launch External App</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        {/* Live Canvas Viewport */}
        <section className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>INTERACTIVE CANVAS LABORATORY VIEWPORT</span>
            </span>
          </div>

          <div className="h-[420px] sm:h-[500px] w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-black shadow-2xl relative">
            <PlaygroundCanvas demoId={item.interactiveDemoId} />
          </div>
        </section>

        {/* Technical Highlights & Architecture Insights */}
        <section className="rounded-3xl bg-[var(--card-bg)] p-6 sm:p-10 border border-[var(--border-subtle)] space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Code2 className="h-4 w-4" />
            <span>TECHNICAL HIGHLIGHTS & ARCHITECTURE INSIGHTS</span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {detail.architectureInsights.map((insight, idx) => (
              <li
                key={idx}
                className="rounded-2xl bg-[var(--bg-primary)] p-5 text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)] leading-relaxed space-y-2"
              >
                <div className="flex items-center gap-2 text-blue-400 font-mono font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>SPEC #{idx + 1}</span>
                </div>
                <p>{insight}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Library Used & Purpose */}
        {detail.developerPurpose && (
          <section className="rounded-3xl bg-blue-500/10 p-6 sm:p-8 border border-blue-500/20 space-y-3">
            <div className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
              LIBRARY & PURPOSE // {detail.libraryUsed}
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {detail.developerPurpose}
            </p>
          </section>
        )}

        {/* AI Reproduction Prompt */}
        {detail.aiPrompt && (
          <section className="rounded-3xl bg-black/60 p-6 sm:p-8 border border-blue-500/30 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>REPRODUCE WITH AI (SPECIFICATION PROMPT)</span>
            </div>

            <pre className="whitespace-pre-wrap font-mono text-xs text-neutral-300 bg-black/80 p-5 rounded-2xl border border-white/10 leading-relaxed overflow-x-auto select-all">
              {detail.aiPrompt}
            </pre>
          </section>
        )}

        {/* Footer Navigation CTA */}
        <div className="flex items-center justify-start border-t border-[var(--border-subtle)] pt-8">
          <ReturnToPlaygroundButton />
        </div>
      </main>
    </div>
    </>
  );
}
