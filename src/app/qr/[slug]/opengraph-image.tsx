import { ImageResponse } from 'next/og'
import qrContactsData from '@/data/qr-contacts.json'
import { QRContact } from '@/lib/vcard'

export const dynamic = 'force-static'

const contacts = qrContactsData as QRContact[]

function getContactBySlug(slug: string): QRContact | undefined {
  return contacts.find((contact) => contact.slug === slug)
}

export function generateStaticParams() {
  return contacts.map((contact) => ({
    slug: contact.slug,
  }))
}

export const alt = 'Contact Card'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = params instanceof Promise ? await params : params
  const contact = getContactBySlug(slug)
  
  if (!contact) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: '#3069B4',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          Contact Not Found
        </div>
      ),
      { ...size }
    )
  }
  
  // Try to load avatar image
  let avatarUrl = ''
  if (contact.avatarUrl) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karavan.net'
      const imageUrl = contact.avatarUrl.startsWith('http')
        ? contact.avatarUrl
        : `${baseUrl}${contact.avatarUrl}`
      
      // Fetch and convert to base64 for OG image
      const imageResponse = await fetch(imageUrl)
      if (imageResponse.ok) {
        const arrayBuffer = await imageResponse.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')
        const contentType = imageResponse.headers.get('content-type') || 'image/webp'
        avatarUrl = `data:${contentType};base64,${base64}`
      }
    } catch (error) {
      console.error('Failed to load avatar for OG image:', error)
    }
  }
  
  // Generate initials if no avatar
  const initials = avatarUrl
    ? ''
    : `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase()
  
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#3069B4',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Header background */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          {/* Avatar or Initials */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              width={200}
              height={200}
              style={{
                borderRadius: '50%',
                marginBottom: '40px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 80,
                fontWeight: 'bold',
                marginBottom: '40px',
              }}
            >
              {initials}
            </div>
          )}
          
          {/* Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {contact.displayName}
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: 36,
              opacity: 0.9,
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            {contact.title}
          </div>
          
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              opacity: 0.8,
              textAlign: 'center',
            }}
          >
            Karavan
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

