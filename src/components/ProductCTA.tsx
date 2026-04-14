'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from './CartStore'
import type { Product } from '@/lib/products'

interface Props {
  product: Product
}

export default function ProductCTA({ product }: Props) {
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const router = useRouter()

  async function handleBuyNow() {
    setLoading(true)

    for (let i = 0; i < qty; i++) addItem(product)

    try {
      const utmSource = sessionStorage.getItem('utm_source') ?? undefined
      const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'buy_now',
          product_id: product.id,
          product_name: product.name,
          utm_source: utmSource,
          session_id: sessionId,
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }),
      })
    } catch {}

    router.push('/checkout')
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center border border-border rounded-full bg-cream overflow-hidden shrink-0">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-11 flex items-center justify-center text-text text-lg hover:bg-border transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold text-text text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="w-10 h-11 flex items-center justify-center text-text text-lg hover:bg-border transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Buy now */}
        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-full font-semibold text-base hover:bg-accent-dark transition-all active:scale-95 shadow-sm disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Taking you to checkout…
            </>
          ) : (
            <>
              Buy Now — ₹{(product.price * qty).toLocaleString('en-IN')}
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-muted">
        🔒 Secure checkout · Free delivery · 30-day money-back guarantee
      </p>
    </div>
  )
}
