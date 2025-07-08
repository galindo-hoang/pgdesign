import { BaseModel } from './BaseModel';
import { AboutIntroData } from '../types/introPageTypes';
export declare class AboutIntroModel extends BaseModel {
    constructor();
    getActiveAboutIntro(): Promise<AboutIntroData | null>;
    createOrUpdateAboutIntro(data: AboutIntroData): Promise<AboutIntroData>;
    updateAboutIntro(id: number, data: Partial<AboutIntroData>): Promise<AboutIntroData | null>;
    validateAboutIntroData(data: any): Promise<string[]>;
}
declare const _default: AboutIntroModel;
export default _default;
//# sourceMappingURL=AboutIntroModel.d.ts.map