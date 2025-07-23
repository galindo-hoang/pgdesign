// src/models/ProjectDetailModel.ts

import { BaseModel } from './BaseModel';
import db from '../config/database';
import {
  ProjectDetailData,
  ProjectSpecification,
  ProjectDetailRow,
  ProjectSpecificationRow,
  CreateProjectDetailRequest,
  UpdateProjectDetailRequest,
  ProjectDetailFilters
} from '../types/projectDetailTypes';

export class ProjectDetailModel extends BaseModel {
  protected override tableName = 'project_details';
  protected specsTableName = 'project_specifications';

  constructor() {
    super('project_details');
  }

  // ===== VALIDATION METHODS =====

  async validateProjectDetailData(data: Partial<CreateProjectDetailRequest>): Promise<string[]> {
    const errors: string[] = [];

    if (!data.projectId || data.projectId.trim() === '') {
      errors.push('projectId is required');
    } else if (data.projectId.length > 100) {
      errors.push('projectId must not exceed 100 characters');
    }

    if (!data.title || data.title.trim() === '') {
      errors.push('title is required');
    } else if (data.title.length > 300) {
      errors.push('title must not exceed 300 characters');
    }

    if (!data.clientName || data.clientName.trim() === '') {
      errors.push('clientName is required');
    } else if (data.clientName.length > 200) {
      errors.push('clientName must not exceed 200 characters');
    }

    if (!data.area || data.area.trim() === '') {
      errors.push('area is required');
    } else if (data.area.length > 50) {
      errors.push('area must not exceed 50 characters');
    }

    if (!data.constructionDate) {
      errors.push('constructionDate is required');
    }

    if (!data.address || data.address.trim() === '') {
      errors.push('address is required');
    } else if (data.address.length > 500) {
      errors.push('address must not exceed 500 characters');
    }

    if (!data.category || data.category.trim() === '') {
      errors.push('category is required');
    } else if (data.category.length > 100) {
      errors.push('category must not exceed 100 characters');
    }

    if (!data.projectCategoryId || data.projectCategoryId <= 0) {
      errors.push('projectCategoryId is required and must be a positive number');
    }

    if (!data.htmlContent || data.htmlContent.trim() === '') {
      errors.push('htmlContent is required');
    }

    if (data.style && data.style.length > 100) {
      errors.push('style must not exceed 100 characters');
    }

    if (data.thumbnailImage && data.thumbnailImage.length > 500) {
      errors.push('thumbnailImage URL must not exceed 500 characters');
    }

    if (data.projectStatus && data.projectStatus.length > 100) {
      errors.push('projectStatus must not exceed 100 characters');
    }

    if (data.projectBudget && data.projectBudget.length > 100) {
      errors.push('projectBudget must not exceed 100 characters');
    }

    if (data.architectName && data.architectName.length > 200) {
      errors.push('architectName must not exceed 200 characters');
    }

    if (data.contractorName && data.contractorName.length > 200) {
      errors.push('contractorName must not exceed 200 characters');
    }

    if (data.metaTitle && data.metaTitle.length > 300) {
      errors.push('metaTitle must not exceed 300 characters');
    }

    // Check if projectId already exists (for create operations)
    if (data.projectId) {
      const existing = await this.findByProjectId(data.projectId);
      if (existing) {
        errors.push('projectId already exists');
      }
    }

    return errors;
  }

  async validateProjectSpecificationData(data: Partial<ProjectSpecification>): Promise<string[]> {
    const errors: string[] = [];

    if (!data.label || data.label.trim() === '') {
      errors.push('label is required');
    } else if (data.label.length > 200) {
      errors.push('label must not exceed 200 characters');
    }

    if (!data.value || data.value.trim() === '') {
      errors.push('value is required');
    } else if (data.value.length > 100) {
      errors.push('value must not exceed 100 characters');
    }

    if (data.unit && data.unit.length > 50) {
      errors.push('unit must not exceed 50 characters');
    }

    if (data.displayOrder !== undefined && (data.displayOrder < 0 || data.displayOrder > 999)) {
      errors.push('displayOrder must be between 0 and 999');
    }

    return errors;
  }

  // Add new method to get projects for homepage
  async getHomepageProjects(): Promise<ProjectDetailData[]> {
    const rows: ProjectDetailRow[] = await db(this.tableName)
      .select('*')
      .where({ is_on_homepage: true, is_active: true })
      .orderBy('created_at', 'desc')
      .limit(10); // Limit to 10 projects for homepage

    return rows.map(row => this.transformRowToData(row));
  }

  // Add method to toggle homepage status
  async toggleHomepageStatus(id: number, isOnHomePage: boolean): Promise<ProjectDetailData | null> {
    const updated = await db(this.tableName)
      .where({ id })
      .update({
        is_on_homepage: isOnHomePage,
        updated_at: new Date()
      });

    if (updated === 0) return null;

    return this.getById(id);
  }

