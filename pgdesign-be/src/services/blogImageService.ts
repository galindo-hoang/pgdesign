/**
 * Blog Image Service
 * Handles image upload and management for blog posts
 * Uses dependency injection for storage service
 */

import { IFileUploadService } from '../interfaces/IFileUploadService';
import { getFileUploadService } from '../factories/FileUploadServiceFactory';
import { FileUpload } from '../types/homePageTypes';
import { createError } from '../middleware/errorHandler';

export interface BlogImageData {
  featuredImage?: FileUpload;
  contentImages?: FileUpload[];
  blogId: string;
}

export interface BlogImageUploadResult {
  featuredImageUrl?: string;
  contentImageUrls?: string[];
  error?: string;
}

/**
 * Blog Image Service
 * Handles all image operations for blog posts with DI
 */
export class BlogImageService {
  private uploadService: IFileUploadService;

  constructor(uploadService?: IFileUploadService) {
    this.uploadService = uploadService || getFileUploadService();
  }

  /**
   * Upload featured image for blog post
   * @param file - Featured image file
   * @param blogId - Blog ID for folder organization
   * @returns Featured image URL with thumbnail
   */
  async uploadFeaturedImage(file: FileUpload, blogId: string): Promise<{ original: string; thumbnail: string }> {
    try {
      const folder = `blog/${blogId}`;
      return await this.uploadService.uploadImageWithThumbnail(file, folder);
    } catch (error) {
      console.error('Error uploading blog featured image:', error);
      throw createError('Failed to upload blog featured image', 500);
    }
  }

  /**
   * Upload content images for blog post
   * @param files - Array of content image files
   * @param blogId - Blog ID for folder organization
   * @returns Array of image URLs
   */
  async uploadContentImages(files: FileUpload[], blogId: string): Promise<string[]> {
    try {
      const folder = `blog/${blogId}/content`;
      return await this.uploadService.uploadMultipleImages(files, folder);
    } catch (error) {
      console.error('Error uploading blog content images:', error);
      throw createError('Failed to upload blog content images', 500);
    }
  }

  /**
   * Process and upload all images for a blog post
   * Handles both featured image and content images
   * @param data - Blog image data
   * @returns Upload results
   */
  async processBlogImages(data: BlogImageData): Promise<BlogImageUploadResult> {
    const result: BlogImageUploadResult = {};

    try {
      // Upload featured image if provided
      if (data.featuredImage) {
        const { thumbnail } = await this.uploadFeaturedImage(data.featuredImage, data.blogId);
        result.featuredImageUrl = thumbnail; // Use thumbnail for featured image
      }

      // Upload content images if provided
      if (data.contentImages && data.contentImages.length > 0) {
        result.contentImageUrls = await this.uploadContentImages(data.contentImages, data.blogId);
      }

      return result;
    } catch (error) {
      console.error('Error processing blog images:', error);
      result.error = error instanceof Error ? error.message : 'Unknown error';
      return result;
    }
  }

  /**
   * Delete old images when updating blog
   * @param oldUrls - Array of old image URLs to delete
   */
  async deleteOldImages(oldUrls: string[]): Promise<void> {
    try {
      const deletePromises = oldUrls.map(url => 
        this.uploadService.deleteFileByUrl(url).catch(err => {
          console.warn(`Failed to delete image: ${url}`, err);
        })
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting old blog images:', error);
    }
  }

  /**
   * Replace featured image - delete old, upload new
   * @param oldUrl - Old featured image URL
   * @param newFile - New featured image file
   * @param blogId - Blog ID
   * @returns New featured image URLs
   */
  async replaceFeaturedImage(
    oldUrl: string | undefined, 
    newFile: FileUpload, 
    blogId: string
  ): Promise<{ original: string; thumbnail: string }> {
    // Upload new featured image first
    const newUrls = await this.uploadFeaturedImage(newFile, blogId);

    // Delete old featured image (don't wait, don't fail)
    if (oldUrl) {
      this.deleteOldImages([oldUrl]).catch(err => 
        console.warn('Failed to delete old featured image:', err)
      );
    }

    return newUrls;
  }

  /**
   * Add new content images to existing blog post
   * @param existingUrls - Existing content image URLs
   * @param newFiles - New files to upload
   * @param blogId - Blog ID
   * @returns Combined array of URLs
   */
  async addContentImages(existingUrls: string[], newFiles: FileUpload[], blogId: string): Promise<string[]> {
    const newUrls = await this.uploadContentImages(newFiles, blogId);
    return [...existingUrls, ...newUrls];
  }

  /**
   * Remove specific content images
   * @param urls - Array of URLs to remove
   */
  async removeContentImages(urls: string[]): Promise<void> {
    await this.deleteOldImages(urls);
  }

  /**
   * Upload single inline image (for rich text editor)
   * @param file - Image file
   * @param blogId - Blog ID
   * @returns Image URL
   */
  async uploadInlineImage(file: FileUpload, blogId: string): Promise<string> {
    try {
      const folder = `blog/${blogId}/inline`;
      return await this.uploadService.uploadImage(file, folder);
    } catch (error) {
      console.error('Error uploading inline image:', error);
      throw createError('Failed to upload inline image', 500);
    }
  }
}

export default new BlogImageService();

