'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const geoMercatorAny = geoMercator as any;
import { MotionConfig } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { normalizeLonLat, buildArcD } from '@/utils/geo';
import ArcPath from './ArcPath';
import NodeDot from './NodeDot';
import Legend from './Legend';
import type { TradeMapProps } from './TradeMap.types';
import { ID_TO_COLOR, FILL_COLORS, BORDER_COLORS } from '@/utils/idColors';
import { getWorldData } from '@/lib/worldDataCache';


export default function TradeMap({
  nodes, arcs, className,
  showGraticule = true,
  reducedMotionFallback = false,
  onNodeClick,
  debug = false,
  showActiveOverlay = true,
  revealedRegions,
  onReady,
  disableNodeAnimation = false,
  onFirstPaint,
  onStablePaint,
}: TradeMapProps & { debug?: boolean }) {

  const zoom = 1; // Sabit zoom seviyesi
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(new Set());

  // Tek projeksiyon objesi - sabit; SVG ölçeklenerek tam genişlik verilir
  const projection = useMemo(() => {
    // Mobil cihazlarda zoom seviyesini daha da artır ve center'ı sola kaydır
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const scale = isMobile ? 350 : 180;
    const centerLon = isMobile ? 28 : 35; // Mobilde 7 derece sola kaydır (100px daha)
    
    return geoMercatorAny()
      .center([centerLon, 39])
      .scale(scale)
      .translate([512, 260]);
  }, []);

  const readyRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement|null>(null);
  const geoCountRef = useRef(0);
  const stableSentRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [worldSrc, setWorldSrc] = useState<any>(null);

  // Use global cache for world data
  useEffect(() => {
    let canceled = false;
    async function loadWorldData() {
      try {
        const data = await getWorldData();
        if (!canceled) {
          setWorldSrc(data);
        }
      } catch (error) {
        console.error('Failed to load world data:', error);
      }
    }
    loadWorldData();
    return () => { canceled = true; };
  }, []);

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

  // Ensure underlying SVG uses preserveAspectRatio="xMidYMid slice" so the map fills edge-to-edge
  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;
    const svg = root.querySelector('svg');
    if (svg) {
      try { svg.setAttribute('preserveAspectRatio', 'xMidYMid slice'); } catch { /* ignore */ }
    }
  }, []);

  // Memoized arc paths with distance-based curvature
  const arcDs = useMemo(() => {
    const nodesById = Object.fromEntries(nodes.map(n => [n.id, n]));
    return arcs.map(a => {
      const f = nodesById[a.from], t = nodesById[a.to];
      // Güvenli kontrol: node'lar bulunamazsa arc'ı atla
      if (!f || !t) {
        console.warn(`Arc ${a.id}: Node not found - from: ${a.from}, to: ${a.to}`);
        return null;
      }
      return { 
        ...a,
        d: buildArcD(projection, [f.lon, f.lat], [t.lon, t.lat])
      };
    }).filter(Boolean); // null değerleri filtrele
  }, [arcs, nodes, projection]);


  return (
    <div 
      ref={wrapperRef}
      className={twMerge(clsx('relative w-full h-full z-10', className))} 
      aria-hidden
      style={{ touchAction: 'pan-y pinch-zoom' }}
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
          projectionConfig={{ 
            scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 350 : 180, 
            center: typeof window !== 'undefined' && window.innerWidth < 768 ? [28, 39] : [35, 39]
          }}
          style={{ width:'100%', height:'100%' }}
          width={1024}
          height={520}
        >
          {/* Ocean background to ensure full-bleed color edge-to-edge */}
          <rect x={0} y={0} width={1024} height={520} fill="#0b1220" />
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
          {worldSrc && (
          <Geographies geography={worldSrc}>
            {({ geographies }) => {
              // Filter: Only render Europe, Asia, Middle East regions to reduce DOM size
              // This reduces DOM from 241 to ~80 elements - major performance improvement
              const relevantGeographies = geographies.filter((geo) => {
                const id = Number((geo as unknown as { id: number|string }).id);
                // Keep only Europe (4-56), Asia (31-704), Middle East (196-792)
                // Skip Americas (28-840), Africa (12-894), Oceania (36-882)
                const isAmericas = [28, 32, 44, 52, 84, 92, 124, 136, 152, 170, 188, 192, 212, 214, 218, 222, 308, 312, 320, 332, 340, 484, 500, 558, 591, 600, 630, 652, 659, 660, 662, 663, 666, 670, 780, 796, 840, 850, 862].includes(id);
                const isAfrica = [12, 24, 72, 108, 120, 132, 140, 148, 174, 178, 180, 204, 226, 231, 232, 262, 266, 270, 288, 324, 384, 404, 426, 430, 434, 450, 454, 466, 478, 480, 504, 508, 516, 562, 566, 624, 638, 646, 654, 678, 686, 690, 694, 706, 710, 716, 728, 729, 732, 736, 748, 768, 800, 834, 854, 894].includes(id);
                const isOceania = [36, 90, 184, 242, 258, 296, 316, 520, 548, 570, 584, 598, 612, 626, 772, 776, 798, 882, 876].includes(id);
                const isSouthAmerica = [28, 32, 68, 76, 152, 170, 218, 238, 254, 328, 600, 604, 740, 858, 862].includes(id);
                
                return !isAmericas && !isAfrica && !isOceania && !isSouthAmerica;
              });
              
              // Update geography count and signal readiness only when features are available
              if (relevantGeographies && relevantGeographies.length) {
                geoCountRef.current = relevantGeographies.length;
              }
              if (!readyRef.current && relevantGeographies && relevantGeographies.length > 0) {
                readyRef.current = true;
                if (onReady) {
                  setTimeout(onReady, 0);
                }
              }
              return (
                <g data-world-geos>
                {relevantGeographies.map((geo) => {
                const id = Number((geo as unknown as { id: number|string }).id);
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


                return (
                  <g key={(geo as unknown as { rsmKey: string }).rsmKey} style={{ pointerEvents: 'none' }}>
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
                           style={{ 
                             default: { 
                               fill: FILL_COLORS[countryCode as keyof typeof FILL_COLORS], 
                               outline: 'none' 
                             } 
                           }}
                        />
                        <Geography
                          geography={geo}
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
          )}

           {/* Grid Lines */}
           {showGraticule && <Graticule stroke="#1f3356" strokeWidth={0.4} />}

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
                  if (!arc) return null;
                  const fromNode = nodes.find(n => n.id === arc.from);
                  const status = fromNode?.status || 'expanding';
                  
                  // Mobil cihazlarda arc görünürlüğünü artır
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                  const mobileWidthMultiplier = isMobile ? 2.2 : 1.0;
                  const mobileOpacityMultiplier = isMobile ? 1.8 : 1.0;
                  
                  return (
                    <ArcPath
                      key={arc.id}
                      d={arc.d}
                      color={status === 'launching' ? 
                        `#e67e7e${Math.round(128 * mobileOpacityMultiplier).toString(16).padStart(2, '0')}` : 
                        `#7bb3f0${Math.round(128 * mobileOpacityMultiplier).toString(16).padStart(2, '0')}`
                      }
                      width={(arc.strength === 3 ? 1.8 : arc.strength === 2 ? 1.3 : 1.0) * mobileWidthMultiplier}
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
                     onClick={() => {
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
