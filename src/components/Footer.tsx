'use client'

import { 
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import LanguageSelector from '@/components/LanguageSelector'
import SocialMediaLinks from '@/components/SocialMediaLinks'
import { contactConfig } from '@/config/contact'
import { analytics } from '@/lib/analytics'

export default function Footer() {
  const t = useTranslations('footer')
  
  const footerLinks = {
    product: [
      { name: t('nav.features'), href: '#features', isAnchor: true },
      { name: t('nav.categories'), href: '#categories', isAnchor: true }
    ],
    solutions: [
      { name: t('links.regions'), href: '#regions', isAnchor: true },
      { name: t('links.partnerships'), href: '#partnerships', isAnchor: true }
    ],
    company: [
      { name: t('links.team'), href: '#team', isAnchor: true },
      { name: t('links.careers'), href: '/careers', isAnchor: false },
      { name: t('links.contact'), href: '/contact', isAnchor: false }
    ],
    legal: [
      { name: t('links.privacyPolicy'), href: '#privacy', isAnchor: true },
      { name: t('links.termsOfService'), href: '#terms', isAnchor: true },
      { name: t('links.cookiePolicy'), href: '#cookies', isAnchor: true },
      { name: t('links.gdpr'), href: '#gdpr', isAnchor: true }
    ]
  };

  return (
    <footer className="bg-[color:var(--ink)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="mb-4">
                <Image 
                  src="/images/logo/karavan-logo.svg" 
                  alt="Karavan" 
                  width={112}
                  height={32}
                  className="mb-3 filter brightness-0 invert"
                />
                <div className="text-lg font-semibold text-white">
                  {t('tagline')}
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                {t('description')}
              </p>
              
              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400 text-sm">
                    <div className="font-semibold text-white mb-1">{t('information.mainAddress')}</div>
                    <div>{contactConfig.address.main.street}</div>
                    <div>{contactConfig.address.main.building}</div>
                    <div>{contactConfig.address.main.district}, {contactConfig.address.main.city} {contactConfig.address.main.postalCode}</div>
                    <div className="text-xs text-gray-400 mt-1">{contactConfig.address.main.country}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <a 
                      href={`mailto:${contactConfig.email.primary}`} 
                      className="text-gray-400 hover:text-white transition-colors text-sm block"
                      onClick={() => analytics.externalLinkClick(`mailto:${contactConfig.email.primary}`)}
                    >
                      {contactConfig.email.primary}
                    </a>
                    <div className="text-xs text-gray-400 mt-1">{t('information.emailLabel')}</div>
                  </div>
                </div>
                {contactConfig.phone.primary && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="text-gray-400 text-sm">{contactConfig.phone.primary}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <SocialMediaLinks variant="dark" className="mb-6" />

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{t('language')}:</span>
              <LanguageSelector 
                mode="dropdown" 
                buttonClassName="text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                dropdownClassName="!bg-gray-800 !border-gray-700 bottom-full left-0 mb-2"
                itemClassName="!text-gray-300 hover:!bg-gray-700"
                selectedItemClassName="!bg-gray-700 !text-white"
              />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('product')}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3" />
                  <span>65+ {t('stats.verifiedSuppliers')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3" />
                  <span>3 {t('stats.languagesSupported')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3" />
                  <span>190 {t('stats.brands')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('solutions')}</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('company')}</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-4 text-white">{t('legal')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {t('copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
