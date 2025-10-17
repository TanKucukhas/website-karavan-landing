'use client';

import { useState, useEffect, useRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { formTracking } from '@/lib/analytics'
import { useTranslations } from 'next-intl'


export default function CTABanner() {
  const t = useTranslations('cta')
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [country, setCountry] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Enhanced tracking state
  const [formStarted, setFormStarted] = useState(false);
  const formStartTime = useRef<number | null>(null);
  const abandonTracked = useRef(false);

  // Track form abandonment
  useEffect(() => {
    return () => {
      if (formStarted && !abandonTracked.current && !isSubmitted) {
        const filledFields = [];
        if (email) filledFields.push('email');
        if (country) filledFields.push('country');
        formTracking.abandon('early_access_cta', filledFields, role);
        abandonTracked.current = true;
      }
    };
  }, [formStarted, isSubmitted, email, country, role]);

  const handleFieldChange = (fieldName: string, value: string) => {
    // Track form start on first interaction
    if (!formStarted) {
      setFormStarted(true);
      formStartTime.current = Date.now();
      formTracking.start('early_access_cta', role);
    }

    // Update state based on field
    if (fieldName === 'email') setEmail(value);
    else if (fieldName === 'country') setCountry(value);
  };

  const handleRoleChange = (newRole: 'buyer' | 'seller') => {
    setRole(newRole);
    if (formStarted) {
      formTracking.fieldFocus('early_access_cta', 'role');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track submit attempt
    formTracking.submitAttempt('early_access_cta', role);
    
    try {
      const hutk = typeof document !== 'undefined'
        ? document.cookie.split('; ').find(c => c.startsWith('hubspotutk='))?.split('=')[1]
        : undefined;
      const utm = typeof window !== 'undefined'
        ? Object.fromEntries(new URLSearchParams(window.location.search).entries())
        : {};
      const res = await fetch('/api/early-access/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
          country,
          source: 'secure-early-access-cta',
          pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
          pageName: typeof document !== 'undefined' ? document.title : undefined,
          utm,
          hutk,
          lang: typeof navigator !== 'undefined' ? navigator.language : undefined,
          honeypot: ''
        })
      });
      if (!res.ok) throw new Error('Submit failed');
      
      abandonTracked.current = true; // Prevent abandon tracking
      
      // Calculate time spent on form
      const timeOnForm = formStartTime.current 
        ? Math.floor((Date.now() - formStartTime.current) / 1000)
        : 0;

      // Track successful submission
      formTracking.submitSuccess('early_access_cta', role, {
        country: country,
        time_on_form: timeOnForm,
      });
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      formTracking.submitError('early_access_cta', err instanceof Error ? err.message : 'Submit failed', role);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="section-padding bg-gradient-to-r from-[#0b1220] via-[#0e1a33] to-[#0b1220] text-white relative animate-on-scroll">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">{t('heading')}</h2>
          <p className="text-white/85 mb-6 max-w-2xl mx-auto">{t('description')}</p>

          {/* Enhanced CTA Form */}
          <div className="max-w-lg mx-auto">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/15">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">{t('form.emailLabel')}</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onFocus={() => formTracking.fieldFocus('early_access_cta', 'email')}
                      placeholder={t('form.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">{t('form.roleLabel')}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleRoleChange('buyer')}
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          role === 'buyer' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {t('form.roles.findSuppliers')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleChange('seller')}
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          role === 'seller' 
                            ? 'border-brand-600 bg-brand-50 text-brand-700' 
                            : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {t('form.roles.startSelling')}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-white mb-2">{t('form.countryLabel')}</label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => handleFieldChange('country', e.target.value)}
                      onFocus={() => formTracking.fieldFocus('early_access_cta', 'country')}
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                      required
                    >
                      <option value="">{t('form.selectCountry')}</option>
                      <option value="Türkiye">Türkiye</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Other">{t('form.other')}</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-gradient-outline text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('form.submitting')}
                      </>
                    ) : (
                      t('form.submit')
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-500 text-white px-8 py-6 rounded-2xl font-semibold text-center">
                <CheckCircleIcon className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-2">{t('successTitle')}</h3>
                <p>{t('successMessage')}</p>
              </div>
            )}
            <p className="text-white/90 text-sm mt-4">{t('footerNote')}</p>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-1.5">{t('benefits.earlyAccessTitle')}</h3>
              <p className="text-white/90 text-sm">{t('benefits.earlyAccessDesc')}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-1.5">{t('benefits.noFeesTitle')}</h3>
              <p className="text-white/90 text-sm">{t('benefits.noFeesDesc')}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-1.5">{t('benefits.noSpamTitle')}</h3>
              <p className="text-white/90 text-sm">{t('benefits.noSpamDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
