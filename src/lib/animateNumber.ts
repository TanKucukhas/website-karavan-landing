export type AnimateNumberOptions = {
  from?: number
  to: number
  duration?: number
  easing?: (t: number) => number
  onUpdate: (value: number) => void
  onComplete?: () => void
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function animateNumber({ from = 0, to, duration = 1200, easing = easeOutCubic, onUpdate, onComplete }: AnimateNumberOptions) {
  let raf: number | null = null
  let start: number | null = null

  const step = (ts: number) => {
    if (start === null) start = ts
    const p = Math.min(1, (ts - start) / duration)
    const eased = easing(p)
    const value = from + (to - from) * eased
    onUpdate(value)
    if (p < 1) {
      raf = requestAnimationFrame(step)
    } else {
      onComplete?.()
    }
  }

  raf = requestAnimationFrame(step)
  return () => {
    if (raf) cancelAnimationFrame(raf)
  }
}

