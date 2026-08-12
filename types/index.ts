export interface SiteConfig {
  name: string;
  shortName: string;
  url: string;
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
  award?: string;
  bannerImage?: string;
  companyLogo?: string;
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
  category: 'Full-Stack' | 'Mobile & Cross-Platform' | 'Real-Time' | 'Productivity' | 'Healthcare' | '3D & Graphics' | 'Frontend & E-Commerce' | 'Frontend';
  featured: boolean;
  period: string;
  heroImage: string;
  galleryImages: string[];
  columnGroups?: string[][];
  galleryColumns?: number;
  fullWidthImages?: string[];
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
  proficiency: 'Expert' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Foundational' | 'Beginner';
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
  credentialType: 'Specialization' | 'Certification';
  issueDate: string;
  credentialId?: string;
  verifyUrl: string;
  credlyUrl?: string;
  badgeImage?: string;
  summary: string;
  coursesCompleted?: string[];
  keyLearnings: string[];
  skillsGained: string[];
}

export interface PlaygroundItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  // Detail page fields (previously in playground-prompts.ts)
  libraryUsed: string;
  developerPurpose: string;
  architectureInsights: string[];
  aiPrompt?: string;
  githubUrl: string;
  interactiveDemoId: string;
  previewImage?: string;
  githubLink?: string;
  liveDemoUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  iconName: string;
}
