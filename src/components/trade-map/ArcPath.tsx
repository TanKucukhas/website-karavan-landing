'use client';
import { motion } from 'framer-motion';
// Removed unused import

type Props = {
  d: string;           // SVG path d attribute
  delay?: number;      // ms
  strength?: 1|2|3;    // stroke width scale
  animated?: boolean;
};

export default function ArcPath({ d, delay=0, strength=1, animated=true }: Props) {
  const strokeWidth = 0.75 * strength;
  const common = {
    d,
    stroke: 'url(#arcGradient)',
    strokeWidth,
    fill: 'none',
    strokeLinecap: 'round' as const,
    opacity: 0.9,
  };

  if (!animated) {
    return <path {...common} />;
  }

  // Animate "draw" effect with dashoffset
  return (
    <motion.path
      {...common}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.2, delay: delay/1000, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
    />
  );
}
