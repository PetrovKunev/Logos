import data from '@/data/testimonials.json'

// „Резултати на наши ученици“ — рендерира се само когато има реални данни
// в data/testimonials.json. Празни масиви = секцията липсва от страницата.
// Попълването на файла я активира без промени по кода.

interface ResultItem {
  value: string
  label: string
  note?: string
}

interface TestimonialItem {
  quote: string
  author: string
  context?: string
}

const results = data.results as ResultItem[]
const testimonials = data.testimonials as TestimonialItem[]

export default function ResultsSection() {
  if (results.length === 0 && testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Резултати на наши ученици</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Какво постигнахме заедно с учениците — и какво казват родителите им.
          </p>
        </div>

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {results.map((r) => (
              <div key={r.label} className="bg-primary-50 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-primary-700 mb-2">{r.value}</div>
                <div className="text-gray-900 font-medium">{r.label}</div>
                {r.note && <div className="text-sm text-gray-500 mt-2">{r.note}</div>}
              </div>
            ))}
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.quote}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col"
              >
                <div className="text-primary-300 text-5xl leading-none" aria-hidden="true">
                  „
                </div>
                <blockquote className="text-gray-700 flex-1 mt-2">{t.quote}</blockquote>
                <figcaption className="mt-4">
                  <div className="font-semibold text-gray-900">{t.author}</div>
                  {t.context && <div className="text-sm text-gray-500">{t.context}</div>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
