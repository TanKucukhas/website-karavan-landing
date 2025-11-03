"use client"

import { QRContact } from '@/lib/vcard'
import { trackCTAClick } from '@/lib/qr-analytics'

interface SocialLinksProps {
  contact: QRContact
}

/**
 * Social links section - LinkedIn mandatory, others optional
 * Icons only with accessible labels
 */
export default function SocialLinks({ contact }: SocialLinksProps) {
  const socialLinks = []
  
  // LinkedIn (mandatory if exists)
  if (contact.social.linkedin) {
    socialLinks.push({
      name: 'LinkedIn',
      url: contact.social.linkedin,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    })
  }
  
  // X (Twitter)
  if (contact.social.x) {
    socialLinks.push({
      name: 'X',
      url: contact.social.x,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    })
  }
  
  // WhatsApp (use contact.whatsappE164 if social.whatsapp not set)
  const whatsappUrl = contact.social.whatsapp || (contact.whatsappE164 ? `http://wa.me/${contact.whatsappE164.replace(/[^0-9]/g, '')}` : '')
  if (whatsappUrl) {
    socialLinks.push({
      name: 'WhatsApp',
      url: whatsappUrl,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
    })
  }
  
  // WeChat
  if (contact.social.wechat) {
    socialLinks.push({
      name: 'WeChat',
      url: contact.social.wechat,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-5.174 1.932-7.13 1.703-1.89 4.154-2.92 6.728-2.92.276 0 .543.028.811.05-.857-2.578.157-5.174 1.933-7.13C17.982 3.582 15.878 2.188 13.587 2.188c-1.594 0-3.089.6-4.28 1.636a9.344 9.344 0 0 0-1.24-.61C7.42 2.28 6.73 2.188 6.03 2.188zm5.023 6.093l-.83 1.44-.83-1.44h-1.59l1.59-2.75 1.59 2.75zm4.5 0l-.83 1.44-.83-1.44h-1.59l1.59-2.75 1.59 2.75z"/>
        </svg>
      ),
    })
  }
  
  // Telegram
  if (contact.social.telegram) {
    socialLinks.push({
      name: 'Telegram',
      url: contact.social.telegram,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.84 8.66c-.134.604-.482.753-.975.467l-2.694-1.984-1.298 1.25c-.15.15-.276.276-.566.276l.192-2.73 4.95-4.472c.216-.192-.047-.298-.334-.107l-6.116 3.852-2.636-.825c-.574-.18-.59-.574.107-.894l10.294-3.97c.457-.17.857.107.708.683z"/>
        </svg>
      ),
    })
  }
  
  // Hide section if no social links
  if (socialLinks.length === 0) {
    return null
  }
  
  return (
    <div className="bg-white px-6 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick('linkedin', contact.slug)}
              className="text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded-full p-2"
              aria-label={`Visit ${contact.displayName}'s ${link.name} profile`}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

