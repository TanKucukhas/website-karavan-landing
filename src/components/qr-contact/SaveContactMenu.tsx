"use client"

import { useState, useRef, useEffect } from 'react'
import { QRContact, generateVCard, getVCardFilename } from '@/lib/vcard'
import { trackCTAClick, trackEmailVCardSubmit, trackEmailSent } from '@/lib/qr-analytics'

interface SaveContactMenuProps {
  contact: QRContact
  isOpen: boolean
  onClose: () => void
  buttonRef: React.RefObject<HTMLButtonElement>
}

/**
 * Dropdown menu for Save Contact action
 * Desktop: action sheet attached to button
 * Mobile: bottom sheet
 */
export default function SaveContactMenu({ contact, isOpen, onClose, buttonRef }: SaveContactMenuProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'email' | 'success'>('menu')
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Close menu on outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, buttonRef])

  // Focus email input when switching to email tab
  useEffect(() => {
    if (activeTab === 'email' && emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [activeTab])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleDownload = () => {
    trackCTAClick('vcard', contact.slug)
    
    const vcardContent = generateVCard(contact)
    const filename = getVCardFilename(contact)
    
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    onClose()
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Enter a valid email')
      return
    }

    if (!validateEmail(email)) {
      setError('Enter a valid email')
      return
    }

    setLoading(true)
    trackCTAClick('email_vcard', contact.slug)
    trackEmailVCardSubmit(contact.slug)

    try {
      const apiUrl = `/api/qr/${contact.slug}/email-vcard/`
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          marketingConsent,
          honeypot: '',
        }),
      })

      if (response.status === 404) {
        throw new Error('Email API not available in development. This feature works in production on Cloudflare Pages.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      setActiveTab('success')
      setResendCooldown(60)
      
      trackEmailSent(contact.slug, data.messageId)
      
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send email'
      if (errorMessage.includes('minute') || errorMessage.includes('rate limit')) {
        setError('Try again in a minute')
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = () => {
    if (resendCooldown > 0) return
    setActiveTab('email')
    setError('')
  }

  if (!isOpen) return null

  // Calculate menu position (desktop: attached to button, mobile: bottom sheet)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const buttonRect = buttonRef.current?.getBoundingClientRect()
  const menuStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: '16px 16px 0 0',
      }
    : buttonRect
      ? {
          position: 'fixed',
          top: `${buttonRect.bottom + 8}px`,
          left: `${buttonRect.left + buttonRect.width / 2}px`,
          transform: 'translateX(-50%)',
        }
      : {}

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Menu */}
      <div
        ref={menuRef}
        className={`bg-white z-50 ${
          isMobile ? 'w-full' : 'w-[320px]'
        }`}
        style={{
          ...menuStyle,
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
          borderRadius: isMobile ? '16px 16px 0 0' : '12px',
          maxHeight: isMobile ? '80vh' : 'auto',
          overflowY: 'auto',
        }}
        role="menu"
        aria-label="Save contact options"
      >
        {activeTab === 'menu' && (
          <div className="p-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              style={{ height: '44px' }}
              role="menuitem"
              aria-label="Download vCard"
            >
              <svg className="w-5 h-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span className="text-sm font-medium text-[#111827]">Download vCard</span>
            </button>
            
            <button
              onClick={() => setActiveTab('email')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              style={{ height: '44px' }}
              role="menuitem"
              aria-label="Email me this contact"
            >
              <svg className="w-5 h-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-[#111827]">Email me this contact</span>
            </button>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setActiveTab('menu')}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Back to menu"
              >
                <svg className="w-5 h-5 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-sm font-semibold text-[#111827]">Email me this contact</h3>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[#374151] mb-2">
                  Email address
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#355FA0] focus:border-[#355FA0] transition-colors bg-white text-sm"
                  required
                  disabled={loading}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'email-error' : undefined}
                />
                {error && (
                  <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#355FA0] border-gray-300 rounded focus:ring-[#355FA0]"
                  />
                  <span className="text-xs text-[#6B7280] font-normal">
                    Also send me Karavan updates (optional)
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#355FA0] hover:bg-[#2D528A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 text-sm"
                style={{ borderRadius: '10px' }}
              >
                {loading ? 'Sending...' : 'Send Contact Card'}
              </button>

              <p className="text-xs text-[#6B7280] text-center font-normal">
                We&apos;ll email you this one contact card. No newsletter unless you opt in.
              </p>
            </form>
          </div>
        )}

        {activeTab === 'success' && (
          <div className="p-4 text-center space-y-3">
            <div className="flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827] mb-1">
                Sent. Check your inbox.
              </p>
              <p className="text-xs text-[#6B7280]">
                The email should arrive within a few minutes.
              </p>
            </div>
            {resendCooldown > 0 ? (
              <p className="text-xs text-[#6B7280]">
                Resend available in {resendCooldown}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-xs text-[#355FA0] hover:text-[#2D528A] underline font-normal"
              >
                Resend
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

