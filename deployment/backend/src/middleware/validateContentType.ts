import { Request, Response, NextFunction } from 'express';

export const validateContentType = (req: Request, res: Response, next: NextFunction): void => {
  // Skip validation for GET requests and file uploads
  if (req.method === 'GET' || req.headers['content-type']?.includes('multipart/form-data')) {
    return next();
  }

  // For POST, PUT, PATCH requests with body, ensure content-type is application/json
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
    const contentType = req.headers['content-type'];
    
    if (!contentType || !contentType.includes('application/json')) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Content-Type must be application/json',
          statusCode: 400
        }
      });
      return;
    }
  }

  next();
}; 