'use client'

import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import CategoriesSection from '@/components/CategoriesSection'

const CTABanner = dynamic(() => import('@/components/CTABanner'), { ssr: false })

export default function BuyerPage() {
  const t = useTranslations('buyer')
  
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-hero">
        <div className="container-custom section-padding text-center">
          <p className="text-sm font-medium text-primary-600">{t('badge')}</p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-[color:var(--ink)]">
            {t('title')} <span className="text-gradient">{t('titleHighlight')}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-gray-600 mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <CategoriesSection />
      <CTABanner />
    </main>
  )
}

