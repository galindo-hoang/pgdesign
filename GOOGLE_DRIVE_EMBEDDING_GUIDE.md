# 🔗 Google Drive Document Embedding Guide

## 📋 Overview

This feature allows you to read Google Drive documents from your Google Sheets `contentLink` field and generate embedded HTML that preserves the original styling, text, font, and size from the documents.

## ✨ Features

- **Rich Text Preservation**: Maintains bold, italic, underline, strikethrough
- **Font Styling**: Preserves font family, size, and color
- **Multi-paragraph Support**: Handles complex document structures
- **Error Handling**: Graceful fallbacks for invalid URLs or API errors
- **Performance Optimized**: Efficient API calls with timeout handling

## 🏗️ Architecture

### Core Functions

1. **`extractGoogleDocId(url)`**: Extracts document ID from Google Docs URLs
2. **`readGoogleDriveDocument(url)`**: Fetches document content via Google Docs API
3. **`convertGoogleDocToHtml(data)`**: Converts Google Doc data to styled HTML
4. **`convertParagraphToHtml(paragraph)`**: Handles individual paragraph styling
5. **`extractPlainText(data)`**: Extracts plain text for fallback content

### Data Flow

```
Google Sheets → Extract URLs → Check if Google Doc → Fetch via API → Convert to HTML → Embed in React
```

## 📊 Data Structures

### Enhanced Blog Data Interface

```typescript
interface EnhancedGoogleSheetsData extends GoogleSheetsData {
  embeddedContent?: string;    // HTML content from Google Doc
  documentId?: string;         // Google Doc ID
  isGoogleDoc?: boolean;       // Flag indicating if it's a Google Doc
}
```

### Google Drive Document Interface

```typescript
interface GoogleDriveDocument {
  documentId: string;          // Document ID
  title: string;              // Document title
  content: string;            // Plain text content
  htmlContent: string;        // Styled HTML content
  lastModified: string;       // Last modification date
}
```

## 🚀 Usage

### Basic Usage

```typescript
import { readFilespreadsheetWithEmbeddedContent } from './services/blogPageService';

// Fetch data with embedded Google Drive content
const enhancedData = await readFilespreadsheetWithEmbeddedContent();

// Access embedded content
enhancedData['BLOG WEBSITE'].forEach(item => {
  if (item.isGoogleDoc && item.embeddedContent) {
    console.log('Google Doc content:', item.embeddedContent);
  }
});
```

### React Component Usage

```tsx
import React from 'react';

interface BlogPostProps {
  title: string;
  embeddedContent?: string;
  isGoogleDoc?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, embeddedContent, isGoogleDoc }) => {
  return (
    <div className="blog-post">
      <h2>{title}</h2>
      {isGoogleDoc && embeddedContent ? (
        <div 
          className="google-doc-embedded"
          dangerouslySetInnerHTML={{ __html: embeddedContent }}
        />
      ) : (
        <p>Regular blog post content</p>
      )}
    </div>
  );
};
```

## 🎨 Styling Support

The embedded HTML preserves the following Google Docs styling:

### Text Formatting
- **Bold**: `<strong>text</strong>`
- **Italic**: `<em>text</em>`
- **Underline**: `<u>text</u>`
- **Strikethrough**: `<del>text</del>`

### Font Properties
- **Font Size**: `<span style="font-size: 16pt;">text</span>`
- **Font Family**: `<span style="font-family: 'Arial', sans-serif;">text</span>`
- **Text Color**: `<span style="color: rgb(255, 0, 0);">text</span>`

### Example Output

```html
<div class="google-doc-content">
  <p>This is a <strong>bold</strong> and <em>italic</em> text with 
     <span style="color: rgb(255, 0, 0);">
       <span style="font-family: 'Arial', sans-serif;">
         <span style="font-size: 16pt;">custom color</span>
       </span>
     </span> and larger font size.
  </p>
  <p>This is a second paragraph with <u>underlined</u> and 
     <del>strikethrough</del> text.
  </p>
</div>
```

## 🔧 Setup Requirements

### 1. Google Cloud Console Setup

1. **Enable Google Docs API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Docs API"
   - Click "Enable"

2. **Configure API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Create or use existing API key
   - Set appropriate restrictions (recommended: restrict to Google Docs API)

### 2. Document Sharing

Ensure your Google Docs are accessible:
- **Public**: Share > Anyone with link can view
- **Or**: Add your service account email to document permissions

### 3. Environment Variables

```bash
# Add to your .env file
REACT_APP_GOOGLE_DOCS_API_KEY=your_api_key_here
```

