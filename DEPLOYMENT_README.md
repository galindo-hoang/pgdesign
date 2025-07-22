# 🚀 Deployment Guide

Your PG Design React app can be deployed in two ways:

## ⚡ GitHub Pages (Recommended - FREE!)

**One command deployment to GitHub Pages:**

```bash
./deploy-github.sh
```

- ✅ **FREE hosting**
- ✅ **HTTPS enabled**
- ✅ **Global CDN**
- ✅ **Easy updates**

**Live URL**: https://galindo-hoang.github.io/pgdesign

📖 **Guides**:
- [`QUICK_GITHUB_SETUP.md`](QUICK_GITHUB_SETUP.md) - 2-step setup
- [`GITHUB_DEPLOYMENT.md`](GITHUB_DEPLOYMENT.md) - Complete guide

---

## 🌐 SHost.vn (Custom Domain)

**Build and upload to SHost.vn hosting:**

```bash
./deploy-frontend-only.sh
# Then upload frontend-deployment/ folder
```

- 💰 **Paid hosting**
- ✅ **Custom domain**
- ✅ **Vietnamese support**

📖 **Guides**:
- [`SIMPLE_DEPLOY_GUIDE.md`](SIMPLE_DEPLOY_GUIDE.md) - Quick 3-step guide
- [`REACT_FRONTEND_DEPLOYMENT.md`](REACT_FRONTEND_DEPLOYMENT.md) - Detailed guide

---

## 🤔 Which Should I Choose?

| Need | Choose |
|------|--------|
| Quick demo/portfolio | 🚀 **GitHub Pages** |
| Share with clients | 🚀 **GitHub Pages** |
| Free hosting | 🚀 **GitHub Pages** |
| Custom domain | 🌐 **SHost.vn** |
| Business website | 🌐 **SHost.vn** |

📊 **Full comparison**: [`DEPLOYMENT_OPTIONS.md`](DEPLOYMENT_OPTIONS.md)

---

## 💡 Recommendation

**Start with GitHub Pages** (it's free and takes 1 minute!)

```bash
./deploy-github.sh
```

You can always move to SHost.vn later for a custom domain.

Both options use your `USE_MOCK_DATA=true` setup, so no backend is needed! 