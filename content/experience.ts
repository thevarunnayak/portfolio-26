import { ExperienceItem } from '@/types';

export const experienceItems: ExperienceItem[] = [
  {
    id: 'robosoft',
    company: 'Robosoft Technologies',
    role: 'Software Engineer',
    location: 'India',
    period: 'July 2025 – Present',
    isCurrent: true,
    award: 'GOOGLE AI CERTIFIED • 365 LEETCODE BADGE',
    bannerImage: '/images/robo-banner.png',
    companyLogo: '/images/robo-logo.jpeg',
    summary: 'Architecting core platform capabilities for Connect Assistant & enterprise audit suites, reusable Angular UI design systems, AI-assisted development pipelines, custom Photolog scripting, and high-performance data visualizers.',
    logoText: 'RT',
    responsibilities: [
      'Engineered core frontend architecture for Connect Assistant & Finding Action Assistant, building document-to-form workflows supporting manual copy, auto-replace, and append operations across complex UI controls.',
      'Implemented Timeline View within Calendar View with horizontal and vertical timeline layouts, multi-attribute filtering, responsive card behavior, and view persistence.',
      'Architected reusable Angular Design System services (Dynamic Window Service with resizing/orientation support, Shape Charts, Toast Notification, Avatar Group) for platform-wide scalability.',
      'Architected custom HTML5 Canvas image editing tools, native getUserMedia camera hardware integrations, and report chart widgets from scratch with zero post-deployment defect leakage.',
      'Implemented custom client Photolog scripting solution, authoring technical documentation and providing guidance for future team customizations.',
      'Adopted AI tools (ChatGPT, GitHub Copilot) for rapid solution exploration, code reviews, and task planning while maintaining 100% T&E process compliance and 160 hrs/mo peak utilization.',
      'Earned 365-Day LeetCode streak badge, Google AI Professional Certificate, React Specialization, and mentored student robotics teams during organizational CSR initiatives.'
    ],
    impact: [
      {
        metric: 'Connect Assistant',
        label: 'Core Platform Lead',
        detail: 'Architected document-to-form workflows, Finding Action Assistant, and dynamic form control population.'
      },
      {
        metric: '7+ Charts',
        label: 'Data Visualization',
        detail: 'Reusable Shape, Sankey, Funnel & Pyramid chart engines with zero-hang rendering on large datasets.'
      },
      {
        metric: '100% Delivery',
        label: 'PMO & Process TAT',
        detail: 'Maintained 100% T&E compliance, zero-defect release cycles, and full 160 hrs/mo resource utilization.'
      }
    ],
    techStack: [
      'Angular',
      'TypeScript',
      'Connect Assistant',
      'Kendo UI',
      'RxJS',
      'HTML5 Canvas APIs',
      'getUserMedia Camera',
      'AI Copilot & ChatGPT',
      'Photolog Scripting',
      'Design Systems'
    ],
    featuredProjects: ['Connect Assistant', 'Finding Action Assistant', 'Timeline & Calendar View', 'Custom Camera & Image Editor', 'Angular Window Service']
  },
  {
    id: 'associate-se',
    company: 'Robosoft Technologies',
    role: 'Associate Software Engineer',
    location: 'India',
    period: 'Prior Role',
    isCurrent: false,
    award: 'SPARK AWARD WINNER',
    bannerImage: '/images/robo-banner.png',
    companyLogo: '/images/robo-logo.jpeg',
    summary: 'Engineered investor & distributor web portals for financial services (UTI Mutual Funds), OTT media platforms (TVOD/SVOD & Roku webhooks), dynamic AG Grid tables, and mobile web UPI payment checkout.',
    logoText: 'RT',
    responsibilities: [
      'Awarded the Robosoft Spark Award for outstanding project ownership, clean code architecture, and high-impact client deliveries.',
      'Engineered core Angular frontend modules for UTI Mutual Funds, including Investor List, Recommendation Status, Transaction History, and Distributor Corporate Portal with 97.6% customer acceptance.',
      'Developed OTT streaming media modules for TVOD & SVOD, automated Push Notification management systems, and conducted Roku SVOD webhook research and integration.',
      'Spearheaded R&D and implementation for UPI Mobile Web payment checkout, optimizing digital transaction checkout workflows for mobile web investors.',
      'Built high-performance data tables and UI components using AG Grid, Swimlane Tables, and Angular Material.',
      'Achieved 100% rating on clean code PR reviews with zero rework on initial module deployments and 98.9% defect resolution TAT.'
    ],
    impact: [
      {
        metric: 'Spark Award',
        label: 'Excellence Winner',
        detail: 'Awarded Robosoft Spark Award for exceptional task ownership and zero-defect module deliveries.'
      },
      {
        metric: '97.6%',
        label: 'Client Acceptance',
        detail: 'Zero-rework initial delivery on core distributor recommendation & transaction modules.'
      },
      {
        metric: '100%',
        label: 'PR Code Quality',
        detail: 'Achieved maximum review rating with modular architecture and clean documentation.'
      }
    ],
    techStack: [
      'Angular',
      'React',
      'TypeScript',
      'AG Grid',
      'Roku SVOD Webhooks',
      'UPI Mobile Web',
      'Angular Material',
      'Swimlane Tables',
      'Ionic',
      'Redux Saga'
    ],
    featuredProjects: ['UTI Investor Portal', 'OTT TVOD/SVOD Platform', 'Roku Webhook Engine', 'UPI Mobile Checkout']
  },
  {
    id: 'trainee-se',
    company: 'Robosoft Technologies',
    role: 'Trainee Software Engineer',
    location: 'India',
    period: 'Trainee & Internship Phase',
    isCurrent: false,
    award: '100% PERFECT RATING',
    bannerImage: '/images/robo-banner.png',
    companyLogo: '/images/robo-logo.jpeg',
    summary: 'Completed intensive React, Next.js & Redux training, engineered standalone web applications, and contributed to Room To Read (global literacy non-profit) resolving complex Arabic RTL UI layouts.',
    logoText: 'RT',
    responsibilities: [
      'Mastered React.js, Next.js, Redux Toolkit, and modern CSS3/HTML5 frontend architecture during the Robosoft engineering onboarding program.',
      'Engineered three standalone React/Next web applications from scratch: Password Manager (security & state), Food Delivery Platform (catalog & checkout), and Weather Forecast Application (REST APIs & responsive UI).',
      'Joined the Room to Read global non-profit project (Libra), adapting quickly to React class components and multi-lingual global platform requirements.',
      'Resolved complex Arabic RTL (Right-to-Left) UI rendering alignment issues and responsive multi-language layout bugs with high customer acceptance.',
      'Achieved a perfect 100% performance rating for individual & team deliveries with zero defect leakage across training & production deployments.'
    ],
    impact: [
      {
        metric: 'Room To Read',
        label: 'Global Non-Profit',
        detail: 'Delivered Arabic RTL UI fixes and multi-language responsive layouts for literacy platform.'
      },
      {
        metric: '3 App Engines',
        label: 'Training Projects',
        detail: 'Built Password Manager, Food Delivery, and Weather Forecast web apps in React & Next.js.'
      },
      {
        metric: '100% Rating',
        label: 'Performance Score',
        detail: 'Achieved perfect 100% score across quality, delivery timeliness, clean coding, and adaptability.'
      }
    ],
    techStack: [
      'React.js',
      'Next.js',
      'Redux Toolkit',
      'Arabic RTL UI',
      'JavaScript (ES6+)',
      'HTML5 & CSS3',
      'REST APIs'
    ],
    featuredProjects: ['Room To Read (Libra Platform)', 'Password Manager App', 'Food Delivery Web App', 'Weather Forecast App']
  },
  {
    id: 'iisc-bangalore',
    company: 'IISc Bangalore — SPIRE Lab',
    role: 'Research Intern (RESPIN Project)',
    location: 'India',
    period: 'May 2021 – July 2021',
    isCurrent: false,
    award: 'MUCS CONFERENCE PARTICIPANT',
    bannerImage: '/images/iisc-banner.png',
    companyLogo: '/images/iisc-logo.png',
    summary: 'Contributed to low-resource multilingual Automatic Speech Recognition (ASR) research in SPIRE Lab under project RESPIN, building text corpora, data cleaning pipelines, and Bhojpuri–Hindi E2E ASR models.',
    logoText: 'IISc',
    responsibilities: [
      'Curated, cleaned, and normalized multilingual speech and text datasets for low-resource Indian languages under the RESPIN project in SPIRE Lab.',
      'Contributed to the implementation, training pipelines, and quality evaluation of a Bhojpuri–Hindi End-to-End Automatic Speech Recognition (ASR) model.',
      'Developed automated text scraping, corpus preparation, and data validation scripts for deep learning ASR training pipelines.',
      'Collaborated with AI researchers on experiment tracking, documentation, and participated in the MUCS Conference on speech recognition advancements.'
    ],
    impact: [
      {
        metric: 'E2E ASR',
        label: 'Speech Model',
        detail: 'Contributed to End-to-End Bhojpuri–Hindi Automatic Speech Recognition model implementation.'
      },
      {
        metric: 'Multilingual',
        label: 'Corpus Curation',
        detail: 'Curated large-scale speech and text datasets for low-resource Indian language research.'
      },
      {
        metric: 'MUCS 2021',
        label: 'Research Exposure',
        detail: 'Participated in the MUCS Conference presenting dataset preparation and AI research methodologies.'
      }
    ],
    techStack: [
      'Python',
      'Automatic Speech Recognition (ASR)',
      'Deep Learning Pipelines',
      'NLP Text Scraping',
      'Multilingual Corpus',
      'Data Normalization'
    ],
    featuredProjects: ['Bhojpuri–Hindi E2E ASR', 'SPIRE Lab RESPIN Corpus', 'MUCS Conference Research']
  }
];
