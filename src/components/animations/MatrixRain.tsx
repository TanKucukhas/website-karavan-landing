"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function MatrixRain({ front = false }: { front?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rm = useReducedMotion();
  useEffect(()=>{
    if (rm) return;
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
    let w = c.width = c.offsetWidth, h = c.height = c.offsetHeight;
    const cols = Math.floor(w / 12);
    const y: number[] = Array(cols).fill(0);
    const onResize=()=>{ w=c.width=c.offsetWidth; h=c.height=c.offsetHeight; };
    let raf=0 as number;
    const draw=()=>{
      ctx.fillStyle='rgba(10,18,36,0.2)'; ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#7dd3fc'; ctx.font='12px monospace';
      for(let i=0;i<y.length;i++){
        const text = String.fromCharCode(0x30A0 + Math.floor(Math.random()*96));
        const x=i*12; ctx.fillText(text,x,y[i]);
        y[i] = y[i] > h + Math.random()*100 ? 0 : y[i] + 14;
      }
      raf=requestAnimationFrame(draw);
    }; draw();
    window.addEventListener('resize', onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  },[rm]);
  return <canvas ref={ref} className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none`} />
}
