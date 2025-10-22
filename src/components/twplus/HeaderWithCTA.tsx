"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { analytics } from '@/lib/analytics'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import LanguageSelector from '@/components/LanguageSelector'

export default function HeaderWithCTA() {
  const t = useTranslations('header')
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t('nav.features'), href: '#features', isAnchor: true },
    { name: t('nav.categories'), href: '#categories', isAnchor: true },
    { name: t('nav.regions'), href: '#regions', isAnchor: true },
    { name: t('nav.contact'), href: '/contact', isAnchor: false },
  ]

  // Only show navigation links on homepage
  const isHomePage = pathname === '/'
  const displayNavigation = isHomePage ? navigation : navigation.filter(item => item.href.includes('contact'))

  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 inset-x-0 z-50 border-b border-gray-200/50">
      <nav aria-label="Global" className="w-full">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-x-6 py-4">
          <div className="flex lg:flex-1">
            <Link href="/" className="p-1.5" aria-label="Karavan - Go to homepage">
              <Image alt="" src="/images/logo/karavan-logo.svg" width={112} height={32} priority />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-4">
          {/* Right-aligned navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {displayNavigation.map((item) => (
              item.isAnchor ? (
                <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-700 hover:text-brand-600 hover:underline underline-offset-4 decoration-brand-600" onClick={() => analytics.navClick(item.name)}>
                  {item.name}
                </a>
              ) : (
                <Link key={item.name} href={item.href} className="text-sm font-semibold text-gray-700 hover:text-brand-600 hover:underline underline-offset-4 decoration-brand-600" onClick={() => analytics.navClick(item.name)}>
                  {item.name}
                </Link>
              )
            ))}
          </div>
          {/* Divider */}
          <span className="hidden lg:block h-6 w-px bg-gray-200" aria-hidden="true" />
          {/* CTA */}
          <a
            href="#cta"
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-[#3069B4] hover:bg-[#285a99] shadow-lg hover:shadow-xl transition-all duration-200 ring-1 ring-[#3069B4]/20 whitespace-nowrap"
            onClick={() => analytics.ctaClick('header-desktop')}
          >
            {t('cta')}
          </a>
          {/* Divider */}
          <span className="hidden lg:block h-6 w-px bg-gray-200" aria-hidden="true" />
          {/* Language Selector */}
          <div className="hidden lg:block">
            <LanguageSelector 
              mode="dropdown" 
              buttonClassName="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50"
            />
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
            <Link href="/" className="p-1.5" aria-label="Karavan - Go to homepage">
              <Image alt="" src="/images/logo/karavan-logo.svg" width={112} height={32} priority />
            </Link>
            <a
              href="#cta"
              className="ml-auto inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-[#3069B4] hover:bg-[#285a99] shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              onClick={() => {
                setMobileMenuOpen(false)
                analytics.ctaClick('header-mobile')
              }}
            >
              {t('cta')}
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
                  item.isAnchor ? (
                    <a 
                      key={item.name} 
                      href={item.href} 
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => {
                        setMobileMenuOpen(false)
                      }}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
              
              {/* Mobile Language Selector */}
              <div className="py-6">
                <div className="px-3 mb-3">
                  <span className="text-sm font-medium text-gray-500">Language</span>
                </div>
                <div className="px-3">
                  <LanguageSelector mode="buttons" />
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
