Local data files

- world-50m.json — TopoJSON of world countries (50m resolution)

How to obtain

- Direct download (recommended):
  curl -L https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json -o public/data/world-50m.json

- Alternative (npm, if you prefer generating locally):
  npm i -D world-atlas topojson-client
  # Copy the packaged TopoJSON file into public
  cp node_modules/world-atlas/countries-50m.json public/data/world-50m.json

Notes

- The app prefers the local file at /data/world-50m.json and falls back to the CDN if it’s missing.
- Keeping a local copy reduces first-paint variability and avoids a runtime network fetch for the map.
