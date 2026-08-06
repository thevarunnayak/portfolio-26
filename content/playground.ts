import { PlaygroundItem } from '@/types';

export const playgroundData: PlaygroundItem[] = [
  {
    id: 'exp-threejs-lab',
    title: '3D Multi-Geometry WebGL Shader Laboratory',
    description: 'Interactive 3D WebGL scene showcasing multi-geometry meshes (Torus Knot, Octahedron, Geodesic Sphere) with custom specular lighting and OrbitControls.',
    category: '3D/WebGL (Three.js)',
    tech: ['Three.js', 'React Three Fiber', 'Drei', 'GLSL Shaders'],
    interactiveDemoId: 'threejs-lab',
    previewImage: '/images/playground/threejs-lab.svg',
    githubLink: 'https://github.com/thevarunnayak/threejs-shader-lab',
    liveDemoUrl: 'https://threejs-lab.varunnayak.com'
  },
  {
    id: 'exp-motion-physics',
    title: 'Layout Spring & Velocity Motion Engine',
    description: 'Interactive spring dampening, magnetic drag nodes, and velocity vector tracking playground for fluid UI motion design.',
    category: 'Motion Design (Framer & GSAP)',
    tech: ['Framer Motion', 'GSAP', 'TypeScript', 'Spring Physics'],
    interactiveDemoId: 'motion-physics',
    previewImage: '/images/playground/motion-physics.svg',
    githubLink: 'https://github.com/thevarunnayak/motion-physics-engine',
    liveDemoUrl: 'https://motion.varunnayak.com'
  },
  {
    id: 'exp-data-stream',
    title: 'Real-Time Pub/Sub Data Stream Synthesizer',
    description: 'Live event stream simulator demonstrating WebSocket pub/sub packet channels, RxJS buffer transformations, and reactive state machine transitions.',
    category: 'Data Architecture (RxJS/WebSockets)',
    tech: ['RxJS', 'WebSockets', 'React State', 'Canvas 2D'],
    interactiveDemoId: 'data-stream',
    previewImage: '/images/playground/data-stream.svg',
    githubLink: 'https://github.com/thevarunnayak/rxjs-stream-synthesizer',
    liveDemoUrl: 'https://stream.varunnayak.com'
  },
  {
    id: 'exp-audio-visualizer',
    title: 'Web Audio API Frequency Spectrum Engine',
    description: 'High-frequency spectral waveform and FFT oscilloscope visualizer simulating real-time Web Audio API signal processing.',
    category: 'Hardware APIs (Web Audio API)',
    tech: ['Web Audio API', 'Canvas 2D', 'FFT Oscilloscope', 'TypeScript'],
    interactiveDemoId: 'audio-visualizer',
    previewImage: '/images/playground/audio-visualizer.svg',
    githubLink: 'https://github.com/thevarunnayak/web-audio-spectrum',
    liveDemoUrl: 'https://audio.varunnayak.com'
  },
  {
    id: 'exp-3d-car-configurator',
    title: 'Interactive 3D Car Configurator & Scene Studio',
    description: 'WebGL 3D vehicle rendering engine featuring studio lighting presets, custom metallic color palettes, camera angle presets, wireframe mode, and OrbitControls.',
    category: '3D/WebGL (Three.js & Angular)',
    tech: ['Three.js', 'Angular / React', 'WebGL', 'OrbitControls', 'GLSL Shaders'],
    interactiveDemoId: '3d-car-configurator',
    previewImage: '/projects/car-configurator.png',
    githubLink: 'https://github.com/thevarunnayak/car-angular',
    liveDemoUrl: 'https://car-angular.vercel.app'
  }
];

export function getPlaygroundItemById(id: string): PlaygroundItem | undefined {
  return playgroundData.find((item) => item.id === id);
}

export function getAllPlaygroundIds(): string[] {
  return playgroundData.map((item) => item.id);
}
