#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       Fix Category Background Images - Quick Script          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Must run from project root directory"
  echo "   cd /Users/huy.hoang/Desktop/pgdesign"
  exit 1
fi

echo "1️⃣  Checking API response..."
api_check=$(curl -s http://localhost:3002/api/v1/projectpage/project-categories | jq -r '.data.categories[0].backgroundImageUrl')

if [ -z "$api_check" ] || [ "$api_check" == "null" ]; then
  echo "   ❌ API not returning backgroundImageUrl"
  echo "   Backend may need to restart"
  exit 1
else
  echo "   ✅ API returning: $api_check"
fi

echo ""
echo "2️⃣  Clearing frontend cache..."

# Clear various caches
rm -rf node_modules/.cache
rm -rf .cache
rm -rf build/.cache
rm -rf dist/.cache

echo "   ✅ Cache cleared"

echo ""
echo "3️⃣  Next steps:"
echo "   📝 Option A: Restart dev server"
echo "      - Stop current server (Ctrl+C)"
echo "      - Run: npm start"
echo ""
echo "   📝 Option B: Hard reload browser"
echo "      - Press: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)"
echo "      - Or: Right-click Reload → Empty Cache and Hard Reload"
echo ""
echo "   📝 Option C: Clear browser storage"
echo "      - Open DevTools (F12)"
echo "      - Console → Run: localStorage.clear(); location.reload(true)"
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    Fix Applied ✅                            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Test after refresh:"
echo "• Category cards should show background images"
echo "• Images from: https://s3-hcm-r2.s3cloud.vn/"
echo ""

