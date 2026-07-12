'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PHONE_DISPLAY, PHONE_HREF, VIBER_HREF, CONTACT_EMAIL } from '@/lib/contact'

// Google геокодира този адрес точно до вход Б на блок 132 в ж.к. Дружба 1.
const MAP_ADDRESS = 'ж.к. Дружба 1, ул. „5021-ва“ 132, 1592 София'
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&z=17&output=embed`

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  // Anti-spam: Track form render timestamp
  const [formTimestamp, setFormTimestamp] = useState<number>(0)
  // Anti-spam: Honeypot value (should always be empty)
  const [honeypot, setHoneypot] = useState('')
  
  // Set timestamp when form mounts
  useEffect(() => {
    setFormTimestamp(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _hp: honeypot,     // Honeypot field
          _ts: formTimestamp // Timestamp when form was rendered
        }),
      })

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string }
      
      if (res.status === 429) {
        setSubmitStatus('error')
        setErrorMessage(data?.error || 'Твърде много заявки. Моля, изчакайте малко.')
        return
      }
      
      if (!res.ok || !data?.ok) {
        setSubmitStatus('error')
        setErrorMessage(data?.error || 'Възникна грешка. Моля, опитайте отново.')
        return
      }

      // Отделна thank-you страница — нужна е за conversion tracking на рекламите
      router.push('/thanks')
      return
    } catch {
      setSubmitStatus('error')
      setErrorMessage('Възникна грешка. Моля, опитайте отново.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Свържете се с нас</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Информация за контакт</h2>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={PHONE_HREF}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                📞 Обадете се
              </a>
              <a
                href={VIBER_HREF}
                className="flex-1 bg-[#7360F2] hover:bg-[#5f4dd0] text-white px-5 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Пишете във Viber
              </a>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900">Адрес</h3>
                  <p className="text-gray-600">Дружба 1; бл. 132; вх. Б, ет. 1</p>
                  <p className="text-gray-600">1592 София</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900">Имейл</h3>
                  <p className="text-gray-600">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary-700 transition-colors">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900">Телефон и Viber</h3>
                  <p className="text-gray-600">
                    <a href={PHONE_HREF} className="hover:text-primary-700 transition-colors">
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900">Работно време</h3>
                  <p className="text-gray-600">Понеделник - Петък: 09:00 - 19:00</p>
                  <p className="text-gray-600">Събота: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Изпратете съобщение</h2>
            
            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage || 'Възникна грешка. Моля, опитайте отново.'}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field - hidden from real users, bots will fill it */}
              <div 
                aria-hidden="true" 
                style={{ 
                  position: 'absolute', 
                  left: '-9999px', 
                  top: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none'
                }}
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Име *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Имейл *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Тема
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Изберете тема</option>
                  <option value="Математика">Курс по математика</option>
                  <option value="БЕЛ">Курс по БЕЛ</option>
                  <option value="Програмиране">Курс по програмиране</option>
                  <option value="Друго">Друго</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Съобщение *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={5000}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/5000 символа
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Изпращане...' : 'Изпрати съобщение'}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Къде се намираме</h2>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={MAP_EMBED_SRC}
              title="Карта - Академия Логос"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}
