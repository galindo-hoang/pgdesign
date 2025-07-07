// Project Page Types

export interface ProjectPageData {
  aboutProject: AboutProjectData;
  statsSection: StatsSectionData;
  projectCategories: ProjectCategoriesData;
}

export interface AboutProjectData {
  id: number;
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatsSectionData {
  id: number;
  mainHeadline: string;
  subHeadline: string;
  description: string;
  statsItems: StatsItem[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatsItem {
  id: number;
  iconName: string;
  iconUrl: string;
  targetValue: number;
  label: string;
  suffix: string;
  description: string;
  backgroundImageUrl: string;
  category: string;
  displayOrder: number;
}

export interface ProjectCategoriesData {
  id: number;
  mainTitle: string;
  subtitle: string;
  description: string;
  categories: ProjectCategory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCategory {
  id: number;
  categoryId: string;
  title: string;
  projectCount: number;
  backgroundImageUrl: string;
  navigationPath: string;
  displayOrder: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 