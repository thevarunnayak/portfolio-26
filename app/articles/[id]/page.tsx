import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleById, getAllArticleIds } from '@/content/articles';
import { ArticleNavHeader } from './article-nav-header';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  FileText,
  ImageIcon
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = getAllArticleIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: 'Article Not Found | Varun Nayak R&D',
      description: 'The requested engineering case study could not be found.'
    };
  }

  return {
    title: `${article.title} | Executive Case Study`,
    description: article.summary,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      images: article.coverImage ? [{ url: article.coverImage }] : []
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-blue-500 selection:text-white">
      {/* Top Client Navigation Header matching Navbar theme toggle format */}
      <ArticleNavHeader category={article.category} readTime={article.readTime} />

      {/* Main Article Container */}
      <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16 space-y-12">
        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1 text-[var(--text-secondary)]">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--text-secondary)]">{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[var(--text-primary)]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-blue-400 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-4 border-t border-[var(--border-subtle)] font-mono text-xs text-[var(--text-secondary)]">
            Authored by <span className="text-[var(--text-primary)] font-semibold">{article.author}</span>
          </div>
        </header>

        {/* Cover Hero Banner Image */}
        {article.coverImage && (
          <div className="relative w-full h-72 sm:h-[420px] rounded-3xl overflow-hidden border border-[var(--glass-border)] shadow-2xl">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-neutral-200">
              <span className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-1.5 backdrop-blur-md border border-white/10">
                <ImageIcon className="h-4 w-4 text-blue-400" />
                <span>Software-Defined Vehicle Cockpit Vision</span>
              </span>
            </div>
          </div>
        )}

        {/* Executive Summary Block */}
        <section className="rounded-3xl bg-blue-500/10 p-6 sm:p-8 border border-blue-500/20 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
            <FileText className="h-4 w-4" />
            <span>EXECUTIVE BRIEFING & SUMMARY</span>
          </div>
          <div className="space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
            {article.executiveSummary.map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>
        </section>

        {/* Key Architecture Pillars Highlights */}
        <section className="rounded-3xl bg-[var(--card-bg)] p-6 sm:p-8 border border-[var(--border-subtle)] space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>KEY ARCHITECTURE PILLARS ANALYZED</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {article.keyPillars.map((pillar, pIdx) => (
              <li
                key={pIdx}
                className="rounded-2xl bg-[var(--bg-primary)] p-4 text-xs text-[var(--text-secondary)] border border-[var(--border-subtle)] leading-relaxed"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </section>

        {/* Main Article Sections */}
        <div className="space-y-14">
          {article.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-6 border-t border-[var(--border-subtle)] pt-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                {section.heading}
              </h2>

              {/* Section Illustration Image */}
              {section.image && (
                <div className="space-y-3 py-2">
                  <div className="relative w-full h-72 sm:h-[380px] rounded-3xl overflow-hidden border border-[var(--glass-border)] shadow-xl">
                    <Image
                      src={section.image.url}
                      alt={section.image.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-mono text-xs text-center text-blue-400">
                    {section.image.caption}
                  </p>
                </div>
              )}

              {/* Subheadings Grid */}
              {section.subheadings && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {section.subheadings.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className="rounded-2xl bg-[var(--card-bg)] p-5 border border-[var(--border-subtle)] space-y-2"
                    >
                      <h3 className="font-mono text-xs font-semibold text-blue-400 uppercase">
                        {sub.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Paragraph Content */}
              {section.content && (
                <div className="space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
                  {section.content.map((cPara, cIdx) => (
                    <p key={cIdx}>{cPara}</p>
                  ))}
                </div>
              )}

              {/* ASCII Infographic */}
              {section.infographic && (
                <div className="rounded-2xl bg-[var(--code-bg)] p-5 border border-[var(--border-subtle)] overflow-x-auto font-mono text-xs text-emerald-400 leading-tight">
                  <pre className="whitespace-pre">{section.infographic}</pre>
                </div>
              )}

              {/* ASCII Diagrams */}
              {section.diagrams && (
                <div className="space-y-6 pt-2">
                  {section.diagrams.map((diag, dIdx) => (
                    <div key={dIdx} className="space-y-2">
                      <div className="font-mono text-xs font-semibold text-blue-400">
                        {diag.title}
                      </div>
                      <div className="rounded-2xl bg-[var(--code-bg)] p-5 border border-[var(--border-subtle)] overflow-x-auto font-mono text-[11px] text-cyan-400 leading-tight">
                        <pre className="whitespace-pre">{diag.ascii}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Benchmarking Table */}
              {section.table && (
                <div className="rounded-2xl border border-[var(--border-subtle)] overflow-x-auto bg-[var(--card-bg)]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-blue-500/10 text-blue-400 border-b border-[var(--border-subtle)]">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-4 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/5">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-4">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* References Section */}
        {article.references && (
          <footer className="border-t border-[var(--border-subtle)] pt-8 space-y-4">
            <div className="font-mono text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              REFERENCES & SCHOLARLY CITATIONS
            </div>
            <ul className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
              {article.references.map((ref, rIdx) => (
                <li key={rIdx}>[{rIdx + 1}] {ref}</li>
              ))}
            </ul>
          </footer>
        )}

        {/* Footer Navigation CTA Bar */}
        <div className="flex items-center justify-start border-t border-[var(--border-subtle)] pt-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-mono text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO HOME</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
