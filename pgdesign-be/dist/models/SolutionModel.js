"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class SolutionModel extends BaseModel_1.BaseModel {
    constructor() {
        super('solution_header');
        this.solutionItemsModel = new BaseModel_1.BaseModel('solution_items');
    }
    async getSolutionWithItems() {
        const header = await this.findOneByCondition({ is_active: true });
        if (!header) {
            return null;
        }
        const items = await (0, database_1.default)('solution_items')
            .select('*')
            .where({ solution_header_id: header.id, is_active: true })
            .orderBy('display_order', 'asc');
        return {
            header,
            solutions: items
        };
    }
    async createSolutionWithItems(headerData, items) {
        const header = await this.create(headerData);
        const createdItems = [];
        for (let i = 0; i < items.length; i++) {
            const item = await this.solutionItemsModel.create({
                ...items[i],
                solution_header_id: header.id,
                display_order: i
            });
            createdItems.push(item);
        }
        return {
            header,
            solutions: createdItems
        };
    }
    async updateSolutionWithItems(headerId, headerData, items) {
        const updatedHeader = await this.update(headerId, headerData);
        if (!updatedHeader) {
            return null;
        }
        if (items) {
            await (0, database_1.default)('solution_items')
                .where({ solution_header_id: headerId })
                .update({ is_active: false, updated_at: new Date() });
            for (let i = 0; i < items.length; i++) {
                await this.solutionItemsModel.create({
                    ...items[i],
                    solution_header_id: headerId,
                    display_order: i
                });
            }
        }
        return await this.getSolutionWithItems();
    }
    async validateSolutionHeaderData(data) {
        const errors = [];
        if (!data.main_headline || typeof data.main_headline !== 'string' || data.main_headline.trim().length === 0) {
            errors.push('Main headline is required and must be a non-empty string');
        }
        if (!data.sub_headline || typeof data.sub_headline !== 'string' || data.sub_headline.trim().length === 0) {
            errors.push('Sub headline is required and must be a non-empty string');
        }
        return errors;
    }
    async validateSolutionItemData(data) {
        const errors = [];
        if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
            errors.push('Title is required and must be a non-empty string');
        }
        if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
            errors.push('Category is required and must be a non-empty string');
        }
        if (!data.image_url || typeof data.image_url !== 'string' || data.image_url.trim().length === 0) {
            errors.push('Image URL is required and must be a non-empty string');
        }
        return errors;
    }
}
exports.SolutionModel = SolutionModel;
exports.default = new SolutionModel();
//# sourceMappingURL=SolutionModel.js.map