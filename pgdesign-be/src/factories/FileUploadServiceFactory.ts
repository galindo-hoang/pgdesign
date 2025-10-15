/**
 * File Upload Service Factory
 * Factory pattern to create different storage service implementations
 * Makes it easy to switch between MinIO, AWS S3, Google Cloud, Azure, etc.
 */

import { IFileUploadService, FileUploadConfig } from '../interfaces/IFileUploadService';
import { MinIOFileUploadService } from '../services/minIOFileUploadService';
import AWSS3FileUploadService from '../services/awsS3FileUploadService';

/**
 * Storage Provider Types
 */
export enum StorageProvider {
  MINIO = 'minio',
  AWS_S3 = 'aws-s3',
  GOOGLE_CLOUD = 'google-cloud',
  AZURE_BLOB = 'azure-blob',
  LOCAL = 'local'
}

/**
 * File Upload Service Factory
 */
export class FileUploadServiceFactory {
  private static instance: IFileUploadService | null = null;
  private static currentProvider: StorageProvider | null = null;

  /**
   * Create a file upload service based on provider type
   * @param provider - Storage provider type
   * @param config - Optional configuration
   * @returns File upload service instance
   */
  static createService(
    provider: StorageProvider = StorageProvider.MINIO,
    config?: FileUploadConfig
  ): IFileUploadService {
    switch (provider) {
      case StorageProvider.MINIO:
        return new MinIOFileUploadService(config);

      case StorageProvider.AWS_S3:
        return new AWSS3FileUploadService(config);

      case StorageProvider.GOOGLE_CLOUD:
        // TODO: Implement Google Cloud Storage service
        throw new Error('Google Cloud Storage not implemented yet');

      case StorageProvider.AZURE_BLOB:
        // TODO: Implement Azure Blob Storage service
        throw new Error('Azure Blob Storage not implemented yet');

      case StorageProvider.LOCAL:
        // TODO: Implement local file storage service
        throw new Error('Local file storage not implemented yet');

      default:
        throw new Error(`Unknown storage provider: ${provider}`);
    }
  }

  /**
   * Get singleton instance of file upload service
   * Uses environment variable STORAGE_PROVIDER to determine which service to use
   * Default: MinIO
   */
  static getInstance(config?: FileUploadConfig): IFileUploadService {
    const envProvider = (process.env.STORAGE_PROVIDER || 'minio').toLowerCase() as StorageProvider;
    
    // Create new instance if provider changed or instance doesn't exist
    if (!this.instance || this.currentProvider !== envProvider) {
      this.instance = this.createService(envProvider, config);
      this.currentProvider = envProvider;
      console.log(`✅ File Upload Service initialized with provider: ${envProvider}`);
    }

    return this.instance;
  }

  /**
   * Create service from environment variables
   * Useful for dependency injection
   */
  static fromEnv(): IFileUploadService {
    const provider = (process.env.STORAGE_PROVIDER || 'minio').toLowerCase() as StorageProvider;
    
    // Build config from environment variables
    const config: FileUploadConfig = {
      // Common configs
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'),
      
      // MinIO configs
      bucketName: process.env.MINIO_BUCKET_NAME || process.env.AWS_S3_BUCKET,
      endpoint: process.env.MINIO_ENDPOINT,
      port: process.env.MINIO_PORT,
      useSSL: process.env.MINIO_USE_SSL === 'true',
      publicEndpoint: process.env.MINIO_PUBLIC_ENDPOINT,
      accessKey: process.env.MINIO_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.MINIO_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY,
      
      // AWS S3 configs
      region: process.env.AWS_REGION,
    };

    return this.createService(provider, config);
  }

  /**
   * Reset singleton instance
   * Useful for testing or switching providers at runtime
   */
  static reset(): void {
    this.instance = null;
    this.currentProvider = null;
  }
}

/**
 * Helper function to get file upload service
 * Uses singleton pattern by default
 */
export const getFileUploadService = (config?: FileUploadConfig): IFileUploadService => {
  return FileUploadServiceFactory.getInstance(config);
};

export default FileUploadServiceFactory;

