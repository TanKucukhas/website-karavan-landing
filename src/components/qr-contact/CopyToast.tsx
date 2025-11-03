"use client"

import { useEffect, useState } from 'react'

interface CopyToastProps {
  message: string
  duration?: number
}

/**
 * Toast notification for copy actions
 */
export default function CopyToast({ message, duration = 2000 }: CopyToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)
    
    return () => clearTimeout(timer)
  }, [duration])
  
  if (!isVisible) return null
  
  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up"
      role="alert"
      aria-live="polite"
    >
      <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}

