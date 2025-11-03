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
    <div className="bg-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed font-light">
          {contact.summary}
        </p>
      </div>
    </div>
  )
}

