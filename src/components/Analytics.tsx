"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview, GA_MEASUREMENT_ID } from '@/lib/gtag'
import ScrollDepthTracker from './ScrollDepthTracker'
import PageSessionTracker from './PageSessionTracker'
import SectionVisibilityTracker from './SectionVisibilityTracker'

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    pageview(url)
  }, [pathname, searchParams])

  // Determine page ID for tracking
  const getPageId = () => {
    if (pathname === '/') return 'homepage'
    if (pathname.includes('/contact')) return 'contact'
    if (pathname.includes('/regions/')) {
      const region = pathname.split('/').pop()
      return `region-${region}`
    }
    return pathname.replace(/\//g, '-').replace(/^-/, '') || 'unknown'
  }

  const pageId = getPageId()

  return (
    <>
      {/* Scroll depth tracking */}
      <ScrollDepthTracker 
        pageId={pageId}
        thresholds={[25, 50, 75, 100]}
        debounceMs={100}
      />
      
      {/* Session and time tracking */}
      <PageSessionTracker 
        pageId={pageId}
        timeMilestones={[15, 30, 60, 120]}
        trackVisibility={true}
        trackEngagement={true}
      />
      
      {/* Section visibility tracking */}
      <SectionVisibilityTracker 
        pageId={pageId}
        minEngagementTime={2000}
        threshold={0.1}
        trackEngagement={true}
      />
    </>
  )
}

