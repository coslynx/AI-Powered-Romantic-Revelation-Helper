'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useStore } from '../lib/store'
import { FaUserCircle } from 'react-icons/fa'

// Style imports
import styles from '../styles/Header.module.css'

const Header: React.FC = () => {
  const { data: session } = useSession()
  const store = useStore()

  return (
    <header className={styles.header}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          Romantic Revelation Helper
        </Link>
        <nav className="flex items-center">
          {session ? (
            <>
              <Link
                href="/profile"
                className="mr-4 text-gray-700 hover:text-gray-900"
              >
                Profile
              </Link>
              <button
                onClick={() => store.signOut()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="mr-4 text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="text-gray-700 hover:text-gray-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header