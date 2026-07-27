import { ExperienceItem } from '@/types';

export const experienceItems: ExperienceItem[] = [
  {
    id: 'robosoft',
    company: 'Robosoft Technologies',
    role: 'Software Engineer',
    location: 'India',
    period: 'July 2025 – Present',
    isCurrent: true,
    summary: 'Architecting high-scale enterprise platforms and mobile applications, establishing cross-platform design systems, and engineering native media hardware integrations.',
    logoText: 'RT',
    responsibilities: [
      'Engineered core architecture for BSI Connect & Connect Assistant enterprise audit and compliance suites.',
      'Designed and deployed a unified, reusable Design System library across Angular and React Native codebases, cutting UI development time by 40%.',
      'Built high-performance Enterprise Search modules with real-time indexing, multi-attribute filtering, and zero-latency UI rendering.',
      'Implemented advanced custom Canvas Charts & Data Visualization suites for enterprise reporting dashboards.',
      'Integrated native camera hardware, real-time image annotation, cropping, and compression pipelines in React Native.'
    ],
    impact: [
      {
        metric: '40%',
        label: 'Velocity Increase',
        detail: 'Accelerated feature rollout across 4 squad teams via unified cross-platform design system tokens.'
      },
      {
        metric: '<50ms',
        label: 'Search Latency',
        detail: 'Optimized client-side indexing and query parsing for 100k+ audit records.'
      },
      {
        metric: '99.9%',
        label: 'Crash-Free Rate',
        detail: 'Maintained rock-solid reliability across iOS/Android camera hardware annotation pipelines.'
      }
    ],
    techStack: [
      'React Native',
      'Angular',
      'TypeScript',
      'Kendo UI',
      'Canvas & SVG Graphics',
      'Camera APIs',
      'Enterprise Search Architecture',
      'State Management'
    ],
    featuredProjects: ['BSI Connect', 'Connect Assistant', 'Unified Design System']
  },
  {
    id: 'associate-se',
    company: 'Associate Software Engineer',
    role: 'Frontend Systems Engineer',
    location: 'India / Remote & Client Engagements',
    period: 'Prior Engagements',
    isCurrent: false,
    summary: 'Engineered mission-critical web applications for financial services (UTI Mutual Funds), international non-profits (Room To Read), and global networks (TBN).',
    logoText: 'ASE',
    responsibilities: [
      'Delivered secure, accessible investor web portals and interactive portfolio analytics for UTI Mutual Funds.',
      'Developed high-impact multi-lingual digital web platforms for Room To Read, enhancing literacy content accessibility across global regions.',
      'Architected scalable Next.js and React frontend applications for TBN network platform with server-rendered dynamic content.',
      'Maintained 100% WCAG 2.1 AA accessibility compliance across public-facing web portals.'
    ],
    impact: [
      {
        metric: '100%',
        label: 'WCAG AA Accessibility',
        detail: 'Audited and refactored core user flows for keyboard accessibility and screen readers.'
      },
      {
        metric: '35%',
        label: 'LCP Improvement',
        detail: 'Boosted Core Web Vitals score through Next.js server-side caching and dynamic image optimization.'
      }
    ],
    techStack: [
      'Next.js',
      'React',
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'REST APIs',
      'State Orchestration'
    ],
    featuredProjects: ['UTI Investor Portal', 'Room To Read Digital Library', 'TBN Network Portal']
  },
  {
    id: 'iisc-bangalore',
    company: 'IISc Bangalore (Indian Institute of Science)',
    role: 'Software Engineering Intern',
    location: 'India',
    period: 'Academic Internship',
    isCurrent: false,
    summary: 'Contributed to cutting-edge research in Speech Recognition (ASR) systems, constructing audio signal visualizers and real-time transcription interfaces.',
    logoText: 'IISc',
    responsibilities: [
      'Engineered interactive React interfaces for automated speech recognition (ASR) dataset visualization and annotation.',
      'Integrated real-time Web Audio API signal waveforms and spectral visualizers with neural model transcription outputs.',
      'Collaborated with AI researchers to optimize audio stream buffer chunking for low-latency live speech processing.'
    ],
    impact: [
      {
        metric: '60fps',
        label: 'Audio Rendering',
        detail: 'Smooth canvas audio waveform rendering during live microphone streaming.'
      },
      {
        metric: 'Real-Time',
        label: 'ASR Preview',
        detail: 'Seamlessly linked WebSocket audio streams to deep learning transcription endpoints.'
      }
    ],
    techStack: [
      'React',
      'Web Audio API',
      'Speech Recognition (ASR)',
      'WebSockets',
      'TypeScript',
      'Canvas Graphics'
    ],
    featuredProjects: ['ASR Dataset Annotator', 'Live Audio Waveform Engine']
  }
];
