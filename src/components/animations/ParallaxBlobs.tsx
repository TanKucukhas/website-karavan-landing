"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function ParallaxBlobs({ front = false }: { front?: boolean }) {
  const rm = useReducedMotion();
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rm) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      const a = y * 0.03;
      const b = y * -0.02;
      const c = y * 0.015;
      if (r1.current) r1.current.style.transform = `translate3d(0, ${a}px, 0)`;
      if (r2.current) r2.current.style.transform = `translate3d(0, ${b}px, 0)`;
      if (r3.current) r3.current.style.transform = `translate3d(0, ${c}px, 0)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [rm]);
  return (
    <div className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none`} aria-hidden>
      <div ref={r1} className="absolute -top-20 left-10 w-80 h-80 rounded-full bg-sky-300/40 blur-3xl" />
      <div ref={r2} className="absolute top-1/3 right-16 w-96 h-96 rounded-full bg-indigo-400/30 blur-3xl" />
      <div ref={r3} className="absolute -bottom-24 left-1/3 w-[28rem] h-[28rem] rounded-full bg-brand-600/30 blur-3xl" />
    </div>
  );
}
