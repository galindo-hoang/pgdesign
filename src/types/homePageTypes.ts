// src/types/homePageTypes.ts

export interface HeroData {
  images: string[];
}

export interface AboutData {
  headline: string;
  subHeadline: string;
  description: string;
}

export interface ImageSlideData {
  id: number;
  projectId: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  size: string;
}

export interface StatMainHeader {
  mainHeadline: string;
  subHeadline: string;
  description: string;
}

export interface StatItemData {
  id: number;
  icon: React.ElementType;
  targetValue: number;
  label: string;
  suffix: string;
  description: string;
  backgroundImage: string;
  category: string;
}

export interface StatsData {
  header: StatMainHeader;
  items: StatItemData[];
}

export interface SolutionHeader {
  mainHeadline: string;
  subHeadline: string;
}

export interface SolutionItemData {
  id: number;
  imageUrl: string;
  category: string;
  title: string[]; // Changed from string to string[]
  link: string;
}

export interface SolutionData {
  header: SolutionHeader;
  solutions: SolutionItemData[];
}

export interface WorkflowTab {
  id: string;
  icon: React.ElementType;
  title: string;
  diagram: React.ElementType;
}

export interface WorkflowData {
  title: string;
  workflows: WorkflowTab[];
}

export interface DiaryImage {
  src: string;
  alt: string;
  className?: string;
}

export interface ProjectDiaryData {
  title: string;
  images: DiaryImage[];
}

export interface Testimonial {
  name: string;
  project: string;
  text: string;
}

export interface TestimonialHeader {
  mainHeadline: string;
  subHeadline: string;
}

export interface TestimonialData {
  header: TestimonialHeader;
  testimonials: Testimonial[];
}

export interface ConsultationFormData {
  title: string;
  projectTypes: string[];
  minInvestment: number;
  maxInvestment: number;
  stepInvestment: number;
}

export interface HomePageData {
  hero: HeroData;
  about: AboutData;
  imageSlider: ImageSlideData[];
  stats: StatsData;
  solution: SolutionData;
  workflow: WorkflowData;
  projectDiary: ProjectDiaryData;
  testimonials: TestimonialData;
  consultationForm: ConsultationFormData;
} 