'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { 
  GlobeAltIcon, 
  BriefcaseIcon, 
  CameraIcon, 
  TvIcon, 
  BookOpenIcon 
} from '@heroicons/react/24/outline'

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
    { code: 'ky', name: 'Кыргызча', flag: '🇰🇬' },
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
      { name: 'About Us', href: '#about' },
      { name: 'Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'Website', icon: GlobeAltIcon, href: 'https://karavan.net/' },
    { name: 'LinkedIn', icon: BriefcaseIcon, href: 'https://www.linkedin.com/company/KaravanOfficial' },
    { name: 'Instagram', icon: CameraIcon, href: 'https://instagram.com/KaravanConnect' },
    { name: 'YouTube', icon: TvIcon, href: 'www.youtube.com/@KaravanGlobal' },
    { name: 'Facebook', icon: BookOpenIcon, href: 'https://www.facebook.com/KaravanConnect' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="mb-4">
                <img 
                  src="/images/logo/karavan-logo.svg" 
                  alt="Karavan" 
                  className="h-8 w-auto mb-3 filter brightness-0 invert"
                />
                <div className="text-lg font-semibold text-white">
                  Trade Without Barriers
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                The B2B platform connecting Turkish exporters with Central Asian markets. 
                Trust, payments, logistics, and customs - all in one place.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
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
                  className="flex items-center gap-1 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
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
                      <span className="text-base">{language.flag}</span>
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
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
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
              © {new Date().getFullYear()} Karavan. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
