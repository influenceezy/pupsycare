'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from './CartStore'

export default function CartPageClient() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  useEffect(() => {
    if (items.length === 0) return
    const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'cart_view',
        cart_items: items.map((i) => i.product.id),
        cart_total: total,
        session_id: sessionId,
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      }),
    }).catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-text mb-3">Your cart is empty</h1>
        <p className="text-muted mb-8">Start with one of our best-selling supplements.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-2xl border border-border p-5 flex gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/product/${product.slug}`} className="font-semibold text-text hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted">{product.flavor} · {product.format}</p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-muted hover:text-accent transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 border border-border rounded-full px-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-muted hover:text-text transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-muted hover:text-text transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-text">₹{product.price * quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-cream rounded-2xl border border-border p-6 h-fit">
          <h2 className="font-bold text-text mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-muted">
                <span>{product.name} × {quantity}</span>
                <span>₹{product.price * quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 mb-4">
            <div className="flex justify-between text-sm text-muted mb-1">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm text-muted mb-1">
              <span>Shipping</span>
              <span>{total >= 999 ? 'Free' : '₹99'}</span>
            </div>
            {total < 999 && (
              <p className="text-xs text-primary mt-1">Add ₹{999 - total} more for free shipping!</p>
            )}
          </div>
          <div className="flex justify-between font-bold text-text text-lg border-t border-border pt-4 mb-6">
            <span>Total</span>
            <span>₹{total < 999 ? total + 99 : total}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            Proceed to Checkout →
          </Link>
          <p className="text-center text-xs text-muted mt-3">🔒 Safe & secure checkout</p>
        </div>
      </div>
    </div>
  )
}
