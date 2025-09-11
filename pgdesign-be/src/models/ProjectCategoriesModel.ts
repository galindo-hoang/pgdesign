import db from "../config/database";
import { BaseModel } from "./BaseModel";
import {
  ProjectCategoriesData,
  ProjectCategory,
  CreateProjectCategoryRequest,
  UpdateProjectCategoryRequest,
} from "../types/projectPageTypes";

export class ProjectCategoriesModel extends BaseModel {
  private projectCategoriesItemsModel: BaseModel;

  constructor() {
    super("project_categories_data");
    this.projectCategoriesItemsModel = new BaseModel("project_categories");
  }

  async getActiveProjectCategories(): Promise<ProjectCategoriesData | null> {
    const result = await this.findOneByCondition({ is_active: true });

    if (!result) return null;

    // Get project categories
    const categories = await db("project_categories")
      .where({
        categories_data_id: result.id,
        is_active: true,
      })
      .orderBy("display_order", "asc")
      .select(
        "id",
        "category_id",
        "title",
        "project_count",
        "background_image_url",
        "background_image_blob",
        "navigation_path",
        "display_order"
      );

    return {
      id: result.id,
      mainTitle: result.main_title,
      subtitle: result.subtitle,
      description: result.description,
      categories: categories.map((category: any) => ({
        id: category.id,
        categoryId: category.category_id,
        title: category.title,
        projectCount: category.project_count,
        backgroundImageUrl: this.getFullImageUrl(category.background_image_url),
        backgroundImageBlob: category.background_image_blob || undefined,
        navigationPath: category.navigation_path,
        displayOrder: category.display_order,
      })),
      isActive: result.is_active,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  // Helper method to convert relative paths to full MinIO URLs
  private getFullImageUrl(relativeUrl: string): string {
    if (!relativeUrl) return "";

    // If already a full URL, return as is
    if (relativeUrl.startsWith("http")) {
      return relativeUrl;
    }

    // Convert relative path to full MinIO URL
    const baseUrl = "http://localhost:9000/pgdesign-assets";
    return `${baseUrl}${relativeUrl}`;
  }

  async createProjectCategoriesWithItems(
    data: ProjectCategoriesData,
    categories: ProjectCategory[] = []
  ): Promise<ProjectCategoriesData> {
    const trx = await db.transaction();

    try {
      // First deactivate existing active project categories
      await trx(this.tableName)
        .where({ is_active: true })
        .update({ is_active: false });

      const insertData = {
        main_title: data.mainTitle,
        subtitle: data.subtitle,
        description: data.description,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const [categoriesDataId] = await trx(this.tableName).insert(insertData);

      // Insert project categories
      if (categories.length > 0) {
        const categoriesData = categories.map((category, index) => ({
          categories_data_id: categoriesDataId,
          category_id: category.categoryId,
          title: category.title,
          project_count: category.projectCount,
          background_image_url: category.backgroundImageUrl,
          background_image_blob: category.backgroundImageBlob || null,
          navigation_path: category.navigationPath,
          display_order: category.displayOrder || index,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        }));

        await trx("project_categories").insert(categoriesData);
      }

      await trx.commit();

      return {
        id: categoriesDataId as number,
        mainTitle: data.mainTitle,
        subtitle: data.subtitle,
        description: data.description,
        categories: categories,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async updateProjectCategoriesWithItems(
    id: number,
    data: Partial<ProjectCategoriesData>,
    categories?: ProjectCategory[]
  ): Promise<ProjectCategoriesData | null> {
    const trx = await db.transaction();

    try {
      const updateData: any = {
        updated_at: new Date(),
      };

      if (data.mainTitle !== undefined) updateData.main_title = data.mainTitle;
      if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.isActive !== undefined) updateData.is_active = data.isActive;

      const updated = await trx(this.tableName)
        .where({ id })
        .update(updateData);

      if (!updated) {
        await trx.rollback();
        return null;
      }

      // Update project categories if provided
      if (categories !== undefined) {
        await trx("project_categories")
          .where({ categories_data_id: id })
          .update({ is_active: false });

        if (categories.length > 0) {
          const categoriesData = categories.map((category, index) => ({
            categories_data_id: id,
            category_id: category.categoryId,
            title: category.title,
            project_count: category.projectCount,
            background_image_url: category.backgroundImageUrl,
            background_image_blob: category.backgroundImageBlob || null,
            navigation_path: category.navigationPath,
            display_order: category.displayOrder || index,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
          }));

          await trx("project_categories").insert(categoriesData);
        }
      }

      await trx.commit();

      return await this.getActiveProjectCategories();
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async validateProjectCategoriesData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.mainTitle || typeof data.mainTitle !== "string") {
      errors.push("Main title is required and must be a string");
    }

    if (!data.subtitle || typeof data.subtitle !== "string") {
      errors.push("Subtitle is required and must be a string");
    }

    if (!data.description || typeof data.description !== "string") {
      errors.push("Description is required and must be a string");
    }

    return errors;
  }

  async validateProjectCategoryData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.categoryId || typeof data.categoryId !== "string") {
      errors.push("Category ID is required and must be a string");
    }

    if (!data.title || typeof data.title !== "string") {
      errors.push("Title is required and must be a string");
    }

    if (typeof data.projectCount !== "number") {
      errors.push("Project count is required and must be a number");
    }

    if (
      !data.backgroundImageUrl ||
      typeof data.backgroundImageUrl !== "string"
    ) {
      errors.push("Background image URL is required and must be a string");
    }

    if (!data.navigationPath || typeof data.navigationPath !== "string") {
      errors.push("Navigation path is required and must be a string");
    }

    return errors;
  }

  async validateUpdateProjectCategoryData(data: any): Promise<string[]> {
    const errors: string[] = [];

    // For update, categoryId comes from URL parameter, not body
    if (
      data.title !== undefined &&
      (!data.title || typeof data.title !== "string")
    ) {
      errors.push("Title must be a string");
    }

    if (
      data.projectCount !== undefined &&
      typeof data.projectCount !== "number"
    ) {
      errors.push("Project count must be a number");
    }

    if (
      data.backgroundImageUrl !== undefined &&
      (!data.backgroundImageUrl || typeof data.backgroundImageUrl !== "string")
    ) {
      errors.push("Background image URL must be a string");
    }

    if (
      data.navigationPath !== undefined &&
      (!data.navigationPath || typeof data.navigationPath !== "string")
    ) {
      errors.push("Navigation path must be a string");
    }

    return errors;
  }

  // Get a single project category by ID (either category_id or id)
  async getProjectCategoryById(id: string): Promise<ProjectCategory | null> {
    let categoryRow;

    // First try to find by category_id
    categoryRow = await db("project_categories")
      .where({
        category_id: id,
        is_active: true,
      })
      .first();

    // If not found by category_id, try by id (numeric)
    if (!categoryRow && !isNaN(parseInt(id))) {
      categoryRow = await db("project_categories")
        .where({
          id: parseInt(id),
          is_active: true,
        })
        .first();
    }

    if (!categoryRow) return null;

    return {
      id: categoryRow.id,
      categoryId: categoryRow.category_id,
      title: categoryRow.title,
      projectCount: categoryRow.project_count,
      backgroundImageUrl: categoryRow.background_image_url,
      backgroundImageBlob: categoryRow.background_image_blob || undefined,
      navigationPath: categoryRow.navigation_path,
      displayOrder: categoryRow.display_order,
    };
  }

  // ========== INDIVIDUAL PROJECT CATEGORY MANAGEMENT ==========

  async createProjectCategory(
    categoriesDataId: number,
    categoryData: CreateProjectCategoryRequest
  ): Promise<ProjectCategory> {
    const categoryRow = {
      categories_data_id: categoriesDataId,
      category_id: categoryData.categoryId,
      title: categoryData.title,
      project_count: categoryData.projectCount,
      background_image_url: categoryData.backgroundImageUrl,
      background_image_blob: categoryData.backgroundImageBlob || null,
      navigation_path: categoryData.navigationPath,
      display_order: categoryData.displayOrder || 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await db("project_categories").insert(categoryRow);

    const newCategory = await this.getProjectCategoryById(
      categoryData.categoryId
    );
    if (!newCategory) {
      throw new Error("Failed to retrieve created category");
    }

    return newCategory;
  }

  async updateProjectCategory(
    categoriesDataId: number,
    categoryId: string,
    categoryData: UpdateProjectCategoryRequest
  ): Promise<ProjectCategory | null> {
    const updateData: any = {
      updated_at: new Date(),
    };

    if (categoryData.title !== undefined) updateData.title = categoryData.title;
    if (categoryData.projectCount !== undefined)
      updateData.project_count = categoryData.projectCount;
    if (categoryData.backgroundImageUrl !== undefined)
      updateData.background_image_url = categoryData.backgroundImageUrl;
    if (categoryData.backgroundImageBlob !== undefined)
      updateData.background_image_blob = categoryData.backgroundImageBlob;
    if (categoryData.navigationPath !== undefined)
      updateData.navigation_path = categoryData.navigationPath;
    if (categoryData.displayOrder !== undefined)
      updateData.display_order = categoryData.displayOrder;

    await db("project_categories")
      .where({
        categories_data_id: categoriesDataId,
        category_id: categoryId,
        is_active: true,
      })
      .update(updateData);

    return await this.getProjectCategoryById(categoryId);
  }

  async deleteProjectCategory(
    categoriesDataId: number,
    categoryId: string
  ): Promise<boolean> {
    const deleted = await db("project_categories")
      .where({
        categories_data_id: categoriesDataId,
        category_id: categoryId,
        is_active: true,
      })
      .update({
        is_active: false,
        updated_at: new Date(),
      });

    return deleted > 0;
  }
}

const projectCategoriesModel = new ProjectCategoriesModel();
export default projectCategoriesModel;
