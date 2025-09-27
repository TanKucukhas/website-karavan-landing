"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const WORLD = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const GRAD: Record<string, [string, string]> = {
  TR: ["#ff6b6b", "#e35d3e"],
  UZ: ["#75e3ff", "#52bfff"],
  KZ: ["#7cc7ff", "#4ea1ff"],
  AZ: ["#9cd2ff", "#66b1ff"],
  HU: ["#ffd1d1", "#ff9b9b"],
};

export default function CountryFills({ active = ["TR", "UZ", "KZ", "AZ", "HU"] }: { active?: string[] }) {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <svg className="absolute h-0 w-0">
        <defs>
          {active.map((code) => {
            const [a, b] = GRAD[code] || ["#7cc7ff", "#4ea1ff"];
            return (
              <linearGradient key={code} id={`grad_${code}`} x1="0" x2="1">
                <stop offset="0" stopColor={a} stopOpacity={0.85} />
                <stop offset="1" stopColor={b} stopOpacity={0.85} />
              </linearGradient>
            );
          })}
        </defs>
      </svg>
      <ComposableMap>
        <Geographies geography={WORLD}>
          {({ geographies }) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            geographies.map((geo: any) => {
              const iso = String(geo.properties?.ISO_A2 || "").toUpperCase();
              const isActive = active.includes(iso);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isActive ? `url(#grad_${iso})` : "#0f1b33"}
                  stroke={isActive ? "#ff9b7a" : "#1c2e4d"}
                  strokeWidth={isActive ? 1.2 : 0.6}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

