// src/models/ServicePageServicesModel.ts
import { BaseModel } from './BaseModel';
import db from '../config/database';
import { ServicePageServiceEntity, CreateServiceInput, UpdateServiceInput } from '../types/servicePageTypes';

export class ServicePageServicesModel extends BaseModel {
  constructor() {
    super('service_page_services');
  }

  // Get all active services
  async getActiveServices(): Promise<ServicePageServiceEntity[]> {
    try {
      return await db(this.tableName)
        .where('is_active', true)
        .orderBy('display_order', 'asc');
    } catch (error) {
      console.error('Error fetching active services:', error);
      throw new Error('Failed to fetch services');
    }
  }

  // Get all services
  async getAll(): Promise<ServicePageServiceEntity[]> {
    try {
      return await db(this.tableName)
        .orderBy('display_order', 'asc');
    } catch (error) {
      console.error('Error fetching all services:', error);
      throw new Error('Failed to fetch services');
    }
  }

  // Get service by ID
  async getById(id: number): Promise<ServicePageServiceEntity | null> {
    try {
      const result = await db(this.tableName)
        .where('id', id)
        .first();
      
      return result || null;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw new Error('Failed to fetch service');
    }
  }

  // Create new service
  override async create(data: CreateServiceInput): Promise<ServicePageServiceEntity> {
    try {
      const serviceData = {
        title: data.title,
        subtitle: data.subtitle || '',
        description: data.description,
        display_order: data.displayOrder,
        is_active: true
      };

      const [id] = await db(this.tableName)
        .insert(serviceData);

      if (!id) {
        throw new Error('Failed to create service');
      }

      const created = await this.getById(id);
      if (!created) {
        throw new Error('Failed to retrieve created service');
      }

      return created;
    } catch (error) {
      console.error('Error creating service:', error);
      throw new Error('Failed to create service');
    }
  }

  // Update service
  override async update(id: number, data: UpdateServiceInput): Promise<ServicePageServiceEntity> {
    try {
      const updateData: any = {};
      
      if (data.title !== undefined) updateData.title = data.title;
      if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.displayOrder !== undefined) updateData.display_order = data.displayOrder;

      if (Object.keys(updateData).length === 0) {
        throw new Error('No fields to update');
      }

      updateData.updated_at = new Date();

      const rowsUpdated = await db(this.tableName)
        .where('id', id)
        .update(updateData);

      if (rowsUpdated === 0) {
        throw new Error('Service not found');
      }

      const updated = await this.getById(id);
      if (!updated) {
        throw new Error('Failed to retrieve updated service');
      }

      return updated;
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  }

  // Delete service
  override async delete(id: number): Promise<boolean> {
    try {
      const rowsDeleted = await db(this.tableName)
        .where('id', id)
        .del();

      return rowsDeleted > 0;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw new Error('Failed to delete service');
    }
  }

  // Toggle active status
  async toggleActive(id: number): Promise<ServicePageServiceEntity> {
    try {
      const current = await this.getById(id);
      if (!current) {
        throw new Error('Service not found');
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
        throw new Error('Failed to retrieve updated service');
      }

      return updated;
    } catch (error) {
      console.error('Error toggling service status:', error);
      throw new Error('Failed to toggle service status');
    }
  }

  // Reorder services
  async reorder(serviceIds: number[]): Promise<ServicePageServiceEntity[]> {
    try {
      const transaction = await db.transaction();

      try {
        for (let i = 0; i < serviceIds.length; i++) {
          await transaction(this.tableName)
            .where('id', serviceIds[i])
            .update({ 
              display_order: i + 1,
              updated_at: new Date()
            });
        }

        await transaction.commit();

        // Return updated services
        return await this.getAll();
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      console.error('Error reordering services:', error);
      throw new Error('Failed to reorder services');
    }
  }

  // Get services with pagination
  async getPaginated(page: number = 1, limit: number = 10): Promise<{
    services: ServicePageServiceEntity[];
    total: number;
    totalPages: number;
  }> {
    try {
      const offset = (page - 1) * limit;

      const [services, countResult] = await Promise.all([
        db(this.tableName)
          .orderBy('display_order', 'asc')
          .limit(limit)
          .offset(offset),
        db(this.tableName).count('id as total').first()
      ]);

      const total = Number(countResult?.total || 0);
      const totalPages = Math.ceil(total / limit);

      return {
        services,
        total,
        totalPages
      };
    } catch (error) {
      console.error('Error fetching paginated services:', error);
      throw new Error('Failed to fetch services');
    }
  }
}

export default new ServicePageServicesModel(); 