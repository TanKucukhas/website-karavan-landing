"use client"

import { QRContact } from '@/lib/vcard'

interface SummaryBlockProps {
  contact: QRContact
}

/**
 * Summary block - collapses if empty
 */
export default function SummaryBlock({ contact }: SummaryBlockProps) {
  if (!contact.summary || contact.summary.trim() === '') {
    return null
  }
  
  return (
    <div className="px-0 py-0">
      <p className="text-[#111827] text-sm leading-relaxed font-normal text-center max-w-2xl mx-auto" style={{ fontSize: '14px', lineHeight: '1.5', maxHeight: '2.8em', overflow: 'hidden' }}>
        {contact.summary}
      </p>
    </div>
  )
}

