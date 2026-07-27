'use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig } from '@/content/site';

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Real-time falling particle animation loop with dissolve fade effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 60;

    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(59, 130, 246, ',
      'rgba(45, 212, 191, ',
      'rgba(147, 197, 253, '
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.6 + 0.2, // Falling downward
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6,
        maxOpacity: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY; // Fall down
        p.x += p.speedX;

        // Dynamic fade effect as particles fall towards bottom edge
        const currentOpacity = Math.max(0, (1 - p.y / height) * p.maxOpacity);

        // Reset particle to top when it falls past bottom edge
        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
          p.speedY = Math.random() * 0.6 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer className="relative w-full bg-neutral-950 text-neutral-400 font-mono text-xs border-t border-white/10 overflow-hidden select-none">
      {/* Top Footer Bar: Full edge-to-edge width matching bottom typography */}
      <div className="w-full px-6 sm:px-12 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 relative z-20">
        {/* Left: Copyright */}
        <div className="text-neutral-400">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>

        {/* Right: Built with Next.js 16 */}
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span>BUILT WITH NEXT.JS 16</span>
        </div>
      </div>

      {/* Bottom Section: Full edge-to-edge width with giant typography */}
      <div className="relative w-full px-4 sm:px-8 flex items-end justify-center overflow-hidden bg-gradient-to-b from-neutral-950 via-black to-neutral-950 pt-4 sm:pt-6">
        {/* Falling Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90"
        />

        {/* Giant Metallic Typography - Wall-to-Wall full width */}
        <div className="relative z-0 translate-y-[22%] pointer-events-none text-center w-full leading-none">
          <h2 className="text-[13vw] sm:text-[14vw] font-black uppercase tracking-tighter leading-none bg-gradient-to-b from-white via-neutral-200 to-transparent bg-clip-text text-transparent opacity-95 drop-shadow-2xl">
            VARUN NAYAK
          </h2>
        </div>
      </div>
    </footer>
  );
}
