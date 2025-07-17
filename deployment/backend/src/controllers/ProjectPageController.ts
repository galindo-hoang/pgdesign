import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { ApiResponse } from '../types/projectPageTypes';

// Import models
import AboutProjectModel from '../models/AboutProjectModel';
import StatsSectionModel from '../models/StatsSectionModel';
import ProjectCategoriesModel from '../models/ProjectCategoriesModel';

export class ProjectPageController {
  
  // ========== MAIN PROJECT PAGE ENDPOINT ==========
  
  // Get all project page data
  getProjectPageData = asyncHandler(async (req: Request, res: Response) => {
    const [
      aboutProject,
      statsSection,
      projectCategories
    ] = await Promise.all([
      AboutProjectModel.getActiveAboutProject(),
      StatsSectionModel.getActiveStatsSection(),
      ProjectCategoriesModel.getActiveProjectCategories()
    ]);

    const response: ApiResponse<any> = {
      success: true,
      data: {
        aboutProject,
        statsSection,
        projectCategories
      }
    };

    res.json(response);
  });

  // ========== ABOUT PROJECT SECTION ENDPOINTS ==========
  
  getAboutProjectData = asyncHandler(async (req: Request, res: Response) => {
    const aboutProjectData = await AboutProjectModel.getActiveAboutProject();
    
    const response: ApiResponse<any> = {
      success: true,
      data: aboutProjectData
    };

    res.json(response);
  });

  createAboutProjectData = asyncHandler(async (req: Request, res: Response) => {
    const errors = await AboutProjectModel.validateAboutProjectData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const createdAboutProject = await AboutProjectModel.createOrUpdateAboutProject(req.body);
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdAboutProject,
      message: 'About project data created successfully'
    };

    res.status(201).json(response);
  });

  updateAboutProjectData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const errors = await AboutProjectModel.validateAboutProjectData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const updatedAboutProject = await AboutProjectModel.update(parseInt(id), req.body);
    
    if (!updatedAboutProject) {
      throw createError('About project data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedAboutProject,
      message: 'About project data updated successfully'
    };

    res.json(response);
  });

  deleteAboutProjectData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await AboutProjectModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('About project data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'About project data deleted successfully'
    };

    res.json(response);
  });

  // ========== STATS SECTION ENDPOINTS ==========
  
  getStatsSectionData = asyncHandler(async (req: Request, res: Response) => {
    const statsSectionData = await StatsSectionModel.getActiveStatsSection();
    
    const response: ApiResponse<any> = {
      success: true,
      data: statsSectionData
    };

    res.json(response);
  });

  createStatsSectionData = asyncHandler(async (req: Request, res: Response) => {
    const { statsSection, statsItems } = req.body;
    
    const headerErrors = await StatsSectionModel.validateStatsSectionData(statsSection);
    if (headerErrors.length > 0) {
      throw createError(`Stats section validation errors: ${headerErrors.join(', ')}`, 400);
    }

    if (statsItems && statsItems.length > 0) {
      for (const item of statsItems) {
        const itemErrors = await StatsSectionModel.validateStatsItemData(item);
        if (itemErrors.length > 0) {
          throw createError(`Stats item validation errors: ${itemErrors.join(', ')}`, 400);
        }
      }
    }
    
    const createdStatsSection = await StatsSectionModel.createStatsSectionWithItems(
      statsSection,
      statsItems || []
    );
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdStatsSection,
      message: 'Stats section data created successfully'
    };

    res.status(201).json(response);
  });

  updateStatsSectionData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { statsSection, statsItems } = req.body;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const headerErrors = await StatsSectionModel.validateStatsSectionData(statsSection);
    if (headerErrors.length > 0) {
      throw createError(`Stats section validation errors: ${headerErrors.join(', ')}`, 400);
    }

    if (statsItems && statsItems.length > 0) {
      for (const item of statsItems) {
        const itemErrors = await StatsSectionModel.validateStatsItemData(item);
        if (itemErrors.length > 0) {
          throw createError(`Stats item validation errors: ${itemErrors.join(', ')}`, 400);
        }
      }
    }
    
    const updatedStatsSection = await StatsSectionModel.updateStatsSectionWithItems(
      parseInt(id),
      statsSection,
      statsItems || []
    );
    
    if (!updatedStatsSection) {
      throw createError('Stats section data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedStatsSection,
      message: 'Stats section data updated successfully'
    };

    res.json(response);
  });

  deleteStatsSectionData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await StatsSectionModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Stats section data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Stats section data deleted successfully'
    };

    res.json(response);
  });

  // ========== PROJECT CATEGORIES ENDPOINTS ==========
  
  getProjectCategoriesData = asyncHandler(async (req: Request, res: Response) => {
    const projectCategoriesData = await ProjectCategoriesModel.getActiveProjectCategories();
    
    const response: ApiResponse<any> = {
      success: true,
      data: projectCategoriesData
    };

    res.json(response);
  });

  createProjectCategoriesData = asyncHandler(async (req: Request, res: Response) => {
    const { projectCategories, categories } = req.body;
    
    const headerErrors = await ProjectCategoriesModel.validateProjectCategoriesData(projectCategories);
    if (headerErrors.length > 0) {
      throw createError(`Project categories validation errors: ${headerErrors.join(', ')}`, 400);
    }

    if (categories && categories.length > 0) {
      for (const category of categories) {
        const categoryErrors = await ProjectCategoriesModel.validateProjectCategoryData(category);
        if (categoryErrors.length > 0) {
          throw createError(`Project category validation errors: ${categoryErrors.join(', ')}`, 400);
        }
      }
    }
    
    const createdProjectCategories = await ProjectCategoriesModel.createProjectCategoriesWithItems(
      projectCategories,
      categories || []
    );
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdProjectCategories,
      message: 'Project categories data created successfully'
    };

    res.status(201).json(response);
  });

  updateProjectCategoriesData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { projectCategories, categories } = req.body;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const headerErrors = await ProjectCategoriesModel.validateProjectCategoriesData(projectCategories);
    if (headerErrors.length > 0) {
      throw createError(`Project categories validation errors: ${headerErrors.join(', ')}`, 400);
    }

    if (categories && categories.length > 0) {
      for (const category of categories) {
        const categoryErrors = await ProjectCategoriesModel.validateProjectCategoryData(category);
        if (categoryErrors.length > 0) {
          throw createError(`Project category validation errors: ${categoryErrors.join(', ')}`, 400);
        }
      }
    }
    
    const updatedProjectCategories = await ProjectCategoriesModel.updateProjectCategoriesWithItems(
      parseInt(id),
      projectCategories,
      categories || []
    );
    
    if (!updatedProjectCategories) {
      throw createError('Project categories data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedProjectCategories,
      message: 'Project categories data updated successfully'
    };

    res.json(response);
  });

  deleteProjectCategoriesData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await ProjectCategoriesModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Project categories data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Project categories data deleted successfully'
    };

    res.json(response);
  });

  // Get a single project category by ID (either category_id or id)
  getProjectCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const category = await ProjectCategoriesModel.getProjectCategoryById(id);
    
    if (!category) {
      throw createError('Project category not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: category,
      message: 'Project category retrieved successfully'
    };

    res.json(response);
  });
}

const projectPageController = new ProjectPageController();
export default projectPageController; 