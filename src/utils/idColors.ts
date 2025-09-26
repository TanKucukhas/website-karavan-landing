// Numeric ID to color mapping for active countries
export const ID_TO_COLOR: Record<number, string> = {
  792: '#e67e7e', // Turkey → pastel red
  860: '#7bb3a8', // Uzbekistan → pastel teal
  398: '#7bb3f0', // Kazakhstan → pastel blue
  31: '#7bb3a8',  // Azerbaijan → pastel green
  348: '#8a9b8a'  // Hungary → pastel gray-green
};

// Pastel colors with opacity for different uses
export const PASTEL_COLORS = {
  TR: '#e67e7e',  // Turkey
  UZ: '#7bb3a8',  // Uzbekistan
  KZ: '#7bb3f0',  // Kazakhstan
  AZ: '#7bb3a8',  // Azerbaijan
  HU: '#8a9b8a',  // Hungary
};

// Colors with opacity for fill
export const FILL_COLORS = {
  TR: '#e67e7e40',  // Turkey with 25% opacity
  UZ: '#7bb3a840',  // Uzbekistan with 25% opacity
  KZ: '#7bb3f040',  // Kazakhstan with 25% opacity
  AZ: '#7bb3a840',  // Azerbaijan with 25% opacity
  HU: '#8a9b8a40',  // Hungary with 25% opacity
};

// Colors with opacity for borders
export const BORDER_COLORS = {
  TR: '#e67e7e60',  // Turkey with 37% opacity
  UZ: '#7bb3a860',  // Uzbekistan with 37% opacity
  KZ: '#7bb3f060',  // Kazakhstan with 37% opacity
  AZ: '#7bb3a860',  // Azerbaijan with 37% opacity
  HU: '#8a9b8a60',  // Hungary with 37% opacity
};
