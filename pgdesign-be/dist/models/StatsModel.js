"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModel = void 0;
const database_js_1 = __importDefault(require("../config/database.js"));
const BaseModel_js_1 = require("./BaseModel.js");
class StatsModel extends BaseModel_js_1.BaseModel {
    constructor() {
        super('stats_header');
        this.statsItemsModel = new BaseModel_js_1.BaseModel('stats_items');
    }
    async getStatsWithItems() {
        const header = await this.findOneByCondition({ is_active: true });
        if (!header) {
            return null;
        }
        const items = await (0, database_js_1.default)('stats_items')
            .select('*')
            .where({ stats_header_id: header.id, is_active: true })
            .orderBy('display_order', 'asc');
        return {
            header,
            items
        };
    }
    async createStatsWithItems(headerData, itemsData) {
        const header = await this.create(headerData);
        if (itemsData && itemsData.length > 0) {
            const itemInserts = itemsData.map((item, index) => ({
                ...item,
                stats_header_id: header.id,
                display_order: index,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            }));
            await (0, database_js_1.default)('stats_items').insert(itemInserts);
        }
        const result = await this.getStatsWithItems();
        if (!result) {
            throw new Error('Failed to create stats with items');
        }
        return result;
    }
    async updateStatsWithItems(headerId, headerData, itemsData) {
        const updatedHeader = await this.update(headerId, headerData);
        if (!updatedHeader) {
            return null;
        }
        if (itemsData !== undefined) {
            await (0, database_js_1.default)('stats_items').where({ stats_header_id: headerId }).update({ is_active: false });
            if (itemsData.length > 0) {
                const itemInserts = itemsData.map((item, index) => ({
                    ...item,
                    stats_header_id: headerId,
                    display_order: index,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }));
                await (0, database_js_1.default)('stats_items').insert(itemInserts);
            }
        }
        return await this.getStatsWithItems();
    }
    async validateStatsHeaderData(data) {
        const errors = [];
        if (!data.main_headline || typeof data.main_headline !== 'string' || data.main_headline.trim().length === 0) {
            errors.push('Main headline is required and must be a non-empty string');
        }
        if (!data.sub_headline || typeof data.sub_headline !== 'string' || data.sub_headline.trim().length === 0) {
            errors.push('Sub headline is required and must be a non-empty string');
        }
        if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
            errors.push('Description is required and must be a non-empty string');
        }
        return errors;
    }
    async validateStatsItemData(data) {
        const errors = [];
        if (!data.icon_name || typeof data.icon_name !== 'string' || data.icon_name.trim().length === 0) {
            errors.push('Icon name is required and must be a non-empty string');
        }
        if (!data.icon_url || typeof data.icon_url !== 'string' || data.icon_url.trim().length === 0) {
            errors.push('Icon URL is required and must be a non-empty string');
        }
        if (data.target_value === undefined || typeof data.target_value !== 'number') {
            errors.push('Target value is required and must be a number');
        }
        if (!data.label || typeof data.label !== 'string' || data.label.trim().length === 0) {
            errors.push('Label is required and must be a non-empty string');
        }
        if (!data.suffix || typeof data.suffix !== 'string' || data.suffix.trim().length === 0) {
            errors.push('Suffix is required and must be a non-empty string');
        }
        if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
            errors.push('Description is required and must be a non-empty string');
        }
        if (!data.background_image_url || typeof data.background_image_url !== 'string' || data.background_image_url.trim().length === 0) {
            errors.push('Background image URL is required and must be a non-empty string');
        }
        if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
            errors.push('Category is required and must be a non-empty string');
        }
        return errors;
    }
}
exports.StatsModel = StatsModel;
exports.default = new StatsModel();
//# sourceMappingURL=StatsModel.js.map