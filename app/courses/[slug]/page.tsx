import Link from 'next/link'
import { notFound } from 'next/navigation'
import courses from '@/data/courses.json'

type Course = {
  id: number
  slug: string
  title: string
  category: string
  summary: string
  grade: string
  difficulty: string
  durationHours: number
  imageUrl: string
  isActive: boolean
  details: {
    heroSubtitle: string
    includes: string[]
    description: string
    learn: Array<{ title: string; description: string }>
    durationText: string
  }
}

export function generateStaticParams() {
  return (courses as Course[])
    .filter((c) => c.isActive)
    .map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const course = (courses as Course[]).find((c) => c.slug === params.slug && c.isActive)

  if (!course) {
    return { title: 'Курсът не е намерен' }
  }

  return {
    title: `${course.title} | Академия Логос`,
    description: course.details?.description ?? course.summary,
  }
}

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
  const course = (courses as Course[]).find((c) => c.slug === params.slug && c.isActive)

  if (!course) notFound()

  const theme =
    course.slug === 'programirane-5-klas'
      ? {
          hero: 'bg-gradient-to-r from-blue-600 to-purple-600',
          accentBg: 'bg-blue-600',
          accentBgHover: 'hover:bg-blue-700',
          accentText: 'text-blue-600',
          accentBorder: 'border-blue-600',
          accentBorderLight: 'border-blue-400',
          accentBgLight: 'bg-blue-50',
          accentTextLight: 'text-blue-800',
          accentTextDark: 'text-blue-900',
          accentIcon: 'text-blue-500',
          accentHoverLight: 'hover:bg-blue-50',
        }
      : course.category === 'Математика' || course.slug === 'programirane-6-klas'
        ? {
            hero: 'bg-gradient-to-r from-green-600 to-teal-600',
            accentBg: 'bg-green-600',
            accentBgHover: 'hover:bg-green-700',
            accentText: 'text-green-600',
            accentBorder: 'border-green-600',
            accentBorderLight: 'border-green-400',
            accentBgLight: 'bg-green-50',
            accentTextLight: 'text-green-800',
            accentTextDark: 'text-green-900',
            accentIcon: 'text-green-500',
            accentHoverLight: 'hover:bg-green-50',
          }
        : {
            hero: 'bg-gradient-to-r from-purple-600 to-indigo-600',
            accentBg: 'bg-purple-600',
            accentBgHover: 'hover:bg-purple-700',
            accentText: 'text-purple-600',
            accentBorder: 'border-purple-600',
            accentBorderLight: 'border-purple-400',
            accentBgLight: 'bg-purple-50',
            accentTextLight: 'text-purple-800',
            accentTextDark: 'text-purple-900',
            accentIcon: 'text-purple-500',
            accentHoverLight: 'hover:bg-purple-50',
          }

  return (
    <div>
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/courses" className="text-primary-700 hover:text-primary-800 font-medium">
          ← Обратно към курсовете
        </Link>
      </div>

      {/* Header */}
      <section className={`${theme.hero} text-white py-16 mt-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">{course.details.heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">За курса</h2>

                <div className={`${theme.accentBgLight} border-l-4 ${theme.accentBorderLight} p-6 mb-8`}>
                  <h3 className={`text-xl font-semibold ${theme.accentTextDark} mb-3`}>Курсът включва:</h3>
                  <ul className={`space-y-2 ${theme.accentTextLight}`}>
                    {course.details.includes.map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className={`w-5 h-5 ${theme.accentIcon} mt-0.5 mr-2 flex-shrink-0`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Описание</h3>
                <p className="text-gray-700 mb-6">{course.details.description}</p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Какво ще научат учениците?</h3>
                <div className="space-y-4">
                  {course.details.learn.map((item) => (
                    <div key={item.title} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Продължителност</h3>
                <p className="text-gray-700 mb-6">{course.details.durationText}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Информация за курса</h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Категория:</span>
                    <p className="text-gray-900">{course.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Ниво:</span>
                    <p className="text-gray-900">{course.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Продължителност:</span>
                    <p className="text-gray-900">{course.durationHours} часа</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/pricing"
                    className={`w-full ${theme.accentBg} ${theme.accentBgHover} text-white px-6 py-3 rounded-lg transition-colors text-center block font-medium`}
                  >
                    Ценообразуване
                  </Link>
                  <Link
                    href="/contact"
                    className={`w-full border ${theme.accentBorder} ${theme.accentText} px-6 py-3 rounded-lg ${theme.accentHoverLight} transition-colors text-center block font-medium`}
                  >
                    Запиши се
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


