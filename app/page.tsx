import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { Post } from '@/types'

export default async function HomePage() {
  const posts = await getAllPosts() as Post[]

  // Sort posts by published date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime()
    const dateB = new Date(b.metadata?.published_date || '').getTime()
    return dateB - dateA
  })

  const featuredPost = sortedPosts[0]
  const recentPosts = sortedPosts.slice(1)

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to Modern Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Discover insightful articles about technology, lifestyle, and travel from our talented writers.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
          <PostCard post={featuredPost} featured />
        </div>
      )}

      {/* Recent Posts Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h2>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No posts available yet.</p>
        )}
      </div>
    </div>
  )
}