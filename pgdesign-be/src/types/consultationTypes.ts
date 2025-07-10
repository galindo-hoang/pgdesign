// src/types/consultationTypes.ts

export interface ConsultationFormSubmission {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  projectType: string;
  investmentLevel: string;
  specificRequest?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface EmailConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

export interface ConsultationResponse {
  success: boolean;
  message: string;
  data?: {
    submittedAt: string;
    customerName: string;
    projectType: string;
  };
} 