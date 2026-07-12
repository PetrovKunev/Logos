'use client'

import { useEffect } from 'react'

// Отчита конверсия „изпратена форма“ — рендерира се само на /thanks,
// където формата пренасочва след успешно изпращане.
export default function LeadTracker() {
  useEffect(() => {
    window.gtag?.('event', 'generate_lead')
    window.fbq?.('track', 'Lead')
  }, [])

  return null
}
