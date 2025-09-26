import React from 'react';

interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarDatum[];
  max?: number;
  className?: string;
}

export default function BarChart({ data, max, className }: BarChartProps) {
  const computedMax = max ?? Math.max(...data.map(d => d.value), 1);
  return (
    <div className={`space-y-4 ${className ?? ''}`} role="img" aria-label="Bar chart">
      {data.map((d, idx) => {
        const pct = Math.max(0, Math.min(100, (d.value / computedMax) * 100));
        return (
          <div key={idx} className="w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-neutralDark font-medium">{d.label}</span>
              <span className="text-sm text-gray-700">{d.value.toLocaleString()}</span>
            </div>
            <div className="w-full h-3 bg-neutralLight rounded">
              <div
                className={`h-3 rounded ${d.color ?? 'bg-primary'}`}
                style={{ width: `${pct}%` }}
                aria-valuenow={d.value}
                aria-valuemin={0}
                aria-valuemax={computedMax}
                role="progressbar"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
