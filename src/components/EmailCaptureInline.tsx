'use client';
import { useState } from 'react';

type Props = { defaultRole?: 'seller'|'buyer'|'both' };

export default function EmailCaptureInline({ defaultRole='seller' }: Props) {
  const [email, setEmail] = useState('');
  const [role, setRole]   = useState<'seller'|'buyer'|'both'>(defaultRole);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: POST to /api/lead
      // await fetch('/api/lead', { method:'POST', body: JSON.stringify({ email, role }) })
      setOk(true);
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return <div className="rounded-xl bg-green-50 text-green-800 px-4 py-3">Check your inbox to confirm your early access.</div>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-center gap-2">
      <label htmlFor="email" className="sr-only">Email</label>
      <input
        id="email"
        type="email"
        required
        placeholder="your@company.com"
        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-accent-600 focus:ring-accent-600"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <select
        aria-label="Role"
        className="rounded-xl border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-accent-600 focus:ring-accent-600"
        value={role}
        onChange={(e)=>setRole(e.target.value as 'seller'|'buyer'|'both')}
      >
        <option value="seller">Seller</option>
        <option value="buyer">Buyer</option>
        <option value="both">Both</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Get Early Access'}
      </button>
    </form>
  );
}
