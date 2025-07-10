import { Request, Response } from 'express';
export declare class ConsultationController {
    submitConsultationForm: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getEmailServiceStatus: (req: Request, res: Response, next: import("express").NextFunction) => void;
    private validateConsultationForm;
    private isValidVietnamesePhoneNumber;
    private isValidEmail;
}
declare const _default: ConsultationController;
export default _default;
//# sourceMappingURL=ConsultationController.d.ts.map