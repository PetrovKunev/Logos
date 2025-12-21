import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ценообразуване - Академия Логос',
  description: 'Цени на курсовете в Академия Логос. Групово и индивидуално обучение по математика, БЕЛ и програмиране.',
}

export default function PricingPage() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Ценообразуване</h1>
        
        {/* Pricing Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-primary-600 text-white px-6 py-4">
            <h2 className="text-2xl font-bold text-center">Цени на курсовете</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Предмет</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 border-b">Групово обучение</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 border-b">Индивидуално обучение</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Математика</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">15€/час</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">20€/час</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Български език и литература</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">15€/час</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">20€/час</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors bg-primary-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Програмиране</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">20€/час</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">25€/час</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Продължителност на часа</h3>
            </div>
            <p className="text-gray-700">
              Всеки учебен час продължава <strong>60 минути</strong>, осигурявайки оптимално време за усвояване на материала.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-3">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Размер на групите</h3>
            </div>
            <p className="text-gray-700">
              Груповото обучение включва <strong>минимум 3, максимум 4 ученици</strong>, гарантирайки индивидуално внимание за всеки.
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-6">
          В Академия Логос вярваме, че всеки ученик има индивидуални нужди и цели. Затова цената на нашите курсове се определя според следните фактори:
        </p>
        <ul className="list-disc pl-8 text-gray-700 mb-6 space-y-2">
          <li>Избран пакет (индивидуално или групово обучение)</li>
          <li>Специфични изисквания и цели на ученика</li>
          <li>Възможност за отстъпки при записване на повече от един курс</li>
        </ul>
        <p className="text-lg text-gray-700 mb-6">
          За да получите конкретна оферта, моля, свържете се с нас чрез{' '}
          <Link href="/contact" className="text-primary-600 underline hover:text-primary-800">
            формата за контакт
          </Link>{' '}
          или на посочения телефон. Нашият екип ще ви консултира и ще ви предложи най-подходящия вариант според вашите нужди.
        </p>
        <div className="bg-primary-100 border-l-4 border-primary-600 p-4 text-primary-800 rounded-r-lg">
          <strong>Важно:</strong> Всички цени се договарят индивидуално и се съобразяват с възможностите и целите на ученика.
        </div>
      </div>
    </section>
  )
}

