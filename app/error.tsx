'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}

export default function Error({ error, reset, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    // Log error for debugging without exposing secrets to production UI
    console.error('Unhandled route error:', error);
  }, [error]);

  const handleRetry = () => {
    if (typeof unstable_retry === 'function') {
      unstable_retry();
    } else if (typeof reset === 'function') {
      reset();
    }
  };

  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-white"
      aria-labelledby="error-heading"
    >
      {/* Subtle radial glow matching design language */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Status badge */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md">
          <span className="font-mono text-xs text-rose-400">Error</span>
          <span className="h-3 w-px bg-white/20" aria-hidden="true" />
          <span className="font-mono text-xs text-neutral-400">Application Error</span>
        </div>

        {/* Heading */}
        <h1
          id="error-heading"
          className="font-satoshi text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Something went wrong
        </h1>

        {/* User-safe message */}
        <p className="max-w-md font-inter text-base leading-relaxed text-neutral-400 sm:text-lg">
          An unexpected error occurred while rendering this page. You can try refreshing the component or return home.
        </p>

        {/* Divider */}
        <div className="h-px w-12 bg-white/10" aria-hidden="true" />

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={handleRetry}
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 font-inter text-sm font-medium text-white transition-all duration-200 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer"
            aria-label="Try loading this page again"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-inter text-sm font-medium text-neutral-300 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            aria-label="Go back to homepage"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
