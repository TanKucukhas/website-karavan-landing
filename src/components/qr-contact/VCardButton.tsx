"use client"

import { QRContact, generateVCard, getVCardFilename } from '@/lib/vcard'
import { trackCTAClick } from '@/lib/qr-analytics'

interface VCardButtonProps {
  contact: QRContact
}

/**
 * Download vCard button with analytics tracking
 * Generates vCard client-side and downloads directly
 */
export default function VCardButton({ contact }: VCardButtonProps) {
  const handleDownload = () => {
    trackCTAClick('vcard', contact.slug)
    
    // Generate vCard client-side
    const vcardContent = generateVCard(contact)
    const filename = getVCardFilename(contact)
    
    // Create blob and download
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="bg-white px-6 py-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleDownload}
          className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-white flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
          aria-label={`Download ${contact.displayName}'s contact card`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Download vCard</span>
        </button>
      </div>
    </div>
  )
}

