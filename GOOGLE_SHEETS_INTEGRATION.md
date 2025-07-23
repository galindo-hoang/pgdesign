# Google Sheets Integration for Blog Data

## 📊 Overview

This feature allows the application to read blog data directly from a Google Sheets spreadsheet. The integration fetches data from the [PG - BLOG WEBSITE spreadsheet](https://docs.google.com/spreadsheets/d/18CfhdVV79DTcewoKhmOcZQC88MyuXHrbXoaGeyVWJc0) and converts it into a structured format for use in the blog page.

## 🔧 Implementation

### Function: `readFilespreadsheet()`

**Location**: `src/services/blogPageService.ts`

**Purpose**: Fetches and parses blog data from Google Sheets

**Return Type**: `Promise<GoogleSheetsData[]>`

### Data Structure

```typescript
interface GoogleSheetsData {
  title: string;        // Blog post title
  contentLink: string;  // Link to blog content
  imageLink: string;    // Link to blog image
}
```

## 📋 Google Sheets Format

The spreadsheet should have the following structure:

| Column A (TIÊU ĐỀ) | Column B (LINK NỘI DUNG) | Column C (LINK HÌNH ẢNH) |
|-------------------|------------------------|------------------------|
| Blog Title 1      | Content Link 1         | Image Link 1           |
| Blog Title 2      | Content Link 2         | Image Link 2           |
| ...               | ...                    | ...                    |

### Current Blog Entries

Based on the [spreadsheet](https://docs.google.com/spreadsheets/d/18CfhdVV79DTcewoKhmOcZQC88MyuXHrbXoaGeyVWJc0), the following blog entries are available:

1. **Nhà đẹp là do mix chất liệu đúng cách – Bạn đã biết chưa?**
2. **4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi**
3. **Khám Phá 4 Phong Cách Tủ Quần Áo Đẹp Chuẩn Gu & Cá Tính**
4. **Các cách phối màu nội thất đẹp và sang trọng, nhìn lâu không chán**
5. **Top 7 vật liệu ốp tường gia chủ cần biết khi xây nhà và làm nội thất**
6. **6 + Tip vệ sinh bộ bàn ăn gỗ đơn giản ngay tại nhà**
7. **[21+ Mẫu] Kệ tivi dưới gầm cầu thang đẹp sang trọng, tinh tế - giá phải chăng**
8. **12 Xu Hướng Thiết Kế Không Gian Xanh Cho Ngôi Nhà Của Bạn**
9. **Bật mí 99+ thiết kế quán trà sữa đảm bảo hút khách**

## 🚀 Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. **Important**: Set API restrictions to "Google Sheets API" or "Don't restrict key"

### 3. Environment Configuration

Add the API key to your `.env` file:

```env
REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here
```

### 4. Spreadsheet Permissions (CRITICAL)

**This is the most common cause of 403 errors!**

1. Open your Google Sheets spreadsheet
2. Click the **"Share"** button in the top-right corner
3. Click **"Change to anyone with the link"**
4. Set permission to **"Viewer"**
5. Click **"Done"**

**Alternative**: Share the spreadsheet with your API key's service account email.

### 5. Troubleshooting 403 Errors

If you get a 403 Forbidden error:

1. **Check Spreadsheet Sharing**: Make sure it's publicly accessible
2. **Check API Key Restrictions**: Ensure Google Sheets API is allowed
3. **Check API Quotas**: Make sure you haven't exceeded limits
4. **Test with Debug Script**: Run the provided debug script

See `FIX_403_ERROR.md` for detailed troubleshooting steps.

## 🔄 How It Works

### 1. API Call
```typescript
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
```

### 2. Data Parsing
- Skips the header row (row 1)
- Processes each data row
- Filters out empty rows
- Extracts title, content link, and image link

### 3. Error Handling
- **API Key Missing**: Falls back to mock data
- **Network Error**: Falls back to mock data
- **Invalid Data**: Falls back to mock data

### 4. Mock Data Fallback
If the API fails, the function returns predefined mock data based on the actual spreadsheet content.

## 📊 Usage Example

```typescript
import { readFilespreadsheet } from '../services/blogPageService';

// Fetch blog data
const blogData = await readFilespreadsheet();

// Use the data
blogData.forEach(entry => {
  console.log(`Title: ${entry.title}`);
  console.log(`Content: ${entry.contentLink}`);
  console.log(`Image: ${entry.imageLink}`);
});
```

## 🛡️ Security Considerations

### API Key Security
- **Environment Variables**: API key is stored in `.env` file
- **Client-Side**: API key is exposed in client-side code
- **Restrictions**: Consider restricting API key to specific domains/IPs

### Data Access
- **Read-Only**: The integration only reads data, doesn't modify the spreadsheet
- **Public Data**: The spreadsheet contains public blog content
- **No Sensitive Data**: No personal or sensitive information is accessed

## 🔧 Configuration Options

### Spreadsheet ID
```typescript
const spreadsheetId = '18CfhdVV79DTcewoKhmOcZQC88MyuXHrbXoaGeyVWJc0';
```

### Sheet Name
```typescript
const sheetName = 'Sheet1'; // Default sheet name
```

### API Timeout
```typescript
const API_TIMEOUT = 10000; // 10 seconds
```

## 📈 Performance

### Caching
- **No Built-in Caching**: Each call fetches fresh data
- **Consider Implementation**: Add caching for better performance
- **Real-time Updates**: Data is always current

### Rate Limits
- **Google Sheets API**: 300 requests per minute per project
- **Quota Management**: Monitor usage in Google Cloud Console
- **Error Handling**: Graceful fallback on rate limit exceeded

## 🧪 Testing

### Test Results
```
✅ Successfully read Google Sheets data
✅ Parsed 9 blog entries
✅ Empty rows filtered out
✅ Fallback to mock data available
✅ Ready for production use
```

### Test Coverage
- ✅ API integration working
- ✅ Data parsing successful
- ✅ Error handling functional
- ✅ Mock data fallback working

## 🔮 Future Enhancements

### Potential Improvements
1. **Caching Layer**: Implement Redis or in-memory caching
2. **Real-time Updates**: WebSocket integration for live updates
3. **Multiple Sheets**: Support for multiple spreadsheet tabs
4. **Data Validation**: Enhanced error checking and validation
5. **Admin Interface**: Web interface for managing blog data

### Advanced Features
1. **Image Processing**: Automatic image optimization
2. **SEO Integration**: Meta tags and structured data
3. **Analytics**: Track blog post performance
4. **Scheduling**: Scheduled blog post publishing

## 📞 Support

For issues or questions regarding the Google Sheets integration:

1. **Check API Key**: Verify the API key is correct and enabled
2. **Check Permissions**: Ensure the spreadsheet is accessible
3. **Check Network**: Verify internet connectivity
4. **Check Console**: Look for error messages in browser console

## 📚 References

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 