import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src="/images/logo/karavan-logo.svg"
        alt="Karavan"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-xl font-bold text-slate-900">Karavan</span>
    </div>
  )
}