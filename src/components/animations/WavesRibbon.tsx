"use client";

export default function WavesRibbon({ front = false }: { front?: boolean }) {
  return (
    <div className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none overflow-hidden`} aria-hidden>
      <svg className="absolute w-[200%] h-full left-0 top-0 animate-wave-drift" viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M0,60 C30,40 70,80 100,60 C130,40 170,80 200,60 L200,100 L0,100 Z" fill="#7cc7ff20" />
        <path d="M0,55 C30,35 70,75 100,55 C130,35 170,75 200,55 L200,100 L0,100 Z" fill="#4ea1ff20" />
        <path d="M0,50 C30,30 70,70 100,50 C130,30 170,70 200,50 L200,100 L0,100 Z" fill="#3069b420" />
      </svg>
    </div>
  );
}
