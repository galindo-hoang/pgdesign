export interface CapabilitiesData {
  id?: number;
  title: string;
  companyName: string;
  serviceLine: string;
  description: string;
  capabilities: string[];
  images: {
    mainImage: string;
    sideImages: string[];
  };
  benefitsTitle: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ConstructionProcessSection {
  id?: number;
  title: string;
  description: string;
  images: string[];
  layoutType: string;
  display_order?: number;
  is_active?: boolean;
}

export interface ConstructionProcessData {
  sections: ConstructionProcessSection[];
}

export interface TechnicalAdvantagePhase {
  id?: number;
  title: string;
  description: string;
  images: string[];
  layoutType: string;
  display_order?: number;
  is_active?: boolean;
}

export interface TechnicalAdvantagesData {
  mainTitle: string;
  phases: TechnicalAdvantagePhase[];
}

export interface ProfilePageData {
  capabilities: CapabilitiesData;
  constructionProcess: ConstructionProcessData;
  technicalAdvantages: TechnicalAdvantagesData;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
