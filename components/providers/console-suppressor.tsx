'use client';

// Suppress known upstream Three.js r183+ deprecation warning originating from @react-three/fiber internals (which still instantiates THREE.Clock)
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export function ConsoleSuppressor() {
  return null;
}
