export interface AboutIntroData {
  id?: number;
  brandTitle: string;
  brandSubtitle: string;
  identity: string;
  descriptions: string[];
  backgroundImage: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VisionMissionData {
  id?: number;
  image: string;
  vision: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    items: string[];
  };
  coreValues: {
    title: string;
    values: CoreValue[];
  };
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CoreValue {
  id?: number;
  title: string;
  description: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface CommitmentsData {
  id?: number;
  title: string;
  commitments: CommitmentItem[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommitmentItem {
  id?: number;
  iconName: string;
  title: string;
  description: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface TeamData {
  id?: number;
  content: {
    heading: string;
    description: string;
  };
  boardDirectors: TeamMember[];
  teamMembers: TeamMember[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TeamMember {
  id?: number;
  name: string;
  title: string;
  image: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface IntroPageData {
  aboutIntro: AboutIntroData;
  visionMission: VisionMissionData;
  commitments: CommitmentsData;
  team: TeamData;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 