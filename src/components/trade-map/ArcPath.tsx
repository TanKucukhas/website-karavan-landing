'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = {
  d: string;
  color: string;
  width?: number;
  delayMs?: number;
  zoom?: number;
  dashed?: boolean; // for "exploring" arcs
  glow?: boolean;
};

export default function ArcPath({
  d, color, width = 1.2, delayMs = 0, zoom = 1
}: Props) {
  const ref = useRef<SVGPathElement | null>(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const L = ref.current.getTotalLength();
    setLen(L);
    console.log('Path length:', L); // Debug için
  }, [d, delayMs]);

  // non-scaling stroke keeps width stable on zoom
  const strokeWidth = width / (zoom || 1);

  // Dash-pattern: solid for launching/expanding; dashed for exploring

  return (
    <g>
      {/* animated stroke - sadece hareket eden parçacıklar */}
      <motion.path
        ref={ref}
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        style={{
          vectorEffect: 'non-scaling-stroke',
          strokeDasharray: len > 0 ? `${len * 0.6} ${len * 0.4}` : '600 400', // Çizgi %60, boşluk %40
        }}
        initial={{ strokeDashoffset: len > 0 ? len * 0.6 : 600 }}
        animate={{ 
          strokeDashoffset: len > 0 ? -len * 0.6 : -600
        }}
        transition={{
          duration: len > 0 ? Math.max(8.0, len / 100) : 10.0, // Daha yavaş - 8-10 saniye
          ease: 'linear',
          repeat: Infinity,
          delay: delayMs / 1000,
        }}
      />
    </g>
  );
}
