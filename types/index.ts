export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  subRole: string;
  tagline: string;
  bio: string;
  location: string;
  timezone: string;
  availability: string;
  availableForWork: boolean;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  calendarUrl?: string;
  accentColor: string;
  accentHex: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  shortcut: string;
  badge?: string;
}

export interface ExperienceImpact {
  metric: string;
  label: string;
  detail: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  responsibilities: string[];
  impact: ExperienceImpact[];
  techStack: string[];
  featuredProjects: string[];
  logoText: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  codeSnippet?: string;
}

export interface ProjectArchitecture {
  summary: string;
  nodes: { id: string; label: string; sub: string; type: 'client' | 'server' | 'database' | 'service' }[];
  dataFlow: string[];
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'Mobile & Cross-Platform' | 'Real-Time' | 'Productivity' | 'Healthcare';
  featured: boolean;
  period: string;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: ProjectArchitecture;
  metrics: ProjectMetric[];
  techStack: string[];
  features: ProjectFeature[];
  challenges: string[];
  lessons: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface TechSkill {
  name: string;
  category: 'Frontend Core' | 'Frameworks & Mobile' | 'Backend & Cloud' | 'Graphics & Physics' | 'Design & Architecture';
  proficiency: 'Expert' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Foundational';
  experienceYears: number;
  featuredIn: string[];
  description: string;
  iconName: string;
}

export interface CertificationModule {
  name: string;
  skillsLearned: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl: string;
  summary: string;
  modules: CertificationModule[];
}

export interface PlaygroundItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  interactiveDemoId: string;
  githubLink?: string;
  liveDemoUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  iconName: string;
}
