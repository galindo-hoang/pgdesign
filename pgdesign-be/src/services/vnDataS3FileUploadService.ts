/**
 * VNData S3 File Upload Service Implementation
 * S3-compatible storage service from VNData Vietnam
 * 
 * Documentation: https://s3-hcm-r2.s3cloud.vn
 * 
 * Environment variables needed:
 * VNDATA_S3_ENDPOINT=https://s3-hcm-r2.s3cloud.vn
 * VNDATA_ACCESS_KEY=KS1KMPXYY4CEPQ5RW5BN
 * VNDATA_SECRET_KEY=ErdmFIm4R8T2WzU9QvUFyPb0Y1HUREdIxTBo8DEK
 * VNDATA_BUCKET_NAME=pgdesign-assets
 * VNDATA_REGION=hcm-r2
 */

import { Client } from 'minio'; // VNData S3 is S3-compatible, use MinIO client
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { createError } from '../middleware/errorHandler';
import { FileUpload } from '../types/homePageTypes';
import { IFileUploadService, FileUploadConfig } from '../interfaces/IFileUploadService';

/**
 * VNData S3 File Upload Service
 * Uses MinIO client since VNData is S3-compatible
 */
export class VNDataS3FileUploadService implements IFileUploadService {
  private config: FileUploadConfig;
  private allowedMimeTypes: string[];
  private maxFileSize: number;
  private s3Client: Client;
  private bucketName: string;

  constructor(config?: FileUploadConfig) {
    this.config = {
      endpoint: process.env.VNDATA_S3_ENDPOINT || 'https://s3-hcm-r2.s3cloud.vn',
      bucketName: process.env.VNDATA_BUCKET_NAME || 'pgdesign-assets',
      region: process.env.VNDATA_REGION || 'hcm-r2',
      accessKey: process.env.VNDATA_ACCESS_KEY || '',
      secretKey: process.env.VNDATA_SECRET_KEY || '',
      useSSL: true, // VNData uses HTTPS
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

    // Parse endpoint URL
    const endpointUrl = this.config.endpoint!.replace('https://', '').replace('http://', '');

    // Initialize S3 Client for VNData
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

  async uploadImage(file: FileUpload, folder: string = 'images'): Promise<string> {
    this.validateFile(file);

    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const objectName = `${folder}/${fileName}`;

    try {
      let processedBuffer = file.buffer;
      let actualContentType = file.mimetype;

      // Process image if it's not SVG
      if (file.mimetype !== 'image/svg+xml') {
        const processed = await this.processImage(file.buffer, file.mimetype);
        processedBuffer = processed.buffer;
        actualContentType = processed.contentType;
      }

      console.log(`📤 Uploading: ${fileName}`);
      console.log(`   Original Content-Type: ${file.mimetype}`);
      console.log(`   Actual Content-Type: ${actualContentType}`);
      console.log(`   Match: ${file.mimetype === actualContentType ? '✅' : '❌'}`);

      // Upload to VNData S3 with CORRECT Content-Type
      await this.s3Client.putObject(this.bucketName, objectName, processedBuffer, {
        'Content-Type': actualContentType,
        'Cache-Control': 'max-age=31536000',
      });

      // Return the public URL
      return await this.getFileUrl(objectName);
    } catch (error) {
      console.error('Error uploading file to VNData S3:', error);
      throw createError('Failed to upload file to VNData S3', 500);
    }
  }

  async processImage(buffer: Buffer, mimeType: string): Promise<{buffer: Buffer, contentType: string}> {
    try {
      const sharpInstance = sharp(buffer);
      const metadata = await sharpInstance.metadata();

      // Resize if image is too large (but keep original format)
      if (metadata.width && metadata.width > 1920) {
        console.log(`🔄 Resizing image from ${metadata.width}px to 1920px (keeping ${mimeType} format)`);
        
        // Resize based on original format
        let resized = sharpInstance.resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });

        // Keep original format WITHOUT compression
        switch (mimeType) {
          case 'image/jpeg':
          case 'image/jpg':
            return {
              buffer: await resized.jpeg({ quality: 100 }).toBuffer(),
              contentType: 'image/jpeg'
            };
          case 'image/png':
            return {
              buffer: await resized.png({ compressionLevel: 0 }).toBuffer(),
              contentType: 'image/png'
            };
          case 'image/webp':
            return {
              buffer: await resized.webp({ quality: 100 }).toBuffer(),
              contentType: 'image/webp'
            };
          case 'image/gif':
            return {
              buffer: await resized.toBuffer(),
              contentType: 'image/gif'
            };
          default:
            return {
              buffer: await resized.toBuffer(),
              contentType: mimeType
            };
        }
      }

      // No resize needed, return original buffer
      console.log(`✅ Image size OK (${metadata.width}px), keeping original format: ${mimeType}`);
      return {
        buffer: buffer,
        contentType: mimeType
      };
    } catch (error) {
      console.error('Error processing image:', error);
      return {
        buffer: buffer,
        contentType: mimeType
      };
    }
  }

