import db from '../config/database';
import { BaseModel } from './BaseModel';
import { TestimonialData, TestimonialHeader, Testimonial } from '../types/homePageTypes';

export class TestimonialModel extends BaseModel {
  private testimonialsModel: BaseModel;

  constructor() {
    super('testimonial_header');
    this.testimonialsModel = new BaseModel('testimonials');
  }

  async getTestimonialWithItems(): Promise<TestimonialData | null> {
    const header = await this.findOneByCondition({ is_active: true });
    if (!header) {
      return null;
    }

    const testimonials = await db('testimonials')
      .select('*')
      .where({ testimonial_header_id: header.id, is_active: true })
      .orderBy('display_order', 'asc');

    return {
      header,
      testimonials
    };
  }

  async createTestimonialWithItems(headerData: Partial<TestimonialHeader>, testimonials: Partial<Testimonial>[]): Promise<TestimonialData> {
    const header = await this.create(headerData);
    
    const createdTestimonials = [];
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = await this.testimonialsModel.create({
        ...testimonials[i],
        testimonial_header_id: header.id,
        display_order: i
      });
      createdTestimonials.push(testimonial);
    }

    return {
      header,
      testimonials: createdTestimonials
    };
  }

  async updateTestimonialWithItems(headerId: number, headerData: Partial<TestimonialHeader>, testimonials?: Partial<Testimonial>[]): Promise<TestimonialData | null> {
    const updatedHeader = await this.update(headerId, headerData);
    if (!updatedHeader) {
      return null;
    }

    if (testimonials) {
      // Deactivate existing testimonials
      await db('testimonials')
        .where({ testimonial_header_id: headerId })
        .update({ is_active: false, updated_at: new Date() });

      // Create new testimonials
      for (let i = 0; i < testimonials.length; i++) {
        await this.testimonialsModel.create({
          ...testimonials[i],
          testimonial_header_id: headerId,
          display_order: i
        });
      }
    }

    return await this.getTestimonialWithItems();
  }

  async validateTestimonialHeaderData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.main_headline || typeof data.main_headline !== 'string' || data.main_headline.trim().length === 0) {
      errors.push('Main headline is required and must be a non-empty string');
    }
    
    if (!data.sub_headline || typeof data.sub_headline !== 'string' || data.sub_headline.trim().length === 0) {
      errors.push('Sub headline is required and must be a non-empty string');
    }
    
    return errors;
  }

  async validateTestimonialItemData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
    
    if (!data.project || typeof data.project !== 'string' || data.project.trim().length === 0) {
      errors.push('Project is required and must be a non-empty string');
    }
    
    if (!data.text || typeof data.text !== 'string' || data.text.trim().length === 0) {
      errors.push('Text is required and must be a non-empty string');
    }
    
    return errors;
  }
}

export default new TestimonialModel(); 