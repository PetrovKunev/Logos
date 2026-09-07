import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import courses from '@/data/courses.json'
import { SITE_URL, SITE_NAME } from '@/lib/site'

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
  pricing: {
    groupHourEur: number
    individualHourEur: number
    moduleHours: number
    modulePriceEur: number
    monthlyPriceEur: number
    modulesCount: number
  }
  modules: Array<{
    title: string
    period: string
    topics: string[]
    milestone: string
  }>
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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = (courses as Course[]).find((c) => c.slug === params.slug && c.isActive)

  if (!course) {
    return { title: 'Курсът не е намерен' }
  }

  const gradeNum = course.grade.replace(' клас', '')
  const subject =
    course.category === 'Математика'
      ? 'математика'
      : course.category === 'Програмиране'
        ? 'програмиране'
        : 'БЕЛ'
  const focus =
    course.category === 'Програмиране'
      ? ({ '5': 'Scratch', '6': 'Python', '7': 'Python и C#' }[gradeNum] ?? 'Scratch')
      : gradeNum === '7'
        ? 'подготовка за НВО'
        : 'групи от 3–4 ученици'
  const title = `Курс по ${subject} за ${gradeNum}. клас — ${focus}`
  const description = `${course.details.heroSubtitle}. Групи от 3–4 ученици, ${course.pricing.modulePriceEur} € на модул (на ученик), първият час е безплатен.`

  return {
    title,
    description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: course.imageUrl }],
    },
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

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.details.description,
    url: `${SITE_URL}/courses/${course.slug}`,
    image: `${SITE_URL}${course.imageUrl}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: course.pricing.modulePriceEur,
      priceCurrency: 'EUR',
      description: `Цена за модул от ${course.pricing.moduleHours} учебни часа, на ученик`,
    },
    educationalLevel: course.grade,
    timeRequired: `PT${course.durationHours}H`,
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
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
            <p className="mt-6 text-lg font-medium">
              {course.pricing.modulePriceEur} € на модул · цената е на ученик · група от 3–4 деца
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Запишете безплатен пробен час
            </Link>
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

                {course.category === 'Програмиране' && (
                  <div className={`${theme.accentBgLight} border ${theme.accentBorderLight} rounded-lg p-6 mb-8`}>
                    <h3 className={`text-xl font-semibold ${theme.accentTextDark} mb-3`}>
                      Защо програмиране при нас?
                    </h3>
                    <p className={`${theme.accentTextLight} mb-3`}>
                      Обучението води <strong>действащ учител по C# в гимназия</strong> и{' '}
                      <strong>докторант в БАН</strong> в областта на изкуствения интелект в
                      образованието. От новата учебна година учениците предават задачите си в{' '}
                      <strong>CodeGrade</strong> — система за автоматична проверка на код,
                      разработвана от самия преподавател, както в истинските технологични гимназии.
                    </p>
                    <p className={`${theme.accentTextLight} mb-4`}>
                      Курсът е част от тригодишната ни пътека, която подготвя за профилираните
                      гимназии:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {[
                        { grade: '5 клас', label: 'Scratch' },
                        { grade: '6 клас', label: 'Python' },
                        { grade: '7 клас', label: 'C#' },
                      ].map((step) => (
                        <div
                          key={step.grade}
                          className={`flex-1 rounded-lg px-4 py-3 text-center ${
                            course.grade === step.grade
                              ? `${theme.accentBg} text-white`
                              : 'bg-white text-gray-700 border border-gray-200'
                          }`}
                        >
                          <p className="font-semibold">{step.label}</p>
                          <p className="text-sm">{step.grade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {course.category === 'Български език и литература' && (
                  <div className={`${theme.accentBgLight} border ${theme.accentBorderLight} rounded-lg p-6 mb-8`}>
                    <h3 className={`text-xl font-semibold ${theme.accentTextDark} mb-3`}>
                      Преразказът — тренираме го от 5. клас
                    </h3>
                    <p className={`${theme.accentTextLight} mb-4`}>
                      Преразказът на неизучавана творба е самостоятелна 90-минутна част от НВО и
                      най-тежкият компонент на изпита. Затова не го оставяме за последната година, а
                      го изграждаме стъпка по стъпка:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                      {[
                        { grade: '5 клас', label: 'Подробен преразказ' },
                        { grade: '6 клас', label: 'Двата НВО варианта' },
                        { grade: '7 клас', label: 'Изпитен формат' },
                      ].map((step) => (
                        <div
                          key={step.grade}
                          className={`flex-1 rounded-lg px-4 py-3 text-center ${
                            course.grade === step.grade
                              ? `${theme.accentBg} text-white`
                              : 'bg-white text-gray-700 border border-gray-200'
                          }`}
                        >
                          <p className="font-semibold">{step.label}</p>
                          <p className="text-sm">{step.grade}</p>
                        </div>
                      ))}
                    </div>
                    <p className={`${theme.accentTextLight}`}>
                      Дете, което мине трите години при нас, стига до НВО с три години тренинг върху
                      най-тежката част на изпита.
                    </p>
                  </div>
                )}

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Какво ще научат учениците?</h3>
                <div className="space-y-4">
                  {course.details.learn.map((item) => (
                    <div key={item.title} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Програма по модули</h3>
                <p className="text-gray-700 mb-6">
                  Учебната година (октомври – юни) е разделена на 4 модула по{' '}
                  {course.pricing.moduleHours} учебни часа. Записвате модул по модул — без ангажимент
                  за цяла година. Последователността на темите се синхронизира с учебника, по който
                  работи училището на детето.
                </p>
                <div className="space-y-4">
                  {course.modules.map((mod, index) => (
                    <div key={mod.title} className={`border ${theme.accentBorderLight} rounded-lg p-5`}>
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <span
                          className={`${theme.accentBgLight} ${theme.accentTextDark} px-3 py-1 rounded-full text-sm font-semibold`}
                        >
                          Модул {index + 1} · „{mod.title}“
                        </span>
                        <span className="text-sm text-gray-500">{mod.period}</span>
                      </div>
                      <ul className="text-gray-700 space-y-1 mb-3">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-start">
                            <span className={`${theme.accentText} mr-2`}>•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <p className={`text-sm font-medium ${theme.accentText}`}>
                        Завършва с: {mod.milestone}
                      </p>
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
                <div className="pb-6 mb-6 border-b border-gray-200">
                  <p className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {course.pricing.modulePriceEur} €
                    </span>
                    <span className="text-gray-600">на модул</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {course.pricing.moduleHours} учебни часа · цената е на ученик
                  </p>
                  <p className="text-sm text-gray-600">
                    Месечен абонамент: {course.pricing.monthlyPriceEur} €/месец
                  </p>
                  <p className={`text-sm font-semibold ${theme.accentText} mt-2`}>
                    Първият час е безплатен
                  </p>
                </div>

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
                    <p className="text-gray-900">{course.durationHours} часа (4 модула)</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Група:</span>
                    <p className="text-gray-900">3–4 ученици</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/contact"
                    className={`w-full ${theme.accentBg} ${theme.accentBgHover} text-white px-6 py-3 rounded-lg transition-colors text-center block font-medium`}
                  >
                    Запишете безплатен пробен час
                  </Link>
                  <Link
                    href="/pricing"
                    className={`w-full border ${theme.accentBorder} ${theme.accentText} px-6 py-3 rounded-lg ${theme.accentHoverLight} transition-colors text-center block font-medium`}
                  >
                    Виж всички цени и отстъпки
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


