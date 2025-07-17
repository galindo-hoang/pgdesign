import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { FileUpload } from '../types/homePageTypes';
import { createError } from './errorHandler';

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();

// File filter for allowed image types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(createError(`Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`, 400) as Error);
  }
};

// Multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    files: 10 // Maximum 10 files
  },
  fileFilter: fileFilter
});

// Convert Express.Multer.File to FileUpload interface
export const convertMulterFileToFileUpload = (file: Express.Multer.File): FileUpload => {
  return {
    fieldname: file.fieldname,
    originalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    buffer: file.buffer,
    size: file.size
  };
};

// Middleware for single file upload
export const uploadSingle = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(createError('File too large', 400));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(createError('Unexpected file field', 400));
          }
        }
        return next(err);
      }
      next();
    });
  };
};

// Middleware for multiple files upload
export const uploadMultiple = (fieldName: string, maxCount: number = 10) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(createError('File too large', 400));
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return next(createError(`Too many files. Maximum ${maxCount} files allowed`, 400));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(createError('Unexpected file field', 400));
          }
        }
        return next(err);
      }
      next();
    });
  };
};

// Middleware for multiple fields with files
export const uploadFields = (fields: Array<{ name: string; maxCount: number }>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.fields(fields)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(createError('File too large', 400));
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return next(createError('Too many files', 400));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(createError('Unexpected file field', 400));
          }
        }
        return next(err);
      }
      next();
    });
  };
};

// Middleware for any file upload
export const uploadAny = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.any()(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(createError('File too large', 400));
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return next(createError('Too many files', 400));
          }
        }
        return next(err);
      }
      next();
    });
  };
};

export default {
  uploadSingle,
  uploadMultiple,
  uploadFields,
  uploadAny,
  convertMulterFileToFileUpload
}; 