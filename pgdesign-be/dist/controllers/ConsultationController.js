"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationController = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const emailService_1 = require("../services/emailService");
class ConsultationController {
    constructor() {
        this.submitConsultationForm = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const formData = req.body;
            const validationErrors = this.validateConsultationForm(formData);
            if (validationErrors.length > 0) {
                const errorMessage = validationErrors.map(error => `${error.field}: ${error.message}`).join(', ');
                throw (0, errorHandler_1.createError)(`Validation errors: ${errorMessage}`, 400);
            }
            try {
                await (0, emailService_1.sendConsultationEmail)(formData);
                await (0, emailService_1.sendConfirmationEmail)(formData);
                const response = {
                    success: true,
                    message: 'Yêu cầu tư vấn đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
                    data: {
                        submittedAt: new Date().toISOString(),
                        customerName: formData.fullName,
                        projectType: formData.projectType
                    }
                };
                res.status(200).json(response);
            }
            catch (error) {
                console.error('Error processing consultation form:', error);
                throw (0, errorHandler_1.createError)('Có lỗi xảy ra khi gửi yêu cầu tư vấn. Vui lòng thử lại sau.', 500);
            }
        });
        this.getEmailServiceStatus = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            try {
                const response = {
                    success: true,
                    message: 'Email service is available',
                    data: {
                        emailConfigured: !!process.env.EMAIL_USER,
                        timestamp: new Date().toISOString()
                    }
                };
                res.json(response);
            }
            catch (error) {
                throw (0, errorHandler_1.createError)('Email service is not available', 500);
            }
        });
    }
    validateConsultationForm(formData) {
        const errors = [];
        if (!formData.fullName || formData.fullName.trim().length === 0) {
            errors.push({ field: 'fullName', message: 'Họ và tên không được để trống' });
        }
        else if (formData.fullName.trim().length < 2) {
            errors.push({ field: 'fullName', message: 'Họ và tên phải có ít nhất 2 ký tự' });
        }
        if (!formData.phoneNumber || formData.phoneNumber.trim().length === 0) {
            errors.push({ field: 'phoneNumber', message: 'Số điện thoại không được để trống' });
        }
        else if (!this.isValidPhoneNumber(formData.phoneNumber)) {
            errors.push({ field: 'phoneNumber', message: 'Số điện thoại không hợp lệ' });
        }
        if (!formData.email || formData.email.trim().length === 0) {
            errors.push({ field: 'email', message: 'Email không được để trống' });
        }
        else if (!this.isValidEmail(formData.email)) {
            errors.push({ field: 'email', message: 'Email không hợp lệ' });
        }
        if (!formData.address || formData.address.trim().length === 0) {
            errors.push({ field: 'address', message: 'Địa chỉ không được để trống' });
        }
        if (!formData.projectType || formData.projectType.trim().length === 0) {
            errors.push({ field: 'projectType', message: 'Loại công trình không được để trống' });
        }
        else if (formData.projectType === '-- Chọn loại công trình --') {
            errors.push({ field: 'projectType', message: 'Vui lòng chọn loại công trình' });
        }
        if (!formData.investmentLevel || formData.investmentLevel.trim().length === 0) {
            errors.push({ field: 'investmentLevel', message: 'Mức đầu tư không được để trống' });
        }
        return errors;
    }
    isValidPhoneNumber(phoneNumber) {
        const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$|^02\d{9}$/;
        return vnPhoneRegex.test(phoneNumber.trim());
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
}
exports.ConsultationController = ConsultationController;
//# sourceMappingURL=ConsultationController.js.map