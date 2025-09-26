export type RegionCode = 'TR'|'UZ'|'KZ'|'AZ'|'KG'|'TM'|'HU'|'EU'|'MENA'|'OTHER';

export type Node = {
  id: string;
  name: string;
  lon: number; // longitude
  lat: number; // latitude
  region: RegionCode;
  status?: 'launching'|'expanding'|'exploring';
  href?: string; // optional link on click
  topCategories?: string[];
};

export type Arc = {
  id: string;
  from: string; // node.id
  to: string;   // node.id
  strength?: 1|2|3; // stroke width
  delayMs?: number; // animation stagger
};

export type TradeMapProps = {
  nodes: Node[];
  arcs: Arc[];
  onNodeClick?: (node: Node) => void;
  onArcClick?: (arc: Arc) => void;
  className?: string;
  // Visual options
  showGraticule?: boolean;
  animated?: boolean;           // default true
  reducedMotionFallback?: boolean; // if true, disable animations
};
