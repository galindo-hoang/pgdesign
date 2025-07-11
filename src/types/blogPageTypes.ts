// src/types/blogPageTypes.ts

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Hero Section Data
export interface BlogHeroData {
  id: number;
  title: string;
  subtitle: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Project Item Data
export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  area: string;
  style: string;
  client: string;
  location: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// Design Style Data
export interface DesignStyle {
  id: number;
  name: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Important Factor Data
export interface ImportantFactor {
  id: number;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Process Step Data
export interface ProcessStep {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Content Section Data
export interface ContentSection {
  id: number;
  mainTitle: string;
  introText: string;
  designStylesTitle: string;
  designStyles: DesignStyle[];
  factorsTitle: string;
  importantFactors: ImportantFactor[];
  processTitle: string;
  processSteps: ProcessStep[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Consultation CTA Data
export interface ConsultationCTA {
  id: number;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Complete Blog Page Data
export interface BlogPageData {
  heroData: BlogHeroData;
  projectItems: ProjectItem[];
  contentSection: ContentSection;
  consultationCTA: ConsultationCTA;
}

// Gallery Data (for projects)
export interface ProjectGalleryData {
  projects: ProjectItem[];
  totalProjects: number;
  hasMore: boolean;
}

// For pagination and filtering
export interface BlogPageFilters {
  category?: string;
  style?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

// Blog Page Service Response
export interface BlogPageServiceResponse {
  blogPageData: BlogPageData;
  error?: string;
} 