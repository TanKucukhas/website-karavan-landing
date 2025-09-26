'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitToHubSpot } from '@/lib/hubspot';

const emailSchema = z.object({ email: z.string().email('Valid email required') });

const detailsSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  company: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  categories: z.array(z.string()).min(0).optional(),
  companySize: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: 'Consent required' }),
});

type EmailStep = z.infer<typeof emailSchema>;
type DetailsStep = z.infer<typeof detailsSchema>;

interface LeadFormProps {
  role: 'buyer' | 'seller';
  region?: string;
  presetCategories?: string[];
}

export default function LeadForm({ role, region, presetCategories = [] }: LeadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const disposableDomains = useMemo(() => ['mailinator.com', 'tempmail.com', '10minutemail.com'], []);

  const emailForm = useForm<EmailStep>({ resolver: zodResolver(emailSchema), defaultValues: { email: '' } });
  const detailsForm = useForm<DetailsStep>({ resolver: zodResolver(detailsSchema), defaultValues: { categories: presetCategories, consent: false } });

  const onEmailSubmit = (data: EmailStep) => {
    const domain = data.email.split('@')[1]?.toLowerCase() ?? '';
    if (disposableDomains.includes(domain)) {
      emailForm.setError('email', { message: 'Please use a business email (no disposable domains).' });
      return;
    }
    setEmail(data.email);
    setStep(2);
  };

  const onDetailsSubmit = async (data: DetailsStep) => {
    setSubmitting(true);
    try {
      const timeToSubmitMs = Date.now() - startTimeRef.current;
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        company: data.company,
        email,
        role,
        category: (data.categories ?? []).join(','),
        country: data.country,
        gdpr: data.consent,
      };
      const res = await submitToHubSpot(payload);
      if (!res.success) throw new Error(res.message);
      const params = new URLSearchParams({ role, region: region ?? '', t: String(timeToSubmitMs) });
      window.location.href = `/thanks?${params.toString()}`;
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  return (
    <div className="rounded-2xl border border-neutralLight bg-white p-6">
      {step === 1 && (
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutralDark">Work Email</label>
            <input type="email" className="input mt-1" placeholder="name@company.com" {...emailForm.register('email')} aria-invalid={!!emailForm.formState.errors.email} aria-describedby="email-error" />
            {emailForm.formState.errors.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1" aria-live="polite">{emailForm.formState.errors.email.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">Continue</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={detailsForm.handleSubmit(onDetailsSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutralDark">First Name</label>
              <input type="text" className="input mt-1" {...detailsForm.register('firstName')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutralDark">Last Name</label>
              <input type="text" className="input mt-1" {...detailsForm.register('lastName')} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutralDark">Company</label>
            <input type="text" className="input mt-1" {...detailsForm.register('company')} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutralDark">Country</label>
              <input type="text" className="input mt-1" {...detailsForm.register('country')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutralDark">Company Size</label>
              <select className="input mt-1" {...detailsForm.register('companySize')}>
                <option value="">Select</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value=">200">200+</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutralDark">Categories</label>
            <input type="text" className="input mt-1" placeholder="Comma-separated" onChange={e => detailsForm.setValue('categories', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
          </div>
          <div className="flex items-center gap-2">
            <input id="consent" type="checkbox" {...detailsForm.register('consent')} />
            <label htmlFor="consent" className="text-sm text-neutralDark">I consent to the processing of my data (KVKK/GDPR).</label>
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        </form>
      )}
    </div>
  );
}


