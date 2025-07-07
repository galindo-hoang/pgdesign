import db from '../config/database';
import { BaseModel } from './BaseModel';
import { SolutionData, SolutionHeader, SolutionItem } from '../types/homePageTypes';

export class SolutionModel extends BaseModel {
  private solutionItemsModel: BaseModel;

  constructor() {
    super('solution_header');
    this.solutionItemsModel = new BaseModel('solution_items');
  }

  async getSolutionWithItems(): Promise<SolutionData | null> {
    const header = await this.findOneByCondition({ is_active: true });
    if (!header) {
      return null;
    }

    const items = await db('solution_items')
      .select('*')
      .where({ solution_header_id: header.id, is_active: true })
      .orderBy('display_order', 'asc');

    return {
      header,
      solutions: items
    };
  }

  async createSolutionWithItems(headerData: Partial<SolutionHeader>, items: Partial<SolutionItem>[]): Promise<SolutionData> {
    const header = await this.create(headerData);
    
    const createdItems = [];
    for (let i = 0; i < items.length; i++) {
      const item = await this.solutionItemsModel.create({
        ...items[i],
        solution_header_id: header.id,
        display_order: i
      });
      createdItems.push(item);
    }

    return {
      header,
      solutions: createdItems
    };
  }

  async updateSolutionWithItems(headerId: number, headerData: Partial<SolutionHeader>, items?: Partial<SolutionItem>[]): Promise<SolutionData | null> {
    const updatedHeader = await this.update(headerId, headerData);
    if (!updatedHeader) {
      return null;
    }

    if (items) {
      // Deactivate existing items
      await db('solution_items')
        .where({ solution_header_id: headerId })
        .update({ is_active: false, updated_at: new Date() });

      // Create new items
      for (let i = 0; i < items.length; i++) {
        await this.solutionItemsModel.create({
          ...items[i],
          solution_header_id: headerId,
          display_order: i
        });
      }
    }

    return await this.getSolutionWithItems();
  }

  async validateSolutionHeaderData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.main_headline || typeof data.main_headline !== 'string' || data.main_headline.trim().length === 0) {
      errors.push('Main headline is required and must be a non-empty string');
    }
    
    if (!data.sub_headline || typeof data.sub_headline !== 'string' || data.sub_headline.trim().length === 0) {
      errors.push('Sub headline is required and must be a non-empty string');
    }
    
    return errors;
  }

  async validateSolutionItemData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    
    if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
      errors.push('Category is required and must be a non-empty string');
    }
    
    if (!data.image_url || typeof data.image_url !== 'string' || data.image_url.trim().length === 0) {
      errors.push('Image URL is required and must be a non-empty string');
    }
    
    return errors;
  }
}

export default new SolutionModel(); 