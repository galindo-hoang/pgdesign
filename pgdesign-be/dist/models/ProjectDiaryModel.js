"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDiaryModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class ProjectDiaryModel extends BaseModel_1.BaseModel {
    constructor() {
        super('project_diary_data');
        this.projectDiaryImagesModel = new BaseModel_1.BaseModel('project_diary_images');
    }
    async getProjectDiaryWithImages() {
        const main = await this.findOneByCondition({ is_active: true });
        if (!main) {
            return null;
        }
        const images = await (0, database_1.default)('project_diary_images')
            .select('*')
            .where({ project_diary_id: main.id, is_active: true })
            .orderBy('display_order', 'asc');
        return {
            main,
            images
        };
    }
    async createProjectDiaryWithImages(diaryData, images) {
        const main = await this.create(diaryData);
        const createdImages = [];
        for (let i = 0; i < images.length; i++) {
            const image = await this.projectDiaryImagesModel.create({
                ...images[i],
                project_diary_id: main.id,
                display_order: i
            });
            createdImages.push(image);
        }
        return {
            main,
            images: createdImages
        };
    }
    async updateProjectDiaryWithImages(diaryId, diaryData, images) {
        const updatedMain = await this.update(diaryId, diaryData);
        if (!updatedMain) {
            return null;
        }
        if (images) {
            await (0, database_1.default)('project_diary_images')
                .where({ project_diary_id: diaryId })
                .update({ is_active: false, updated_at: new Date() });
            for (let i = 0; i < images.length; i++) {
                await this.projectDiaryImagesModel.create({
                    ...images[i],
                    project_diary_id: diaryId,
                    display_order: i
                });
            }
        }
        return await this.getProjectDiaryWithImages();
    }
    async validateProjectDiaryData(data) {
        const errors = [];
        if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
            errors.push('Title is required and must be a non-empty string');
        }
        return errors;
    }
    async validateProjectDiaryImageData(data) {
        const errors = [];
        if (!data.image_url || typeof data.image_url !== 'string' || data.image_url.trim().length === 0) {
            errors.push('Image URL is required and must be a non-empty string');
        }
        if (!data.image_alt || typeof data.image_alt !== 'string' || data.image_alt.trim().length === 0) {
            errors.push('Image alt text is required and must be a non-empty string');
        }
        return errors;
    }
}
exports.ProjectDiaryModel = ProjectDiaryModel;
exports.default = new ProjectDiaryModel();
//# sourceMappingURL=ProjectDiaryModel.js.map