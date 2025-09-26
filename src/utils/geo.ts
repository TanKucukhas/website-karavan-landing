// Geo utilities for coordinate normalization and validation

export function normalizeLonLat([lon, lat]: [number, number]): [number, number] {
  // Eğer lon 90'dan küçükse ve lat 180'den büyükse, muhtemelen ters çevrilmiş
  if (Math.abs(lon) <= 90 && Math.abs(lat) > 90) {
    // muhtemelen lat,lon gönderilmiş; çevir
    return [lat, lon] as [number, number];
  }
  return [lon, lat] as [number, number];
}

// Debug helper for coordinate validation
export function validateCoordinates(lon: number, lat: number): boolean {
  return lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}
