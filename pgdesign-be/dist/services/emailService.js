"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmailConnection = exports.sendConfirmationEmail = exports.sendConsultationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const EMAIL_CONFIG = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
};
const transporter = nodemailer_1.default.createTransport(EMAIL_CONFIG);
const createConsultationEmailTemplate = (formData) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #557256; text-align: center; border-bottom: 2px solid #557256; padding-bottom: 10px;">
        YÊU CẦU TƯ VẤN THIẾT KẾ - PG DESIGN
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Thông tin khách hàng:</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #557256; width: 30%;">Họ và tên:</td>
            <td style="padding: 8px 0;">${formData.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #557256;">Số điện thoại:</td>
            <td style="padding: 8px 0;">${formData.phoneNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #557256;">Email:</td>
            <td style="padding: 8px 0;">${formData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #557256;">Địa chỉ:</td>
            <td style="padding: 8px 0;">${formData.address || 'Không có thông tin'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #557256;">Loại công trình:</td>
            <td style="padding: 8px 0;">${formData.projectType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #557256;">Mức đầu tư:</td>
            <td style="padding: 8px 0;">${formData.investmentLevel}</td>
          </tr>
        </table>
        
        ${formData.specificRequest ? `
          <div style="margin-top: 20px;">
            <h4 style="color: #557256; margin-bottom: 10px;">Yêu cầu cụ thể:</h4>
            <p style="background-color: white; padding: 15px; border-left: 4px solid #557256; margin: 0;">
              ${formData.specificRequest}
            </p>
          </div>
        ` : ''}
      </div>
      
      <div style="background-color: #557256; color: white; padding: 15px; border-radius: 8px; text-align: center;">
        <p style="margin: 0;">Vui lòng liên hệ với khách hàng trong thời gian sớm nhất để tư vấn chi tiết.</p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        <p>Email này được gửi tự động từ hệ thống website PG Design</p>
        <p>Thời gian gửi: ${new Date().toLocaleString('vi-VN')}</p>
      </div>
    </div>
  `;
};
const sendConsultationEmail = async (formData) => {
    try {
        const mailOptions = {
            from: `PG Design Website <${EMAIL_CONFIG.auth.user}>`,
            to: process.env.CONSULTATION_EMAIL || 'info@pgdesign.vn',
            subject: `Yêu cầu tư vấn thiết kế từ ${formData.fullName}`,
            html: createConsultationEmailTemplate(formData)
        };
        await transporter.sendMail(mailOptions);
        console.log('Consultation email sent successfully');
    }
    catch (error) {
        console.error('Error sending consultation email:', error);
        throw new Error('Failed to send consultation email');
    }
};
exports.sendConsultationEmail = sendConsultationEmail;
const sendConfirmationEmail = async (formData) => {
    try {
        const confirmationTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #557256; text-align: center;">Cảm ơn bạn đã liên hệ với PG Design!</h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>Xin chào <strong>${formData.fullName}</strong>,</p>
          
          <p>Chúng tôi đã nhận được yêu cầu tư vấn thiết kế của bạn. Đội ngũ chuyên gia của PG Design sẽ liên hệ với bạn trong thời gian sớm nhất để tư vấn chi tiết về dự án.</p>
          
          <div style="background-color: white; padding: 15px; border-left: 4px solid #557256; margin: 20px 0;">
            <p><strong>Thông tin yêu cầu của bạn:</strong></p>
            <ul style="margin: 10px 0;">
              <li>Loại công trình: ${formData.projectType}</li>
              <li>Mức đầu tư: ${formData.investmentLevel}</li>
              <li>Số điện thoại: ${formData.phoneNumber}</li>
              ${formData.address ? `<li>Địa chỉ: ${formData.address}</li>` : ''}
            </ul>
          </div>
          
          <p>Nếu bạn cần hỗ trợ gấp, vui lòng liên hệ trực tiếp:</p>
          <ul>
            <li>Hotline: 0978 208 351 - 0822 059 091</li>
            <li>Email: info@pgdesign.vn</li>
          </ul>
        </div>
        
        <div style="text-align: center; color: #666; font-size: 12px;">
          <p>PG Design - Kiến tạo không gian</p>
          <p>Địa chỉ: số 77, Đường D05, KĐT Vạn Phúc, P. Hiệp Bình Phước, TP. Thủ Đức</p>
        </div>
      </div>
    `;
        const mailOptions = {
            from: `PG Design <${EMAIL_CONFIG.auth.user}>`,
            to: formData.email,
            subject: 'Xác nhận yêu cầu tư vấn thiết kế - PG Design',
            html: confirmationTemplate
        };
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully');
    }
    catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};
exports.sendConfirmationEmail = sendConfirmationEmail;
const testEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log('Email service is ready');
        return true;
    }
    catch (error) {
        console.error('Email service error:', error);
        return false;
    }
};
exports.testEmailConnection = testEmailConnection;
//# sourceMappingURL=emailService.js.map