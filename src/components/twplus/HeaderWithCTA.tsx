"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { analytics, track } from '@/lib/analytics'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Regions', href: '#regions' },
  { name: 'Categories', href: '#categories' },
  { name: 'Contact', href: '/contact' },
]

export default function HeaderWithCTA() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<'en'|'tr'|'ru'|'uz'|'kk'|'ky'>('en')
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Only show navigation links on homepage
  const isHomePage = pathname === '/'
  const displayNavigation = isHomePage ? navigation : navigation.filter(item => item.name === 'Contact')

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

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
    { code: 'ky', name: 'Кыргызча', flag: '🇰🇬' },
  ]
  const currentLang = languages.find(l => l.code === selectedLanguage) ?? languages[0]

  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 inset-x-0 z-50 border-b border-gray-200/50">
      <nav aria-label="Global" className="w-full">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-x-6 py-4">
          <div className="flex lg:flex-1">
            <Link href="/" className="p-1.5">
              <span className="sr-only">Karavan</span>
              <Image alt="Karavan" src="/images/logo/karavan-logo.svg" width={112} height={32} priority />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-4">
          {/* Right-aligned navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {displayNavigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-700 hover:text-brand-600 hover:underline underline-offset-4 decoration-brand-600" onClick={() => track('nav_click', { item: item.name })}>
                {item.name}
              </a>
            ))}
          </div>
          {/* Divider */}
          <span className="hidden lg:block h-6 w-px bg-gray-200" aria-hidden="true" />
          {/* CTA */}
          <a
            href="#cta"
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-[#3069B4] hover:bg-[#285a99] shadow-lg hover:shadow-xl transition-all duration-200 ring-1 ring-[#3069B4]/20"
            onClick={() => analytics.ctaClick('header-desktop')}
          >
            Get Early Access
          </a>
          {/* Divider */}
          <span className="hidden lg:block h-6 w-px bg-gray-200" aria-hidden="true" />
          {/* Language Selector (EN + flag) */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
            >
              <span className="uppercase">{selectedLanguage}</span>
              <span className="text-base" aria-label={currentLang.name} title={currentLang.name}>{currentLang.flag}</span>
            </button>
            {languageDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setSelectedLanguage(language.code as typeof selectedLanguage)
                      setLanguageDropdownOpen(false)
                      analytics.languageChange(language.code)
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                      selectedLanguage === language.code ? 'bg-brand-50 text-brand-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-base">{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 lg:hidden inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          </div>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <Link href="/" className="p-1.5">
              <span className="sr-only">Karavan</span>
              <Image alt="Karavan" src="/images/logo/karavan-logo.svg" width={112} height={32} priority />
            </Link>
            <a
              href="#cta"
              className="ml-auto inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-[#3069B4] hover:bg-[#285a99] shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => analytics.ctaClick('header-mobile')}
            >
              Get Early Access
            </a>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-100">
              <div className="space-y-2 py-6">
                {displayNavigation.map((item) => (
                  <a key={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    {item.name}
                  </a>
                ))}
              </div>
              
              {/* Mobile Language Selector */}
              <div className="py-6">
                <div className="px-3 mb-3">
                  <span className="text-sm font-medium text-gray-500">Language</span>
                </div>
                <div className="space-y-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                    onClick={() => {
                    setSelectedLanguage(language.code as typeof selectedLanguage)
                    setMobileMenuOpen(false)
                    analytics.languageChange(language.code)
                  }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-lg ${
                        selectedLanguage === language.code 
                          ? 'bg-brand-50 text-brand-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
