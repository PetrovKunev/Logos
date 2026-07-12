import Link from 'next/link'
import type { Metadata } from 'next'
import courses from '@/data/courses.json'
import { PHONE_DISPLAY, PHONE_HREF, VIBER_HREF } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Цени — модулно обучение по математика, БЕЛ и програмиране',
  description:
    'Ясни цени на модул: 350–400 € математика и БЕЛ, 360 € програмиране. Цената е на ученик, групи от 3–4 деца, безплатен пробен час, пробен изпит във формат НВО във всеки модул.',
}

type Pricing = {
  groupHourEur: number
  individualHourEur: number
  moduleHours: number
  modulePriceEur: number
  monthlyPriceEur: number
  modulesCount: number
}

function pricingFor(slug: string): Pricing {
  const course = courses.find((c) => c.slug === slug)
  if (!course?.pricing) throw new Error(`Липсват ценови данни за курс: ${slug}`)
  return course.pricing
}

const tiers = [
  {
    key: 'mat-bel-56',
    featured: false,
    title: 'Математика и БЕЛ — 5. и 6. клас',
    badge: 'Стабилни основи',
    pricing: pricingFor('matematika-5-klas'),
    moduleIncludes: 'тест върху материала',
    assessmentGuarantee: 'Тест в края на всеки модул — виждате напредъка на детето',
  },
  {
    key: 'nvo-7',
    featured: true,
    title: 'Математика и БЕЛ — 7. клас',
    badge: 'Подготовка за НВО',
    pricing: pricingFor('matematika-7-klas'),
    moduleIncludes: 'пробен изпит във формат НВО',
    assessmentGuarantee: 'Пробен изпит във формат НВО в края на всеки модул',
  },
  {
    key: 'programirane',
    featured: false,
    title: 'Програмиране — 5., 6. и 7. клас',
    badge: 'Scratch → Python → C#',
    pricing: pricingFor('programirane-5-klas'),
    moduleIncludes: 'проект, който детето създава само',
    assessmentGuarantee: 'Проект във всеки модул — финалният се представя пред родителите',
  },
]

const monthlyRows = [
  { label: 'Математика и БЕЛ — 5. и 6. клас', price: pricingFor('matematika-5-klas').monthlyPriceEur },
  { label: 'Математика и БЕЛ — 7. клас', price: pricingFor('matematika-7-klas').monthlyPriceEur },
  { label: 'Програмиране — 5.–7. клас', price: pricingFor('programirane-5-klas').monthlyPriceEur },
]

const individualRows = [
  { label: 'Математика', price: pricingFor('matematika-7-klas').individualHourEur },
  { label: 'Български език и литература', price: pricingFor('bel-7-klas').individualHourEur },
  { label: 'Програмиране', price: pricingFor('programirane-7-klas').individualHourEur },
]

