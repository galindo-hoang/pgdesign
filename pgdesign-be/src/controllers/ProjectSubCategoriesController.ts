import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import ProjectSubCategoriesModel, { ProjectSubCategory, ProjectSubCategoryFilters, ProjectSubCategoryWithProjectOverview } from '../models/ProjectSubCategoriesModel';
import { ApiResponse } from '../types/projectPageTypes';

export class ProjectSubCategoriesController {
  
  // ========== MAIN ENDPOINTS ==========
  
  // Get all project subcategories with optional filters
  getAllProjectSubCategories = asyncHandler(async (req: Request, res: Response) => {
    const filters: ProjectSubCategoryFilters = {};
    
    // Extract filters from query parameters
    if (req.query.projectCategoryId) {
      filters.projectCategoryId = parseInt(req.query.projectCategoryId as string);
    }
    if (req.query.categoryId) {
      filters.categoryId = req.query.categoryId as string;
    }
    if (req.query.isActive !== undefined) {
      filters.isActive = req.query.isActive === 'true';
    }

    const includeCategories = req.query.includeCategories === 'true';
    
    let subcategories;
    if (includeCategories) {
      subcategories = await ProjectSubCategoriesModel.getAllWithCategories(filters);
    } else {
      subcategories = await ProjectSubCategoriesModel.getAll(filters);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: subcategories,
      message: 'Project subcategories retrieved successfully'
    };

    res.json(response);
  });

  // Get subcategories by category ID
  getSubCategoriesByCategoryId = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    
    if (!categoryId) {
      throw createError('Category ID parameter is required', 400);
    }
    
    const subcategories = await ProjectSubCategoriesModel.getByCategoryId(categoryId);
    
    const response: ApiResponse<any> = {
      success: true,
      data: subcategories,
      message: 'Project subcategories retrieved successfully'
    };

