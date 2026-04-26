'use client'

import { useEffect } from 'react'
import { fbq } from './MetaPixel'

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

    fbq('ViewContent', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      currency: 'INR',
    })
  }, [productId, productName])

  return null
}
