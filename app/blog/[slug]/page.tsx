import { notFound } from 'next/navigation'
import Link from 'next/link'
import blogposts from '@/data/blogposts.json'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogposts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogposts.find((p) => p.slug === slug)
  
  if (!post) {
    return {
      title: 'Статията не е намерена',
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.summary,
    keywords: post.metaKeywords,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogposts.find((p) => p.slug === slug)

  if (!post || !post.isPublished) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-600">Начало</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-primary-600">Блог</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">{post.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.viewCount} прегледа
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {post.summary}
          </p>
          <p className="text-gray-500">
            От <span className="font-medium text-gray-700">{post.author}</span>
          </p>
        </header>

        {/* Content */}
        <div 
          className="blog-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Обратно към блога
          </Link>
        </div>
      </div>
    </article>
  )
}

