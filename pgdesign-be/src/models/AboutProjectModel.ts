import { BaseModel } from './BaseModel';
import { AboutProjectData } from '../types/projectPageTypes';

export class AboutProjectModel extends BaseModel {
  constructor() {
    super('about_project_data');
  }

  async getActiveAboutProject(): Promise<AboutProjectData | null> {
    const result = await this.findOneByCondition({ is_active: true });

    if (!result) return null;

    return {
      id: result.id,
      title: result.title,
      subtitle: result.subtitle,
      backgroundImageBlob: result.background_image_blob,
      isActive: result.is_active,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    };
  }


  async createOrUpdateAboutProject(data: AboutProjectData): Promise<AboutProjectData> {
    // First deactivate existing active about project
    await this.updateByCondition({ is_active: true }, { is_active: false });

    const insertData = {
      title: data.title,
      subtitle: data.subtitle,
      background_image_blob: data.backgroundImageBlob,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [id] = await this.insert(insertData);
    
    return {
      id: id as number,
      title: data.title,
      subtitle: data.subtitle,
      backgroundImageBlob: data.backgroundImageBlob,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async updateByCondition(condition: any, updateData: any): Promise<boolean> {
    const result = await this.db(this.tableName).where(condition).update({
      ...updateData,
      updated_at: new Date()
    });
    return result > 0;
  }

  async insert(data: any): Promise<any> {
    return await this.db(this.tableName).insert(data);
  }

  get db() {
    return require('../config/database').default;
  }

  async updateAboutProject(id: number, data: Partial<AboutProjectData>): Promise<AboutProjectData | null> {
    const updateData: any = {
      updated_at: new Date()
    };

    if (data.title !== undefined) updateData.title = data.title;
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
    if (data.backgroundImageBlob !== undefined) updateData.background_image_blob = data.backgroundImageBlob;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    const updated = await this.update(id, updateData);
    
    if (!updated) return null;

    return await this.getActiveAboutProject();
  }

  async validateAboutProjectData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required and must be a string');
    }

    if (!data.subtitle || typeof data.subtitle !== 'string') {
      errors.push('Subtitle is required and must be a string');
    }


    return errors;
  }
}

export default new AboutProjectModel(); 