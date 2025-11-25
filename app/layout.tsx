import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import CosmicBadge from '@/components/CosmicBadge'
import { Category } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog Platform',
  description: 'A beautiful blog powered by Cosmic CMS',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getAllCategories()
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
          <div className="container-custom">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">
                  Modern Blog
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                  {categories.slice(0, 3).map((category: Category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="border-t border-gray-200 bg-gray-50 mt-20">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
                <p className="text-gray-600 text-sm">
                  A modern blog platform powered by Cosmic CMS, showcasing beautiful content with a clean, responsive design.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category: Category) => (
                    <li key={category.id}>
                      <Link
                        href={`/categories/${category.slug}`}
                        className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Connect</h3>
                <p className="text-gray-600 text-sm">
                  Built with Next.js and Cosmic CMS
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                © 2025 Modern Blog Platform. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}