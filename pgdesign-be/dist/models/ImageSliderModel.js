"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSliderModel = void 0;
const BaseModel_js_1 = require("./BaseModel.js");
const database_js_1 = __importDefault(require("../config/database.js"));
class ImageSliderModel extends BaseModel_js_1.BaseModel {
    constructor() {
        super('image_slider_data');
    }
    async getAllSlides() {
        return await (0, database_js_1.default)(this.tableName)
            .select('*')
            .where('is_active', true)
            .orderBy('display_order', 'asc');
    }
    async createSlide(slideData) {
        const maxOrder = await (0, database_js_1.default)(this.tableName)
            .where('is_active', true)
            .max('display_order as max_order')
            .first();
        const displayOrder = (maxOrder?.max_order || 0) + 1;
        return await this.create({
            ...slideData,
            display_order: displayOrder
        });
    }
    async updateSlideOrder(slideId, newOrder) {
        const result = await this.update(slideId, { display_order: newOrder });
        return result !== null;
    }
    async reorderSlides(slideIds) {
        const promises = slideIds.map((slideId, index) => {
            return this.update(slideId, { display_order: index });
        });
        await Promise.all(promises);
        return true;
    }
    async validateSlideData(data) {
        const errors = [];
        if (!data.image_url || typeof data.image_url !== 'string' || data.image_url.trim().length === 0) {
            errors.push('Image URL is required and must be a non-empty string');
        }
        if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
            errors.push('Title is required and must be a non-empty string');
        }
        if (!data.subtitle || typeof data.subtitle !== 'string' || data.subtitle.trim().length === 0) {
            errors.push('Subtitle is required and must be a non-empty string');
        }
        if (!data.size || typeof data.size !== 'string' || data.size.trim().length === 0) {
            errors.push('Size is required and must be a non-empty string');
        }
        if (data.title && data.title.length > 255) {
            errors.push('Title must be less than 255 characters');
        }
        if (data.subtitle && data.subtitle.length > 255) {
            errors.push('Subtitle must be less than 255 characters');
        }
        if (data.size && data.size.length > 100) {
            errors.push('Size must be less than 100 characters');
        }
        return errors;
    }
}
exports.ImageSliderModel = ImageSliderModel;
exports.default = new ImageSliderModel();
//# sourceMappingURL=ImageSliderModel.js.map