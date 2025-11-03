"use client"

import Link from 'next/link'

/**
 * Minimal footer for QR contact pages
 * Simplified format with hover link
 */
export default function QRContactFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-100 px-6 py-10">
      <div className="max-w-[760px] mx-auto">
        <p className="text-[#9CA3AF] text-center font-normal" style={{ fontSize: '12px' }}>
          © {currentYear} <Link 
            href="https://karavan.net" 
            className="hover:underline hover:text-[#355FA0] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Karavan.net
          </Link> • Contact Card
        </p>
      </div>
    </footer>
  )
}

