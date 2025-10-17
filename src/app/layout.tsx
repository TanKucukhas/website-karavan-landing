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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Preload critical resources */}
        <link rel="preload" href="/data/world-50m.json" as="fetch" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* PWA Manifest - Lazy loaded to reduce critical path */}
        <Script id="load-manifest" strategy="afterInteractive">
          {`
            const link = document.createElement('link');
            link.rel = 'manifest';
            link.href = '/site.webmanifest';
            document.head.appendChild(link);
          `}
        </Script>
        {/* Google Analytics (GA4) - Lazy loaded for better performance */}
        <Script
          id="ga4-src"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-1L6Y7NBMDT'}`}
        />
        <Script id="ga4-init" strategy="lazyOnload">
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
      <body>{children}</body>
    </html>
  )
}
