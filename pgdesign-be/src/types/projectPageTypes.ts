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
  backgroundImageUrl: string | null; // S3/MinIO URL
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
  targetValue: number;
  label: string;
  suffix: string;
  description: string;
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
  backgroundImageUrl: string | null; // S3/MinIO URL
  navigationPath: string;
  displayOrder: number;
}

// Request Types for Individual Project Category Management
export interface CreateProjectCategoryRequest {
  categoryId: string;
  title: string;
  projectCount: number;
  backgroundImageUrl: string | null; // S3/MinIO URL
  navigationPath: string;
  displayOrder?: number;
}

export interface UpdateProjectCategoryRequest {
  title?: string;
  projectCount?: number;
  backgroundImageUrl?: string | null; // S3/MinIO URL
  navigationPath?: string;
  displayOrder?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
