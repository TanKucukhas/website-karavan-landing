"use client"

import { useState } from 'react'
import { QRContact } from '@/lib/vcard'
import { trackCTAClick, trackEmailVCardSubmit, trackEmailSent } from '@/lib/qr-analytics'

interface EmailVCardFormProps {
  contact: QRContact
}

/**
 * Email vCard form component
 * Allows users to request vCard via email with consent checkboxes
 */
export default function EmailVCardForm({ contact }: EmailVCardFormProps) {
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Client-side validation
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
      // In development, Cloudflare Pages Functions don't work
      // Use the API route directly (will work in production)
      const apiUrl = `/api/qr/${contact.slug}/email-vcard/`
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          marketingConsent,
          honeypot: '', // Honeypot field (should be empty)
        }),
      })

      // If 404, show development message
      if (response.status === 404) {
        throw new Error('Email API not available in development. This feature works in production on Cloudflare Pages.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      setSuccess(true)
      setEmail('')
      setResendCooldown(60)
      
      // Track email sent
      trackEmailSent(contact.slug, data.messageId)
      
      // Start cooldown timer
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
    setSuccess(false)
    setError('')
  }

  return (
    <>
      {/* Email form with card-within-card design */}
      <div className="px-0 py-0">
        <div className="bg-[#F9FAFB] rounded-xl p-5 border border-gray-100 max-w-[320px] mx-auto" style={{ borderRadius: '12px' }}>
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-2">
                    Email me this contact
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F5E9E] focus:border-[#2F5E9E] transition-colors bg-white"
                    required
                    disabled={loading}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? 'email-error' : undefined}
                  />
                  {error && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
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
                      className="mt-0.5 w-4 h-4 text-[#2F5E9E] border-gray-300 rounded focus:ring-[#2F5E9E]"
                    />
                    <span className="text-sm text-[#6B7280] font-normal">
                      Also send me Karavan updates (optional)
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white border-2 border-[#2F5E9E] hover:bg-[#2F5E9E] hover:text-white disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-[#2F5E9E] font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#2F5E9E] focus:ring-offset-2"
                >
                  {loading ? 'Sending...' : 'Send Contact Card'}
                </button>

                <p className="text-xs text-[#6B7280] text-center font-normal">
                  We&apos;ll email you this one contact card. No newsletter unless you opt in.
                </p>
              </form>
          ) : (
            <div className="text-center space-y-3">
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
                <p className="text-base font-semibold text-[#111827] mb-1">
                  Sent. Check your inbox for the contact card.
                </p>
                <p className="text-sm text-[#6B7280]">
                  The email should arrive within a few minutes.
                </p>
              </div>
              {resendCooldown > 0 ? (
                <p className="text-sm text-[#6B7280]">
                  Resend available in {resendCooldown}s
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm text-[#2F5E9E] hover:text-[#27508A] underline font-normal"
                >
                  Resend
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

