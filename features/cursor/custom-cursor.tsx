'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from './cursor-context';

export function CustomCursor() {
  const { cursorVariant } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 500, mass: 0.25 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.classList.add('custom-cursor-active');
      setIsVisible(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Capture phase listener ensures cursor tracks mouse even over modals/popups
    window.addEventListener('mousemove', handleMouseMove, { capture: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, { capture: true } as any);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible || cursorVariant === 'hidden') return null;

  const variants = {
    default: {
      height: 8,
      width: 8,
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
      border: '0px solid transparent',
      mixBlendMode: 'difference' as const,
    },
    button: {
      height: 20,
      width: 20,
      borderRadius: '50%',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      border: '1.25px solid rgba(59, 130, 246, 0.8)',
      boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
      mixBlendMode: 'normal' as const,
    },
    link: {
      height: 18,
      width: 18,
      borderRadius: '50%',
      backgroundColor: 'rgba(45, 212, 191, 0.2)',
      border: '1.25px solid rgba(45, 212, 191, 0.8)',
      boxShadow: '0 0 10px rgba(45, 212, 191, 0.3)',
      mixBlendMode: 'normal' as const,
    },
    window: {
      height: 22,
      width: 22,
      borderRadius: '50%',
      backgroundColor: 'rgba(59, 130, 246, 0.25)',
      border: '1.25px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)',
      mixBlendMode: 'normal' as const,
    },
    drag: {
      height: 24,
      width: 24,
      borderRadius: '50%',
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      border: '1.5px solid #3b82f6',
      mixBlendMode: 'normal' as const,
    },
    text: {
      height: 16,
      width: 2,
      borderRadius: 1,
      backgroundColor: '#3b82f6',
      boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)',
      mixBlendMode: 'normal' as const,
    }
  };

  return (
    <>
      {/* Background Spotlight light cone following cursor */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[99998] transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(59, 130, 246, 0.04), transparent 80%)`,
        }}
      />

      {/* Main Micro Dot Cursor placed above all popups and modals (z-[99999]) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', stiffness: 600, damping: 32 }}
      />
    </>
  );
}
