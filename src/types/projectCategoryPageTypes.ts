// Updated types to work with direct category-project relationship (no subcategories)

export interface ProjectDetail {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  projectCategoryId: number; // Direct reference to category
  style?: string;
  thumbnailImage?: string;
  htmlContent: string;
  projectImages?: string[];
  projectStatus?: string; // Now includes budget information
  completionDate?: string;
  architectName?: string;
  contractorName?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  isOnHomePage: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // subCategory: string;
}

// Project overview data for listings
export interface ProjectOverviewData {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  style?: string;
  thumbnailImage?: string;
  isActive: boolean;
}

// Category info (basic category data)
export interface CategoryInfo {
  id: number;
  categoryId: string;
  title: string;
  description: string;
  heroImageUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

// Complete category structure with projects (for frontend display)
export interface ProjectCategory extends CategoryInfo {
  projects: ProjectDetail[];
  projectCount: number;
}

// API Response interfaces
export interface ProjectCategoryApiResponse {
  success: boolean;
  data: ProjectCategory;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Legacy interfaces for backward compatibility (can be removed later)
export interface ProjectItem {
  id: string;
  title: string;
  thumbnailImage: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description: string;
  category: string;
  style: string;
}

// Category data structure for project listings
export interface CategoryData {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  projects: ProjectItem[];
} 