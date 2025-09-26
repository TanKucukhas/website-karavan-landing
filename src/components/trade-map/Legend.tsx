'use client';

const FLAG_COLORS: Record<string, string> = {
  TR: '#e67e7e',  // Pastel Turkey red
  UZ: '#7bb3a8',  // Pastel Uzbekistan green
  KZ: '#7bb3f0',  // Pastel Kazakhstan blue
  AZ: '#7bb3a8',  // Pastel Azerbaijan green
  HU: '#8a9b8a',  // Pastel Hungary green
};

const COUNTRY_NAMES: Record<string, string> = {
  TR: 'Türkiye',
  UZ: 'Uzbekistan',
  KZ: 'Kazakhstan',
  AZ: 'Azerbaijan',
  HU: 'Hungary',
};

type Props = {
  className?: string;
};

export default function Legend({ className = '' }: Props) {
  return (
        <div className={`absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg px-2 py-1.5 text-xs shadow-lg ${className}`}>
      <div className="space-y-0.5">
        {Object.entries(FLAG_COLORS).map(([code, color]) => (
          <div key={code} className="flex items-center gap-1.5">
            <span 
              className="w-2 h-2 rounded-full shadow-sm" 
              style={{ backgroundColor: color }}
            />
                <span className="text-gray-400 font-normal text-xs">
              {COUNTRY_NAMES[code]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
