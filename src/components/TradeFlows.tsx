import { useMemo } from 'react';
import { useFlowScheduler } from '@/animation/useFlowScheduler';
import { ArcPathNatural } from '@/components/ArcPathNatural';
import { buildArcD } from '@/utils/geo';
import { ARCS, NODES } from '@/components/trade-map/TradeMap.data';
import { geoMercator } from 'd3-geo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const geoMercatorAny = geoMercator as any;

type Arc = { id:string; from:string; to:string; strength?:number };

export default function TradeFlows({ enabled }:{ enabled:boolean }) {
  const arcs: Arc[] = ARCS;
  const projection = useMemo(() => {
    // Mobil cihazlarda zoom seviyesini daha da artır
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const scale = isMobile ? 350 : 180;
    
    return geoMercatorAny().center([35,39]).scale(scale).translate([512, 260]);
  }, []);
  const nodes = useMemo(() => new Map(NODES.map(n => [n.id, n])), []);

  const dById = useMemo(() => {
    const byId: Record<string, string> = {};
    for (const a of arcs) {
      const from = nodes.get(a.from);
      const to = nodes.get(a.to);
      if (!from || !to) continue;
      byId[a.id] = buildArcD(projection, [from.lon, from.lat], [to.lon, to.lat]);
    }
    return byId;
  }, [arcs, nodes, projection]);

  const trNodeId = (NODES.find(n => n.region === 'TR') || { id: '' }).id;
  const ids = useMemo(() => {
    const trFirst = arcs.filter(a => a.from === trNodeId).map(a => a.id);
    const rest = arcs.filter(a => a.from !== trNodeId).map(a => a.id);
    return [...trFirst, ...rest];
  }, [arcs, trNodeId]);
  // Start with just one concurrent arc briefly, then ramp to config
  const { active, onFlowCycleEnd } = useFlowScheduler(ids, enabled, true, 1, 1500);

  const zoom = 1; // if using ZoomableGroup, pass actual zoom

  return (
    <svg viewBox="0 0 1024 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <g>
        {arcs.map(a => {
          // Mobil cihazlarda arc kalınlığını artır
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const mobileWidthMultiplier = isMobile ? 2.5 : 1.0;
          const baseWidth = a.strength === 3 ? 1.8 : a.strength === 2 ? 1.3 : 1.0;
          const width = baseWidth * mobileWidthMultiplier;
          
          const d = dById[a.id];
          if (!d) return null;
          return (
            <ArcPathNatural
              key={a.id}
              id={a.id}
              d={d}
              color="#4ea1ff"
              width={width}
              zoom={zoom}
              active={!!active[a.id]}
              onCycleEnd={onFlowCycleEnd}
            />
          );
        })}
      </g>
    </svg>
  );
}
