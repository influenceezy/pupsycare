'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from './CartStore'
import type { Product } from '@/lib/products'

interface Props {
  product: Product
  className?: string
  trackEvent?: boolean
}

export default function AddToCartButton({ product, className = '', trackEvent = true }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)
  const router = useRouter()

  async function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)

    if (trackEvent) {
      const utmSource = sessionStorage.getItem('utm_source') ?? undefined
      const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'add_to_cart',
          product_id: product.id,
          product_name: product.name,
          utm_source: utmSource,
          session_id: sessionId,
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }),
      }).catch(() => {})
    }
  }

  return (
    <button
      onClick={handleAdd}
      className={`inline-flex items-center justify-center gap-2 bg-accent text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-dark transition-all active:scale-95 ${className}`}
    >
      {added ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  )
}
