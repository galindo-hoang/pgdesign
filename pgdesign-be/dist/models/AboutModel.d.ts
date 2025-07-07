import { BaseModel } from './BaseModel';
import { AboutData } from '../types/homePageTypes';
export declare class AboutModel extends BaseModel {
    constructor();
    getActiveAbout(): Promise<AboutData | null>;
    createOrUpdateAbout(aboutData: Partial<AboutData>): Promise<AboutData>;
    validateAboutData(data: any): Promise<string[]>;
}
declare const _default: AboutModel;
export default _default;
//# sourceMappingURL=AboutModel.d.ts.map