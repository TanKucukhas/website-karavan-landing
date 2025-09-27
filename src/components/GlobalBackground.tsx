export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated grid for subtle depth */}
      <div className="absolute inset-0 grid-overlay-light"></div>
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-blob animate-aurora-one absolute -top-24 -left-16 h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(48,105,180,0.22), transparent 70%)' }} />
        <div className="aurora-blob animate-aurora-two absolute top-1/3 -right-24 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(125,211,252,0.22), transparent 70%)' }} />
        <div className="aurora-blob animate-aurora-three absolute -bottom-24 left-1/4 h-[520px] w-[520px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.18), transparent 70%)' }} />
      </div>
    </div>
  )
}

