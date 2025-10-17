#!/bin/bash

# Team Images Optimization Script
# This script creates optimized versions of team images for different screen sizes
# Since we use output: 'export', Next.js Image Optimization API doesn't work

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting team images optimization...${NC}"

# Check if ImageMagick or sharp-cli is installed
if ! command -v convert &> /dev/null && ! command -v sharp &> /dev/null; then
    echo -e "${RED}Error: Neither ImageMagick nor sharp-cli is installed.${NC}"
    echo "Install one of them:"
    echo "  brew install imagemagick  (macOS)"
    echo "  npm install -g sharp-cli"
    exit 1
fi

# Directories
INPUT_DIR="public/images/team"
OUTPUT_DIR="public/images/team/optimized"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Image sizes for responsive loading
# Leadership: 128px desktop, 96px mobile
# Advisors: 96px desktop, 80px mobile
SIZES=(128 96 80)

echo -e "${YELLOW}Processing images...${NC}"

# Process each WebP image
for img in "$INPUT_DIR"/*.webp; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .webp)
        echo "Processing: $filename.webp"
        
        # Generate each size
        for size in "${SIZES[@]}"; do
            output_file="$OUTPUT_DIR/${filename}-${size}w.webp"
            
            # Use ImageMagick if available
            if command -v convert &> /dev/null; then
                # Resize without cropping, maintain aspect ratio
                convert "$img" -resize "${size}x${size}" -quality 85 "$output_file"
            # Otherwise use sharp-cli
            elif command -v sharp &> /dev/null; then
                # Use 'inside' fit to avoid cropping
                sharp resize $size $size --fit inside --quality 85 --input "$img" --output "$output_file"
            fi
            
            if [ -f "$output_file" ]; then
                original_size=$(du -h "$img" | cut -f1)
                new_size=$(du -h "$output_file" | cut -f1)
                echo -e "  ${GREEN}✓${NC} ${size}x${size} - ${original_size} → ${new_size}"
            fi
        done
    fi
done

echo -e "${GREEN}✓ Optimization complete!${NC}"
echo -e "${YELLOW}Note: Update TeamSection.tsx to use optimized images${NC}"
echo ""
echo "Example usage:"
echo "  <Image src={\\`/images/team/optimized/\\${member.image.replace('.webp', '-128w.webp')}\\`} ... />"

