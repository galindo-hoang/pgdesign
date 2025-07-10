"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCategoriesModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class ProjectCategoriesModel extends BaseModel_1.BaseModel {
    constructor() {
        super('project_categories_data');
        this.projectCategoriesItemsModel = new BaseModel_1.BaseModel('project_categories');
    }
    async getActiveProjectCategories() {
        const result = await this.findOneByCondition({ is_active: true });
        if (!result)
            return null;
        const categories = await (0, database_1.default)('project_categories')
            .where({
            categories_data_id: result.id,
            is_active: true
        })
            .orderBy('display_order', 'asc')
            .select('id', 'category_id', 'title', 'project_count', 'background_image_url', 'navigation_path', 'display_order');
        return {
            id: result.id,
            mainTitle: result.main_title,
            subtitle: result.subtitle,
            description: result.description,
            categories: categories.map((category) => ({
                id: category.id,
                categoryId: category.category_id,
                title: category.title,
                projectCount: category.project_count,
                backgroundImageUrl: category.background_image_url,
                navigationPath: category.navigation_path,
                displayOrder: category.display_order
            })),
            isActive: result.is_active,
            createdAt: result.created_at,
            updatedAt: result.updated_at
        };
    }
    async createProjectCategoriesWithItems(data, categories = []) {
        const trx = await database_1.default.transaction();
        try {
            await trx(this.tableName)
                .where({ is_active: true })
                .update({ is_active: false });
            const insertData = {
                main_title: data.mainTitle,
                subtitle: data.subtitle,
                description: data.description,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            };
            const [categoriesDataId] = await trx(this.tableName).insert(insertData);
            if (categories.length > 0) {
                const categoriesData = categories.map((category, index) => ({
                    categories_data_id: categoriesDataId,
                    category_id: category.categoryId,
                    title: category.title,
                    project_count: category.projectCount,
                    background_image_url: category.backgroundImageUrl,
                    navigation_path: category.navigationPath,
                    display_order: category.displayOrder || index,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }));
                await trx('project_categories').insert(categoriesData);
            }
            await trx.commit();
            return {
                id: categoriesDataId,
                mainTitle: data.mainTitle,
                subtitle: data.subtitle,
                description: data.description,
                categories: categories,
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
    async updateProjectCategoriesWithItems(id, data, categories) {
        const trx = await database_1.default.transaction();
        try {
            const updateData = {
                updated_at: new Date()
            };
            if (data.mainTitle !== undefined)
                updateData.main_title = data.mainTitle;
            if (data.subtitle !== undefined)
                updateData.subtitle = data.subtitle;
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
            if (categories !== undefined) {
                await trx('project_categories')
                    .where({ categories_data_id: id })
                    .update({ is_active: false });
                if (categories.length > 0) {
                    const categoriesData = categories.map((category, index) => ({
                        categories_data_id: id,
                        category_id: category.categoryId,
                        title: category.title,
                        project_count: category.projectCount,
                        background_image_url: category.backgroundImageUrl,
                        navigation_path: category.navigationPath,
                        display_order: category.displayOrder || index,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()
                    }));
                    await trx('project_categories').insert(categoriesData);
                }
            }
            await trx.commit();
            return await this.getActiveProjectCategories();
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async validateProjectCategoriesData(data) {
        const errors = [];
        if (!data.mainTitle || typeof data.mainTitle !== 'string') {
            errors.push('Main title is required and must be a string');
        }
        if (!data.subtitle || typeof data.subtitle !== 'string') {
            errors.push('Subtitle is required and must be a string');
        }
        if (!data.description || typeof data.description !== 'string') {
            errors.push('Description is required and must be a string');
        }
        return errors;
    }
    async validateProjectCategoryData(data) {
        const errors = [];
        if (!data.categoryId || typeof data.categoryId !== 'string') {
            errors.push('Category ID is required and must be a string');
        }
        if (!data.title || typeof data.title !== 'string') {
            errors.push('Title is required and must be a string');
        }
        if (typeof data.projectCount !== 'number') {
            errors.push('Project count is required and must be a number');
        }
        if (!data.backgroundImageUrl || typeof data.backgroundImageUrl !== 'string') {
            errors.push('Background image URL is required and must be a string');
        }
        if (!data.navigationPath || typeof data.navigationPath !== 'string') {
            errors.push('Navigation path is required and must be a string');
        }
        return errors;
    }
}
exports.ProjectCategoriesModel = ProjectCategoriesModel;
exports.default = new ProjectCategoriesModel();
//# sourceMappingURL=ProjectCategoriesModel.js.map