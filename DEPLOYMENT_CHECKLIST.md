# ✅ SHost.vn Deployment Checklist

## 📋 Pre-Deployment
- [ ] Choose deployment option (Static vs Full Stack)
- [ ] Purchase hosting plan from SHost.vn
- [ ] Register or transfer domain to SHost.vn
- [ ] Prepare environment variables

## 🔧 Build & Prepare
- [ ] Run `./deploy.sh` to build all applications
- [ ] Verify `deployment/` folder is created with all assets
- [ ] Test builds locally before uploading

## 🌐 DNS Configuration
- [ ] Access SHost.vn DNS management at [dns.shost.vn](https://dns.shost.vn/index.php?view=1)
- [ ] Configure A records for your domain
- [ ] Set up subdomains (admin, api if needed)
- [ ] Verify DNS propagation

## 📁 File Upload

### For Shared Hosting (Static Only):
- [ ] Set `REACT_APP_USE_MOCK_DATA=true`
- [ ] Upload `deployment/frontend/*` to hosting directory
- [ ] Configure domain to point to hosting

### For VPS Hosting (Full Stack):
- [ ] Upload all deployment files to server
- [ ] Set up database (PostgreSQL)
- [ ] Configure Nginx web server
- [ ] Install and configure PM2 for backend
- [ ] Set up SSL certificate (Let's Encrypt)

## 🚀 Launch
- [ ] Test main website: `https://yourdomain.com`
- [ ] Test admin panel: `https://admin.yourdomain.com` (if applicable)
- [ ] Test API endpoints: `https://yourdomain.com/api/health` (if applicable)
- [ ] Verify all forms and functionality work
- [ ] Check mobile responsiveness

## 🔧 Post-Launch
- [ ] Monitor server performance
- [ ] Set up regular backups
- [ ] Configure monitoring/alerts
- [ ] Update documentation with live URLs

## 🆘 Quick Commands

### Build Everything:
```bash
./deploy.sh
```

### Test Production Build Locally:
```bash
# Frontend
npm run build && npx serve -s build

# Backend
cd pgdesign-be && npm run build && npm start
```

### Check Deployment Package:
```bash
ls -la deployment/
```

## 📞 Support Contacts
- **SHost.vn Support**: Check their website for contact info
- **Technical Issues**: Refer to DEPLOYMENT_SHOST_GUIDE.md for troubleshooting 