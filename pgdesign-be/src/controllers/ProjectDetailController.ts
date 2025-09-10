// src/controllers/ProjectDetailController.ts

import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import ProjectDetailModel from '../models/ProjectDetailModel';
import {
  ApiResponse,
  PaginatedResponse,
  ProjectDetailData,
  ProjectDetailFilters,
  CreateProjectDetailRequest,
  UpdateProjectDetailRequest
} from '../types/projectDetailTypes';

export class ProjectDetailController {
  
  // ===== MAIN ENDPOINTS =====
  
  /**
   * Get all project details with optional filtering
   * GET /api/v1/projectdetail
   */
  getAllProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const filters: ProjectDetailFilters = {};
    
    // Extract filters from query parameters
    if (req.query.category) filters.category = req.query.category as string;
    if (req.query.projectCategoryId) filters.projectCategoryId = parseInt(req.query.projectCategoryId as string);
    if (req.query.projectStatus) filters.projectStatus = req.query.projectStatus as string;
    if (req.query.isActive !== undefined) filters.isActive = req.query.isActive === 'true';

    // Check if pagination is requested
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    if (page && limit) {
      const result = await ProjectDetailModel.getPaginated(page, limit, filters);
      
      const response: PaginatedResponse<ProjectDetailData> = {
        success: true,
        data: result.projects,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: result.totalPages
        },
        message: 'Project details retrieved successfully'
      };

