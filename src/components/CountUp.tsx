"use client";

import { useEffect, useState } from 'react'
import { animateNumber } from '@/lib/animateNumber'

export default function CountUp({ end, duration = 1200, prefix = '', suffix = '', decimals }: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    const cancel = animateNumber({ to: end, duration, onUpdate: (v) => {
      if (typeof decimals === 'number') {
        const factor = Math.pow(10, decimals)
        setVal(Math.round(v * factor) / factor)
      } else {
        setVal(Math.round(v))
      }
    } })
    return cancel
  }, [end, duration, decimals])

  const formatted = typeof decimals === 'number'
    ? val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : val.toLocaleString()
  return <span>{prefix}{formatted}{suffix}</span>
}
