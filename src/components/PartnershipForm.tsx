'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface PartnershipFormData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  website: string
  partnershipType: string
  businessDescription: string
  experience: string
  targetMarkets: string
  additionalInfo: string
}

export default function PartnershipForm() {
  const t = useTranslations('partnership.form')
  const [formData, setFormData] = useState<PartnershipFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    businessDescription: '',
    experience: '',
    targetMarkets: '',
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<PartnershipFormData>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof PartnershipFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PartnershipFormData> = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = t('validation.companyName')
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = t('validation.contactPerson')
    }
    if (!formData.email.trim()) {
      newErrors.email = t('validation.email')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailFormat')
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('validation.phone')
    }
    if (!formData.partnershipType) {
      newErrors.partnershipType = t('validation.partnershipType')
    }
    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = t('validation.businessDescription')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/partnership/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          website: '',
          partnershipType: '',
          businessDescription: '',
          experience: '',
          targetMarkets: '',
          additionalInfo: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Partnership form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('success.title')}</h3>
        <p className="text-gray-700 mb-6">{t('success.message')}</p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
        >
          {t('success.submitAnother')}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('title')}</h3>
        <p className="text-gray-700">{t('description')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('fields.companyName')} *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('placeholders.companyName')}
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('fields.contactPerson')} *
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
                errors.contactPerson ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('placeholders.contactPerson')}
            />
            {errors.contactPerson && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('fields.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('placeholders.email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
              {t('fields.phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('placeholders.phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
            {t('fields.website')}
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder={t('placeholders.website')}
          />
        </div>

        <div>
          <label htmlFor="partnershipType" className="block text-sm font-semibold text-gray-900 mb-2">
            {t('fields.partnershipType')} *
          </label>
          <select
            id="partnershipType"
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
              errors.partnershipType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">{t('placeholders.partnershipType')}</option>
            <option value="logistics">{t('options.logistics')}</option>
            <option value="financial">{t('options.financial')}</option>
            <option value="insurance">{t('options.insurance')}</option>
            <option value="other">{t('options.other')}</option>
          </select>
          {errors.partnershipType && (
            <p className="mt-1 text-sm text-red-600">{errors.partnershipType}</p>
          )}
        </div>

        <div>
          <label htmlFor="businessDescription" className="block text-sm font-semibold text-gray-900 mb-2">
            {t('fields.businessDescription')} *
          </label>
          <textarea
            id="businessDescription"
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
              errors.businessDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('placeholders.businessDescription')}
          />
          {errors.businessDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.businessDescription}</p>
          )}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-semibold text-gray-900 mb-2">
            {t('fields.experience')}
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder={t('placeholders.experience')}
          />
        </div>

        <div>
          <label htmlFor="targetMarkets" className="block text-sm font-semibold text-gray-900 mb-2">
            {t('fields.targetMarkets')}
          </label>
          <input
            type="text"
            id="targetMarkets"
            name="targetMarkets"
            value={formData.targetMarkets}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder={t('placeholders.targetMarkets')}
          />
        </div>

        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-900 mb-2">
            {t('fields.additionalInfo')}
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder={t('placeholders.additionalInfo')}
          />
        </div>

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <XMarkIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{t('error.message')}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-brand-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}
