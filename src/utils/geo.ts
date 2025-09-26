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

// Build smooth arc paths with distance-based curvature
export function buildArcD(
  projection: (lonlat: [number, number]) => [number, number],
  from: [number, number], // [lon,lat]
  to: [number, number]
) {
  const [x1, y1] = projection(from)!;
  const [x2, y2] = projection(to)!;
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.hypot(dx, dy);

  // curvature scales with distance (tweak 0.28–0.35)
  const lift = Math.min(120, Math.max(30, dist * 0.32));
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - lift;

  return `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`;
}
