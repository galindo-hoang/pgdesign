import { BaseModel } from './BaseModel';
import { TestimonialData, TestimonialHeader, Testimonial } from '../types/homePageTypes';
export declare class TestimonialModel extends BaseModel {
    private testimonialsModel;
    constructor();
    getTestimonialWithItems(): Promise<TestimonialData | null>;
    createTestimonialWithItems(headerData: Partial<TestimonialHeader>, testimonials: Partial<Testimonial>[]): Promise<TestimonialData>;
    updateTestimonialWithItems(headerId: number, headerData: Partial<TestimonialHeader>, testimonials?: Partial<Testimonial>[]): Promise<TestimonialData | null>;
    validateTestimonialHeaderData(data: any): Promise<string[]>;
    validateTestimonialItemData(data: any): Promise<string[]>;
}
declare const _default: TestimonialModel;
export default _default;
//# sourceMappingURL=TestimonialModel.d.ts.map