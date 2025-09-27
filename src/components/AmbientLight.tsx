type Props = { front?: boolean }

export default function AmbientLight({ front = false }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${front ? 'z-10' : 'z-0'} overflow-hidden`}> 
      {/* Increase visibility when front=true for testing */}
      <div className={`absolute -top-20 -left-10 h-64 w-64 rounded-full ${front ? 'bg-brand-600/35' : 'bg-brand-600/10'} blur-3xl animate-[float_18s_ease-in-out_infinite]`} />
      <div className={`absolute -bottom-24 right-0 h-72 w-72 rounded-full ${front ? 'bg-sky-400/40' : 'bg-sky-300/20'} blur-3xl animate-[float_22s_ease-in-out_infinite]`} />
      {front && (
        <div className="absolute top-1/3 left-1/4 h-60 w-60 rounded-full bg-indigo-400/30 blur-3xl animate-[float_26s_ease-in-out_infinite]" />
      )}
    </div>
  )
}
