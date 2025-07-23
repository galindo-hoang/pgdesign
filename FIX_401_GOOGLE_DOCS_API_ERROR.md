# 🔧 Fix 401 Unauthorized Error - Google Docs API

## 🚨 **Error: HTTP error! status: 401**

This error occurs when the Google Docs API rejects your API key due to authentication or permission issues.

## 🔍 **Root Causes**

### 1. **API Key Issues**
- Invalid or expired API key
- API key restrictions too strict
- API key not configured for Google Docs API

### 2. **Google Cloud Console Setup**
- Google Docs API not enabled
- Incorrect project configuration
- Billing not enabled

### 3. **Document Permissions**
- Document not publicly accessible
- Document requires specific permissions
- Document owner restrictions

## ✅ **Step-by-Step Fix**

### Step 1: Verify Google Cloud Console Setup

#### 1.1 **Enable Google Docs API**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** > **Library**
4. Search for **"Google Docs API"**
5. Click on it and press **"Enable"**

#### 1.2 **Enable Google Drive API** (Required for images)
1. In the same Library, search for **"Google Drive API"**
2. Click on it and press **"Enable"**

#### 1.3 **Check Billing**
1. Go to **Billing** in the left menu
2. Ensure billing is enabled for your project
3. Google Docs API requires billing to be enabled

### Step 2: Configure API Key

#### 2.1 **Create New API Key**
1. Go to **APIs & Services** > **Credentials**
2. Click **"Create Credentials"** > **"API Key"**
3. Copy the new API key

#### 2.2 **Set API Key Restrictions** (Recommended)
1. Click on your API key to edit it
2. Under **"API restrictions"**, select **"Restrict key"**
3. Add these APIs:
   - **Google Docs API**
   - **Google Drive API**
   - **Google Sheets API**
4. Click **"Save"**

#### 2.3 **Set Application Restrictions** (Optional)
1. Under **"Application restrictions"**, choose:
   - **"HTTP referrers"** for web apps
   - **"IP addresses"** for server apps
2. Add your domain or IP addresses
3. Click **"Save"**

### Step 3: Update Your Code

#### 3.1 **Use Environment Variable** (Recommended)
```bash
# Add to your .env file
REACT_APP_GOOGLE_DOCS_API_KEY=your_new_api_key_here
```

#### 3.2 **Update Service Code**
```typescript
// In src/services/blogPageService.ts
const apiKey = process.env.REACT_APP_GOOGLE_DOCS_API_KEY || "your_fallback_key";
```

### Step 4: Test Document Permissions

#### 4.1 **Make Document Public**
1. Open your Google Doc
2. Click **"Share"** button
3. Click **"Change to anyone with the link"**
4. Set permission to **"Viewer"**
5. Click **"Done"**

#### 4.2 **Test Document Access**
1. Copy the document URL
2. Open in incognito/private browser
3. Verify you can access it without login

### Step 5: Test API Access

#### 5.1 **Test API Key Directly**
```bash
# Test with curl (replace with your values)
curl "https://docs.googleapis.com/v1/documents/YOUR_DOC_ID?key=YOUR_API_KEY"
```

#### 5.2 **Expected Response**
```json
{
  "documentId": "your_doc_id",
  "title": "Your Document Title",
  "body": { ... }
}
```

#### 5.3 **Error Response (401)**
```json
{
  "error": {
    "code": 401,
    "message": "Request had invalid authentication credentials.",
    "status": "UNAUTHENTICATED"
  }
}
```

## 🔧 **Quick Fix Script**

Create this test script to diagnose the issue:

```javascript
// test-google-docs-api.js
const testGoogleDocsAPI = async () => {
  const apiKey = "YOUR_API_KEY_HERE";
  const documentId = "YOUR_DOC_ID_HERE";
  
  console.log('🔍 Testing Google Docs API...');
  console.log(`API Key: ${apiKey.substring(0, 10)}...`);
  console.log(`Document ID: ${documentId}`);
  
  try {
    const response = await fetch(
      `https://docs.googleapis.com/v1/documents/${documentId}?key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Document title:', data.title);
    } else {
      const error = await response.text();
      console.error('❌ Error:', error);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

testGoogleDocsAPI();
```

## 🚨 **Common Issues & Solutions**

### Issue 1: "API key not valid"
**Solution**: Create a new API key and ensure it's not restricted too strictly

### Issue 2: "Google Docs API not enabled"
**Solution**: Enable the API in Google Cloud Console

### Issue 3: "Billing not enabled"
**Solution**: Enable billing for your Google Cloud project

### Issue 4: "Document not accessible"
**Solution**: Make the document public or add your service account

### Issue 5: "Quota exceeded"
**Solution**: Check your API quotas in Google Cloud Console

## 📋 **Checklist**

- [ ] Google Docs API enabled
- [ ] Google Drive API enabled (for images)
- [ ] Billing enabled
- [ ] API key created and configured
- [ ] API key restrictions set correctly
- [ ] Document is publicly accessible
- [ ] Environment variable set
- [ ] Code updated to use environment variable
- [ ] API key tested with curl or test script

## 🔄 **Alternative Solutions**

### Option 1: Use Service Account (More Secure)
```typescript
// For server-side applications
const { GoogleAuth } = require('google-auth-library');
const auth = new GoogleAuth({
  keyFile: 'path/to/service-account.json',
  scopes: ['https://www.googleapis.com/auth/documents.readonly']
});
```

### Option 2: Use OAuth 2.0 (For User-Specific Access)
```typescript
// For user-specific document access
const accessToken = await getOAuthAccessToken();
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### Option 3: Fallback to Mock Data
```typescript
// If API continues to fail, use mock data
if (response.status === 401) {
  console.warn('⚠️ API authentication failed, using mock data');
  return getMockEnhancedData();
}
```

## 🎯 **Expected Result**

After fixing the 401 error, you should see:

```
📄 Reading Google Doc: your_doc_id
🖼️ Found 2 images to fetch
✅ Using real image URL: https://drive.google.com/uc?id=...
✅ Successfully embedded Google Doc: Your Document Title
🎉 Successfully processed all sheets with embedded content
```

## 📞 **Still Having Issues?**

1. **Check Google Cloud Console** for any error messages
2. **Verify API quotas** haven't been exceeded
3. **Test with a simple document** first
4. **Check browser console** for additional error details
5. **Use the test script** to isolate the issue

The 401 error is typically resolved by properly configuring the Google Cloud Console and API key permissions! 🔧 