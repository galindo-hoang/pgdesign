import minioClient, { bucketName } from '../config/minio';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { createError } from '../middleware/errorHandler';
import { FileUpload } from '../types/homePageTypes';

export class FileUploadService {
  private allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  private maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '5242880'); // 5MB default

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

      // Upload to MinIO
      await minioClient.putObject(bucketName, objectName, processedBuffer, {
        'Content-Type': file.mimetype,
        'Cache-Control': 'max-age=31536000' // 1 year
      });

      // Return the URL
      return await this.getFileUrl(objectName);
    } catch (error) {
      console.error('Error uploading file:', error);
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
      return buffer; // Return original buffer if processing fails
    }
  }

  async getFileUrl(objectName: string): Promise<string> {
    try {
      // Generate public URL instead of presigned URL
      const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
      const port = process.env.MINIO_PORT || '9000';
      const useSSL = process.env.MINIO_USE_SSL === 'true';
      const protocol = useSSL ? 'https' : 'http';
      
      // For production, use the public endpoint
      const publicEndpoint = process.env.MINIO_PUBLIC_ENDPOINT || `${endpoint}:${port}`;
      
      return `${protocol}://${publicEndpoint}/${bucketName}/${objectName}`;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw createError('Failed to get file URL', 500);
    }
  }

  async deleteFile(objectName: string): Promise<void> {
    try {
      await minioClient.removeObject(bucketName, objectName);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw createError('Failed to delete file', 500);
    }
  }

  async uploadMultipleImages(files: FileUpload[], folder: string = 'images'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  }

  extractObjectNameFromUrl(url: string): string {
    try {
      const urlParts = url.split('/');
      const bucketIndex = urlParts.indexOf(bucketName);
      if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
        return urlParts.slice(bucketIndex + 1).join('/');
      }
      return '';
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

  generateThumbnail = async (buffer: Buffer, width: number = 300, height: number = 300): Promise<Buffer> => {
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
  };

  async uploadImageWithThumbnail(file: FileUpload, folder: string = 'images'): Promise<{ original: string, thumbnail: string }> {
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
    await minioClient.putObject(bucketName, objectName, buffer, {
      'Content-Type': mimeType,
      'Cache-Control': 'max-age=31536000'
    });
    return await this.getFileUrl(objectName);
  }
}

export default new FileUploadService(); 