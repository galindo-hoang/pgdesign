// src/types/blogPageTypes.ts

// ========== DATABASE ENTITY INTERFACES ==========

// Blog Hero Section Entity
export interface BlogHeroEntity {
  id: number;
  title: string;
  subtitle: string;
  is_active: boolean;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
}

// Blog Project Item Entity
export interface BlogProjectItemEntity {
  id: number;
  project_id: string;
  title: string;
  image_url: string;
  area: string;
  style: string;
  client_name: string;
  location: string;
  is_active: boolean;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
}

// Design Style Entity
export interface DesignStyleEntity {
  id: number;
  content_section_id: number;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Important Factor Entity
export interface ImportantFactorEntity {
  id: number;
  content_section_id: number;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Process Step Entity
export interface ProcessStepEntity {
  id: number;
  content_section_id: number;
  step_number: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Content Section Entity
export interface ContentSectionEntity {
  id: number;
  main_title: string;
  intro_text: string;
  design_styles_title: string;
  factors_title: string;
  process_title: string;
  is_active: boolean;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
}

// Consultation CTA Entity
export interface ConsultationCTAEntity {
  id: number;
  title: string;
  description: string;
  features: string; // JSON string
  button_text: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
}

// ========== API RESPONSE INTERFACES (Frontend Compatible) ==========

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
export interface BlogProjectItem {
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
  projectItems: BlogProjectItem[];
  contentSection: ContentSection;
  consultationCTA: ConsultationCTA;
}

// Gallery Data (for projects with pagination)
export interface ProjectGalleryData {
  projects: BlogProjectItem[];
  totalProjects: number;
  hasMore: boolean;
}

// ========== REQUEST/RESPONSE INTERFACES ==========

// Blog Page Filters
export interface BlogPageFilters {
  category?: string;
  style?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

// Create/Update Request Types
export interface CreateBlogHeroRequest {
  title: string;
  subtitle: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateBlogHeroRequest {
  title?: string;
  subtitle?: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface CreateBlogProjectItemRequest {
  projectId: string;
  title: string;
  imageUrl: string;
  area: string;
  style: string;
  clientName: string;
  location: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateBlogProjectItemRequest {
  projectId?: string;
  title?: string;
  imageUrl?: string;
  area?: string;
  style?: string;
  clientName?: string;
  location?: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface CreateContentSectionRequest {
  mainTitle: string;
  introText: string;
  designStylesTitle: string;
  factorsTitle: string;
  processTitle: string;
  designStyles: Omit<DesignStyle, 'id' | 'createdAt' | 'updatedAt'>[];
  importantFactors: Omit<ImportantFactor, 'id' | 'createdAt' | 'updatedAt'>[];
  processSteps: Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>[];
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateContentSectionRequest {
  mainTitle?: string;
  introText?: string;
  designStylesTitle?: string;
  factorsTitle?: string;
  processTitle?: string;
  designStyles?: Omit<DesignStyle, 'id' | 'createdAt' | 'updatedAt'>[];
  importantFactors?: Omit<ImportantFactor, 'id' | 'createdAt' | 'updatedAt'>[];
  processSteps?: Omit<ProcessStep, 'id' | 'createdAt' | 'updatedAt'>[];
  isActive?: boolean;
  displayOrder?: number;
}

export interface CreateConsultationCTARequest {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  imageUrl: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateConsultationCTARequest {
  title?: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  imageUrl?: string;
  isActive?: boolean;
  displayOrder?: number;
}

// ========== STANDARD API RESPONSE TYPES ==========

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
  error?: string;
}

// ========== BULK OPERATIONS ==========

export interface BulkUpdateRequest {
  ids: number[];
  updates: {
    isActive?: boolean;
    displayOrder?: number;
  };
}

export interface BulkDeleteRequest {
  ids: number[];
  hardDelete?: boolean;
}

export interface BulkResponse {
  success: boolean;
  message: string;
  affectedCount: number;
  errors?: string[];
}

// ========== UTILITY TYPES ==========

export interface BlogPageStats {
  totalProjects: number;
  activeProjects: number;
  totalStyles: number;
  totalFactors: number;
  totalProcessSteps: number;
  lastUpdated: Date;
}

export interface BlogPageSearchFilters {
  query?: string;
  category?: string;
  style?: string;
  location?: string;
  isActive?: boolean;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'created_at' | 'updated_at' | 'display_order' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
} 