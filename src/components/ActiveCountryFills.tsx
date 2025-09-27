import { Geographies, Geography } from 'react-simple-maps';
import { motion } from 'framer-motion';

// Minimal active countries color map; replace with project's actual map if available
const ACTIVE_COUNTRIES: Record<string, string> = {
  TR: '#4ea1ff',
  UZ: '#4ea1ff',
  KZ: '#4ea1ff',
  AZ: '#4ea1ff',
  KG: '#4ea1ff',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function canonicalISO2(geo: any): string | null {
  const id = geo?.properties?.iso_a2 || geo?.properties?.ISO_A2;
  if (!id || id === '-99') return null;
  return String(id).toUpperCase();
}

export function ActiveCountryFills({ geographyUrl, pulse=false }:{
  geographyUrl: string; pulse?: boolean
}) {
  return (
    <Geographies geography={geographyUrl}>
      {({ geographies }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geographies.map((geo: any) => {
          const iso2 = canonicalISO2(geo);
          const color = iso2 && ACTIVE_COUNTRIES[iso2];
          if (!color) return null;
          const Comp = pulse ? motion.g : 'g';
          return (
            <Comp key={geo.rsmKey}
              {...(pulse ? {
                initial: { opacity: 0, scale: 0.98 },
                animate: { opacity: [0, 1, 0.85, 1], scale: [0.98, 1, 1, 1] },
                transition: { duration: 0.9, ease: 'easeOut' }
              } : {})}
              style={{ pointerEvents: 'none' }}
            >
              <Geography geography={geo}
                style={{ default:{ fill: color, fillOpacity: .18, outline:'none' }}}/>
              <Geography geography={geo}
                style={{ default:{ fill:'none', stroke: color, strokeOpacity:.55, strokeWidth: 1.2, outline:'none' }}}/>
            </Comp>
          );
        })
      }
    </Geographies>
  );
}

