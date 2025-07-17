#!/bin/bash
# Simple React Frontend Deployment Script for SHost.vn

echo "🚀 Deploying React Frontend to SHost.vn..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Backup original package.json
echo "📋 Backing up package.json..."
cp package.json package.json.backup

# Temporarily modify homepage for root domain deployment
echo "🔧 Configuring for root domain deployment..."
if command -v jq >/dev/null 2>&1; then
    # Use jq if available
    jq 'del(.homepage)' package.json > package.json.tmp && mv package.json.tmp package.json
else
    # Fallback: use sed to remove homepage line
    sed '/\"homepage\":/d' package.json > package.json.tmp && mv package.json.tmp package.json
fi

# Set environment for mock data (recommended for first deployment)
echo "📋 Using mock data for deployment..."
export REACT_APP_USE_MOCK_DATA=true

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React application
echo "🔨 Building React application..."
npm run build

# Restore original package.json
echo "🔄 Restoring original package.json..."
mv package.json.backup package.json

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed! Please check for errors above."
    exit 1
fi

# Create deployment package
echo "📁 Creating deployment package..."
rm -rf frontend-deployment
mkdir frontend-deployment
cp -r build/* frontend-deployment/

# Get build size
BUILD_SIZE=$(du -sh frontend-deployment | cut -f1)

echo "✅ React frontend ready for deployment!"
echo ""
echo "📊 Deployment Summary:"
echo "   📁 Package size: $BUILD_SIZE"
echo "   📂 Location: ./frontend-deployment/"
echo "   🎭 Using: Mock data (REACT_APP_USE_MOCK_DATA=true)"
echo "   🌐 Configured: For root domain (not subdirectory)"
echo ""
echo "📋 Next steps:"
echo "1. Upload all files from 'frontend-deployment/' folder to your SHost.vn hosting directory"
echo "2. Configure your domain DNS at https://dns.shost.vn/index.php?view=1"
echo "3. Wait for DNS propagation (15-30 minutes)"
echo "4. Visit your website!"
echo ""
echo "📁 Files to upload:"
ls -la frontend-deployment/ 