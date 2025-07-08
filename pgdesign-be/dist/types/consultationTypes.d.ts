export interface ConsultationFormSubmission {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    projectType: string;
    investmentLevel: string;
    specificRequest?: string;
}
export interface ConsultationResponse {
    success: boolean;
    message?: string;
    data?: any;
    error?: string;
}
export interface EmailConfig {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
}
export interface ValidationError {
    field: string;
    message: string;
}
//# sourceMappingURL=consultationTypes.d.ts.map