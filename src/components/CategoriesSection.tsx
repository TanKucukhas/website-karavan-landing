'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl'
import {
  SwatchIcon,
  Cog6ToothIcon,
  BeakerIcon,
  ShoppingBagIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  HeartIcon,
  HomeModernIcon,
  BoltIcon,
  CubeIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'


export default function CategoriesSection() {
  const t = useTranslations('categories')
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
    email: '',
    description: '',
    honeypot: '',
    captcha: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.categoryName,
          email: formData.email,
          subject: 'Category Request',
          message: `Category Request: ${formData.categoryName}\n\nDescription: ${formData.description}`,
          honeypot: formData.honeypot,
          captcha: formData.captcha,
          source: 'category-request'
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          categoryName: '',
          email: '',
          description: '',
          honeypot: '',
          captcha: ''
        });
        setTimeout(() => {
          setShowRequestForm(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('API Error:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    {
      name: t('items.textilesApparel'),
      subcategories: ['Cotton fabrics', 'Ready-made garments', 'Home textiles'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['OEKO-TEX', 'GOTS'],
      moq: '$5,000',
      leadTime: '7-14 days',
      corridors: ['TR→UZ', 'TR→KZ'],
      demand: t('demand.high')
    },
    {
      name: t('items.machineryEquipment'),
      subcategories: ['Agricultural machinery', 'Industrial equipment', 'Construction machinery'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['CE', 'ISO 9001'],
      moq: '$25,000',
      leadTime: '21-30 days',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG'],
      demand: t('demand.medium')
    },
    {
      name: t('items.chemicalsPharmaceuticals'),
      subcategories: ['Industrial chemicals', 'Pharmaceuticals', 'Cosmetics'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['GMP', 'ISO 14001'],
      moq: '$10,000',
      leadTime: '14-21 days',
      corridors: ['TR→UZ', 'TR→KZ'],
      demand: t('demand.high')
    },
    {
      name: t('items.agricultureFood'),
      subcategories: ['Dried fruits', 'Nuts', 'Spices', 'Processed foods'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['HACCP', 'Organic'],
      moq: '$3,000',
      leadTime: '7-10 days',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG'],
      demand: t('demand.veryHigh')
    },
    {
      name: t('items.constructionMaterials'),
      subcategories: ['Cement', 'Steel products', 'Ceramic tiles'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['CE', 'ISO 9001'],
      moq: '$15,000',
      leadTime: '14-21 days',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→TM'],
      demand: t('demand.high')
    },
    {
      name: t('items.automotiveParts'),
      subcategories: ['Engine parts', 'Brake systems', 'Electrical components'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['IATF 16949', 'CE'],
      moq: '$8,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      name: t('items.electronicsIT'),
      subcategories: ['Consumer electronics', 'IT equipment', 'Telecommunications'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['CE', 'FCC'],
      moq: '$12,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      name: t('items.medicalEquipment'),
      subcategories: ['Diagnostic equipment', 'Surgical instruments', 'Disposables'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['CE Medical', 'FDA'],
      moq: '$20,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      name: t('items.furnitureHome'),
      subcategories: ['Office furniture', 'Home furniture', 'Decorative items'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['FSC', 'CE'],
      moq: '$7,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      name: t('items.energyPower'),
      subcategories: ['Solar panels', 'Generators', 'Electrical equipment'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['IEC', 'CE'],
      moq: '$30,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→TM']
    },
    {
      name: t('items.packagingMaterials'),
      subcategories: ['Plastic packaging', 'Cardboard boxes', 'Labels'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['ISO 9001', 'FSC'],
      moq: '$4,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      name: t('items.toolsHardware'),
      subcategories: ['Hand tools', 'Power tools', 'Hardware supplies'].map((s) => t(`subitems.${s.replace(/[^a-zA-Z]/g,'').toLowerCase()}`)),
      certificates: ['CE', 'ISO 9001'],
      moq: '$6,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    }
  ];

  return (
    <section id="categories" className="lt-section animate-on-scroll">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {(showAll ? categories : categories.slice(0, 8)).map((category, index) => {
            const IconComponents = [
              SwatchIcon, // Textiles & Apparel
              Cog6ToothIcon, // Machinery & Equipment
              BeakerIcon, // Chemicals & Pharmaceuticals
              ShoppingBagIcon, // Agriculture & Food
              BuildingOffice2Icon, // Construction Materials
              WrenchScrewdriverIcon, // Automotive Parts
              CpuChipIcon, // Electronics & IT
              HeartIcon, // Medical Equipment
              HomeModernIcon, // Furniture & Home
              BoltIcon, // Energy & Power
              CubeIcon, // Packaging Materials
              WrenchScrewdriverIcon, // Tools & Hardware
            ]
            const Icon = IconComponents[index % IconComponents.length]
            const tags = category.subcategories.slice(0, 2)
            return (
              <div key={index} className="lt-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    <h3 className="text-base font-semibold text-gray-900">{category.name}</h3>
                  </div>
                  <span className="lt-badge">{category.demand ?? t('demand.high')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs rounded bg-gray-50 border text-gray-700">{t}</span>
                  ))}
                </div>
                {/* per-card CTAs removed to reduce noise */}
              </div>
            )
          })}
        </div>
        <div className="text-center mb-12">
          {!showAll && (
            <button className="btn-outline-brand" onClick={() => setShowAll(true)}>{t('viewAll')}</button>
          )}
        </div>


        {/* Request Category Form */}
        <div className="lt-card p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('requestSection.heading')}</h3>
            <p className="text-gray-600">{t('requestSection.subheading')}</p>
          </div>
          
          {!showRequestForm ? (
            <div className="text-center">
              <button onClick={() => setShowRequestForm(true)} className="btn-brand-gradient">
                {t('requestSection.cta')}
              </button>
            </div>
          ) : submitStatus === 'success' ? (
            <div className="max-w-md mx-auto text-center">
              <div className="bg-emerald-500 text-white px-6 py-4 rounded-lg font-semibold">
                <CheckCircleIcon className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-1">{t('requestSection.successTitle')}</h3>
                <p className="text-sm">{t('requestSection.successMessage')}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              {/* Honeypot field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('requestSection.form.categoryName')}</label>
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                  placeholder={t('requestSection.form.categoryNamePlaceholder')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('requestSection.form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                  placeholder={t('requestSection.form.emailPlaceholder')}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('requestSection.form.description')}</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                  rows={3}
                  placeholder={t('requestSection.form.descriptionPlaceholder')}
                  required
                />
              </div>
              
              {/* Simple math captcha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('requestSection.form.captchaLabel')}
                </label>
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                  placeholder={t('requestSection.form.captchaPlaceholder')}
                  required
                />
              </div>

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p className="text-sm">Failed to submit request. Please try again.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 btn-brand disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('requestSection.form.submitting')}
                    </>
                  ) : (
                    t('requestSection.form.submit')
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowRequestForm(false)} 
                  className="flex-1 btn-outline-brand"
                >
                  {t('requestSection.form.cancel')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
