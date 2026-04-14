'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from './CartStore'
import type { Product } from '@/lib/products'

export default function StickyAddToCart({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const router = useRouter()

  useEffect(() => {
    const anchor = document.getElementById('product-cta-anchor')
    if (!anchor) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(anchor)
    return () => observer.disconnect()
  }, [])

  function handleBuyNow() {
    setLoading(true)
    addItem(product)
    router.push('/checkout')
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text text-sm truncate">{product.name}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-primary font-bold">₹{product.price}</p>
            <p className="text-muted text-xs line-through">₹{product.mrp}</p>
          </div>
        </div>
        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="bg-accent text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-accent-dark transition-all active:scale-95 shrink-0 disabled:opacity-70"
        >
          {loading ? '…' : 'Buy Now'}
        </button>
      </div>
    </div>
  )
}
