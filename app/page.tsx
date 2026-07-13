import Link from 'next/link'
import CourseCard from '@/components/CourseCard'
import ResultsSection from '@/components/ResultsSection'
import courses from '@/data/courses.json'

const categoryOrder = ['Програмиране', 'Математика', 'Български език и литература']

export default function Home() {
  const featuredCourses = courses
    .filter(c => c.isActive)
    .sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category))

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Добре дошли в <span className="text-yellow-300">Академия Логос</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Качествено образование с индивидуален подход. Подготвяме ученици за успех в училище и на НВО.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Разгледай курсовете
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Запишете безплатен пробен час
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programming Flagship */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-purple-500/20 text-purple-300 border border-purple-400/40 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Нашият флагман
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Защо програмиране при нас?</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Тригодишна пътека от първите блокчета в Scratch до истински код на C# — с преподавател,
              какъвто кварталните центрове не могат да предложат.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Преподавател от гимназиалната класа</h3>
              <p className="text-gray-300">
                Обучението води действащ учител по C# в гимназия и докторант в БАН в областта на
                изкуствения интелект в образованието.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Пътека Scratch → Python → C#</h3>
              <p className="text-gray-300">
                От блоково програмиране в 5. клас през Python в 6. до C# и ООП в 7. клас — прогресия,
                която подготвя за профилираните гимназии.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Реални инструменти</h3>
              <p className="text-gray-300">
                От новата учебна година учениците предават задачите си в CodeGrade — система за
                автоматична проверка на код, разработвана от самия преподавател. Финалният проект
                се представя пред родителите.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/courses/programirane-5-klas"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Scratch — 5. клас
            </Link>
            <Link
              href="/courses/programirane-6-klas"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Python — 6. клас
            </Link>
            <Link
              href="/courses/programirane-7-klas"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              C# — 7. клас
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Защо да изберете нас?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Опитни преподаватели</h3>
              <p className="text-gray-600">
                Нашите преподаватели имат богат опит и индивидуален подход към всеки ученик.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Малки групи</h3>
              <p className="text-gray-600">
                Работим в малки групи от 3-4 ученици за по-добро внимание и резултати.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Доказани резултати</h3>
              <p className="text-gray-600">
                Нашите ученици постигат отлични резултати на НВО и в училище.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Нашите курсове</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Предлагаме курсове по програмиране, математика и български език и литература за ученици от 5 до 7 клас.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Виж всички курсове
            </Link>
          </div>
        </div>
      </section>

      {/* Как работим */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как работим</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Прозрачен процес — от първия безплатен час до измерим резултат в края на всеки модул.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Безплатен пробен час</h3>
              <p className="text-gray-600">
                Детето сяда в реална група, а вие говорите с преподавателя. Решавате дали да
                продължите чак след това.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Група от 3–4 ученици</h3>
              <p className="text-gray-600">
                Всяко дете работи активно на всеки час — при 3–4 ученици няма последен чин, на
                който да се скриеш.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                <span className="text-red-600">70% практика</span>,{' '}
                <span className="text-primary-600">30% теория</span>
              </h3>
              <p className="text-gray-600">
                Малко обяснения, много решаване. Ученикът напредва, когато сам решава задачи и
                пише код — не когато слуша.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Измерим прогрес всеки модул</h3>
              <p className="text-gray-600">
                Всеки модул завършва с тест — в 7. клас във формат НВО, а по програмиране с работещ
                проект — и с честна обратна връзка към вас.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Резултати и отзиви — скрита, докато data/testimonials.json е празен */}
      <ResultsSection />

      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готови ли сте да започнете?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Запишете безплатен пробен час — детето сяда в групата, преди да платите каквото и да е.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Запишете безплатен пробен час
          </Link>
        </div>
      </section>
    </>
  )
}

