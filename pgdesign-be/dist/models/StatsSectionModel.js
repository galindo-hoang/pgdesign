"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsSectionModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class StatsSectionModel extends BaseModel_1.BaseModel {
    constructor() {
        super('stats_section_data');
        this.statsItemsModel = new BaseModel_1.BaseModel('stats_items');
    }
    async getActiveStatsSection() {
        const result = await this.findOneByCondition({ is_active: true });
        if (!result)
            return null;
        const statsItems = await (0, database_1.default)('stats_items')
            .where({
            stats_section_id: result.id,
            is_active: true
        })
            .orderBy('display_order', 'asc')
            .select('id', 'icon_name', 'icon_url', 'target_value', 'label', 'suffix', 'description', 'background_image_url', 'category', 'display_order');
        return {
            id: result.id,
            mainHeadline: result.main_headline,
            subHeadline: result.sub_headline,
            description: result.description,
            statsItems: statsItems.map((item) => ({
                id: item.id,
                iconName: item.icon_name,
                iconUrl: item.icon_url,
                targetValue: item.target_value,
                label: item.label,
                suffix: item.suffix,
                description: item.description,
                backgroundImageUrl: item.background_image_url,
                category: item.category,
                displayOrder: item.display_order
            })),
            isActive: result.is_active,
            createdAt: result.created_at,
            updatedAt: result.updated_at
        };
    }
    async createStatsSectionWithItems(data, statsItems = []) {
        const trx = await database_1.default.transaction();
        try {
            await trx(this.tableName)
                .where({ is_active: true })
                .update({ is_active: false });
            const insertData = {
                main_headline: data.mainHeadline,
                sub_headline: data.subHeadline,
                description: data.description,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            };
            const [statsSectionId] = await trx(this.tableName).insert(insertData);
            if (statsItems.length > 0) {
                const statsItemsData = statsItems.map((item, index) => ({
                    stats_section_id: statsSectionId,
                    icon_name: item.iconName,
                    icon_url: item.iconUrl,
                    target_value: item.targetValue,
                    label: item.label,
                    suffix: item.suffix,
                    description: item.description,
                    background_image_url: item.backgroundImageUrl,
                    category: item.category,
                    display_order: item.displayOrder || index,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }));
                await trx('stats_items').insert(statsItemsData);
            }
            await trx.commit();
            return {
                id: statsSectionId,
                mainHeadline: data.mainHeadline,
                subHeadline: data.subHeadline,
                description: data.description,
                statsItems: statsItems,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async updateStatsSectionWithItems(id, data, statsItems) {
        const trx = await database_1.default.transaction();
        try {
            const updateData = {
                updated_at: new Date()
            };
            if (data.mainHeadline !== undefined)
                updateData.main_headline = data.mainHeadline;
            if (data.subHeadline !== undefined)
                updateData.sub_headline = data.subHeadline;
            if (data.description !== undefined)
                updateData.description = data.description;
            if (data.isActive !== undefined)
                updateData.is_active = data.isActive;
            const updated = await trx(this.tableName)
                .where({ id })
                .update(updateData);
            if (!updated) {
                await trx.rollback();
                return null;
            }
            if (statsItems !== undefined) {
                await trx('stats_items')
                    .where({ stats_section_id: id })
                    .update({ is_active: false });
                if (statsItems.length > 0) {
                    const statsItemsData = statsItems.map((item, index) => ({
                        stats_section_id: id,
                        icon_name: item.iconName,
                        icon_url: item.iconUrl,
                        target_value: item.targetValue,
                        label: item.label,
                        suffix: item.suffix,
                        description: item.description,
                        background_image_url: item.backgroundImageUrl,
                        category: item.category,
                        display_order: item.displayOrder || index,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()
                    }));
                    await trx('stats_items').insert(statsItemsData);
                }
            }
            await trx.commit();
            return await this.getActiveStatsSection();
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async validateStatsSectionData(data) {
        const errors = [];
        if (!data.mainHeadline || typeof data.mainHeadline !== 'string') {
            errors.push('Main headline is required and must be a string');
        }
        if (!data.subHeadline || typeof data.subHeadline !== 'string') {
            errors.push('Sub headline is required and must be a string');
        }
        if (!data.description || typeof data.description !== 'string') {
            errors.push('Description is required and must be a string');
        }
        return errors;
    }
    async validateStatsItemData(data) {
        const errors = [];
        if (!data.iconName || typeof data.iconName !== 'string') {
            errors.push('Icon name is required and must be a string');
        }
        if (!data.iconUrl || typeof data.iconUrl !== 'string') {
            errors.push('Icon URL is required and must be a string');
        }
        if (typeof data.targetValue !== 'number') {
            errors.push('Target value is required and must be a number');
        }
        if (!data.label || typeof data.label !== 'string') {
            errors.push('Label is required and must be a string');
        }
        if (!data.suffix || typeof data.suffix !== 'string') {
            errors.push('Suffix is required and must be a string');
        }
        if (!data.description || typeof data.description !== 'string') {
            errors.push('Description is required and must be a string');
        }
        if (!data.backgroundImageUrl || typeof data.backgroundImageUrl !== 'string') {
            errors.push('Background image URL is required and must be a string');
        }
        if (!data.category || typeof data.category !== 'string') {
            errors.push('Category is required and must be a string');
        }
        return errors;
    }
}
exports.StatsSectionModel = StatsSectionModel;
exports.default = new StatsSectionModel();
//# sourceMappingURL=StatsSectionModel.js.map