import { BaseModel } from './BaseModel.js';
import { HeroData, HeroImage } from '../types/homePageTypes.js';
export declare class HeroModel extends BaseModel {
    private heroImagesModel;
    constructor();
    getHeroWithImages(): Promise<HeroData | null>;
    createHeroWithImages(heroData: any, imageUrls: string[]): Promise<HeroData>;
    updateHeroWithImages(id: number, heroData: any, imageUrls?: string[]): Promise<HeroData | null>;
    getHeroImages(heroId: number): Promise<HeroImage[]>;
    addHeroImage(heroId: number, imageData: any): Promise<HeroImage>;
    removeHeroImage(heroId: number, imageId: number): Promise<boolean>;
    reorderHeroImages(heroId: number, imageOrder: number[]): Promise<boolean>;
}
declare const _default: HeroModel;
export default _default;
//# sourceMappingURL=HeroModel.d.ts.map