"use client";

export default function SineWaves({ front = false }: { front?: boolean }) {
  return (
    <div className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none overflow-hidden`} aria-hidden>
      <svg className="absolute w-[200%] h-full left-0 top-0 animate-pan-left" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M0,60 Q25,40 50,60 T100,60 T150,60 T200,60" stroke="#7dd3ff55" strokeWidth="2" fill="none" />
        <path d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50" stroke="#4ea1ff55" strokeWidth="2" fill="none" />
        <path d="M0,40 Q25,20 50,40 T100,40 T150,40 T200,40" stroke="#3069b455" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
