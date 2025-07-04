export interface Theme {
  id: string;
  name: string;
  status: 'complete' | 'development';
  image: string;
  description: string;
  category: string;
  subtopics: Subtopic[];
  isStatic?: boolean; // Flag to identify original themes
  createdAt?: string;
  updatedAt?: string;
}

export interface Subtopic {
  id: string;
  title: string;
  content: string;
  image?: string;
  structures?: Structure[];
}

export interface Structure {
  id: string;
  name: string;
  description: string;
  function: string;
  x: number;
  y: number;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  photo: string;
  formation: string;
  contribution: string;
  specialization?: string;
}

export interface CMSUser {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}

export interface CMSData {
  themes: Theme[];
  glossaryTerms: GlossaryTerm[];
  teamMembers: TeamMember[];
  users: CMSUser[];
  metadata?: {
    version: string;
    exportDate: string;
    generator: string;
    totalThemes?: number;
    customThemes?: number;
  };
}

export type ViewMode = 'grid' | 'theme' | 'comparison' | 'guide' | 'glossary' | 'team' | 'cms' | 'sitemap';
export type ThemeViewMode = 'pagination' | 'scroll';
export type FilterCategory = 'Todos' | 'Tecido Mole' | 'Tecido Duro' | 'Embrionário' | 'Adulto' | 'Patológico';
export type CMSSection = 'dashboard' | 'themes' | 'glossary' | 'team' | 'settings';