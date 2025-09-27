"use client";

export default function HexGridPulse({ front = false }: { front?: boolean }) {
  const cols = 16; const rows = 10; const size = 10; // hex radius
  const w = cols * size * 1.5 + size; const h = rows * size * Math.sqrt(3) + size;
  const hex = (cx:number, cy:number, r:number) => {
    const a = Math.sqrt(3) / 2 * r;
    return `${cx},${cy-r} ${cx+a},${cy-r/2} ${cx+a},${cy+r/2} ${cx},${cy+r} ${cx-a},${cy+r/2} ${cx-a},${cy-r/2}`;
  };
  const polys: {points:string, delay:number}[] = [];
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      const cx = size + x * (size * 1.5);
      const cy = size + y * (size * Math.sqrt(3)) + (x % 2 ? (size * Math.sqrt(3))/2 : 0);
      const d = (x + y) * 90; // ms delay deterministic
      polys.push({ points: hex(cx, cy, size), delay: d });
    }
  }
  return (
    <div className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none overflow-hidden`} aria-hidden>
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <g fill="#4ea1ff10" stroke="#4ea1ff30" strokeWidth="0.5">
          {polys.map((p, i) => (
            <polygon key={i} points={p.points} className="animate-hex-pulse" style={{ animationDelay: `${p.delay}ms` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
