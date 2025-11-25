import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const publishedDate = post.metadata?.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  if (featured) {
    return (
      <Link 
        href={`/posts/${post.slug}`}
        className="block group"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          {post.metadata?.featured_image && (
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                width={600}
                height={400}
              />
            </div>
          )}
          <div className="p-8">
            {post.metadata?.categories && post.metadata.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.metadata.categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            )}
            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            {post.metadata?.content && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.metadata.content.substring(0, 200).replace(/[#*]/g, '')}...
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {publishedDate && <time dateTime={post.metadata.published_date}>{publishedDate}</time>}
              {post.metadata?.author && (
                <>
                  <span>•</span>
                  <span>{post.metadata.author.title}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link 
      href={`/posts/${post.slug}`}
      className="block group"
    >
      <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        {post.metadata?.featured_image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={300}
            />
          </div>
        )}
        <div className="p-6">
          {post.metadata?.categories && post.metadata.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.metadata.categories.slice(0, 2).map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.metadata?.content && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.metadata.content.substring(0, 150).replace(/[#*]/g, '')}...
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {publishedDate && <time dateTime={post.metadata.published_date}>{publishedDate}</time>}
            {post.metadata?.author && (
              <>
                <span>•</span>
                <span>{post.metadata.author.title}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}