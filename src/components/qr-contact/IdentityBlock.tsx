"use client"

import { QRContact } from '@/lib/vcard'

interface IdentityBlockProps {
  contact: QRContact
}

/**
 * Identity block: Name, Title, Tagline
 * Anchored directly under avatar, centered
 */
export default function IdentityBlock({ contact }: IdentityBlockProps) {
  return (
    <div className="text-center">
      {/* Name - 26px, semibold, center, 12px below avatar */}
      <h1 className="text-[26px] font-semibold text-[#111827] leading-tight mb-2" style={{ fontWeight: 600 }}>
        {contact.displayName}
      </h1>
      
      {/* Title - 15px, medium, muted slate, center, 8px below name */}
      <p className="text-[15px] font-medium text-[#6B7280] mb-3" style={{ fontWeight: 500 }}>
        {contact.title}
      </p>
      
      {/* Tagline - 14px, regular, center, max 2 lines, 12px below title */}
      {contact.summary && (
        <p className="text-sm text-[#111827] font-normal leading-relaxed max-w-2xl mx-auto" style={{ fontSize: '14px', lineHeight: '1.5', maxHeight: '2.8em', overflow: 'hidden' }}>
          {contact.summary}
        </p>
      )}
    </div>
  )
}

