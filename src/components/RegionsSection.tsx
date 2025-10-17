"use client";
import { analytics } from '@/lib/analytics'
import Flag from '@/components/Flag'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function RegionsSection() {
  const t = useTranslations('regions')
  const tNav = useTranslations('header')
  const tSection = useTranslations('regionsSection')
  const tCommon = useTranslations('common')
  const regions = [
    { key: 'turkiye', name: t('turkiye'), flagCode: 'tr', blurb: 'Export hub and operations HQ', href: '/regions/turkiye' },
    { key: 'uzbekistan', name: t('uzbekistan'), flagCode: 'uz', blurb: 'Fast‑growing demand center', href: '/regions/uzbekistan' },
    { key: 'kazakhstan', name: t('kazakhstan'), flagCode: 'kz', blurb: 'Gateway to Central Asia', href: '/regions/kazakhstan' },
    { key: 'kyrgyzstan', name: t('kyrgyzstan'), flagCode: 'kg', blurb: 'Agile cross‑border trade', href: '/regions/kyrgyzstan' },
    { key: 'turkmenistan', name: t('turkmenistan'), flagCode: 'tm', blurb: 'Selective import market', href: '/regions/turkmenistan' },
    { key: 'azerbaijan', name: t('azerbaijan'), flagCode: 'az', blurb: 'Link to Caucasus', href: '/regions/azerbaijan' },
    { key: 'kktc', name: t('kktc'), flagCode: 'tr', blurb: 'Strategic Mediterranean trade hub', href: '/regions/kktc' },
    { key: 'hungary', name: t('hungary'), flagCode: 'hu', blurb: 'European gateway', href: '/regions/hungary' },
  ]

  return (
    <section id="regions" className="lt-section animate-on-scroll scroll-mt-24">
      <div className="lt-container">
        <div className="text-center mb-12">
          <h2 className="lt-heading mb-4">{tNav('nav.regions')}</h2>
          <p className="lt-subtext">{tSection('subheading')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {regions.map((r) => (
            <Link key={r.key} href={r.href} className="lt-card p-6 group hover:shadow-md transition-shadow" onClick={() => analytics.mapNodeClick(r.name)}>
              <div className="flex items-center gap-3 mb-2">
                {r.name === 'KKTC' ? (
                  <Image 
                    src="/images/flags/kktc.png" 
                    alt="KKTC Flag" 
                    width={48} 
                    height={32}
                    className="drop-shadow-sm"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Flag code={r.flagCode} size="lg" title={r.name} shadow />
                )}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">{r.name}</h3>
              </div>
              <p className="text-gray-700">{r.blurb}</p>
              <div className="mt-4 text-sm text-brand-700">{tCommon('explore')}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
