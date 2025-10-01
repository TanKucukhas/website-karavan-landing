"use client";

import { useEffect, useState } from 'react'

export default function ScrollAnimator() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    // Body already has js-enabled class from layout
    const getCandidates = () => Array.from(document.querySelectorAll<HTMLElement>('.animate-on-scroll:not(.visible)'))

    // Fallback/safety reveal using bounding rect checks
    const sweep = () => {
      const vh = window.innerHeight || 0
      const candidates = getCandidates()
      for (const el of candidates) {
        const rect = el.getBoundingClientRect()
        const inView = rect.top <= vh * 0.9 && rect.bottom >= -vh * 0.1
        const scrolledPast = rect.bottom < 0 // already above viewport; make it visible to avoid gaps when going back up
        if (inView || scrolledPast) {
          el.classList.add('visible')
        }
      }
    }

    // If IntersectionObserver is not available, use the sweep fallback
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      // Reveal on load and on scroll/resize as a basic fallback
      sweep()
      const onScroll = () => requestAnimationFrame(sweep)
      const w = window as Window
      w.addEventListener('scroll', onScroll, { passive: true })
      w.addEventListener('resize', onScroll)
      return () => {
        w.removeEventListener('scroll', onScroll)
        w.removeEventListener('resize', onScroll)
      }
    }

    // Primary path: IntersectionObserver with generous margins
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }
      },
      // Use threshold 0 to fire as soon as any pixel is visible
      // and a bottom negative rootMargin so elements reveal a bit earlier
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )

    // Observe initial candidates
    getCandidates().forEach((el) => io.observe(el))

    // Initial sweep for elements already in viewport
    sweep()

    // Only handle resize and visibility change (no scroll listener needed)
    const onResize = () => {
      requestAnimationFrame(() => {
        // Re-observe any newly visible candidates
        getCandidates().forEach((el) => io.observe(el))
        sweep()
      })
    }

    const w = window as Window
    w.addEventListener('resize', onResize, { passive: true })
    w.addEventListener('orientationchange', onResize, { passive: true })

    return () => {
      w.removeEventListener('resize', onResize)
      w.removeEventListener('orientationchange', onResize)
      io.disconnect()
    }
  }, [isHydrated])
  return null
}
