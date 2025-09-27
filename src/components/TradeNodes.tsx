import { motion } from 'framer-motion';

export function NodeDot({ x, y, color, zoom=1 }:{
  x:number; y:number; color:string; zoom?:number
}) {
  return (
    <g>
      <motion.circle
        cx={x} cy={y} r={10/zoom} fill="none" stroke={color} strokeOpacity={0.35}
        style={{ vectorEffect:'non-scaling-stroke' }}
        animate={{ scale: [0.9, 1.35, 0.9], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx={x} cy={y} r={5/zoom} fill={color}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .35, ease: 'easeOut' }}
      />
    </g>
  );
}

export default function TradeNodes() {
  // Placeholder: nodes should come from context/props in real scene
  return null;
}

