import Link from 'next/link'
import type { Metadata } from 'next'
import LeadTracker from '@/components/LeadTracker'
import { PHONE_DISPLAY, PHONE_HREF, VIBER_HREF } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Благодарим ви!',
  description: 'Съобщението ви е изпратено успешно. Ще се свържем с вас възможно най-скоро.',
  robots: { index: false, follow: false },
}

export default function ThanksPage() {
  return (
    <section className="py-24">
      <LeadTracker />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Благодарим ви!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Получихме съобщението ви и ще се свържем с вас до един работен ден.
        </p>
        <p className="text-gray-600 mb-8">
          Бързате? Обадете се или ни пишете във Viber — отговаряме бързо.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={PHONE_HREF}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            📞 {PHONE_DISPLAY}
          </a>
          <a
            href={VIBER_HREF}
            className="bg-[#7360F2] hover:bg-[#5f4dd0] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Пишете ни във Viber
          </a>
        </div>
        <Link href="/" className="text-primary-700 hover:text-primary-800 font-medium">
          ← Обратно към началната страница
        </Link>
      </div>
    </section>
  )
}
