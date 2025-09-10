// src/models/BlogPageModel.ts

import db from '../config/database';
import { BaseModel } from './BaseModel';
import {
  BlogPageData,
  BlogHeroData,
  BlogProjectItem,
  ContentSection,
  ConsultationCTA,
  DesignStyle,
  ImportantFactor,
  ProcessStep,
  ProjectGalleryData,
  BlogPageFilters,
  BlogHeroEntity,
  BlogProjectItemEntity,
  ConsultationCTAEntity,
  DesignStyleEntity,
  ImportantFactorEntity,
  ProcessStepEntity,
  CreateBlogHeroRequest,
  UpdateBlogHeroRequest,
  CreateBlogProjectItemRequest,
  UpdateBlogProjectItemRequest,
  CreateContentSectionRequest,
  CreateConsultationCTARequest,
  BulkUpdateRequest,
  BulkDeleteRequest,
  BlogPageSearchFilters
} from '../types/blogPageTypes';

export class BlogPageModel extends BaseModel {
  private heroModel: BaseModel;
  private projectItemsModel: BaseModel;
  private contentSectionsModel: BaseModel;
  private designStylesModel: BaseModel;
  private importantFactorsModel: BaseModel;
  private processStepsModel: BaseModel;
  private consultationCTAModel: BaseModel;

  constructor() {
    super('blog_hero_data');
    this.heroModel = new BaseModel('blog_hero_data');
    this.projectItemsModel = new BaseModel('blog_project_items');
    this.contentSectionsModel = new BaseModel('blog_content_sections');
    this.designStylesModel = new BaseModel('blog_design_styles');
    this.importantFactorsModel = new BaseModel('blog_important_factors');
    this.processStepsModel = new BaseModel('blog_process_steps');
    this.consultationCTAModel = new BaseModel('blog_consultation_cta');
  }

  // ========== HERO SECTION OPERATIONS ==========

  async getHeroData(): Promise<BlogHeroData | null> {
    const heroEntity = await this.heroModel.findOneByCondition({ is_active: true });
    return heroEntity ? this.transformHeroEntityToData(heroEntity) : null;
  }

