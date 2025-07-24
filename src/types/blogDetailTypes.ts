// src/types/blogDetailTypes.ts

// Blog Detail Data
export interface BlogDetailData {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  thumbnail: string;
  viewCount: number;
  hashtags: string[];
  publishDate: string;
  slug: string;
  htmlContent: string;
  author?: string;
  readTime?: string;
  category?: string;
}

// Blog Detail Service Response
export interface BlogDetailServiceResponse {
  blogDetailData: BlogDetailData;
  error?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 