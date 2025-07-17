// src/types/servicePageTypes.ts

export interface HeroContent {
  mainTitle: string;
  brandName: string;
  description: string;
  heroImageUrl: string;
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