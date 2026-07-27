import { ProjectCaseStudy } from '@/types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'odyssey',
    slug: 'odyssey',
    title: 'Odyssey',
    tagline: 'Gamified productivity platform engineered for hyper-focused deep work.',
    category: 'Mobile & Cross-Platform',
    featured: true,
    period: '2025 – 2026',
    heroImage: '/projects/odyssey-hero.svg',
    galleryImages: [
      '/projects/odyssey-1.svg',
      '/projects/odyssey-2.svg',
      '/projects/odyssey-3.svg'
    ],
    overview: 'Odyssey turns routine task execution and habit formation into an immersive RPG-inspired deep work experience. Designed with offline-first synchronization, sub-16ms interactive animations, and encrypted cloud backups.',
    problem: 'Traditional habit trackers suffer from high 7-day drop-off rates due to boring tabular lists and delayed feedback loops.',
    solution: 'Engineered a real-time gamified XP engine backed by Supabase row-level security and offline SQLite local storage in React Native / Expo.',
    architecture: {
      summary: 'Offline-First React Native architecture with Supabase realtime synchronization and local SQLite cache layer.',
      nodes: [
        { id: '1', label: 'React Native UI', sub: 'Skia Canvas & Reanimated 3', type: 'client' },
        { id: '2', label: 'Offline Engine', sub: 'SQLite / WatermelonDB', type: 'client' },
        { id: '3', label: 'Realtime Sync', sub: 'Supabase Realtime Engine', type: 'server' },
        { id: '4', label: 'PostgreSQL DB', sub: 'Row Level Security (RLS)', type: 'database' }
      ],
      dataFlow: [
        'User completes task -> Local SQLite commit (0ms latency)',
        'Background worker syncs delta to Supabase via RLS policies',
        'Supabase Realtime broadcasts level-up event to connected devices'
      ]
    },
    metrics: [
      { label: 'Retention Rate', value: '4.8x', description: '30-day retention compared to standard habit apps' },
      { label: 'Sync Latency', value: '<12ms', description: 'Optimistic local mutation with background reconciliation' },
      { label: 'App Store Rating', value: '4.9★', description: 'User rating across iOS & Android builds' }
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'SQLite', 'Framer Motion', 'Skia'],
    features: [
      {
        title: 'Offline-First Optimistic State Engine',
        description: 'Instant zero-delay task completions using local SQLite storage with automated conflict-free delta resolution upon reconnecting.',
        codeSnippet: `const completeQuest = async (questId: string) => {\n  await db.update('quests').set({ status: 'completed' }).where({ id: questId });\n  syncQueue.enqueue({ action: 'QUEST_COMPLETE', questId, timestamp: Date.now() });\n};`
      },
      {
        title: 'Hardware Haptic & Motion Feedback',
        description: 'Custom React Native Skia particle effects synchronized with device haptics on milestone completions.'
      }
    ],
    challenges: [
      'Handling offline state reconciliation when users complete quests across multiple disconnected devices.',
      'Maintaining 60fps gesture animations on low-end Android hardware while parsing complex habit streak charts.'
    ],
    lessons: [
      'Optimistic state updates dramatically improve perceived performance compared to waiting for server ACK.',
      'Strict TypeScript schema validation between client SQLite and Supabase PostgreSQL prevents silent data drift.'
    ],
    liveUrl: 'https://odyssey-app.example.com',
    githubUrl: 'https://github.com/varunnayak/odyssey'
  },
  {
    id: '75-hard',
    slug: '75-hard-tracker',
    title: '75 Hard Challenge Tracker',
    tagline: 'High-precision accountability platform with automated proof verification.',
    category: 'Productivity',
    featured: true,
    period: '2025',
    heroImage: '/projects/75hard-hero.svg',
    galleryImages: [
      '/projects/75hard-1.svg',
      '/projects/75hard-2.svg'
    ],
    overview: 'A zero-friction progress tracking system for the 75 Hard discipline program. Features photo progress timelines, workout water logs, automated timezone checks, and shareable vector progress cards.',
    problem: 'Users undertaking 75 Hard frequently fail due to forgotten daily logs, missing progress photos, or ambiguous timezone transitions while traveling.',
    solution: 'Built a Next.js App Router application with Supabase storage, automated photo EXIF validation, and daily automated push reminders.',
    architecture: {
      summary: 'Next.js 16 Server Components paired with Supabase Storage for secure media uploads and EXIF date validation.',
      nodes: [
        { id: '1', label: 'Next.js App Router', sub: 'Server Components & Actions', type: 'client' },
        { id: '2', label: 'Auth & RLS', sub: 'Supabase SSR Client', type: 'server' },
        { id: '3', label: 'Encrypted Storage', sub: 'Supabase Object Bucket', type: 'database' }
      ],
      dataFlow: [
        'Photo uploaded -> Next.js Server Action validates EXIF metadata timestamp',
        'Supabase Storage stores encrypted asset with signed CDN URL',
        'Cron worker verifies daily streak status at midnight user-local time'
      ]
    },
    metrics: [
      { label: 'Completion Rate', value: '89%', description: 'User challenge completion rate with automated reminders' },
      { label: 'Page Load (LCP)', value: '0.4s', description: 'Next.js edge-rendered dashboard' }
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    features: [
      {
        title: 'EXIF Timestamp Verification',
        description: 'Server Actions extract camera EXIF metadata to ensure progress photos are shot on the recorded challenge day.',
        codeSnippet: `export async function uploadProgressPhoto(formData: FormData) {\n  const file = formData.get('photo') as File;\n  const metadata = await extractExif(await file.arrayBuffer());\n  if (!isSameDay(metadata.dateTaken, new Date())) throw new Error("Invalid photo date");\n}`
      }
    ],
    challenges: [
      'Managing dynamic image processing and thumbnail generation at the edge without exceeding memory bounds.'
    ],
    lessons: [
      'Edge functions with streaming response lower initial time-to-first-byte (TTFB) significantly.'
    ],
    liveUrl: 'https://75hard-tracker.example.com',
    githubUrl: 'https://github.com/varunnayak/75hard-tracker'
  },
  {
    id: 'sportz-score',
    slug: 'sportz-score',
    title: 'Sportz Score',
    tagline: 'Ultra-low latency live sports scoring platform with real-time commentary.',
    category: 'Real-Time',
    featured: true,
    period: '2025',
    heroImage: '/projects/sportz-hero.svg',
    galleryImages: [
      '/projects/sportz-1.svg',
      '/projects/sportz-2.svg'
    ],
    overview: 'A live sports streaming scores, stats, and real-time play-by-play ticker platform handling thousands of concurrent listeners with sub-50ms score updates.',
    problem: 'Traditional sports commentary portals rely on polling, causing up to 10-second delays during high-stakes match moments.',
    solution: 'Architected a WebSocket pub/sub streaming architecture with binary payload compression and fallback HTTP long-polling.',
    architecture: {
      summary: 'WebSocket Gateway engine connecting microservice score providers to Next.js clients via binary delta buffers.',
      nodes: [
        { id: '1', label: 'Live Score Ingestion', sub: 'Kafka / Redis Stream', type: 'service' },
        { id: '2', label: 'WebSocket Broadcast', sub: 'Node.js Gateway', type: 'server' },
        { id: '3', label: 'Next.js Frontend', sub: 'Canvas Ticker & React State', type: 'client' }
      ],
      dataFlow: [
        'Live score event -> Broadcast to WebSocket room',
        'Client unpacks ArrayBuffer payload into React state',
        'Custom canvas ticker updates play animation smoothly'
      ]
    },
    metrics: [
      { label: 'Broadcast Latency', value: '<35ms', description: 'From feed ingestion to client browser DOM update' },
      { label: 'Concurrent Users', value: '50,000+', description: 'Simultaneous WebSocket connections handled per cluster node' }
    ],
    techStack: ['Next.js', 'WebSockets', 'TypeScript', 'Node.js', 'Redis', 'Tailwind CSS'],
    features: [
      {
        title: 'Binary WebSocket Payload Streaming',
        description: 'Decoded structured event buffers directly in browser memory to reduce JSON parsing overhead by 80%.',
        codeSnippet: `ws.onmessage = (event) => {\n  const update = ScoreDecoder.decode(new Uint8Array(event.data));\n  updateLiveTicker(update);\n};`
      }
    ],
    challenges: [
      'Handling sudden burst traffic during match tie-breakers without connection drops.'
    ],
    lessons: [
      'Pre-allocating array buffers on the client avoids memory garbage collection pauses during high-frequency updates.'
    ],
    liveUrl: 'https://sportzscore.example.com',
    githubUrl: 'https://github.com/varunnayak/sportz-score'
  },
  {
    id: 'ghostchat',
    slug: 'ghostchat',
    title: 'GhostChat',
    tagline: 'Ephemeral end-to-end encrypted messaging with zero server footprint.',
    category: 'Full-Stack',
    featured: false,
    period: '2024 – 2025',
    heroImage: '/projects/ghostchat-hero.svg',
    galleryImages: ['/projects/ghostchat-1.svg'],
    overview: 'Self-destructing secure communication portal using Web Crypto API double-ratchet encryption. Messages exist only in client RAM and vanish after reading.',
    problem: 'Centralized messaging tools retain persistent conversation histories prone to server breaches.',
    solution: 'Constructed an end-to-end encrypted peer room system using Next.js and Supabase WebSockets as a dumb transport relay.',
    architecture: {
      summary: 'Client-side Web Crypto API encryption layer with zero server-side private key access.',
      nodes: [
        { id: '1', label: 'Client Browser A', sub: 'Web Crypto API Key Exchange', type: 'client' },
        { id: '2', label: 'Dumb Relay', sub: 'Supabase Realtime Channel', type: 'server' },
        { id: '3', label: 'Client Browser B', sub: 'RAM-Only Decryption', type: 'client' }
      ],
      dataFlow: [
        'Alice encrypts payload with Bob public key',
        'Relay passes cipher text without storing to disk',
        'Bob decrypts in memory -> Self-destruct timer wipes RAM'
      ]
    },
    metrics: [
      { label: 'Data Retained', value: '0 Bytes', description: 'Zero database persistence of message contents' },
      { label: 'Encryption Standard', value: 'AES-256-GCM', description: 'Web Crypto API native hardware execution' }
    ],
    techStack: ['Next.js', 'Supabase', 'Web Crypto API', 'TypeScript', 'Tailwind CSS'],
    features: [
      {
        title: 'In-Memory Key Derivation',
        description: 'Ephemeral ECDH keypair generated per session and wiped on tab unload.'
      }
    ],
    challenges: ['Preventing memory leaks of decrypted string references across React render cycles.'],
    lessons: ['Explicitly nullifying Uint8Array buffers ensures data cannot be inspected in memory dumps.'],
    liveUrl: 'https://ghostchat.example.com',
    githubUrl: 'https://github.com/varunnayak/ghostchat'
  },
  {
    id: 'medslot',
    slug: 'medslot',
    title: 'MedSlot',
    tagline: 'Healthcare appointment dispatch engine with real-time SMS & IVR notifications.',
    category: 'Healthcare',
    featured: false,
    period: '2024',
    heroImage: '/projects/medslot-hero.svg',
    galleryImages: ['/projects/medslot-1.svg'],
    overview: 'Automated clinic scheduling engine that matches urgent patient slot cancellations with waiting list patients via instant Twilio SMS dispatch.',
    problem: 'Clinics lose up to 20% revenue daily due to last-minute patient cancellations and vacant slots.',
    solution: 'Built an automated queue matching engine using Next.js, Appwrite Database, and Twilio Programmable Messaging.',
    architecture: {
      summary: 'Event-driven cancellation listener triggering Twilio queue dispatches with automated confirmation parsing.',
      nodes: [
        { id: '1', label: 'Next.js App', sub: 'Doctor Slot Management', type: 'client' },
        { id: '2', label: 'Appwrite Cloud', sub: 'Database & Function Queue', type: 'server' },
        { id: '3', label: 'Twilio API', sub: 'SMS & Voice Confirmation', type: 'service' }
      ],
      dataFlow: [
        'Slot cancelled -> Appwrite Function triggers',
        'Twilio dispatches SMS to top 3 waitlist patients',
        'First patient to reply "YES" locks slot automatically'
      ]
    },
    metrics: [
      { label: 'Slot Recovery', value: '91%', description: 'Cancelled appointments successfully refilled' },
      { label: 'Response Time', value: '<2 mins', description: 'Average patient booking confirmation time' }
    ],
    techStack: ['Next.js', 'Appwrite', 'Twilio', 'TypeScript', 'Tailwind CSS'],
    features: [
      {
        title: 'Automated Waitlist Parsing',
        description: 'Twilio webhook parses incoming patient SMS text and instantly locks schedule slots via optimistic database transactions.'
      }
    ],
    challenges: ['Preventing double-booking race conditions when multiple patients reply simultaneously.'],
    lessons: ['Database row locks during dispatch verification prevent scheduling collisions.'],
    liveUrl: 'https://medslot.example.com',
    githubUrl: 'https://github.com/varunnayak/medslot'
  },
  {
    id: 'docsync',
    slug: 'docsync',
    title: 'DocSync',
    tagline: 'Real-time collaborative markdown editor with multi-cursor CRDT synchronization.',
    category: 'Productivity',
    featured: false,
    period: '2024',
    heroImage: '/projects/docsync-hero.svg',
    galleryImages: ['/projects/docsync-1.svg'],
    overview: 'High-performance collaborative document platform enabling concurrent multi-user editing, live presence avatars, line history, and instant export.',
    problem: 'Traditional document editors experience lag and cursor jumping during high-concurrency editing sessions.',
    solution: 'Integrated Liveblocks CRDT state reconciliation into a Next.js App Router workspace with custom CodeMirror 6 extensions.',
    architecture: {
      summary: 'Yjs / Liveblocks conflict-free replicated data type engine connected to CodeMirror 6 editor instances.',
      nodes: [
        { id: '1', label: 'CodeMirror 6 Editor', sub: 'Custom Syntax Extensions', type: 'client' },
        { id: '2', label: 'Liveblocks Engine', sub: 'CRDT Conflict Resolution', type: 'server' },
        { id: '3', label: 'Next.js Edge', sub: 'Document State Hydration', type: 'client' }
      ],
      dataFlow: [
        'User types character -> Local CRDT delta generated',
        'Liveblocks WebSocket broadcasts delta to room',
        'Remote cursors update with sub-20ms spatial interpolation'
      ]
    },
    metrics: [
      { label: 'Editing FPS', value: '60fps', description: 'Smooth typing feel with 20+ active collaborators' },
      { label: 'Conflict Errors', value: '0', description: 'Deterministic CRDT resolution across concurrent edits' }
    ],
    techStack: ['Next.js', 'Liveblocks', 'TypeScript', 'CodeMirror 6', 'Tailwind CSS'],
    features: [
      {
        title: 'Multi-User Spatial Presence',
        description: 'Custom smooth cursor interpolation showing active typing lines and highlighted text selections.'
      }
    ],
    challenges: ['Synchronizing custom code syntax highlighting tokens across collaborative operational transforms.'],
    lessons: ['Separating document AST representation from display DOM prevents editor re-render jank.'],
    liveUrl: 'https://docsync.example.com',
    githubUrl: 'https://github.com/varunnayak/docsync'
  },
  {
    id: 'convo',
    slug: 'convo',
    title: 'Convo',
    tagline: 'Enterprise video & audio communication hub with AI live transcripts.',
    category: 'Real-Time',
    featured: false,
    period: '2024',
    heroImage: '/projects/convo-hero.svg',
    galleryImages: ['/projects/convo-1.svg'],
    overview: 'Low-latency WebRTC video conferencing app equipped with dynamic spatial audio, screen sharing, custom background blur, and automated call summaries.',
    problem: 'Video meeting tools demand heavy CPU resources for browser video filters and audio noise suppression.',
    solution: 'Built a Next.js application powered by Stream Video SDK and WebAssembly-accelerated background segmenters.',
    architecture: {
      summary: 'Stream Video SDK WebRTC mesh backend with WebAssembly offloaded video canvas shaders.',
      nodes: [
        { id: '1', label: 'WebRTC Video Stream', sub: 'Stream SFU Node', type: 'service' },
        { id: '2', label: 'Wasm Shader', sub: 'Background Segmentation', type: 'client' },
        { id: '3', label: 'Next.js App', sub: 'Control Room State', type: 'client' }
      ],
      dataFlow: [
        'Camera stream -> Wasm background filter (0% CPU main thread lag)',
        'Filtered video piped to WebRTC peer connection',
        'Stream SFU dynamically scales resolution based on bandwidth'
      ]
    },
    metrics: [
      { label: 'CPU Utilization', value: '-45%', description: 'Compared to standard WebGL video canvas processing' },
      { label: 'Call Quality Score', value: '4.9/5', description: 'Stream SFU connection stability rating' }
    ],
    techStack: ['Next.js', 'Stream SDK', 'WebRTC', 'WebAssembly', 'TypeScript', 'Tailwind CSS'],
    features: [
      {
        title: 'Wasm-Powered Background Masking',
        description: 'Offloaded video frame segmentation to web workers via WebAssembly to ensure 60fps UI performance during 4K video streams.'
      }
    ],
    challenges: ['Managing dynamic WebRTC bitrate degradation on unstable mobile network connections.'],
    lessons: ['Adaptive bitrate scaling is crucial for video call continuity under weak network signals.'],
    liveUrl: 'https://convo.example.com',
    githubUrl: 'https://github.com/varunnayak/convo'
  }
];
