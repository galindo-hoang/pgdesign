"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class TestimonialModel extends BaseModel_1.BaseModel {
    constructor() {
        super('testimonial_header');
        this.testimonialsModel = new BaseModel_1.BaseModel('testimonials');
    }
    async getTestimonialWithItems() {
        const header = await this.findOneByCondition({ is_active: true });
        if (!header) {
            return null;
        }
        const testimonials = await (0, database_1.default)('testimonials')
            .select('*')
            .where({ testimonial_header_id: header.id, is_active: true })
            .orderBy('display_order', 'asc');
        return {
            header,
            testimonials
        };
    }
    async createTestimonialWithItems(headerData, testimonials) {
        const header = await this.create(headerData);
        const createdTestimonials = [];
        for (let i = 0; i < testimonials.length; i++) {
            const testimonial = await this.testimonialsModel.create({
                ...testimonials[i],
                testimonial_header_id: header.id,
                display_order: i
            });
            createdTestimonials.push(testimonial);
        }
        return {
            header,
            testimonials: createdTestimonials
        };
    }
    async updateTestimonialWithItems(headerId, headerData, testimonials) {
        const updatedHeader = await this.update(headerId, headerData);
        if (!updatedHeader) {
            return null;
        }
        if (testimonials) {
            await (0, database_1.default)('testimonials')
                .where({ testimonial_header_id: headerId })
                .update({ is_active: false, updated_at: new Date() });
            for (let i = 0; i < testimonials.length; i++) {
                await this.testimonialsModel.create({
                    ...testimonials[i],
                    testimonial_header_id: headerId,
                    display_order: i
                });
            }
        }
        return await this.getTestimonialWithItems();
    }
    async validateTestimonialHeaderData(data) {
        const errors = [];
        if (!data.main_headline || typeof data.main_headline !== 'string' || data.main_headline.trim().length === 0) {
            errors.push('Main headline is required and must be a non-empty string');
        }
        if (!data.sub_headline || typeof data.sub_headline !== 'string' || data.sub_headline.trim().length === 0) {
            errors.push('Sub headline is required and must be a non-empty string');
        }
        return errors;
    }
    async validateTestimonialItemData(data) {
        const errors = [];
        if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
            errors.push('Name is required and must be a non-empty string');
        }
        if (!data.project || typeof data.project !== 'string' || data.project.trim().length === 0) {
            errors.push('Project is required and must be a non-empty string');
        }
        if (!data.text || typeof data.text !== 'string' || data.text.trim().length === 0) {
            errors.push('Text is required and must be a non-empty string');
        }
        return errors;
    }
}
exports.TestimonialModel = TestimonialModel;
exports.default = new TestimonialModel();
//# sourceMappingURL=TestimonialModel.js.map