import db from '../config/database';
import { BaseModel } from './BaseModel';
import { ConsultationFormData, ProjectType } from '../types/homePageTypes';

export class ConsultationFormModel extends BaseModel {
  private projectTypesModel: BaseModel;

  constructor() {
    super('consultation_form_data');
    this.projectTypesModel = new BaseModel('project_types');
  }

  async getConsultationFormWithProjectTypes(): Promise<{ main: ConsultationFormData, projectTypes: ProjectType[] } | null> {
    const main = await this.findOneByCondition({ is_active: true });
    if (!main) {
      return null;
    }

    const projectTypes = await db('project_types')
      .select('*')
      .where({ consultation_form_id: main.id, is_active: true })
      .orderBy('display_order', 'asc');

    return {
      main,
      projectTypes
    };
  }

  async createConsultationFormWithProjectTypes(formData: Partial<ConsultationFormData>, projectTypes: Partial<ProjectType>[]): Promise<{ main: ConsultationFormData, projectTypes: ProjectType[] }> {
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

  async updateConsultationFormWithProjectTypes(formId: number, formData: Partial<ConsultationFormData>, projectTypes?: Partial<ProjectType>[]): Promise<{ main: ConsultationFormData, projectTypes: ProjectType[] } | null> {
    const updatedMain = await this.update(formId, formData);
    if (!updatedMain) {
      return null;
    }

    if (projectTypes) {
      // Deactivate existing project types
      await db('project_types')
        .where({ consultation_form_id: formId })
        .update({ is_active: false, updated_at: new Date() });

      // Create new project types
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

  async validateConsultationFormData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
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

  async validateProjectTypeData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
    
    return errors;
  }
}

export default new ConsultationFormModel(); 