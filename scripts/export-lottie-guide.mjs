#!/usr/bin/env node
// Exports an SVG guide (1024x520) with projected country shapes (TR, UZ, KZ, AZ, HU),
// node positions, and arc paths matching the app's TradeMap projection.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as d3 from 'd3-geo';
import { feature as topoFeature } from 'topojson-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT = path.resolve(__dirname, '..', 'public', 'lottie', 'guide-1024x520.svg');
const LOCAL_TOPO = path.resolve(__dirname, '..', 'public', 'data', 'world-50m.json');
const CDN_TOPO = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Projection must match app
const width = 1024, height = 520;
const projection = d3.geoMercator().center([35,39]).scale(180).translate([512,260]);
const geoPath = d3.geoPath(projection);

const COUNTRY_IDS = { TR: 792, UZ: 860, KZ: 398, AZ: 31, HU: 348 };

const NODES = [
  ['TR-IST', 28.9784, 41.0082],
  ['UZ-TAS', 69.2401, 41.2995],
  ['KZ-ALM', 76.885, 43.2389],
  ['AZ-BAK', 49.8671, 40.4093],
  ['HU-BUD', 19.0402, 47.4979],
];

const ARCS = [
  ['TR-IST','UZ-TAS',2],
  ['TR-IST','KZ-ALM',1],
  ['TR-IST','AZ-BAK',1],
  ['TR-IST','HU-BUD',1],
  ['UZ-TAS','KZ-ALM',1],
  ['KZ-ALM','AZ-BAK',1],
];

function buildArcD(p, fromLonLat, toLonLat){
  const a = p(fromLonLat); const b = p(toLonLat);
  if(!a||!b) return 'M0,0';
  const [x1,y1]=a, [x2,y2]=b;
  const dx=x2-x1, dy=y2-y1; const dist=Math.hypot(dx,dy);
  const lift=Math.min(120, Math.max(30, dist*0.32));
  const mx=(x1+x2)/2, my=(y1+y2)/2 - lift;
  return `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`;
}

async function loadWorld() {
  try {
    const buf = await fs.readFile(LOCAL_TOPO);
    return JSON.parse(buf.toString());
  } catch {
    const res = await fetch(CDN_TOPO);
    if (!res.ok) throw new Error('Failed to fetch world topojson');
    return await res.json();
  }
}

function svgHeader(){
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice">`;
}

function grid(){
  const s=32; const lines=[];
  for(let x=0;x<=width;x+=s){ lines.push(`<path d="M ${x} 0 V ${height}" stroke="#2a3b5f" stroke-width="0.6"/>`); }
  for(let y=0;y<=height;y+=s){ lines.push(`<path d="M 0 ${y} H ${width}" stroke="#2a3b5f" stroke-width="0.6"/>`); }
  return `<g id="grid" opacity="0.4">${lines.join('')}</g>`;
}

async function run(){
  const topo = await loadWorld();
  const countries = topoFeature(topo, topo.objects.countries); // GeoJSON

  const wanted = countries.features.filter(f => Object.values(COUNTRY_IDS).includes(Number(f.id)));
  const countryPaths = wanted.map(f => {
    const d = geoPath(f);
    const iso = Object.keys(COUNTRY_IDS).find(k => COUNTRY_IDS[k]===Number(f.id));
    const fill = iso==='TR'? '#e67e7e40' : '#7bb3f020';
    const stroke = iso==='TR'? '#e67e7e' : '#7bb3f0';
    return `<path id="country-${iso}" d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="0.8"/>`;
  });

  const nodesById = new Map(NODES.map(([id,lon,lat])=>[id,[lon,lat]]));
  const nodeCircles = NODES.map(([id,lon,lat])=>{
    const [x,y] = projection([lon,lat]);
    return `<g id="node-${id}" data-node="${id}">`+
           `<circle id="core" cx="${x}" cy="${y}" r="3" fill="#d9f99d"/>`+
           `<circle id="glow" cx="${x}" cy="${y}" r="10" fill="#d9f99d55"/>`+
           `</g>`;
  });

  const arcPaths = ARCS.map(([from,to,str])=>{
    const d = buildArcD(projection, nodesById.get(from), nodesById.get(to));
    const w = str===2?1.6:1.1;
    return `<path id="arc-${from}-${to}" data-from="${from}" data-to="${to}" data-strength="${str}" d="${d}" fill="none" stroke="#7bb3f0" stroke-width="${w}" opacity="0.8"/>`;
  });

  const pixels = NODES.map(([id,lon,lat])=>{ const [x,y]=projection([lon,lat]); return `${id}:${Math.round(x)},${Math.round(y)}`; }).join('\n');

  const svg = [
    svgHeader(),
    '<rect x="0" y="0" width="100%" height="100%" fill="#0b1220"/>',
    grid(),
    `<g id="countries">${countryPaths.join('')}</g>`,
    `<g id="arcs">${arcPaths.join('')}</g>`,
    `<g id="nodes">${nodeCircles.join('')}</g>`,
    `<!-- Pixel positions (for AE placement)\n${pixels}\n-->`,
    '</svg>'
  ].join('\n');

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, svg, 'utf8');
  console.log(`Wrote ${OUT}`);
}

run().catch(err=>{ console.error(err); process.exit(1); });
