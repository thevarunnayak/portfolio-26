'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SmoothAmbientParticleField() {
  const count = 500;
  const meshRef = useRef<THREE.Points>(null!);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      sca[i] = Math.random() * 0.7 + 0.3;
    }

    return [pos, sca];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Smooth, perfectly balanced 3D particle motion
      meshRef.current.rotation.y = t * 0.12 + scrollYRef.current * 0.0003;
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.2) * 0.3 - scrollYRef.current * 0.0012;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#3b82f6"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function GlobalAmbientCanvas() {
  const [mounted, setMounted] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkScroll = () => {
      // Only reveal global ambient particles when scrolled past Hero section (~250px)
      if (window.scrollY > 200) {
        setShowCanvas(true);
      } else {
        setShowCanvas(false);
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] w-full h-full transition-opacity duration-500 ${
        showCanvas ? 'opacity-80' : 'opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <SmoothAmbientParticleField />
      </Canvas>
    </div>
  );
}
