// src/models/ServicePageHeroModel.ts
import { BaseModel } from './BaseModel';
import db from '../config/database';
import { ServicePageHeroEntity, CreateHeroContentInput, UpdateHeroContentInput } from '../types/servicePageTypes';

export class ServicePageHeroModel extends BaseModel {
  constructor() {
    super('service_page_hero');
  }

  // Get active hero content (usually only one)
  async getActiveHero(): Promise<ServicePageHeroEntity | null> {
    try {
      const result = await db(this.tableName)
        .where('is_active', true)
        .orderBy('display_order', 'asc')
        .first();
      
      return result || null;
    } catch (error) {
      console.error('Error fetching active hero content:', error);
      throw new Error('Failed to fetch hero content');
    }
  }

  // Get all hero content entries
  async getAll(): Promise<ServicePageHeroEntity[]> {
    try {
      return await db(this.tableName)
        .orderBy('display_order', 'asc');
    } catch (error) {
      console.error('Error fetching all hero content:', error);
      throw new Error('Failed to fetch hero content');
    }
  }

  // Get hero content by ID
  async getById(id: number): Promise<ServicePageHeroEntity | null> {
    try {
      const result = await db(this.tableName)
        .where('id', id)
        .first();
      
      return result || null;
    } catch (error) {
      console.error('Error fetching hero content by ID:', error);
      throw new Error('Failed to fetch hero content');
    }
  }

  // Create new hero content
  override async create(data: CreateHeroContentInput): Promise<ServicePageHeroEntity> {
    try {
      const heroData = {
        main_title: data.mainTitle,
        brand_name: data.brandName,
        description: data.description,
        hero_image_url: data.heroImageUrl || null,
        display_order: data.displayOrder || 1,
        is_active: true
      };

      const [id] = await db(this.tableName)
        .insert(heroData);

      if (!id) {
        throw new Error('Failed to create hero content');
      }

      const created = await this.getById(id);
      if (!created) {
        throw new Error('Failed to retrieve created hero content');
      }

      return created;
    } catch (error) {
      console.error('Error creating hero content:', error);
      throw new Error('Failed to create hero content');
    }
  }

  // Update hero content
  override async update(id: number, data: UpdateHeroContentInput): Promise<ServicePageHeroEntity> {
    try {
      const updateData: any = {};
      
      if (data.mainTitle !== undefined) updateData.main_title = data.mainTitle;
      if (data.brandName !== undefined) updateData.brand_name = data.brandName;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.heroImageUrl !== undefined) updateData.hero_image_url = data.heroImageUrl;
      if (data.displayOrder !== undefined) updateData.display_order = data.displayOrder;

      if (Object.keys(updateData).length === 0) {
        throw new Error('No fields to update');
      }

      updateData.updated_at = new Date();

      const rowsUpdated = await db(this.tableName)
        .where('id', id)
        .update(updateData);

      if (rowsUpdated === 0) {
        throw new Error('Hero content not found');
      }

      const updated = await this.getById(id);
      if (!updated) {
        throw new Error('Failed to retrieve updated hero content');
      }

      return updated;
    } catch (error) {
      console.error('Error updating hero content:', error);
      throw new Error('Failed to update hero content');
    }
  }

  // Delete hero content
  override async delete(id: number): Promise<boolean> {
    try {
      const rowsDeleted = await db(this.tableName)
        .where('id', id)
        .del();

      return rowsDeleted > 0;
    } catch (error) {
      console.error('Error deleting hero content:', error);
      throw new Error('Failed to delete hero content');
    }
  }

  // Toggle active status
  async toggleActive(id: number): Promise<ServicePageHeroEntity> {
    try {
      const current = await this.getById(id);
      if (!current) {
        throw new Error('Hero content not found');
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
        throw new Error('Failed to retrieve updated hero content');
      }

      return updated;
    } catch (error) {
      console.error('Error toggling hero content status:', error);
      throw new Error('Failed to toggle hero content status');
    }
  }
}

export default new ServicePageHeroModel(); 