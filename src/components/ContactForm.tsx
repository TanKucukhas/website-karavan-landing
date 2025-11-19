'use client'

import { useState, useEffect, useRef } from 'react'
import { EnvelopeIcon, MapPinIcon, PhoneIcon, ClockIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import SocialMediaLinks from '@/components/SocialMediaLinks'
import EmailCaptureInline from '@/components/EmailCaptureInline'
import { useTranslations } from 'next-intl'
import { formTracking, leadQuality } from '@/lib/analytics'
import { contactConfig } from '@/config/contact'
import ProtectedEmail from '@/components/ProtectedEmail'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    honeypot: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isFormVisible, setIsFormVisible] = useState(true)
  
  // Enhanced tracking state
  const [formStarted, setFormStarted] = useState(false)
  const [filledFields, setFilledFields] = useState<string[]>([])
  const formStartTime = useRef<number | null>(null)
  const abandonTracked = useRef(false)

  // Track form abandonment on component unmount
  useEffect(() => {
    return () => {
      // If form was started but not submitted, track abandonment
      if (formStarted && !abandonTracked.current && submitStatus !== 'success') {
        formTracking.abandon('contact', filledFields);
        abandonTracked.current = true;
      }
    };
  }, [formStarted, filledFields, submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    // Track form start on first interaction
    if (!formStarted) {
      setFormStarted(true);
      formStartTime.current = Date.now();
      formTracking.start('contact');
    }

    // Update filled fields list
    if (fieldValue && !filledFields.includes(fieldName)) {
      setFilledFields(prev => [...prev, fieldName]);
    }
    
    setFormData({
      ...formData,
      [fieldName]: fieldValue
    })
  }

  const handleFieldFocus = (fieldName: string) => {
    formTracking.fieldFocus('contact', fieldName);
  }

  const handleFieldError = (fieldName: string, errorMessage: string) => {
    formTracking.error('contact', fieldName, errorMessage);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Track submit attempt
    formTracking.submitAttempt('contact');

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData, source: 'contact-form'})
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setSubmitStatus('success')
        abandonTracked.current = true; // Prevent abandon tracking
        
        // Calculate time spent on form
        const timeOnForm = formStartTime.current 
          ? Math.floor((Date.now() - formStartTime.current) / 1000)
          : 0;

        // Assess lead quality
        const quality = leadQuality.assess('contact', {
          hasCompany: !!formData.company,
          hasMessage: !!formData.message,
          messageLength: formData.message.length,
          timeOnPage: timeOnForm,
        });

        // Track successful submission with lead quality
        formTracking.submitSuccess('contact', 'unknown', {
          subject: formData.subject,
          has_company: !!formData.company,
          message_length: formData.message.length,
          time_on_form: timeOnForm,
          lead_quality: quality.quality,
          quality_score: quality.score,
        });

        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          honeypot: ''
        })
        // Close form immediately after successful submission
        setIsFormVisible(false)
      } else {
        setSubmitStatus('error')
        formTracking.submitError('contact', result.error || 'API Error');
        console.error('API Error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Network Error';
      formTracking.submitError('contact', errorMessage);
      console.error('Network Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('heading')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subheading')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('information.title')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('information.mainAddress')}</h4>
                    <address className="not-italic text-gray-600">
                      <div>{contactConfig.address.main.street}</div>
                      <div>{contactConfig.address.main.building}</div>
                      <div>{contactConfig.address.main.district}, {contactConfig.address.main.city}</div>
                      <div className="text-sm text-gray-500 mt-1">{contactConfig.address.main.postalCode} {contactConfig.address.main.country}</div>
                    </address>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-1">{t('information.branchOffice')}</div>
                      <div className="text-sm text-gray-600">
                        <div>{contactConfig.address.branch.company}</div>
                        <div>{contactConfig.address.branch.street}</div>
                        <div>{contactConfig.address.branch.city}</div>
                        <div className="text-xs text-gray-500 mt-1">{contactConfig.address.branch.country}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('information.email')}</h4>
                    <ProtectedEmail
                      email={contactConfig.email.primary}
                      className="text-brand-600 hover:text-brand-700 transition-colors"
                    />
                    <p className="text-sm text-gray-500 mt-1">{t('information.emailLabel')}</p>
                  </div>
                </div>

                {contactConfig.phone.primary && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{t('information.phone')}</h4>
                      <a href={`tel:${String(contactConfig.phone.primary).replace(/\s/g, '')}`} className="text-brand-600 hover:text-brand-700 transition-colors">
                        {contactConfig.phone.primary}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">{t('information.phoneLabel')}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('information.businessHours')}</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>{t('information.hours')}</p>
                      <p className="text-sm text-gray-500">{t('information.responseTime')}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">{t('information.followUs')}</h4>
                <SocialMediaLinks variant="light" />
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form-section" className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('form.title')}</h3>
              
              {!isFormVisible && submitStatus === 'success' && (
                <div className="text-center py-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                    <p className="text-green-800 text-lg font-medium">
                      {t('form.successMessage')}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsFormVisible(true)
                      setSubmitStatus('idle')
                    }}
                    className="text-brand-600 hover:text-brand-700 font-medium underline"
                  >
                    {t('form.sendAnother')}
                  </button>
                </div>
              )}
              
              {isFormVisible && (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.fullName')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus('name')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder={t('form.fullNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus('email')}
                      onBlur={(e) => {
                        const email = e.target.value;
                        if (email && !email.includes('@')) {
                          handleFieldError('email', 'Invalid email format');
                        }
                      }}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus('company')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      placeholder={t('form.companyPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.subject')}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus('subject')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                    >
                      <option value="">{t('form.subjectPlaceholder')}</option>
                      <option value="general">{t('form.subjectOptions.general')}</option>
                      <option value="partnership">{t('form.subjectOptions.partnership')}</option>
                      <option value="support">{t('form.subjectOptions.support')}</option>
                      <option value="sales">{t('form.subjectOptions.sales')}</option>
                      <option value="other">{t('form.subjectOptions.other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFieldFocus('message')}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <div style={{ display: 'none' }}>
                  <label htmlFor="honeypot">Leave this field empty</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>



                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">
                      {t('form.errorMessage')}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg min-h-[60px]"
                >
                  {isSubmitting ? t('form.sending') : t('form.submit')}
                </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-4">
                <QuestionMarkCircleIcon className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('faq.heading')}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('faq.subheading')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('faq.whatIsKaravan.question')}</h4>
                <p className="text-gray-600">{t('faq.whatIsKaravan.answer')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('faq.howToStart.question')}</h4>
                <p className="text-gray-600">{t('faq.howToStart.answer')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('faq.countries.question')}</h4>
                <p className="text-gray-600">{t('faq.countries.answer')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('faq.payments.question')}</h4>
                <p className="text-gray-600">{t('faq.payments.answer')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('faq.logistics.question')}</h4>
                <p className="text-gray-600">{t('faq.logistics.answer')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('faq.fees.question')}</h4>
                <p className="text-gray-600">{t('faq.fees.answer')}</p>
              </div>
            </div>

            {/* Get Early Access CTA */}
            <div id="cta" className="mt-12 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8 text-center border border-brand-200">
              <h4 className="text-2xl font-bold mb-2 text-gray-900">{t('cta.heading')}</h4>
              <p className="text-gray-700 mb-6">{t('cta.description')}</p>
              <div className="max-w-md mx-auto">
                <EmailCaptureInline defaultRole="seller" source="contact" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
