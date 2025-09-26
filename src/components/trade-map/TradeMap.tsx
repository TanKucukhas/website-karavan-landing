'use client';

import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { MotionConfig } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { normalizeLonLat } from '@/utils/geo';
import ArcPath from './ArcPath';
import NodeDot from './NodeDot';
import Legend from './Legend';
import type { TradeMapProps, Arc, Node } from './TradeMap.types';

const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Flag colors for country nodes
const FLAG_COLORS: Record<string, string> = {
  TR: '#E30A17',  // Turkey red
  UZ: '#1EB53A',  // Uzbekistan green
  KZ: '#00A3DD',  // Kazakhstan blue
  AZ: '#3F9C35',  // Azerbaijan green
  HU: '#477050',  // Hungary green
};

export default function TradeMap({
  nodes, arcs, className,
  showGraticule = true,
  animated = true,
  reducedMotionFallback = false,
  onNodeClick,
  onArcClick,
  debug = false
}: TradeMapProps & { debug?: boolean }) {

  const zoom = 1; // Sabit zoom seviyesi

  // Tek projeksiyon objesi - tüm çizimlerde aynı kullanılacak
  const projection = useMemo(() => 
    geoMercator()
      .scale(140)
      .translate([512, 260]), 
  []);

  // Arc path hesaplama - mesafeye göre kavis
  const buildArcPath = useMemo(() => {
    return (a: Arc) => {
      const from = nodes.find(n => n.id === a.from)!;
      const to = nodes.find(n => n.id === a.to)!;
      
      const [x1, y1] = projection(normalizeLonLat([from.lon, from.lat]))!;
      const [x2, y2] = projection(normalizeLonLat([to.lon, to.lat]))!;
      
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dr = Math.sqrt(dx * dx + dy * dy) * 0.3; // mesafeye bağlı yükseklik
      
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 - dr;
      
      return `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`;
    };
  }, [nodes, projection]);

  // Aktif ülkeleri filtrele
  const activeNodes = nodes.filter(n => n.status === 'launching' || n.status === 'expanding');

  return (
    <div 
      className={twMerge(clsx('relative w-full h-full', className))} 
      aria-hidden
      style={{ touchAction: 'none' }}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <MotionConfig reducedMotion={reducedMotionFallback ? 'always' : 'never'}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140, center: [0, 0] }}
          style={{ width:'100%', height:'100%' }}
          width={1024}
          height={520}
        >
          {/* SVG Definitions */}
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
            <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* World Map */}
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

          {/* Grid Lines */}
          {showGraticule && <Graticule stroke="#1f3356" strokeWidth={0.4} opacity={0.35} />}

          {/* Debug Mode - Yeşil çizgiler ve magenta noktalar */}
          {debug && (
            <>
              <Graticule stroke="#00ff5a" strokeWidth={0.5} />
              {nodes.map(n => {
                const [x, y] = projection(normalizeLonLat([n.lon, n.lat]))!;
                return <circle key={n.id} cx={x} cy={y} r={3} fill="magenta" />
              })}
            </>
          )}

          {/* Trade Arcs */}
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
                  zoom={zoom}
                />
              );
            })}
          </g>

          {/* Country Nodes */}
          <g>
            {nodes.map(n => {
              const [x, y] = projection(normalizeLonLat([n.lon, n.lat]))!;
              return (
                <g key={n.id} onClick={() => onNodeClick?.(n)} className="cursor-pointer">
                  <NodeDot 
                    cx={x} 
                    cy={y} 
                    status={n.status} 
                    zoom={zoom}
                    label={n.region}
                    name={n.name}
                    onClick={() => onNodeClick?.(n)}
                  />
                </g>
              );
            })}
          </g>

        </ComposableMap>
        
        {/* Legend */}
        <Legend />
      </MotionConfig>
    </div>
  );
}
