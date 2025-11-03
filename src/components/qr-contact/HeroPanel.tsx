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
  
  const handleLongPress = (value: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(value)
    setCopyToastMessage(`${type === 'phone' ? 'Phone number' : 'Email'} copied!`)
    setShowCopyToast(true)
    trackCopyField(type, contact.slug)
    setTimeout(() => setShowCopyToast(false), 2000)
  }
  
  return (
    <>
      <div className="bg-brand-600 text-white py-8 px-4 relative">
        {/* Karavan Logo - Top Left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <Image
            src="/images/logo/karavan-logo.svg"
            alt="Karavan"
            width={120}
            height={36}
            className="h-8 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            priority
          />
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 pt-4">
            {/* Avatar */}
            <Avatar contact={contact} size={256} className="ring-4 ring-white/20 shadow-xl" />
            
            {/* Name and Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{contact.displayName}</h1>
              <p className="text-xl md:text-2xl text-white/90">{contact.title}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-4 mt-6">
              {/* Call Button */}
              <button
                onClick={handleCall}
                onContextMenu={(e) => {
                  e.preventDefault()
                  handleLongPress(contact.mobileDisplay, 'phone')
                }}
                className="bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4 flex items-center justify-center gap-3 transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-600 hover:shadow-lg transform hover:-translate-y-0.5"
                aria-label={`Call ${contact.displayName} at ${contact.mobileDisplay}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-semibold">Call</span>
              </button>
              
              {/* Email Button */}
              <button
                onClick={handleEmail}
                onContextMenu={(e) => {
                  e.preventDefault()
                  handleLongPress(contact.email, 'email')
                }}
                className="bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4 flex items-center justify-center gap-3 transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-600 hover:shadow-lg transform hover:-translate-y-0.5"
                aria-label={`Email ${contact.displayName} at ${contact.email}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold">Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* White card with drop shadow below */}
      <div className="bg-white shadow-lg -mt-4 relative z-10 rounded-t-3xl"></div>
      
      {/* Copy Toast */}
      {showCopyToast && <CopyToast message={copyToastMessage} />}
    </>
  )
}

