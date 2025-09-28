'use client';

import Image from 'next/image'

type EmojiProps = {
  symbol: string;
  label?: string;
  className?: string;
  size?: number;
}

function toCodePoint(unicodeSurrogates: string, sep?: string): string {
  const r: string[] = []
  let c = 0
  let p = 0
  let i = 0
  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++)
    if (p) {
      r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16))
      p = 0
    } else if (0xd800 <= c && c <= 0xdbff) {
      p = c
    } else {
      r.push(c.toString(16))
    }
  }
  return r.join(sep || '-')
}

export default function Emoji({ symbol, label, className, size = 24 }: EmojiProps) {
  const code = toCodePoint(symbol)
  const src = `https://twemoji.maxcdn.com/v/latest/svg/${code}.svg`
  return (
    <Image
      src={src}
      alt={label || symbol}
      width={size}
      height={size}
      className={className}
      loading="lazy"
      aria-label={label || undefined}
    />
  )
}


