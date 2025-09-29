// src/models/ProjectImageBlobDetailModel.ts

import { BaseModel } from "./BaseModel";
import db from "../config/database";

export interface ProjectImageBlobDetail {
  id: number;
  projectDetailId: number;
  imageBlob: string; // Base64 encoded image data
  altText?: string | undefined;
  caption?: string | undefined;
  imageType: string; // 'project', 'thumbnail', 'gallery', etc.
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImageBlobDetailRow {
  id: number;
  project_detail_id: number;
  image_blob: string;
  alt_text?: string | null;
  caption?: string | null;
  image_type: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectImageBlobDetailRequest {
  projectDetailId: number;
  imageBlob: string;
  altText?: string;
  caption?: string;
  imageType?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export class ProjectImageBlobDetailModel extends BaseModel {
  protected override tableName = "project_image_blob_detail";

  constructor() {
    super("project_image_blob_detail");
  }

  // Transform database row to data object
  private transformRowToData(row: ProjectImageBlobDetailRow): ProjectImageBlobDetail {
    return {
      id: row.id,
      projectDetailId: row.project_detail_id,
      imageBlob: row.image_blob,
      altText: row.alt_text || undefined,
      caption: row.caption || undefined,
      imageType: row.image_type,
      displayOrder: row.display_order,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  // Transform data object to database row
  private transformDataToRow(data: Partial<CreateProjectImageBlobDetailRequest>): Partial<ProjectImageBlobDetailRow> {
    const row: Partial<ProjectImageBlobDetailRow> = {};

    if (data.projectDetailId !== undefined) row.project_detail_id = data.projectDetailId;
    if (data.imageBlob !== undefined) row.image_blob = data.imageBlob;
    if (data.altText !== undefined) row.alt_text = data.altText || null;
    if (data.caption !== undefined) row.caption = data.caption || null;
    if (data.imageType !== undefined) row.image_type = data.imageType;
    if (data.displayOrder !== undefined) row.display_order = data.displayOrder;
    if (data.isActive !== undefined) row.is_active = data.isActive;

    return row;
  }

  // Get all images for a project
  async getImagesByProjectDetailId(projectDetailId: number): Promise<ProjectImageBlobDetail[]> {
    const rows: ProjectImageBlobDetailRow[] = await db(this.tableName)
      .select("*")
      .where({ 
        project_detail_id: projectDetailId,
        is_active: true 
      })
      .orderBy('display_order', 'asc')
      .orderBy('created_at', 'asc');

    return rows.map(row => this.transformRowToData(row));
  }

  // Get images by type for a project
  async getImagesByProjectAndType(
    projectDetailId: number, 
    imageType: string
  ): Promise<ProjectImageBlobDetail[]> {
    const rows: ProjectImageBlobDetailRow[] = await db(this.tableName)
      .select("*")
      .where({ 
        project_detail_id: projectDetailId,
        image_type: imageType,
        is_active: true 
      })
      .orderBy('display_order', 'asc')
      .orderBy('created_at', 'asc');

    return rows.map(row => this.transformRowToData(row));
  }

  // Create multiple images for a project
  async createImagesForProject(
    projectDetailId: number,
    images: Omit<CreateProjectImageBlobDetailRequest, 'projectDetailId'>[]
  ): Promise<ProjectImageBlobDetail[]> {
    const trx = await db.transaction();

    try {
      const insertData = images.map((image, index) => 
        this.transformDataToRow({
          projectDetailId,
          ...image,
          displayOrder: image.displayOrder ?? index
        })
      );

      const insertedIds = await trx(this.tableName).insert(insertData);
      
      // Get the inserted records
      const insertedRows: ProjectImageBlobDetailRow[] = await trx(this.tableName)
        .select("*")
        .whereIn('id', insertedIds)
        .orderBy('display_order', 'asc');

      await trx.commit();
      
      return insertedRows.map(row => this.transformRowToData(row));
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  // Update image
  async updateImage(
    id: number,
    data: Partial<CreateProjectImageBlobDetailRequest>
  ): Promise<ProjectImageBlobDetail | null> {
    const updateData = this.transformDataToRow(data);
    
    const updated = await db(this.tableName)
      .where({ id })
      .update(updateData);

    if (updated === 0) return null;

    const row: ProjectImageBlobDetailRow = await db(this.tableName)
      .select("*")
      .where({ id })
      .first();

    return row ? this.transformRowToData(row) : null;
  }

  // Delete image (soft delete)
  async deleteImage(id: number): Promise<boolean> {
    const updated = await db(this.tableName)
      .where({ id })
      .update({ is_active: false });

    return updated > 0;
  }

  // Hard delete image
  async hardDeleteImage(id: number): Promise<boolean> {
    const deleted = await db(this.tableName)
      .where({ id })
      .del();

    return deleted > 0;
  }

  // Delete all images for a project
  async deleteImagesByProjectDetailId(projectDetailId: number): Promise<boolean> {
    const updated = await db(this.tableName)
      .where({ project_detail_id: projectDetailId })
      .update({ is_active: false });

    return updated > 0;
  }

  // Hard delete all images for a project
  async hardDeleteImagesByProjectDetailId(projectDetailId: number): Promise<boolean> {
    const deleted = await db(this.tableName)
      .where({ project_detail_id: projectDetailId })
      .del();

    return deleted > 0;
  }

  // Get image count for a project
  async getImageCountByProjectDetailId(projectDetailId: number): Promise<number> {
    const result = await db(this.tableName)
      .count('* as count')
      .where({ 
        project_detail_id: projectDetailId,
        is_active: true 
      })
      .first();

    return Number(result?.count || 0);
  }

  // Reorder images for a project
  async reorderImages(
    projectDetailId: number,
    imageOrders: { id: number; displayOrder: number }[]
  ): Promise<boolean> {
    const trx = await db.transaction();

    try {
      for (const { id, displayOrder } of imageOrders) {
        await trx(this.tableName)
          .where({ 
            id,
            project_detail_id: projectDetailId 
          })
          .update({ display_order: displayOrder });
      }

      await trx.commit();
      return true;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}

export default new ProjectImageBlobDetailModel();
