'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaveMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color('#3b82f6') },
    uEmissive: { value: new THREE.Color('#2dd4bf') }
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float waveX = sin(pos.x * 0.35 + uTime + uMouse.x * 1.5);
      float waveY = cos(pos.y * 0.4 + uTime * 0.8);
      float waveZ = sin((pos.x + pos.y) * 0.25 + uTime * 1.2);

      float zHeight = (waveX * waveY + waveZ * 0.5) * 1.4;
      pos.z += zHeight;
      vElevation = zHeight;

      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uEmissive;
    varying float vElevation;

    void main() {
      float mixFactor = (vElevation + 1.4) / 2.8;
      vec3 finalColor = mix(uColor, uEmissive, mixFactor * 0.7);
      gl_FragColor = vec4(finalColor, 0.3);
    }
  `
};

function GPUWaveRibbon() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.5;
    mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
    mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uMouse.value.set(mouseRef.current.currentX, mouseRef.current.currentY);
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 3 + mouseRef.current.currentY * 0.15;
      meshRef.current.rotation.z = t * 0.03 + mouseRef.current.currentX * 0.1;
      meshRef.current.position.y = -2 + Math.sin(t * 0.4) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1, -4]}>
      <planeGeometry args={[40, 30, 40, 30]} />
      <shaderMaterial
        ref={materialRef}
        args={[WaveMaterial]}
        wireframe
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function HeroParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount WebGL canvas during idle time after initial DOM render & paint
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(() => setMounted(true), { timeout: 300 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setMounted(true), 200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-80" style={{ pointerEvents: 'none' }}>
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.5} />
        <GPUWaveRibbon />
      </Canvas>
    </div>
  );
}
