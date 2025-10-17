"use client";

import Image from 'next/image'
import partnersData from '../../public/images/solution-partners/partners.json'
import CountUp from '@/components/CountUp'
import { useTranslations } from 'next-intl'

export default function TrustedPartnersSection() {
  const t = useTranslations('trustedPartners')
  const partners = partnersData
  return (
    <section className="lt-section animate-on-scroll" id="partners">
      <div className="lt-container">
        <div className="text-center mb-12">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-8 items-center justify-items-center">
          {partners.map((p: { name: string; logo: string; description: string }, idx: number) => (
            <div key={idx} className="flex items-center justify-center">
              <Image 
                src={p.logo} 
                alt={p.name} 
                width={140} 
                height={40} 
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <div className="lt-card p-6 text-center">
            <div className="text-3xl font-bold text-brand-600"><CountUp end={3} suffix="M" /></div>
            <div className="text-gray-700">{t('companies')}</div>
          </div>
          <div className="lt-card p-6 text-center">
            <div className="text-3xl font-bold text-brand-600"><CountUp end={6} /></div>
            <div className="text-gray-700">{t('nationalChambers')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
