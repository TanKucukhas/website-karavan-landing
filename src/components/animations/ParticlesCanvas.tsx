"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export type ParticlePath = { pts: [number, number][]; color?: string };

export default function ParticlesCanvas({ paths }: { paths: ParticlePath[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rm = useReducedMotion();

  useEffect(() => {
    if (rm) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    const S = paths.map((p) => ({ t: Math.random(), s: 0.35 + Math.random() * 0.4, c: p.color || "#7CC7FF", pts: p.pts }));
    let raf = 0 as number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      S.forEach((s) => {
        s.t += 0.004 * s.s;
        if (s.t > 1) s.t = 0;
        const seg = s.t * (s.pts.length - 1);
        const i = Math.floor(seg);
        const a = s.pts[i];
        const b = s.pts[i + 1] || a;
        const x = a[0] + (b[0] - a[0]) * (seg - i);
        const y = a[1] + (b[1] - a[1]) * (seg - i);
        ctx.fillStyle = s.c;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [paths, rm]);

  return <canvas ref={ref} className="absolute inset-0 -z-10 pointer-events-none hidden md:block" />;
}

