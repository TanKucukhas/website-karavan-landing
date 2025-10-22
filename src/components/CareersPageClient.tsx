'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import JobListing from './JobListing'
import ApplicationModal from './ApplicationModal'

export default function CareersPageClient() {
  const t = useTranslations('careers')
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)

  const openApplicationModal = (jobId: string) => {
    setSelectedJob(jobId)
    setIsApplicationModalOpen(true)
  }

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false)
    setSelectedJob(null)
  }

  const jobs = [
    {
      id: 'senior-developer',
      title: t('jobs.seniorDeveloper.title'),
      department: t('jobs.seniorDeveloper.department'),
      location: t('jobs.seniorDeveloper.location'),
      type: t('jobs.seniorDeveloper.type'),
      description: t('jobs.seniorDeveloper.description'),
      requirements: [
        t('jobs.seniorDeveloper.requirements.1'),
        t('jobs.seniorDeveloper.requirements.2'),
        t('jobs.seniorDeveloper.requirements.3'),
        t('jobs.seniorDeveloper.requirements.4'),
        t('jobs.seniorDeveloper.requirements.5')
      ],
      benefits: [
        t('jobs.seniorDeveloper.benefits.1'),
        t('jobs.seniorDeveloper.benefits.2'),
        t('jobs.seniorDeveloper.benefits.3'),
        t('jobs.seniorDeveloper.benefits.4')
      ]
    }
  ]

  const generalApplication = {
    id: 'general-application',
    title: t('jobs.generalApplication.title'),
    department: t('jobs.generalApplication.department'),
    location: t('jobs.generalApplication.location'),
    type: t('jobs.generalApplication.type'),
    description: t('jobs.generalApplication.description'),
    requirements: [
      t('jobs.generalApplication.requirements.1'),
      t('jobs.generalApplication.requirements.2'),
      t('jobs.generalApplication.requirements.3'),
      t('jobs.generalApplication.requirements.4')
    ],
    benefits: [
      t('jobs.generalApplication.benefits.1'),
      t('jobs.generalApplication.benefits.2'),
      t('jobs.generalApplication.benefits.3'),
      t('jobs.generalApplication.benefits.4')
    ]
  }

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
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span>{t('hero.benefits.remote')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span>{t('hero.benefits.growth')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span>{t('hero.benefits.impact')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('culture.title')}
              </h2>
              <p className="text-lg text-gray-700">
                {t('culture.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('culture.values.teamwork.title')}
                </h3>
                <p className="text-gray-700">
                  {t('culture.values.teamwork.description')}
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('culture.values.innovation.title')}
                </h3>
                <p className="text-gray-700">
                  {t('culture.values.innovation.description')}
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('culture.values.growth.title')}
                </h3>
                <p className="text-gray-700">
                  {t('culture.values.growth.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('positions.title')}
              </h2>
              <p className="text-lg text-gray-700">
                {t('positions.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <JobListing
                  key={job.id}
                  job={job}
                  onApply={() => openApplicationModal(job.id)}
                />
              ))}
            </div>

            {/* General Application Section */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('generalApplication.title')}
                </h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {t('generalApplication.subtitle')}
                </p>
              </div>

              <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-8 border border-brand-200">
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        {t('generalApplication.card.title')}
                      </h4>
                      <p className="text-gray-700 mb-6">
                        {t('generalApplication.card.description')}
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                          <span className="text-gray-700">{t('generalApplication.card.benefits.1')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                          <span className="text-gray-700">{t('generalApplication.card.benefits.2')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                          <span className="text-gray-700">{t('generalApplication.card.benefits.3')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <h5 className="text-lg font-semibold text-gray-900 mb-2">
                          {t('generalApplication.card.cta.title')}
                        </h5>
                        <p className="text-gray-600 mb-4">
                          {t('generalApplication.card.cta.description')}
                        </p>
                        <button
                          onClick={() => openApplicationModal(generalApplication.id)}
                          className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
                        >
                          {t('generalApplication.card.cta.button')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {isApplicationModalOpen && selectedJob && (
        <ApplicationModal
          jobId={selectedJob}
          job={selectedJob === 'general-application' ? generalApplication : jobs.find(j => j.id === selectedJob)!}
          onClose={closeApplicationModal}
        />
      )}
    </main>
  )
}