    res.json(response);
  });

  // Get subcategories with project details overview by category ID
  getSubCategoriesWithProjectOverviewByCategoryId = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    
    if (!categoryId) {
      throw createError('Category ID parameter is required', 400);
    }
    
    const subcategoriesWithOverview = await ProjectSubCategoriesModel.getSubCategoriesWithProjectOverview(categoryId);
    
    const response: ApiResponse<ProjectSubCategoryWithProjectOverview[]> = {
      success: true,
      data: subcategoriesWithOverview,
      message: 'Project subcategories with project overview retrieved successfully'
    };

    res.json(response);
  });

  // Get subcategories grouped by category
  getSubCategoriesGroupedByCategory = asyncHandler(async (req: Request, res: Response) => {
    const grouped = await ProjectSubCategoriesModel.getGroupedByCategory();
    
    const response: ApiResponse<any> = {
      success: true,
      data: grouped,
      message: 'Project subcategories grouped by category retrieved successfully'
    };

    res.json(response);
  });

  // Get single subcategory by ID
  getProjectSubCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid subcategory ID', 400);
    }
    
    const subcategory = await ProjectSubCategoriesModel.getById(parseInt(id));
    
    if (!subcategory) {
      throw createError('Project subcategory not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: subcategory,
      message: 'Project subcategory retrieved successfully'
    };

    res.json(response);
  });

  // Get subcategory by sub_category_id and category_id
  getSubCategoryByIds = asyncHandler(async (req: Request, res: Response) => {
    const { categoryId, subCategoryId } = req.params;
    
    if (!categoryId || !subCategoryId) {
      throw createError('Both category ID and sub-category ID parameters are required', 400);
    }
    
    const subcategory = await ProjectSubCategoriesModel.getBySubCategoryId(categoryId, subCategoryId);
    
    if (!subcategory) {
      throw createError('Project subcategory not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: subcategory,
      message: 'Project subcategory retrieved successfully'
    };

    res.json(response);
  });

  // Create new subcategory
  createProjectSubCategory = asyncHandler(async (req: Request, res: Response) => {
    const errors = await ProjectSubCategoriesModel.validateSubCategoryData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const subcategoryData: Omit<ProjectSubCategory, 'id' | 'createdAt' | 'updatedAt'> = {
      projectCategoryId: req.body.projectCategoryId,
      subCategoryId: req.body.subCategoryId,
      title: req.body.title,
      description: req.body.description,
      heroImageUrl: req.body.heroImageUrl,
      displayOrder: req.body.displayOrder || 0,
      projectCount: req.body.projectCount || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };
    
    const createdSubCategory = await ProjectSubCategoriesModel.create(subcategoryData);
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdSubCategory,
      message: 'Project subcategory created successfully'
    };

    res.status(201).json(response);
  });

  // Update subcategory
  updateProjectSubCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid subcategory ID', 400);
    }
    
    // Get existing subcategory to merge with updates
    const existingSubcategory = await ProjectSubCategoriesModel.getById(parseInt(id));
    if (!existingSubcategory) {
      throw createError('Project subcategory not found', 404);
    }
    
    // Only validate fields that are being updated
    const mergedData = { ...existingSubcategory, ...req.body, id: parseInt(id) };
    const errors = await ProjectSubCategoriesModel.validateSubCategoryData(mergedData);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const updateData: Partial<ProjectSubCategory> = {};
    
    if (req.body.projectCategoryId !== undefined) updateData.projectCategoryId = req.body.projectCategoryId;
    if (req.body.subCategoryId !== undefined) updateData.subCategoryId = req.body.subCategoryId;
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.heroImageUrl !== undefined) updateData.heroImageUrl = req.body.heroImageUrl;
    if (req.body.displayOrder !== undefined) updateData.displayOrder = req.body.displayOrder;
    if (req.body.projectCount !== undefined) updateData.projectCount = req.body.projectCount;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    
    const updatedSubCategory = await ProjectSubCategoriesModel.update(parseInt(id), updateData);
    
    if (!updatedSubCategory) {
      throw createError('Project subcategory not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedSubCategory,
      message: 'Project subcategory updated successfully'
    };

    res.json(response);
  });

  // Delete subcategory (soft delete)
  deleteProjectSubCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid subcategory ID', 400);
    }
    
    const deleted = await ProjectSubCategoriesModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Project subcategory not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Project subcategory deleted successfully'
    };

    res.json(response);
  });

  // Update project count for a subcategory
  updateProjectCount = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { count } = req.body;
    
    if (!id || isNaN(parseInt(id))) {
      throw createError('Invalid subcategory ID', 400);
    }
    
    if (count === undefined || isNaN(parseInt(count))) {
      throw createError('Project count is required and must be a number', 400);
    }
    
    await ProjectSubCategoriesModel.updateProjectCount(parseInt(id), parseInt(count));
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Project count updated successfully'
    };

    res.json(response);
  });

  // Get subcategory by sub_category_id (globally unique)
  getSubCategoryBySubCategoryId = asyncHandler(async (req: Request, res: Response) => {
    const { subCategoryId } = req.params;
    
    if (!subCategoryId) {
      throw createError('Sub-category ID parameter is required', 400);
    }
    
    const subcategory = await ProjectSubCategoriesModel.getBySubCategoryIdOnly(subCategoryId);
    
    if (!subcategory) {
      throw createError('Project subcategory not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: subcategory,
      message: 'Project subcategory retrieved successfully'
    };

    res.json(response);
  });

  // Update subcategory by sub_category_id
  updateSubCategoryBySubCategoryId = asyncHandler(async (req: Request, res: Response) => {
    const { subCategoryId } = req.params;
    
    if (!subCategoryId) {
      throw createError('Sub-category ID parameter is required', 400);
    }
    
    // Get existing subcategory to merge with updates
    const existingSubcategory = await ProjectSubCategoriesModel.getBySubCategoryIdOnly(subCategoryId);
    if (!existingSubcategory) {
      throw createError('Project subcategory not found', 404);
    }
    
    // Only validate fields that are being updated
    const mergedData = { ...existingSubcategory, ...req.body };
    const errors = await ProjectSubCategoriesModel.validateSubCategoryData(mergedData);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const updateData: Partial<ProjectSubCategory> = {};
    
    if (req.body.projectCategoryId !== undefined) updateData.projectCategoryId = req.body.projectCategoryId;
    if (req.body.subCategoryId !== undefined) updateData.subCategoryId = req.body.subCategoryId;
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.heroImageUrl !== undefined) updateData.heroImageUrl = req.body.heroImageUrl;
    if (req.body.displayOrder !== undefined) updateData.displayOrder = req.body.displayOrder;
    if (req.body.projectCount !== undefined) updateData.projectCount = req.body.projectCount;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    
    const updatedSubCategory = await ProjectSubCategoriesModel.updateBySubCategoryId(subCategoryId, updateData);
    
    if (!updatedSubCategory) {
      throw createError('Failed to update project subcategory', 500);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedSubCategory,
      message: 'Project subcategory updated successfully'
    };

    res.json(response);
  });
}

export default new ProjectSubCategoriesController(); 