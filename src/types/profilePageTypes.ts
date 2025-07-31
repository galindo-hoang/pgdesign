// Technical Advantages Phase interface
export interface TechnicalPhase {
  title: string;
  description: string;
  images: string[];
  layoutType: 'three-grid' | 'mixed-layout';
}

// Technical Advantages Data interface
export interface TechnicalAdvantagesData {
  mainTitle: string;
  phases: TechnicalPhase[];
}

// Props interface for TechnicalAdvantagesSection
export interface TechnicalAdvantagesSectionProps {
  data: TechnicalAdvantagesData;
}

// Construction Process Section interface
export interface ConstructionSection {
  title: string;
  description: string;
  images: string[];
  layoutType: 'two-images' | 'three-images' | 'single-large' | 'time-optimization';
}

// Construction Process Data interface
export interface ConstructionProcessData {
  sections: ConstructionSection[];
}

// Props interface for ConstructionProcessSection
export interface ConstructionProcessSectionProps {
  data: ConstructionProcessData;
}

// Capabilities Data interface
export interface CapabilitiesData {
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
}

// Props interface for CapabilitiesSection
export interface CapabilitiesSectionProps {
  data: CapabilitiesData;
}

// Profile Page Data interface - combines all sections
export interface ProfilePageData {
  capabilities: CapabilitiesData;
  constructionProcess: ConstructionProcessData;
  technicalAdvantages: TechnicalAdvantagesData;
} 