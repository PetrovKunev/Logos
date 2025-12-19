import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  summary: string
  slug: string
  author: string
  category: string
  publishedAt: string
  viewCount: number
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">От {post.author}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
          >
            Прочети
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

