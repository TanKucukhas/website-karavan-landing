'use client';
import { motion } from 'framer-motion';

type Props = {
  cx: number; 
  cy: number; 
  r?: number; 
  label?: string;
  name?: string;
  status?: 'launching'|'expanding'|'exploring';
  zoom?: number;
};

export default function NodeDot({ cx, cy, r=3.5, label, name, status='expanding', zoom=1 }: Props) {
  const fill = status === 'launching' ? '#4cc9f0' : '#7ab6ff';
  const strokeColor = status === 'launching' ? '#d44a2a' : '#4ea1ff';
  const scaledR = r / zoom;
  const haloR = (8 / zoom);
  
  return (
    <>
      {/* Halo Effect for Active Nodes */}
      {(status === 'launching' || status === 'expanding') && (
        <motion.circle 
          cx={cx} 
          cy={cy} 
          r={haloR}
          fill="transparent"
          stroke={strokeColor}
          strokeOpacity={0.35}
          strokeWidth={1 / zoom}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ 
            scale: [0.9, 1.35, 0.9], 
            opacity: [0.6, 0, 0.6] 
          }}
          transition={{ 
            duration: 2.2, 
            repeat: Infinity, 
            ease: 'easeOut' 
          }}
        />
      )}
      
      {/* Main Node */}
      <motion.circle 
        cx={cx} 
        cy={cy} 
        r={scaledR}
        fill={fill}
        filter="url(#glow)"
        initial={{ opacity: 0.55, scale: 0.9 }}
        animate={{ opacity: [0.55, 0.8, 0.55], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Inner White Dot */}
      <circle cx={cx} cy={cy} r={scaledR/2} fill="#fff" opacity={0.8}/>
      
      {/* Country Label */}
      {label && (
        <text
          x={cx + 12/zoom}
          y={cy - 8/zoom}
          fontSize={12/zoom}
          fill="white"
          className="pointer-events-none"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
        >
          {label}
        </text>
      )}

      {/* Tooltip on Hover */}
      {name && (
        <g className="opacity-0 hover:opacity-100 transition-opacity">
          <rect
            x={cx - 40/zoom}
            y={cy - 25/zoom}
            width={80/zoom}
            height={20/zoom}
            fill="rgba(0,0,0,0.8)"
            rx={4/zoom}
          />
          <text
            x={cx}
            y={cy - 12/zoom}
            fontSize={10/zoom}
            fill="white"
            textAnchor="middle"
            className="pointer-events-none"
          >
            {name}
          </text>
        </g>
      )}

      {/* Hit Area for Clicking */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={10/zoom} 
        fill="transparent" 
        className="cursor-pointer"
      />
    </>
  );
}
