#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          Test Image Upload - Format Preservation            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test if server is running
echo "1️⃣  Checking if backend server is running..."
if lsof -i :3002 > /dev/null 2>&1; then
  echo -e "   ${GREEN}✅ Server is running on port 3002${NC}"
else
  echo -e "   ${RED}❌ Server is NOT running${NC}"
  echo "   Please start: cd pgdesign-be && npm run dev"
  exit 1
fi

echo ""
echo "2️⃣  Creating test images..."

# Create test directory
mkdir -p /tmp/image-upload-test
cd /tmp/image-upload-test

# Create test images using ImageMagick if available
if command -v convert &> /dev/null; then
  echo "   📸 Creating test JPG (2000x1500)..."
  convert -size 2000x1500 gradient:blue-red test-large.jpg 2>/dev/null
  
  echo "   📸 Creating test PNG (800x600)..."
  convert -size 800x600 gradient:green-yellow test-small.png 2>/dev/null
  
  echo -e "   ${GREEN}✅ Test images created${NC}"
else
  echo -e "   ${YELLOW}⚠️  ImageMagick not installed, skip image creation${NC}"
  echo "   Please manually create test images and use curl commands below"
fi

echo ""
echo "3️⃣  Upload Instructions:"
echo ""
echo "To test upload via API:"
echo ""
echo -e "${YELLOW}# Upload JPG (large):${NC}"
echo 'curl -X POST http://localhost:3002/api/v1/upload/image \'
echo '  -F "file=@test-large.jpg" \'
echo '  -F "folder=test"'
echo ""

echo -e "${YELLOW}# Upload PNG (small):${NC}"
echo 'curl -X POST http://localhost:3002/api/v1/upload/image \'
echo '  -F "file=@test-small.png" \'
echo '  -F "folder=test"'
echo ""

echo "4️⃣  Expected Behavior:"
echo ""
echo "   ${GREEN}JPG upload (2000x1500):${NC}"
echo "   • Will be resized to 1920px width"
echo "   • Format: STAYS JPG ✅"
echo "   • Content-Type: image/jpeg"
echo "   • Extension: .jpg"
echo ""

echo "   ${GREEN}PNG upload (800x600):${NC}"
echo "   • No resize (already < 1920px)"
echo "   • Format: STAYS PNG ✅"
echo "   • Content-Type: image/png"
echo "   • Extension: .png"
echo ""

echo "5️⃣  Verification:"
echo ""
echo "After upload, check logs:"
echo ""
echo -e "${YELLOW}For large image:${NC}"
echo "   🔄 Resizing image from 2000px to 1920px (keeping image/jpeg format)"
echo "   📤 Uploading: uuid.jpg (format: image/jpeg)"
echo ""

echo -e "${YELLOW}For small image:${NC}"
echo "   ✅ Image size OK (800px), keeping original format: image/png"
echo "   📤 Uploading: uuid.png (format: image/png)"
echo ""

echo "6️⃣  Check uploaded file:"
echo ""
echo "   # Get file info"
echo "   curl -I [returned_url]"
echo ""
echo "   # Should show:"
echo "   Content-Type: image/jpeg  (for JPG)"
echo "   Content-Type: image/png   (for PNG)"
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    Test Ready ✅                             ║"
echo "╚══════════════════════════════════════════════════════════════╝"

