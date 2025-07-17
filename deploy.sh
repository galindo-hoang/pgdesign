#!/bin/bash
# Deployment script for SHost.vn hosting

echo "🚀 Starting deployment preparation for SHost.vn..."

# Build React Frontend
echo "📦 Building React frontend..."
npm install
npm run build

# Build Admin Panel
echo "📦 Building admin panel..."
cd webadmin
npm install
npm run build
cd ..

# Prepare Backend
echo "📦 Preparing backend..."
cd pgdesign-be
npm install
npm run build
cd ..

# Create deployment package
echo "📁 Creating deployment package..."
mkdir -p deployment
cp -r build deployment/frontend
cp -r webadmin/build deployment/admin
cp -r pgdesign-be deployment/backend

echo "✅ Deployment package ready in 'deployment' folder"
echo "📋 Next steps:"
echo "1. Upload 'deployment/frontend' to your web hosting directory"
echo "2. Upload 'deployment/backend' to your server (if using VPS)"
echo "3. Set up database and environment variables"
echo "4. Configure your domain DNS settings" 