'use client';

import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
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
import { ID_TO_COLOR, FILL_COLORS, BORDER_COLORS } from '@/utils/idColors';

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
  debug = false,
  showActiveOverlay = true,
  revealedRegions,
  pulsingRegion,
  onReady,
  disableNodeAnimation = false,
  onFirstPaint,
  onStablePaint,
}: TradeMapProps & { debug?: boolean }) {

  const zoom = 1; // Sabit zoom seviyesi
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(new Set());

  // Tek projeksiyon objesi - tüm çizimlerde aynı kullanılacak
  const projection = useMemo(() => 
    geoMercator()
      .scale(140)
      .translate([512, 260]), 
  []);

  const readyRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement|null>(null);
  const geoCountRef = useRef(0);
  const stableSentRef = useRef(false);

  // Stable paint detector: waits for two consecutive frames where
  // path count and bounding box are unchanged; also emits first paint
  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;
    let raf1 = 0, raf2 = 0;
    let prev = { w: 0, h: 0, paths: 0 };
    let stableHits = 0;
    let signaledFirst = false;
    let canceled = false;

    const measure = () => {
      if (canceled) return;
      const svg = root.querySelector('svg') as SVGSVGElement | null;
      if (!svg) { raf2 = requestAnimationFrame(measure); return; }
      const world = svg.querySelector('g[data-world-geos]') as SVGGElement | null;
      const paths = world ? world.querySelectorAll('path').length : 0;
      let w = 0, h = 0;
      try {
        const box = svg.getBBox();
        w = Math.round(box.width);
        h = Math.round(box.height);
      } catch { /* ignore */ }

      if (!signaledFirst && paths > 0 && w > 0 && h > 0) {
        signaledFirst = true;
        onFirstPaint?.();
      }

      const same = paths === prev.paths && w === prev.w && h === prev.h;
      stableHits = same ? stableHits + 1 : 0;
      prev = { paths, w, h };

      if (stableHits >= 2 && paths >= geoCountRef.current && w > 0 && h > 0) {
        if (!stableSentRef.current) {
          stableSentRef.current = true;
          onStablePaint?.();
        }
        return;
      }
      raf2 = requestAnimationFrame(measure);
    };

    raf1 = requestAnimationFrame(() => { measure(); });
    return () => { canceled = true; cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [onFirstPaint, onStablePaint]);

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
      ref={wrapperRef}
      className={twMerge(clsx('relative w-full h-full z-10', className))} 
      aria-hidden
      style={{ touchAction: 'none' }}
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
            {({ geographies }) => {
              // Update geography count and signal readiness only when features are available
              if (geographies && geographies.length) {
                geoCountRef.current = geographies.length;
              }
              if (!readyRef.current && geographies && geographies.length > 0) {
                readyRef.current = true;
                if (onReady) {
                  setTimeout(onReady, 0);
                }
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return (
                <g data-world-geos>
                {geographies.map((geo: any) => {
                const id = Number(geo.id);
                const active = showActiveOverlay && (revealedRegions
                  ? (() => {
                      // Map numeric id to ISO2 used in our palette
                      let iso: string | null = null;
                      if (id === 792) iso = 'TR';
                      else if (id === 860) iso = 'UZ';
                      else if (id === 398) iso = 'KZ';
                      else if (id === 31) iso = 'AZ';
                      else if (id === 348) iso = 'HU';
                      return iso ? revealedRegions.includes(iso) : false;
                    })()
                  : (id in ID_TO_COLOR));
                
                // Get country code for color mapping
                let countryCode = '';
                if (id === 792) countryCode = 'TR';
                else if (id === 860) countryCode = 'UZ';
                else if (id === 398) countryCode = 'KZ';
                else if (id === 31) countryCode = 'AZ';
                else if (id === 348) countryCode = 'HU';

                const isPulsing = !!pulsingRegion && (
                  (pulsingRegion === 'TR' && id === 792) ||
                  (pulsingRegion === 'UZ' && id === 860) ||
                  (pulsingRegion === 'KZ' && id === 398) ||
                  (pulsingRegion === 'AZ' && id === 31) ||
                  (pulsingRegion === 'HU' && id === 348)
                );

                return (
                  <g key={geo.rsmKey} style={{ pointerEvents: 'none' }}>
                    {/* Base country fill */}
                    <Geography
                      geography={geo}
                      style={{
                        default: { 
                          fill: '#0f1b33', 
                          stroke: '#1c2e4d', 
                          strokeWidth: 0.4, 
                          outline: 'none' 
                        },
                        hover: { 
                          fill: '#0f1b33', 
                          stroke: '#1c2e4d', 
                          strokeWidth: 0.4, 
                          outline: 'none' 
                        },
                        pressed: { 
                          fill: '#0f1b33', 
                          stroke: '#1c2e4d', 
                          strokeWidth: 0.4, 
                          outline: 'none' 
                        },
                      }}
                    />
                    {/* Active country overlay */}
                    {active && countryCode && (
                      <>
                        <Geography
                          geography={geo}
                          className={isPulsing ? 'animate-geoPulse' : undefined}
                          style={{ 
                            default: { 
                              fill: FILL_COLORS[countryCode as keyof typeof FILL_COLORS], 
                              outline: 'none' 
                            } 
                          }}
                        />
                        <Geography
                          geography={geo}
                          className={isPulsing ? 'animate-geoPulse' : undefined}
                          style={{ 
                            default: { 
                              fill: 'none', 
                              stroke: BORDER_COLORS[countryCode as keyof typeof BORDER_COLORS], 
                              strokeWidth: 1.0, 
                              outline: 'none' 
                            } 
                          }}
                        />
                      </>
                    )}
                  </g>
                );
              })}
                </g>
              );
            }}
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
                      color={status === 'launching' ? '#e67e7e80' : '#7bb3f080'} // Pastel renkler with opacity
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
                    animated={!disableNodeAnimation}
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
