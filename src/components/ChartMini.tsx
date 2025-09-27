"use client";

type Datum = { label: string; value: number; color?: string };

export default function ChartMini({ data, max = 100 }: { data: Datum[]; max?: number }) {
  const m = Math.max(max, ...data.map(d => d.value));
  return (
    <div className="w-full">
      <div className="flex items-end gap-3 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1">
            <div
              className="w-full rounded-t-md"
              style={{ height: `${(d.value / m) * 100}%`, backgroundColor: d.color || '#3069B4' }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {data.map((d, i) => (
          <span key={i} className="truncate flex-1 text-center">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