  async getFileUrl(objectName: string): Promise<string> {
    try {
      // VNData S3 public URL format
      const endpoint = this.config.endpoint!;
      return `${endpoint}/${this.bucketName}/${objectName}`;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw createError('Failed to get file URL', 500);
    }
  }

  async deleteFile(objectName: string): Promise<void> {
    try {
      await this.s3Client.removeObject(this.bucketName, objectName);
    } catch (error) {
      console.error('Error deleting file from VNData S3:', error);
      throw createError('Failed to delete file', 500);
    }
  }

  async uploadMultipleImages(files: FileUpload[], folder: string = 'images'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  }

  extractObjectNameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      // Remove leading slash and bucket name
      const parts = pathname.split('/');
      if (parts[1] === this.bucketName) {
        return parts.slice(2).join('/');
      }
      return pathname.substring(1);
    } catch (error) {
      console.error('Error extracting object name from URL:', error);
      return '';
    }
  }

  async deleteFileByUrl(url: string): Promise<void> {
    const objectName = this.extractObjectNameFromUrl(url);
    if (objectName) {
      await this.deleteFile(objectName);
    }
  }

  async generateThumbnail(buffer: Buffer, width: number = 300, height: number = 300): Promise<Buffer> {
    try {
      return await sharp(buffer)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 80 })
        .toBuffer();
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      throw createError('Failed to generate thumbnail', 500);
    }
  }

  async uploadImageWithThumbnail(
    file: FileUpload, 
    folder: string = 'images'
  ): Promise<{ original: string; thumbnail: string }> {
    this.validateFile(file);

    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const thumbnailName = `${uuidv4()}_thumb.png`;
    
    const originalObjectName = `${folder}/${fileName}`;
    const thumbnailObjectName = `${folder}/thumbnails/${thumbnailName}`;

    try {
      let processedBuffer = file.buffer;
      
      // Process main image
      let actualContentType = file.mimetype;
      if (file.mimetype !== 'image/svg+xml') {
        const processed = await this.processImage(file.buffer, file.mimetype);
        processedBuffer = processed.buffer;
        actualContentType = processed.contentType;
      }

      // Generate thumbnail
      const thumbnailBuffer = await this.generateThumbnail(file.buffer);

      // Upload both files in parallel
      const [originalUrl, thumbnailUrl] = await Promise.all([
        this.uploadProcessedImage(originalObjectName, processedBuffer, actualContentType),
        this.uploadProcessedImage(thumbnailObjectName, thumbnailBuffer, 'image/jpeg')
      ]);

      return {
        original: originalUrl,
        thumbnail: thumbnailUrl
      };
    } catch (error) {
      console.error('Error uploading image with thumbnail to VNData S3:', error);
      throw createError('Failed to upload image with thumbnail', 500);
    }
  }

  private async uploadProcessedImage(objectName: string, buffer: Buffer, mimeType: string): Promise<string> {
    await this.s3Client.putObject(this.bucketName, objectName, buffer, {
      'Content-Type': mimeType,
      'Cache-Control': 'max-age=31536000',
    });
    return await this.getFileUrl(objectName);
  }
}

export default VNDataS3FileUploadService;