function CheckIcon({ className = 'text-primary-600' }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <div className="py-16">
      {/* Intro */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Цени</h1>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-4">
          Цената е <strong>на ученик</strong>, часовете са по <strong>60 минути</strong>, групите — от{' '}
          <strong>3 до 4 деца</strong>. Учебната година е разделена на 4 модула и записвате{' '}
          <strong>модул по модул</strong> — без ангажимент за цяла година.
        </p>
        <p className="text-center text-gray-600 mb-12">
          Записвате модул по модул. Ако прецените, че не сме за вас — просто не продължавате.
        </p>

        {/* 1. Module cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`relative flex flex-col rounded-2xl bg-white p-6 sm:p-8 shadow-lg ${
                tier.featured
                  ? 'ring-2 ring-primary-600 order-first lg:order-none'
                  : 'border border-gray-200'
              }`}
            >
              <span
                className={`self-start px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  tier.featured ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-800'
                }`}
              >
                {tier.badge}
              </span>

              <h2 className="text-xl font-bold text-gray-900">{tier.title}</h2>
              <p className="text-sm text-gray-600 mt-1 mb-5">
                Група от 3–4 ученици · часове по 60 минути
              </p>

              <p className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {tier.pricing.modulePriceEur} €
                </span>
                <span className="text-gray-600">на модул · на ученик</span>
              </p>
              <p className="text-gray-700 mt-2">
                {tier.pricing.moduleHours} учебни часа + {tier.moduleIncludes}
              </p>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Пълната подготовка: 4 модула (октомври – юни)
              </p>

              <ul className="space-y-3 text-sm text-gray-700 mb-6">
                <li className="flex items-start">
                  <CheckIcon />
                  <span>
                    <strong>Първият час е безплатен</strong> — детето сяда в групата, преди да
                    платите каквото и да е
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>
                    <strong>Изход без наказание</strong> — не записвате следващия модул и не дължите
                    нищо
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>{tier.assessmentGuarantee}</span>
                </li>
              </ul>

              <div className="mt-auto">
                <p className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg px-3 py-2 mb-4">
                  Ранно записване: <strong>−40 €</strong> от Модул 1 до 31 юли · <strong>−20 €</strong>{' '}
                  до 31 август
                </p>
                <Link
                  href="/contact"
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    tier.featured
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Запишете безплатен пробен час
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. How modules work */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Как работят модулите</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                4 модула = пълната подготовка
              </h3>
              <p className="text-gray-700">
                Учебната година (октомври – юни) е разделена на 4 модула. Всеки модул покрива
                завършена тема от програмата и приключва с пробен изпит, тест или проект.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Плащате модул по модул</h3>
              <p className="text-gray-700">
                Плащането е преди старта на всеки модул. Никой не плаща цяла година накуп —
                максималният ви ангажимент по всяко време е един модул.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Изход без наказание</h3>
              <p className="text-gray-700">
                Ако прецените, че не сме за вас — просто не записвате следващия модул и не дължите
                нищо. В рамките на вече започнат модул суми не се възстановяват.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold mb-3">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Предплащане по желание</h3>
              <p className="text-gray-700">
                Ако предплатите четирите модула наведнъж, получавате <strong>−10 %</strong> — а при
                отказ ви възстановяваме неизползваните цели модули.
              </p>
            </div>
          </div>
        </section>

        {/* 3. What the price includes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Какво включва цената</h2>
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <ul className="grid sm:grid-cols-2 gap-4 text-gray-700 mb-6">
              <li className="flex items-start">
                <CheckIcon />
                Пробни изпити във формат НВО (математика и БЕЛ) или проекти (програмиране) във всеки
                модул
              </li>
              <li className="flex items-start">
                <CheckIcon />
                Всички учебни материали
              </li>
              <li className="flex items-start">
                <CheckIcon />
                Редовна обратна връзка към родителя за напредъка на детето
              </li>
              <li className="flex items-start">
                <CheckIcon />
                Групи от 3–4 деца — на практика полуиндивидуално обучение
              </li>
            </ul>
            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-lg text-primary-900">
              Групите ни от 3–4 деца дават внимание, каквото центровете с 10–15 ученици в група не
              могат да осигурят — на цена под индивидуалната.
            </div>
          </div>
        </section>

        {/* 4. Monthly subscription */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Месечен абонамент — алтернатива без обвързване
          </h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
            Предпочитате да не се ангажирате с цял модул? Плащате месец за месец и спирате, когато
            решите.
          </p>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {monthlyRows.map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.label}</td>
                    <td className="px-6 py-4 text-right text-sm text-gray-700 whitespace-nowrap">
                      <strong>{row.price} €</strong>/месец на ученик
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center">
            Сметката е проста: с модулите излиза по-изгодно — отстъпката награждава ангажимента.
          </p>
        </section>

        {/* 5. Individual tuition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Индивидуално обучение
          </h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
            Едно към едно, изцяло съобразено с темпото и целите на ученика. Часове по 60 минути.
          </p>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {individualRows.map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.label}</td>
                    <td className="px-6 py-4 text-right text-sm text-gray-700 whitespace-nowrap">
                      <strong>{row.price} €</strong>/час
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Discounts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Отстъпки</h2>
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <CheckIcon className="text-amber-500" />
                <span>
                  <strong>Ранно записване:</strong> −40 € от Модул 1 при записване до 31 юли, −20 €
                  до 31 август. От 1 септември — пълна цена.
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-amber-500" />
                <span>
                  <strong>Предплатени 4 модула наведнъж:</strong> −10 % (с възстановяване на
                  неизползваните цели модули при отказ)
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="text-amber-500" />
                <span>
                  <strong>Втори курс на същия ученик или второ дете:</strong> −10 % от по-евтиния
                  курс
                </span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">Могат да се комбинират най-много две отстъпки едновременно.</p>
          </div>
        </section>
      </div>

      {/* 7. CTA */}
      <section className="bg-primary-700 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Запишете безплатен пробен час</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Детето сяда в групата, преди да платите каквото и да е. Обадете се или ни пишете във
            Viber — отговаряме бързо.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_HREF}
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              📞 {PHONE_DISPLAY}
            </a>
            <a
              href={VIBER_HREF}
              className="bg-[#7360F2] hover:bg-[#5f4dd0] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Пишете ни във Viber
            </a>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Форма за контакт
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
