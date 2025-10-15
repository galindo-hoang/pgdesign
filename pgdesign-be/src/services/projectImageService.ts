/**
 * Project Image Service
 * Handles image upload and management for projects
 * Uses dependency injection for storage service
 */

import { IFileUploadService } from '../interfaces/IFileUploadService';
import { getFileUploadService } from '../factories/FileUploadServiceFactory';
import { FileUpload } from '../types/homePageTypes';
import { createError } from '../middleware/errorHandler';

export interface ImageUploadResult {
  thumbnailUrl?: string;
  imageUrls?: string[];
  error?: string;
}

export interface ProjectImageData {
  thumbnail?: FileUpload;
  images?: FileUpload[];
  projectId: string;
}

/**
 * Project Image Service
 * Handles all image operations for projects with DI
 */
export class ProjectImageService {
  private uploadService: IFileUploadService;

  constructor(uploadService?: IFileUploadService) {
    this.uploadService = uploadService || getFileUploadService();
  }

  /**
   * Upload thumbnail for project
   * @param file - Thumbnail file
   * @param projectId - Project ID for folder organization
   * @returns Thumbnail URL
   */
  async uploadThumbnail(file: FileUpload, projectId: string): Promise<string> {
    try {
      const folder = `project-details/${projectId}`;
      const result = await this.uploadService.uploadImageWithThumbnail(file, folder);
      return result.thumbnail; // Return thumbnail URL (smaller version)
    } catch (error) {
      console.error('Error uploading project thumbnail:', error);
      throw createError('Failed to upload project thumbnail', 500);
    }
  }

  /**
   * Upload multiple images for project gallery
   * @param files - Array of image files
   * @param projectId - Project ID for folder organization
   * @returns Array of image URLs
   */
  async uploadGalleryImages(files: FileUpload[], projectId: string): Promise<string[]> {
    try {
      const folder = `project-details/${projectId}`;
      return await this.uploadService.uploadMultipleImages(files, folder);
    } catch (error) {
      console.error('Error uploading project gallery images:', error);
      throw createError('Failed to upload project gallery images', 500);
    }
  }

  /**
   * Process and upload all images for a project
   * Handles both thumbnail and gallery images
   * @param data - Project image data
   * @returns Upload results
   */
  async processProjectImages(data: ProjectImageData): Promise<ImageUploadResult> {
    const result: ImageUploadResult = {};

    try {
      // Upload thumbnail if provided
      if (data.thumbnail) {
        result.thumbnailUrl = await this.uploadThumbnail(data.thumbnail, data.projectId);
      }

      // Upload gallery images if provided
      if (data.images && data.images.length > 0) {
        result.imageUrls = await this.uploadGalleryImages(data.images, data.projectId);
      }

      return result;
    } catch (error) {
      console.error('Error processing project images:', error);
      result.error = error instanceof Error ? error.message : 'Unknown error';
      return result;
    }
  }

  /**
   * Delete old images when updating project
   * @param oldUrls - Array of old image URLs to delete
   */
  async deleteOldImages(oldUrls: string[]): Promise<void> {
    try {
      const deletePromises = oldUrls.map(url => 
        this.uploadService.deleteFileByUrl(url).catch(err => {
          console.warn(`Failed to delete image: ${url}`, err);
          // Don't throw, just log warning
        })
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting old images:', error);
      // Don't throw - deleting old images shouldn't block the operation
    }
  }

  /**
   * Replace thumbnail - delete old, upload new
   * @param oldUrl - Old thumbnail URL
   * @param newFile - New thumbnail file
   * @param projectId - Project ID
   * @returns New thumbnail URL
   */
  async replaceThumbnail(oldUrl: string | undefined, newFile: FileUpload, projectId: string): Promise<string> {
    // Upload new thumbnail first
    const newUrl = await this.uploadThumbnail(newFile, projectId);

    // Delete old thumbnail (don't wait, don't fail)
    if (oldUrl) {
      this.deleteOldImages([oldUrl]).catch(err => 
        console.warn('Failed to delete old thumbnail:', err)
      );
    }

    return newUrl;
  }

  /**
   * Add new images to existing gallery
   * @param existingUrls - Existing image URLs
   * @param newFiles - New files to upload
   * @param projectId - Project ID
   * @returns Combined array of URLs
   */
  async addGalleryImages(existingUrls: string[], newFiles: FileUpload[], projectId: string): Promise<string[]> {
    const newUrls = await this.uploadGalleryImages(newFiles, projectId);
    return [...existingUrls, ...newUrls];
  }

  /**
   * Remove specific images from gallery
   * @param urls - Array of URLs to remove
   */
  async removeGalleryImages(urls: string[]): Promise<void> {
    await this.deleteOldImages(urls);
  }
}

export default new ProjectImageService();

