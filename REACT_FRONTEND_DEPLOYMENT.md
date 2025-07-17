# 🚀 React Frontend Deployment to SHost.vn

## ⚡ Quick Deploy (3 Steps)

### Step 1: Build Your React App
```bash
./deploy-frontend-only.sh
```

This will:
- Install dependencies
- Build your React app with mock data
- Create a `frontend-deployment/` folder ready for upload

### Step 2: Upload to SHost.vn
1. Login to your SHost.vn hosting control panel
2. Go to File Manager (or use FTP)
3. Upload **all contents** of `frontend-deployment/` folder to your website root directory
4. Make sure `index.html` is in your website's root folder

### Step 3: Configure Domain
1. Go to [SHost.vn DNS Management](https://dns.shost.vn/index.php?view=1)
2. Login with your domain credentials  
3. Add DNS record:
   - **Type**: A
   - **Name**: @ (or leave blank)
   - **Value**: Your hosting server IP address
4. Wait 15-30 minutes for DNS to propagate

## 🎉 You're Live!

Your React website will be accessible at `https://yourdomain.com`

## 📁 What You're Deploying

Your React frontend includes:
- ✅ Homepage with hero section
- ✅ Services page  
- ✅ Projects gallery
- ✅ Blog page
- ✅ Contact page
- ✅ Admin panel access
- ✅ All images and assets
- ✅ Mobile responsive design
- ✅ Mock data (no backend needed)

## 🔄 To Update Your Website

1. Make changes to your React code in `/src`
2. Run `./deploy-frontend-only.sh` again
3. Re-upload the new `frontend-deployment/` contents

## 💡 File Structure After Upload

Your SHost.vn hosting directory should look like:
```
public_html/          (or your web root)
├── index.html        ← Main entry point
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── manifest.json
├── robots.txt
└── asset-manifest.json
```

## 🆘 Troubleshooting

**Problem**: Website shows 404 on page refresh  
**Solution**: Contact SHost.vn support to enable URL rewriting or add this to `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Problem**: Images not loading  
**Solution**: Check that all files in `static/` folder uploaded correctly

**Problem**: Blank white page  
**Solution**: Check browser console for errors, verify `index.html` is in root directory

## 🚀 Advanced: Using Real API Data

Later, if you want to connect to real backend APIs:
1. Set up your backend API server
2. Update environment: `REACT_APP_USE_MOCK_DATA=false`
3. Set API URL: `REACT_APP_API_URL=https://api.yourdomain.com`
4. Rebuild and redeploy

## 📞 Need Help?

- **SHost.vn Support**: Check their help center or contact support
- **Technical Issues**: Check the browser console for error messages
- **Build Issues**: Make sure you're running `npm install` before building 