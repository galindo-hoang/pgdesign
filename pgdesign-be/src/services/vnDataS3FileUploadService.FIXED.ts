/**
 * VNData S3 File Upload Service Implementation - FIXED VERSION
 * 
 * Fixed Issues:
 * 1. Extension mismatch after image processing
 * 2. Content-Type mismatch with actual data
 * 3. Undefined extension handling
 */

import { Client } from 'minio';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { createError } from '../middleware/errorHandler';
import { FileUpload } from '../types/homePageTypes';
import { IFileUploadService, FileUploadConfig } from '../interfaces/IFileUploadService';

/**
 * Processed image result with format tracking
 */
interface ProcessedImage {
  buffer: Buffer;
  format: string;      // MIME type (e.g., 'image/jpeg')
  extension: string;   // File extension (e.g., 'jpg')
}

export class VNDataS3FileUploadService implements IFileUploadService {
  private config: FileUploadConfig;
  private allowedMimeTypes: string[];
  private maxFileSize: number;
  private s3Client: Client;
  private bucketName: string;

  constructor(config?: FileUploadConfig) {
    this.config = {
      endpoint: process.env.VNDATA_S3_ENDPOINT || 'https://s3-hcm-r2.s3cloud.vn',
      bucketName: process.env.VNDATA_BUCKET_NAME || 'pgdesign-new',
      region: process.env.VNDATA_REGION || 'hcm-r2',
      accessKey: process.env.VNDATA_ACCESS_KEY || '',
      secretKey: process.env.VNDATA_SECRET_KEY || '',
      useSSL: true,
      ...config
    };

    this.bucketName = this.config.bucketName!;

    this.allowedMimeTypes = config?.allowedMimeTypes || [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml'
    ];

    this.maxFileSize = config?.maxFileSize || parseInt(process.env.MAX_FILE_SIZE || '5242880');

    const endpointUrl = this.config.endpoint!.replace('https://', '').replace('http://', '');

    this.s3Client = new Client({
      endPoint: endpointUrl,
      port: 443,
      useSSL: true,
      accessKey: this.config.accessKey!,
      secretKey: this.config.secretKey!,
      region: this.config.region || 'hcm-r2',
    });

    console.log(`✅ VNData S3 Service initialized: ${endpointUrl}/${this.bucketName}`);
  }

  validateFile(file: FileUpload): void {
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw createError(`Invalid file type. Allowed types: ${this.allowedMimeTypes.join(', ')}`, 400);
    }

