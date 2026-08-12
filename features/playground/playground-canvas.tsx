'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, OrbitControls, Center } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as THREE from 'three';

// Safely defer URL.revokeObjectURL for GLTFLoader bufferView textures to allow browser image decoding
if (typeof window !== 'undefined' && !(window as Window & { __safeBlobRevokePatched?: boolean }).__safeBlobRevokePatched) {
  (window as Window & { __safeBlobRevokePatched?: boolean }).__safeBlobRevokePatched = true;
  const originalRevoke = URL.revokeObjectURL;
  URL.revokeObjectURL = function (url: string) {
    if (typeof url === 'string' && url.startsWith('blob:')) {
      setTimeout(() => {
        try {
          originalRevoke.call(URL, url);
        } catch {
          // Ignore revocation exceptions
        }
      }, 10000);
    } else {
      originalRevoke.call(URL, url);
    }
  };
}

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
      { x: 160, y: 180, targetX: 160, targetY: 180, vx: 0, vy: 0, radius: 24, color: '#3b82f6' },
      { x: 400, y: 230, targetX: 400, targetY: 230, vx: 0, vy: 0, radius: 32, color: '#2dd4bf' },
      { x: 640, y: 150, targetX: 640, targetY: 150, vx: 0, vy: 0, radius: 22, color: '#a855f7' },
    ];

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update & Draw Spring Nodes
      nodes.forEach((node, i) => {
        node.targetX = (canvas.width / 4) * (i + 1) + Math.sin(t + i) * 70;
        node.targetY = canvas.height / 2 + Math.cos(t * 1.5 + i) * 60;

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
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
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
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={800} height={460} className="w-full h-full object-cover" />;
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
      if (Math.random() < 0.14) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        packets.push({
          x: -40,
          y: 60 + Math.random() * (canvas.height - 120),
          speed: 3 + Math.random() * 3.5,
          id: packetSeq++,
          topic: topic.name,
          color: topic.color,
        });
      }

      // Draw Stream Channels
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1.5;
      [100, 230, 360].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      });

      // Update & Draw Packets
      packets.forEach((p) => {
        p.x += p.speed;

        // Packet Capsule
        ctx.fillStyle = 'rgba(15, 20, 30, 0.9)';
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y - 16, 140, 32, 8);
        ctx.fill();
        ctx.stroke();

        // Glowing Dot
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x + 16, p.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Packet ID Text
        ctx.font = '12px Geist Mono, monospace';
        ctx.fillStyle = '#f5f5f5';
        ctx.fillText(`#${p.id} ${p.topic.slice(0, 8)}`, p.x + 28, p.y + 4);
      });

      // Remove offscreen packets
      packets = packets.filter((p) => p.x < canvas.width + 160);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={800} height={460} className="w-full h-full object-cover" />;
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
    const barsCount = 36;

    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width - 60) / barsCount;

      for (let i = 0; i < barsCount; i++) {
        // Simulated FFT frequency value
        const freq = Math.abs(Math.sin(t + i * 0.25) * Math.cos(t * 0.7 + i * 0.1)) * 0.85 + 0.15;
        const barHeight = freq * (canvas.height - 100);

        const x = 30 + i * barWidth;
        const y = canvas.height - 40 - barHeight;

        // Gradient Bar
        const grad = ctx.createLinearGradient(0, canvas.height - 40, 0, 40);
        grad.addColorStop(0, '#3b82f6');
        grad.addColorStop(0.5, '#2dd4bf');
        grad.addColorStop(1, '#a855f7');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth - 4, barHeight);

        // Peak Indicator Cap
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y - 4, barWidth - 4, 3);
      }

      // Oscilloscope Trace Line on Top
      ctx.beginPath();
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x += 8) {
        const y = 80 + Math.sin(t * 2 + x * 0.02) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} width={800} height={460} className="w-full h-full object-cover" />;
}

