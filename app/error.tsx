'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-custom py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We're sorry, but something unexpected happened. Please try again.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}