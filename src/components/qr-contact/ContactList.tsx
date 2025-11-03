"use client"

import { useState, useEffect } from 'react'
import CopyToast from './CopyToast'
import { QRContact } from '@/lib/vcard'
import { trackCopyField } from '@/lib/qr-analytics'

interface ContactListProps {
  contact: QRContact
}

interface ContactItem {
  icon: React.ReactNode
  label: string
  value: string
  caption?: string
  type?: 'phone' | 'email'
  action?: () => void
  hideOnDesktop?: boolean
}

/**
 * Contact list with icon, label, value, and caption
 * Each item 56px height, supports long-press copy
 */
export default function ContactList({ contact }: ContactListProps) {
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [copyToastMessage, setCopyToastMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const handleCopy = (value: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(value)
    setCopyToastMessage(`${type === 'phone' ? 'Phone number' : 'Email'} copied!`)
    setShowCopyToast(true)
    trackCopyField(type, contact.slug)
    setTimeout(() => setShowCopyToast(false), 2000)
  }
  
  const items: ContactItem[] = [
    {
      icon: (
        <svg className="text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Mobile',
      value: contact.mobileDisplay,
      type: 'phone',
      action: () => {
        window.location.href = `tel:${contact.mobileE164}`
      },
    },
    {
      icon: (
        <svg className="text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: contact.email,
      type: 'email',
      action: () => {
        window.location.href = `mailto:${contact.email}`
      },
    },
    {
      icon: (
        <svg className="text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      label: 'Company',
      value: contact.company,
      caption: contact.title,
    },
    {
      icon: (
        <svg className="text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      label: 'Website',
      value: contact.website,
      action: () => {
        window.open(contact.website, '_blank', 'noopener,noreferrer')
      },
    },
  ]
  
  // Add WhatsApp if available (hide on desktop by default per spec)
  if (contact.whatsappE164 && (isMobile || contact.whatsappDisplay)) {
    items.push({
      icon: (
        <svg className="text-[#6B7280]" fill="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: contact.whatsappDisplay || contact.whatsappE164,
      caption: contact.whatsappE164,
      type: 'phone',
      hideOnDesktop: !contact.whatsappDisplay,
      action: () => {
        const whatsappUrl = `http://wa.me/${contact.whatsappE164.replace(/[^0-9]/g, '')}`
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      },
    })
  }
  
  // Add secondary phone if available
  if (contact.secondaryPhoneE164) {
    items.push({
      icon: (
        <svg className="text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Secondary Phone',
      value: contact.secondaryPhoneDisplay || contact.secondaryPhoneE164,
      caption: contact.secondaryPhoneE164,
      type: 'phone',
      action: () => {
        if (isMobile) {
          window.location.href = `tel:${contact.secondaryPhoneE164}`
        } else {
          handleCopy(contact.secondaryPhoneDisplay || contact.secondaryPhoneE164, 'phone')
        }
      },
    })
  }
  
  // Add location if available
  if (contact.location) {
    items.push({
      icon: (
        <svg className="text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: contact.location,
    })
  }
  
  // Add languages if available
  if (contact.languages && contact.languages.length > 0) {
    items.push({
      icon: (
        <svg className="text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      label: 'Languages',
      value: '', // Will be rendered as chips
      caption: contact.languages.join(', '),
    })
  }
  
  return (
    <>
      <div className="w-full">
        <div className="space-y-0">
            {items.map((item, index) => {
              // Hide WhatsApp on desktop if hideOnDesktop is true
              if (item.hideOnDesktop && !isMobile) {
                return null
              }
              
              // Special rendering for languages (chips)
              if (item.label === 'Languages' && contact.languages) {
                return (
                  <div key={index}>
                    <div className="flex items-start gap-4" style={{ height: '56px', paddingTop: '12px', paddingBottom: '12px' }}>
                      <div className="flex-shrink-0 mt-1" aria-hidden="true" style={{ width: '20px' }}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-[#6B7280] uppercase tracking-wide mb-2 font-medium">{item.label}</div>
                        <div className="flex flex-wrap gap-2">
                          {contact.languages.map((lang, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && (
                      <div className="border-t" style={{ borderColor: 'rgba(17, 24, 39, 0.08)' }} />
                    )}
                  </div>
                )
              }
              
              return (
                <div key={index}>
                  <div
                    onClick={item.action}
                    onContextMenu={(e) => {
                      if (item.type) {
                        e.preventDefault()
                        handleCopy(item.value, item.type)
                      }
                    }}
                    className={`flex items-center gap-4 transition-all duration-200 ${
                      item.action ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100' : ''
                    }`}
                    style={{ height: '56px' }}
                    role={item.action ? 'button' : undefined}
                    tabIndex={item.action ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (item.action && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault()
                        item.action()
                      }
                    }}
                  >
                    <div className="flex-shrink-0" aria-hidden="true" style={{ width: '20px' }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-[#6B7280] uppercase tracking-wide mb-0.5 font-medium">{item.label}</div>
                      <div className="text-sm text-[#111827] font-normal truncate">{item.value}</div>
                      {item.caption && item.label !== 'Mobile' && (
                        <div className="text-xs text-[#6B7280] mt-0.5 font-normal">{item.caption}</div>
                      )}
                    </div>
                    {item.action && (
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {index < items.length - 1 && !(item.hideOnDesktop && !isMobile) && (
                    <div className="border-t" style={{ borderColor: 'rgba(17, 24, 39, 0.08)' }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      
      {showCopyToast && <CopyToast message={copyToastMessage} />}
    </>
  )
}

