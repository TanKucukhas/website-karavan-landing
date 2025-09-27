"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoMercator } from "d3-geo";
import { motion, useReducedMotion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const geoMercatorAny = geoMercator as any;

type Arc = { from: [number, number]; to: [number, number]; status?: "launching" | "expanding" | "exploring" };
type NodePt = { lon: number; lat: number; color?: string };

const WORLD = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function SvgArcMap({ arcs, nodes, highlightCountries }: { arcs: Arc[]; nodes: NodePt[]; highlightCountries?: string[] }) {
  const rm = useReducedMotion();
  const proj = (lng: number, lat: number) => {
    const result = geoMercatorAny().scale(140).translate([550, 260])([lng, lat]);
    return result ? [result[0] as number, result[1] as number] : [0, 0];
  };

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <ComposableMap projection="geoMercator">
        <Geographies geography={WORLD}>
          {({ geographies }) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            geographies.map((geo: any) => {
              const iso = String(geo.properties?.ISO_A2 || "").toUpperCase();
              const active = highlightCountries?.includes(iso);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={active ? "#14365a" : "#0c1a30"}
                  stroke="#1a2b4a"
                  strokeWidth={active ? 1.2 : 0.6}
                />
              );
            })
          }
        </Geographies>
        <g>
          {nodes.map((n, i) => {
            const [x, y] = proj(n.lon, n.lat);
            return <circle key={i} cx={x} cy={y} r={3} className="fill-sky-300 opacity-80" />;
          })}
          {!rm &&
            arcs.slice(0, 6).map((a, i) => {
              const [x1, y1] = proj(a.from[0], a.from[1]);
              const [x2, y2] = proj(a.to[0], a.to[1]);
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.3;
              const d = `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`;
              const L = Math.round(Math.hypot(x2 - x1, y2 - y1) * 1.2);
              const color = a.status === "launching" ? "#E35D3E" : "#7CC7FF";
              return (
                <motion.path
                  key={i}
                  d={d}
                  stroke={color}
                  fill="none"
                  style={{ vectorEffect: "non-scaling-stroke", strokeWidth: 2, strokeDasharray: L }}
                  initial={{ strokeDashoffset: -L }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: Math.max(1.6, L / 260), ease: "linear", repeat: Infinity, repeatDelay: 0.6, delay: i * 0.2 }}
                />
              );
            })}
        </g>
      </ComposableMap>
    </div>
  );
}

