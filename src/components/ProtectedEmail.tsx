'use client'

import { useEffect, useState } from 'react'

type ProtectedEmailProps = {
  email: string
  className?: string
  children?: React.ReactNode
}

/**
 * ProtectedEmail component that obfuscates email addresses from web crawlers
 * while keeping them accessible to users.
 *
 * Uses client-side JavaScript to construct the email address and HTML entities
 * for @ and . symbols to prevent crawler harvesting.
 */
export default function ProtectedEmail({ email, className, children }: ProtectedEmailProps) {
  const [emailParts, setEmailParts] = useState<{ user: string; domain: string } | null>(null)

  useEffect(() => {
    // Split email into parts on the client side only
    const [user, domain] = email.split('@')
    setEmailParts({ user, domain })
  }, [email])

  if (!emailParts) {
    // Server-side render: show obfuscated version
    return (
      <span className={className}>
        {children || email.replace('@', ' [at] ').replace(/\./g, ' [dot] ')}
      </span>
    )
  }

  // Client-side render: construct mailto link with HTML entities
  const constructedEmail = `${emailParts.user}@${emailParts.domain}`

  return (
    <a
      href={`mailto:${constructedEmail}`}
      className={className}
      onClick={(e) => {
        // Construct the email on click to avoid it being in the HTML
        const email = `${emailParts.user}@${emailParts.domain}`
        window.location.href = `mailto:${email}`
        e.preventDefault()
      }}
    >
      {children || (
        <>
          {emailParts.user}
          <span dangerouslySetInnerHTML={{ __html: '&#64;' }} />
          {emailParts.domain}
        </>
      )}
    </a>
  )
}
