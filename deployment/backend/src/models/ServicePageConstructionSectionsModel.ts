// src/models/ServicePageConstructionSectionsModel.ts
import { BaseModel } from './BaseModel';
import db from '../config/database';
import { ServicePageConstructionSectionEntity, CreateConstructionSectionInput, UpdateConstructionSectionInput } from '../types/servicePageTypes';

export class ServicePageConstructionSectionsModel extends BaseModel {
  constructor() {
    super('service_page_construction_sections');
  }

  // Get all active construction sections
  async getActiveConstructionSections(): Promise<ServicePageConstructionSectionEntity[]> {
    try {
      const sections = await db(this.tableName)
        .where('is_active', true)
        .orderBy('section_number', 'asc');

      // Parse JSON fields
      return sections.map((section: any) => ({
        ...section,
        contents_left: typeof section.contents_left === 'string' 
          ? JSON.parse(section.contents_left) 
          : section.contents_left,
        contents_right: typeof section.contents_right === 'string' 
          ? JSON.parse(section.contents_right) 
          : section.contents_right
      }));
    } catch (error) {
      console.error('Error fetching active construction sections:', error);
      throw new Error('Failed to fetch construction sections');
    }
  }

  // Get all construction sections
  async getAll(): Promise<ServicePageConstructionSectionEntity[]> {
    try {
      const sections = await db(this.tableName)
        .orderBy('section_number', 'asc');

      // Parse JSON fields
      return sections.map((section: any) => ({
        ...section,
        contents_left: typeof section.contents_left === 'string' 
          ? JSON.parse(section.contents_left) 
          : section.contents_left,
        contents_right: typeof section.contents_right === 'string' 
          ? JSON.parse(section.contents_right) 
          : section.contents_right
      }));
    } catch (error) {
      console.error('Error fetching all construction sections:', error);
      throw new Error('Failed to fetch construction sections');
    }
  }

  // Get construction section by ID
  async getById(id: number): Promise<ServicePageConstructionSectionEntity | null> {
    try {
      const result = await db(this.tableName)
        .where('id', id)
        .first();
      
      if (!result) {
        return null;
      }

      // Parse JSON fields
      return {
        ...result,
        contents_left: typeof result.contents_left === 'string' 
          ? JSON.parse(result.contents_left) 
          : result.contents_left,
        contents_right: typeof result.contents_right === 'string' 
          ? JSON.parse(result.contents_right) 
          : result.contents_right
      };
    } catch (error) {
      console.error('Error fetching construction section by ID:', error);
      throw new Error('Failed to fetch construction section');
    }
  }

  // Get construction section by section number
  async getBySectionNumber(sectionNumber: number): Promise<ServicePageConstructionSectionEntity | null> {
    try {
      const result = await db(this.tableName)
        .where('section_number', sectionNumber)
        .first();
      
      if (!result) {
        return null;
      }

      // Parse JSON fields
      return {
        ...result,
        contents_left: typeof result.contents_left === 'string' 
          ? JSON.parse(result.contents_left) 
          : result.contents_left,
        contents_right: typeof result.contents_right === 'string' 
          ? JSON.parse(result.contents_right) 
          : result.contents_right
      };
    } catch (error) {
      console.error('Error fetching construction section by number:', error);
      throw new Error('Failed to fetch construction section');
    }
  }

  // Create new construction section
  override async create(data: CreateConstructionSectionInput): Promise<ServicePageConstructionSectionEntity> {
    try {
      // Check if section number already exists
      const existing = await this.getBySectionNumber(data.sectionNumber);
      if (existing) {
        throw new Error(`Construction section ${data.sectionNumber} already exists`);
      }

      const sectionData = {
        section_number: data.sectionNumber,
        title_left: data.titleLeft,
        contents_left: JSON.stringify(data.contentsLeft),
        title_right: data.titleRight,
        contents_right: JSON.stringify(data.contentsRight),
        is_active: true
      };

      const [id] = await db(this.tableName)
        .insert(sectionData);

      if (!id) {
        throw new Error('Failed to create construction section');
      }

      const created = await this.getById(id);
      if (!created) {
        throw new Error('Failed to retrieve created construction section');
      }

      return created;
    } catch (error) {
      console.error('Error creating construction section:', error);
      throw new Error('Failed to create construction section');
    }
  }

