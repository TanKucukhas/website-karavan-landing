"use client"

import { useState } from 'react'
import { QRContact, generateVCard, getVCardFilename } from '@/lib/vcard'
import { trackCTAClick } from '@/lib/qr-analytics'
import CopyToast from './CopyToast'

interface VCardButtonProps {
  contact: QRContact
}

/**
 * Download vCard button with analytics tracking
 * Generates vCard client-side and downloads directly
 */
export default function VCardButton({ contact }: VCardButtonProps) {
  const [showToast, setShowToast] = useState(false)
  
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
    
    // Show toast notification
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }
  
  return (
    <div className="px-0 py-0">
      <div className="space-y-2">
        <button
          onClick={handleDownload}
          className="w-full max-w-[320px] mx-auto bg-[#355FA0] hover:bg-[#2D528A] text-white font-semibold px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#355FA0] focus:ring-offset-2 focus:ring-offset-white flex items-center justify-center gap-2"
          style={{ height: '48px', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)' }}
          aria-label={`Save ${contact.displayName}'s contact card`}
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
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          <span>Save Contact</span>
        </button>
        <p className="text-xs text-[#6B7280] text-center font-normal mt-2" style={{ fontSize: '12px' }}>
          Compatible with iOS & Android Contacts
        </p>
      </div>
      {showToast && <CopyToast message="Contact saved!" />}
    </div>
  )
}

