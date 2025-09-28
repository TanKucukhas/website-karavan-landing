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
  animated?: boolean;
};

export default function NodeDot({ cx, cy, r=3.5, label, name, status='expanding', zoom=1, onClick, showLabel=false, animated=true }: Props) {
  // Pastel flag colors for country nodes
  const FLAG_COLORS: Record<string, string> = {
    TR: '#e67e7e',  // Pastel Turkey red
    UZ: '#7bb3a8',  // Pastel Uzbekistan green
    KZ: '#7bb3f0',  // Pastel Kazakhstan blue
    AZ: '#7bb3a8',  // Pastel Azerbaijan green
    HU: '#8a9b8a',  // Pastel Hungary green
  };
  
  // Mobil cihazlarda nokta boyutunu artır
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const mobileMultiplier = isMobile ? 1.5 : 1;
  
  const fill = FLAG_COLORS[label || ''] || (status === 'launching' ? '#7bb3f0' : '#9bb3f0');
  const strokeColor = status === 'launching' ? '#e67e7e80' : '#7bb3f080'; // 50% opacity
  const scaledR = (r * mobileMultiplier) / zoom;
  const haloR = (12 * mobileMultiplier) / zoom;
  
  return (
    <>
      {/* Halo Effect for Active Nodes */}
      {(status === 'launching' || status === 'expanding') && animated && (
            <motion.circle 
              cx={cx} 
              cy={cy} 
              r={haloR}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={1.5 / zoom}
              initial={{ scale: 0.5, opacity: 0.2 }}
              animate={{ 
                scale: [0.5, 1.5, 0.5], 
                opacity: [0.2, 0, 0.2] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            />
      )}
      
      {/* Main Node */}
          {animated ? (
          <motion.circle 
            cx={cx} 
            cy={cy} 
            r={6 * mobileMultiplier}
            fill={fill}
            filter="url(#glow)"
            animate={{ 
              opacity: [0.4, 0.8, 0.4], 
              scale: [0.8, 1.1, 0.8] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          ) : (
            <circle cx={cx} cy={cy} r={6 * mobileMultiplier} fill={fill} filter="url(#glow)" opacity={0.8} />
          )}
      
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
        r={(10 * mobileMultiplier)/zoom} 
        fill="transparent" 
        className="cursor-pointer"
        onClick={onClick}
      />
    </>
  );
}
