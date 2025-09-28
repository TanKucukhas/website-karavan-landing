'use client';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';
import ToggleSwitch from './ToggleSwitch';

type Props = { defaultRole?: 'seller'|'buyer' };

export default function EmailCaptureInline({ defaultRole='seller' }: Props) {
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
      // TODO: POST to /api/lead
      // await fetch('/api/lead', { method:'POST', body: JSON.stringify({ email, role }) })
      
      // Analytics tracking
      analytics.heroFormSubmit(role);
      
      setOk(true);
    } catch (err) {
      setError('Please try again');
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="rounded-xl bg-green-50 text-green-800 px-4 py-3 text-center">
        <div className="font-semibold">Check your inbox</div>
        <div className="text-sm">We&apos;ve sent you early access details</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-sm ml-0">
      {/* Email Input - Full Line */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input
            id="email"
            type="email"
            required
            placeholder="your@company.com"
            className="w-full rounded-xl bg-white border border-gray-300 shadow-sm px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (email && !email.includes('@')) {
                setError('Please enter a valid email');
              } else {
                setError('');
              }
            }}
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        {/* Role Toggle and CTA Button Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Role Toggle Switch */}
          <ToggleSwitch
            leftLabel="Seller"
            rightLabel="Buyer"
            defaultValue={defaultRole === 'seller' ? 'left' : 'right'}
            onToggle={(value) => setRole(value === 'left' ? 'seller' : 'buyer')}
          />

          {/* CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-xl btn-brand-gradient disabled:opacity-60 focus:ring-2 focus:ring-brand-600 focus:outline-none"
          >
            {loading ? 'Submitting...' : 'Get Early Access'}
          </button>
        </div>
      </form>

      {/* Trust Line with Color Indicators */}
      <div className="text-sm text-gray-500 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>No membership fees</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
          <span>Pay only for services you use</span>
        </div>
      </div>
    </div>
  );
}
