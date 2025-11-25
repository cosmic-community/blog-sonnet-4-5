// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Post } from '@/types'
import MarkdownContent from '@/components/MarkdownContent'
import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata?.content?.substring(0, 160) || '',
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
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

        {/* Categories */}
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.metadata.categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
          {publishedDate && (
            <time dateTime={post.metadata.published_date}>
              {publishedDate}
            </time>
          )}
          {post.metadata?.author && (
            <>
              <span>•</span>
              <Link 
                href={`/authors/${post.metadata.author.slug}`}
                className="hover:text-gray-900 transition-colors"
              >
                {post.metadata.author.title}
              </Link>
            </>
          )}
        </div>

        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-auto"
              width={800}
              height={450}
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <MarkdownContent content={post.metadata?.content || ''} />
        </div>

        {/* Author Card */}
        {post.metadata?.author && (
          <div className="border-t border-gray-200 pt-8">
            <AuthorCard author={post.metadata.author} />
          </div>
        )}
      </div>
    </article>
  )
}