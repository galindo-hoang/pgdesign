import { Router } from 'express';
import uploadController from '../controllers/UploadController';
import { uploadSingle, uploadMultiple } from '../middleware/uploadMiddleware';

const router: Router = Router();

// Single image upload
router.post('/image', uploadSingle('image'), uploadController.uploadSingleImage);

// Multiple images upload
router.post('/images', uploadMultiple('images', 10), uploadController.uploadMultipleImages);

// Image with thumbnail upload
router.post('/image-with-thumbnail', uploadSingle('image'), uploadController.uploadImageWithThumbnail);

// Specific purpose uploads
router.post('/project-images', uploadMultiple('projectImages', 10), uploadController.uploadProjectImages);
router.post('/icons', uploadMultiple('icons', 20), uploadController.uploadIcons);

// File management
router.delete('/file', uploadController.deleteFile);

export default router; 