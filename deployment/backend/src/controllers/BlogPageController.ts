// src/controllers/BlogPageController.ts

import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { BlogPageModel } from '../models/BlogPageModel';
import {
  ApiResponse,
  PaginatedResponse,
  BlogPageData,
  BlogHeroData,
  BlogProjectItem,
  ContentSection,
  ConsultationCTA,
  ProjectGalleryData,
  BlogPageFilters,
  BlogPageSearchFilters,
  CreateBlogHeroRequest,
  UpdateBlogHeroRequest,
  CreateBlogProjectItemRequest,
  UpdateBlogProjectItemRequest,
  CreateContentSectionRequest,
  UpdateContentSectionRequest,
  CreateConsultationCTARequest,
  UpdateConsultationCTARequest,
  BulkUpdateRequest,
  BulkDeleteRequest,
  BulkResponse
} from '../types/blogPageTypes';

export class BlogPageController {
  private blogPageModel: BlogPageModel;

  constructor() {
    this.blogPageModel = new BlogPageModel();
  }

  // ========== MAIN BLOG PAGE ENDPOINT ==========

  /**
   * Get all blog page data
   * GET /api/v1/blogpage
   */
  getBlogPageData = asyncHandler(async (req: Request, res: Response) => {
    const blogPageData = await this.blogPageModel.getBlogPageData();
    
    const response: ApiResponse<BlogPageData> = {
      success: true,
      data: blogPageData,
      message: 'Blog page data retrieved successfully'
    };

    res.json(response);
  });

  // ========== HERO SECTION ENDPOINTS ==========

  /**
   * Get blog hero data
   * GET /api/v1/blogpage/hero
   */
  getHeroData = asyncHandler(async (req: Request, res: Response) => {
    const heroData = await this.blogPageModel.getHeroData();
    
    if (!heroData) {
      throw createError('Hero data not found', 404);
    }

    const response: ApiResponse<BlogHeroData> = {
      success: true,
      data: heroData,
      message: 'Hero data retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Create blog hero data
   * POST /api/v1/blogpage/hero
   */
  createHeroData = asyncHandler(async (req: Request, res: Response) => {
    const data: CreateBlogHeroRequest = req.body;
    
    // Validate the data
    const errors = this.blogPageModel.validateHeroData(data);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }

    const heroData = await this.blogPageModel.createHeroData(data);
    
    const response: ApiResponse<BlogHeroData> = {
      success: true,
      data: heroData,
      message: 'Hero data created successfully'
    };

    res.status(201).json(response);
  });

  /**
   * Update blog hero data
   * PUT /api/v1/blogpage/hero/:id
   */
  updateHeroData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateBlogHeroRequest = req.body;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid hero ID', 400);
    }

    // Validate the data
    const errors = this.blogPageModel.validateHeroData(data);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }

    const heroData = await this.blogPageModel.updateHeroData(parseInt(id), data);
    
    if (!heroData) {
      throw createError('Hero data not found', 404);
    }

    const response: ApiResponse<BlogHeroData> = {
      success: true,
      data: heroData,
      message: 'Hero data updated successfully'
    };

