#!/bin/bash

echo "🧪 Testing VNData S3 APIs"
echo "=========================================="
echo ""

# Test 1: Check server running
echo "📋 Test 1: Server Health Check"
if curl -s http://localhost:3002/api/v1/projectdetail > /dev/null 2>&1; then
  echo "  ✅ Backend server running"
else
  echo "  ❌ Backend server not responding"
  exit 1
fi

# Test 2: Get projects and check URLs
echo ""
echo "�� Test 2: GET /projectdetail - Check VNData URLs"
curl -s http://localhost:3002/api/v1/projectdetail | python3 -c "
import sys, json
d = json.load(sys.stdin)
if d.get('success') and d.get('data'):
  p = d['data'][0]
  url = p.get('thumbnailImage', '')
  uses_vndata = 's3cloud.vn' in url
  print(f'  ✅ Found {len(d[\"data\"])} projects')
  print(f'  📦 First: {p.get(\"title\",\"\")}')
  print(f'  🔗 URL: {url[:70]}...')
  print(f'  🇻🇳 VNData: {\"✅ YES\" if uses_vndata else \"❌ NO (using: \" + url.split(\"/\")[2] + \")\"}')"

# Test 3: Upload test
echo ""
echo "📋 Test 3: POST /upload/image - Test Upload"
RESPONSE=$(curl -s -X POST http://localhost:3002/api/v1/upload/image \
  -F "image=@/tmp/test-image.png" \
  -F "folder=vndata-api-test")

echo "$RESPONSE" | python3 -c "
import sys, json
try:
  d = json.load(sys.stdin)
  if d.get('success'):
    url = d['data']['url']
    uses_vndata = 's3cloud.vn' in url
    print(f'  ✅ Upload successful')
    print(f'  🔗 URL: {url[:70]}...')
    print(f'  🇻🇳 VNData: {\"✅ YES\" if uses_vndata else \"❌ NO\"}')
  else:
    print(f'  ❌ Upload failed: {d.get(\"message\",\"Unknown\")}')
except:
  print('  ❌ Invalid response')
"

# Test 4: Check VNData accessibility  
echo ""
echo "📋 Test 4: VNData Image Accessibility"
if curl -s -I "https://s3-hcm-r2.s3cloud.vn/pgdesign-assets/project-details/appartment-001/phu-gia-hung-01.png" | grep "200 OK" > /dev/null; then
  echo "  ✅ VNData images accessible"
  echo "  🔗 https://s3-hcm-r2.s3cloud.vn/pgdesign-assets/..."
else
  echo "  ❌ VNData images not accessible"
fi

echo ""
echo "=========================================="
echo "🎉 VNData S3 API Tests Complete!"
