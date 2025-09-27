import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FLOW as S } from '@/animation/flowConfig';

export function ArcPathNatural({
  id, d, color, width = 1.2, zoom = 1,
  active, onCycleEnd
}:{
  id: string; d: string; color: string; width?: number; zoom?: number;
  active: boolean; onCycleEnd: (id:string)=>void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<SVGPathElement|null>(null);
  const [len, setLen] = useState(0);
  const ctrl = useAnimationControls();

  useEffect(() => { if (ref.current) setLen(ref.current.getTotalLength()); }, [d]);

  useEffect(() => {
    if (reduced) return;
    let canceled = false;
    async function run() {
      if (!active || !len) return;

      await ctrl.start({
        strokeDashoffset: [len, 0],
        opacity: 1,
        transition: { duration: S.drawDurationMs/1000, ease: 'easeOut' }
      });
      if (canceled) return;

      await ctrl.start({
        strokeDashoffset: [0, -len],
        transition: { duration: Math.max(1.6, len / S.flowSpeedPxPerSec), ease: 'linear' }
      });
      if (canceled) return;

      await ctrl.start({
        opacity: 0.65,
        transition: { duration: S.coastMs/1000, ease: 'linear' }
      });

      onCycleEnd(id);
    }
    run();
    return () => { canceled = true; };
  }, [active, len, reduced]);

  const strokeWidth = width / (zoom || 1);

  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      style={{ vectorEffect: 'non-scaling-stroke', strokeDasharray: len || undefined }}
      strokeWidth={strokeWidth}
      initial={{ opacity: 0 }}
      animate={ctrl}
    />
  );
}
