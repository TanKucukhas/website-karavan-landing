"use client";

export default function OrbitRings({ front = false }: { front?: boolean }) {
  return (
    <div className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none`} aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-80 h-80 rounded-full border border-sky-300/40 animate-rotate-slow" />
          <div className="absolute inset-0 w-64 h-64 m-8 rounded-full border border-indigo-300/40 animate-rotate-reverse" />
          <div className="absolute inset-0 w-48 h-48 m-16 rounded-full border border-sky-300/40 animate-rotate-slow" style={{animationDuration:'38s'}} />
        </div>
      </div>
    </div>
  );
}
