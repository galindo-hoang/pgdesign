// src/controllers/ConsultationController.ts
import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { sendConsultationEmail, sendConfirmationEmail } from '../services/emailService';
import { ConsultationFormSubmission, ValidationError, ConsultationResponse, ConsultationRequestQuery, ConsultationRequestUpdate } from '../types/consultationTypes';
import consultationRequestModel from '../models/ConsultationRequestModel';

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
      // Save consultation request to database
      const consultationRequest = await consultationRequestModel.createConsultationRequest({
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        project_type: formData.projectType,
        investment_level: formData.investmentLevel,
        specific_request: formData.specificRequest || '',
        status: 'pending'
      });

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
          projectType: formData.projectType,
          ...(consultationRequest.id && { requestId: consultationRequest.id })
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

  // Get all consultation requests with pagination and filters
  public getConsultationRequests = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const query: ConsultationRequestQuery = req.query;
      const result = await consultationRequestModel.getConsultationRequests(query);

      res.json({
        success: true,
        message: 'Consultation requests retrieved successfully',
        data: result
      });
    } catch (error) {
      console.error('Error fetching consultation requests:', error);
      throw createError('Failed to fetch consultation requests', 500);
    }
  });

  // Get single consultation request by ID
  public getConsultationRequestById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const requestId = parseInt(id || '0');

      if (!requestId || isNaN(requestId)) {
        throw createError('Invalid request ID', 400);
      }

      const request = await consultationRequestModel.getConsultationRequestById(requestId);

      if (!request) {
        throw createError('Consultation request not found', 404);
      }

      res.json({
        success: true,
        message: 'Consultation request retrieved successfully',
        data: request
      });
    } catch (error) {
      console.error('Error fetching consultation request:', error);
      throw error;
    }
  });

  // Update consultation request
  public updateConsultationRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const requestId = parseInt(id || '0');
      const updateData: ConsultationRequestUpdate = req.body;

      if (!requestId || isNaN(requestId)) {
        throw createError('Invalid request ID', 400);
      }

      const updatedRequest = await consultationRequestModel.updateConsultationRequest(requestId, updateData);

      if (!updatedRequest) {
        throw createError('Consultation request not found', 404);
      }

      res.json({
        success: true,
        message: 'Consultation request updated successfully',
        data: updatedRequest
      });
    } catch (error) {
      console.error('Error updating consultation request:', error);
      throw error;
    }
  });

  // Update consultation request status
  public updateConsultationRequestStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;
      const requestId = parseInt(id || '0');

      if (!requestId || isNaN(requestId)) {
        throw createError('Invalid request ID', 400);
      }

      if (!status) {
        throw createError('Status is required', 400);
      }

      const validStatuses = ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw createError('Invalid status', 400);
      }

      const updatedRequest = await consultationRequestModel.updateStatus(requestId, status, adminNotes);

      if (!updatedRequest) {
        throw createError('Consultation request not found', 404);
      }

      res.json({
        success: true,
        message: 'Consultation request status updated successfully',
        data: updatedRequest
      });
    } catch (error) {
      console.error('Error updating consultation request status:', error);
      throw error;
    }
  });

  // Delete consultation request
  public deleteConsultationRequest = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const requestId = parseInt(id || '0');

      if (!requestId || isNaN(requestId)) {
        throw createError('Invalid request ID', 400);
      }

      const deleted = await consultationRequestModel.deleteConsultationRequest(requestId);

      if (!deleted) {
        throw createError('Consultation request not found', 404);
      }

      res.json({
        success: true,
        message: 'Consultation request deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting consultation request:', error);
      throw error;
    }
  });

  // Get consultation request statistics
  public getConsultationRequestStatistics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await consultationRequestModel.getStatistics();

      res.json({
        success: true,
        message: 'Consultation request statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      console.error('Error fetching consultation request statistics:', error);
      throw createError('Failed to fetch consultation request statistics', 500);
    }
  });

  // Get recent consultation requests
  public getRecentConsultationRequests = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const requests = await consultationRequestModel.getRecentRequests(limit);

      res.json({
        success: true,
        message: 'Recent consultation requests retrieved successfully',
        data: requests
      });
    } catch (error) {
      console.error('Error fetching recent consultation requests:', error);
      throw createError('Failed to fetch recent consultation requests', 500);
    }
  });
}

export default new ConsultationController(); 