## 📝 Google Sheets Format

Your Google Sheets should have this structure:

| Title | Content Link | Image Link |
|-------|--------------|------------|
| Blog Post Title | Google Docs URL | Image URL |

### Valid Google Docs URLs

```
https://docs.google.com/document/d/DOCUMENT_ID/edit
https://docs.google.com/document/d/DOCUMENT_ID/edit?usp=sharing
https://docs.google.com/document/d/DOCUMENT_ID/view
```

## 🧪 Testing

### Test Script

Run the test script to verify functionality:

```bash
node test-google-drive-embed.js
```

### Expected Output

```
🧪 Testing Google Drive Document Embedding
==========================================

🔗 Testing Google Doc ID extraction:
   1. https://docs.google.com/document/d/110sgdYRwmufKAW0zznNEBR4LhNeEXRupIN7cupkHQLs/edit
      Extracted ID: 110sgdYRwmufKAW0zznNEBR4LhNeEXRupIN7cupkHQLs

📄 Testing Google Doc content conversion:
Generated HTML:
<div class="google-doc-content">
  <p>This is a <strong>bold</strong> and <em>italic</em> text...</p>
</div>

✅ Google Drive embedding test completed successfully!
```

## 🎯 CSS Styling

Add these styles to your CSS for better presentation:

```css
.google-doc-content {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
}

.google-doc-content p {
  margin-bottom: 1rem;
}

.google-doc-content strong {
  font-weight: bold;
}

.google-doc-content em {
  font-style: italic;
}

.google-doc-content u {
  text-decoration: underline;
}

.google-doc-content del {
  text-decoration: line-through;
}

.google-doc-embedded {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #4285f4;
}
```

## 🚨 Error Handling

### Common Errors and Solutions

1. **403 Forbidden**:
   - Enable Google Docs API in Google Cloud Console
   - Check API key permissions
   - Ensure document is publicly accessible

2. **Invalid URL**:
   - Verify Google Docs URL format
   - Check if document exists and is accessible

3. **Timeout Errors**:
   - Increase API_TIMEOUT value
   - Check network connectivity

### Fallback Behavior

- If Google Docs API fails, falls back to regular URL handling
- If document can't be read, shows error message
- Graceful degradation to plain text content

## 🔄 Performance Considerations

### Caching Strategy

Consider implementing caching for better performance:

```typescript
// Simple in-memory cache
const documentCache = new Map();

const readGoogleDriveDocumentWithCache = async (url: string) => {
  const cacheKey = extractGoogleDocId(url);
  
  if (documentCache.has(cacheKey)) {
    return documentCache.get(cacheKey);
  }
  
  const document = await readGoogleDriveDocument(url);
  if (document) {
    documentCache.set(cacheKey, document);
  }
  
  return document;
};
```

### Rate Limiting

- Google Docs API has rate limits
- Implement exponential backoff for retries
- Consider batch processing for multiple documents

## 📚 API Reference

### `readFilespreadsheetWithEmbeddedContent()`

Fetches Google Sheets data and embeds Google Drive document content.

**Returns**: `Promise<{ [sheetName: string]: EnhancedGoogleSheetsData[] }>`

### `readGoogleDriveDocument(url)`

Reads a single Google Drive document.

**Parameters**:
- `url`: Google Docs URL

**Returns**: `Promise<GoogleDriveDocument | null>`

### `extractGoogleDocId(url)`

Extracts document ID from Google Docs URL.

**Parameters**:
- `url`: Google Docs URL

**Returns**: `string | null`

## 🎉 Success Stories

This feature enables:

- **Rich Content Display**: Show formatted blog posts with original styling
- **Content Management**: Use Google Docs as a CMS
- **Collaborative Editing**: Multiple authors can edit documents
- **Version Control**: Google Docs provides revision history
- **Real-time Updates**: Changes in Google Docs reflect in your app

## 🔮 Future Enhancements

Potential improvements:

1. **Image Support**: Handle embedded images in Google Docs
2. **Table Support**: Convert Google Docs tables to HTML tables
3. **List Support**: Handle numbered and bulleted lists
4. **Header Support**: Convert document headers to HTML headers
5. **Comments Support**: Display document comments
6. **Real-time Sync**: WebSocket updates for live content changes

## 📞 Support

For issues or questions:

1. Check the error logs in browser console
2. Verify Google Cloud Console setup
3. Test with the provided test script
4. Review this documentation

The Google Drive embedding feature provides a powerful way to display rich, formatted content while maintaining the original document styling and structure! 🚀 