// Country centroid utilities using topojson-client

import { feature } from 'topojson-client';
import { geoCentroid } from 'd3-geo';

type ISO3 = string;
let cache: Record<ISO3, [number, number]> = {};

// ISO3 to country ID mapping for world-atlas
const ISO3_TO_ID: Record<string, string> = {
  'TUR': '792',  // Turkey
  'UZB': '860',  // Uzbekistan  
  'KAZ': '398',  // Kazakhstan
  'AZE': '031',  // Azerbaijan
  'KGZ': '417',  // Kyrgyzstan
  'TKM': '795',  // Turkmenistan
  'HUN': '348',  // Hungary
};

export async function getCountryCentroid(iso3: ISO3): Promise<[number, number]> {
  if (cache[iso3]) return cache[iso3];
  
  try {
    const topo = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json());
    
    const countries = feature(topo, topo.objects.countries) as any;
    const countryId = ISO3_TO_ID[iso3];
    
    if (!countryId) {
      throw new Error(`Country ID not found for ISO3: ${iso3}`);
    }
    
    const found = countries.features.find((f: any) => f.id === countryId);
    if (!found) {
      throw new Error(`Country not found: ${iso3} (ID: ${countryId})`);
    }
    
    const [lon, lat] = geoCentroid(found) as [number, number];
    cache[iso3] = [lon, lat];
    return cache[iso3];
  } catch (error) {
    console.error(`Failed to get centroid for ${iso3}:`, error);
    // Fallback to approximate coordinates
    const fallbackCoords: Record<string, [number, number]> = {
      'TUR': [35.2433, 38.9637],  // Turkey
      'UZB': [64.5853, 41.3775],  // Uzbekistan
      'KAZ': [66.9237, 48.0196],  // Kazakhstan
      'AZE': [47.5769, 40.1431],  // Azerbaijan
      'KGZ': [74.7661, 41.2044], // Kyrgyzstan
      'TKM': [59.5563, 38.9697], // Turkmenistan
      'HUN': [19.5033, 47.1625], // Hungary
    };
    return fallbackCoords[iso3] || [0, 0];
  }
}
