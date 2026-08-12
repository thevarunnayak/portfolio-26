import React from 'react';

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm transition-opacity duration-200"
      role="status"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Subtle loading spinner ring */}
        <div className="relative h-8 w-8">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <span className="font-mono text-xs text-neutral-400">Loading...</span>
      </div>
    </div>
  );
}
