"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.createError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message, stack } = err;
    console.error('Error occurred:', {
        message,
        statusCode,
        stack: process.env.NODE_ENV === 'development' ? stack : undefined,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    res.status(statusCode).json({
        success: false,
        error: {
            message: message || 'Internal Server Error',
            statusCode,
            ...(process.env.NODE_ENV === 'development' && { stack })
        }
    });
};
exports.errorHandler = errorHandler;
const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};
exports.createError = createError;
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map