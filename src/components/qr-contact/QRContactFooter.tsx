"use client"

/**
 * Minimal footer for QR contact pages
 * Karavan wordmark, tiny legal, year
 */
export default function QRContactFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-brand-600">Karavan</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Contact Card</span>
          </div>
          <div className="text-xs text-gray-400">
            © {currentYear} Karavan.net. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

