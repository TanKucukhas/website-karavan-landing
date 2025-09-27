import { useMemo } from 'react';
import { useFlowScheduler } from '@/animation/useFlowScheduler';
import { ArcPathNatural } from '@/components/ArcPathNatural';
import { buildArcD } from '@/utils/geo';
import { ARCS, NODES } from '@/components/trade-map/TradeMap.data';
import { geoMercator } from 'd3-geo';

type Arc = { id:string; from:string; to:string; strength?:number };

export default function TradeFlows({ enabled }:{ enabled:boolean }) {
  const arcs: Arc[] = ARCS as any;
  const projection = useMemo(() => geoMercator().scale(140).translate([512, 260]), []);
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
  const { active, onFlowCycleEnd } = useFlowScheduler(ids, enabled, true);

  const zoom = 1; // if using ZoomableGroup, pass actual zoom

  return (
    <svg viewBox="0 0 1024 520" className="h-full w-full">
      <g>
        {arcs.map(a => {
          const width = a.strength === 3 ? 1.8 : a.strength === 2 ? 1.3 : 1.0;
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
