// Global cache for world data to prevent multiple fetches
let worldDataCache: any = null;
let worldDataPromise: Promise<any> | null = null;

const WORLD_LOCAL = '/data/world-50m.json';
const WORLD_CDN = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

export async function getWorldData(): Promise<any> {
  // Return cached data if available
  if (worldDataCache) {
    return worldDataCache;
  }

  // Return existing promise if already loading
  if (worldDataPromise) {
    return worldDataPromise;
  }

  // Create new promise for loading
  worldDataPromise = (async () => {
    try {
      // Try local file first
      const res = await fetch(WORLD_LOCAL, { 
        cache: 'force-cache',
        headers: {
          'Cache-Control': 'max-age=3600' // 1 hour cache
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        worldDataCache = data;
        return data;
      }
    } catch (error) {
      console.warn('Local world data not available, falling back to CDN');
    }

    try {
      // Fallback to CDN
      const res = await fetch(WORLD_CDN, {
        cache: 'force-cache',
        headers: {
          'Cache-Control': 'max-age=3600' // 1 hour cache
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        worldDataCache = data;
        return data;
      }
    } catch (error) {
      console.error('Failed to load world data from CDN:', error);
      throw error;
    }
  })();

  return worldDataPromise;
}

// Clear cache function (useful for development)
export function clearWorldDataCache() {
  worldDataCache = null;
  worldDataPromise = null;
}
