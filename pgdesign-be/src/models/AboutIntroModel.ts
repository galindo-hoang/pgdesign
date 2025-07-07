import db from '../config/database';
import { BaseModel } from './BaseModel';
import { AboutIntroData } from '../types/introPageTypes';

export class AboutIntroModel extends BaseModel {

  constructor() {
    super('about_intro_data');
  }

  async getActiveAboutIntro(): Promise<AboutIntroData | null> {
    const result = await this.findOneByCondition({ is_active: true });

    if (!result) return null;

    return {
      id: result.id,
      brandTitle: result.brand_title,
      brandSubtitle: result.brand_subtitle,
      identity: result.identity,
      descriptions: [result.description_1, result.description_2],
      backgroundImage: result.background_image_url,
      isActive: result.is_active,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    };
  }

  async createOrUpdateAboutIntro(data: AboutIntroData): Promise<AboutIntroData> {
    // First deactivate existing active about intro
    await db(this.tableName)
      .where({ is_active: true })
      .update({ is_active: false });

    const insertData = {
      brand_title: data.brandTitle,
      brand_subtitle: data.brandSubtitle,
      identity: data.identity,
      description_1: data.descriptions[0] || '',
      description_2: data.descriptions[1] || '',
      background_image_url: data.backgroundImage,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [id] = await db(this.tableName).insert(insertData);
    
    return {
      id: id as number,
      ...data,
      isActive: true
    };
  }

  async updateAboutIntro(id: number, data: Partial<AboutIntroData>): Promise<AboutIntroData | null> {
    const updateData: any = {
      updated_at: new Date()
    };

    if (data.brandTitle !== undefined) updateData.brand_title = data.brandTitle;
    if (data.brandSubtitle !== undefined) updateData.brand_subtitle = data.brandSubtitle;
    if (data.identity !== undefined) updateData.identity = data.identity;
    if (data.descriptions && data.descriptions.length > 0) {
      updateData.description_1 = data.descriptions[0] || '';
      updateData.description_2 = data.descriptions[1] || '';
    }
    if (data.backgroundImage !== undefined) updateData.background_image_url = data.backgroundImage;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    const updated = await db(this.tableName)
      .where({ id })
      .update(updateData);

    if (!updated) return null;

    return await this.getActiveAboutIntro();
  }

  async validateAboutIntroData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.brandTitle || typeof data.brandTitle !== 'string') {
      errors.push('Brand title is required and must be a string');
    }

    if (!data.brandSubtitle || typeof data.brandSubtitle !== 'string') {
      errors.push('Brand subtitle is required and must be a string');
    }

    if (!data.identity || typeof data.identity !== 'string') {
      errors.push('Identity is required and must be a string');
    }

    if (!data.descriptions || !Array.isArray(data.descriptions) || data.descriptions.length < 2) {
      errors.push('Descriptions must be an array with at least 2 items');
    }

    if (!data.backgroundImage || typeof data.backgroundImage !== 'string') {
      errors.push('Background image is required and must be a string');
    }

    return errors;
  }
}

export default new AboutIntroModel(); 