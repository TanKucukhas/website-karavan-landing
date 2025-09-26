'use client';

import { useMemo, useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import { MotionConfig } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { normalizeLonLat, buildArcD } from '@/utils/geo';
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
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(new Set());

  // Tek projeksiyon objesi - tüm çizimlerde aynı kullanılacak
  const projection = useMemo(() => 
    geoMercator()
      .scale(140)
      .translate([512, 260]), 
  []);

  // Memoized arc paths with distance-based curvature
  const arcDs = useMemo(() => {
    const nodesById = Object.fromEntries(nodes.map(n => [n.id, n]));
    return arcs.map(a => {
      const f = nodesById[a.from], t = nodesById[a.to];
      return { 
        id: a.id, 
        d: buildArcD(projection, [f.lon, f.lat], [t.lon, t.lat]),
        ...a
      };
    });
  }, [arcs, nodes, projection]);

  // Aktif ülkeleri filtrele
  const activeNodes = nodes.filter(n => n.status === 'launching' || n.status === 'expanding');

  return (
    <div 
      className={twMerge(clsx('relative w-full h-full z-10', className))} 
      aria-hidden
      style={{ touchAction: 'none' }}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      onClick={(e) => {
        // If clicking on the map background (not on nodes), clear all selections
        if (e.target === e.currentTarget) {
          setSelectedNodeIds(new Set());
        }
      }}
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
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
                {arcDs.slice(0, 5).map((arc, index) => {
                  const fromNode = nodes.find(n => n.id === arc.from);
                  const status = fromNode?.status || 'expanding';
                  
                  return (
                    <ArcPath
                      key={arc.id}
                      d={arc.d}
                      color={status === 'launching' ? '#e67e7e' : '#7bb3f0'} // Pastel renkler
                      width={arc.strength === 3 ? 1.8 : arc.strength === 2 ? 1.3 : 1.0}
                      delayMs={index * 280}  // 🔑 start offset only, no repeatDelay
                      dashed={status === 'exploring'}
                      zoom={zoom}
                      glow={true}
                    />
                  );
                })}
              </g>

          {/* Country Nodes */}
          <g style={{ zIndex: 20 }}>
            {nodes.map(n => {
              const [x, y] = projection(normalizeLonLat([n.lon, n.lat]))!;
              return (
                <g key={n.id} className="cursor-pointer" style={{ zIndex: 20 }}>
                  <NodeDot 
                    cx={x} 
                    cy={y} 
                    status={n.status} 
                    zoom={zoom}
                    label={n.region}
                    name={n.name}
                    showLabel={selectedNodeIds.has(n.id)}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent map background click
                      const newSelectedIds = new Set(selectedNodeIds);
                      
                      if (newSelectedIds.has(n.id)) {
                        // Remove from selection
                        newSelectedIds.delete(n.id);
                      } else {
                        // Add to selection
                        newSelectedIds.add(n.id);
                        // Set timer to remove this specific node after 5 seconds
                        setTimeout(() => {
                          setSelectedNodeIds(prev => {
                            const updated = new Set(prev);
                            updated.delete(n.id);
                            return updated;
                          });
                        }, 5000);
                      }
                      
                      setSelectedNodeIds(newSelectedIds);
                      onNodeClick?.(n);
                    }}
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
