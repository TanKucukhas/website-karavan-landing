"use client"

import { QRContact } from '@/lib/vcard'
import { trackCTAClick, trackTimeToAction, initTimeTracking } from '@/lib/qr-analytics'
import VCardButton from './VCardButton'

interface ActionBarProps {
  contact: QRContact
}

/**
 * Action buttons under identity block
 * Small icon buttons on left, large Save Contact on right
 */
export default function ActionBar({ contact }: ActionBarProps) {
  const getTimeToAction = initTimeTracking()

  const handleCall = () => {
    const timeMs = getTimeToAction()
    trackTimeToAction(timeMs, contact.slug, 'call')
    trackCTAClick('call', contact.slug)
    window.location.href = `tel:${contact.mobileE164}`
  }

  const handleEmail = () => {
    const timeMs = getTimeToAction()
    trackTimeToAction(timeMs, contact.slug, 'email')
    trackCTAClick('email', contact.slug)
    window.location.href = `mailto:${contact.email}`
  }

  const handleLinkedIn = () => {
    const timeMs = getTimeToAction()
    trackTimeToAction(timeMs, contact.slug, 'linkedin')
    trackCTAClick('linkedin', contact.slug)
    if (contact.social.linkedin) {
      window.open(contact.social.linkedin, '_blank', 'noopener,noreferrer')
    }
  }

  const handleWhatsApp = () => {
    const timeMs = getTimeToAction()
    trackTimeToAction(timeMs, contact.slug, 'whatsapp')
    trackCTAClick('whatsapp', contact.slug)
    const whatsappNumber = contact.whatsappE164 || contact.mobileE164
    const whatsappUrl = `http://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-4">
      {/* Icon buttons with labels inside on left */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Mobile/Call */}
        <button
          onClick={handleCall}
          className="bg-transparent border border-[#6B7280]/30 hover:border-[#355FA0] hover:bg-[#EFF6FF] text-[#111827] px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#355FA0] focus:ring-offset-2 h-16 w-full sm:w-auto sm:min-w-[64px]"
          style={{ borderRadius: '10px' }}
          aria-label={`Call ${contact.displayName} at ${contact.mobileDisplay}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-xs text-[#475569] font-medium">Mobile</span>
        </button>

        {/* WhatsApp */}
        {(contact.whatsappE164 || contact.mobileE164) && (
          <button
            onClick={handleWhatsApp}
            className="bg-transparent border border-[#6B7280]/30 hover:border-[#355FA0] hover:bg-[#EFF6FF] text-[#111827] px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#355FA0] focus:ring-offset-2 h-16 w-full sm:w-auto sm:min-w-[64px]"
            style={{ borderRadius: '10px' }}
            aria-label={`WhatsApp ${contact.displayName}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="text-xs text-[#475569] font-medium">WhatsApp</span>
          </button>
        )}

        {/* LinkedIn */}
        {contact.social.linkedin && (
          <button
            onClick={handleLinkedIn}
            className="bg-transparent border border-[#6B7280]/30 hover:border-[#355FA0] hover:bg-[#EFF6FF] text-[#111827] px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#355FA0] focus:ring-offset-2 h-16 w-full sm:w-auto sm:min-w-[64px]"
            style={{ borderRadius: '10px' }}
            aria-label={`LinkedIn ${contact.displayName}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-xs text-[#475569] font-medium">LinkedIn</span>
          </button>
        )}

        {/* Email */}
        <button
          onClick={handleEmail}
          className="bg-transparent border border-[#6B7280]/30 hover:border-[#355FA0] hover:bg-[#EFF6FF] text-[#111827] px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#355FA0] focus:ring-offset-2 h-16 w-full sm:w-auto sm:min-w-[64px]"
          style={{ borderRadius: '10px' }}
          aria-label={`Email ${contact.displayName} at ${contact.email}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs text-[#475569] font-medium">Email</span>
        </button>
      </div>

      {/* Large Save Contact button on right */}
      <div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0">
        <VCardButton contact={contact} />
      </div>
    </div>
  )
}

