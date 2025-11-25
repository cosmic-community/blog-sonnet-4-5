// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Modern Blog`,
    description: category.metadata?.description || `Posts about ${category.title}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  // Sort posts by published date
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime()
    const dateB = new Date(b.metadata?.published_date || '').getTime()
    return dateB - dateA
  })

  return (
    <div className="container-custom py-12">
      {/* Back link */}
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      {/* Category Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600 max-w-3xl">
            {category.metadata.description}
          </p>
        )}
      </div>

      {/* Posts Grid */}
      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No posts found in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}