import BlogCard from '@/components/BlogCard'
import blogposts from '@/data/blogposts.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог - Академия Логос',
  description: 'Статии и съвети за образование, подготовка за НВО и развитие на умения.',
}

export default function BlogPage() {
  const publishedPosts = blogposts.filter(post => post.isPublished)

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Блог</h1>
          <p className="text-xl text-gray-600">
            Полезни статии за образование, подготовка за НВО и развитие на умения.
          </p>
        </div>

        <div className="space-y-8">
          {publishedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {publishedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Все още няма публикувани статии.</p>
          </div>
        )}
      </div>
    </div>
  )
}

