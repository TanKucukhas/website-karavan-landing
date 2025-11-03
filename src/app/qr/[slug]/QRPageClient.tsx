"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { QRContact } from '@/lib/vcard'
import { trackQRScan } from '@/lib/qr-analytics'

interface QRPageClientProps {
  contact: QRContact
}

/**
 * Client component for QR page analytics and interactions
 * Detects QR scan from ?src=qr query parameter
 */
export default function QRPageClient({ contact }: QRPageClientProps) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check if this is a QR scan
    const src = searchParams.get('src')
    if (src === 'qr') {
      trackQRScan(contact.slug)
    }
  }, [searchParams, contact.slug])
  
  return null
}

