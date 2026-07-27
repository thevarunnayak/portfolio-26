import { PlaygroundItem } from '@/types';

export const playgroundData: PlaygroundItem[] = [
  {
    id: 'exp-threejs-lab',
    title: '3D Multi-Geometry WebGL Shader Laboratory',
    description: 'Interactive 3D WebGL scene showcasing multi-geometry meshes (Torus Knot, Octahedron, Geodesic Sphere) with custom specular lighting and OrbitControls.',
    category: '3D/WebGL (Three.js)',
    tech: ['Three.js', 'React Three Fiber', 'Drei', 'GLSL Shaders'],
    interactiveDemoId: 'threejs-lab',
    githubLink: 'https://github.com/varunnayak/threejs-shader-lab',
    liveDemoUrl: 'https://threejs-lab.varunnayak.com'
  },
  {
    id: 'exp-motion-physics',
    title: 'Layout Spring & Velocity Motion Engine',
    description: 'Interactive spring dampening, magnetic drag nodes, and velocity vector tracking playground for fluid UI motion design.',
    category: 'Motion Design (Framer & GSAP)',
    tech: ['Framer Motion', 'GSAP', 'TypeScript', 'Spring Physics'],
    interactiveDemoId: 'motion-physics',
    githubLink: 'https://github.com/varunnayak/motion-physics-engine',
    liveDemoUrl: 'https://motion.varunnayak.com'
  },
  {
    id: 'exp-data-stream',
    title: 'Real-Time Pub/Sub Data Stream Synthesizer',
    description: 'Live event stream simulator demonstrating WebSocket pub/sub packet channels, RxJS buffer transformations, and reactive state machine transitions.',
    category: 'Data Architecture (RxJS/WebSockets)',
    tech: ['RxJS', 'WebSockets', 'React State', 'Canvas 2D'],
    interactiveDemoId: 'data-stream',
    githubLink: 'https://github.com/varunnayak/rxjs-stream-synthesizer',
    liveDemoUrl: 'https://stream.varunnayak.com'
  },
  {
    id: 'exp-audio-visualizer',
    title: 'Web Audio API Frequency Spectrum Engine',
    description: 'High-frequency spectral waveform and FFT oscilloscope visualizer simulating real-time Web Audio API signal processing.',
    category: 'Hardware APIs (Web Audio API)',
    tech: ['Web Audio API', 'Canvas 2D', 'FFT Oscilloscope', 'TypeScript'],
    interactiveDemoId: 'audio-visualizer',
    githubLink: 'https://github.com/varunnayak/web-audio-spectrum',
    liveDemoUrl: 'https://audio.varunnayak.com'
  }
];
