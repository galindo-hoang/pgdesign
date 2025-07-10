"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutProjectModel = void 0;
const BaseModel_1 = require("./BaseModel");
class AboutProjectModel extends BaseModel_1.BaseModel {
    constructor() {
        super('about_project_data');
    }
    async getActiveAboutProject() {
        const result = await this.findOneByCondition({ is_active: true });
        if (!result)
            return null;
        return {
            id: result.id,
            title: result.title,
            subtitle: result.subtitle,
            backgroundImageUrl: result.background_image_url,
            isActive: result.is_active,
            createdAt: result.created_at,
            updatedAt: result.updated_at
        };
    }
    async createOrUpdateAboutProject(data) {
        await this.updateByCondition({ is_active: true }, { is_active: false });
        const insertData = {
            title: data.title,
            subtitle: data.subtitle,
            background_image_url: data.backgroundImageUrl,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        };
        const [id] = await this.insert(insertData);
        return {
            id: id,
            title: data.title,
            subtitle: data.subtitle,
            backgroundImageUrl: data.backgroundImageUrl,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
    async updateByCondition(condition, updateData) {
        const result = await this.db(this.tableName).where(condition).update({
            ...updateData,
            updated_at: new Date()
        });
        return result > 0;
    }
    async insert(data) {
        return await this.db(this.tableName).insert(data);
    }
    get db() {
        return require('../config/database').default;
    }
    async updateAboutProject(id, data) {
        const updateData = {
            updated_at: new Date()
        };
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.subtitle !== undefined)
            updateData.subtitle = data.subtitle;
        if (data.backgroundImageUrl !== undefined)
            updateData.background_image_url = data.backgroundImageUrl;
        if (data.isActive !== undefined)
            updateData.is_active = data.isActive;
        const updated = await this.update(id, updateData);
        if (!updated)
            return null;
        return await this.getActiveAboutProject();
    }
    async validateAboutProjectData(data) {
        const errors = [];
        if (!data.title || typeof data.title !== 'string') {
            errors.push('Title is required and must be a string');
        }
        if (!data.subtitle || typeof data.subtitle !== 'string') {
            errors.push('Subtitle is required and must be a string');
        }
        if (!data.backgroundImageUrl || typeof data.backgroundImageUrl !== 'string') {
            errors.push('Background image URL is required and must be a string');
        }
        return errors;
    }
}
exports.AboutProjectModel = AboutProjectModel;
exports.default = new AboutProjectModel();
//# sourceMappingURL=AboutProjectModel.js.map