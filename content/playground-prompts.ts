export interface PlaygroundDetail {
  id: string;
  title: string;
  category: string;
  libraryUsed: string;
  developerPurpose: string;
  techStack: string[];
  architectureInsights: string[];
  aiPrompt?: string;
  liveDemoUrl: string;
  githubUrl: string;
}

export const playgroundDetails: PlaygroundDetail[] = [
  {
    id: 'exp-threejs-lab',
    title: '3D Multi-Geometry WebGL Shader Laboratory',
    category: '3D & Graphics Engine',
    libraryUsed: 'Three.js & React Three Fiber (@react-three/fiber & @react-three/drei)',
    developerPurpose: 'Engineered to render hardware-accelerated 3D graphics, spatial data, product models, and custom specular GLSL shaders directly in web browsers.',
    techStack: ['Three.js', 'React Three Fiber', 'Drei', 'GLSL Shaders'],
    architectureInsights: [
      'Configures a WebGL 2.0 rendering context via Three.js WebGLRenderer.',
      'Employs RequestAnimationFrame delta-time animation calculations for smooth 60fps rendering.',
      'Separates geometry buffer generation from material uniforms for optimal GPU memory management.'
    ],
    liveDemoUrl: 'https://threejs-lab.varunnayak.com',
    githubUrl: 'https://github.com/thevarunnayak/threejs-shader-lab'
  },
  {
    id: 'exp-motion-physics',
    title: 'Layout Spring & Velocity Motion Engine',
    category: 'UI Motion & Physics',
    libraryUsed: 'Framer Motion & GSAP (GreenSock Animation Platform)',
    developerPurpose: 'Engineered for fluid micro-interactions, spring dampening, layout animations, and gesture-driven UI components without layout thrashing.',
    techStack: ['Framer Motion', 'GSAP', 'TypeScript', 'Spring Physics'],
    architectureInsights: [
      'Uses Framer Motion useMotionValue and useVelocity hooks to eliminate React re-renders during high-frequency mouse drag events.',
      'Leverages GSAP Flip plugin for layout shifts with zero layout thrashing.',
      'Applies CSS transform 3D matrix acceleration for hardware GPU composition.'
    ],
    liveDemoUrl: 'https://motion.varunnayak.com',
    githubUrl: 'https://github.com/thevarunnayak/motion-physics-engine'
  },
  {
    id: 'exp-data-stream',
    title: 'Real-Time Pub/Sub Data Stream Synthesizer',
    category: 'State & Real-Time Data Architecture',
    libraryUsed: 'RxJS (Reactive Extensions) & WebSocket API',
    developerPurpose: 'Architected to process asynchronous data streams, manage real-time WebSocket pipelines, and control reactive event channels.',
    techStack: ['RxJS', 'WebSockets', 'React State', 'Canvas 2D API'],
    architectureInsights: [
      'Uses RxJS Subject and Observable pipelines (filter, throttleTime, map) to decouple data generation from UI consumption.',
      'Employs ring buffer data structures to prevent unbounded memory growth during continuous streaming.',
      'Canvas 2D requestAnimationFrame rendering loop for zero-lag 60fps packet animations.'
    ],
    liveDemoUrl: 'https://stream.varunnayak.com',
    githubUrl: 'https://github.com/thevarunnayak/rxjs-stream-synthesizer'
  },
  {
    id: 'exp-audio-visualizer',
    title: 'Web Audio API Frequency Spectrum Engine',
    category: 'Hardware & Audio Signal Processing',
    libraryUsed: 'Web Audio API (AudioContext & AnalyserNode)',
    developerPurpose: 'Engineered with native browser AudioContext capabilities to process, analyze, synthesize, and visualize real-time audio signals.',
    techStack: ['Web Audio API', 'Canvas 2D API', 'FFT Oscilloscope', 'TypeScript'],
    architectureInsights: [
      'Creates a native AudioContext and AnalyserNode to compute Fast Fourier Transform (FFT) frequency data.',
      'Reads getByteFrequencyData and getByteTimeDomainData Uint8Arrays per frame.',
      'Renders high-definition gradients and glowing oscilloscope traces on Canvas 2D.'
    ],
    liveDemoUrl: 'https://audio.varunnayak.com',
    githubUrl: 'https://github.com/thevarunnayak/web-audio-spectrum'
  },
  {
    id: 'exp-3d-car-configurator',
    title: 'Interactive 3D Car Configurator & Scene Studio',
    category: '3D WebGL Configurator Engine',
    libraryUsed: 'Three.js & Angular / React WebGL (OrbitControls & MeshStandardMaterial)',
    developerPurpose: 'Engineered as a proof-of-concept interactive 3D product configurator. Demonstrates real-time PBR material color updates, studio lighting environments, camera matrix interpolation presets, and wireframe mesh debugging.',
    techStack: ['Three.js', 'Angular / React', 'WebGL', 'OrbitControls', 'GLSL Shaders'],
    architectureInsights: [
      'Configures dynamic studio environment light maps (Studio Light, Dark Studio, Midnight) with real-time shadow planes.',
      'Interpolates camera matrix vectors for smooth 60fps transitions across 6 camera angle presets (Isometric, Front, Rear, Top, Left, Right).',
      'Provides live mesh debugging via wireframe mode toggles and PBR specular roughness/metalness uniforms.'
    ],
    liveDemoUrl: 'https://car-angular.vercel.app',
    githubUrl: 'https://github.com/thevarunnayak/car-angular'
  }
];

export function getPlaygroundDetailById(id: string): PlaygroundDetail | undefined {
  return playgroundDetails.find((item) => item.id === id);
}
