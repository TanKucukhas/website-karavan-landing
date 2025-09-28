"use client";

import { useEffect } from 'react'

export default function ScrollAnimator() {
  useEffect(() => {
    // Wait for hydration to complete
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

    // Fallback sweep on fast jumps and hash navigation
    const onScroll = () => requestAnimationFrame(sweep)
    const onResize = () => requestAnimationFrame(() => {
      // On resize, re-observe any newly added candidates and sweep
      getCandidates().forEach((el) => io.observe(el))
      sweep()
    })

    const w = window as Window
    w.addEventListener('scroll', onScroll, { passive: true })
    w.addEventListener('resize', onResize)
    w.addEventListener('orientationchange', onResize)
    w.addEventListener('visibilitychange', sweep)

    // Initial sweep in case user lands mid-page or fast-scrolls on load
    // Add small delay to ensure hydration is complete
    setTimeout(sweep, 100)

    return () => {
      w.removeEventListener('scroll', onScroll)
      w.removeEventListener('resize', onResize)
      w.removeEventListener('orientationchange', onResize)
      w.removeEventListener('visibilitychange', sweep)
      io.disconnect()
    }
  }, [])
  return null
}
