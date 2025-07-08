import { BaseModel } from './BaseModel';
import { AboutProjectData } from '../types/projectPageTypes';
export declare class AboutProjectModel extends BaseModel {
    constructor();
    getActiveAboutProject(): Promise<AboutProjectData | null>;
    createOrUpdateAboutProject(data: AboutProjectData): Promise<AboutProjectData>;
    updateAboutProject(id: number, data: Partial<AboutProjectData>): Promise<AboutProjectData | null>;
    validateAboutProjectData(data: any): Promise<string[]>;
}
declare const _default: AboutProjectModel;
export default _default;
//# sourceMappingURL=AboutProjectModel.d.ts.map