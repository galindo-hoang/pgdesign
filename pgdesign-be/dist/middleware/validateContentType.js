"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContentType = void 0;
const validateContentType = (req, res, next) => {
    if (req.method === 'GET' || req.headers['content-type']?.includes('multipart/form-data')) {
        return next();
    }
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
exports.validateContentType = validateContentType;
//# sourceMappingURL=validateContentType.js.map