// src/types/projectDetailTypes.ts

export interface ProjectDetailData {
  id: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  subCategory: string;
  style?: string;
  thumbnailImage: string;

  // Embedded HTML content from server
  htmlContent: string;

  // Additional project details
  projectImages?: string[]; // Array of base64 encoded image data (BLOB storage)
  projectStatus?: string; // Now includes budget information
  completionDate?: string;
  architectName?: string;
  contractorName?: string;

  // SEO and metadata
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];

  // Admin managed content
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