  // ===== TRANSFORMATION METHODS =====

  private transformRowToData(row: ProjectDetailRow, specifications?: ProjectSpecificationRow[]): ProjectDetailData {
    let projectImages;
    let tags;
    
    try {
      projectImages = row.project_images ? JSON.parse(row.project_images) : undefined;
    } catch (error) {
      console.error('Error parsing project_images:', error);
      projectImages = undefined;
    }
    
    try {
      tags = row.tags ? JSON.parse(row.tags) : undefined;
    } catch (error) {
      console.error('Error parsing tags:', error);
      tags = undefined;
    }
    
    return {
      id: row.id,
      projectId: row.project_id,
      title: row.title,
      clientName: row.client_name,
      area: row.area,
      constructionDate: row.construction_date,
      address: row.address,
      description: row.description || undefined,
      category: row.category,
      projectCategoryId: row.project_category_id,
      style: row.style || undefined,
      thumbnailImage: row.thumbnail_image || undefined,
      htmlContent: row.html_content,
      projectImages: projectImages,
      projectStatus: row.project_status || undefined,
      projectBudget: row.project_budget || undefined,
      completionDate: row.completion_date || undefined,
      architectName: row.architect_name || undefined,
      contractorName: row.contractor_name || undefined,
      metaTitle: row.meta_title || undefined,
      metaDescription: row.meta_description || undefined,
      tags: tags,
      isOnHomePage: row.is_on_homepage || false,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      projectSpecs: specifications ? specifications.map(this.transformSpecRowToData) : undefined
    };
  }

