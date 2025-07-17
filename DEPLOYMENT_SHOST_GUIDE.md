# 🚀 SHost.vn Deployment Guide for PG Design Project

## 📋 Overview

This guide covers deploying your React-based PG Design project to SHost.vn hosting service. Your project consists of:

- **Frontend**: React application (main website)
- **Backend API**: Node.js/TypeScript API server
- **Admin Panel**: React admin interface
- **Database**: PostgreSQL with migrations

## 🎯 Deployment Options

### Option 1: Static Frontend Only (Shared Hosting)
Deploy only the React frontend using mock data - suitable for demo/presentation.

### Option 2: Full Stack (VPS/Cloud Hosting)
Deploy complete application with backend API and database - recommended for production.

## 📦 Step 1: Prepare Your Project

### 1.1 Configure Environment Variables

Create `.env.production`:
```bash
# Frontend Configuration
REACT_APP_USE_MOCK_DATA=false
REACT_APP_API_URL=https://yourdomain.com/api

# Backend Configuration (for VPS deployment)
NODE_ENV=production
PORT=3002
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=pgdesign_prod
DB_USER=your-db-user
DB_PASS=your-db-password

# File Storage Configuration
MINIO_ENDPOINT=your-storage-endpoint
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET=pgdesign-assets
```

### 1.2 Build All Applications

Run the deployment script:
```bash
./deploy.sh
```

This will create a `deployment` folder with:
- `deployment/frontend/` - React website build
- `deployment/admin/` - Admin panel build  
- `deployment/backend/` - API server files

## 🌐 Step 2: Domain and DNS Configuration

### 2.1 Access SHost.vn DNS Management
1. Go to [https://dns.shost.vn/index.php?view=1](https://dns.shost.vn/index.php?view=1)
2. Login to your account
3. Add your domain

### 2.2 Configure DNS Records

For full stack deployment, set up these DNS records:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | @ | your-server-ip | Main website |
| A | www | your-server-ip | WWW redirect |
| A | api | your-server-ip | API endpoint |
| A | admin | your-server-ip | Admin panel |

For static hosting only:
| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | @ | hosting-server-ip | Main website |
| CNAME | www | yourdomain.com | WWW redirect |

## 🖥️ Step 3: Server Setup (VPS Option)

### 3.1 Server Requirements
- Ubuntu 20.04+ or CentOS 7+
- Node.js 16+
- PostgreSQL 12+
- Nginx (web server)
- PM2 (process manager)

### 3.2 Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install Nginx
sudo apt install nginx

# Install PM2
sudo npm install -g pm2
```

### 3.3 Database Setup
```bash
# Create database user
sudo -u postgres createuser --interactive pgdesign_user

# Create database
sudo -u postgres createdb pgdesign_prod

# Set password
sudo -u postgres psql
ALTER USER pgdesign_user PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE pgdesign_prod TO pgdesign_user;
\q
```

## 📁 Step 4: Deploy Applications

### 4.1 Upload Files
Upload your deployment folder contents:
```bash
# Upload to your server
scp -r deployment/* user@your-server:/var/www/
```

### 4.2 Configure Backend API
```bash
# Navigate to backend directory
cd /var/www/backend

# Install dependencies
npm install --production

# Run database migrations
npm run migrate

# Seed initial data
npm run seed

# Start with PM2
pm2 start dist/app.js --name "pgdesign-api"
pm2 save
pm2 startup
```

### 4.3 Configure Nginx

Create `/etc/nginx/sites-available/pgdesign`:
```nginx
# Main website
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin panel
server {
    listen 80;
    server_name admin.yourdomain.com;
    root /var/www/admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/pgdesign /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Step 5: Static Hosting (Shared Hosting Option)

### 5.1 For Mock Data Demo
If using shared hosting with mock data only:

1. Set `REACT_APP_USE_MOCK_DATA=true` in your environment
2. Run `npm run build`
3. Upload contents of `build/` folder to your hosting directory
4. Configure your domain to point to the hosting server

### 5.2 File Upload via FTP/cPanel
```bash
# Files to upload (from build folder):
├── static/
├── index.html
├── manifest.json
├── robots.txt
└── asset-manifest.json
```

## 🔐 Step 6: SSL Certificate (Recommended)

### 6.1 Using Let's Encrypt (Free)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d admin.yourdomain.com
```

### 6.2 Auto-renewal
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Step 7: Configuration for Production

### 7.1 Frontend Environment
Update your production build to use the correct API endpoints:
```bash
# Build with production environment
REACT_APP_USE_MOCK_DATA=false REACT_APP_API_URL=https://yourdomain.com/api npm run build
```

### 7.2 Backend Configuration
Ensure your backend `.env` file has:
```bash
NODE_ENV=production
PORT=3002
DB_HOST=localhost
DB_NAME=pgdesign_prod
# ... other production settings
```

## 🚀 Step 8: Launch and Test

### 8.1 Verification Checklist
- [ ] Main website loads: `https://yourdomain.com`
- [ ] Admin panel loads: `https://admin.yourdomain.com`
- [ ] API responds: `https://yourdomain.com/api/health`
- [ ] Database connection works
- [ ] File uploads function
- [ ] Forms submit correctly

### 8.2 Performance Optimization
```bash
# Enable Gzip compression in Nginx
sudo nano /etc/nginx/nginx.conf

# Add in http block:
gzip on;
gzip_vary on;
gzip_min_length 10240;
gzip_proxied expired no-cache no-store private must-revalidate;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

## 🔍 Troubleshooting

### Common Issues
1. **404 on React routes**: Ensure Nginx `try_files` is configured
2. **API not connecting**: Check firewall and PM2 process status
3. **Database connection failed**: Verify credentials and PostgreSQL service
4. **Static files not loading**: Check file permissions and paths

### Useful Commands
```bash
# Check PM2 processes
pm2 status
pm2 logs pgdesign-api

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Database connection test
psql -h localhost -U pgdesign_user -d pgdesign_prod
```

## 📞 Support

For SHost.vn specific support:
- Visit their support portal
- Check their documentation for VPS/shared hosting specifics
- Contact their technical support team

## 🎉 Deployment Complete!

Your PG Design project should now be live and accessible via your domain. Remember to:
- Monitor server resources
- Keep dependencies updated
- Regular database backups
- Monitor logs for issues 