// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Post, Author } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author: Author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.title} - Modern Blog`,
    description: author.metadata?.bio || `Posts by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

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

      {/* Author Profile */}
      <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
        {author.metadata?.photo && (
          <div className="flex-shrink-0">
            <img
              src={`${author.metadata.photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
              width={160}
              height={160}
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="text-lg text-gray-600 mb-4">
              {author.metadata.bio}
            </p>
          )}
          {author.metadata?.email && (
            <a 
              href={`mailto:${author.metadata.email}`}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {author.metadata.email}
            </a>
          )}
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Posts by {author.title}
        </h2>
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts published yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}