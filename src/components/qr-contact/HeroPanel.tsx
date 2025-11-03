"use client"

import Image from 'next/image'
import Avatar from './Avatar'
import { QRContact } from '@/lib/vcard'

interface HeroPanelProps {
  contact: QRContact
}

/**
 * Hero panel with blue background, avatar, name, role
 */
export default function HeroPanel({ contact }: HeroPanelProps) {
  return (
    <>
      {/* Hero Header - ~220px height, logo 96px centered, avatar overlapping by ~28px */}
      <div className="text-white relative overflow-visible" style={{ 
        height: '220px',
        background: 'linear-gradient(180deg, #325FA3 0%, #294E8A 100%)'
      }}>
        <div className="max-w-[760px] mx-auto relative z-10 px-6 h-full flex flex-col items-center justify-start pt-6">
          {/* Logo - Top Center, 96px wide, 24px top margin */}
          <div className="flex justify-center mb-4" style={{ marginTop: '24px' }}>
            <Image
              src="/images/logo/karavan-logo.svg"
              alt="Karavan"
              width={96}
              height={29}
              className="h-auto filter brightness-0 invert opacity-90"
              style={{ width: '96px' }}
              priority
            />
          </div>
          
          {/* Avatar - Centered on hero bottom edge, overlapping by ~28px, stronger shadow */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[28px] z-20">
            <Avatar contact={contact} size={contact.title.toLowerCase().includes('founder') ? 128 : 120} className="ring-4 ring-white shadow-lg" style={{ filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.12))' }} />
          </div>
        </div>
      </div>
    </>
  )
}

