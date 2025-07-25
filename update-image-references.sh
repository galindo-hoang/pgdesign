#!/bin/bash

# Update all file references from .jpg to .png
# This script will update references in TypeScript, JavaScript, and CSS files

echo "🔄 Starting to update image file references from .jpg to .png..."

# Create backup of modified files
BACKUP_DIR="code_backup_$(date +%Y%m%d_%H%M%S)"
echo "📁 Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Function to update references in a file
update_file_references() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    # Create backup
    cp "$file" "$BACKUP_DIR/"
    
    # Update .jpg to .png references
    if sed 's/\.jpg/\.png/g' "$file" > "$temp_file"; then
        mv "$temp_file" "$file"
        echo "  ✅ Updated: $file"
        return 0
    else
        echo "  ❌ Failed: $file"
        rm -f "$temp_file"
        return 1
    fi
}

# Update TypeScript/JavaScript files
echo "🔄 Updating TypeScript/JavaScript files..."
ts_js_files=$(find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./build/*" -not -path "./dist/*")
ts_js_count=0

for file in $ts_js_files; do
    if grep -q "\.jpg" "$file"; then
        if update_file_references "$file"; then
            ((ts_js_count++))
        fi
    fi
done

echo "  📊 Updated $ts_js_count TypeScript/JavaScript files"

# Update CSS files
echo "🔄 Updating CSS files..."
css_files=$(find . -type f -name "*.css" -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./build/*" -not -path "./dist/*")
css_count=0

for file in $css_files; do
    if grep -q "\.jpg" "$file"; then
        if update_file_references "$file"; then
            ((css_count++))
        fi
    fi
done

echo "  📊 Updated $css_count CSS files"

# Update JSON files (for package.json, etc.)
echo "🔄 Updating JSON files..."
json_files=$(find . -type f -name "*.json" -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./build/*" -not -path "./dist/*")
json_count=0

for file in $json_files; do
    if grep -q "\.jpg" "$file"; then
        if update_file_references "$file"; then
            ((json_count++))
        fi
    fi
done

echo "  📊 Updated $json_count JSON files"

# Update HTML files
echo "🔄 Updating HTML files..."
html_files=$(find . -type f -name "*.html" -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./build/*" -not -path "./dist/*")
html_count=0

for file in $html_files; do
    if grep -q "\.jpg" "$file"; then
        if update_file_references "$file"; then
            ((html_count++))
        fi
    fi
done

echo "  📊 Updated $html_count HTML files"

total_updated=$((ts_js_count + css_count + json_count + html_count))

echo ""
echo "🎉 File reference updates completed!"
echo "📊 Total files updated: $total_updated"
echo "  - TypeScript/JavaScript: $ts_js_count"
echo "  - CSS: $css_count"
echo "  - JSON: $json_count"
echo "  - HTML: $html_count"
echo "📁 Backup created in: $BACKUP_DIR"
echo ""
echo "⚠️  Next steps:"
echo "1. Test your application to ensure all images load correctly"
echo "2. Check for any remaining .jpg references that might have been missed"
echo "3. Remove the backup directory when you're satisfied"
echo ""
echo "🔍 To check for remaining .jpg references:"
echo "   grep -r '\.jpg' . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=build --exclude-dir=dist" 