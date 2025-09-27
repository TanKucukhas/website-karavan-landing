'use client';

import { useState } from 'react';


export default function CategoriesSection() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      name: 'Textiles & Apparel',
      subcategories: ['Cotton fabrics', 'Ready-made garments', 'Home textiles'],
      certificates: ['OEKO-TEX', 'GOTS'],
      moq: '$5,000',
      leadTime: '7-14 days',
      corridors: ['TR→UZ', 'TR→KZ'],
      demand: 'High'
    },
    {
      name: 'Machinery & Equipment',
      subcategories: ['Agricultural machinery', 'Industrial equipment', 'Construction machinery'],
      certificates: ['CE', 'ISO 9001'],
      moq: '$25,000',
      leadTime: '21-30 days',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG'],
      demand: 'Medium'
    },
    {
      name: 'Chemicals & Pharmaceuticals',
      subcategories: ['Industrial chemicals', 'Pharmaceuticals', 'Cosmetics'],
      certificates: ['GMP', 'ISO 14001'],
      moq: '$10,000',
      leadTime: '14-21 days',
      corridors: ['TR→UZ', 'TR→KZ'],
      demand: 'High'
    },
    {
      name: 'Agriculture & Food',
      subcategories: ['Dried fruits', 'Nuts', 'Spices', 'Processed foods'],
      certificates: ['HACCP', 'Organic'],
      moq: '$3,000',
      leadTime: '7-10 days',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG'],
      demand: 'Very High'
    },
    {
      name: 'Construction Materials',
      subcategories: ['Cement', 'Steel products', 'Ceramic tiles'],
      certificates: ['CE', 'ISO 9001'],
      moq: '$15,000',
      leadTime: '14-21 days',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→TM'],
      demand: 'High'
    },
    {
      name: 'Automotive Parts',
      subcategories: ['Engine parts', 'Brake systems', 'Electrical components'],
      certificates: ['IATF 16949', 'CE'],
      moq: '$8,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      name: 'Electronics & IT',
      subcategories: ['Consumer electronics', 'IT equipment', 'Telecommunications'],
      certificates: ['CE', 'FCC'],
      moq: '$12,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      name: 'Medical Equipment',
      subcategories: ['Diagnostic equipment', 'Surgical instruments', 'Disposables'],
      certificates: ['CE Medical', 'FDA'],
      moq: '$20,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      name: 'Furniture & Home',
      subcategories: ['Office furniture', 'Home furniture', 'Decorative items'],
      certificates: ['FSC', 'CE'],
      moq: '$7,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      name: 'Energy & Power',
      subcategories: ['Solar panels', 'Generators', 'Electrical equipment'],
      certificates: ['IEC', 'CE'],
      moq: '$30,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→TM']
    },
    {
      name: 'Packaging Materials',
      subcategories: ['Plastic packaging', 'Cardboard boxes', 'Labels'],
      certificates: ['ISO 9001', 'FSC'],
      moq: '$4,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      name: 'Tools & Hardware',
      subcategories: ['Hand tools', 'Power tools', 'Hardware supplies'],
      certificates: ['CE', 'ISO 9001'],
      moq: '$6,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    }
  ];

  return (
    <section id="categories" className="lt-section">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">Top B2B Categories</h2>
          <p className="lt-subtext">Discover the most popular product categories in Turkey-Central Asia trade, with verified suppliers and streamlined processes.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {(showAll ? categories : categories.slice(0, 6)).map((category, index) => (
            <div key={index} className="lt-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-medium">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.name}</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Subcategories</div>
                  <div className="text-sm text-gray-600">{category.subcategories.join(', ')}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Certificates</div>
                  <div className="flex flex-wrap gap-1">
                    {category.certificates.map((cert, certIndex) => (
                      <span key={certIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Demand</span>
                  <span className="lt-badge">{category.demand ?? 'High'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-700">MOQ</div>
                    <div className="text-gray-600">{category.moq}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Lead Time</div>
                    <div className="text-gray-600">{category.leadTime}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Corridors</div>
                  <div className="flex flex-wrap gap-1">
                    {category.corridors.map((corridor, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">{corridor}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 btn-brand">Open RFQ</button>
                <button className="flex-1 btn-outline-brand">Join as Seller</button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-12">
          {!showAll && (
            <button className="btn-outline-brand" onClick={() => setShowAll(true)}>View all categories</button>
          )}
        </div>

        {/* Request Category Form */}
        <div className="lt-card p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Don&apos;t See Your Category?</h3>
            <p className="text-gray-600">Request a new category to be added to our platform</p>
          </div>
          
          {!showRequestForm ? (
            <div className="text-center">
              <button onClick={() => setShowRequestForm(true)} className="btn-brand-gradient">
                Request a Category
              </button>
            </div>
          ) : (
            <form className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                  placeholder="e.g., Renewable Energy Equipment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-brand-600 focus:outline-none border border-gray-300"
                  rows={3}
                  placeholder="Tell us about this category and why it's important for Turkey-Central Asia trade"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 btn-brand">Submit Request</button>
                <button type="button" onClick={() => setShowRequestForm(false)} className="flex-1 btn-outline-brand">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
