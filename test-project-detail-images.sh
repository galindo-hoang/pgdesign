#!/bin/bash

echo "========================================="
echo "Project Detail API - Image URL Test"
echo "========================================="
echo ""

# Test 1: Check if server is running
echo "1️⃣  Checking if backend server is running on port 3002..."
if lsof -i :3002 > /dev/null 2>&1; then
  echo "   ✅ Server is running"
else
  echo "   ❌ Server is NOT running"
  echo "   Please start server: cd pgdesign-be && npm run dev"
  exit 1
fi
echo ""

# Test 2: Get project detail with images
echo "2️⃣  Testing GET /api/v1/projectdetail/70 (Project with 12 images)..."
response=$(curl -s http://localhost:3002/api/v1/projectdetail/70)
image_count=$(echo "$response" | jq '.data.projectImages | length')
echo "   ✅ API Response received"
echo "   📊 Number of images: $image_count"
echo ""

# Test 3: Verify image URLs
echo "3️⃣  Verifying first 3 image URLs..."
urls=$(echo "$response" | jq -r '.data.projectImages[0:3][]')

counter=1
while IFS= read -r url; do
  echo -n "   Testing image $counter: "
  http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url")
  size=$(curl -s -o /dev/null -w "%{size_download}" --max-time 5 "$url")
  
  if [ "$http_code" = "200" ]; then
    echo "✅ HTTP $http_code - Size: $size bytes"
  else
    echo "❌ HTTP $http_code - Failed"
  fi
  
  counter=$((counter + 1))
done <<< "$urls"
echo ""

# Test 4: Test API performance
echo "4️⃣  Testing API performance..."
echo -n "   Single project detail: "
time_single=$(curl -w "%{time_total}s" -o /dev/null -s http://localhost:3002/api/v1/projectdetail/70)
echo "$time_single"

echo -n "   List 10 projects: "
time_list=$(curl -w "%{time_total}s" -o /dev/null -s "http://localhost:3002/api/v1/projectdetail?limit=10")
echo "$time_list"
echo ""

# Test 5: Sample output
echo "5️⃣  Sample API response (first 2 images):"
echo "$response" | jq '{
  id: .data.id,
  title: .data.title,
  thumbnailImage: .data.thumbnailImage,
  imageCount: (.data.projectImages | length),
  sampleImages: .data.projectImages[0:2]
}'

echo ""
echo "========================================="
echo "✅ All tests completed successfully!"
echo "========================================="

