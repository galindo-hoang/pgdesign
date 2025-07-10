# Consultation API Documentation

## Overview
This API handles consultation form submissions from the PG Design website, sending emails to both administrators and customers.

## Features
- Form validation with Vietnamese phone number support
- Email notifications to administrators
- Confirmation emails to customers
- Professional HTML email templates
- Error handling and logging

## API Endpoints

### Base URL
```
http://localhost:3002/api/v1/consultation
```

### 1. Submit Consultation Form

**POST** `/submit`

#### Request Body
```json
{
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0901234567",
  "email": "customer@example.com",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "projectType": "Nhà Phố - Căn hộ",
  "investmentLevel": "500 Triệu",
  "specificRequest": "Tôi muốn thiết kế nhà phố 3 tầng với phong cách hiện đại"
}
```

#### Validation Rules
- **fullName**: Required, non-empty string
- **phoneNumber**: Required, valid Vietnamese phone number format
- **email**: Required, valid email format
- **address**: Required, minimum 10 characters
- **projectType**: Required, cannot be "-- Chọn loại công trình --"
- **investmentLevel**: Required, non-empty string
- **specificRequest**: Optional, maximum 1000 characters

#### Success Response (200)
```json
{
  "success": true,
  "message": "Yêu cầu tư vấn đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
  "data": {
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "customerName": "Nguyễn Văn A",
    "projectType": "Nhà Phố - Căn hộ"
  }
}
```

#### Error Response (400)
```json
{
  "success": false,
  "error": {
    "message": "Validation errors: phoneNumber: Số điện thoại không hợp lệ",
    "statusCode": 400
  }
}
```

#### Error Response (500)
```json
{
  "success": false,
  "error": {
    "message": "Có lỗi xảy ra khi gửi yêu cầu tư vấn. Vui lòng thử lại sau.",
    "statusCode": 500
  }
}
```

### 2. Get Email Service Status

**GET** `/status`

#### Success Response (200)
```json
{
  "success": true,
  "message": "Email service is available",
  "data": {
    "emailConfigured": true,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## Email Configuration

### Environment Variables
Add these variables to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONSULTATION_EMAIL=info@pgdesign.vn
```

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Create a password for "Mail"
   - Use this password in `EMAIL_PASS`

### Email Templates
The API sends two types of emails:

#### 1. Admin Notification Email
- **To**: `CONSULTATION_EMAIL` (default: info@pgdesign.vn)
- **Subject**: "Yêu cầu tư vấn thiết kế từ [Customer Name]"
- **Content**: Professional HTML template with all customer information

#### 2. Customer Confirmation Email
- **To**: Customer's email address
- **Subject**: "Xác nhận yêu cầu tư vấn thiết kế - PG Design"
- **Content**: Confirmation message with request details and contact info

## Phone Number Validation

### Supported Formats
- Mobile: `0901234567`, `+84901234567`
- Landline: `0281234567`

### Validation Pattern
```javascript
const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$|^02\d{9}$/;
```

## Error Handling

### Validation Errors
- Field-specific error messages in Vietnamese
- Multiple validation errors combined in single response
- Client-side validation supported for better UX

### Email Errors
- Admin email failure returns 500 error
- Customer confirmation email failure is logged but doesn't block submission
- Connection errors provide meaningful error messages

## Testing

### Test Email Service
```bash
curl -X GET http://localhost:3002/api/v1/consultation/status
```

### Test Form Submission
```bash
curl -X POST http://localhost:3002/api/v1/consultation/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phoneNumber": "0901234567",
    "email": "test@example.com",
    "address": "123 Test Street, Test City",
    "projectType": "Nhà Phố - Căn hộ",
    "investmentLevel": "500 Triệu",
    "specificRequest": "Test request"
  }'
```

## Security Considerations

1. **Rate Limiting**: Configured to prevent spam submissions
2. **Input Validation**: Server-side validation for all fields
3. **CORS**: Configured to allow requests from frontend domain
4. **Environment Variables**: Sensitive data stored in environment variables

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production email service
3. Set up SSL/TLS for secure connections
4. Configure proper logging and monitoring
5. Set up email delivery monitoring

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check email credentials in environment variables
   - Verify Gmail App Password is correct
   - Check firewall/network settings

2. **Validation errors**
   - Ensure all required fields are provided
   - Check phone number format
   - Verify email format

3. **CORS errors**
   - Check `CORS_ORIGIN` setting matches frontend URL
   - Verify Content-Type header is set correctly

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment variables. 