declare module 'd3-geo' {
  export function geoMercator(): {
    scale: (scale: number) => unknown;
    translate: (translate: [number, number]) => unknown;
  };
}
