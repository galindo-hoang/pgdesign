import { BaseModel } from './BaseModel';
import { AboutData } from '../types/homePageTypes';

export class AboutModel extends BaseModel {
  constructor() {
    super('about_data');
  }

  async getActiveAbout(): Promise<AboutData | null> {
    return await this.findOneByCondition({ is_active: true });
  }

  async createOrUpdateAbout(aboutData: Partial<AboutData>): Promise<AboutData> {
    const existingAbout = await this.getActiveAbout();
    
    if (existingAbout) {
      return await this.update(existingAbout.id, aboutData);
    } else {
      return await this.create(aboutData);
    }
  }

  async validateAboutData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.headline || typeof data.headline !== 'string' || data.headline.trim().length === 0) {
      errors.push('Headline is required and must be a non-empty string');
    }
    
    if (!data.sub_headline || typeof data.sub_headline !== 'string' || data.sub_headline.trim().length === 0) {
      errors.push('Sub headline is required and must be a non-empty string');
    }
    
    if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
      errors.push('Description is required and must be a non-empty string');
    }
    
    if (data.headline && data.headline.length > 255) {
      errors.push('Headline must be less than 255 characters');
    }
    
    if (data.sub_headline && data.sub_headline.length > 255) {
      errors.push('Sub headline must be less than 255 characters');
    }
    
    return errors;
  }
}

export default new AboutModel(); 