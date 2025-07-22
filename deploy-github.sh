#!/bin/bash
# Deploy React Frontend to GitHub Pages

echo "🚀 Deploying React App to GitHub Pages..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository. Please run 'git init' first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Set environment for mock data (recommended for GitHub Pages)
echo "📋 Using mock data for GitHub Pages deployment..."
export REACT_APP_USE_MOCK_DATA=true

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "   It's recommended to commit your changes before deploying."
    echo "   Continue anyway? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled."
        exit 1
    fi
fi

# Build and deploy to GitHub Pages
echo "🔨 Building and deploying to GitHub Pages..."
npm run deploy

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo ""
    echo "📊 Deployment Summary:"
    echo "   🎭 Using: Mock data (REACT_APP_USE_MOCK_DATA=true)"
    echo "   🌐 Platform: GitHub Pages"
    echo "   📡 Branch: gh-pages"
    echo ""
    echo "🌍 Your website will be live at:"
    echo "   https://$(git config --get remote.origin.url | sed 's/.*github.com[\/:]//; s/\.git$//' | sed 's/\//\.github\.io\//')"
    echo ""
    echo "⏱️  Note: GitHub Pages may take 2-10 minutes to update."
    echo "   Check your repository's Pages settings if needed."
else
    echo "❌ Deployment failed! Please check the errors above."
    exit 1
fi 