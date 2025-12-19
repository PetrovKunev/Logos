import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Академия Логос - Курсове по математика, БЕЛ и програмиране',
  description: 'Академия Логос предлага качествени курсове по математика, български език и литература и програмиране за ученици от 5 до 7 клас. Подготовка за НВО.',
  keywords: 'курсове, математика, БЕЛ, програмиране, НВО, подготовка, Академия Логос',
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
      </body>
    </html>
  )
}

