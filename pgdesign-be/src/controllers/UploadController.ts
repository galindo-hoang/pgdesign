import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { IFileUploadService } from '../interfaces/IFileUploadService';
import { getFileUploadService } from '../factories/FileUploadServiceFactory';
import { convertMulterFileToFileUpload } from '../middleware/uploadMiddleware';

/**
 * Upload Controller
 * Handles file upload endpoints
 * Uses dependency injection for storage service
 */
export class UploadController {
  private uploadService: IFileUploadService;

  constructor(uploadService?: IFileUploadService) {
    // Use injected service or get from factory
    this.uploadService = uploadService || getFileUploadService();
  }
  
  // Upload single image
  uploadSingleImage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      throw createError('No file uploaded', 400);
    }

    const fileUpload = convertMulterFileToFileUpload(req.file);
    const folder = req.body.folder || 'images';
    
    const imageUrl = await this.uploadService.uploadImage(fileUpload, folder);
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });

  // Upload multiple images
  uploadMultipleImages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw createError('No files uploaded', 400);
    }

    const files = req.files as Express.Multer.File[];
    const fileUploads = files.map(convertMulterFileToFileUpload);
    const folder = req.body.folder || 'images';
    
    const imageUrls = await this.uploadService.uploadMultipleImages(fileUploads, folder);
    
    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        urls: imageUrls,
        count: files.length,
        files: files.map(file => ({
          filename: file.originalname,
          size: file.size,
          mimetype: file.mimetype
        }))
      }
    });
  });

  // Upload image with thumbnail
  uploadImageWithThumbnail = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      throw createError('No file uploaded', 400);
    }

    const fileUpload = convertMulterFileToFileUpload(req.file);
    const folder = req.body.folder || 'images';
    
    const result = await this.uploadService.uploadImageWithThumbnail(fileUpload, folder);
    
    res.json({
      success: true,
      message: 'Image with thumbnail uploaded successfully',
      data: {
        original: result.original,
        thumbnail: result.thumbnail,
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });

  // Delete file by URL
  deleteFile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;
    
    if (!url) {
      throw createError('File URL is required', 400);
    }

    await this.uploadService.deleteFileByUrl(url);
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  });

  // Upload project images
  uploadProjectImages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw createError('No files uploaded', 400);
    }

    const files = req.files as Express.Multer.File[];
    const fileUploads = files.map(convertMulterFileToFileUpload);
    const projectId = req.body.projectId || 'general';
    
    const imageUrls = await this.uploadService.uploadMultipleImages(fileUploads, `projects/${projectId}`);
    
    res.json({
      success: true,
      message: 'Project images uploaded successfully',
      data: {
        urls: imageUrls,
        count: files.length,
        projectId: projectId
      }
    });
  });

  // Upload ProjectDetail thumbnail
  uploadProjectDetailThumbnail = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      throw createError('No file uploaded', 400);
    }

    const fileUpload = convertMulterFileToFileUpload(req.file);
    const projectId = req.body.projectId || 'general';
    
    // Upload with thumbnail generation
    const result = await this.uploadService.uploadImageWithThumbnail(fileUpload, `project-details/${projectId}`);
    
    res.json({
      success: true,
      message: 'Thumbnail uploaded successfully',
      data: {
        thumbnailUrl: result.thumbnail,
        originalUrl: result.original,
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  });

  // Upload ProjectDetail images (gallery)
  uploadProjectDetailImages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw createError('No files uploaded', 400);
    }

    const files = req.files as Express.Multer.File[];
    const fileUploads = files.map(convertMulterFileToFileUpload);
    const projectId = req.body.projectId || 'general';
    
    const imageUrls = await this.uploadService.uploadMultipleImages(fileUploads, `project-details/${projectId}`);
    
    res.json({
      success: true,
      message: 'Project detail images uploaded successfully',
      data: {
        urls: imageUrls,
        count: files.length,
        projectId: projectId
      }
    });
  });

}

export default new UploadController(); 