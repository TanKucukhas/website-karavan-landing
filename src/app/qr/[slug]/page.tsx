import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import qrContactsData from '@/data/qr-contacts.json'
import { QRContact } from '@/lib/vcard'
import HeroPanel from '@/components/qr-contact/HeroPanel'
import SummaryBlock from '@/components/qr-contact/SummaryBlock'
import ContactList from '@/components/qr-contact/ContactList'
import SocialLinks from '@/components/qr-contact/SocialLinks'
import VCardButton from '@/components/qr-contact/VCardButton'
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
      <div className="min-h-screen bg-gray-50">
        <HeroPanel contact={contact} />
        <div className="space-y-0">
          <SummaryBlock contact={contact} />
          <ContactList contact={contact} />
          <SocialLinks contact={contact} />
          <VCardButton contact={contact} />
        </div>
        <QRContactFooter />
      </div>
      <QRPageClient contact={contact} />
    </>
  )
}

