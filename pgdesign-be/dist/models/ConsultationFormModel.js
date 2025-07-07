"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationFormModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class ConsultationFormModel extends BaseModel_1.BaseModel {
    constructor() {
        super('consultation_form_data');
        this.projectTypesModel = new BaseModel_1.BaseModel('project_types');
    }
    async getConsultationFormWithProjectTypes() {
        const main = await this.findOneByCondition({ is_active: true });
        if (!main) {
            return null;
        }
        const projectTypes = await (0, database_1.default)('project_types')
            .select('*')
            .where({ consultation_form_id: main.id, is_active: true })
            .orderBy('display_order', 'asc');
        return {
            main,
            projectTypes
        };
    }
    async createConsultationFormWithProjectTypes(formData, projectTypes) {
        const main = await this.create(formData);
        const createdProjectTypes = [];
        for (let i = 0; i < projectTypes.length; i++) {
            const projectType = await this.projectTypesModel.create({
                ...projectTypes[i],
                consultation_form_id: main.id,
                display_order: i
            });
            createdProjectTypes.push(projectType);
        }
        return {
            main,
            projectTypes: createdProjectTypes
        };
    }
    async updateConsultationFormWithProjectTypes(formId, formData, projectTypes) {
        const updatedMain = await this.update(formId, formData);
        if (!updatedMain) {
            return null;
        }
        if (projectTypes) {
            await (0, database_1.default)('project_types')
                .where({ consultation_form_id: formId })
                .update({ is_active: false, updated_at: new Date() });
            for (let i = 0; i < projectTypes.length; i++) {
                await this.projectTypesModel.create({
                    ...projectTypes[i],
                    consultation_form_id: formId,
                    display_order: i
                });
            }
        }
        return await this.getConsultationFormWithProjectTypes();
    }
    async validateConsultationFormData(data) {
        const errors = [];
        if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
            errors.push('Title is required and must be a non-empty string');
        }
        if (data.min_investment && typeof data.min_investment !== 'number') {
            errors.push('Min investment must be a number');
        }
        if (data.max_investment && typeof data.max_investment !== 'number') {
            errors.push('Max investment must be a number');
        }
        if (data.step_investment && typeof data.step_investment !== 'number') {
            errors.push('Step investment must be a number');
        }
        return errors;
    }
    async validateProjectTypeData(data) {
        const errors = [];
        if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
            errors.push('Name is required and must be a non-empty string');
        }
        return errors;
    }
}
exports.ConsultationFormModel = ConsultationFormModel;
exports.default = new ConsultationFormModel();
//# sourceMappingURL=ConsultationFormModel.js.map