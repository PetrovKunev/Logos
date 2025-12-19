import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'За нас - Академия Логос',
  description: 'Научете повече за Академия Логос - нашата мисия, екип и подход към образованието.',
}

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">За Академия Логос</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Нашата мисия</h2>
            <p className="text-gray-700 mb-4">
              Академия Логос е създадена с мисията да предоставя качествено образование, 
              което вдъхновява и подготвя учениците за успех. Вярваме, че всяко дете има 
              потенциал да постигне отлични резултати с правилния подход и подкрепа.
            </p>
            <p className="text-gray-700">
              Нашият екип от опитни преподаватели работи с всеки ученик индивидуално, 
              за да открие неговите силни страни и да му помогне да преодолее трудностите.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Нашият подход</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Индивидуално внимание</h3>
                <p className="text-gray-600">
                  Работим в малки групи от 3-4 ученици, което ни позволява да обърнем 
                  внимание на нуждите на всеки.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Практическа насоченост</h3>
                <p className="text-gray-600">
                  Използваме реални примери и казуси, които помагат на учениците да 
                  разберат практическото приложение на знанията.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Функционална грамотност</h3>
                <p className="text-gray-600">
                  Развиваме умения за критично мислене, анализ и решаване на проблеми, 
                  които са ключови за успеха в съвременния свят.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Подготовка за НВО</h3>
                <p className="text-gray-600">
                  Специализирани курсове, съобразени с изискванията на националното 
                  външно оценяване и новите образователни стандарти.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Защо Логос?</h2>
            <p className="text-gray-700 mb-4">
              Името &quot;Логос&quot; идва от древногръцката дума λόγος, която означава &quot;разум&quot;, 
              &quot;слово&quot;, &quot;смисъл&quot;. За нас образованието е именно това – път към разбиране, 
              логическо мислене и откриване на смисъла в знанието.
            </p>
            <p className="text-gray-700">
              Вярваме, че истинското образование не е просто запаметяване на факти, 
              а развитие на способността да мислим, анализираме и прилагаме наученото 
              в реални ситуации.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

