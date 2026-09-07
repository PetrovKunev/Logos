import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import { PHONE_TEL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Контакт — запишете безплатен пробен час',
  alternates: { canonical: '/contact' },
  description:
    'Свържете се с Академия Логос по телефон, Viber или чрез формата за контакт. ж.к. Дружба 1, София. Работно време: пон–пет 09:00–19:00, събота 10:00–14:00.',
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE_TEL,
  image: `${SITE_URL}/images/logo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ж.к. Дружба 1, бл. 132, вх. Б, ет. 1',
    addressLocality: 'София',
    postalCode: '1592',
    addressCountry: 'BG',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '14:00',
    },
  ],
  priceRange: '€€',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {children}
    </>
  )
}
