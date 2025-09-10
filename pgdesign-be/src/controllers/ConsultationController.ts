// src/controllers/ConsultationController.ts
import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { sendConsultationEmail, sendConfirmationEmail } from '../services/emailService';
import { ConsultationFormSubmission, ValidationError, ConsultationResponse } from '../types/consultationTypes';

export class ConsultationController {
  // Submit consultation form
  public submitConsultationForm = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const formData: ConsultationFormSubmission = req.body;

    // Validate form data
    const validationErrors = this.validateConsultationForm(formData);
    if (validationErrors.length > 0) {
      const errorMessage = validationErrors.map(error => `${error.field}: ${error.message}`).join(', ');
      throw createError(`Validation errors: ${errorMessage}`, 400);
    }

    try {
      // Send consultation email to admin
      await sendConsultationEmail(formData);
      
      // Send confirmation email to customer
      await sendConfirmationEmail(formData);

      const response: ConsultationResponse = {
        success: true,
        message: 'Yêu cầu tư vấn đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
        data: {
          submittedAt: new Date().toISOString(),
          customerName: formData.fullName,
          projectType: formData.projectType
        }
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error processing consultation form:', error);
      throw createError('Có lỗi xảy ra khi gửi yêu cầu tư vấn. Vui lòng thử lại sau.', 500);
    }
  });

  // Get email service status
  public getEmailServiceStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      throw createError('Email service is not available', 500);
    }
  });

  // Private validation methods
  private validateConsultationForm(formData: ConsultationFormSubmission): ValidationError[] {
    const errors: ValidationError[] = [];

    // Required field validations
    if (!formData.fullName || formData.fullName.trim().length === 0) {
      errors.push({ field: 'fullName', message: 'Họ và tên không được để trống' });
    }

    if (!formData.phoneNumber || formData.phoneNumber.trim().length === 0) {
      errors.push({ field: 'phoneNumber', message: 'Số điện thoại không được để trống' });
    } else if (!this.isValidVietnamesePhoneNumber(formData.phoneNumber)) {
      errors.push({ field: 'phoneNumber', message: 'Số điện thoại không hợp lệ' });
    }

    if (!formData.email || formData.email.trim().length === 0) {
      errors.push({ field: 'email', message: 'Email không được để trống' });
    } else if (!this.isValidEmail(formData.email)) {
      errors.push({ field: 'email', message: 'Email không hợp lệ' });
    }

    // Required: Address validation
    if (!formData.address || formData.address.trim().length === 0) {
      errors.push({ field: 'address', message: 'Địa chỉ không được để trống' });
    }

    if (!formData.projectType || formData.projectType.trim().length === 0) {
      errors.push({ field: 'projectType', message: 'Loại công trình không được để trống' });
    } else if (formData.projectType === '-- Chọn loại công trình --') {
      errors.push({ field: 'projectType', message: 'Vui lòng chọn loại công trình' });
    }

    // Required: Investment level validation
    if (!formData.investmentLevel || formData.investmentLevel.trim().length === 0) {
      errors.push({ field: 'investmentLevel', message: 'Mức đầu tư không được để trống' });
    }

    // Optional field validations
    if (formData.specificRequest && formData.specificRequest.length > 1000) {
      errors.push({ field: 'specificRequest', message: 'Yêu cầu cụ thể không được vượt quá 1000 ký tự' });
    }

    return errors;
  }

  private isValidVietnamesePhoneNumber(phoneNumber: string): boolean {
    // Vietnamese phone number regex
    const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$|^02\d{9}$/;
    return vnPhoneRegex.test(phoneNumber.trim());
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }
}

export default new ConsultationController(); 