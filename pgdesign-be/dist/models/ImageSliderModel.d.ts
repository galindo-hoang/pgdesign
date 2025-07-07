import { BaseModel } from './BaseModel';
import { ImageSlideData } from '../types/homePageTypes';
export declare class ImageSliderModel extends BaseModel {
    constructor();
    getAllSlides(): Promise<ImageSlideData[]>;
    createSlide(slideData: Partial<ImageSlideData>): Promise<ImageSlideData>;
    updateSlideOrder(slideId: number, newOrder: number): Promise<boolean>;
    reorderSlides(slideIds: number[]): Promise<boolean>;
    validateSlideData(data: any): Promise<string[]>;
}
declare const _default: ImageSliderModel;
export default _default;
//# sourceMappingURL=ImageSliderModel.d.ts.map