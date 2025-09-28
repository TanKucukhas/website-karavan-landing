export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-1L6Y7NBMDT'

export function pageview(url: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return
  // Avoid duplicate automatic page_view by setting send_page_view: false in config
  window.gtag?.('event', 'page_view', {
    page_path: url,
  })
}

export function gaEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return
  window.gtag?.('event', action, params)
}

