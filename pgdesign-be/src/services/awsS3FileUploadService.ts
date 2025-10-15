/**
 * AWS S3 File Upload Service Implementation
 * Example implementation of IFileUploadService for AWS S3
 * 
 * To use this, install AWS SDK:
 * npm install @aws-sdk/client-s3
 * 
 * And configure environment variables:
 * AWS_REGION=us-east-1
 * AWS_ACCESS_KEY_ID=your-access-key
 * AWS_SECRET_ACCESS_KEY=your-secret-key
 * AWS_S3_BUCKET=your-bucket-name
 */

import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { createError } from '../middleware/errorHandler';
import { FileUpload } from '../types/homePageTypes';
import { IFileUploadService, FileUploadConfig } from '../interfaces/IFileUploadService';

// Uncomment when @aws-sdk/client-s3 is installed:
// import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

/**
 * AWS S3 File Upload Service
 * Implements IFileUploadService for AWS S3 storage
 */
export class AWSS3FileUploadService implements IFileUploadService {
  private config: FileUploadConfig;
  private allowedMimeTypes: string[];
  private maxFileSize: number;
  // private s3Client: S3Client; // Uncomment when AWS SDK is installed

  constructor(config?: FileUploadConfig) {
    this.config = {
      bucketName: process.env.AWS_S3_BUCKET || 'default-bucket',
      region: process.env.AWS_REGION || 'us-east-1',
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
      ...config
    };

    this.allowedMimeTypes = config?.allowedMimeTypes || [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml'
    ];

    this.maxFileSize = config?.maxFileSize || parseInt(process.env.MAX_FILE_SIZE || '5242880');

    // Initialize S3 Client (uncomment when AWS SDK is installed)
    /*
    this.s3Client = new S3Client({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKey!,
        secretAccessKey: this.config.secretKey!,
      },
    });
    */
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

      // Process image if it's not SVG
      if (file.mimetype !== 'image/svg+xml') {
        processedBuffer = await this.processImage(file.buffer, file.mimetype);
      }

      // Upload to AWS S3 (uncomment when AWS SDK is installed)
      /*
      const command = new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: objectName,
        Body: processedBuffer,
        ContentType: file.mimetype,
        CacheControl: 'max-age=31536000', // 1 year
        ACL: 'public-read', // Make file publicly accessible
      });

      await this.s3Client.send(command);
      */

      // Return the public URL
      return await this.getFileUrl(objectName);
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw createError('Failed to upload file', 500);
    }
  }

  async processImage(buffer: Buffer, mimeType: string): Promise<Buffer> {
    try {
      const sharpInstance = sharp(buffer);
      const metadata = await sharpInstance.metadata();

      // Resize if image is too large
      if (metadata.width && metadata.width > 1920) {
        return await sharpInstance
          .resize(1920, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: 85 })
          .toBuffer();
      }

      // Convert to WebP for better compression (optional)
      if (process.env.CONVERT_TO_WEBP === 'true') {
        return await sharpInstance
          .webp({ quality: 85 })
          .toBuffer();
      }

      return buffer;
    } catch (error) {
      console.error('Error processing image:', error);
      return buffer;
    }
  }

  async getFileUrl(objectName: string): Promise<string> {
    try {
      // AWS S3 public URL format
      const region = this.config.region;
      const bucket = this.config.bucketName;
      
      // Standard S3 URL format
      return `https://${bucket}.s3.${region}.amazonaws.com/${objectName}`;
      
      // Alternative: CloudFront URL if you have CDN setup
      // return `https://your-cloudfront-domain.cloudfront.net/${objectName}`;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw createError('Failed to get file URL', 500);
    }
  }

  async deleteFile(objectName: string): Promise<void> {
    try {
      // Delete from AWS S3 (uncomment when AWS SDK is installed)
      /*
      const command = new DeleteObjectCommand({
        Bucket: this.config.bucketName,
        Key: objectName,
      });

      await this.s3Client.send(command);
      */
      console.log(`Would delete: ${objectName} from S3`);
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw createError('Failed to delete file', 500);
    }
  }

  async uploadMultipleImages(files: FileUpload[], folder: string = 'images'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  }

  extractObjectNameFromUrl(url: string): string {
    try {
      // Extract object key from AWS S3 URL
      // Format: https://bucket-name.s3.region.amazonaws.com/folder/file.jpg
      const urlObj = new URL(url);
      return urlObj.pathname.substring(1); // Remove leading '/'
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
      if (file.mimetype !== 'image/svg+xml') {
        processedBuffer = await this.processImage(file.buffer, file.mimetype);
      }

      // Generate thumbnail
      const thumbnailBuffer = await this.generateThumbnail(file.buffer);

      // Upload both files in parallel
      const [originalUrl, thumbnailUrl] = await Promise.all([
        this.uploadProcessedImage(originalObjectName, processedBuffer, file.mimetype),
        this.uploadProcessedImage(thumbnailObjectName, thumbnailBuffer, 'image/jpeg')
      ]);

      return {
        original: originalUrl,
        thumbnail: thumbnailUrl
      };
    } catch (error) {
      console.error('Error uploading image with thumbnail:', error);
      throw createError('Failed to upload image with thumbnail', 500);
    }
  }

  private async uploadProcessedImage(objectName: string, buffer: Buffer, mimeType: string): Promise<string> {
    // Upload to S3 (uncomment when AWS SDK is installed)
    /*
    const command = new PutObjectCommand({
      Bucket: this.config.bucketName,
      Key: objectName,
      Body: buffer,
      ContentType: mimeType,
      CacheControl: 'max-age=31536000',
      ACL: 'public-read',
    });

    await this.s3Client.send(command);
    */
    
    return await this.getFileUrl(objectName);
  }
}

export default AWSS3FileUploadService;

