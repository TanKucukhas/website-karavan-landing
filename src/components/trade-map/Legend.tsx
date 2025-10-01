'use client';

import Flag from '@/components/Flag';

const FLAG_COLORS: Record<string, string> = {
  TR: '#e67e7e',  // Pastel Turkey red
  UZ: '#7bb3a8',  // Pastel Uzbekistan green
  KZ: '#7bb3f0',  // Pastel Kazakhstan blue
  AZ: '#7bb3a8',  // Pastel Azerbaijan green
  TM: '#90c695',  // Pastel Turkmenistan green
  HU: '#8a9b8a',  // Pastel Hungary green
};

const COUNTRY_NAMES: Record<string, string> = {
  TR: 'Türkiye',
  UZ: 'Uzbekistan',
  KZ: 'Kazakhstan',
  AZ: 'Azerbaijan',
  TM: 'Turkmenistan',
  HU: 'Hungary',
};

type Props = {
  className?: string;
};

export default function Legend({ className = '' }: Props) {
  return (
        <div className={`absolute right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg px-2 py-1.5 text-xs shadow-lg ${className}`} style={{ top: 'calc(1rem + 30px)' }}>
      <div className="space-y-0.5">
        {Object.entries(FLAG_COLORS).map(([code, color]) => (
          <div key={code} className="flex items-center gap-1.5">
            <span 
              className="w-2 h-2 rounded-full shadow-sm" 
              style={{ backgroundColor: color }}
            />
            <Flag code={code.toLowerCase()} size="xs" className="w-3 h-3" />
                <span className="text-gray-400 font-normal text-xs">
              {COUNTRY_NAMES[code]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
