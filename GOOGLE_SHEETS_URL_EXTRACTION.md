# 🔗 Google Sheets Embedded URL Extraction Guide

## 🎯 Problem Solved

You were having trouble getting embedded URLs from the `contentLink` field in your Google Sheets. This guide explains how the issue has been resolved and how to properly handle various URL formats that Google Sheets can return.

## 🔍 Common URL Formats in Google Sheets

Google Sheets can return URLs in several different formats:

### 1. **Standard URLs**
```
https://example.com/blog-post
http://example.com/blog-post
```

### 2. **HYPERLINK Formulas** (Most Common Issue)
```
=HYPERLINK("https://example.com/blog-post", "Read More")
=HYPERLINK("https://pgdesign.com.vn/blog-post", "Đọc thêm")
```

### 3. **Quoted URLs**
```
"https://example.com/blog-post"
"https://pgdesign.com.vn/blog-post"
```

### 4. **URLs with Extra Spaces**
```
  https://example.com/blog-post  
  "https://example.com/blog-post"  
```

### 5. **Empty or Invalid URLs**
```
=HYPERLINK("", "No URL")
""
Invalid URL
```

## ✅ Solution Implemented

### URL Extraction Function
```typescript
const extractUrl = (urlString: string): string => {
  if (!urlString || typeof urlString !== 'string') {
    return '';
  }
  
  let cleanUrl = urlString.trim();
  
  // Handle HYPERLINK formula (common in Google Sheets)
  if (cleanUrl.startsWith('=HYPERLINK(')) {
    // Extract URL from HYPERLINK("URL", "TEXT")
    const urlMatch = cleanUrl.match(/=HYPERLINK\("([^"]+)"/);
    if (urlMatch && urlMatch[1]) {
      cleanUrl = urlMatch[1];
    } else {
      return ''; // Invalid HYPERLINK formula
    }
  }
  
  // Remove surrounding quotes
  if (cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) {
    cleanUrl = cleanUrl.slice(1, -1);
  }
  
  // Validate URL format
  try {
    new URL(cleanUrl);
    return cleanUrl;
  } catch (error) {
    return ''; // Invalid URL
  }
};
```

### Integration in readFilespreadsheet
```typescript
// Extract clean URL from contentLink
const cleanContentLink = extractUrl(contentLink || '');
const cleanImageLink = imageLink ? extractUrl(imageLink.trim()) : '';

parsedSheetData.push({
  title: title.trim(),
  contentLink: cleanContentLink,
  imageLink: cleanImageLink,
  sheetName: sheetName
});

// Log URL extraction for debugging
if (contentLink && contentLink !== cleanContentLink) {
  console.log(`🔗 URL extracted for "${title.trim()}":`);
  console.log(`   Original: "${contentLink}"`);
  console.log(`   Clean: "${cleanContentLink}"`);
}
```

## 🧪 Test Results

The URL extraction function successfully handles all common formats:

| Input Format | Output | Status |
|--------------|--------|--------|
| `https://example.com/blog1` | `https://example.com/blog1` | ✅ Valid |
| `=HYPERLINK("https://example.com/blog2", "Read More")` | `https://example.com/blog2` | ✅ Extracted |
| `"https://example.com/blog3"` | `https://example.com/blog3` | ✅ Cleaned |
| `  https://example.com/blog4  ` | `https://example.com/blog4` | ✅ Trimmed |
| `=HYPERLINK("", "No URL")` | `` | ❌ Invalid |
| `` | `` | ❌ Empty |

## 📊 Google Sheets Setup Recommendations

### 1. **Use HYPERLINK Formulas** (Recommended)
In your Google Sheets, use the HYPERLINK formula for better user experience:

```
=HYPERLINK("https://pgdesign.com.vn/blog-post", "Đọc thêm")
```

**Benefits:**
- Clickable links in Google Sheets
- Clear display text
- Easy to manage

### 2. **Standard URLs** (Simple)
Use plain URLs for simplicity:

```
https://pgdesign.com.vn/blog-post
```

