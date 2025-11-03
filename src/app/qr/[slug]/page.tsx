import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import qrContactsData from '@/data/qr-contacts.json'
import { QRContact } from '@/lib/vcard'
import HeroPanel from '@/components/qr-contact/HeroPanel'
import IdentityBlock from '@/components/qr-contact/IdentityBlock'
import ContactList from '@/components/qr-contact/ContactList'
import ActionBar from '@/components/qr-contact/ActionBar'
import QRContactFooter from '@/components/qr-contact/QRContactFooter'
import QRPageClient from './QRPageClient'

// Type assertion for JSON import
const contacts = qrContactsData as QRContact[]

export const dynamic = 'force-static'

export function generateStaticParams() {
  return contacts.map((contact) => ({
    slug: contact.slug,
  }))
}

function getContactBySlug(slug: string): QRContact | undefined {
  return contacts.find((contact) => contact.slug === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const contact = getContactBySlug(slug)
  
  if (!contact) {
    return {
      title: 'Contact Not Found',
    }
  }
  
  const fullTitle = `${contact.displayName} - ${contact.title} | Karavan`
  const description = contact.summary || `${contact.displayName}, ${contact.title} at ${contact.company}`
  
  return {
    title: fullTitle,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'profile',
      url: `https://karavan.net/qr/${slug}`,
      title: fullTitle,
      description,
      siteName: 'Karavan',
      images: [
        {
          url: `https://karavan.net/qr/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${contact.displayName} - ${contact.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`https://karavan.net/qr/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: `https://karavan.net/qr/${slug}`,
    },
  }
}

export default async function QRContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const contact = getContactBySlug(slug)
  
  if (!contact) {
    notFound()
  }
  
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: contact.displayName,
    jobTitle: contact.title,
    worksFor: {
      '@type': 'Organization',
      name: contact.company,
      url: contact.website,
    },
    email: contact.email,
    telephone: contact.mobileE164,
    url: contact.website,
    sameAs: contact.social.linkedin ? [contact.social.linkedin] : [],
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <HeroPanel contact={contact} />
        
        {/* Main Content - Max width 760px, 24px horizontal padding */}
        <div className="max-w-[760px] mx-auto px-6 flex-1">
          {/* White card with padding to account for avatar overlap */}
          <div className="bg-white rounded-2xl" style={{ 
            marginTop: '40px', // 28px overlap + 12px breathing room
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}>
            {/* Identity Block - 12px below avatar */}
            <div className="mb-4">
              <IdentityBlock contact={contact} />
            </div>
            
            {/* Action Buttons - under identity block */}
            <div className="mt-6">
              <ActionBar contact={contact} />
            </div>
          </div>
          
          {/* Contact Details Card - 24px below identity card */}
          <div className="bg-white rounded-2xl mt-8" style={{ 
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}>
            <ContactList contact={contact} />
          </div>
        </div>
        
        {/* Footer - 32px below contact card, pushed to bottom */}
        <div className="mt-auto pt-8">
          <QRContactFooter />
        </div>
      </div>
      <QRPageClient contact={contact} />
    </>
  )
}