  private transformSpecRowToData(row: ProjectSpecificationRow): ProjectSpecification {
    return {
      id: row.id,
      projectDetailId: row.project_detail_id,
      label: row.label,
      value: row.value,
      unit: row.unit || undefined,
      displayOrder: row.display_order,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  private transformDataToRow(data: CreateProjectDetailRequest | UpdateProjectDetailRequest): Partial<ProjectDetailRow> {
    const row: Partial<ProjectDetailRow> = {};
    
    if (data.projectId !== undefined) row.project_id = data.projectId;
    if (data.title !== undefined) row.title = data.title;
    if (data.clientName !== undefined) row.client_name = data.clientName;
    if (data.area !== undefined) row.area = data.area;
    if (data.constructionDate !== undefined) row.construction_date = data.constructionDate;
    if (data.address !== undefined) row.address = data.address;
    if (data.description !== undefined) row.description = data.description || null;
    if (data.category !== undefined) row.category = data.category;
    if (data.projectCategoryId !== undefined) row.project_category_id = data.projectCategoryId;
    if (data.style !== undefined) row.style = data.style || null;
    if (data.thumbnailImage !== undefined) row.thumbnail_image = data.thumbnailImage || null;
    if (data.htmlContent !== undefined) row.html_content = data.htmlContent;
    if (data.projectImages !== undefined) row.project_images = data.projectImages ? JSON.stringify(data.projectImages) : null;
    if (data.projectStatus !== undefined) row.project_status = data.projectStatus || null;
    if (data.projectBudget !== undefined) row.project_budget = data.projectBudget || null;
    if (data.completionDate !== undefined) row.completion_date = data.completionDate || null;
    if (data.architectName !== undefined) row.architect_name = data.architectName || null;
    if (data.contractorName !== undefined) row.contractor_name = data.contractorName || null;
    if (data.metaTitle !== undefined) row.meta_title = data.metaTitle || null;
    if (data.metaDescription !== undefined) row.meta_description = data.metaDescription || null;
    if (data.tags !== undefined) row.tags = data.tags ? JSON.stringify(data.tags) : null;
    if (data.isOnHomePage !== undefined) row.is_on_homepage = data.isOnHomePage || false;
    
    return row;
  }

  // ===== MAIN CRUD METHODS =====

  async getAll(filters?: ProjectDetailFilters): Promise<ProjectDetailData[]> {
    let query = db(this.tableName)
      .select('*')
      .where('is_active', true)
      .orderBy('created_at', 'desc');

    if (filters) {
      if (filters.category) {
        query = query.where('category', filters.category);
      }
      if (filters.projectCategoryId) {
        query = query.where('project_category_id', filters.projectCategoryId);
      }
      if (filters.projectStatus) {
        query = query.where('project_status', filters.projectStatus);
      }
      if (filters.isActive !== undefined) {
        query = query.where('is_active', filters.isActive);
      }
    }

    const rows: ProjectDetailRow[] = await query;
    return rows.map(row => this.transformRowToData(row));
  }

  async getById(id: number): Promise<ProjectDetailData | null> {
    const row: ProjectDetailRow = await db(this.tableName)
      .select('*')
      .where({ id })
      .first();

    if (!row) return null;

    const specifications: ProjectSpecificationRow[] = await db(this.specsTableName)
      .select('*')
      .where({ project_detail_id: id, is_active: true })
      .orderBy('display_order', 'asc');

    return this.transformRowToData(row, specifications);
  }

  async findByProjectId(projectId: string): Promise<ProjectDetailData | null> {
    const row: ProjectDetailRow = await db(this.tableName)
      .select('*')
      .where({ project_id: projectId })
      .first();

    if (!row) return null;

    const specifications: ProjectSpecificationRow[] = await db(this.specsTableName)
      .select('*')
      .where({ project_detail_id: row.id, is_active: true })
      .orderBy('display_order', 'asc');

    return this.transformRowToData(row, specifications);
  }

  override async create(data: CreateProjectDetailRequest): Promise<ProjectDetailData> {
    const trx = await db.transaction();

    try {
      const rowData = this.transformDataToRow(data);
      const [id] = await trx(this.tableName).insert(rowData);

      // Insert specifications if provided
      if (data.projectSpecs && data.projectSpecs.length > 0) {
        const specsData = data.projectSpecs.map(spec => ({
          project_detail_id: id,
          label: spec.label,
          value: spec.value,
          unit: spec.unit || '',
          display_order: spec.displayOrder || 0,
          is_active: true
        }));

        await trx(this.specsTableName).insert(specsData);
      }

      await trx.commit();

      const result = await this.getById(id as number);
      if (!result) {
        throw new Error('Failed to retrieve created project detail');
      }

      return result;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  override async update(id: number, data: UpdateProjectDetailRequest): Promise<ProjectDetailData | null> {
    const trx = await db.transaction();

    try {
      const rowData = this.transformDataToRow(data);
      
      const updated = await trx(this.tableName)
        .where({ id })
        .update({
          ...rowData,
          updated_at: new Date()
        });

      if (updated === 0) {
        await trx.rollback();
        return null;
      }

      // Update specifications if provided
      if (data.projectSpecs) {
        // Delete existing specifications
        await trx(this.specsTableName)
          .where({ project_detail_id: id })
          .del();

        // Insert new specifications
        if (data.projectSpecs.length > 0) {
          const specsData = data.projectSpecs.map(spec => ({
            project_detail_id: id,
            label: spec.label,
            value: spec.value,
            unit: spec.unit || '',
            display_order: spec.displayOrder || 0,
            is_active: true
          }));

          await trx(this.specsTableName).insert(specsData);
        }
      }

      await trx.commit();

      const result = await this.getById(id);
      return result;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  override async delete(id: number): Promise<boolean> {
    const updated = await db(this.tableName)
      .where({ id })
      .update({
        is_active: false,
        updated_at: new Date()
      });

    return updated > 0;
  }

  override async hardDelete(id: number): Promise<boolean> {
    const trx = await db.transaction();

    try {
      // Delete specifications first (foreign key constraint)
      await trx(this.specsTableName)
        .where({ project_detail_id: id })
        .del();

      // Delete the project detail
      const deleted = await trx(this.tableName)
        .where({ id })
        .del();

      await trx.commit();
      return deleted > 0;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async getPaginated(page: number = 1, limit: number = 10, filters?: ProjectDetailFilters): Promise<{
    projects: ProjectDetailData[];
    total: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;

    let query = db(this.tableName)
      .where('is_active', true);

    if (filters) {
      if (filters.category) {
        query = query.where('category', filters.category);
      }
      if (filters.projectCategoryId) {
        query = query.where('project_category_id', filters.projectCategoryId);
      }
      if (filters.projectStatus) {
        query = query.where('project_status', filters.projectStatus);
      }
      if (filters.isActive !== undefined) {
        query = query.where('is_active', filters.isActive);
      }
    }

    const [data, totalCount] = await Promise.all([
      query.clone()
        .select('*')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset),
      query.clone().count('* as count').first()
    ]);

    const total = totalCount ? parseInt(totalCount.count as string) : 0;
    const totalPages = Math.ceil(total / limit);

    const projects = data.map(row => this.transformRowToData(row));

    return {
      projects,
      total,
      totalPages
    };
  }

  async getCategories(): Promise<string[]> {
    const result = await db(this.tableName)
      .distinct('category')
      .where('is_active', true)
      .orderBy('category');

    return result.map(row => row.category);
  }

  async getCategoryCounts(): Promise<any[]> {
    const result = await db(this.tableName)
      .select('category')
      .count('* as count')
      .where('is_active', true)
      .groupBy('category')
      .orderBy('category');

    return result.map(row => ({
      category: row.category,
      count: Number(row.count)
    }));
  }
}

export default new ProjectDetailModel(); 