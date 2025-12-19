'use client'

import { useState } from 'react'
import CourseCard from '@/components/CourseCard'
import courses from '@/data/courses.json'

const categories = ['Всички', 'Математика', 'БЕЛ', 'Програмиране']

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Всички')

  const filteredCourses = selectedCategory === 'Всички'
    ? courses.filter(c => c.isActive)
    : courses.filter(c => c.isActive && c.category === selectedCategory)

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Нашите курсове</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Изберете курс според вашите нужди. Предлагаме качествено обучение по математика, 
            български език и литература и програмиране.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Няма намерени курсове в тази категория.</p>
          </div>
        )}
      </div>
    </div>
  )
}

