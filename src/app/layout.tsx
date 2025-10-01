export const metadata = {
  title: 'Karavan - B2B Export Platform',
  description: 'Karavan is a B2B export platform connecting Turkish exporters with international buyers across Central Asia and Eastern Europe.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
}

import './globals.css'
import Script from 'next/script'
import HeaderWithCTA from '@/components/twplus/HeaderWithCTA'
import GlobalBackground from '@/components/GlobalBackground'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'
import Analytics from '@/components/Analytics'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google Analytics (GA4) */}
        <Script
          id="ga4-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-1L6Y7NBMDT'}`}
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // Disable automatic page_view to avoid duplicates in App Router
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-1L6Y7NBMDT'}', {
              send_page_view: false,
              debug_mode: ${process.env.NODE_ENV !== 'production'}
            });
          `}
        </Script>
      </head>
      <body className="js-enabled">
        <GlobalBackground />
        <HeaderWithCTA />
        {/* Tracks page_view on route changes */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <ScrollAnimator />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
