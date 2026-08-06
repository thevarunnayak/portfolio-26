import { ProjectCaseStudy } from '@/types';

export const projectsData: ProjectCaseStudy[] = [
  // Rank 1: Mobile-First Habit & Growth Platform (React Native & Supabase)
  {
    id: 'odyssey',
    slug: 'odyssey',
    title: 'Odyssey',
    tagline: 'Mobile-first habit-building experience that transforms everyday routines into an expressive personal journey.',
    category: 'Mobile & Cross-Platform',
    featured: true,
    period: '2025 – 2026',
    heroImage: '/projects/odyssey/hero.png',
    galleryImages: [
      '/projects/odyssey/today.png',
      '/projects/odyssey/streaks.png',
      '/projects/odyssey/analytics.png'
    ],
    galleryColumns: 3,
    overview: 'Odyssey is a mobile-first habit-building app that transforms daily routines into an evolving personal journey. Combining lightweight gamification, streak progression, and a bold Gen-Z visual identity inspired by classical myth, Odyssey encourages long-term consistency over perfection.',
    problem: 'Traditional habit trackers feel clinical, boring, and productivity-focused, causing high drop-off rates when users fail to meet rigid daily checkboxes or break a single streak.',
    solution: 'Engineered a mobile-first React Native & Expo app backed by Supabase OTP authentication and PostgreSQL that celebrates momentum, tracks visual progress history, and uses encouraging journey-based UX writing.',
    architecture: {
      summary: 'React Native & Expo mobile application with centralized design tokens and Supabase Auth & PostgreSQL database.',
      nodes: [
        { id: '1', label: 'React Native UI', sub: 'Expo & Centralized Design Tokens', type: 'client' },
        { id: '2', label: 'Theme & Motion Engine', sub: 'Light/Dark & Haptic Micro-Interactions', type: 'client' },
        { id: '3', label: 'Supabase BaaS', sub: 'OTP Auth & PostgreSQL DB', type: 'server' }
      ],
      dataFlow: [
        'User completes habit -> Micro-interaction triggers XP & streak update',
        'Habit state persists -> Supabase PostgreSQL stores completion timestamps',
        'Journey view updates -> Weekly consistency & milestone progress visualized'
      ]
    },
    metrics: [
      { label: 'Target Audience', value: 'Gen Z', description: 'Designed for young adults seeking engaging routine building' },
      { label: 'Core Metric', value: 'Consistency', description: 'Focuses on momentum & progress over streak perfection' }
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Design System'],
    features: [
      {
        title: 'Journey-Based Habit Tracking',
        description: 'Replaces generic checklists with progressive streak histories, personal milestones, and encouraging milestone celebrations.'
      },
      {
        title: 'Gamified Progression & XP',
        description: 'Lightweight leveling system earning XP for daily completions while avoiding clinical productivity pressure.'
      },
      {
        title: 'Expressive Gen-Z Visual Identity & Dual Themes',
        description: 'Bold green palette with classical Odyssey line-art illustrations, Cinzel typography, and full light/dark theme support.'
      }
    ],
    challenges: [
      'Designing gamified progression mechanics that feel rewarding without cluttering the fast daily habit completion workflow.'
    ],
    lessons: [
      'Prioritizing encouraging UX copy and progress momentum over punitive streak-break alerts leads to significantly better long-term retention.'
    ],
    liveUrl: 'https://odysseyxp.vercel.app/',
    githubUrl: ''
  },

  /*
  // Rank 2: 3D & Graphics Engine (Three.js & GSAP)
  {
    id: 'apple-iphone-15-pro',
    slug: 'apple-iphone-15-pro-3d',
    title: 'Apple iPhone 15 Pro 3D Showcase',
    tagline: 'Hardware-accelerated 3D WebGL product experience powered by Three.js and GSAP scroll timelines.',
    category: '3D & Graphics',
    featured: false,
    period: '2024',
    heroImage: '/projects/iphone-15-pro.png',
    galleryImages: [
      '/projects/iphone-15-pro.png'
    ],
    overview: 'An interactive 3D WebGL web experience recreating Apple’s iconic iPhone 15 Pro launch website. Features 360° interactive 3D Titanium chassis models, GSAP ScrollTrigger timeline animations, video carousel controls, and dynamic color/size switcher.',
    problem: 'Standard 2D product landing pages fail to convey the tactile metallic feel, camera geometry, and spatial elegance of high-end hardware products.',
    solution: 'Engineered a WebGL 3D canvas pipeline using Three.js (@react-three/fiber), custom PBR metallic shaders, and GSAP ScrollTrigger synchronized timeline animations.',
    architecture: {
      summary: 'Three.js 3D WebGL viewport synchronized with GSAP ScrollTrigger timelines for scroll-bound camera movements.',
      nodes: [
        { id: '1', label: 'React / Next.js', sub: 'UI Layout & State Controls', type: 'client' },
        { id: '2', label: 'Three.js / R3F', sub: '3D Titanium Model & GLTF Loader', type: 'client' },
        { id: '3', label: 'GSAP ScrollTrigger', sub: 'Scroll-Bound Camera Timelines', type: 'client' }
      ],
      dataFlow: [
        'User scrolls -> GSAP ScrollTrigger interpolates camera matrix position',
        'Model color pick -> Three.js material color uniforms update dynamically',
        'Video carousel -> RequestAnimationFrame syncs synchronized playback'
      ]
    },
    metrics: [
      { label: 'Render FPS', value: '60fps', description: 'Smooth GPU-accelerated 3D model rotation and lighting' },
      { label: '3D Model Size', value: 'Compressed', description: 'Draco GLTF mesh compression for ultra-fast load times' }
    ],
    techStack: ['Three.js', 'React Three Fiber', 'GSAP', 'ScrollTrigger', 'React', 'Tailwind CSS'],
    features: [
      {
        title: '360° Interactive 3D Model Viewport',
        description: 'Interactive Titanium iPhone 15 Pro 3D mesh with real-time metallic reflections and OrbitControls.'
      },
      {
        title: 'GSAP ScrollTrigger Timelines',
        description: 'Scroll-driven camera transitions zooming into the A17 Pro chip and Titanium chassis.'
      }
    ],
    challenges: [
      'Maintaining 60fps rendering performance while running complex GLSL specular reflections alongside high-definition video playback.'
    ],
    lessons: [
      'Disposing geometry buffers and texture maps upon component unmount prevents GPU VRAM memory leaks.'
    ],
    liveUrl: 'https://iphone-3d.example.com',
    githubUrl: 'https://github.com/thevarunnayak/apple-iphone-3d'
  },
  */

  // Rank 3: Reactive Signals SPA & Appwrite Cloud BaaS Workspace
  {
    id: 'planzy',
    slug: 'planzy-productivity-workspace',
    title: 'Planzy',
    tagline: 'Modern visual project management & productivity platform with a playful bubblegum-inspired design.',
    category: 'Full-Stack',
    featured: true,
    period: '2025',
    heroImage: '/projects/planzy/hero.png',
    galleryImages: [
      '/projects/planzy/kanban.png',
      '/projects/planzy/calendar.png',
      '/projects/planzy/analytics.png',
      '/projects/planzy/task-detail.png'
    ],
    columnGroups: [
      [
        '/projects/planzy/kanban.png',
        '/projects/planzy/calendar.png',
        '/projects/planzy/analytics.png'
      ],
      [
        '/projects/planzy/task-detail.png'
      ]
    ],
    overview: 'Planzy is a modern Kanban-based productivity platform built with Angular 20+ and Appwrite Cloud that combines visual project management with a playful, bubblegum-inspired user experience. Designed for individuals, freelancers, and small teams, Planzy simplifies task organization through responsive drag-and-drop Kanban boards, interactive checklists, calendar views, and integrated focus session timers.',
    problem: 'Existing project management tools lean toward two extremes: either overly complex and enterprise-heavy (Jira, Trello) or generic and visually uninspiring, making daily planning feel administrative rather than creative.',
    solution: 'Engineered a highly responsive Angular SPA using reactive Signals for fine-grained state management, standalone components, SCSS glassmorphic design tokens, and Appwrite Cloud BaaS for authentication, database collections, and attachment storage.',
    architecture: {
      summary: 'Angular 20+ standalone component architecture with fine-grained Signals reactive state layer backed by Appwrite Cloud BaaS.',
      nodes: [
        { id: '1', label: 'Angular 20+ UI', sub: 'Standalone Components & SCSS Design Tokens', type: 'client' },
        { id: '2', label: 'Angular Signals', sub: 'Fine-Grained Reactive State Management', type: 'client' },
        { id: '3', label: 'Appwrite Cloud BaaS', sub: 'Auth, Database Collections & Storage Buckets', type: 'server' }
      ],
      dataFlow: [
        'User drags task card -> Angular CDK updates local Signals state in <2ms',
        'State change syncs -> Appwrite SDK updates database collection & storage bucket',
        'Focus session completes -> Productivity analytics dashboard updates progress metrics'
      ]
    },
    metrics: [
      { label: 'State Latency', value: '<2ms', description: 'Fine-grained DOM updates via Angular Signals' },
      { label: 'Cloud Infrastructure', value: 'Serverless', description: 'Appwrite Cloud BaaS auth, database, and file storage' }
    ],
    techStack: ['Angular', 'TypeScript', 'Signals', 'Angular CDK', 'SCSS', 'Appwrite', 'Vercel'],
    features: [
      {
        title: 'Visual Kanban & Drag-and-Drop Workspaces',
        description: 'Create unlimited boards, columns, and task cards with fluid Angular CDK drag-and-drop reordering and interactive progress checklists.'
      },
      {
        title: 'Bubblegum-Inspired Design System & Dual Themes',
        description: 'Centralized design tokens featuring glassmorphic surfaces, rounded UI components, soft gradients, and light/dark theme support.'
      },
      {
        title: 'Appwrite Cloud BaaS Integration',
        description: 'Secure email/password authentication, structured database collections for boards and tasks, and cloud attachment storage.'
      }
    ],
    challenges: [
      'Maintaining smooth 60fps drag-and-drop board reordering while executing optimistic state updates and synchronized Appwrite database collection persistence.'
    ],
    lessons: [
      'Leveraging Angular Signals for fine-grained reactivity eliminates change-detection performance overhead compared to traditional RxJS Subjects.'
    ],
    liveUrl: 'https://planzylab.vercel.app/',
    githubUrl: ''
  },

  // Rank 3: Real-Time Event-Driven WebSocket Engine (Sportz Score)
  {
    id: 'sportz-score',
    slug: 'sportz-score',
    title: 'Sportz Score',
    tagline: 'Real-time sports scoring platform built with React, Node.js, Express, and WebSockets delivering instant match updates and admin management tools.',
    category: 'Real-Time',
    featured: true,
    period: '2025',
    heroImage: '/projects/sportz-score/hero.png',
    galleryImages: [
      '/projects/sportz-score/create-match.png',
      '/projects/sportz-score/manage-match.png',
      '/projects/sportz-score/live-commentary.png'
    ],
    columnGroups: [
      [
        '/projects/sportz-score/create-match.png',
        '/projects/sportz-score/manage-match.png'
      ],
      [
        '/projects/sportz-score/live-commentary.png'
      ]
    ],
    overview: 'Sportz Score is a real-time sports scoring and match management platform that delivers live match updates through persistent WebSockets while providing administrators with dedicated tools to create, manage, and publish live sporting events instantly.',
    problem: 'Traditional sports commentary portals rely on HTTP polling, causing up to 10-second delays during high-stakes match moments and cluttering server bandwidth with repetitive requests.',
    solution: 'Architected a persistent WebSocket event-driven pub/sub engine connecting Node.js and Express backend controllers to React spectator clients, enabling sub-35ms latency score updates, streaming commentary feeds, and role-based admin controls.',
    architecture: {
      summary: 'Persistent two-way WebSocket event pipeline linking Node.js/Express admin publishing controllers to spectator React UI components.',
      nodes: [
        { id: '1', label: 'React Spectator UI', sub: 'Live Scoreboard & Commentary Timeline', type: 'client' },
        { id: '2', label: 'Node.js / Express', sub: 'WebSocket Gateway & Event Manager', type: 'server' },
        { id: '3', label: 'React Admin Dashboard', sub: 'Match Creator & Score Control Panel', type: 'client' }
      ],
      dataFlow: [
        'Admin updates match score or commentary -> Action sent to Express WebSocket gateway',
        'Server broadcasts event payload -> Instantly published to connected spectator clients',
        'React spectator UI receives WebSocket payload -> DOM updates live score & timeline without polling'
      ]
    },
    metrics: [
      { label: 'Broadcast Latency', value: '<35ms', description: 'Instant server-to-spectator event delivery without HTTP polling' },
      { label: 'Sync Mechanism', value: 'Real-Time', description: 'Persistent WebSocket connection synchronized across all connected users' }
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'WebSockets', 'JavaScript', 'CSS3'],
    features: [
      {
        title: 'Instant WebSocket Scoreboard',
        description: 'Live match scores, team statistics, and status flags updated in real time without refreshing the browser.'
      },
      {
        title: 'Streaming Live Commentary Feed',
        description: 'Event-driven commentary panel streaming match events instantly as published by ground administrators.'
      },
      {
        title: 'Admin Match Management Suite',
        description: 'Role-based admin tools to create new matches, manage active games, update scores, and broadcast commentary live.'
      },
      {
        title: 'High-Contrast Sports Aesthetic',
        description: 'Clean, high-contrast dashboard typography designed for quick data scanning across mobile and desktop devices.'
      }
    ],
    challenges: [
      'Mastering first real-time event-driven application architecture, maintaining persistent client connections during match updates, and cleanly separating admin vs spectator state workflows.'
    ],
    lessons: [
      'Persistent WebSockets eliminate polling latency, create a significantly more engaging live spectator UX, and reduce server request overhead compared to traditional REST polling.'
    ],
    liveUrl: 'https://sportz-score.vercel.app/',
    githubUrl: undefined
  },

  // Rank 4: HTML5 Canvas Video Generator (Trade Flight)
  {
    id: 'trade-flight',
    slug: 'trade-flight-simulator',
    title: 'Trade Flight',
    tagline: 'Creator-focused video generation tool built with React and HTML5 Canvas that transforms market data into animated financial videos optimized for social media.',
    category: 'Real-Time',
    featured: false,
    period: '2025',
    heroImage: '/projects/trade-flight/hero.png',
    galleryImages: [
      '/projects/trade-flight/preset-overlay.png',
      '/projects/trade-flight/settings.png',
      '/projects/trade-flight/points.png',
      '/projects/trade-flight/hindi-support.png'
    ],
    galleryColumns: 1,
    overview: 'Trade Flight is a video generation platform for traders and financial content creators that turns stock market data into engaging animated flight-style videos for Instagram Reels, YouTube Shorts, and X (Twitter). Powered by HTML5 Canvas rendering, Trade Flight features reusable preset overlays, dynamic animation settings, informational highlight points, and multi-language localization including Hindi.',
    problem: 'Manually editing stock market chart animations in traditional video software is slow, repetitive, and requires complex editing skills that slow down daily financial content creators.',
    solution: 'Engineered an intuitive React & HTML5 Canvas editing platform with guided preset overlays, customizable trajectory controls, real-time canvas animation previewing, and multi-language support (including Hindi) for rapid content generation.',
    architecture: {
      summary: 'Modular creator editing architecture separating HTML5 Canvas real-time previewing, preset management, settings control, and localization layers.',
      nodes: [
        { id: '1', label: 'React Creator UI', sub: 'Guided Configuration & Settings Panel', type: 'client' },
        { id: '2', label: 'HTML5 Canvas Engine', sub: 'Real-Time Keyframe Flight & Trajectory Renderer', type: 'client' },
        { id: '3', label: 'Preset & Localization Layer', sub: 'Reusable Overlays, Settings & Multi-Language Engine (Hindi)', type: 'service' }
      ],
      dataFlow: [
        'User inputs market data & selects preset -> Canvas engine interpolates flight trajectory keyframes',
        'User customizes overlay & language (Hindi) -> Real-time preview updates instantly on canvas',
        'Export trigger -> Frame-by-frame canvas animation loop rendered for social media distribution'
      ]
    },
    metrics: [
      { label: 'Workflow Speed', value: '<2 mins', description: 'From raw market data to preview-ready social media video animation' },
      { label: 'Localization', value: 'Multi-Lang', description: 'Native Hindi & English support for regional financial content creators' }
    ],
    techStack: ['React', 'HTML5 Canvas', 'JavaScript', 'Tailwind CSS', 'MediaRecorder API'],
    features: [
      {
        title: 'Animated Flight Visualization',
        description: 'Real-time HTML5 Canvas animation rendering market data movement with customizable speed and smooth flight path previews.'
      },
      {
        title: 'Preset Overlay System',
        description: 'Reusable predefined visual styles and layout presets for consistent, one-click content creation.'
      },
      {
        title: 'Extensive Customization & Highlights',
        description: 'Dedicated settings panel to tweak presentation parameters alongside an informational points section for key market insights.'
      },
      {
        title: 'Multi-Language Localization (Hindi)',
        description: 'Full multi-language support enabling regional creators to generate localized financial videos in Hindi and English.'
      }
    ],
    challenges: [
      'Balancing flexible customization parameters with a simple, guided editing workflow while maintaining smooth HTML5 Canvas animation frame rates across varying hardware.'
    ],
    lessons: [
      'Separating the live Canvas preview engine from preset configurations and localization modules ensures clean component isolation and rapid feature expansion.'
    ],
    liveUrl: 'https://tradeflight.vercel.app/',
    githubUrl: undefined
  },

  // Rank 5: Web Worker Engine & Game State Machine
  // Rank 5: Web Chess Engine & Minimax AI (Shah-Mat)
  {
    id: 'shah-mat',
    slug: 'shah-mat-chess',
    title: 'Shah-Mat (Checkmate Chess Engine)',
    tagline: 'High-performance web chess platform built with React 18, TypeScript, Vite, and chess.js featuring Minimax AI evaluation, offline 2-player mode, and custom time controls.',
    category: 'Full-Stack',
    featured: false,
    period: '2024',
    heroImage: '/projects/shah-mat/hero.png',
    galleryImages: [
      '/projects/shah-mat/gameplay.png',
      '/projects/shah-mat/lobby.png',
      '/projects/shah-mat/gameover.png',
      '/projects/shah-mat/sidebar.png'
    ],
    columnGroups: [
      [
        '/projects/shah-mat/gameplay.png',
        '/projects/shah-mat/lobby.png',
        '/projects/shah-mat/gameover.png'
      ],
      [
        '/projects/shah-mat/sidebar.png'
      ]
    ],
    overview: 'Shah-Mat (Persian for "Checkmate") is a responsive web chess application that combines real-time move validation via chess.js with a custom Minimax evaluation AI engine. Built with React 18, TypeScript, and Vite, Shah-Mat supports single-player vs AI mode across 3 difficulty levels, local offline 2-player pass & play, flexible time controls (Bullet, Blitz, Rapid & custom increments), live SAN move notation, and game-ending confetti celebrations.',
    problem: 'Web chess tools are often bloated with ads, require account sign-ins for quick casual matches, or lack customizable local engine difficulty and flexible time control presets for offline practice.',
    solution: 'Engineered a lightweight React 18 & Vite web application using chess.js for legal move validation and FEN state management, a custom Minimax AI engine with positional evaluation tables, high-contrast SVG piece graphics with target move highlights, live SAN move notation history, and customizable countdown timers.',
    architecture: {
      summary: 'React 18 component hierarchy integrated with chess.js rule engine, Minimax positional evaluation tree, and Framer Motion transitions.',
      nodes: [
        { id: '1', label: 'React 18 UI & SVG Board', sub: 'Custom SVG Pieces, Move Target Highlights & Clocks', type: 'client' },
        { id: '2', label: 'Chess.js Engine & State', sub: 'Move Validator, FEN Persistence & SAN Logger', type: 'client' },
        { id: '3', label: 'Minimax AI Engine', sub: '3 Difficulty Levels & Positional Heuristic Tables', type: 'service' }
      ],
      dataFlow: [
        'User clicks or drags piece -> Chess.js validates move & highlights legal target squares',
        'Move executed -> FEN state updates, SAN notation appended to log, turn clock switches',
        'AI turn -> Minimax evaluation tree selects optimal move heuristic & triggers board update'
      ]
    },
    metrics: [
      { label: 'Move Latency', value: '<5ms', description: 'Instant client-side move validation & FEN state update' },
      { label: 'AI Engine', value: '3 Levels', description: 'Easy, Medium, and Hard Minimax positional evaluation levels' }
    ],
    techStack: ['React 18', 'TypeScript', 'Vite', 'chess.js', 'Tailwind CSS', 'Framer Motion'],
    features: [
      {
        title: 'Vs AI Engine & Offline 2-Player',
        description: 'Play against an embedded Minimax AI engine with 3 difficulty levels (Easy, Medium, Hard) or challenge a friend in local offline 2-player pass & play mode.'
      },
      {
        title: 'Flexible Time Controls & Live Clocks',
        description: 'Supports untimed casual play, standard presets (1m Bullet, 3m/5m Blitz, 10m/15m Rapid), and custom starting minutes with per-move time increments (seconds).'
      },
      {
        title: 'Interactive SVG Board & Captured Piece Panels',
        description: 'High-contrast custom SVG piece graphics, legal move target highlights, last-move trails, and visual captured piece counters for White and Black.'
      },
      {
        title: 'Live SAN Notation & Game Over Modal',
        description: 'Auto-scrolling Standard Algebraic Notation move history log, one-click undo button, and backdrop-blur game-over modal with confetti celebrations.'
      }
    ],
    challenges: [
      'Optimizing Minimax evaluation tree search depth to prevent UI thread stuttering while delivering competitive engine play and maintaining synchronous clock countdowns across turns.'
    ],
    lessons: [
      'Separating pure chess rule validation (chess.js) from UI board rendering and offloading heavy state evaluation logic yields 60fps interaction performance and instant move feedback.'
    ],
    liveUrl: 'https://shah-mat.vercel.app/',
    githubUrl: undefined
  },

  // Rank 4: Real-Time WebRTC Video & Virtual Collaboration (Convo)
  {
    id: 'convo',
    slug: 'convo',
    title: 'Convo',
    tagline: 'Enterprise real-time video conferencing & virtual collaboration platform built with Next.js 16, React 19, Stream Video SDK, and Clerk Auth.',
    category: 'Real-Time',
    featured: false,
    period: '2024 – 2025',
    heroImage: '/projects/convo/hero.png',
    galleryImages: [
      '/projects/convo/home-screen.png',
      '/projects/convo/call-screen.png',
      '/projects/convo/schedule-meeting.png'
    ],
    columnGroups: [
      [
        '/projects/convo/home-screen.png',
        '/projects/convo/call-screen.png'
      ],
      [
        '/projects/convo/schedule-meeting.png'
      ]
    ],
    galleryColumns: 2,
    overview: 'Convo is a real-time, web-based video conferencing and virtual collaboration platform built as a modern alternative to Zoom and Google Meet. Powered by Next.js 16 App Router, React 19, Stream Video SDK (@stream-io/video-react-sdk & @stream-io/node-sdk), and Clerk Auth, Convo enables instant video calls with auto-generated tokens, scheduled meetings with date/time pickers, reusable personal meeting rooms, full WebRTC media controls (camera/mic toggle, screen share, grid layout switching), and call recording history.',
    problem: 'Legacy video meeting platforms require heavy desktop software downloads, fragmented account setup, and clunky user interfaces for room scheduling and call recordings.',
    solution: 'Engineered a Next.js 16 & React 19 web application integrating Stream Video SDK for real-time WebRTC media rendering and server-action token generation, Clerk for SSR session verification, and a modern dark glassmorphic interface.',
    architecture: {
      summary: 'Next.js 16 App Router workspace integrated with Stream Video SDK WebRTC Selective Forwarding Units (SFU) and Clerk authentication.',
      nodes: [
        { id: '1', label: 'Next.js 16 Client App', sub: 'Glassmorphic Meeting UI, Sidebar & Controls', type: 'client' },
        { id: '2', label: 'Stream Video SDK & Node', sub: 'WebRTC Media Rendering & Token Generation', type: 'server' },
        { id: '3', label: 'Clerk Authentication', sub: 'SSR Session Verification & Route Middleware', type: 'service' }
      ],
      dataFlow: [
        'User clicks Start Meeting -> Next.js Server Action requests authentication token from @stream-io/node-sdk',
        'Client initializes @stream-io/video-react-sdk room -> Connects to Stream WebRTC SFU mesh',
        'User toggles media controls or screen share -> WebRTC stream updates real-time with sub-30ms latency'
      ]
    },
    metrics: [
      { label: 'Call Setup', value: '<500ms', description: 'Instant meeting token generation & WebRTC connection setup' },
      { label: 'Stream Latency', value: '<30ms', description: 'Real-time WebRTC audio/video SFU transmission' }
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Stream Video SDK', 'Clerk Auth', 'Tailwind CSS', 'Radix UI'],
    features: [
      {
        title: 'Instant & Scheduled Meetings',
        description: 'Start a video call immediately with a single click and auto-generated token, or plan future calls with date/time pickers and shareable meeting links.'
      },
      {
        title: 'Personal Dedicated Meeting Room',
        description: 'A permanent, dedicated meeting URL (/personal-room) for instant sharing and reusable meetings.'
      },
      {
        title: 'Full WebRTC Real-Time Media Controls',
        description: 'Integrated controls for camera toggle, mic mute/unmute, desktop screen sharing, speaker/grid layout switching, call stats, and participant drawer.'
      },
      {
        title: 'Meeting Recordings & Call History',
        description: 'View, replay, and share direct links to past call recordings, previous meetings, and upcoming scheduled events.'
      }
    ],
    challenges: [
      'Managing WebRTC stream state transitions and server-side token generation across Clerk SSR session revalidations.'
    ],
    lessons: [
      'Combining Stream Video SDK with Next.js 16 Server Actions delivers low-latency video calls and instant token provisioning without managing raw WebRTC signaling servers.'
    ],
    liveUrl: 'https://convocall.vercel.app/',
    githubUrl: undefined
  },

  // Rank 5: Multi-User Real-Time Collaborative Editor (DocSync)
  {
    id: 'docsync',
    slug: 'docsync',
    title: 'DocSync',
    tagline: 'Real-time collaborative document management & rich-text editing workspace built with Next.js 14, Liveblocks, Lexical, and Clerk Auth.',
    category: 'Productivity',
    featured: false,
    period: '2024',
    heroImage: '/projects/docsync/hero.png',
    galleryImages: [
      '/projects/docsync/editor.png',
      '/projects/docsync/comments.png'
    ],
    galleryColumns: 1,
    overview: 'DocSync is a real-time collaborative document management and rich-text editing application. Powered by Next.js 14 App Router, Lexical rich-text framework, Liveblocks room state engine, and Clerk Auth, DocSync enables multi-user synchronous editing, active presence avatar headers, inline comment threads with text mentions, and granular role-based document sharing (Editor vs Viewer).',
    problem: 'Traditional document editors suffer from cursor jumping, laggy operational transforms, fragmented comment threads, and complex server setup for real-time multi-user document collaboration.',
    solution: 'Engineered a Next.js 14 App Router application leveraging Liveblocks for real-time room presence and notifications, Lexical for collaborative rich-text AST state synchronization, Clerk for secure user authentication, and Radix UI for interactive sharing modals.',
    architecture: {
      summary: 'Next.js 14 App Router workspace integrated with Liveblocks WebSocket room state and Lexical rich-text AST state synchronization.',
      nodes: [
        { id: '1', label: 'Next.js 14 Workspace', sub: 'Document Dashboard, Share Modal & Notifications UI', type: 'client' },
        { id: '2', label: 'Lexical & Liveblocks Engine', sub: 'Collaborative Rich-Text AST & Presence Sync', type: 'server' },
        { id: '3', label: 'Clerk Authentication', sub: 'User Profiles & Identity Management', type: 'service' }
      ],
      dataFlow: [
        'User types in Lexical editor -> Liveblocks delta synced over WebSocket with sub-20ms latency',
        'User adds inline comment or mention -> Notifications component triggers real-time room alert',
        'Document creator opens ShareModal -> Role-based access control (Editor vs Viewer) updated instantly'
      ]
    },
    metrics: [
      { label: 'Sync Latency', value: '<20ms', description: 'Real-time collaborative typing delta synchronization' },
      { label: 'Concurrency', value: 'Multi-User', description: 'Synchronous editing with active presence avatars' }
    ],
    techStack: ['Next.js 14', 'React 18', 'TypeScript', 'Liveblocks', 'Lexical', 'Clerk Auth', 'Tailwind CSS'],
    features: [
      {
        title: 'Real-Time Collaborative Editing',
        description: 'Synchronous multi-user rich-text editing powered by Liveblocks room state and Lexical framework.'
      },
      {
        title: 'Active Presence & Header Avatars',
        description: 'Real-time presence indicators displaying active collaborators directly in the room header.'
      },
      {
        title: 'Inline Threads, Floating Comments & Mentions',
        description: 'Floating comment threads attached to selected text with real-time notification alerts.'
      },
      {
        title: 'Granular Sharing & Role-Based Access',
        description: 'Role-based permissions (Editor vs Viewer) managed through interactive share dialogs and Clerk Auth.'
      }
    ],
    challenges: [
      'Synchronizing Lexical rich-text AST state nodes across multi-user WebSocket deltas while maintaining 60fps typing feel and smooth cursor interpolation.'
    ],
    lessons: [
      'Combining Lexical\'s structured rich-text model with Liveblocks room state delivers deterministic multi-user synchronization without editor re-render jank.'
    ],
    liveUrl: 'https://docsynchronize.vercel.app/',
    githubUrl: undefined
  },



  // Rank 6: Client-Side E2E Encrypted Ephemeral Messaging (NeoVoid)
  {
    id: 'ghostchat',
    slug: 'neovoid-ephemeral-chat',
    title: 'NeoVoid',
    tagline: 'Privacy-first ephemeral messaging platform combining client-side Web Crypto E2E encryption, self-destructing messages, and a cyberpunk dark aesthetic.',
    category: 'Full-Stack',
    featured: false,
    period: '2024 – 2025',
    heroImage: '/projects/ghostchat/hero.png',
    galleryImages: [
      '/projects/ghostchat/home-screen.png',
      '/projects/ghostchat/chat-screen.png'
    ],
    galleryColumns: 1,
    overview: 'NeoVoid is a privacy-first, ephemeral real-time messaging platform designed around the principle that conversations should exist only for the participants—and only for as long as they choose. Built with Next.js, React, TypeScript, and Web Crypto API, NeoVoid encrypts messages client-side before transmission over zero-knowledge WebSocket transport channels, leaving zero server-side digital footprints.',
    problem: 'Traditional messaging platforms permanently store user conversations on central servers, require invasive account registrations, and retain persistent databases prone to server breaches and data harvesting.',
    solution: 'Engineered a client-side Web Crypto API encryption workflow with zero-knowledge WebSocket transport channels, ephemeral self-destructing messages, temporary accountless rooms, and a futuristic dark cyberpunk interface.',
    architecture: {
      summary: 'Client-side browser Web Crypto API encryption pipeline over zero-knowledge WebSocket transport channels.',
      nodes: [
        { id: '1', label: 'Client Browser A', sub: 'Client-Side Encryption & Key Exchange', type: 'client' },
        { id: '2', label: 'Zero-Knowledge Relay', sub: 'WebSocket Transport Channel (0 Storage)', type: 'server' },
        { id: '3', label: 'Client Browser B', sub: 'RAM-Only Decryption & Auto-Erase', type: 'client' }
      ],
      dataFlow: [
        'Sender types message -> Web Crypto API encrypts payload client-side before network transmission',
        'Encrypted ciphertext sent -> Zero-knowledge WebSocket relay routes payload without plaintext access',
        'Recipient receives ciphertext -> Decrypted in RAM-only state & auto-erased upon timer expiry'
      ]
    },
    metrics: [
      { label: 'Server Storage', value: '0 Bytes', description: 'Zero database persistence of message contents or conversation logs' },
      { label: 'Encryption', value: 'E2E Client', description: 'Web Crypto API browser-native AES cryptographic execution' }
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Web Crypto API'],
    features: [
      {
        title: 'Client-Side End-to-End Encryption',
        description: 'Messages are encrypted within the browser using the Web Crypto API prior to transmission; transport servers cannot read plaintext content.'
      },
      {
        title: 'Ephemeral Self-Destructing Messages',
        description: 'Conversations exist only for their intended lifespan and auto-vanish without leaving long-term digital footprint data trails.'
      },
      {
        title: 'Accountless Private Chat Rooms',
        description: 'Enter secure private chat rooms instantly without phone numbers, emails, or personal data registration friction.'
      },
      {
        title: 'Futuristic Cyberpunk Visual Aesthetic',
        description: 'High-contrast dark theme with neon accents, minimal layouts, clean typography, and smooth real-time message delivery.'
      }
    ],
    challenges: [
      'Designing privacy-focused user experiences while managing client-side cryptographic key workflows and persistent WebSocket state synchronization without database persistence.'
    ],
    lessons: [
      'Client-side cryptography and zero-knowledge relays ensure user privacy by default while maintaining sub-30ms messaging responsiveness.'
    ],
    liveUrl: 'https://neovoid.vercel.app/',
    githubUrl: undefined
  },

  // Rank 8: Healthcare Scheduling & SMS Dispatch Engine (MedSlot)
  {
    id: 'medslot',
    slug: 'medslot',
    title: 'MedSlot',
    tagline: 'Healthcare appointment scheduling and dispatch platform built with Next.js 14, Appwrite Cloud, Clerk Auth, and automated SMS notifications.',
    category: 'Healthcare',
    featured: false,
    period: '2024',
    heroImage: '/projects/medslot/hero.png',
    galleryImages: [
      '/projects/medslot/form-1.png',
      '/projects/medslot/form-2.png',
      '/projects/medslot/form-3.png'
    ],
    galleryColumns: 3,
    fullWidthImages: [
      '/projects/medslot/admin.png'
    ],
    overview: 'MedSlot is a full-stack healthcare scheduling platform that streamlines patient onboarding, doctor discovery, appointment booking, and admin slot management. Powered by Next.js 14 App Router, Clerk Auth, and Appwrite Cloud BaaS (Databases, Storage Buckets, and Messaging SMS), MedSlot features multi-step patient registration with secure ID document uploads, doctor catalog search, a passkey-protected admin control panel with real-time status counters, and automated SMS appointment confirmations.',
    problem: 'Healthcare scheduling systems often suffer from cumbersome multi-step paperwork, fragmented doctor directories, lack of instant SMS appointment confirmations, and inefficient admin slot tracking.',
    solution: 'Engineered a modern Next.js 14 & Appwrite Cloud application integrating Clerk Authentication, Appwrite Storage Buckets for secure ID verification uploads, Appwrite Messaging for automated SMS dispatch, and a passkey-secured Admin DataTable with real-time appointment metrics.',
    architecture: {
      summary: 'Next.js 14 App Router frontend integrated with Clerk Authentication and Appwrite Cloud BaaS for database collections, document storage, and SMS messaging.',
      nodes: [
        { id: '1', label: 'Next.js 14 Client App', sub: 'Shadcn UI Form Workflows, Doctor Directory & Patient Dashboard', type: 'client' },
        { id: '2', label: 'Clerk Authentication', sub: 'User Identity & Sign-In/Sign-Up Management', type: 'server' },
        { id: '3', label: 'Appwrite Cloud BaaS', sub: 'Databases, Storage Buckets & SMS Messaging Dispatch', type: 'service' }
      ],
      dataFlow: [
        'Patient completes multi-step form & uploads ID -> Appwrite Storage saves file blob & creates patient document',
        'Patient selects doctor & time slot -> Appwrite Database saves pending appointment record',
        'Admin confirms/cancels appointment -> PasskeyModal authorizes action & Appwrite Messaging sends automated SMS to patient'
      ]
    },
    metrics: [
      { label: 'SMS Dispatch', value: '<3s', description: 'Instant automated SMS appointment confirmation & cancellation text alerts' },
      { label: 'Admin Access', value: 'Passkey', description: 'PasskeyModal protected admin control panel & interactive DataTable' }
    ],
    techStack: ['Next.js 14', 'React 18', 'TypeScript', 'Appwrite Cloud', 'Clerk Auth', 'Tailwind CSS', 'Shadcn UI'],
    features: [
      {
        title: 'Patient Onboarding & ID Verification Uploads',
        description: 'Multi-step registration capturing personal details, emergency contacts, medical history, insurance info, and secure identification document uploads.'
      },
      {
        title: 'Doctor Directory & Appointment Engine',
        description: 'Interactive doctor catalog displaying qualifications, availability, and detailed selection modals for scheduling primary physician visits.'
      },
      {
        title: 'Passkey-Protected Admin Control Panel',
        description: 'PasskeyModal secured admin panel featuring real-time stat counters (Scheduled, Pending, Cancelled) and interactive DataTable to confirm, reschedule, or cancel bookings.'
      },
      {
        title: 'Automated SMS Notifications & Status Tracking',
        description: 'Appwrite Messaging service dispatches instant SMS alerts upon appointment confirmation or cancellation with dedicated patient status tracking.'
      }
    ],
    challenges: [
      'Handling secure multi-part file uploads to Appwrite Storage buckets alongside optimistic appointment transactions and passkey authentication checks.'
    ],
    lessons: [
      'Combining Clerk Authentication with Appwrite Cloud BaaS simplifies user identity and serverless document storage while maintaining healthcare security best practices.'
    ],
    liveUrl: 'https://medslot.vercel.app/',
    githubUrl: undefined
  },

  // Rank 7: Next.js & GSAP Motion Sports Portal (RCB 2025 Fan Portal)
  {
    id: 'rcb-2025',
    slug: 'rcb-2025-franchise',
    title: 'RCB 2025 Fan Portal',
    tagline: 'Interactive sports fan experience built with Next.js and GSAP featuring motion-driven storytelling, bento grid showcases, and bold Royal Challengers Bengaluru branding.',
    category: 'Frontend',
    featured: false,
    period: '2025',
    heroImage: '/projects/rcb-2025/hero.png',
    galleryImages: [
      '/projects/rcb-2025/bento-grid.png'
    ],
    galleryColumns: 1,
    overview: 'RCB 2025 Fan Portal is a modern frontend experience created for Royal Challengers Bengaluru supporters, celebrating the team\'s 2025 season through immersive visuals, smooth GSAP animations, bento grid showcases, and a premium digital fan experience that captures the energy and identity of RCB.',
    problem: 'Traditional sports team websites are often cluttered with ads, statistics-heavy, and lack the energetic, motion-driven visual storytelling that passionate fans expect on match day.',
    solution: 'Engineered a responsive Next.js web application utilizing GSAP for high-performance entrance and scroll-triggered animations, bold sports-inspired typography, and a modular bento grid showcase layout.',
    architecture: {
      summary: 'Next.js frontend architecture integrated with GSAP ScrollTrigger animation controllers and modular bento showcase components.',
      nodes: [
        { id: '1', label: 'Next.js App Router UI', sub: 'Modular Bento Grid & Hero Section', type: 'client' },
        { id: '2', label: 'GSAP Motion Engine', sub: 'Entrance Animations & ScrollTrigger Transitions', type: 'client' },
        { id: '3', label: 'Design System Layer', sub: 'Bold RCB Red & Gold Theme & Typography', type: 'client' }
      ],
      dataFlow: [
        'User scrolls page -> GSAP ScrollTrigger interpolates DOM element motion smoothly',
        'User interacts with bento grid -> Micro-interaction transitions trigger without layout shift',
        'Responsive breakpoint change -> Flex/grid layout adapts seamlessly across mobile & desktop'
      ]
    },
    metrics: [
      { label: 'Motion Speed', value: '60fps', description: 'GPU-accelerated GSAP ScrollTrigger transitions & entrance effects' },
      { label: 'Page Speed', value: '98/100', description: 'Lighthouse mobile performance & optimized asset loading' }
    ],
    techStack: ['Next.js', 'React', 'GSAP', 'JavaScript', 'Responsive CSS'],
    features: [
      {
        title: 'Immersive Hero Experience',
        description: 'High-impact homepage landing section with bold sports typography, premium imagery, and animated entrance transitions.'
      },
      {
        title: 'GSAP-Powered Motion Design',
        description: 'High-performance scroll-triggered animations and refined micro-interactions that elevate visual storytelling.'
      },
      {
        title: 'Bento Grid Showcase',
        description: 'Responsive modular bento-style grid organizing featured franchise highlights, campaign stories, and brand assets.'
      },
      {
        title: 'Responsive Sports Branding',
        description: 'High-contrast RCB visual language adapted seamlessly across desktop and mobile screen dimensions.'
      }
    ],
    challenges: [
      'Balancing rich GSAP motion animations and heavy sports campaign imagery with fast Lighthouse performance and smooth responsive layout adaptability.'
    ],
    lessons: [
      'Purposeful animation and modular bento layout design transform static sports portals into engaging, campaign-grade digital experiences.'
    ],
    liveUrl: 'https://rcb25.vercel.app/',
    githubUrl: undefined
  },

  // Rank 4: Foundational Milestone Project (Nike Adapt Storefront)
  {
    id: 'nike-store',
    slug: 'nike-adapt-store',
    title: 'Nike Adapt 2.0 Storefront',
    tagline: 'Frontend e-commerce application built with React, Vite, and Redux Toolkit simulating a modern online sneaker shopping experience.',
    category: 'Frontend & E-Commerce',
    featured: true,
    period: '2023 – 2024',
    heroImage: '/projects/nike-store/hero.png',
    galleryImages: [
      '/projects/nike-store/top-rated-sales.png',
      '/projects/nike-store/popular-sales.png',
      '/projects/nike-store/top-stories.png',
      '/projects/nike-store/cart.png'
    ],
    columnGroups: [
      [
        '/projects/nike-store/top-rated-sales.png',
        '/projects/nike-store/popular-sales.png',
        '/projects/nike-store/top-stories.png'
      ],
      [
        '/projects/nike-store/cart.png'
      ]
    ],
    overview: 'Nike Adapt 2.0 Storefront is a modern e-commerce application inspired by Nike\'s futuristic Adapt footwear line. Built during my frontend training as one of my first complete React applications, it served as a foundational milestone for mastering component composition, Vite development, and centralized state management using Redux Toolkit.',
    problem: 'Early e-commerce templates felt static, slow to respond, and lacked modern component composition and state management needed to simulate realistic shopping workflows without backend latency.',
    solution: 'Engineered a polished, responsive React application utilizing Vite and Redux Toolkit, implementing complete frontend CRUD operations for shopping cart management, reusable product components, and instant declarative state reactivity.',
    architecture: {
      summary: 'Vite & React component hierarchy powered by Redux Toolkit for predictable centralized cart state and immutable slice reducers.',
      nodes: [
        { id: '1', label: 'Vite & React UI', sub: 'Component Tree & Mock Product Catalog', type: 'client' },
        { id: '2', label: 'Redux Toolkit', sub: 'Centralized Store, Cart Slice & Selectors', type: 'client' },
        { id: '3', label: 'CSS3 Layout System', sub: 'Responsive Grid & Custom Typography', type: 'client' }
      ],
      dataFlow: [
        'User clicks add-to-cart on sneaker card -> Action dispatched to Redux cart slice',
        'Slice reducer computes immutable state update -> Item added or quantity incremented',
        'Redux selectors compute total price & items -> UI re-renders declaratively with instant feedback'
      ]
    },
    metrics: [
      { label: 'Foundational App', value: 'Milestone', description: 'Core React & Redux Toolkit learning milestone' },
      { label: 'State Latency', value: '0ms', description: 'Instant client-side cart CRUD operations without server roundtrips' }
    ],
    techStack: ['React', 'Vite', 'JavaScript', 'Redux Toolkit', 'CSS3'],
    features: [
      {
        title: 'Product Catalog & Quick Actions',
        description: 'Browse Nike Adapt footwear with high-res sneaker cards, pricing, categories, ratings, and instant add-to-cart triggers.'
      },
      {
        title: 'Full Frontend Cart CRUD',
        description: 'Add, remove, increment, and decrement item quantities with automatic derived totals calculation via Redux Toolkit.'
      },
      {
        title: 'Dynamic Declarative UI',
        description: 'Instant interface updates reflecting cart state changes across navigation badges and cart drawers without page reloads.'
      },
      {
        title: 'Responsive Nike-Inspired Aesthetic',
        description: 'Sleek dark design with bold sports typography, clean product cards, and responsive grid layouts for desktop and mobile.'
      }
    ],
    challenges: [
      'Understanding component communication via shared global state and mastering immutable state updates, actions, reducers, and selectors in Redux Toolkit.'
    ],
    lessons: [
      'Built a deep architectural foundation in React component composition, centralized state management, and predictable data flows that informed all later React and Angular engineering work.'
    ],
    liveUrl: 'https://nikestores.netlify.app/',
    githubUrl: undefined
  }
];
