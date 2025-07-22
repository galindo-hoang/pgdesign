# 🚀 Deploy to GitHub Pages

## ⚡ One-Command Deploy

```bash
./deploy-github.sh
```

**That's it!** Your React app will be live at:
**https://galindo-hoang.github.io/pgdesign**

---

## 📋 What This Does

1. ✅ Uses mock data (no backend needed)
2. ✅ Builds your React app for production
3. ✅ Pushes to `gh-pages` branch
4. ✅ Automatically configures GitHub Pages

## 🕐 Timeline

- **Build time**: ~30 seconds
- **GitHub Pages update**: 2-10 minutes
- **Total**: ~10 minutes to see your live site

## 🔄 To Update Your Site

1. Make changes to your React code in `/src`
2. Commit your changes: `git add . && git commit -m "Update"`
3. Deploy again: `./deploy-github.sh`

## 📁 What Gets Deployed

Your GitHub Pages site includes:
- ✅ Complete PG Design website
- ✅ All pages (Home, Services, Projects, Blog, Contact)
- ✅ Mock data for all content
- ✅ Full navigation and functionality
- ✅ Mobile responsive design
- ✅ All images and assets

## 🛠️ Manual Deploy (Alternative)

If you prefer manual commands:
```bash
# Set mock data
export REACT_APP_USE_MOCK_DATA=true

# Deploy
npm run deploy
```

## 🆘 Troubleshooting

**Error: "gh-pages not found"**
```bash
npm install --save-dev gh-pages
```

**Error: "Not a git repository"**
```bash
git init
git remote add origin https://github.com/yourusername/yourrepo.git
```

**Site not updating?**
- Wait 5-10 minutes
- Check GitHub repository → Settings → Pages
- Ensure source is set to "gh-pages branch"

**404 Error on GitHub Pages?**
- Check that your repository is public
- Verify Pages is enabled in repository settings

## 🌐 Live URL

Your website will be available at:
**https://galindo-hoang.github.io/pgdesign**

## 🔗 GitHub Repository Settings

1. Go to your repository: https://github.com/galindo-hoang/pgdesign
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Ensure **Source** is set to "Deploy from a branch"
5. Select **gh-pages** branch

## 💡 Pro Tips

- **Free hosting**: GitHub Pages is completely free
- **Custom domain**: You can add a custom domain in Pages settings
- **HTTPS**: Automatically enabled
- **Fast CDN**: Global content delivery network
- **Auto-deploy**: Just run the script whenever you want to update 