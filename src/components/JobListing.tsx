'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  benefits: string[]
}

interface JobListingProps {
  job: Job
  onApply: () => void
}

export default function JobListing({ job, onApply }: JobListingProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.type}
              </span>
            </div>
            <p className="text-gray-700 mb-4">
              {job.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-brand-600 border border-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUpIcon className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show Details</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </>
              )}
            </button>
            <button
              onClick={onApply}
              className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
            >
              Apply Now
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Requirements
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
