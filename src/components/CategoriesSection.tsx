'use client';

import { useState } from 'react';

export default function CategoriesSection() {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const categories = [
    {
      icon: '👕',
      name: 'Textiles & Apparel',
      subcategories: ['Cotton fabrics', 'Ready-made garments', 'Home textiles'],
      certificates: ['OEKO-TEX', 'GOTS'],
      moq: '$5,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      icon: '⚙️',
      name: 'Machinery & Equipment',
      subcategories: ['Agricultural machinery', 'Industrial equipment', 'Construction machinery'],
      certificates: ['CE', 'ISO 9001'],
      moq: '$25,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      icon: '🧪',
      name: 'Chemicals & Pharmaceuticals',
      subcategories: ['Industrial chemicals', 'Pharmaceuticals', 'Cosmetics'],
      certificates: ['GMP', 'ISO 14001'],
      moq: '$10,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      icon: '🌾',
      name: 'Agriculture & Food',
      subcategories: ['Dried fruits', 'Nuts', 'Spices', 'Processed foods'],
      certificates: ['HACCP', 'Organic'],
      moq: '$3,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      icon: '🏗️',
      name: 'Construction Materials',
      subcategories: ['Cement', 'Steel products', 'Ceramic tiles'],
      certificates: ['CE', 'ISO 9001'],
      moq: '$15,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→TM']
    },
    {
      icon: '🚗',
      name: 'Automotive Parts',
      subcategories: ['Engine parts', 'Brake systems', 'Electrical components'],
      certificates: ['IATF 16949', 'CE'],
      moq: '$8,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      icon: '💻',
      name: 'Electronics & IT',
      subcategories: ['Consumer electronics', 'IT equipment', 'Telecommunications'],
      certificates: ['CE', 'FCC'],
      moq: '$12,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      icon: '🏥',
      name: 'Medical Equipment',
      subcategories: ['Diagnostic equipment', 'Surgical instruments', 'Disposables'],
      certificates: ['CE Medical', 'FDA'],
      moq: '$20,000',
      corridors: ['TR→UZ', 'TR→KZ']
    },
    {
      icon: '🎨',
      name: 'Furniture & Home',
      subcategories: ['Office furniture', 'Home furniture', 'Decorative items'],
      certificates: ['FSC', 'CE'],
      moq: '$7,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      icon: '⚡',
      name: 'Energy & Power',
      subcategories: ['Solar panels', 'Generators', 'Electrical equipment'],
      certificates: ['IEC', 'CE'],
      moq: '$30,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→TM']
    },
    {
      icon: '📦',
      name: 'Packaging Materials',
      subcategories: ['Plastic packaging', 'Cardboard boxes', 'Labels'],
      certificates: ['ISO 9001', 'FSC'],
      moq: '$4,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    },
    {
      icon: '🔧',
      name: 'Tools & Hardware',
      subcategories: ['Hand tools', 'Power tools', 'Hardware supplies'],
      certificates: ['CE', 'ISO 9001'],
      moq: '$6,000',
      corridors: ['TR→UZ', 'TR→KZ', 'TR→KG']
    }
  ];

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top B2B Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most popular product categories in Turkey-Central Asia trade, 
            with verified suppliers and streamlined processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {category.name}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Subcategories:</div>
                  <div className="text-sm text-gray-600">
                    {category.subcategories.join(', ')}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Certificates:</div>
                  <div className="flex flex-wrap gap-1">
                    {category.certificates.map((cert, certIndex) => (
                      <span
                        key={certIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-700">MOQ: </span>
                    <span className="font-semibold text-green-600">{category.moq}</span>
                  </div>
                  <div>
                    <span className="text-gray-700">Routes: </span>
                    <span className="font-semibold text-blue-600">
                      {category.corridors.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Open RFQ
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Join as Seller
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Request Category Form */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Don't See Your Category?
            </h3>
            <p className="text-gray-600">
              Request a new category to be added to our platform
            </p>
          </div>
          
          {!showRequestForm ? (
            <div className="text-center">
              <button
                onClick={() => setShowRequestForm(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Request a Category
              </button>
            </div>
          ) : (
            <form className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Renewable Energy Equipment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Tell us about this category and why it's important for Turkey-Central Asia trade"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
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
