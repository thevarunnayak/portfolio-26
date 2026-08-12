import { PlaygroundItem } from '@/types';

export const playgroundData: PlaygroundItem[] = [
  {
    id: 'exp-threejs-lab',
    title: '3D Multi-Geometry WebGL Shader Laboratory',
    description: 'Interactive 3D WebGL scene showcasing multi-geometry meshes (Torus Knot, Octahedron, Geodesic Sphere) with custom specular lighting and OrbitControls.',
    category: '3D/WebGL (Three.js)',
    tech: ['Three.js', 'React Three Fiber', 'Drei', 'GLSL Shaders'],
    libraryUsed: 'Three.js & React Three Fiber (@react-three/fiber & @react-three/drei)',
    developerPurpose: 'Engineered to render hardware-accelerated 3D graphics, spatial data, product models, and custom specular GLSL shaders directly in web browsers.',
    architectureInsights: [
      'Configures a WebGL 2.0 rendering context via Three.js WebGLRenderer.',
      'Employs RequestAnimationFrame delta-time animation calculations for smooth 60fps rendering.',
      'Separates geometry buffer generation from material uniforms for optimal GPU memory management.'
    ],
    interactiveDemoId: 'threejs-lab',
    previewImage: '/images/playground/threejs-lab.svg',
    liveDemoUrl: 'https://geometrylab.vercel.app/',
    githubUrl: 'https://github.com/thevarunnayak/threejs-shader-lab'
  },
  {
    id: 'exp-motion-physics',
    title: 'Layout Spring & Velocity Motion Engine',
    description: 'Interactive spring dampening, magnetic drag nodes, and velocity vector tracking playground for fluid UI motion design.',
    category: 'Motion Design (Framer & GSAP)',
    tech: ['Framer Motion', 'GSAP', 'TypeScript', 'Spring Physics'],
    libraryUsed: 'Framer Motion & GSAP (GreenSock Animation Platform)',
    developerPurpose: 'Engineered for fluid micro-interactions, spring dampening, layout animations, and gesture-driven UI components without layout thrashing.',
    architectureInsights: [
      'Uses Framer Motion useMotionValue and useVelocity hooks to eliminate React re-renders during high-frequency mouse drag events.',
      'Leverages GSAP Flip plugin for layout shifts with zero layout thrashing.',
      'Applies CSS transform 3D matrix acceleration for hardware GPU composition.'
    ],
    interactiveDemoId: 'motion-physics',
    previewImage: '/images/playground/motion-physics.svg',
    liveDemoUrl: 'https://motionphysicslab.vercel.app/',
    githubUrl: 'https://github.com/thevarunnayak/motion-physics-engine'
  },
  {
    id: 'exp-data-stream',
    title: 'Real-Time Pub/Sub Data Stream Synthesizer',
    description: 'Live event stream simulator demonstrating WebSocket pub/sub packet channels, RxJS buffer transformations, and reactive state machine transitions.',
    category: 'RxJS/WebSockets',
    tech: ['RxJS', 'WebSockets', 'React State', 'Canvas 2D'],
    libraryUsed: 'RxJS (Reactive Extensions) & WebSocket API',
    developerPurpose: 'Architected to process asynchronous data streams, manage real-time WebSocket pipelines, and control reactive event channels.',
    architectureInsights: [
      'Uses RxJS Subject and Observable pipelines (filter, throttleTime, map) to decouple data generation from UI consumption.',
      'Employs ring buffer data structures to prevent unbounded memory growth during continuous streaming.',
      'Canvas 2D requestAnimationFrame rendering loop for zero-lag 60fps packet animations.'
    ],
    interactiveDemoId: 'data-stream',
    previewImage: '/images/playground/data-stream.svg',
    liveDemoUrl: 'https://streamsynth.vercel.app/',
    githubUrl: 'https://github.com/thevarunnayak/rxjs-stream-synthesizer'
  },
  {
    id: 'exp-audio-visualizer',
    title: 'Web Audio API Frequency Spectrum Engine',
    description: 'High-frequency spectral waveform and FFT oscilloscope visualizer simulating real-time Web Audio API signal processing.',
    category: 'Hardware APIs (Web Audio API)',
    tech: ['Web Audio API', 'Canvas 2D', 'FFT Oscilloscope', 'TypeScript'],
    libraryUsed: 'Web Audio API (AudioContext & AnalyserNode)',
    developerPurpose: 'Engineered with native browser AudioContext capabilities to process, analyze, synthesize, and visualize real-time audio signals.',
    architectureInsights: [
      'Creates a native AudioContext and AnalyserNode to compute Fast Fourier Transform (FFT) frequency data.',
      'Reads getByteFrequencyData and getByteTimeDomainData Uint8Arrays per frame.',
      'Renders high-definition gradients and glowing oscilloscope traces on Canvas 2D.'
    ],
    interactiveDemoId: 'audio-visualizer',
    previewImage: '/images/playground/audio-visualizer.svg',
    liveDemoUrl: 'https://audiosgnallab.vercel.app/',
    githubUrl: 'https://github.com/thevarunnayak/web-audio-spectrum'
  },
  {
    id: 'exp-3d-car-configurator',
    title: 'Interactive 3D Car Configurator & Scene Studio',
    description: 'WebGL 3D vehicle rendering engine featuring studio lighting presets, custom metallic color palettes, camera angle presets, wireframe mode, and OrbitControls.',
    category: '3D/WebGL (Three.js & Angular)',
    tech: ['Three.js', 'Angular / React', 'WebGL', 'OrbitControls', 'GLSL Shaders'],
    libraryUsed: 'Three.js & Angular / React WebGL (OrbitControls & MeshStandardMaterial)',
    developerPurpose: 'Engineered as a proof-of-concept interactive 3D product configurator. Demonstrates real-time PBR material color updates, studio lighting environments, camera matrix interpolation presets, and wireframe mesh debugging.',
    architectureInsights: [
      'Configures dynamic studio environment light maps (Studio Light, Dark Studio, Midnight) with real-time shadow planes.',
      'Interpolates camera matrix vectors for smooth 60fps transitions across 6 camera angle presets (Isometric, Front, Rear, Top, Left, Right).',
      'Provides live mesh debugging via wireframe mode toggles and PBR specular roughness/metalness uniforms.'
    ],
    interactiveDemoId: '3d-car-configurator',
    previewImage: '/projects/car-configurator.png',
    liveDemoUrl: 'https://car-angular.vercel.app/',
    githubUrl: 'https://github.com/thevarunnayak/car-angular'
  }
];

export function getPlaygroundItemById(id: string): PlaygroundItem | undefined {
  return playgroundData.find((item) => item.id === id);
}

export function getAllPlaygroundIds(): string[] {
  return playgroundData.map((item) => item.id);
}

/** Alias kept for backward-compatibility with the detail page import. */
export const getPlaygroundDetailById = getPlaygroundItemById;
