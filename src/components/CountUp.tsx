"use client";

import { useEffect, useRef, useState } from 'react'
import { animateNumber } from '@/lib/animateNumber'

export default function CountUp({ end, duration = 1200, prefix = '', suffix = '', decimals }: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  // Simple visibility check with timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Start the number animation once visible
  useEffect(() => {
    if (!visible) return
    
    setVal(0)

    const cancel = animateNumber({ to: end, duration, onUpdate: (v) => {
      if (typeof decimals === 'number') {
        const factor = Math.pow(10, decimals)
        setVal(Math.round(v * factor) / factor)
      } else {
        setVal(Math.round(v))
      }
    } })
    return cancel
  }, [visible, end, duration, decimals])

  const formatted = typeof decimals === 'number'
    ? val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : val.toLocaleString()
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}
