import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex items-start gap-4">
      {author.metadata?.photo && (
        <Link href={`/authors/${author.slug}`}>
          <img
            src={`${author.metadata.photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-16 h-16 rounded-full object-cover hover:opacity-80 transition-opacity"
            width={80}
            height={80}
          />
        </Link>
      )}
      <div className="flex-1">
        <div className="mb-2">
          <Link 
            href={`/authors/${author.slug}`}
            className="font-bold text-gray-900 hover:text-primary transition-colors"
          >
            {author.title}
          </Link>
        </div>
        {author.metadata?.bio && (
          <p className="text-sm text-gray-600">
            {author.metadata.bio}
          </p>
        )}
      </div>
    </div>
  )
}