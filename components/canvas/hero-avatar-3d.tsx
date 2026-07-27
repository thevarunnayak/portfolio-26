'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/features/cursor/cursor-context';
import { ShieldCheck } from 'lucide-react';

export function HeroAvatar3D() {
  const { setCursorState, resetCursorState } = useCursor();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D card tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid 3D motion
  const mouseX = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 25 });

  // Map mouse positions to 3D rotation angles
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  // Spotlight radial gradient coordinates for backdrop glow behind card
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], [10, 90]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], [10, 90]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse offset (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorState('window', 'Varun Nayak');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    resetCursorState();
  };

  return (
    <div className="perspective-1000 relative flex items-center justify-center w-full max-w-sm mx-auto py-2 group">
      {/* Permanent Outer Ambient Backdrop Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/15 via-teal-500/15 to-purple-600/15 blur-2xl opacity-60 animate-pulse pointer-events-none -z-20" />

      {/* Dynamic Backlight Blue Glow BEHIND Card on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([sx, sy]) => `radial-gradient(500px circle at ${sx}% ${sy}%, rgba(59, 130, 246, 0.5), rgba(45, 212, 191, 0.25), transparent 75%)`
          ),
        }}
      />

      {/* Main 3D Tilted Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-white/10 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden cursor-pointer transition-shadow duration-500 hover:shadow-blue-500/20"
      >
        {/* Profile Image & Cyber Container */}
        <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-neutral-950 flex flex-col justify-between isolate">
          {/* Top Status Bar */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-black/70 backdrop-blur-md border-b border-white/10 rounded-t-[20px]">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-neutral-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VARUN NAYAK</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              <ShieldCheck className="h-3 w-3" />
              <span>SOFTWARE ENGINEER</span>
            </div>
          </div>

          {/* High-Resolution Portrait Photo */}
          <div className="relative flex-1 w-full overflow-hidden">
            <img
              src="/images/prof.jpg"
              alt="Varun Nayak Profile Photo"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
          </div>

          {/* Floating Technology Badges Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-20">
            <div className="flex flex-wrap items-center gap-1.5">
              {['Angular', 'React', 'Next.js 16', 'TypeScript'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] font-medium text-neutral-200 bg-black/80 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-md shadow-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
