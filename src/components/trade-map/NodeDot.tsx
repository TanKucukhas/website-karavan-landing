'use client';
import { motion } from 'framer-motion';

type Props = {
  cx: number; 
  cy: number; 
  r?: number; 
  label?: string;
  status?: 'launching'|'expanding'|'exploring';
};

export default function NodeDot({ cx, cy, r=3.5, status='expanding' }: Props) {
  const fill = status === 'launching' ? '#4cc9f0' : '#7ab6ff';
  
  return (
    <>
      <motion.circle 
        cx={cx} 
        cy={cy} 
        r={r}
        fill={fill}
        filter="url(#glow)"
        initial={{ opacity: 0.85, scale: 0.9 }}
        animate={{ opacity: [0.85, 1, 0.85], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={cx} cy={cy} r={r/2} fill="#fff" opacity={0.8}/>
    </>
  );
}
