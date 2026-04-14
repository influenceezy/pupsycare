'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTracked = useRef('')

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    if (url === lastTracked.current) return
    lastTracked.current = url

    const device = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
    const utm = {
      utm_source: searchParams.get('utm_source') ?? sessionStorage.getItem('utm_source') ?? undefined,
      utm_medium: searchParams.get('utm_medium') ?? sessionStorage.getItem('utm_medium') ?? undefined,
      utm_campaign: searchParams.get('utm_campaign') ?? sessionStorage.getItem('utm_campaign') ?? undefined,
      utm_content: searchParams.get('utm_content') ?? sessionStorage.getItem('utm_content') ?? undefined,
    }

    // Persist UTM params through the session
    if (searchParams.get('utm_source')) {
      sessionStorage.setItem('utm_source', searchParams.get('utm_source')!)
      sessionStorage.setItem('utm_medium', searchParams.get('utm_medium') ?? '')
      sessionStorage.setItem('utm_campaign', searchParams.get('utm_campaign') ?? '')
      sessionStorage.setItem('utm_content', searchParams.get('utm_content') ?? '')
    }

    const sessionId = sessionStorage.getItem('pupsy_session') ?? (() => {
      const id = Math.random().toString(36).slice(2)
      sessionStorage.setItem('pupsy_session', id)
      return id
    })()

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'page_view',
        page_url: url,
        device,
        session_id: sessionId,
        ...utm,
      }),
    }).catch(() => {})
  }, [pathname, searchParams])

  return null
}

export default function TrackPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  )
}
