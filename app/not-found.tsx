import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-white"
      aria-labelledby="not-found-heading"
    >
      {/* Subtle radial glow — consistent with portfolio section backgrounds */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Status label */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
          <span className="font-mono text-xs text-neutral-400">404</span>
          <span className="h-3 w-px bg-white/20" aria-hidden="true" />
          <span className="font-mono text-xs text-neutral-400">Not Found</span>
        </div>

        {/* Heading */}
        <h1
          id="not-found-heading"
          className="font-satoshi text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Page not found
        </h1>

        {/* Description */}
        <p className="max-w-md font-inter text-base leading-relaxed text-neutral-400 sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        {/* Divider */}
        <div className="h-px w-12 bg-white/10" aria-hidden="true" />

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 font-inter text-sm font-medium text-white transition-all duration-200 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="Go back to homepage"
          >
            <Home className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
            Back to home
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-inter text-sm font-medium text-neutral-300 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            aria-label="View projects section"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            View projects
          </Link>
        </div>
      </div>

      {/* Reduced motion: the glow above has no animation, so no @media override needed */}
    </main>
  );
}
