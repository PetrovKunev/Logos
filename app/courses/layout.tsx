import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/site'

// Metadata за списъка с курсове — страницата е client component заради
// филтъра по категория. Детайлните страници я презаписват в generateMetadata.
// title.template се декларира отново, защото layout със зададен title
// прекъсва template веригата от root layout за child сегментите ([slug]).
export const metadata: Metadata = {
  title: {
    default: 'Курсове по математика, БЕЛ и програмиране за 5.–7. клас',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Целогодишни курсове в групи от 3–4 ученици: математика и БЕЛ с подготовка за НВО, програмиране Scratch → Python → C#. Записване модул по модул, безплатен пробен час.',
}

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children
}
