'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function UndulatingWaveRibbon() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const gridWidth = 45;
  const gridHeight = 35;
  const segmentsX = 60;
  const segmentsY = 45;

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(gridWidth, gridHeight, segmentsX, segmentsY);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.6;
    const pos = geometry.attributes.position;

    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);

      const waveX = Math.sin(u * 0.35 + t + mouseRef.current.x * 1.5);
      const waveY = Math.cos(v * 0.4 + t * 0.8);
      const waveZ = Math.sin((u + v) * 0.25 + t * 1.2);

      const zHeight = (waveX * waveY + waveZ * 0.5) * 1.4;
      pos.setZ(i, zHeight);
    }

    pos.needsUpdate = true;

    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 3 + mouseRef.current.y * 0.15;
      meshRef.current.rotation.z = t * 0.03 + mouseRef.current.x * 0.1;
      meshRef.current.position.y = -2 + Math.sin(t * 0.4) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1, -4]}>
      <meshStandardMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.25}
        emissive="#2dd4bf"
        emissiveIntensity={0.18}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export function HeroParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-70" style={{ pointerEvents: 'none' }}>
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.0} color="#3b82f6" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#2dd4bf" />
        <UndulatingWaveRibbon />
      </Canvas>
    </div>
  );
}
