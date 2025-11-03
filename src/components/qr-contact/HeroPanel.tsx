"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Avatar from './Avatar'
import CopyToast from './CopyToast'
import { QRContact } from '@/lib/vcard'
import { trackCTAClick, trackCopyField, trackTimeToAction, initTimeTracking } from '@/lib/qr-analytics'

interface HeroPanelProps {
  contact: QRContact
}

/**
 * Hero panel with blue background, avatar, name, role, and call/email actions
 */
export default function HeroPanel({ contact }: HeroPanelProps) {
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [copyToastMessage, setCopyToastMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const getTimeToAction = initTimeTracking()
  
  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const handleCall = () => {
    const timeMs = getTimeToAction()
    trackTimeToAction(timeMs, contact.slug, 'call')
    trackCTAClick('call', contact.slug)
    
    // Try tel: link first (works on mobile, some desktop apps)
    // If it doesn't work, fallback to copy on desktop
    const telLink = `tel:${contact.mobileE164}`
    
    if (isMobile) {
      window.location.href = telLink
    } else {
      // Desktop: try to copy, tel: link as fallback
      if (navigator.clipboard) {
        navigator.clipboard.writeText(contact.mobileDisplay)
        setCopyToastMessage('Phone number copied!')
        setShowCopyToast(true)
        trackCopyField('phone', contact.slug)
        setTimeout(() => setShowCopyToast(false), 2000)
      } else {
        // Fallback: open tel link
        window.location.href = telLink
      }
    }
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
  
  const handleLongPress = (value: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(value)
    setCopyToastMessage(`${type === 'phone' ? 'Phone number' : 'Email'} copied!`)
    setShowCopyToast(true)
    trackCopyField(type, contact.slug)
    setTimeout(() => setShowCopyToast(false), 2000)
  }
  
  return (
    <>
      {/* Hero Header - 240px height, logo 80px centered, avatar 120px overlapping by 36px */}
      <div className="bg-[#355FA0] text-white relative overflow-visible" style={{ height: '240px' }}>
        {/* Blurred background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#355FA0]/90 via-[#355FA0] to-[#355FA0]/80" />
        
        <div className="max-w-[760px] mx-auto relative z-10 px-6 h-full flex flex-col items-center justify-start pt-6">
          {/* Logo - Top Center, 80px wide */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo/karavan-logo.svg"
              alt="Karavan"
              width={80}
              height={24}
              className="w-20 h-auto filter brightness-0 invert opacity-90"
              priority
            />
          </div>
          
          {/* Avatar - Centered on hero bottom edge, overlapping by 36px */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[36px] z-20">
            <Avatar contact={contact} size={contact.title.toLowerCase().includes('founder') ? 128 : 120} className="ring-4 ring-white shadow-lg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }} />
          </div>
        </div>
      </div>
      
      {/* Copy Toast */}
      {showCopyToast && <CopyToast message={copyToastMessage} />}
    </>
  )
}

