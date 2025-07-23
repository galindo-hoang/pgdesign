# 📊 Multi-Sheet Google Sheets Integration

## 🎯 Overview

The `readFilespreadsheet` function has been enhanced to fetch data from **multiple sheets** in a Google Sheets spreadsheet instead of just one. This allows you to organize your blog content across different sheets (e.g., "BLOG WEBSITE", "NEWS", "TIPS") and fetch all of them at once.

## 🔄 What Changed

### Before (Single Sheet)
```typescript
// Only fetched from one specific sheet
const sheetName = 'BLOG WEBSITE';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;
```

### After (Multiple Sheets)
```typescript
// 1. First, get all available sheets from metadata
const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;

// 2. Then, fetch data from each sheet
for (const sheet of sheets) {
  const sheetName = sheet.properties?.title;
  const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;
}
```

## 📋 Data Structure

### Return Type
```typescript
interface MultiSheetData {
  [sheetName: string]: GoogleSheetsData[];
}

interface GoogleSheetsData {
  title: string;
  contentLink: string;
  imageLink: string;
  sheetName?: string; // Track which sheet the data came from
}
```

### Example Response
```typescript
{
  "BLOG WEBSITE": [
    {
      title: "Nhà đẹp là do mix chất liệu đúng cách",
      contentLink: "https://example.com/blog1",
      imageLink: "https://image1.jpg",
      sheetName: "BLOG WEBSITE"
    },
    // ... more blog posts
  ],
  "NEWS": [
    {
      title: "Tin tức mới nhất về thiết kế nội thất 2024",
      contentLink: "https://example.com/news1",
      imageLink: "https://news1.jpg",
      sheetName: "NEWS"
    },
    // ... more news
  ],
  "TIPS": [
    {
      title: "Cách chọn màu sắc cho phòng khách",
      contentLink: "https://example.com/tip1",
      imageLink: "https://tip1.jpg",
      sheetName: "TIPS"
    },
    // ... more tips
  ]
}
```

## 🚀 How to Use

### 1. Call the Function
```typescript
import { readFilespreadsheet } from './services/blogPageService';

const multiSheetData = await readFilespreadsheet();
```

### 2. Access Data by Sheet
```typescript
// Get all blog posts
const blogPosts = multiSheetData['BLOG WEBSITE'] || [];

// Get all news
const news = multiSheetData['NEWS'] || [];

// Get all tips
const tips = multiSheetData['TIPS'] || [];
```

### 3. Process All Data
```typescript
// Get total count across all sheets
const totalEntries = Object.values(multiSheetData).reduce((sum, entries) => sum + entries.length, 0);

// Get all entries from all sheets
const allEntries = Object.values(multiSheetData).flat();

// Filter by sheet name
const blogEntries = allEntries.filter(entry => entry.sheetName === 'BLOG WEBSITE');
```

## 📊 Google Sheets Setup

### Required Structure
Each sheet should have the same column structure:

| Column A (Title) | Column B (Content Link) | Column C (Image Link) |
|------------------|-------------------------|----------------------|
| Blog Post 1      | https://example.com/1   | https://image1.jpg   |
| Blog Post 2      | https://example.com/2   | https://image2.jpg   |

### Sheet Naming
- Sheet names are case-sensitive
- Spaces and special characters are supported
- Empty sheets are automatically skipped

## 🔧 Error Handling

### 403 Forbidden Error
If you get a 403 error, follow these steps:

1. **Make spreadsheet public**:
   - Open your Google Sheets
   - Click "Share" → "Change to anyone with the link" → "Viewer"

2. **Check API key permissions**:
   - Go to Google Cloud Console
   - Ensure Google Sheets API is enabled
   - Check API key restrictions

### Fallback to Mock Data
If the API fails, the function automatically falls back to mock data:

```typescript
// Mock data includes multiple sheets
{
  "BLOG WEBSITE": [...],
  "NEWS": [...],
  "TIPS": [...]
}
```

## 🧪 Testing

### Run the Test
```bash
node test-multi-sheet-simple.js
```

### Expected Output
```
🧪 Testing Multi-Sheet Google Sheets Functionality
================================================

✅ Multi-sheet data structure:
==============================

📄 Sheet: BLOG WEBSITE
   Entries: 2
   1. Blog Post 1
      Link: https://example.com/1
      Image: https://image1.jpg
      Sheet: BLOG WEBSITE

📄 Sheet: NEWS
   Entries: 2
   1. News 1
      Link: https://news.com/1
      Image: https://news1.jpg
      Sheet: NEWS

📊 Summary:
   Total sheets: 3
   Total entries: 5

✅ Multi-sheet functionality test completed successfully!
```

## 📈 Performance Considerations

### API Calls
- **Metadata call**: 1 request to get sheet list
- **Data calls**: 1 request per sheet
- **Total**: 1 + number of sheets

### Caching
Consider implementing caching to avoid repeated API calls:

```typescript
// Example caching implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const readFilespreadsheetWithCache = async () => {
  const now = Date.now();
  const cached = cache.get('multiSheetData');
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await readFilespreadsheet();
  cache.set('multiSheetData', { data, timestamp: now });
  return data;
};
```

## 🔄 Migration from Single Sheet

### Old Code
```typescript
const data = await readFilespreadsheet();
// data was GoogleSheetsData[]
```

### New Code
```typescript
const multiSheetData = await readFilespreadsheet();
// multiSheetData is MultiSheetData

// To get the same behavior as before (first sheet only)
const firstSheetName = Object.keys(multiSheetData)[0];
const data = multiSheetData[firstSheetName] || [];
```

## 🎯 Benefits

1. **Organized Content**: Separate different types of content into different sheets
2. **Scalable**: Add new sheets without changing code
3. **Flexible**: Access data by category/sheet name
4. **Maintainable**: Each sheet can have different content types
5. **Robust**: Graceful error handling and fallback

## 📝 Example Usage in Components

```typescript
import React, { useState, useEffect } from 'react';
import { readFilespreadsheet } from '../services/blogPageService';

const BlogPage = () => {
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readFilespreadsheet();
        setBlogData(data);
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Blog Posts */}
      <section>
        <h2>Blog Posts</h2>
        {blogData['BLOG WEBSITE']?.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
            <a href={post.contentLink}>Read more</a>
          </div>
        ))}
      </section>

      {/* News */}
      <section>
        <h2>News</h2>
        {blogData['NEWS']?.map((news, index) => (
          <div key={index}>
            <h3>{news.title}</h3>
            <a href={news.contentLink}>Read more</a>
          </div>
        ))}
      </section>

      {/* Tips */}
      <section>
        <h2>Tips</h2>
        {blogData['TIPS']?.map((tip, index) => (
          <div key={index}>
            <h3>{tip.title}</h3>
            <a href={tip.contentLink}>Read more</a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BlogPage;
```

## 🚨 Troubleshooting

### Common Issues

1. **Empty sheets**: Sheets with no data are automatically skipped
2. **Wrong sheet names**: Check exact spelling and case
3. **API limits**: Google Sheets API has rate limits
4. **Network errors**: Function falls back to mock data

### Debug Steps

1. Check browser console for detailed error messages
2. Verify spreadsheet sharing settings
3. Test API key in Google Cloud Console
4. Run the test script to verify functionality

## 📞 Support

If you encounter issues:

1. Check the console logs for detailed error messages
2. Verify your Google Sheets setup
3. Test with the provided test script
4. Review the error handling documentation

The multi-sheet functionality provides a powerful way to organize and manage your blog content across multiple Google Sheets tabs! 🎉 