  // Update construction section
  override async update(id: number, data: UpdateConstructionSectionInput): Promise<ServicePageConstructionSectionEntity> {
    try {
      const updateData: any = {};
      
      if (data.titleLeft !== undefined) updateData.title_left = data.titleLeft;
      if (data.contentsLeft !== undefined) updateData.contents_left = JSON.stringify(data.contentsLeft);
      if (data.titleRight !== undefined) updateData.title_right = data.titleRight;
      if (data.contentsRight !== undefined) updateData.contents_right = JSON.stringify(data.contentsRight);

      if (Object.keys(updateData).length === 0) {
        throw new Error('No fields to update');
      }

      updateData.updated_at = new Date();

      const rowsUpdated = await db(this.tableName)
        .where('id', id)
        .update(updateData);

      if (rowsUpdated === 0) {
        throw new Error('Construction section not found');
      }

      const updated = await this.getById(id);
      if (!updated) {
        throw new Error('Failed to retrieve updated construction section');
      }

      return updated;
    } catch (error) {
      console.error('Error updating construction section:', error);
      throw new Error('Failed to update construction section');
    }
  }

  // Update construction section by section number
  async updateBySectionNumber(sectionNumber: number, data: UpdateConstructionSectionInput): Promise<ServicePageConstructionSectionEntity> {
    try {
      const existing = await this.getBySectionNumber(sectionNumber);
      if (!existing) {
        throw new Error(`Construction section ${sectionNumber} not found`);
      }

      return await this.update(existing.id, data);
    } catch (error) {
      console.error('Error updating construction section by number:', error);
      throw new Error('Failed to update construction section');
    }
  }

  // Delete construction section
  override async delete(id: number): Promise<boolean> {
    try {
      const rowsDeleted = await db(this.tableName)
        .where('id', id)
        .del();

      return rowsDeleted > 0;
    } catch (error) {
      console.error('Error deleting construction section:', error);
      throw new Error('Failed to delete construction section');
    }
  }

  // Delete construction section by section number
  async deleteBySectionNumber(sectionNumber: number): Promise<boolean> {
    try {
      const rowsDeleted = await db(this.tableName)
        .where('section_number', sectionNumber)
        .del();

      return rowsDeleted > 0;
    } catch (error) {
      console.error('Error deleting construction section by number:', error);
      throw new Error('Failed to delete construction section');
    }
  }

  // Toggle active status
  async toggleActive(id: number): Promise<ServicePageConstructionSectionEntity> {
    try {
      const current = await this.getById(id);
      if (!current) {
        throw new Error('Construction section not found');
      }

      const newStatus = !current.is_active;
      
      await db(this.tableName)
        .where('id', id)
        .update({ 
          is_active: newStatus,
          updated_at: new Date()
        });

      const updated = await this.getById(id);
      if (!updated) {
        throw new Error('Failed to retrieve updated construction section');
      }

      return updated;
    } catch (error) {
      console.error('Error toggling construction section status:', error);
      throw new Error('Failed to toggle construction section status');
    }
  }

  // Toggle active status by section number
  async toggleActiveBySectionNumber(sectionNumber: number): Promise<ServicePageConstructionSectionEntity> {
    try {
      const existing = await this.getBySectionNumber(sectionNumber);
      if (!existing) {
        throw new Error(`Construction section ${sectionNumber} not found`);
      }

      return await this.toggleActive(existing.id);
    } catch (error) {
      console.error('Error toggling construction section status by number:', error);
      throw new Error('Failed to toggle construction section status');
    }
  }
}

export default new ServicePageConstructionSectionsModel(); 