"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Star = { x: number; y: number; z: number; s: number };

export default function StarfieldCanvas({ front = false }: { front?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rm = useReducedMotion();

  useEffect(() => {
    if (rm) return;
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    const N = Math.min(300, Math.floor((w*h)/4000));
    const stars: Star[] = Array.from({length:N}, ()=>({
      x: Math.random()*w, y: Math.random()*h, z: 0.4+Math.random()*0.6, s: 0.4+Math.random()*1.2
    }));
    let raf = 0 as number;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = '#0a1224'; ctx.globalAlpha=1; ctx.fillRect(0,0,w,h);
      stars.forEach(st => {
        st.x += st.z*0.8; if (st.x > w+5) st.x = -5;
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = '#7dd3fc';
        ctx.beginPath(); ctx.arc(st.x, st.y, st.s, 0, Math.PI*2); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [rm]);

  return <canvas ref={ref} className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none`} />;
}
