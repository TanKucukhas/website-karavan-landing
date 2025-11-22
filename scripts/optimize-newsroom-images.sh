#!/bin/bash

# Newsroom Image Optimization Script
# Converts images to WebP format with compression
# Header images: max 1920px width, 70% quality
# Content images: max 1200px width, 70% quality

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo -e "${RED}Error: ImageMagick is not installed${NC}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Use 'magick' if available, otherwise fall back to 'convert'
if command -v magick &> /dev/null; then
    CONVERT_CMD="magick"
else
    CONVERT_CMD="convert"
fi

# Configuration
HEADER_MAX_WIDTH=1920
CONTENT_MAX_WIDTH=1200
QUALITY=70
NEWSROOM_DIR="public/images/newsroom"

echo -e "${GREEN}=== Newsroom Image Optimization ===${NC}"
echo "Header max width: ${HEADER_MAX_WIDTH}px"
echo "Content max width: ${CONTENT_MAX_WIDTH}px"
echo "WebP quality: ${QUALITY}%"
echo ""

# Function to optimize image
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    local max_width="$3"
    local quality="$4"

    echo -e "${YELLOW}Processing:${NC} $(basename "$input_file")"

    # Get original dimensions
    local original_size=$(identify -format "%wx%h" "$input_file" 2>/dev/null)
    local original_filesize=$(ls -lh "$input_file" | awk '{print $5}')

    # Convert to WebP with resizing and quality
    $CONVERT_CMD "$input_file" \
        -resize "${max_width}x>" \
        -quality "$quality" \
        -define webp:method=6 \
        -strip \
        "$output_file"

    # Get new dimensions and filesize
    local new_size=$(identify -format "%wx%h" "$output_file" 2>/dev/null)
    local new_filesize=$(ls -lh "$output_file" | awk '{print $5}')

    echo -e "${GREEN}  ✓${NC} ${original_size} (${original_filesize}) → ${new_size} (${new_filesize})"
}

# Function to process header image
process_header() {
    local post_folder="$1"
    local source_image="$2"
    local variant_suffix="${3:-}"  # Optional: -tr, -ru, etc.

    local output_name="header${variant_suffix}.webp"
    local output_path="${NEWSROOM_DIR}/${post_folder}/${output_name}"

    if [ ! -f "$source_image" ]; then
        echo -e "${RED}Error:${NC} Source image not found: $source_image"
        return 1
    fi

    optimize_image "$source_image" "$output_path" "$HEADER_MAX_WIDTH" "$QUALITY"
}

# Function to process content image
process_content() {
    local post_folder="$1"
    local source_image="$2"
    local image_name="$3"

    local output_path="${NEWSROOM_DIR}/${post_folder}/content/${image_name}.webp"

    if [ ! -f "$source_image" ]; then
        echo -e "${RED}Error:${NC} Source image not found: $source_image"
        return 1
    fi

    optimize_image "$source_image" "$output_path" "$CONTENT_MAX_WIDTH" "$QUALITY"
}

# Main processing
echo -e "${GREEN}Processing newsroom images...${NC}\n"

# News ID "1" - TDT Forum
echo -e "${YELLOW}[1/3]${NC} TDT Forum Post"
process_header "karavan-partners-tdt-tashkent-forum" \
    "${NEWSROOM_DIR}/tdt-forum-main-hq.jpg"
echo ""

# News ID "2" - Orta Koridor Growth
echo -e "${YELLOW}[2/3]${NC} Orta Koridor Growth Post"
process_header "tdt-forum-orta-koridor-growth" \
    "${NEWSROOM_DIR}/tdt-forum-02-hq.jpg"
echo ""

# News ID "3" - ISO Certification
echo -e "${YELLOW}[3/3]${NC} ISO Certification Post"
process_header "karavan-advances-iso-certification-turkiye" \
    "${NEWSROOM_DIR}/news-iso.jpg"
echo ""

echo -e "${GREEN}=== Optimization Complete ===${NC}"
echo -e "${YELLOW}Note:${NC} Original JPEG files are still present. Run cleanup script to remove them."
