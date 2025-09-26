import React from 'react';

interface Slice {
  label: string;
  percent: number; // 0-100
  color: string;
}

interface PieChartProps {
  data: Slice[];
  size?: number;
  className?: string;
}

export default function PieChart({ data, size = 160, className }: PieChartProps) {
  const gradient = data
    .reduce<{ stops: string[]; acc: number }>((acc, slice) => {
      const start = acc.acc;
      const end = start + slice.percent;
      acc.stops.push(`${slice.color} ${start}% ${end}%`);
      acc.acc = end;
      return acc;
    }, { stops: [], acc: 0 }).stops.join(', ');

  return (
    <div className={`inline-flex flex-col items-center ${className ?? ''}`}>
      <div
        className="rounded-full"
        style={{ width: size, height: size, backgroundImage: `conic-gradient(${gradient})` }}
        role="img"
        aria-label="Pie chart"
      />
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
            <span className="text-gray-700">{s.label} ({s.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
