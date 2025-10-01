'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { 
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Flag from '@/components/Flag'

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'en', name: 'English', flagCode: 'us' },
    { code: 'tr', name: 'Türkçe', flagCode: 'tr' },
    { code: 'ru', name: 'Русский', flagCode: 'ru' },
    { code: 'uz', name: "O'zbek", flagCode: 'uz' },
    { code: 'kk', name: 'Қазақша', flagCode: 'kz' },
    { code: 'ky', name: 'Кыргызча', flagCode: 'kg' },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Categories', href: '#categories' },
      { name: 'Sales Models', href: '#sales-models' },
      { name: 'Pricing', href: '#pricing' }
    ],
    solutions: [
      { name: 'For Buyers', href: '/buyer' },
      { name: 'For Sellers', href: '/seller' },
      { name: 'Regions', href: '/regions' },
      { name: 'Partnerships', href: '#partnerships' }
    ],
    company: [
      { name: 'Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  // Social Media Icons as SVG Components
  const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  const TwitterIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  const YouTubeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  const WebsiteIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.568 18.935c-4.293-.496-7.662-3.865-8.158-8.158l8.158 8.158zm1.568-1.568L4.223 6.935c.496-4.293 3.865-7.662 8.158-8.158l8.158 8.158c-.496 4.293-3.865 7.662-8.158 8.158z"/>
    </svg>
  );

  const socialLinks = [
    { name: 'Website', icon: WebsiteIcon, href: 'https://karavan.net/' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://www.linkedin.com/company/KaravanOfficial' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/KaravanConnect' },
    { name: 'YouTube', icon: YouTubeIcon, href: 'https://www.youtube.com/@KaravanGlobal' },
    { name: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/KaravanConnect' },
    { name: 'X (Twitter)', icon: TwitterIcon, href: 'https://x.com/KaravanConnect' }
  ];

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
                  Trade Without Barriers
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                The B2B platform connecting Turkish exporters with Central Asian markets. 
                Trust, payments, logistics, and customs - all in one place.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400 text-sm">
                    <div className="font-semibold text-white mb-1">KARAVAN DIGITAL CORP</div>
                    <div>32 HILLCREST RD</div>
                    <div>WARREN, NJ 07059</div>
                    <div className="text-xs text-gray-500 mt-1">United States</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <a href="mailto:info@karavan.net" className="text-gray-400 hover:text-white transition-colors text-sm block">
                      info@karavan.net
                    </a>
                    <div className="text-xs text-gray-500 mt-1">General Inquiries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-gray-400 text-sm">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Language:</span>
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <Flag 
                    code={languages.find(lang => lang.name === selectedLanguage)?.flagCode || 'us'} 
                    size="sm" 
                  />
                  {selectedLanguage}
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
              
              {languageDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language.name)
                        setLanguageDropdownOpen(false)
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-700 ${
                        selectedLanguage === language.name ? 'bg-gray-700 text-white' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-base">
                        <Flag code={language.flagCode} size="sm" />
                      </span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Quick Stats */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3" />
                  <span>150+ Verified Suppliers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3" />
                  <span>6 Languages Supported</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3" />
                  <span>91% Success Rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Karavan Digital Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
