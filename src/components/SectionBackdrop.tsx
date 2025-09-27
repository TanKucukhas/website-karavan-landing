type Props = {
  variant?: 'stripes' | 'dots';
  front?: boolean;
};

export default function SectionBackdrop({ variant = 'stripes', front = false }: Props) {
  // z-0: arka plan katmanı; front=true test amaçlı öne getirir
  const base = `pointer-events-none absolute inset-0 ${front ? 'z-10' : 'z-0'} overflow-hidden`;
  return (
    <div className={base} aria-hidden>
      {variant === 'stripes' ? (
        <div className="absolute inset-0 animated-stripes" />
      ) : (
        <div className="absolute inset-0 animated-dots" />
      )}
    </div>
  );
}
