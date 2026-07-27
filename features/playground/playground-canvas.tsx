'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* 1. Multi-Geometry WebGL Scene (Three.js & R3F) */
function MultiGeometryScene() {
  const torusRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const octaRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.4;
      torusRef.current.rotation.y = t * 0.6;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = -t * 0.2;
    }
    if (octaRef.current) {
      octaRef.current.position.x = Math.sin(t * 1.5) * 1.8;
      octaRef.current.position.z = Math.cos(t * 1.5) * 1.8;
      octaRef.current.rotation.x = t * 1.2;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        {/* Central Torus Knot */}
        <mesh ref={torusRef} scale={0.9}>
          <torusKnotGeometry args={[0.9, 0.28, 128, 32]} />
          <meshStandardMaterial
            color="#3b82f6"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Outer Wireframe Geodesic Sphere */}
        <mesh ref={sphereRef} scale={1.8}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshBasicMaterial
            color="#2dd4bf"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbiting Octahedron */}
        <mesh ref={octaRef} scale={0.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
    </>
  );
}

/* 2. Canvas 2D Physics & Motion Spring Visualizer */
function PhysicsMotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const nodes = [
      { x: 100, y: 100, targetX: 100, targetY: 100, vx: 0, vy: 0, radius: 14, color: '#3b82f6' },
      { x: 220, y: 140, targetX: 220, targetY: 140, vx: 0, vy: 0, radius: 18, color: '#2dd4bf' },
      { x: 340, y: 90, targetX: 340, targetY: 90, vx: 0, vy: 0, radius: 12, color: '#a855f7' },
    ];

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update & Draw Spring Nodes
      nodes.forEach((node, i) => {
        node.targetX = (canvas.width / 4) * (i + 1) + Math.sin(t + i) * 40;
        node.targetY = canvas.height / 2 + Math.cos(t * 1.5 + i) * 35;

        // Spring physics equation
        const ax = (node.targetX - node.x) * 0.1;
        const ay = (node.targetY - node.y) * 0.1;
        node.vx = (node.vx + ax) * 0.85;
        node.vy = (node.vy + ay) * 0.85;
        node.x += node.vx;
        node.y += node.vy;

        // Draw spring connection vectors
        ctx.beginPath();
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.targetX, node.targetY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1.0;

        // Node Glowing Circle
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={460} height={240} className="w-full h-full object-cover" />;
}

/* 3. Canvas 2D Real-Time Data Stream Visualizer */
function DataStreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let packets: { x: number; y: number; speed: number; id: number; topic: string; color: string }[] = [];
    let packetSeq = 1000;

    const topics = [
      { name: 'AUDIT_STREAM', color: '#3b82f6' },
      { name: 'WEBSOCKET_PUB', color: '#2dd4bf' },
      { name: 'METRIC_EVENT', color: '#f59e0b' },
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new data packets
      if (Math.random() < 0.12) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        packets.push({
          x: -20,
          y: 40 + Math.random() * (canvas.height - 80),
          speed: 2 + Math.random() * 2.5,
          id: packetSeq++,
          topic: topic.name,
          color: topic.color,
        });
      }

      // Draw Stream Channels
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      [60, 120, 180].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      });

      // Update & Draw Packets
      packets.forEach((p, idx) => {
        p.x += p.speed;

        // Packet Capsule
        ctx.fillStyle = 'rgba(20, 20, 20, 0.9)';
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y - 12, 110, 24, 6);
        ctx.fill();
        ctx.stroke();

        // Glowing Dot
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + 12, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Packet ID Text
        ctx.font = '10px Geist Mono, monospace';
        ctx.fillStyle = '#f5f5f5';
        ctx.fillText(`#${p.id} ${p.topic.slice(0, 7)}`, p.x + 22, p.y + 3);
      });

      // Remove offscreen packets
      packets = packets.filter((p) => p.x < canvas.width + 120);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={460} height={240} className="w-full h-full object-cover" />;
}

/* 4. Canvas 2D Web Audio API FFT Spectrum Visualizer */
function AudioSpectrumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const barsCount = 32;

    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width - 40) / barsCount;

      for (let i = 0; i < barsCount; i++) {
        // Simulated FFT frequency value
        const freq = Math.abs(Math.sin(t + i * 0.25) * Math.cos(t * 0.7 + i * 0.1)) * 0.85 + 0.15;
        const barHeight = freq * (canvas.height - 60);

        const x = 20 + i * barWidth;
        const y = canvas.height - 30 - barHeight;

        // Gradient Bar
        const grad = ctx.createLinearGradient(0, canvas.height - 30, 0, 20);
        grad.addColorStop(0, '#3b82f6');
        grad.addColorStop(0.5, '#2dd4bf');
        grad.addColorStop(1, '#a855f7');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth - 3, barHeight);

        // Peak Indicator Cap
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y - 3, barWidth - 3, 2);
      }

      // Oscilloscope Trace Line on Top
      ctx.beginPath();
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 40 + Math.sin(t * 2 + x * 0.03) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={460} height={240} className="w-full h-full object-cover" />;
}

export function PlaygroundCanvas({ demoId }: { demoId: string }) {
  return (
    <div className="h-64 w-full rounded-2xl bg-black/70 overflow-hidden relative border border-white/10 flex items-center justify-center">
      {demoId === 'threejs-lab' && (
        <>
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <pointLight position={[-5, -5, -5]} color="#2dd4bf" intensity={2} />
            <MultiGeometryScene />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-neutral-400 bg-black/80 px-2.5 py-1 rounded-full border border-white/10">
            THREE.JS & DREI // DRAG TO ROTATE 3D MESHES
          </div>
        </>
      )}

      {demoId === 'motion-physics' && (
        <>
          <PhysicsMotionCanvas />
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-neutral-400 bg-black/80 px-2.5 py-1 rounded-full border border-white/10">
            FRAMER MOTION // SPRING VELOCITY VECTOR FIELD
          </div>
        </>
      )}

      {demoId === 'data-stream' && (
        <>
          <DataStreamCanvas />
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-neutral-400 bg-black/80 px-2.5 py-1 rounded-full border border-white/10">
            RXJS & WEBSOCKETS // REAL-TIME PUB/SUB CONVEYOR
          </div>
        </>
      )}

      {demoId === 'audio-visualizer' && (
        <>
          <AudioSpectrumCanvas />
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-neutral-400 bg-black/80 px-2.5 py-1 rounded-full border border-white/10">
            WEB AUDIO API // 32-BIN FFT OSCILLOSCOPE
          </div>
        </>
      )}
    </div>
  );
}
