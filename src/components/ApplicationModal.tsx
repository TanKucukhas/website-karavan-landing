'use client'

import { useState, useRef } from 'react'
import { XMarkIcon, DocumentArrowUpIcon, LinkIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

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

interface ApplicationModalProps {
  job: Job
  jobId: string
  onClose: () => void
}

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove the data:type;base64, prefix
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

export default function ApplicationModal({ job, jobId, onClose }: ApplicationModalProps) {
  const t = useTranslations('careers.application')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    coverLetter: '',
    experience: '',
    availability: ''
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [fileError, setFileError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear email error when user types
    if (name === 'email') {
      setEmailError('')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError('')
    
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be less than 5MB')
        return
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setFileError('Please upload a PDF or Word document')
        return
      }
      setCvFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // CV file is now optional, no validation needed

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      // Prepare data for API
      const cvFileData = cvFile ? {
        name: cvFile.name,
        content: await fileToBase64(cvFile),
        type: cvFile.type
      } : null

      // Debug: Log CV file data
      if (cvFileData) {
        console.log('Sending CV file:', {
          name: cvFileData.name,
          type: cvFileData.type,
          contentLength: cvFileData.content?.length,
          contentPreview: cvFileData.content?.substring(0, 50) + '...'
        })
      }

      const requestData = {
        formData: {
          ...formData,
          jobId,
          jobTitle: job.title
        },
        cvFile: cvFileData
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          linkedinUrl: '',
          coverLetter: '',
          experience: '',
          availability: ''
        })
        setCvFile(null)
        setFileError('')
        setEmailError('')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Application submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t('title')}
              </h2>
              <p className="text-gray-600">
                {job.title} - {job.department}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{t('successMessage')}</span>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{t('errorMessage')}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('sections.personalInfo')}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('fields.firstName')} *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('fields.lastName')} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('fields.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 ${
                      emailError ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {emailError && (
                    <div className="mt-1 text-sm text-red-600">
                      {emailError}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('fields.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <LinkIcon className="w-4 h-4 inline mr-1" />
                {t('fields.linkedin')}
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DocumentArrowUpIcon className="w-4 h-4 inline mr-1" />
                {t('fields.cv')} (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-brand-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500">
                      <span>{t('fields.uploadCv')}</span>
                      <input
                        id="cv-upload"
                        ref={fileInputRef}
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">{t('fields.orDragDrop')}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 5MB (Optional - will be attached to email)
                  </p>
                </div>
              </div>
              {cvFile && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Selected file:</span> {cvFile.name}
                </div>
              )}
              {fileError && (
                <div className="mt-2 text-sm text-red-600">
                  {fileError}
                </div>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('fields.experience')} *
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={4}
                required
                placeholder={t('fields.experiencePlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('fields.coverLetter')}
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={4}
                placeholder={t('fields.coverLetterPlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('fields.availability')}
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                placeholder={t('fields.availabilityPlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('buttons.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
