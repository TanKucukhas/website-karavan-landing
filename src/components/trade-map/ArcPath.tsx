'use client';
import { motion } from 'framer-motion';

type Props = {
  d: string;           // SVG path d attribute
  delay?: number;      // ms
  strength?: 1|2|3;    // stroke width scale
  animated?: boolean;
  status?: 'launching'|'expanding'|'exploring';
};

export default function ArcPath({ d, delay=0, strength=1, animated=true, status='expanding' }: Props) {
  // Status-based styling
  const getStrokeColor = () => {
    switch (status) {
      case 'launching': return '#d44a2a'; // Primary red
      case 'expanding': return '#4ea1ff'; // Blue
      case 'exploring': return '#7ab6ff'; // Light blue
      default: return '#4ea1ff';
    }
  };

  const getStrokeWidth = () => {
    switch (status) {
      case 'launching': return 1.2;
      case 'expanding': return 1.0;
      case 'exploring': return 0.9;
      default: return 1.0;
    }
  };

  const strokeColor = getStrokeColor();
  const strokeWidth = getStrokeWidth() * strength;
  const isDashed = status === 'exploring';

  const common = {
    d,
    stroke: strokeColor,
    strokeWidth,
    fill: 'none',
    strokeLinecap: 'round' as const,
    opacity: 0.9,
    filter: 'drop-shadow(0 0 6px rgba(126,176,255,.35))',
    ...(isDashed && { strokeDasharray: '6 6' }),
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
