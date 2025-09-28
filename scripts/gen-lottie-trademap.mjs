#!/usr/bin/env node
// Programmatically generate a Lottie JSON that reproduces TradeMap flows
// without using Illustrator/After Effects. Output: public/lottie/trade-map.json

import fs from 'node:fs/promises';
import path from 'node:path';
import * as d3 from 'd3-geo';

const OUT = path.resolve('public/lottie/trade-map.json');

// Composition settings (match UI)
const W = 1024, H = 520;
const FPS = 30;            // frames per second
const DURATION = 8;        // seconds total (loop-friendly)
const FRAMES = Math.round(FPS * DURATION);

// Map projection (must match app)
const projection = d3.geoMercator().center([35,39]).scale(180).translate([512,260]);

// Nodes / arcs (kept local to avoid TS import complexity)
const NODES = [
  ['TR-IST', 28.9784, 41.0082],
  ['UZ-TAS', 69.2401, 41.2995],
  ['KZ-ALM', 76.885, 43.2389],
  ['AZ-BAK', 49.8671, 40.4093],
  ['HU-BUD', 19.0402, 47.4979],
];
const ARCS = [
  ['TR-IST','UZ-TAS',2,   0],
  ['TR-IST','KZ-ALM',1, 150],
  ['TR-IST','AZ-BAK',1, 300],
  ['TR-IST','HU-BUD',1, 450],
  ['UZ-TAS','KZ-ALM',1, 600],
  ['KZ-ALM','AZ-BAK',1, 750],
];

// Colors
const STROKE = [0.305, 0.631, 1.0, 1]; // #4EA1FF in 0..1 RGB
const NODE_CORE = [0.851, 0.976, 0.615, 1]; // #D9F99D
const NODE_GLOW = [0.851, 0.976, 0.615, 0.33];

// Helpers
function qCurveCP(p0, p1){
  // Quadratic control point above mid with distance-based lift
  const dx=p1[0]-p0[0], dy=p1[1]-p0[1];
  const dist=Math.hypot(dx,dy);
  const lift=Math.min(120, Math.max(30, dist*0.32));
  return [(p0[0]+p1[0])/2, (p0[1]+p1[1])/2 - lift];
}

function quadToCubic(p0, q, p1){
  // Convert quadratic Bezier (p0, q, p1) to cubic Bezier control points
  const c1 = [ p0[0] + (2/3)*(q[0]-p0[0]), p0[1] + (2/3)*(q[1]-p0[1]) ];
  const c2 = [ p1[0] + (2/3)*(q[0]-p1[0]), p1[1] + (2/3)*(q[1]-p1[1]) ];
  return { c1, c2 };
}

function shapePathFromCubic(p0, c1, c2, p1){
  // Lottie open path: v (vertices), i (in tangents), o (out tangents)
  const v = [p0, p1];
  const o0 = [ c1[0]-p0[0], c1[1]-p0[1] ];
  const i1 = [ c2[0]-p1[0], c2[1]-p1[1] ];
  return {
    a: 0,
    k: { c: false, v, i: [[0,0], i1], o: [o0, [0,0]] }
  };
}

function animKeyframes(from, to, t0, t1){
  return {
    a: 1,
    k: [
      { t: t0, s: [from], e: [to], i: {x:[0.667], y:[1]}, o:{x:[0.333], y:[0]} },
      { t: t1 }
    ]
  };
}

function layerTransform(){
  return { o:{a:0,k:100}, r:{a:0,k:0}, p:{a:0,k:[0,0,0]}, a:{a:0,k:[0,0,0]}, s:{a:0,k:[100,100,100]} };
}

function arcLayer(name, p0, p1, strength, startFrame){
  const q = qCurveCP(p0, p1); const {c1, c2} = quadToCubic(p0, q, p1);
  const path = { ty:'sh', ks: shapePathFromCubic(p0, c1, c2, p1), nm: 'arc-path' };
  const stroke = { ty:'st', c:{a:0,k:STROKE}, o:{a:0,k:100}, w:{a:0,k: strength===2?1.6:1.1}, lc:2, lj:2, ml:4, bm:0 };
  const drawFrames = Math.round(1.1*FPS);
  const flowFrames = Math.round(1.6*FPS);
  const tm = { ty:'tm', s:{a:0,k:0}, e: animKeyframes(0,100,startFrame, startFrame+drawFrames), o: animKeyframes(0,360,startFrame+drawFrames, startFrame+drawFrames+flowFrames), m:1, ix:2, nm:'trim' };
  const tr = { ty:'tr', p:{a:0,k:[0,0]}, a:{a:0,k:[0,0]}, s:{a:0,k:[100,100]}, r:{a:0,k:0}, o:{a:0,k:100}, sk:{a:0,k:0}, sa:{a:0,k:0} };
  const group = { ty:'gr', nm:'arc-group', it:[ path, stroke, tm, tr ] };
  const layer = {
    ddd:0, ty:4, nm: name, sr:1, ip:0, op:FRAMES, st:0, bm:0,
    ks: layerTransform(),
    shapes: [ group ]
  };
  return layer;
}

function nodeGroup(name, x, y){
  // Two circles: glow (under), core (over)
  const glow = { ty:'el', p:{a:0,k:[x,y]}, s:{a:0,k:[20,20]}, d:1, nm:'glow' };
  const glowFill = { ty:'fl', c:{a:0,k:NODE_GLOW}, o:{a:0,k:100}, r:1, nm:'glow-fill' };
  const core = { ty:'el', p:{a:0,k:[x,y]}, s:{a:0,k:[6,6]}, d:1, nm:'core' };
  const coreFill = { ty:'fl', c:{a:0,k:NODE_CORE}, o:{a:0,k:100}, r:1, nm:'core-fill' };
  const tr = { ty:'tr', p:{a:0,k:[0,0]}, a:{a:0,k:[0,0]}, s:{a:0,k:[100,100]}, r:{a:0,k:0}, o:{a:0,k:100}, sk:{a:0,k:0}, sa:{a:0,k:0} };
  return { ty:'gr', nm: name, it:[ glow, glowFill, core, coreFill, tr ] };
}

async function main(){
  const nodes = Object.fromEntries(NODES.map(([id,lon,lat])=>{ const p=projection([lon,lat]); return [id, [p[0], p[1]]]; }));

  // Arc layers with staggered start frames
  const arcLayers = ARCS.map(([from,to,str,delay])=>{
    const p0 = nodes[from];
    const p1 = nodes[to];
    const name = `arc ${from}→${to}`;
    return arcLayer(name, p0, p1, str, Math.round(delay/1000*FPS));
  });

  // Nodes in a single layer (lighter JSON)
  const nodeShapes = NODES.map(([id,lon,lat])=>{
    const [x,y] = nodes[id];
    return nodeGroup(`node-${id}`, x, y);
  });
  const nodesLayer = {
    ddd:0, ty:4, nm:'nodes', sr:1, ip:0, op:FRAMES, st:0, bm:0,
    ks: layerTransform(),
    shapes: nodeShapes
  };

  const lottie = {
    v: '5.7.4', fr: FPS, ip: 0, op: FRAMES, w: W, h: H, nm: 'TradeMap Lottie', ddd:0, assets: [],
    layers: [ nodesLayer, ...arcLayers ]
  };

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(lottie));
  console.log('Wrote', OUT);
}

main().catch(err=>{ console.error(err); process.exit(1); });
