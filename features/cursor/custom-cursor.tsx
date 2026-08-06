'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useCursor } from './cursor-context';

export function CustomCursor() {
  const { cursorVariant } = useCursor();
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOrTouch, setIsMobileOrTouch] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIsMobileOrTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isMobileViewport = window.innerWidth <= 1024;
      const noHover = window.matchMedia('(hover: none)').matches;
      const hasTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      return isCoarse || isMobileViewport || noHover || hasTouchEvents;
    };

    if (checkIsMobileOrTouch()) {
      setIsMobileOrTouch(true);
      document.body.classList.remove('custom-cursor-active');
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    setIsMobileOrTouch(false);
    document.body.classList.add('custom-cursor-active');
    document.documentElement.classList.add('custom-cursor-active');
    setIsVisible(true);

    const handleResize = () => {
      if (checkIsMobileOrTouch()) {
        setIsMobileOrTouch(true);
        document.body.classList.remove('custom-cursor-active');
        document.documentElement.classList.remove('custom-cursor-active');
      } else {
        setIsMobileOrTouch(false);
        document.body.classList.add('custom-cursor-active');
        document.documentElement.classList.add('custom-cursor-active');
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { capture: true, passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    // Smooth 120fps GPU RAF loop
    const updatePosition = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.45;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.45;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove, { capture: true } as any);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  // Never render custom cursor on mobile (width <= 1024px), touch, or hidden variant
  if (isMobileOrTouch || !isVisible || cursorVariant === 'hidden') return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        backgroundColor: isDark
          ? (cursorVariant === 'default' ? '#ffffff' : 'rgba(59, 130, 246, 0.25)')
          : (cursorVariant === 'default' ? '#0f172a' : 'rgba(15, 23, 42, 0.15)'),
        borderColor: isDark
          ? (cursorVariant === 'link' ? '#2dd4bf' : cursorVariant === 'button' ? '#60a5fa' : 'rgba(255,255,255,0.8)')
          : (cursorVariant === 'link' ? '#0d9488' : cursorVariant === 'button' ? '#2563eb' : '#0f172a'),
        boxShadow: isDark
          ? '0 0 10px rgba(255,255,255,0.6)'
          : '0 0 8px rgba(15,23,42,0.4)',
      }}
      className={`custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[99999] rounded-full will-change-transform border transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out ${
        cursorVariant === 'button'
          ? 'h-6 w-6'
          : cursorVariant === 'link'
          ? 'h-5 w-5'
          : cursorVariant === 'window'
          ? 'h-7 w-7'
          : cursorVariant === 'drag'
          ? 'h-7 w-7'
          : cursorVariant === 'text'
          ? 'h-4 w-0.5'
          : 'h-3 w-3'
      }`}
    />
  );
}
