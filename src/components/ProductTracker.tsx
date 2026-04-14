'use client'

import { useEffect } from 'react'

export default function ProductTracker({
  productId,
  productName,
}: {
  productId: string
  productName: string
}) {
  useEffect(() => {
    const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
    const utmSource = sessionStorage.getItem('utm_source') ?? undefined
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'product_view',
        product_id: productId,
        product_name: productName,
        session_id: sessionId,
        utm_source: utmSource,
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      }),
    }).catch(() => {})
  }, [productId, productName])

  return null
}
