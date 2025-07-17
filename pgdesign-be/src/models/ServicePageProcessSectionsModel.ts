// src/models/ServicePageProcessSectionsModel.ts
import { BaseModel } from './BaseModel';
import db from '../config/database';
import { ServicePageProcessSectionEntity, CreateProcessSectionInput, UpdateProcessSectionInput } from '../types/servicePageTypes';

export class ServicePageProcessSectionsModel extends BaseModel {
  constructor() {
    super('service_page_process_sections');
  }

  // Get all active process sections
  async getActiveProcessSections(): Promise<ServicePageProcessSectionEntity[]> {
    try {
      return await db(this.tableName)
        .where('is_active', true)
        .orderBy('process_number', 'asc');
    } catch (error) {
      console.error('Error fetching active process sections:', error);
      throw new Error('Failed to fetch process sections');
    }
  }

  // Get all process sections
  async getAll(): Promise<ServicePageProcessSectionEntity[]> {
    try {
      return await db(this.tableName)
        .orderBy('process_number', 'asc');
    } catch (error) {
      console.error('Error fetching all process sections:', error);
      throw new Error('Failed to fetch process sections');
    }
  }

  // Get process section by ID
  async getById(id: number): Promise<ServicePageProcessSectionEntity | null> {
    try {
      const result = await db(this.tableName)
        .where('id', id)
        .first();
      
      return result || null;
    } catch (error) {
      console.error('Error fetching process section by ID:', error);
      throw new Error('Failed to fetch process section');
    }
  }

  // Get process section by process number
  async getByProcessNumber(processNumber: number): Promise<ServicePageProcessSectionEntity | null> {
    try {
      const result = await db(this.tableName)
        .where('process_number', processNumber)
        .first();
      
      return result || null;
    } catch (error) {
      console.error('Error fetching process section by number:', error);
      throw new Error('Failed to fetch process section');
    }
  }

  // Create new process section
  override async create(data: CreateProcessSectionInput): Promise<ServicePageProcessSectionEntity> {
    try {
      // Check if process number already exists
      const existing = await this.getByProcessNumber(data.processNumber);
      if (existing) {
        throw new Error(`Process section ${data.processNumber} already exists`);
      }

      const sectionData = {
        process_number: data.processNumber,
        title: data.title,
        description: data.description,
        note: data.note || '',
        image_url: data.imageUrl || null,
        is_active: true
      };

      const [id] = await db(this.tableName)
        .insert(sectionData);

      if (!id) {
        throw new Error('Failed to create process section');
      }

      const created = await this.getById(id);
      if (!created) {
        throw new Error('Failed to retrieve created process section');
      }

      return created;
    } catch (error) {
      console.error('Error creating process section:', error);
      throw new Error('Failed to create process section');
    }
  }

  // Update process section
  override async update(id: number, data: UpdateProcessSectionInput): Promise<ServicePageProcessSectionEntity> {
    try {
      const updateData: any = {};
      
      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.note !== undefined) updateData.note = data.note;
      if (data.imageUrl !== undefined) updateData.image_url = data.imageUrl;

      if (Object.keys(updateData).length === 0) {
        throw new Error('No fields to update');
      }

      updateData.updated_at = new Date();

      const rowsUpdated = await db(this.tableName)
        .where('id', id)
        .update(updateData);

      if (rowsUpdated === 0) {
        throw new Error('Process section not found');
      }

      const updated = await this.getById(id);
      if (!updated) {
        throw new Error('Failed to retrieve updated process section');
      }

      return updated;
    } catch (error) {
      console.error('Error updating process section:', error);
      throw new Error('Failed to update process section');
    }
  }

  // Update process section by process number
  async updateByProcessNumber(processNumber: number, data: UpdateProcessSectionInput): Promise<ServicePageProcessSectionEntity> {
    try {
      const existing = await this.getByProcessNumber(processNumber);
      if (!existing) {
        throw new Error(`Process section ${processNumber} not found`);
      }

      return await this.update(existing.id, data);
    } catch (error) {
      console.error('Error updating process section by number:', error);
      throw new Error('Failed to update process section');
    }
  }

  // Delete process section
  override async delete(id: number): Promise<boolean> {
    try {
      const rowsDeleted = await db(this.tableName)
        .where('id', id)
        .del();

      return rowsDeleted > 0;
    } catch (error) {
      console.error('Error deleting process section:', error);
      throw new Error('Failed to delete process section');
    }
  }

  // Delete process section by process number
  async deleteByProcessNumber(processNumber: number): Promise<boolean> {
    try {
      const rowsDeleted = await db(this.tableName)
        .where('process_number', processNumber)
        .del();

      return rowsDeleted > 0;
    } catch (error) {
      console.error('Error deleting process section by number:', error);
      throw new Error('Failed to delete process section');
    }
  }

  // Toggle active status
  async toggleActive(id: number): Promise<ServicePageProcessSectionEntity> {
    try {
      const current = await this.getById(id);
      if (!current) {
        throw new Error('Process section not found');
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
        throw new Error('Failed to retrieve updated process section');
      }

      return updated;
    } catch (error) {
      console.error('Error toggling process section status:', error);
      throw new Error('Failed to toggle process section status');
    }
  }

  // Toggle active status by process number
  async toggleActiveByProcessNumber(processNumber: number): Promise<ServicePageProcessSectionEntity> {
    try {
      const existing = await this.getByProcessNumber(processNumber);
      if (!existing) {
        throw new Error(`Process section ${processNumber} not found`);
      }

      return await this.toggleActive(existing.id);
    } catch (error) {
      console.error('Error toggling process section status by number:', error);
      throw new Error('Failed to toggle process section status');
    }
  }
}

export default new ServicePageProcessSectionsModel(); 