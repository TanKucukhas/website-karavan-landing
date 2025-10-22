'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { CheckIcon, StarIcon, UserGroupIcon, GlobeAltIcon, CurrencyDollarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import PartnershipForm from './PartnershipForm'

export default function PartnershipPageClient() {
  const t = useTranslations('partnership')
  const [selectedPartnership, setSelectedPartnership] = useState<string | null>(null)

  const partnershipTypes = [
    {
      id: 'logistics',
      title: t('partnerships.logistics.title'),
      description: t('partnerships.logistics.description'),
      benefits: [
        t('partnerships.logistics.benefits.1'),
        t('partnerships.logistics.benefits.2'),
        t('partnerships.logistics.benefits.3'),
        t('partnerships.logistics.benefits.4')
      ],
      requirements: [
        t('partnerships.logistics.requirements.1'),
        t('partnerships.logistics.requirements.2'),
        t('partnerships.logistics.requirements.3')
      ],
      icon: GlobeAltIcon,
      color: 'bg-blue-500'
    },
    {
      id: 'financial',
      title: t('partnerships.financial.title'),
      description: t('partnerships.financial.description'),
      benefits: [
        t('partnerships.financial.benefits.1'),
        t('partnerships.financial.benefits.2'),
        t('partnerships.financial.benefits.3'),
        t('partnerships.financial.benefits.4')
      ],
      requirements: [
        t('partnerships.financial.requirements.1'),
        t('partnerships.financial.requirements.2'),
        t('partnerships.financial.requirements.3')
      ],
      icon: CurrencyDollarIcon,
      color: 'bg-green-500'
    },
    {
      id: 'insurance',
      title: t('partnerships.insurance.title'),
      description: t('partnerships.insurance.description'),
      benefits: [
        t('partnerships.insurance.benefits.1'),
        t('partnerships.insurance.benefits.2'),
        t('partnerships.insurance.benefits.3'),
        t('partnerships.insurance.benefits.4')
      ],
      requirements: [
        t('partnerships.insurance.requirements.1'),
        t('partnerships.insurance.requirements.2'),
        t('partnerships.insurance.requirements.3')
      ],
      icon: ShieldCheckIcon,
      color: 'bg-purple-500'
    }
  ]

  const successStories = [
    {
      company: t('successStories.story1.company'),
      industry: t('successStories.story1.industry'),
      result: t('successStories.story1.result'),
      quote: t('successStories.story1.quote'),
      author: t('successStories.story1.author'),
      position: t('successStories.story1.position')
    },
    {
      company: t('successStories.story2.company'),
      industry: t('successStories.story2.industry'),
      result: t('successStories.story2.result'),
      quote: t('successStories.story2.quote'),
      author: t('successStories.story2.author'),
      position: t('successStories.story2.position')
    }
  ]

  return (
    <main className="min-h-screen bg-white text-[color:var(--ink)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span>{t('hero.benefits.global')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span>{t('hero.benefits.trusted')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span>{t('hero.benefits.growth')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('partnerships.title')}
              </h2>
              <p className="text-lg text-gray-700">
                {t('partnerships.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {partnershipTypes.map((partnership) => {
                const IconComponent = partnership.icon
                return (
                  <div key={partnership.id} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 ${partnership.color} rounded-lg flex items-center justify-center mr-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {partnership.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-700 mb-6">
                      {partnership.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">{t('partnerships.benefits')}</h4>
                      <ul className="space-y-2">
                        {partnership.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">{t('partnerships.requirements')}</h4>
                      <ul className="space-y-2">
                        {partnership.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <StarIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setSelectedPartnership(partnership.id)}
                      className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                    >
                      {t('partnerships.learnMore')}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('successStories.title')}
              </h2>
              <p className="text-lg text-gray-700">
                {t('successStories.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mr-4">
                      <UserGroupIcon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{story.company}</h3>
                      <p className="text-sm text-gray-600">{story.industry}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {story.result}
                    </span>
                  </div>

                  <blockquote className="text-gray-700 italic mb-4">
                    "{story.quote}"
                  </blockquote>

                  <div className="text-sm text-gray-600">
                    <strong>{story.author}</strong>, {story.position}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-gray-700">
                {t('cta.description')}
              </p>
            </div>
            <PartnershipForm />
          </div>
        </div>
      </section>
    </main>
  )
}
