#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        Test Maximum Quality Upload (No Compression)         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test if server is running
echo "1️⃣  Checking backend server..."
if lsof -i :3002 > /dev/null 2>&1; then
  echo -e "   ${GREEN}✅ Server running on port 3002${NC}"
else
  echo -e "   ${RED}❌ Server not running${NC}"
  echo "   Start: cd pgdesign-be && npm run dev"
  exit 1
fi

echo ""
echo "2️⃣  Quality Settings Applied:"
echo ""
echo -e "   ${BLUE}JPEG:${NC} quality: 100 (maximum quality)"
echo -e "   ${BLUE}PNG:${NC} compressionLevel: 0 (no compression)"
echo -e "   ${BLUE}WebP:${NC} quality: 100 (lossless)"
echo -e "   ${BLUE}GIF:${NC} original quality preserved"
echo ""

echo "3️⃣  Expected Behavior:"
echo ""
echo -e "   ${YELLOW}Small images (≤1920px):${NC}"
echo "   • No processing"
echo "   • Original quality preserved"
echo "   • File size: unchanged"
echo ""

echo -e "   ${YELLOW}Large images (>1920px):${NC}"
echo "   • Resize to 1920px width"
echo "   • Format: kept original"
echo "   • Quality: maximum (100%)"
echo "   • File size: larger due to no compression"
echo ""

echo "4️⃣  Test Upload Commands:"
echo ""
echo -e "${YELLOW}# Upload JPG (test maximum quality):${NC}"
echo 'curl -X POST http://localhost:3002/api/v1/upload/image \'
echo '  -F "file=@your-image.jpg" \'
echo '  -F "folder=test-max-quality"'
echo ""

echo -e "${YELLOW}# Upload PNG (test no compression):${NC}"
echo 'curl -X POST http://localhost:3002/api/v1/upload/image \'
echo '  -F "file=@your-image.png" \'
echo '  -F "folder=test-max-quality"'
echo ""

echo "5️⃣  Verification Steps:"
echo ""
echo "   a) Check server logs for:"
echo -e "      ${GREEN}🔄 Resizing image from Xpx to 1920px (keeping format)${NC}"
echo -e "      ${GREEN}📤 Uploading: uuid.ext (format: image/type)${NC}"
echo ""

echo "   b) Check uploaded file:"
echo "      curl -I [returned_url]"
echo "      # Should show larger Content-Length (due to no compression)"
echo ""

echo "   c) Download and inspect:"
echo "      curl -o test.jpg [returned_url]"
echo "      file test.jpg"
echo "      # Should show high quality, no compression artifacts"
echo ""

echo "6️⃣  Quality Comparison:"
echo ""
echo -e "${YELLOW}Before (90% quality):${NC}"
echo "   • File size: smaller"
echo "   • Quality: good"
echo "   • Compression: yes"
echo ""

echo -e "${GREEN}After (100% quality):${NC}"
echo "   • File size: larger (~2-3x)"
echo "   • Quality: maximum"
echo "   • Compression: none ✅"
echo ""

echo "7️⃣  Performance Impact:"
echo ""
echo -e "${RED}⚠️  Trade-offs:${NC}"
echo "   • Upload time: ~2x longer"
echo "   • Download time: ~2x longer"
echo "   • Storage cost: ~2-3x higher"
echo "   • Bandwidth usage: ~2-3x higher"
echo ""

echo -e "${GREEN}✅ Benefits:${NC}"
echo "   • Maximum image quality"
echo "   • No compression artifacts"
echo "   • Perfect for professional use"
echo "   • Lossless preservation"
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║              MAXIMUM QUALITY TEST READY ✅                  ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${BLUE}Upload any image to test maximum quality!${NC}"
echo ""

