"use client";

import { useEffect, useRef, useState } from 'react'
import { animateNumber } from '@/lib/animateNumber'

export default function CountUp({ end, duration = 1200, prefix = '', suffix = '', decimals }: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  // Intersection Observer to detect when element is visible
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            setVal(0)

            const cancel = animateNumber({ 
              to: end, 
              duration, 
              onUpdate: (v) => {
                if (typeof decimals === 'number') {
                  const factor = Math.pow(10, decimals)
                  setVal(Math.round(v * factor) / factor)
                } else {
                  setVal(Math.round(v))
                }
              } 
            })
            
            // Cleanup function
            return () => {
              cancel()
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [end, duration, decimals, hasAnimated])

  const formatted = typeof decimals === 'number'
    ? val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : val.toLocaleString()
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}
