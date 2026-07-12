import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import { SITE_URL, SITE_NAME } from '@/lib/site'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })

const defaultTitle = 'Академия Логос — курсове по математика, БЕЛ и програмиране за 5.–7. клас'
const defaultDescription =
  'Подготовка за НВО и програмиране Scratch → Python → C# в групи от 3–4 ученици. Модулно обучение с безплатен пробен час — кв. Дружба, София.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  keywords: 'курсове, математика, БЕЛ, програмиране, НВО, подготовка, Академия Логос',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: '/images/logo.png' }],
  },
  twitter: {
    card: 'summary',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}

