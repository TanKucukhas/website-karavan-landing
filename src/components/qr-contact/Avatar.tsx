"use client"

import Image from 'next/image'
import { QRContact } from '@/lib/vcard'

interface AvatarProps {
  contact: QRContact
  size?: number
  className?: string
}

/**
 * Circular avatar component with initials fallback
 * Uses gradient circle with initials if image is missing
 * Default size: 128px (96px on mobile)
 */
export default function Avatar({ contact, size = 128, className = '' }: AvatarProps) {
  const initials = `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase()
  
  // Generate gradient colors based on name (consistent for same person)
  const hash = contact.displayName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  const hue = Math.abs(hash) % 360
  const gradientStart = `hsl(${hue}, 70%, 60%)`
  const gradientEnd = `hsl(${hue + 30}, 70%, 50%)`
  
  // Check if avatar exists
  const hasAvatar = contact.avatarUrl && contact.avatarUrl !== ''
  
  return (
    <div 
      className={`relative rounded-full overflow-hidden ${className} ${
        size === 128 ? 'w-24 h-24 md:w-32 md:h-32' : size === 96 ? 'w-24 h-24' : ''
      }`}
      style={size !== 128 ? { width: size, height: size } : undefined}
    >
      {hasAvatar ? (
        <Image
          src={contact.avatarUrl}
          alt={contact.displayName}
          width={size}
          height={size}
          className="object-cover object-top w-full h-full"
          priority
          unoptimized={contact.avatarUrl.startsWith('/images/team/')}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-white font-semibold"
          style={{
            background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
            fontSize: `${size * 0.4}px`,
          }}
          aria-label={`${contact.displayName} avatar`}
        >
          {initials}
        </div>
      )}
    </div>
  )
}