/* 5. 3D Car Configurator & Scene Settings Studio */
function ProceduralSportsCarMesh({ color, wireframe }: { color: string; wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* 1. Aerodynamic Main Body Chassis */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[3.2, 0.45, 1.4]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          wireframe={wireframe}
        />
      </mesh>

      {/* 2. Front Hood Slope & Nose Cone */}
      <mesh position={[-1.2, 0.32, 0]} rotation={[0, 0, -Math.PI / 16]}>
        <boxGeometry args={[0.8, 0.38, 1.36]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          wireframe={wireframe}
        />
      </mesh>

      {/* 3. Front Air Splitter (Carbon Fiber) */}
      <mesh position={[-1.55, 0.16, 0]}>
        <boxGeometry args={[0.3, 0.08, 1.46]} />
        <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.9} wireframe={wireframe} />
      </mesh>

      {/* 4. Side Skirts */}
      {[0.72, -0.72].map((z, idx) => (
        <mesh key={idx} position={[0, 0.16, z]}>
          <boxGeometry args={[2.4, 0.12, 0.1]} />
          <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.8} wireframe={wireframe} />
        </mesh>
      ))}

      {/* 5. Sleek Tinted Glass Cabin Canopy */}
      <mesh position={[-0.1, 0.72, 0]}>
        <boxGeometry args={[1.4, 0.42, 1.15]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.05}
          metalness={0.95}
          wireframe={wireframe}
        />
      </mesh>

      {/* 6. Curved Windshield Slope */}
      <mesh position={[-0.8, 0.65, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <boxGeometry args={[0.5, 0.38, 1.14]} />
        <meshStandardMaterial
          color="#020617"
          roughness={0.05}
          metalness={0.95}
          wireframe={wireframe}
        />
      </mesh>

      {/* 7. Side Mirrors */}
      {[-0.65, 0.65].map((z, idx) => (
        <mesh key={idx} position={[-0.45, 0.62, z]}>
          <boxGeometry args={[0.15, 0.1, 0.22]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} wireframe={wireframe} />
        </mesh>
      ))}

      {/* 8. Rear Carbon Fiber High-Downforce Aero Wing */}
      <mesh position={[1.4, 0.82, 0]}>
        <boxGeometry args={[0.3, 0.08, 1.38]} />
        <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.9} wireframe={wireframe} />
      </mesh>
      {[-0.45, 0.45].map((z, idx) => (
        <mesh key={idx} position={[1.35, 0.66, z]}>
          <boxGeometry args={[0.08, 0.24, 0.08]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} wireframe={wireframe} />
        </mesh>
      ))}

      {/* 9. Sports Alloy Wheels & Red Brake Calipers */}
      {[
        [-1.0, 0.34, 0.72],
        [1.0, 0.34, 0.72],
        [-1.0, 0.34, -0.72],
        [1.0, 0.34, -0.72],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          {/* Rubber Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.22, 32]} />
            <meshStandardMaterial color="#09090b" roughness={0.6} metalness={0.4} wireframe={wireframe} />
          </mesh>
          {/* Silver Alloy Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.23, 16]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.15} metalness={0.95} wireframe={wireframe} />
          </mesh>
          {/* Red Brake Caliper */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.1, 0.14, 0.1]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.7} wireframe={wireframe} />
          </mesh>
        </group>
      ))}

      {/* 10. Front Laser Headlight Strips (Blue Glow) */}
      {[-0.45, 0.45].map((z, idx) => (
        <mesh key={idx} position={[-1.56, 0.38, z]}>
          <boxGeometry args={[0.06, 0.08, 0.35]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* 11. Rear Full-Width LED Tail Light Bar (Red Glow) */}
      <mesh position={[1.56, 0.42, 0]}>
        <boxGeometry args={[0.06, 0.08, 1.28]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={2.5} />
      </mesh>

      {/* 12. Quad Chrome Exhaust Pipes */}
      {[-0.28, -0.12, 0.12, 0.28].map((z, idx) => (
        <mesh key={idx} position={[1.58, 0.24, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.15, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={0.95} />
        </mesh>
      ))}

      {/* 13. Soft Ground Contact Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 2.6]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

function GLTFCarModel({ color, wireframe }: { color: string; wireframe: boolean }) {
  const gltf = useLoader(GLTFLoader, '/models/car.glb', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);
    loader.setCrossOrigin('anonymous');
  });

  const scene = gltf.scene;
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.03;
    }
  });

  const clonedScene = React.useMemo(() => {
    const clone = scene.clone(true);
    
    // Calculate bounding box to normalize model dimensions to ~3.5 units
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = maxDim > 0 ? 3.5 / maxDim : 1;
    
    clone.scale.setScalar(targetScale);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          const clonedMaterials = materials.map((m) => {
            const mat = (m as THREE.MeshStandardMaterial).clone();
            mat.wireframe = wireframe;

            const name = (mesh.name + ' ' + (m.name || '')).toLowerCase();

            const isNonBodyPart =
              name.includes('wheel') ||
              name.includes('tire') ||
              name.includes('rim') ||
              name.includes('glass') ||
              name.includes('window') ||
              name.includes('windshield') ||
              name.includes('light') ||
              name.includes('interior') ||
              name.includes('seat') ||
              name.includes('dashboard') ||
              name.includes('brake') ||
              name.includes('chrome') ||
              name.includes('black') ||
              name.includes('rubber') ||
              name.includes('mirror') ||
              name.includes('grille') ||
              name.includes('exhaust');

            const isBodyPaint =
              name.includes('body') ||
              name.includes('paint') ||
              name.includes('chassis') ||
              name.includes('car_body') ||
              name.includes('exterior') ||
              name.includes('fender') ||
              name.includes('hood') ||
              name.includes('door') ||
              name.includes('roof');

            // Recolor only body paint meshes; preserve original textures & non-body materials
            if ((isBodyPaint || (!isNonBodyPart && !mat.map)) && color) {
              mat.color = new THREE.Color(color);
            }

            return mat;
          });

          mesh.material = Array.isArray(mesh.material) ? clonedMaterials : clonedMaterials[0];
        }
      }
    });

    return clone;
  }, [scene, color, wireframe]);

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

// Preload GLTF model for fast initial display
try {
  useLoader.preload(GLTFLoader, '/models/car.glb');
} catch {
  // Preload fallback if unavailable
}

class CarErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function CarMesh({ color, wireframe }: { color: string; wireframe: boolean }) {
  return (
    <CarErrorBoundary fallback={<ProceduralSportsCarMesh color={color} wireframe={wireframe} />}>
      <React.Suspense fallback={<ProceduralSportsCarMesh color={color} wireframe={wireframe} />}>
        <GLTFCarModel color={color} wireframe={wireframe} />
      </React.Suspense>
    </CarErrorBoundary>
  );
}

function CarConfiguratorDemo() {
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark' | 'midnight'>('dark');
  const [carColor, setCarColor] = React.useState<string>('#3b82f6');
  const [autoRotate, setAutoRotate] = React.useState<boolean>(true);
  const [wireframe, setWireframe] = React.useState<boolean>(false);
  const [lightIntensity, setLightIntensity] = React.useState<number>(1.5);
  const [camPosition, setCamPosition] = React.useState<[number, number, number]>([-3.5, 2.2, 3.5]);

  const themeBgMap = {
    light: 'bg-slate-200',
    dark: 'bg-[#18181b]',
    midnight: 'bg-[#09090b]'
  };

  const colors = [
    { name: 'Silver', hex: '#cbd5e1' },
    { name: 'Slate', hex: '#1e293b' },
    { name: 'Electric Blue', hex: '#3b82f6' },
    { name: 'Sunset Gold', hex: '#f59e0b' },
    { name: 'Mint Emerald', hex: '#10b981' },
    { name: 'Crimson Red', hex: '#ef4444' }
  ];

  return (
    <div className={`relative h-full w-full ${themeBgMap[themeMode]} transition-colors duration-500 overflow-hidden flex items-center justify-center`}>
      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: camPosition, fov: 45 }}>
        <ambientLight intensity={lightIntensity * 0.5} />
        <directionalLight position={[5, 8, 5]} intensity={lightIntensity} />
        <pointLight position={[-5, 5, -5]} color={carColor} intensity={lightIntensity * 1.2} />
        <CarMesh color={carColor} wireframe={wireframe} />
        <OrbitControls
          enableZoom={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />
      </Canvas>

      {/* Floating Interactive Settings Drawer Overlay */}
      <div className="absolute top-4 right-4 z-20 w-72 rounded-2xl bg-white/95 text-slate-900 dark:bg-neutral-900/95 dark:text-slate-100 p-4 border border-white/20 shadow-2xl backdrop-blur-xl font-sans text-xs space-y-4 max-h-[90%] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
          <span className="font-bold text-sm tracking-tight">Scene Settings</span>
          <span className="font-mono text-[10px] text-blue-500 font-semibold uppercase">3D WEBGL POC</span>
        </div>

        {/* Theme Mode Selector */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">THEME MODE</span>
          <div className="grid grid-cols-3 gap-1">
            {(['light', 'dark', 'midnight'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setThemeMode(mode)}
                className={`py-1 rounded-lg text-[10px] font-semibold capitalize border transition-all ${
                  themeMode === mode
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {mode === 'light' ? 'Studio Light' : mode === 'dark' ? 'Dark Studio' : 'Midnight'}
              </button>
            ))}
          </div>
        </div>

        {/* Car Color Palette Swatches */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">CAR COLOR PALETTE</span>
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setCarColor(c.hex)}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                className={`h-6 w-6 rounded-full border-2 transition-transform ${
                  carColor === c.hex ? 'scale-125 border-blue-500 shadow-md' : 'border-white/50 opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Auto Rotate & Wireframe Toggles */}
        <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[11px]">Auto Rotate</span>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${autoRotate ? 'bg-blue-600' : 'bg-slate-300 dark:bg-white/20'}`}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-transform ${autoRotate ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-[11px]">Wireframe Mode</span>
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${wireframe ? 'bg-blue-600' : 'bg-slate-300 dark:bg-white/20'}`}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-transform ${wireframe ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Camera Angle Presets */}
        <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-white/10">
          <span className="font-mono text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">CAMERA PRESETS</span>
          <div className="grid grid-cols-3 gap-1 text-[10px]">
            {[
              { label: 'Isometric', pos: [-3.5, 2.2, 3.5] },
              { label: 'Front', pos: [-4.2, 0.4, 0] },
              { label: 'Rear', pos: [4.2, 0.4, 0] },
              { label: 'Top', pos: [0.01, 5, 0.01] },
              { label: 'Left', pos: [0, 0.4, 4.2] },
              { label: 'Right', pos: [0, 0.4, -4.2] }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setCamPosition(preset.pos as [number, number, number])}
                className="py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:bg-blue-600 hover:text-white transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Intensity Slider */}
        <div className="space-y-1 pt-1 border-t border-slate-200 dark:border-white/10">
          <div className="flex justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400">
            <span>LIGHTING INTENSITY</span>
            <span>{lightIntensity.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={lightIntensity}
            onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
            className="w-full h-1 bg-slate-300 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-300 bg-black/80 px-3.5 py-1.5 rounded-full border border-white/15 shadow-md">
        THREE.JS & ANGULAR // 3D CAR SCENE STUDIO POC
      </div>
    </div>
  );
}

export function PlaygroundCanvas({ demoId }: { demoId: string }) {
  return (
    <div className="h-full w-full relative border border-white/10 flex items-center justify-center bg-black/90 rounded-3xl overflow-hidden">
      {demoId === 'threejs-lab' && (
        <>
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <pointLight position={[-5, -5, -5]} color="#2dd4bf" intensity={2} />
            <MultiGeometryScene />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
          <div className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-300 bg-black/80 px-3 py-1.5 rounded-full border border-white/15 shadow-md">
            THREE.JS & DREI // DRAG TO ROTATE 3D MESHES
          </div>
        </>
      )}

      {demoId === 'motion-physics' && (
        <>
          <PhysicsMotionCanvas />
          <div className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-300 bg-black/80 px-3 py-1.5 rounded-full border border-white/15 shadow-md">
            FRAMER MOTION // SPRING VELOCITY VECTOR FIELD
          </div>
        </>
      )}

      {demoId === 'data-stream' && (
        <>
          <DataStreamCanvas />
          <div className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-300 bg-black/80 px-3 py-1.5 rounded-full border border-white/15 shadow-md">
            RXJS & WEBSOCKETS // REAL-TIME PUB/SUB CONVEYOR
          </div>
        </>
      )}

      {demoId === 'audio-visualizer' && (
        <>
          <AudioSpectrumCanvas />
          <div className="absolute bottom-4 left-4 font-mono text-[11px] text-neutral-300 bg-black/80 px-3 py-1.5 rounded-full border border-white/15 shadow-md">
            WEB AUDIO API // 32-BIN FFT OSCILLOSCOPE
          </div>
        </>
      )}

      {demoId === '3d-car-configurator' && (
        <CarConfiguratorDemo />
      )}
    </div>
  );
}
