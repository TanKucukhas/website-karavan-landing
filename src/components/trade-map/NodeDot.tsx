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
  onClick?: () => void;
  showLabel?: boolean;
};

export default function NodeDot({ cx, cy, r=3.5, label, name, status='expanding', zoom=1, onClick, showLabel=false }: Props) {
  // Flag colors for country nodes
  const FLAG_COLORS: Record<string, string> = {
    TR: '#E30A17',  // Turkey red
    UZ: '#1EB53A',  // Uzbekistan green
    KZ: '#00A3DD',  // Kazakhstan blue
    AZ: '#3F9C35',  // Azerbaijan green
    HU: '#477050',  // Hungary green
  };
  
  const fill = FLAG_COLORS[label || ''] || (status === 'launching' ? '#4cc9f0' : '#7ab6ff');
  const strokeColor = status === 'launching' ? '#d44a2a' : '#4ea1ff';
  const scaledR = r / zoom;
  const haloR = (12 / zoom);
  
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
          strokeOpacity={0.2}
          strokeWidth={1 / zoom}
          initial={{ scale: 0.9, opacity: 0.3 }}
          animate={{ 
            scale: [0.9, 1.2, 0.9], 
            opacity: [0.3, 0, 0.3] 
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
        r={6}
        fill={fill}
        filter="url(#glow)"
        animate={{ 
          opacity: [0.7, 0.9, 0.7], 
          scale: [0.95, 1.05, 0.95] 
        }}
        transition={{ 
          duration: 3.0, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Inner White Dot */}
      <circle cx={cx} cy={cy} r={scaledR/2} fill="#fff" opacity={0.8}/>
      
      {/* Country Label - Show on click */}
      {showLabel && name && (
        <text
          x={cx}
          y={cy - 12}
          fontSize={10}
          fill="white"
          textAnchor="middle"
          className="pointer-events-none"
          style={{ 
            textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
            fontWeight: '500',
            opacity: 0.9
          }}
        >
          {name}
        </text>
      )}

      {/* Hit Area for Clicking */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={10/zoom} 
        fill="transparent" 
        className="cursor-pointer"
        onClick={onClick}
      />
    </>
  );
}
