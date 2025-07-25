#!/bin/bash

# Convert all JPG files to PNG format
# This script will convert all .jpg and .jpeg files to .png format

echo "🔄 Starting image conversion from JPG to PNG..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Please install it first:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Create backup directory
BACKUP_DIR="image_backup_$(date +%Y%m%d_%H%M%S)"
echo "📁 Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Function to convert images in a directory
convert_images_in_dir() {
    local dir="$1"
    local count=0
    
    echo "🔄 Processing directory: $dir"
    
    # Find all JPG files in the directory
    while IFS= read -r -d '' file; do
        # Get directory and filename
        dirname=$(dirname "$file")
        basename=$(basename "$file")
        name_without_ext="${basename%.*}"
        
        # Create backup
        cp "$file" "$BACKUP_DIR/"
        
        # Convert to PNG
        png_file="$dirname/${name_without_ext}.png"
        echo "  Converting: $file -> $png_file"
        
        if convert "$file" "$png_file"; then
            echo "  ✅ Success: $png_file"
            # Remove original JPG file
            rm "$file"
            ((count++))
        else
            echo "  ❌ Failed: $file"
        fi
    done < <(find "$dir" -type f \( -name "*.jpg" -o -name "*.jpeg" \) -print0)
    
    echo "  📊 Converted $count files in $dir"
    return $count
}

# Convert images in main directories
total_converted=0

# Convert in public/assets
if [ -d "public/assets" ]; then
    count=$(convert_images_in_dir "public/assets")
    total_converted=$((total_converted + count))
fi

# Convert in src/assets
if [ -d "src/assets" ]; then
    count=$(convert_images_in_dir "src/assets")
    total_converted=$((total_converted + count))
fi

# Convert in src/public/assets
if [ -d "src/public/assets" ]; then
    count=$(convert_images_in_dir "src/public/assets")
    total_converted=$((total_converted + count))
fi

# Convert in static/media
if [ -d "static/media" ]; then
    count=$(convert_images_in_dir "static/media")
    total_converted=$((total_converted + count))
fi

echo ""
echo "🎉 Conversion completed!"
echo "📊 Total files converted: $total_converted"
echo "📁 Backup created in: $BACKUP_DIR"
echo ""
echo "⚠️  Next steps:"
echo "1. Update your code to reference .png files instead of .jpg"
echo "2. Test your application to ensure all images load correctly"
echo "3. Remove the backup directory when you're satisfied"
echo ""
echo "💡 To update file references, you can use:"
echo "   find . -name '*.tsx' -o -name '*.ts' -o -name '*.js' -o -name '*.jsx' | xargs sed -i '' 's/\.jpg/\.png/g'"
echo "   find . -name '*.css' | xargs sed -i '' 's/\.jpg/\.png/g'" 