#!/bin/bash

echo "========================================="
echo "Project Categories - Background Images Test"
echo "========================================="
echo ""

# Test API
echo "1️⃣  Testing API: /api/v1/projectpage/project-categories"
response=$(curl -s http://localhost:3002/api/v1/projectpage/project-categories)

if [ $? -eq 0 ]; then
  echo "   ✅ API responded successfully"
else
  echo "   ❌ API failed"
  exit 1
fi

echo ""
echo "2️⃣  Categories with background images:"
echo "$response" | jq -r '.data.categories[] | "   • \(.categoryId): \(.backgroundImageUrl)"'

echo ""
echo "3️⃣  Testing image URLs availability..."

urls=$(echo "$response" | jq -r '.data.categories[].backgroundImageUrl')
count=0
success=0

while IFS= read -r url; do
  count=$((count + 1))
  filename=$(basename "$url")
  echo -n "   $count. $filename ... "
  
  http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url")
  size=$(curl -s -o /dev/null -w "%{size_download}" --max-time 5 "$url")
  
  if [ "$http_code" = "200" ]; then
    echo "✅ HTTP $http_code - Size: $size bytes"
    success=$((success + 1))
  else
    echo "❌ HTTP $http_code - Failed"
  fi
done <<< "$urls"

echo ""
echo "========================================="
echo "Results: $success/$count images working"
if [ $success -eq $count ]; then
  echo "✅ All category background images are working!"
else
  echo "⚠️  Some images failed"
fi
echo "========================================="

