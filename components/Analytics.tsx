'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// Тракинг скеле за рекламната кампания. Не прави нищо, докато ID-тата
// не бъдат зададени в .env.local:
//   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
//   NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
// Събития: page_view при навигация, call_click / viber_click при клик на
// tel:/viber: линк (GA4) + Contact (Meta), generate_lead / Lead на /thanks.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export default function Analytics() {
  const pathname = usePathname()
  const isFirstPageView = useRef(true)

  // Кликове върху tel:/viber: линкове — един глобален слушател покрива
  // футъра, страниците Цени/Контакт и /thanks без промени по линковете.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest?.('a')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''

      if (href.startsWith('tel:')) {
        window.gtag?.('event', 'call_click', { link_url: href })
        window.fbq?.('track', 'Contact')
      } else if (href.startsWith('viber:')) {
        window.gtag?.('event', 'viber_click', { link_url: href })
        window.fbq?.('track', 'Contact')
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // App Router не презарежда страницата при навигация — пращаме page_view
  // ръчно при смяна на пътя. Първото зареждане се отчита от базовите
  // снипети, затова го пропускаме тук.
  useEffect(() => {
    if (isFirstPageView.current) {
      isFirstPageView.current = false
      return
    }
    window.gtag?.('event', 'page_view', { page_path: pathname })
    window.fbq?.('track', 'PageView')
  }, [pathname])

  return (
    <>
      {GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  )
}
