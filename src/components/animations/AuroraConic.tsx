"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function AuroraConic({ front = false }: { front?: boolean }) {
  const rm = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => { if (rm) setReduce(true); }, [rm]);
  return (
    <div className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none ${reduce ? 'rm-all' : ''}`} aria-hidden>
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl conic-blob conic-a" />
      <div className="absolute top-1/3 -right-24 w-[580px] h-[580px] rounded-full blur-3xl conic-blob conic-b" />
      <div className="absolute -bottom-24 left-1/4 w-[560px] h-[560px] rounded-full blur-3xl conic-blob conic-c" />
    </div>
  );
}
