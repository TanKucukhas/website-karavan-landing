'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckIcon } from './Icons';
import imagesData from '../../public/images/visuals/images.json';

interface FormData {
  name: string;
  company: string;
  email: string;
  role: string;
  category: string;
  country: string;
  gdpr: boolean;
}

export default function HeroSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    role: '',
    category: '',
    country: '',
    gdpr: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          honeypot: '', // Bot protection
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          role: '',
          category: '',
          country: '',
          gdpr: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutralLight to-white flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-neutralDark leading-tight">
                Verified Wholesale Suppliers from the Turkic States
              </h1>
              <p className="text-lg text-neutralGray max-w-xl leading-relaxed">
                Secure B2B trade with escrow payments, integrated logistics and customs support. Launching first in Türkiye & Uzbekistan.
              </p>
              
              {/* Proof bullets */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <span className="text-neutralDark font-medium">Secure escrow with guaranteed delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <span className="text-neutralDark font-medium">Integrated logistics and customs handling</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 w-full sm:w-auto"
              >
                Get Early Access
              </button>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutralLight relative overflow-hidden lg:ml-8">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-5">
              <Image
                src={`/images/visuals/${imagesData[1].file}`}
                alt={imagesData[1].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 relative z-10">
              <div className="text-center">
                <h2 className="text-2xl font-heading font-bold text-neutralDark mb-2">
                  Get Early Access
                </h2>
                <p className="text-neutralGray">
                  Be among the first to experience the future of B2B trade
                </p>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutralDark mb-2">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutralGray rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@company.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-neutralDark mb-2">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutralGray rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="seller">Seller</option>
                    <option value="buyer">Buyer</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-neutralDark mb-2">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutralGray rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select your country</option>
                    <option value="TR">Turkey</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="gdpr"
                    name="gdpr"
                    checked={formData.gdpr}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-neutralGray rounded"
                  />
                  <label htmlFor="gdpr" className="text-sm text-neutralGray">
                    I agree to be contacted by Karavan and understand the privacy policy. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutralGray text-white py-4 rounded-md font-semibold text-lg transition-all duration-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </button>

                {submitStatus === 'success' && (
                  <div className="text-center text-green-600 font-medium">
                    Thank you! We&apos;ll reach out soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-center text-red-600 font-medium">
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
