// Interface for File Upload Service
// This allows easy switching between different storage providers (MinIO, AWS S3, Google Cloud, Azure, etc.)

import { FileUpload } from '../types/homePageTypes';

/**
 * File Upload Service Interface
 * Implement this interface for different storage providers
 */
export interface IFileUploadService {
  /**
   * Validate file before upload
   * @param file - File to validate
   * @throws Error if validation fails
   */
  validateFile(file: FileUpload): void;

  /**
   * Upload a single image file
   * @param file - File to upload
   * @param folder - Target folder/path in storage
   * @returns Promise with public URL of uploaded file
   */
  uploadImage(file: FileUpload, folder?: string): Promise<string>;

  /**
   * Upload multiple image files
   * @param files - Array of files to upload
   * @param folder - Target folder/path in storage
   * @returns Promise with array of public URLs
   */
  uploadMultipleImages(files: FileUpload[], folder?: string): Promise<string[]>;

  /**
   * Upload image with auto-generated thumbnail
   * @param file - File to upload
   * @param folder - Target folder/path in storage
   * @returns Promise with both original and thumbnail URLs
   */
  uploadImageWithThumbnail(
    file: FileUpload, 
    folder?: string
  ): Promise<{ original: string; thumbnail: string }>;

  /**
   * Delete a file by object name/key
   * @param objectName - Object name/key in storage
   */
  deleteFile(objectName: string): Promise<void>;

  /**
   * Delete a file by its public URL
   * @param url - Public URL of the file
   */
  deleteFileByUrl(url: string): Promise<void>;

  /**
   * Get public URL for an object
   * @param objectName - Object name/key in storage
   * @returns Public URL
   */
  getFileUrl(objectName: string): Promise<string>;

  /**
   * Extract object name from URL
   * @param url - Public URL
   * @returns Object name/key
   */
  extractObjectNameFromUrl(url: string): string;

  /**
   * Process image (resize, optimize, convert format)
   * @param buffer - Image buffer
   * @param mimeType - Original mime type
   * @returns Processed image buffer
   */
  processImage(buffer: Buffer, mimeType: string): Promise<Buffer>;

  /**
   * Generate thumbnail from image buffer
   * @param buffer - Original image buffer
   * @param width - Thumbnail width
   * @param height - Thumbnail height
   * @returns Thumbnail buffer
   */
  generateThumbnail(buffer: Buffer, width?: number, height?: number): Promise<Buffer>;
}

/**
 * File Upload Configuration Interface
 */
export interface FileUploadConfig {
  allowedMimeTypes?: string[];
  maxFileSize?: number;
  bucketName?: string;
  endpoint?: string;
  port?: string;
  useSSL?: boolean;
  publicEndpoint?: string;
  accessKey?: string;
  secretKey?: string;
  region?: string;
}

/**
 * Upload Result Interface
 */
export interface UploadResult {
  url: string;
  objectName: string;
  size: number;
  mimetype: string;
}

/**
 * Multiple Upload Result Interface
 */
export interface MultipleUploadResult {
  urls: string[];
  count: number;
  failed?: string[];
}

