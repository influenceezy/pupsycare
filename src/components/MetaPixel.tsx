'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callFbq(action: string, eventOrParams?: string | Record<string, unknown>, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
    if (typeof eventOrParams === 'string') {
      ;(window as any).fbq(action, eventOrParams, params)
    } else {
      ;(window as any).fbq('track', action, eventOrParams)
    }
  }
}

/** Fire a Meta Pixel standard or custom event from any client component.
 *  Standard: fbq('AddToCart', { ... })
 *  Custom:   fbq('trackCustom', 'EventName', { ... })
 */
export function fbq(action: string, eventOrParams?: string | Record<string, unknown>, params?: Record<string, unknown>) {
  callFbq(action, eventOrParams, params)
}

function PixelRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    callFbq('PageView')
  }, [pathname, searchParams])

  return null
}

export default function MetaPixel() {
  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');
      `}</Script>
      <Suspense fallback={null}>
        <PixelRouteTracker />
      </Suspense>
    </>
  )
}