  async createHeroData(data: CreateBlogHeroRequest): Promise<BlogHeroData> {
    const trx = await db.transaction();

    try {
      // Deactivate existing hero if creating new one
      await trx('blog_hero_data').update({ is_active: false });

      const heroEntity = {
        title: data.title,
        subtitle: data.subtitle,
        is_active: data.isActive ?? true,
        display_order: data.displayOrder ?? 1,
        created_at: new Date(),
        updated_at: new Date()
      };

      const [id] = await trx('blog_hero_data').insert(heroEntity);
      await trx.commit();

      if (!id || typeof id !== 'number') {
        throw new Error('Failed to create hero data - invalid ID');
      }

      const result = await this.heroModel.findById(id);
      if (!result) {
        throw new Error('Failed to create hero data');
      }
      return this.transformHeroEntityToData(result);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async updateHeroData(id: number, data: UpdateBlogHeroRequest): Promise<BlogHeroData | null> {
    const updated = await this.heroModel.update(id, {
      title: data.title,
      subtitle: data.subtitle,
      is_active: data.isActive,
      display_order: data.displayOrder,
      updated_at: new Date()
    });

    return updated ? this.transformHeroEntityToData(updated) : null;
  }

  // ========== PROJECT ITEMS OPERATIONS ==========

  async getProjectItems(filters?: BlogPageFilters): Promise<ProjectGalleryData> {
    let query = db('blog_project_items').where('is_active', true);

    // Apply filters
    if (filters) {
      if (filters.style) {
        query = query.where('style', 'like', `%${filters.style}%`);
      }
      if (filters.location) {
        query = query.where('location', 'like', `%${filters.location}%`);
      }
      if (filters.category) {
        query = query.where('style', 'like', `%${filters.category}%`);
      }
    }

    const limit = filters?.limit || 6;
    const offset = filters?.offset || 0;

    const [projects, totalCount] = await Promise.all([
      query.clone().limit(limit).offset(offset).orderBy('display_order', 'asc'),
      query.clone().count('* as count').first()
    ]);

    const totalProjectsCount = typeof totalCount?.count === 'string' ? parseInt(totalCount.count) : (totalCount?.count || 0);

    return {
      projects: projects.map(this.transformProjectItemEntityToData),
      totalProjects: totalProjectsCount,
      hasMore: offset + limit < totalProjectsCount
    };
  }

  async getProjectItemById(id: number): Promise<BlogProjectItem | null> {
    const projectEntity = await this.projectItemsModel.findById(id);
    return projectEntity ? this.transformProjectItemEntityToData(projectEntity) : null;
  }

  async createProjectItem(data: CreateBlogProjectItemRequest): Promise<BlogProjectItem> {
    const projectEntity = {
      project_id: data.projectId,
      title: data.title,
      image_url: data.imageUrl,
      area: data.area,
      style: data.style,
      client_name: data.clientName,
      location: data.location,
      is_active: data.isActive ?? true,
      display_order: data.displayOrder ?? 0,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await this.projectItemsModel.create(projectEntity);
    return this.transformProjectItemEntityToData(result);
  }

  async updateProjectItem(id: number, data: UpdateBlogProjectItemRequest): Promise<BlogProjectItem | null> {
    const updateData: any = {
      updated_at: new Date()
    };

    if (data.projectId) updateData.project_id = data.projectId;
    if (data.title) updateData.title = data.title;
    if (data.imageUrl) updateData.image_url = data.imageUrl;
    if (data.area) updateData.area = data.area;
    if (data.style) updateData.style = data.style;
    if (data.clientName) updateData.client_name = data.clientName;
    if (data.location) updateData.location = data.location;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;
    if (data.displayOrder !== undefined) updateData.display_order = data.displayOrder;

    const updated = await this.projectItemsModel.update(id, updateData);
    return updated ? this.transformProjectItemEntityToData(updated) : null;
  }

  async deleteProjectItem(id: number): Promise<boolean> {
    const deleted = await this.projectItemsModel.delete(id);
    return typeof deleted === 'boolean' ? deleted : deleted > 0;
  }

  // ========== CONTENT SECTION OPERATIONS ==========

  async getContentSection(): Promise<ContentSection | null> {
    const contentEntity = await this.contentSectionsModel.findOneByCondition({ is_active: true });
    if (!contentEntity) return null;

    const [designStyles, importantFactors, processSteps] = await Promise.all([
      this.designStylesModel.findByCondition({ content_section_id: contentEntity.id }),
      this.importantFactorsModel.findByCondition({ content_section_id: contentEntity.id }),
      this.processStepsModel.findByCondition({ content_section_id: contentEntity.id })
    ]);

    return {
      id: contentEntity.id,
      mainTitle: contentEntity.main_title,
      introText: contentEntity.intro_text,
      designStylesTitle: contentEntity.design_styles_title,
      designStyles: designStyles.map(this.transformDesignStyleEntityToData),
      factorsTitle: contentEntity.factors_title,
      importantFactors: importantFactors.map(this.transformImportantFactorEntityToData),
      processTitle: contentEntity.process_title,
      processSteps: processSteps.map(this.transformProcessStepEntityToData),
      isActive: contentEntity.is_active,
      createdAt: contentEntity.created_at,
      updatedAt: contentEntity.updated_at
    };
  }

  async createContentSection(data: CreateContentSectionRequest): Promise<ContentSection> {
    const trx = await db.transaction();

    try {
      // Deactivate existing content section
      await trx('blog_content_sections').update({ is_active: false });

      const contentEntity = {
        main_title: data.mainTitle,
        intro_text: data.introText,
        design_styles_title: data.designStylesTitle,
        factors_title: data.factorsTitle,
        process_title: data.processTitle,
        is_active: data.isActive ?? true,
        display_order: data.displayOrder ?? 1,
        created_at: new Date(),
        updated_at: new Date()
      };

      const [contentId] = await trx('blog_content_sections').insert(contentEntity);

      // Insert design styles
      if (data.designStyles && data.designStyles.length > 0) {
        const designStylesData = data.designStyles.map((style, index) => ({
          content_section_id: contentId,
          name: style.name,
          description: style.description,
          display_order: style.displayOrder || index + 1,
          is_active: style.isActive ?? true,
          created_at: new Date(),
          updated_at: new Date()
        }));

        await trx('blog_design_styles').insert(designStylesData);
      }

      // Insert important factors
      if (data.importantFactors && data.importantFactors.length > 0) {
        const factorsData = data.importantFactors.map((factor, index) => ({
          content_section_id: contentId,
          title: factor.title,
          description: factor.description,
          display_order: factor.displayOrder || index + 1,
          is_active: factor.isActive ?? true,
          created_at: new Date(),
          updated_at: new Date()
        }));

        await trx('blog_important_factors').insert(factorsData);
      }

      // Insert process steps
      if (data.processSteps && data.processSteps.length > 0) {
        const processStepsData = data.processSteps.map((step, index) => ({
          content_section_id: contentId,
          step_number: step.stepNumber,
          title: step.title,
          description: step.description,
          display_order: step.displayOrder || index + 1,
          is_active: step.isActive ?? true,
          created_at: new Date(),
          updated_at: new Date()
        }));

        await trx('blog_process_steps').insert(processStepsData);
      }

      await trx.commit();

      // Get the complete content section
      const result = await this.getContentSection();
      return result!;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  // ========== CONSULTATION CTA OPERATIONS ==========

  async getConsultationCTA(): Promise<ConsultationCTA | null> {
    const ctaEntity = await this.consultationCTAModel.findOneByCondition({ is_active: true });
    return ctaEntity ? this.transformConsultationCTAEntityToData(ctaEntity) : null;
  }

  async createConsultationCTA(data: CreateConsultationCTARequest): Promise<ConsultationCTA> {
    const trx = await db.transaction();

    try {
      // Deactivate existing CTA
      await trx('blog_consultation_cta').update({ is_active: false });

      const ctaEntity = {
        title: data.title,
        description: data.description,
        features: JSON.stringify(data.features),
        button_text: data.buttonText,
        image_url: data.imageUrl,
        is_active: data.isActive ?? true,
        display_order: data.displayOrder ?? 1,
        created_at: new Date(),
        updated_at: new Date()
      };

      const [id] = await trx('blog_consultation_cta').insert(ctaEntity);
      await trx.commit();

      if (!id || typeof id !== 'number') {
        throw new Error('Failed to create consultation CTA - invalid ID');
      }

      const result = await this.consultationCTAModel.findById(id);
      if (!result) {
        throw new Error('Failed to create consultation CTA');
      }
      return this.transformConsultationCTAEntityToData(result);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  // ========== COMPLETE BLOG PAGE DATA ==========

  async getBlogPageData(): Promise<BlogPageData> {
    const [heroData, projectGallery, contentSection, consultationCTA] = await Promise.all([
      this.getHeroData(),
      this.getProjectItems(),
      this.getContentSection(),
      this.getConsultationCTA()
    ]);

    return {
      heroData: heroData!,
      projectItems: projectGallery.projects,
      contentSection: contentSection!,
      consultationCTA: consultationCTA!
    };
  }

  // ========== SEARCH AND FILTERING ==========

  async searchProjects(filters: BlogPageSearchFilters): Promise<ProjectGalleryData> {
    let query = db('blog_project_items');

    // Apply filters
    if (filters.query) {
      query = query.where(function(builder) {
        builder.where('title', 'like', `%${filters.query}%`)
               .orWhere('style', 'like', `%${filters.query}%`)
               .orWhere('location', 'like', `%${filters.query}%`)
               .orWhere('client_name', 'like', `%${filters.query}%`);
      });
    }

    if (filters.style) {
      query = query.where('style', 'like', `%${filters.style}%`);
    }

    if (filters.location) {
      query = query.where('location', 'like', `%${filters.location}%`);
    }

    if (filters.isActive !== undefined) {
      query = query.where('is_active', filters.isActive);
    }

    if (filters.dateFrom) {
      query = query.where('created_at', '>=', filters.dateFrom);
    }

    if (filters.dateTo) {
      query = query.where('created_at', '<=', filters.dateTo);
    }

    // Sorting
    const sortBy = filters.sortBy || 'display_order';
    const sortOrder = filters.sortOrder || 'asc';
    query = query.orderBy(sortBy, sortOrder);

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const [projects, totalCount] = await Promise.all([
      query.clone().limit(limit).offset(offset),
      query.clone().count('* as count').first()
    ]);

    const totalProjectsCount = typeof totalCount?.count === 'string' ? parseInt(totalCount.count) : (totalCount?.count || 0);

    return {
      projects: projects.map(this.transformProjectItemEntityToData),
      totalProjects: totalProjectsCount,
      hasMore: offset + limit < totalProjectsCount
    };
  }

  // ========== BULK OPERATIONS ==========

  async bulkUpdateProjects(data: BulkUpdateRequest): Promise<number> {
    const updateData: any = {
      updated_at: new Date()
    };

    if (data.updates.isActive !== undefined) {
      updateData.is_active = data.updates.isActive;
    }

    if (data.updates.displayOrder !== undefined) {
      updateData.display_order = data.updates.displayOrder;
    }

    const updated = await db('blog_project_items')
      .whereIn('id', data.ids)
      .update(updateData);

    return updated;
  }

  async bulkDeleteProjects(data: BulkDeleteRequest): Promise<number> {
    if (data.hardDelete) {
      return await db('blog_project_items')
        .whereIn('id', data.ids)
        .del();
    } else {
      return await db('blog_project_items')
        .whereIn('id', data.ids)
        .update({ is_active: false, updated_at: new Date() });
    }
  }

  // ========== DATA TRANSFORMATION METHODS ==========

  private transformHeroEntityToData(entity: BlogHeroEntity): BlogHeroData {
    return {
      id: entity.id,
      title: entity.title,
      subtitle: entity.subtitle,
      isActive: entity.is_active,
      createdAt: entity.created_at!,
      updatedAt: entity.updated_at!
    };
  }

  private transformProjectItemEntityToData(entity: BlogProjectItemEntity): BlogProjectItem {
    return {
      id: entity.project_id,
      title: entity.title,
      image: entity.image_url,
      area: entity.area,
      style: entity.style,
      client: entity.client_name,
      location: entity.location,
      isActive: entity.is_active,
      displayOrder: entity.display_order,
      createdAt: entity.created_at!,
      updatedAt: entity.updated_at!
    };
  }

  private transformDesignStyleEntityToData(entity: DesignStyleEntity): DesignStyle {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      displayOrder: entity.display_order,
      isActive: entity.is_active,
      createdAt: entity.created_at!,
      updatedAt: entity.updated_at!
    };
  }

  private transformImportantFactorEntityToData(entity: ImportantFactorEntity): ImportantFactor {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      displayOrder: entity.display_order,
      isActive: entity.is_active,
      createdAt: entity.created_at!,
      updatedAt: entity.updated_at!
    };
  }

  private transformProcessStepEntityToData(entity: ProcessStepEntity): ProcessStep {
    return {
      id: entity.id,
      stepNumber: entity.step_number,
      title: entity.title,
      description: entity.description,
      displayOrder: entity.display_order,
      isActive: entity.is_active,
      createdAt: entity.created_at!,
      updatedAt: entity.updated_at!
    };
  }

  private transformConsultationCTAEntityToData(entity: ConsultationCTAEntity): ConsultationCTA {
    let features: string[] = [];
    
    try {
      features = JSON.parse(entity.features);
    } catch (error) {
      console.error('Failed to parse features JSON:', error);
      // Fallback to default features if JSON parsing fails
      features = ['Tư vấn miễn phí', 'Thiết kế 3D chân thực', 'Thi công chuyên nghiệp'];
    }

    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      features: features,
      buttonText: entity.button_text,
      imageUrl: entity.image_url,
      isActive: entity.is_active,
      createdAt: entity.created_at!,
      updatedAt: entity.updated_at!
    };
  }

  // ========== VALIDATION METHODS ==========

  validateHeroData(data: CreateBlogHeroRequest | UpdateBlogHeroRequest): string[] {
    const errors: string[] = [];

    if ('title' in data && (!data.title || data.title.trim().length === 0)) {
      errors.push('Title is required');
    }

    if ('subtitle' in data && (!data.subtitle || data.subtitle.trim().length === 0)) {
      errors.push('Subtitle is required');
    }

    if ('title' in data && data.title && data.title.length > 500) {
      errors.push('Title must be less than 500 characters');
    }

    return errors;
  }

  validateProjectItemData(data: CreateBlogProjectItemRequest | UpdateBlogProjectItemRequest): string[] {
    const errors: string[] = [];

    if ('projectId' in data && (!data.projectId || data.projectId.trim().length === 0)) {
      errors.push('Project ID is required');
    }

    if ('title' in data && (!data.title || data.title.trim().length === 0)) {
      errors.push('Title is required');
    }

    if ('imageUrl' in data && (!data.imageUrl || data.imageUrl.trim().length === 0)) {
      errors.push('Image URL is required');
    }

    return errors;
  }
} 