    if (file.size > this.maxFileSize) {
      throw createError(`File size exceeds maximum limit of ${this.maxFileSize / 1024 / 1024}MB`, 400);
    }
  }

  /**
   * Upload image with proper format tracking
   * FIXED: Now tracks actual format after processing
   */
  async uploadImage(file: FileUpload, folder: string = 'images'): Promise<string> {
    this.validateFile(file);

    // Validate that file has extension
    const originalExtension = file.originalname.split('.').pop()?.toLowerCase();
    if (!originalExtension) {
      throw createError('File must have a valid extension', 400);
    }

    try {
      let processedBuffer: Buffer;
      let actualFormat: string;
      let actualExtension: string;

      // Process image if it's not SVG
      if (file.mimetype !== 'image/svg+xml') {
        const processed = await this.processImage(file.buffer, file.mimetype);
        processedBuffer = processed.buffer;
        actualFormat = processed.format;
        actualExtension = processed.extension;
      } else {
        // SVG - no processing
        processedBuffer = file.buffer;
        actualFormat = file.mimetype;
        actualExtension = 'svg';
      }

      // Create filename with correct extension
      const fileName = `${uuidv4()}.${actualExtension}`;
      const objectName = `${folder}/${fileName}`;

      console.log(`📤 Uploading: ${fileName} (format: ${actualFormat})`);

      // Upload with correct Content-Type
      await this.s3Client.putObject(this.bucketName, objectName, processedBuffer, {
        'Content-Type': actualFormat,
        'Cache-Control': 'max-age=31536000',
      });

      // Return the public URL
      return await this.getFileUrl(objectName);
    } catch (error) {
      console.error('Error uploading file to VNData S3:', error);
      throw createError('Failed to upload file to VNData S3', 500);
    }
  }

  /**
   * Process image with format tracking
   * FIXED: Now returns actual format after processing
   */
  async processImage(buffer: Buffer, mimeType: string): Promise<ProcessedImage> {
    try {
      const sharpInstance = sharp(buffer);
      const metadata = await sharpInstance.metadata();

      // Check if we should convert to WebP
      const shouldConvertToWebP = process.env.CONVERT_TO_WEBP === 'true';
      
      // Case 1: Large image that needs resizing
      if (metadata.width && metadata.width > 1920) {
        console.log(`🔄 Resizing image from ${metadata.width}px to 1920px`);
        
        if (shouldConvertToWebP) {
          // Resize and convert to WebP
          return {
            buffer: await sharpInstance
              .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 85 })
              .toBuffer(),
            format: 'image/webp',
            extension: 'webp'
          };
        } else {
          // Resize and convert to JPEG (most compatible)
          return {
            buffer: await sharpInstance
              .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .jpeg({ quality: 85 })
              .toBuffer(),
            format: 'image/jpeg',
            extension: 'jpg'
          };
        }
      }

      // Case 2: Normal size but convert to WebP if enabled
      if (shouldConvertToWebP) {
        console.log(`🔄 Converting to WebP`);
        return {
          buffer: await sharpInstance
            .webp({ quality: 85 })
            .toBuffer(),
          format: 'image/webp',
          extension: 'webp'
        };
      }

      // Case 3: No processing needed
      // Return original format
      console.log(`✅ No processing needed, keeping original format: ${mimeType}`);
      const extension = this.getExtensionFromMimeType(mimeType);
      return {
        buffer: buffer,
        format: mimeType,
        extension: extension
      };
    } catch (error) {
      console.error('Error processing image:', error);
      // Fallback to original
      const extension = this.getExtensionFromMimeType(mimeType);
      return {
        buffer: buffer,
        format: mimeType,
        extension: extension
      };
    }
  }

  /**
   * Get file extension from MIME type
   * Helper to ensure consistency
   */
  private getExtensionFromMimeType(mimeType: string): string {
    const mimeToExt: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg'
    };
    return mimeToExt[mimeType] || 'jpg';
  }

  async getFileUrl(objectName: string): Promise<string> {
    try {
      const endpoint = this.config.endpoint!;
      return `${endpoint}/${this.bucketName}/${objectName}`;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw createError('Failed to get file URL', 500);
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const objectName = this.extractObjectNameFromUrl(fileUrl);
      await this.s3Client.removeObject(this.bucketName, objectName);
      console.log(`🗑️  Deleted file: ${objectName}`);
    } catch (error) {
      console.error('Error deleting file from VNData S3:', error);
      throw createError('Failed to delete file from VNData S3', 500);
    }
  }

  async uploadFile(file: FileUpload, folder?: string): Promise<string> {
    return this.uploadImage(file, folder);
  }

  private extractObjectNameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const bucketIndex = pathParts.indexOf(this.bucketName);
      
      if (bucketIndex === -1) {
        throw new Error('Invalid URL: bucket not found');
      }
      
      return pathParts.slice(bucketIndex + 1).join('/');
    } catch (error) {
      throw createError('Invalid file URL', 400);
    }
  }

  async getFile(objectName: string): Promise<Buffer> {
    try {
      const dataStream = await this.s3Client.getObject(this.bucketName, objectName);
      const chunks: Buffer[] = [];
      
      return new Promise((resolve, reject) => {
        dataStream.on('data', (chunk) => chunks.push(chunk));
        dataStream.on('end', () => resolve(Buffer.concat(chunks)));
        dataStream.on('error', reject);
      });
    } catch (error) {
      console.error('Error getting file from VNData S3:', error);
      throw createError('Failed to get file from VNData S3', 500);
    }
  }
}

export default VNDataS3FileUploadService;

