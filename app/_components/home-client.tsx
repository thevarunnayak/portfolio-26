'use client';

import React, { useState, useEffect, useRef, startTransition } from 'react';
import dynamic from 'next/dynamic';
import { Preloader } from '@/features/loading-screen/preloader';
import { Navbar } from '@/features/navigation/navbar';

// Dynamically import heavy canvas & command palette to minimize initial JS bundle
const GlobalAmbientCanvas = dynamic(
  () => import('@/components/canvas/global-ambient-canvas').then((m) => m.GlobalAmbientCanvas),
  { ssr: false }
);

const CommandMenu = dynamic(
  () => import('@/components/ui/command-menu').then((m) => m.CommandMenu),
  { ssr: false }
);

export function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const didCompleteRef = useRef(false);

  useEffect(() => {
    // Skip the preloader when returning from a deep link (hash) or back-navigation
    if (typeof window !== 'undefined') {
      const targetSection =
        sessionStorage.getItem('scrollToSection') ||
        (window.location.hash ? window.location.hash.substring(1) : null);

      if (targetSection) {
        startTransition(() => setIsLoading(false));
        sessionStorage.removeItem('scrollToSection');
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }

    // Safety fallback: if Preloader fails to call onComplete within 5s, unblock the page
    const safetyTimer = setTimeout(() => {
      if (!didCompleteRef.current) {
        startTransition(() => setIsLoading(false));
      }
    }, 5000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const handlePreloaderComplete = () => {
    didCompleteRef.current = true;
    setIsLoading(false);
  };

  return (
    <>
      {/* Preloader — only shown on first-visit (no sessionStorage/hash target) */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Ambient 3D Particle Canvas across all sections */}
      <GlobalAmbientCanvas />

      {/* Floating Navigation Header — passes command menu opener down */}
      <Navbar onOpenCommandMenu={() => setCommandMenuOpen(true)} />

      {/* Raycast-style Spotlight Command Menu */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </>
  );
}
