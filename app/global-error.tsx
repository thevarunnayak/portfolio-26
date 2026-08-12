'use client';

import React, { useEffect } from 'react';

import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}

export default function GlobalError({ error, reset, unstable_retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Fatal global error:', error);
  }, [error]);

  const handleRetry = () => {
    if (typeof unstable_retry === 'function') {
      unstable_retry();
    } else if (typeof reset === 'function') {
      reset();
    }
  };

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white flex min-h-screen flex-col items-center justify-center font-sans p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs font-mono text-red-400 border border-red-500/20">
            Critical System Error
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Application unavailable
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            A critical error occurred while initializing the application shell.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={handleRetry}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            >
              Reload application
            </button>
            <Link
              href="/"
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
