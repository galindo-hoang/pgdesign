import { BaseModel } from './BaseModel';
import { ConsultationFormData, ProjectType } from '../types/homePageTypes';
export declare class ConsultationFormModel extends BaseModel {
    private projectTypesModel;
    constructor();
    getConsultationFormWithProjectTypes(): Promise<{
        main: ConsultationFormData;
        projectTypes: ProjectType[];
    } | null>;
    createConsultationFormWithProjectTypes(formData: Partial<ConsultationFormData>, projectTypes: Partial<ProjectType>[]): Promise<{
        main: ConsultationFormData;
        projectTypes: ProjectType[];
    }>;
    updateConsultationFormWithProjectTypes(formId: number, formData: Partial<ConsultationFormData>, projectTypes?: Partial<ProjectType>[]): Promise<{
        main: ConsultationFormData;
        projectTypes: ProjectType[];
    } | null>;
    validateConsultationFormData(data: any): Promise<string[]>;
    validateProjectTypeData(data: any): Promise<string[]>;
}
declare const _default: ConsultationFormModel;
export default _default;
//# sourceMappingURL=ConsultationFormModel.d.ts.map