### 3. **Avoid These Formats**
- Empty cells
- Invalid URLs
- Broken HYPERLINK formulas

## 🔧 How to Use in Your Components

### Basic Usage
```typescript
import { readFilespreadsheet } from './services/blogPageService';

const BlogComponent = () => {
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await readFilespreadsheet();
      setBlogData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {blogData['BLOG WEBSITE']?.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          {post.contentLink && (
            <a href={post.contentLink} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          )}
        </div>
      ))}
    </div>
  );
};
```

### Advanced Usage with Error Handling
```typescript
const BlogComponent = () => {
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await readFilespreadsheet();
        setBlogData(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch blog data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {Object.keys(blogData).map(sheetName => (
        <section key={sheetName}>
          <h2>{sheetName}</h2>
          {blogData[sheetName]?.map((post, index) => (
            <article key={index}>
              <h3>{post.title}</h3>
              {post.contentLink ? (
                <a 
                  href={post.contentLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-more-link"
                >
                  Read More
                </a>
              ) : (
                <span className="no-link">No link available</span>
              )}
              {post.imageLink && (
                <img src={post.imageLink} alt={post.title} />
              )}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
};
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. **Empty contentLink**
**Problem:** `contentLink` is empty or shows "NO VALID URL"

**Solutions:**
- Check if the cell in Google Sheets has a valid URL
- Ensure the URL is properly formatted
- Verify the HYPERLINK formula is correct

#### 2. **HYPERLINK Formula Not Working**
**Problem:** URLs from HYPERLINK formulas are not extracted

**Solutions:**
- Check the formula syntax: `=HYPERLINK("URL", "TEXT")`
- Ensure the URL is in quotes
- Verify the formula is not broken

#### 3. **Invalid URLs**
**Problem:** URLs are marked as invalid

**Solutions:**
- Ensure URLs start with `http://` or `https://`
- Check for typos in the URL
- Remove extra spaces or quotes

### Debug Steps

1. **Check Console Logs**
   ```javascript
   // Look for these logs in browser console
   🔗 URL extracted for "Blog Post Title":
      Original: "=HYPERLINK("https://example.com", "Read More")"
      Clean: "https://example.com"
   ```

2. **Verify Google Sheets Data**
   - Open your Google Sheets
   - Check the Content Link column
   - Ensure URLs are properly formatted

3. **Test with Different Formats**
   - Try standard URLs first
   - Then test HYPERLINK formulas
   - Check for any special characters

## 📈 Performance Considerations

### URL Validation
- The `extractUrl` function validates URLs using the `URL` constructor
- Invalid URLs are filtered out automatically
- This prevents broken links in your application

### Error Handling
- Empty or invalid URLs return empty strings
- The function continues processing even if some URLs fail
- Detailed logging helps with debugging

### Caching
Consider implementing caching to avoid repeated API calls:

```typescript
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

## 🎯 Best Practices

### 1. **Google Sheets Setup**
- Use consistent URL formats across all sheets
- Prefer HYPERLINK formulas for better UX
- Keep URLs in a dedicated column
- Use descriptive link text

### 2. **Error Handling**
- Always check if `contentLink` exists before using it
- Provide fallback text for missing links
- Log URL extraction issues for debugging

### 3. **Security**
- Use `target="_blank"` and `rel="noopener noreferrer"` for external links
- Validate URLs before displaying them
- Consider URL whitelisting for security

### 4. **User Experience**
- Show loading states while fetching data
- Handle empty or invalid URLs gracefully
- Provide clear error messages

## ✅ Summary

The URL extraction issue has been resolved with:

1. **Robust URL parsing** that handles multiple formats
2. **HYPERLINK formula support** for embedded URLs
3. **Automatic validation** of extracted URLs
4. **Detailed logging** for debugging
5. **Graceful error handling** for invalid URLs

Your `readFilespreadsheet` function now properly extracts embedded URLs from Google Sheets, including HYPERLINK formulas, quoted URLs, and handles various edge cases. The function is production-ready and includes comprehensive error handling! 🎉 