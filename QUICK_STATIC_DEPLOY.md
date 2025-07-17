# ⚡ Quick Static Deployment for SHost.vn

## 🎯 Overview
This guide helps you quickly deploy **only the React frontend** to SHost.vn using mock data - perfect for demos, presentations, or getting started quickly.

## ⏱️ 5-Minute Deployment

### Step 1: Configure for Mock Data
```bash
# Set environment to use mock data
export REACT_APP_USE_MOCK_DATA=true
```

### Step 2: Build the Frontend
```bash
# Install dependencies and build
npm install
npm run build
```

### Step 3: Prepare Upload Package
```bash
# Create deployment folder
mkdir static-deployment
cp -r build/* static-deployment/

# Your upload package is ready in static-deployment/
ls static-deployment/
```

### Step 4: Upload to SHost.vn
1. Login to your SHost.vn hosting control panel
2. Navigate to File Manager or use FTP client
3. Upload **all contents** of `static-deployment/` to your website's root directory
4. Ensure `index.html` is in the root of your web directory

### Step 5: Configure Domain
1. Go to [SHost.vn DNS Management](https://dns.shost.vn/index.php?view=1)
2. Add an A record pointing your domain to the hosting server IP
3. Wait for DNS propagation (usually 15-30 minutes)

## 🎉 You're Live!

Your website should now be accessible at `https://yourdomain.com`

## 📁 What Gets Deployed

With `REACT_APP_USE_MOCK_DATA=true`, your site includes:
- ✅ Complete React website with all pages
- ✅ Mock data for all content (services, projects, blog posts)
- ✅ Full navigation and UI functionality
- ✅ Contact forms (mock submission)
- ✅ All images and assets
- ✅ Mobile responsive design

## 🔄 To Update Your Site

1. Make changes to your code
2. Rebuild: `REACT_APP_USE_MOCK_DATA=true npm run build`
3. Re-upload the `build/` contents to your hosting

## 🚀 Next Steps

When ready for full functionality:
1. Follow the complete guide in `DEPLOYMENT_SHOST_GUIDE.md`
2. Set up backend API and database
3. Configure `REACT_APP_USE_MOCK_DATA=false`

## 💡 Pro Tips

- **Fast Builds**: Keep `REACT_APP_USE_MOCK_DATA=true` for quick iterations
- **Preview Locally**: Run `npx serve -s build` to test your build locally
- **File Size**: Static deployment is typically 5-15MB total
- **Speed**: Loads very fast since no API calls are made

## 🆘 Troubleshooting

**Issue**: Routes not working (404 on refresh)  
**Solution**: Configure URL rewriting in hosting control panel to redirect all routes to `index.html`

**Issue**: Images not loading  
**Solution**: Check that all files uploaded correctly and paths are relative

**Issue**: White screen  
**Solution**: Check browser console for errors, verify all assets uploaded 