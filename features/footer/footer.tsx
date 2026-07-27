'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/content/site';

export function Footer() {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-black px-6 py-8 border-t border-white/10 font-mono text-xs text-neutral-400">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl">
        {/* Left: Built stamp & Copyright */}
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>© {new Date().getFullYear()} {siteConfig.name}. BUILT WITH NEXT.JS 16.</span>
        </div>

        {/* Center: Deployment Status & Git Hash */}
        <div className="flex items-center gap-4 text-neutral-500">
          <span className="text-neutral-400 font-semibold">STATUS: ALL SYSTEMS OPERATIONAL</span>
          <span>•</span>
          <span className="hover:text-neutral-300 font-mono">BUILD #9f4a81b</span>
        </div>

        {/* Right: Live IST Clock */}
        <div className="text-neutral-400">
          <span>INDIA (IST): </span>
          <span className="text-white font-bold">{timeString || '12:00:00 PM'}</span>
        </div>
      </div>
    </footer>
  );
}
