// src/types/servicePageTypes.ts

// Database entity interfaces
export interface ServicePageHeroEntity {
  id: number;
  main_title: string;
  brand_name: string;
  description: string;
  hero_image_url?: string;
  is_active: boolean;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ServicePageServiceEntity {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  is_active: boolean;
  display_order: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ServicePageProcessSectionEntity {
  id: number;
  process_number: number;
  title: string;
  description: string;
  note: string;
  image_url: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ServicePageConstructionSectionEntity {
  id: number;
  section_number: number;
  title_left: string;
  contents_left: string[]; // JSON array
  title_right: string;
  contents_right: string[]; // JSON array
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// API response interfaces (frontend-compatible)
export interface HeroContent {
  mainTitle: string;
  brandName: string;
  description: string;
  heroImageUrl?: string | undefined;
}

export interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceProcessData {
  processNumber: number;
  title: string;
  description: string;
  note: string;
  imageUrl: string;
}

export interface ConstructionServiceData {
  titleLeft: string;
  contentsLeft: string[];
  titleRight: string;
  contentsRight: string[];
}

export interface ServicePageData {
  heroContent: HeroContent;
  services: ServiceItem[];
  processSection1: ServiceProcessData;
  constructionSection1: ConstructionServiceData;
  processSection2: ServiceProcessData;
  constructionSection2: ConstructionServiceData;
  processSection3: ServiceProcessData;
  constructionSection3: ConstructionServiceData;
  processSection4: ServiceProcessData;
  constructionSection4: ConstructionServiceData;
}

// Input interfaces for POST/PUT requests
export interface CreateHeroContentInput {
  mainTitle: string;
  brandName: string;
  description: string;
  heroImageUrl?: string;
  displayOrder?: number;
}

export interface UpdateHeroContentInput extends Partial<CreateHeroContentInput> {}

export interface CreateServiceInput {
  title: string;
  subtitle?: string;
  description: string;
  displayOrder: number;
}

export interface UpdateServiceInput extends Partial<CreateServiceInput> {}

export interface CreateProcessSectionInput {
  processNumber: number;
  title: string;
  description: string;
  note?: string;
  imageUrl?: string;
}

export interface UpdateProcessSectionInput extends Partial<Omit<CreateProcessSectionInput, 'processNumber'>> {}

export interface CreateConstructionSectionInput {
  sectionNumber: number;
  titleLeft: string;
  contentsLeft: string[];
  titleRight: string;
  contentsRight: string[];
}

export interface UpdateConstructionSectionInput extends Partial<Omit<CreateConstructionSectionInput, 'sectionNumber'>> {}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 