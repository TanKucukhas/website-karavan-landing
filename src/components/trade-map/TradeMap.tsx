'use client';

import { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { MotionConfig } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import ArcPath from './ArcPath';
import NodeDot from './NodeDot';
import type { TradeMapProps, Arc } from './TradeMap.types';

const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Removed unused function

export default function TradeMap({
  nodes, arcs, className,
  showGraticule = true,
  animated = true,
  reducedMotionFallback = false,
  onNodeClick,
  onArcClick
}: TradeMapProps) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projection = useMemo(() => (geoMercator() as any).scale(140).translate([550, 260]), []);

  // Build arc path strings
  const buildArcPath = (a: Arc) => {
    const from = nodes.find(n => n.id === a.from)!;
    const to   = nodes.find(n => n.id === a.to)!;
    const p1 = projection([from.lon, from.lat])!;
    const p2 = projection([to.lon, to.lat])!;
    // Quadratic curve control point slightly above mid
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2 - 40; // elevate a bit
    return `M ${p1[0]},${p1[1]} Q ${mx},${my} ${p2[0]},${p2[1]}`;
  };

  return (
    <div className={twMerge(clsx('relative w-full h-full', className))} aria-hidden>
      <MotionConfig reducedMotion={reducedMotionFallback ? 'always' : 'never'}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140 }}
          style={{ width:'100%', height:'100%' }}
          width={1024}
          height={520}
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="arcGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#7ab6ff" />
              <stop offset="100%" stopColor="#4ea1ff" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <Geographies geography={WORLD_URL}>
            {({ geographies }) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#0f1b33"
                  stroke="#1c2e4d"
                  strokeWidth={0.5}
                  style={{ default:{ outline:'none' }, hover:{ outline:'none' }, pressed:{ outline:'none' } }}
                />
              ))
            }
          </Geographies>

          {showGraticule && <Graticule stroke="#1f3356" strokeWidth={0.4} opacity={0.35} />}

          {/* Arcs */}
          <g>
            {arcs.slice(0, 5).map((a, index) => {
              const d = buildArcPath(a);
              const fromNode = nodes.find(n => n.id === a.from);
              const status = fromNode?.status || 'expanding';
              const delay = index * 300; // Stagger by 0.3s intervals
              
              return (
                <ArcPath
                  key={a.id}
                  d={d}
                  delay={delay}
                  strength={a.strength ?? 1}
                  animated={animated}
                  status={status}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map(n => {
              const [x, y] = projection([n.lon, n.lat])!;
              return (
                <g key={n.id} onClick={() => onNodeClick?.(n)} className="cursor-pointer">
                  <NodeDot cx={x} cy={y} status={n.status}/>
                </g>
              );
            })}
          </g>
        </ComposableMap>
      </MotionConfig>
    </div>
  );
}
