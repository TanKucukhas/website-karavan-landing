"use client";

// Lightweight grain overlay using a tiny base64 PNG, opacity flicker via CSS.
export default function NoiseGrain({ front = false }: { front?: boolean }) {
  const NOISE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAANUlEQVQYV2NkYGD4z0ABYGRg+M8QGJgYGBiGgQYGBgYmRkY2B8Q4QYg7QwGg0wQAB0WwQmB4gUAQBEtR0XqM3uTAAAAAElFTkSuQmCC";
  return (
    <div className={`absolute inset-0 ${front ? 'z-10' : 'z-0'} pointer-events-none`} aria-hidden>
      <div className="absolute inset-0 opacity-20 mix-blend-multiply animate-grain" style={{ backgroundImage: `url(${NOISE})`, backgroundSize: 'auto', imageRendering: 'pixelated' }} />
    </div>
  );
}
