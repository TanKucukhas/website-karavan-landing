"use client";

import { useEffect, useRef, useState } from 'react'
import { animateNumber } from '@/lib/animateNumber'

export default function CountUp({ end, duration = 1200, prefix = '', suffix = '', decimals }: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  // Observe when the number enters the viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return

    // If IntersectionObserver is unavailable, fallback to immediate animation
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Start the number animation once visible
  useEffect(() => {
    if (!visible) return
    // Reset before starting to ensure animation runs from 0 each time it becomes visible
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
