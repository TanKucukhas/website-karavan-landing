"use client";

import { useReducedMotion } from "framer-motion";

export type RadarPoint = { x: number; y: number; color?: string };

export default function GridRadar({ points }: { points: RadarPoint[] }) {
  const rm = useReducedMotion();
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-[#0a1224]" />
      <div
        className="absolute inset-0 opacity-[.08] [background-image:repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(255,255,255,.5)_29px),repeating-linear-gradient(90deg,transparent,transparent_28px,rgba(255,255,255,.5)_29px)]"
      />
      <svg className="absolute inset-0 w-full h-full">
        {!rm &&
          points.map((p, i) => (
            <circle
              key={i}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r="2"
              fill={p.color || "#7dd3fc"}
              className="animate-[ping_2.8s_cubic-bezier(.4,0,.2,1)_infinite]"
            />
          ))}
      </svg>
    </div>
  );
}

