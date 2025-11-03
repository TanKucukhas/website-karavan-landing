"use client"

import { useState, useRef } from 'react'
import { QRContact } from '@/lib/vcard'
import SaveContactMenu from './SaveContactMenu'

interface VCardButtonProps {
  contact: QRContact
}

/**
 * Save Contact button with dropdown menu
 * Opens menu with Download vCard and Email options
 */
export default function VCardButton({ contact }: VCardButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="bg-[#355FA0] hover:bg-[#2D528A] text-white font-semibold px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#355FA0] focus:ring-offset-2 focus:ring-offset-white flex items-center justify-center gap-2 h-16 w-full sm:w-auto"
        style={{ 
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
          borderRadius: '10px'
        }}
        aria-label={`Save ${contact.displayName}'s contact card`}
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
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
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      <SaveContactMenu
        contact={contact}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        buttonRef={buttonRef}
      />
    </>
  )
}

