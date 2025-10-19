/**
 * File Upload Service Factory
 * Factory pattern to create different storage service implementations
 * Makes it easy to switch between MinIO, AWS S3, Google Cloud, Azure, etc.
 */

import { IFileUploadService, FileUploadConfig } from '../interfaces/IFileUploadService';
import { MinIOFileUploadService } from '../services/minIOFileUploadService';
import AWSS3FileUploadService from '../services/awsS3FileUploadService';
import VNDataS3FileUploadService from '../services/vnDataS3FileUploadService';

/**
 * Storage Provider Types
 */
export enum StorageProvider {
  MINIO = 'minio',
  AWS_S3 = 'aws-s3',
  VNDATA_S3 = 'vndata-s3',
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
   * @param provider - Storage provider type (default: MinIO)
   * @param config - Optional configuration
   * @returns File upload service instance
   */
  static createService(
    provider: StorageProvider = StorageProvider.MINIO,
    config?: FileUploadConfig
  ): IFileUploadService {
    switch (provider) {
      case StorageProvider.MINIO:
        // MinIO is the default - always available
        return new MinIOFileUploadService(config);

      case StorageProvider.AWS_S3:
        // AWS S3 requires @aws-sdk/client-s3 package
        // Check if AWS SDK is available
        try {
          return new AWSS3FileUploadService(config);
        } catch (error) {
          console.warn('AWS S3 SDK not available, falling back to MinIO');
          console.warn('To use AWS S3, install: npm install @aws-sdk/client-s3');
          return new MinIOFileUploadService(config);
        }

      case StorageProvider.VNDATA_S3:
        // VNData S3 - S3-compatible storage from Vietnam
        return new VNDataS3FileUploadService(config);

      case StorageProvider.GOOGLE_CLOUD:
        // Google Cloud Storage not implemented yet
        console.warn('Google Cloud Storage not implemented, using MinIO as default');
        return new MinIOFileUploadService(config);

      case StorageProvider.AZURE_BLOB:
        // Azure Blob Storage not implemented yet
        console.warn('Azure Blob Storage not implemented, using MinIO as default');
        return new MinIOFileUploadService(config);

      case StorageProvider.LOCAL:
        // Local file storage not implemented yet
        console.warn('Local file storage not implemented, using MinIO as default');
        return new MinIOFileUploadService(config);

      default:
        // Unknown provider - fallback to MinIO
        console.warn(`Unknown storage provider: ${provider}, using MinIO as default`);
        return new MinIOFileUploadService(config);
    }
  }

  /**
   * Get singleton instance of file upload service
   * Uses environment variable STORAGE_PROVIDER to determine which service to use
   * Default: MinIO (always available, no external dependencies)
   */
  static getInstance(config?: FileUploadConfig): IFileUploadService {
    // Always default to MinIO if not specified
    const envProvider = (process.env.STORAGE_PROVIDER || 'minio').toLowerCase() as StorageProvider;
    
    // Validate provider and fallback to MinIO if invalid
    const validProviders = Object.values(StorageProvider);
    const provider = validProviders.includes(envProvider) ? envProvider : StorageProvider.MINIO;
    
    // Create new instance if provider changed or instance doesn't exist
    if (!this.instance || this.currentProvider !== provider) {
      this.instance = this.createService(provider, config);
      this.currentProvider = provider;
      
      if (provider === StorageProvider.MINIO) {
        console.log(`✅ File Upload Service initialized with provider: MinIO (default)`);
      } else {
        console.log(`✅ File Upload Service initialized with provider: ${provider}`);
      }
    }

    return this.instance;
  }

  /**
   * Create service from environment variables
   * Useful for dependency injection
   * Always defaults to MinIO if provider not configured
   */
  static fromEnv(): IFileUploadService {
    const provider = (process.env.STORAGE_PROVIDER || 'minio').toLowerCase() as StorageProvider;
    
    // Build config from environment variables
    const config: FileUploadConfig = {
      // Common configs
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'),
    };

    // Add provider-specific configs based on selected provider
    if (provider === StorageProvider.MINIO || !provider) {
      // MinIO configs (default)
      config.bucketName = process.env.MINIO_BUCKET_NAME || 'pgdesign-assets';
      config.endpoint = process.env.MINIO_ENDPOINT || 'localhost';
      config.port = process.env.MINIO_PORT || '9000';
      config.useSSL = process.env.MINIO_USE_SSL === 'true';
      if (process.env.MINIO_PUBLIC_ENDPOINT) {
        config.publicEndpoint = process.env.MINIO_PUBLIC_ENDPOINT;
      }
      config.accessKey = process.env.MINIO_ACCESS_KEY || 'minioadmin';
      config.secretKey = process.env.MINIO_SECRET_KEY || 'minioadmin';
    } else if (provider === StorageProvider.VNDATA_S3) {
      // VNData S3 configs
      config.endpoint = process.env.VNDATA_S3_ENDPOINT || 'https://s3-hcm-r2.s3cloud.vn';
      if (process.env.VNDATA_BUCKET_NAME) config.bucketName = process.env.VNDATA_BUCKET_NAME;
      config.region = process.env.VNDATA_REGION || 'hcm-r2';
      if (process.env.VNDATA_ACCESS_KEY) config.accessKey = process.env.VNDATA_ACCESS_KEY;
      if (process.env.VNDATA_SECRET_KEY) config.secretKey = process.env.VNDATA_SECRET_KEY;
      config.useSSL = true;
    } else if (provider === StorageProvider.AWS_S3) {
      // AWS S3 configs (only if explicitly set)
      if (process.env.AWS_S3_BUCKET) config.bucketName = process.env.AWS_S3_BUCKET;
      config.region = process.env.AWS_REGION || 'us-east-1';
      if (process.env.AWS_ACCESS_KEY_ID) config.accessKey = process.env.AWS_ACCESS_KEY_ID;
      if (process.env.AWS_SECRET_ACCESS_KEY) config.secretKey = process.env.AWS_SECRET_ACCESS_KEY;
    }

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

