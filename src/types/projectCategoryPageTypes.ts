// src/types/projectCategoryPageTypes.ts

export interface ProjectItem {
  id: string;
  title: string;
  thumbnailImage: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  subCategory: string;
  style?: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  projects: ProjectItem[];
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  subCategories: SubCategory[];
  heroImage?: string;
}

export interface ProjectCategoryPageData {
  categories: { [key: string]: CategoryData };
  defaultHeroImage: string;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 