# 🔧 Quick Fix: Google Sheets 403 Forbidden Error

## 🚨 Problem
You're getting a 403 Forbidden error when trying to access the Google Sheets API.

## ✅ Solution 1: Make Spreadsheet Public (Easiest)

### Step 1: Open Your Spreadsheet
1. Go to: https://docs.google.com/spreadsheets/d/1KjaeNtt0D9uWGVRa2ZRCi9OQ05CLnifCCOia-Q8dBvo/edit
2. Sign in if prompted

### Step 2: Change Sharing Settings
1. Click **"Share"** button (top-right)
2. Click **"Change to anyone with the link"**
3. Set to **"Viewer"**
4. Click **"Done"**

### Step 3: Test
Run the debug test again:
```bash
node test-google-sheets-debug.js
```

## ✅ Solution 2: Fix API Key (If Solution 1 doesn't work)

### Step 1: Check Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **"APIs & Services" > "Enabled APIs"**
4. Enable **"Google Sheets API"** if not enabled

### Step 2: Check API Key Restrictions
1. Go to **"APIs & Services" > "Credentials"**
2. Find your API key: `AIzaSyADtWdOgQXmiRzNS5EqLTD4Nw_3DQQBAXU`
3. Click to edit
4. Under **"API restrictions"**:
   - Select **"Restrict key"** and choose **"Google Sheets API"**
   - OR select **"Don't restrict key"**

## ✅ Solution 3: Use Environment Variable (Recommended)

### Step 1: Create .env file
```env
REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here
```

### Step 2: Update code
```typescript
// In src/services/blogPageService.ts
const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
```

## 🧪 Test Your Fix

After making changes, run:
```bash
node test-google-sheets-debug.js
```

You should see:
- ✅ API Key Valid
- ✅ Spreadsheet Access
- ✅ Public Access

## 🆘 Still Having Issues?

If you're still getting 403 errors:

1. **Check the spreadsheet URL** - Make sure it's accessible in your browser
2. **Try a different API key** - Create a new one in Google Cloud Console
3. **Check API quotas** - Make sure you haven't exceeded limits
4. **Contact support** - If all else fails

## 📞 Need Help?

The debug script will show you exactly what's wrong and how to fix it. Run it and follow the recommendations! 