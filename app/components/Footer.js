'use client'

import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Romantic Revelation Helper. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <span className="mx-4">|</span>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-4">|</span>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer