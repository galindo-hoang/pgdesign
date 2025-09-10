import { BaseModel } from './BaseModel';
import { ImageSlideData } from '../types/homePageTypes';
import db from '../config/database';

export class ImageSliderModel extends BaseModel {
  constructor() {
    super('image_slider_data');
  }

  async getAllSlides(): Promise<ImageSlideData[]> {
    return await db(this.tableName)
      .select('*')
      .where('is_active', true)
      .orderBy('display_order', 'asc');
  }

  async createSlide(slideData: Partial<ImageSlideData>): Promise<ImageSlideData> {
    const maxOrder = await db(this.tableName)
      .where('is_active', true)
      .max('display_order as max_order')
      .first();

    const displayOrder = (maxOrder?.max_order || 0) + 1;
    
    return await this.create({
      ...slideData,
      display_order: displayOrder
    });
  }

  async updateSlideOrder(slideId: number, newOrder: number): Promise<boolean> {
    const result = await this.update(slideId, { display_order: newOrder });
    return result !== null;
  }

  async reorderSlides(slideIds: number[]): Promise<boolean> {
    const promises = slideIds.map((slideId, index) => {
      return this.update(slideId, { display_order: index });
    });

    await Promise.all(promises);
    return true;
  }

  async validateSlideData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.image_url || typeof data.image_url !== 'string' || data.image_url.trim().length === 0) {
      errors.push('Image URL is required and must be a non-empty string');
    }
    
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    
    if (!data.subtitle || typeof data.subtitle !== 'string' || data.subtitle.trim().length === 0) {
      errors.push('Subtitle is required and must be a non-empty string');
    }
    
    if (!data.size || typeof data.size !== 'string' || data.size.trim().length === 0) {
      errors.push('Size is required and must be a non-empty string');
    }
    
    if (data.title && data.title.length > 255) {
      errors.push('Title must be less than 255 characters');
    }
    
    if (data.subtitle && data.subtitle.length > 255) {
      errors.push('Subtitle must be less than 255 characters');
    }
    
    if (data.size && data.size.length > 100) {
      errors.push('Size must be less than 100 characters');
    }
    
    return errors;
  }
}

export default new ImageSliderModel(); 