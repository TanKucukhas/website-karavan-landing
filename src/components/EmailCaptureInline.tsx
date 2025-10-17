'use client';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';
import ToggleSwitch from './ToggleSwitch';
import { useTranslations } from 'next-intl'

type Props = { defaultRole?: 'seller'|'buyer'; source?: string };

export default function EmailCaptureInline({ defaultRole='seller', source='inline' }: Props) {
  const t = useTranslations('hero')
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'seller'|'buyer'>(defaultRole);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
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
          country: '', // Could be added to the form if needed
          source: source,
          pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
          pageName: typeof document !== 'undefined' ? document.title : undefined,
          utm,
          hutk,
          lang: typeof navigator !== 'undefined' ? navigator.language : undefined,
          honeypot: ''
        })
      });
      if (!res.ok) throw new Error('Submit failed');
      analytics.heroFormSubmit(role);
      setOk(true);
    } catch {
      setError('Please try again');
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="rounded-xl bg-green-50 text-green-800 px-4 py-3 text-center">
        <div className="font-semibold">{t('successTitle')}</div>
        <div className="text-sm">{t('successMessage')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-sm">
      {/* Email Input - Full Line */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">{t('emailLabel')}</label>
          <input
            id="email"
            type="email"
            required
            placeholder={t('emailPlaceholder')}
            className="w-full rounded-xl bg-white border border-gray-300 shadow-sm px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:outline-none text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (email && !email.includes('@')) {
                setError('Invalid email');
              } else {
                setError('');
              }
            }}
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        {/* Role Toggle and CTA Button Row */}
        <div className="flex flex-col gap-4">
          {/* Role Toggle Switch */}
          <ToggleSwitch
            leftLabel={t('startSelling')}
            rightLabel={t('findSuppliers')}
            defaultValue={defaultRole === 'seller' ? 'left' : 'right'}
            onToggle={(value) => setRole(value === 'left' ? 'seller' : 'buyer')}
          />

          {/* CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl btn-brand-gradient disabled:opacity-60 focus:ring-2 focus:ring-brand-600 focus:outline-none text-base font-medium"
          >
            {loading ? 'Submitting...' : t('cta')}
          </button>
        </div>
      </form>

      {/* Trust Line with Color Indicators */}
      <div className="text-sm text-gray-500 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{t('trust.noMembershipFees')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
          <span>{t('trust.payOnlyForServices')}</span>
        </div>
      </div>
    </div>
  );
}