    res.json(response);
  });

  // ========== PROJECT ITEMS ENDPOINTS ==========

  /**
   * Get project items with filtering and pagination
   * GET /api/v1/blogpage/projects
   */
  getProjectItems = asyncHandler(async (req: Request, res: Response) => {
    const filters: BlogPageFilters = {};
    
    // Extract filters from query parameters
    if (req.query.category) filters.category = req.query.category as string;
    if (req.query.style) filters.style = req.query.style as string;
    if (req.query.location) filters.location = req.query.location as string;
    if (req.query.limit) filters.limit = parseInt(req.query.limit as string);
    if (req.query.offset) filters.offset = parseInt(req.query.offset as string);

    const projectGallery = await this.blogPageModel.getProjectItems(filters);
    
    const response: ApiResponse<ProjectGalleryData> = {
      success: true,
      data: projectGallery,
      message: 'Project items retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Get single project item by ID
   * GET /api/v1/blogpage/projects/:id
   */
  getProjectItemById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid project item ID', 400);
    }

    const projectItem = await this.blogPageModel.getProjectItemById(parseInt(id));
    
    if (!projectItem) {
      throw createError('Project item not found', 404);
    }

    const response: ApiResponse<BlogProjectItem> = {
      success: true,
      data: projectItem,
      message: 'Project item retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Create project item
   * POST /api/v1/blogpage/projects
   */
  createProjectItem = asyncHandler(async (req: Request, res: Response) => {
    const data: CreateBlogProjectItemRequest = req.body;
    
    // Validate the data
    const errors = this.blogPageModel.validateProjectItemData(data);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }

    const projectItem = await this.blogPageModel.createProjectItem(data);
    
    const response: ApiResponse<BlogProjectItem> = {
      success: true,
      data: projectItem,
      message: 'Project item created successfully'
    };

    res.status(201).json(response);
  });

  /**
   * Update project item
   * PUT /api/v1/blogpage/projects/:id
   */
  updateProjectItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateBlogProjectItemRequest = req.body;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid project item ID', 400);
    }

    // Validate the data
    const errors = this.blogPageModel.validateProjectItemData(data);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }

    const projectItem = await this.blogPageModel.updateProjectItem(parseInt(id), data);
    
    if (!projectItem) {
      throw createError('Project item not found', 404);
    }

    const response: ApiResponse<BlogProjectItem> = {
      success: true,
      data: projectItem,
      message: 'Project item updated successfully'
    };

    res.json(response);
  });

  /**
   * Delete project item
   * DELETE /api/v1/blogpage/projects/:id
   */
  deleteProjectItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid project item ID', 400);
    }

    const deleted = await this.blogPageModel.deleteProjectItem(parseInt(id));
    
    if (!deleted) {
      throw createError('Project item not found', 404);
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Project item deleted successfully'
    };

    res.json(response);
  });

  // ========== CONTENT SECTION ENDPOINTS ==========

  /**
   * Get content section data
   * GET /api/v1/blogpage/content-section
   */
  getContentSection = asyncHandler(async (req: Request, res: Response) => {
    const contentSection = await this.blogPageModel.getContentSection();
    
    if (!contentSection) {
      throw createError('Content section not found', 404);
    }

    const response: ApiResponse<ContentSection> = {
      success: true,
      data: contentSection,
      message: 'Content section retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Create content section
   * POST /api/v1/blogpage/content-section
   */
  createContentSection = asyncHandler(async (req: Request, res: Response) => {
    const data: CreateContentSectionRequest = req.body;
    
    // Basic validation
    if (!data.mainTitle || !data.introText) {
      throw createError('Main title and intro text are required', 400);
    }

    const contentSection = await this.blogPageModel.createContentSection(data);
    
    const response: ApiResponse<ContentSection> = {
      success: true,
      data: contentSection,
      message: 'Content section created successfully'
    };

    res.status(201).json(response);
  });

  // ========== CONSULTATION CTA ENDPOINTS ==========

  /**
   * Get consultation CTA data
   * GET /api/v1/blogpage/consultation-cta
   */
  getConsultationCTA = asyncHandler(async (req: Request, res: Response) => {
    const consultationCTA = await this.blogPageModel.getConsultationCTA();
    
    if (!consultationCTA) {
      throw createError('Consultation CTA not found', 404);
    }

    const response: ApiResponse<ConsultationCTA> = {
      success: true,
      data: consultationCTA,
      message: 'Consultation CTA retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Create consultation CTA
   * POST /api/v1/blogpage/consultation-cta
   */
  createConsultationCTA = asyncHandler(async (req: Request, res: Response) => {
    const data: CreateConsultationCTARequest = req.body;
    
    // Basic validation
    if (!data.title || !data.description || !data.features || !data.buttonText) {
      throw createError('Title, description, features, and button text are required', 400);
    }

    const consultationCTA = await this.blogPageModel.createConsultationCTA(data);
    
    const response: ApiResponse<ConsultationCTA> = {
      success: true,
      data: consultationCTA,
      message: 'Consultation CTA created successfully'
    };

    res.status(201).json(response);
  });

  // ========== SEARCH AND FILTERING ENDPOINTS ==========

  /**
   * Search projects with advanced filtering
   * GET /api/v1/blogpage/search
   */
  searchProjects = asyncHandler(async (req: Request, res: Response) => {
    const filters: BlogPageSearchFilters = {};
    
    // Extract search parameters
    if (req.query.query) filters.query = req.query.query as string;
    if (req.query.category) filters.category = req.query.category as string;
    if (req.query.style) filters.style = req.query.style as string;
    if (req.query.location) filters.location = req.query.location as string;
    if (req.query.isActive !== undefined) filters.isActive = req.query.isActive === 'true';
    if (req.query.dateFrom) filters.dateFrom = req.query.dateFrom as string;
    if (req.query.dateTo) filters.dateTo = req.query.dateTo as string;
    if (req.query.sortBy) filters.sortBy = req.query.sortBy as any;
    if (req.query.sortOrder) filters.sortOrder = req.query.sortOrder as 'asc' | 'desc';
    if (req.query.page) filters.page = parseInt(req.query.page as string);
    if (req.query.limit) filters.limit = parseInt(req.query.limit as string);

    const searchResults = await this.blogPageModel.searchProjects(filters);
    
    const response: ApiResponse<ProjectGalleryData> = {
      success: true,
      data: searchResults,
      message: 'Search results retrieved successfully'
    };

    res.json(response);
  });

  // ========== BULK OPERATIONS ENDPOINTS ==========

  /**
   * Bulk update project items
   * PUT /api/v1/blogpage/projects/bulk-update
   */
  bulkUpdateProjects = asyncHandler(async (req: Request, res: Response) => {
    const data: BulkUpdateRequest = req.body;
    
    if (!data.ids || !Array.isArray(data.ids) || data.ids.length === 0) {
      throw createError('IDs array is required and cannot be empty', 400);
    }

    if (!data.updates || Object.keys(data.updates).length === 0) {
      throw createError('Updates object is required and cannot be empty', 400);
    }

    const affectedCount = await this.blogPageModel.bulkUpdateProjects(data);
    
    const response: BulkResponse = {
      success: true,
      message: `${affectedCount} project items updated successfully`,
      affectedCount
    };

    res.json(response);
  });

  /**
   * Bulk delete project items
   * DELETE /api/v1/blogpage/projects/bulk-delete
   */
  bulkDeleteProjects = asyncHandler(async (req: Request, res: Response) => {
    const data: BulkDeleteRequest = req.body;
    
    if (!data.ids || !Array.isArray(data.ids) || data.ids.length === 0) {
      throw createError('IDs array is required and cannot be empty', 400);
    }

    const affectedCount = await this.blogPageModel.bulkDeleteProjects(data);
    
    const response: BulkResponse = {
      success: true,
      message: `${affectedCount} project items ${data.hardDelete ? 'permanently deleted' : 'deactivated'} successfully`,
      affectedCount
    };

    res.json(response);
  });

  // ========== UTILITY ENDPOINTS ==========

  /**
   * Get unique styles for filtering
   * GET /api/v1/blogpage/util/styles
   */
  getStyles = asyncHandler(async (req: Request, res: Response) => {
    // This would typically be implemented as a dedicated method in the model
    // For now, we'll return a simple response
    const styles = [
      'Phong cách hiện đại',
      'Phong cách cổ điển',
      'Phong cách tối giản',
      'Phong cách Indochine',
      'Phong cách sang trọng',
      'Phong cách Bắc Âu',
      'Phong cách vintage'
    ];

    const response: ApiResponse<string[]> = {
      success: true,
      data: styles,
      message: 'Styles retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Get unique locations for filtering
   * GET /api/v1/blogpage/util/locations
   */
  getLocations = asyncHandler(async (req: Request, res: Response) => {
    // This would typically be implemented as a dedicated method in the model
    // For now, we'll return a simple response
    const locations = [
      'Quận 1',
      'Quận 2',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Quận 9',
      'Quận 10'
    ];

    const response: ApiResponse<string[]> = {
      success: true,
      data: locations,
      message: 'Locations retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Get blog page statistics
   * GET /api/v1/blogpage/stats
   */
  getStats = asyncHandler(async (req: Request, res: Response) => {
    // This would typically be implemented as a dedicated method in the model
    // For now, we'll return a simple mock response
    const stats = {
      totalProjects: 8,
      activeProjects: 8,
      totalStyles: 4,
      totalFactors: 4,
      totalProcessSteps: 4,
      lastUpdated: new Date()
    };

    const response: ApiResponse<any> = {
      success: true,
      data: stats,
      message: 'Blog page statistics retrieved successfully'
    };

    res.json(response);
  });
} 