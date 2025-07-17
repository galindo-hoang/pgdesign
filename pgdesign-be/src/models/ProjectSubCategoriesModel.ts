import db from '../config/database';
import { BaseModel } from './BaseModel';

// Define types for Project Sub-Categories
export interface ProjectSubCategory {
  id: number;
  projectCategoryId: number;
  subCategoryId: string;
  title: string;
  description?: string;
  heroImageUrl?: string;
  displayOrder: number;
  projectCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectSubCategoryWithCategory extends ProjectSubCategory {
  category: {
    id: number;
    categoryId: string;
    title: string;
  };
}

export interface ProjectSubCategoryFilters {
  projectCategoryId?: number;
  categoryId?: string;
  isActive?: boolean;
}

export interface ProjectOverviewData {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  address: string;
  thumbnailImage?: string;
  constructionDate: string;
  projectStatus?: string;
  createdAt: Date;
}

export interface ProjectSubCategoryWithProjectOverview extends ProjectSubCategory {
  projectsOverview: {
    totalProjects: number;
    projects: ProjectOverviewData[];
  };
}

export class ProjectSubCategoriesModel extends BaseModel {
  constructor() {
    super('project_sub_categories');
  }

  // Transform database row to data object
  private transformRowToData(row: any): ProjectSubCategory {
    return {
      id: row.id,
      projectCategoryId: row.project_category_id,
      subCategoryId: row.sub_category_id,
      title: row.title,
      description: row.description,
      heroImageUrl: row.hero_image_url,
      displayOrder: row.display_order,
      projectCount: row.project_count,
      isActive: Boolean(row.is_active),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  // Transform data object to database row
  private transformDataToRow(data: Partial<ProjectSubCategory>): any {
    const row: any = {};
    
    if (data.projectCategoryId !== undefined) row.project_category_id = data.projectCategoryId;
    if (data.subCategoryId !== undefined) row.sub_category_id = data.subCategoryId;
    if (data.title !== undefined) row.title = data.title;
    if (data.description !== undefined) row.description = data.description;
    if (data.heroImageUrl !== undefined) row.hero_image_url = data.heroImageUrl;
    if (data.displayOrder !== undefined) row.display_order = data.displayOrder;
    if (data.projectCount !== undefined) row.project_count = data.projectCount;
    if (data.isActive !== undefined) row.is_active = data.isActive;
    
    return row;
  }

  // Get all subcategories with optional filters
  async getAll(filters?: ProjectSubCategoryFilters): Promise<ProjectSubCategory[]> {
    let query = db(this.tableName)
      .select('*')
      .where('is_active', true)
      .orderBy(['project_category_id', 'display_order']);

    if (filters) {
      if (filters.projectCategoryId) {
        query = query.where('project_category_id', filters.projectCategoryId);
      }
      if (filters.isActive !== undefined) {
        query = query.where('is_active', filters.isActive);
      }
    }

    const rows = await query;
    return rows.map(row => this.transformRowToData(row));
  }

  // Get subcategories by category ID (using category_id from project_categories)
  async getByCategoryId(categoryId: string): Promise<ProjectSubCategory[]> {
    const rows = await db(this.tableName)
      .select('psc.*')
      .from('project_sub_categories as psc')
      .join('project_categories as pc', 'psc.project_category_id', 'pc.id')
      .where('pc.category_id', categoryId)
      .where('psc.is_active', true)
      .where('pc.is_active', true)
      .orderBy('psc.display_order');

    return rows.map(row => this.transformRowToData(row));
  }

  // Get subcategories with their parent category information
  async getAllWithCategories(filters?: ProjectSubCategoryFilters): Promise<ProjectSubCategoryWithCategory[]> {
    let query = db(this.tableName)
      .select([
        'psc.*',
        'pc.id as category_id_pk',
        'pc.category_id',
        'pc.title as category_title'
      ])
      .from('project_sub_categories as psc')
      .join('project_categories as pc', 'psc.project_category_id', 'pc.id')
      .where('psc.is_active', true)
      .where('pc.is_active', true)
      .orderBy(['pc.display_order', 'psc.display_order']);

    if (filters) {
      if (filters.projectCategoryId) {
        query = query.where('psc.project_category_id', filters.projectCategoryId);
      }
      if (filters.categoryId) {
        query = query.where('pc.category_id', filters.categoryId);
      }
    }

    const rows = await query;
    
    return rows.map(row => ({
      ...this.transformRowToData(row),
      category: {
        id: row.category_id_pk,
        categoryId: row.category_id,
        title: row.category_title
      }
    }));
  }

  // Get subcategory by sub_category_id and category_id
  async getBySubCategoryId(categoryId: string, subCategoryId: string): Promise<ProjectSubCategory | null> {
    const row = await db(this.tableName)
      .select('psc.*')
      .from('project_sub_categories as psc')
      .join('project_categories as pc', 'psc.project_category_id', 'pc.id')
      .where('pc.category_id', categoryId)
      .where('psc.sub_category_id', subCategoryId)
      .where('psc.is_active', true)
      .where('pc.is_active', true)
      .first();

    return row ? this.transformRowToData(row) : null;
  }

  // Get subcategory by sub_category_id only (globally unique)
  async getBySubCategoryIdOnly(subCategoryId: string): Promise<ProjectSubCategory | null> {
    const row = await db(this.tableName)
      .select('*')
      .where('sub_category_id', subCategoryId)
      .where('is_active', true)
      .first();

    return row ? this.transformRowToData(row) : null;
  }

  // Update subcategory by sub_category_id
  async updateBySubCategoryId(subCategoryId: string, data: Partial<ProjectSubCategory>): Promise<ProjectSubCategory | null> {
    const updateData = {
      ...this.transformDataToRow(data),
      updated_at: new Date()
    };

    const updated = await db(this.tableName)
      .where('sub_category_id', subCategoryId)
      .where('is_active', true)
      .update(updateData);

    if (!updated) {
      return null;
    }

    return await this.getBySubCategoryIdOnly(subCategoryId);
  }

  // Get subcategory by ID
  async getById(id: number): Promise<ProjectSubCategory | null> {
    const row = await db(this.tableName)
      .select('*')
      .where({ id })
      .first();

    return row ? this.transformRowToData(row) : null;
  }

  // Create new subcategory
  override async create(data: Omit<ProjectSubCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectSubCategory> {
    const insertData = {
      ...this.transformDataToRow(data),
      created_at: new Date(),
      updated_at: new Date()
    };

    const [id] = await db(this.tableName).insert(insertData);
    
    const created = await this.getById(id as number);
    if (!created) {
      throw new Error('Failed to create subcategory');
    }
    
    return created;
  }

  // Update subcategory
  override async update(id: number, data: Partial<ProjectSubCategory>): Promise<ProjectSubCategory | null> {
    const updateData = {
      ...this.transformDataToRow(data),
      updated_at: new Date()
    };

    const updated = await db(this.tableName)
      .where({ id })
      .update(updateData);

    if (!updated) {
      return null;
    }

    return await this.getById(id);
  }

  // Delete subcategory (soft delete)
  override async delete(id: number): Promise<boolean> {
    const updated = await db(this.tableName)
      .where({ id })
      .update({ 
        is_active: false,
        updated_at: new Date()
      });

    return updated > 0;
  }

  // Update project count for a subcategory
  async updateProjectCount(subCategoryId: number, count: number): Promise<void> {
    await db(this.tableName)
      .where({ id: subCategoryId })
      .update({ 
        project_count: count,
        updated_at: new Date()
      });
  }

  // Get subcategories grouped by category
  async getGroupedByCategory(): Promise<{ [categoryId: string]: ProjectSubCategory[] }> {
    const subcategoriesWithCategories = await this.getAllWithCategories();
    
    const grouped: { [categoryId: string]: ProjectSubCategory[] } = {};
    
    subcategoriesWithCategories.forEach(subcat => {
      const categoryId = subcat.category.categoryId;
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      
      // Remove the category info for the grouped result
      const { category, ...subcategory } = subcat;
      grouped[categoryId].push(subcategory);
    });
    
    return grouped;
  }

  // Get subcategories with project details overview by category ID
  async getSubCategoriesWithProjectOverview(categoryId: string): Promise<ProjectSubCategoryWithProjectOverview[]> {
    // First get all subcategories for the category
    const subcategories = await this.getByCategoryId(categoryId);
    
    // For each subcategory, get project details overview
    const subcategoriesWithOverview = await Promise.all(
      subcategories.map(async (subcategory) => {
        // Get project details count and basic info for this subcategory
        const projectsOverview = await db('project_details')
          .select([
            'id',
            'project_id',
            'title',
            'client_name',
            'area',
            'address',
            'thumbnail_image',
            'construction_date',
            'project_status',
            'created_at'
          ])
          .where('project_sub_category_id', subcategory.id)
          .where('is_active', true)
          .orderBy('created_at', 'desc')
          .limit(10); // Limit to first 10 projects for overview

        // Get total count
        const totalCountResult = await db('project_details')
          .count('* as count')
          .where('project_sub_category_id', subcategory.id)
          .where('is_active', true)
          .first();

        const totalProjects = totalCountResult ? parseInt(totalCountResult.count as string) : 0;

        // Transform project data
        const projectsData = projectsOverview.map(project => ({
          id: project.id,
          projectId: project.project_id,
          title: project.title,
          clientName: project.client_name,
          area: project.area,
          address: project.address,
          thumbnailImage: project.thumbnail_image,
          constructionDate: project.construction_date,
          projectStatus: project.project_status,
          createdAt: project.created_at
        }));

        return {
          ...subcategory,
          projectsOverview: {
            totalProjects,
            projects: projectsData
          }
        };
      })
    );

    return subcategoriesWithOverview;
  }

  // Validation methods
  async validateSubCategoryData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.projectCategoryId || typeof data.projectCategoryId !== 'number') {
      errors.push('Project category ID is required and must be a number');
    }

    if (!data.subCategoryId || typeof data.subCategoryId !== 'string') {
      errors.push('Sub-category ID is required and must be a string');
    }

    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required and must be a string');
    }

    if (data.description !== undefined && typeof data.description !== 'string') {
      errors.push('Description must be a string');
    }

    if (data.heroImageUrl !== undefined && typeof data.heroImageUrl !== 'string') {
      errors.push('Hero image URL must be a string');
    }

    if (data.displayOrder !== undefined && typeof data.displayOrder !== 'number') {
      errors.push('Display order must be a number');
    }

    if (data.projectCount !== undefined && typeof data.projectCount !== 'number') {
      errors.push('Project count must be a number');
    }

    // Check if project category exists
    if (data.projectCategoryId) {
      const categoryExists = await db('project_categories')
        .where({ id: data.projectCategoryId, is_active: true })
        .first();
      
      if (!categoryExists) {
        errors.push('Project category does not exist');
      }
    }

    // Check for duplicate sub_category_id within the same project category
    if (data.projectCategoryId && data.subCategoryId) {
      const duplicate = await db(this.tableName)
        .where({ 
          project_category_id: data.projectCategoryId,
          sub_category_id: data.subCategoryId,
          is_active: true
        })
        .first();
      
      if (duplicate && (!data.id || duplicate.id !== data.id)) {
        errors.push('Sub-category ID already exists in this category');
      }
    }

    return errors;
  }
}

export default new ProjectSubCategoriesModel(); 