      res.json(response);
    } else {
      const projectDetails = await ProjectDetailModel.getAll(filters);
      
      const response: ApiResponse<ProjectDetailData[]> = {
        success: true,
        data: projectDetails,
        message: 'Project details retrieved successfully'
      };

      res.json(response);
    }
  });

  /**
   * Get project detail by ID
   * GET /api/v1/projectdetail/:id
   */
  getProjectDetailById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid project detail ID', 400);
    }

    const projectDetail = await ProjectDetailModel.getById(parseInt(id));
    
    if (!projectDetail) {
      throw createError('Project detail not found', 404);
    }

    const response: ApiResponse<ProjectDetailData> = {
      success: true,
      data: projectDetail,
      message: 'Project detail retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Get project detail by project ID
   * GET /api/v1/projectdetail/project/:projectId
   */
  getProjectDetailByProjectId = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    
    if (!projectId) {
      throw createError('Project ID is required', 400);
    }

    const projectDetail = await ProjectDetailModel.findByProjectId(projectId);
    
    if (!projectDetail) {
      throw createError('Project detail not found', 404);
    }

    const response: ApiResponse<ProjectDetailData> = {
      success: true,
      data: projectDetail,
      message: 'Project detail retrieved successfully'
    };

    res.json(response);
  });

  /**
   * Create new project detail
   * POST /api/v1/projectdetail
   */
  createProjectDetail = asyncHandler(async (req: Request, res: Response) => {
    const data: CreateProjectDetailRequest = req.body;
    
    // Validate the data
    const errors = await ProjectDetailModel.validateProjectDetailData(data);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }

    const projectDetail = await ProjectDetailModel.create(data);
    
    const response: ApiResponse<ProjectDetailData> = {
      success: true,
      data: projectDetail,
      message: 'Project detail created successfully'
    };

    res.status(201).json(response);
  });

  /**
   * Update project detail
   * PUT /api/v1/projectdetail/:id
   */
  updateProjectDetail = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateProjectDetailRequest = req.body;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid project detail ID', 400);
    }

    // Validate the data (for non-empty fields)
    const errors = await ProjectDetailModel.validateProjectDetailData(data as Partial<CreateProjectDetailRequest>);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }

    const projectDetail = await ProjectDetailModel.update(parseInt(id), data);
    
    if (!projectDetail) {
      throw createError('Project detail not found', 404);
    }

    const response: ApiResponse<ProjectDetailData> = {
      success: true,
      data: projectDetail,
      message: 'Project detail updated successfully'
    };

    res.json(response);
  });

  /**
   * Delete project detail (soft delete)
   * DELETE /api/v1/projectdetail/:id
   */
  deleteProjectDetail = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid project detail ID', 400);
    }

    const deleted = await ProjectDetailModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Project detail not found', 404);
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Project detail deleted successfully'
    };

    res.json(response);
  });

  /**
   * Hard delete project detail (permanent)
   * DELETE /api/v1/projectdetail/:id/hard
   */
  hardDeleteProjectDetail = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid project detail ID', 400);
    }

    const deleted = await ProjectDetailModel.hardDelete(parseInt(id));
    
    if (!deleted) {
      throw createError('Project detail not found', 404);
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Project detail permanently deleted'
    };

    res.json(response);
  });

  // Toggle homepage status
  toggleHomepageStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id || '0');
    const { isOnHomePage } = req.body;

    if (isNaN(id)) {
      throw createError('Invalid project detail ID', 400);
    }

    if (typeof isOnHomePage !== 'boolean') {
      throw createError('isOnHomePage must be a boolean value', 400);
    }

    const updatedProject = await ProjectDetailModel.toggleHomepageStatus(id, isOnHomePage);

    if (!updatedProject) {
      throw createError('Project detail not found', 404);
    }

    const response: ApiResponse<ProjectDetailData> = {
      success: true,
      data: updatedProject,
      message: `Project ${isOnHomePage ? 'added to' : 'removed from'} homepage successfully`
    };

    res.json(response);
  });

  // ===== UTILITY ENDPOINTS =====

  /**
   * Get all project categories
   * GET /api/v1/projectdetail/categories
   */
  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProjectDetailModel.getCategories();
    
    const response: ApiResponse<string[]> = {
      success: true,
      data: categories,
      message: 'Project categories retrieved successfully'
    };

    res.json(response);
  });



  // ===== SEARCH ENDPOINTS =====

  /**
   * Search project details by title, description, or tags
   * GET /api/v1/projectdetail/search?q=nhà phố&category=house-normal
   */
  searchProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.q as string;
    const category = req.query.category as string;
    const projectCategoryId = req.query.projectCategoryId as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    if (!query || query.trim() === '') {
      throw createError('Search query is required', 400);
    }

    // This is a simplified search implementation
    // In a real-world scenario, you might want to use a proper search engine
    const filters: ProjectDetailFilters = {};
    if (category) filters.category = category;
    if (projectCategoryId) filters.projectCategoryId = parseInt(projectCategoryId);

    const result = await ProjectDetailModel.getPaginated(page, limit, filters);
    
    // Filter results based on search query (simple text search)
    const filteredProjects = result.projects.filter(project => 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description?.toLowerCase().includes(query.toLowerCase()) ||
      project.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    const response: PaginatedResponse<ProjectDetailData> = {
      success: true,
      data: filteredProjects,
      pagination: {
        page,
        limit,
        total: filteredProjects.length,
        totalPages: Math.ceil(filteredProjects.length / limit)
      },
      message: `Found ${filteredProjects.length} project(s) matching "${query}"`
    };

    res.json(response);
  });

  // ===== BULK OPERATIONS =====

  /**
   * Bulk update project details
   * PUT /api/v1/projectdetail/bulk
   */
  bulkUpdateProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const { projectIds, updateData } = req.body;
    
    if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
      throw createError('Project IDs array is required', 400);
    }

    if (!updateData || typeof updateData !== 'object') {
      throw createError('Update data is required', 400);
    }

    const results = [];
    
    for (const id of projectIds) {
      try {
        const updated = await ProjectDetailModel.update(id, updateData);
        results.push({ id, success: true, data: updated });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.push({ id, success: false, error: errorMessage });
      }
    }

    const response: ApiResponse<any> = {
      success: true,
      data: results,
      message: `Bulk update completed for ${projectIds.length} project(s)`
    };

    res.json(response);
  });

  /**
   * Bulk delete project details
   * DELETE /api/v1/projectdetail/bulk
   */
  bulkDeleteProjectDetails = asyncHandler(async (req: Request, res: Response) => {
    const { projectIds } = req.body;
    
    if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
      throw createError('Project IDs array is required', 400);
    }

    const results = [];
    
    for (const id of projectIds) {
      try {
        const deleted = await ProjectDetailModel.delete(id);
        results.push({ id, success: deleted });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.push({ id, success: false, error: errorMessage });
      }
    }

    const response: ApiResponse<any> = {
      success: true,
      data: results,
      message: `Bulk delete completed for ${projectIds.length} project(s)`
    };

    res.json(response);
  });

  // ===== CATEGORY ENDPOINTS =====

  /**
   * Get projects by category (direct relationship)
   */
  getProjectsByCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.categoryId;
    
    if (!categoryId) {
      throw createError('Category ID is required', 400);
    }

    const filters: ProjectDetailFilters = { 
      category: categoryId,
      isActive: true 
    };

    const projects = await ProjectDetailModel.getAll(filters);

    const response: ApiResponse<ProjectDetailData[]> = {
      success: true,
      data: projects,
      message: `Found ${projects.length} projects for category: ${categoryId}`
    };

    res.json(response);
  });

  /**
   * Get project counts by category
   */
  getCategoryCounts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Get counts from the database
    const counts = await ProjectDetailModel.getCategoryCounts();

    const response: ApiResponse<any> = {
      success: true,
      data: counts,
      message: 'Category counts retrieved successfully'
    };

    res.json(response);
  });
}

export default new ProjectDetailController(); 