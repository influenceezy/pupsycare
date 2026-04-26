'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from './CartStore'
import { fbq } from './MetaPixel'
import type { Product, Pack } from '@/lib/products'

interface Props {
  product: Product
}

export default function ProductCTA({ product }: Props) {
  const defaultPack = product.packs[0]
  const [selectedPack, setSelectedPack] = useState<Pack>(defaultPack)
  const [isSubscription, setIsSubscription] = useState(true)
  const [showUpsellPopup, setShowUpsellPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const router = useRouter()

  function handlePackSelect(pack: Pack) {
    setSelectedPack(pack)
    if (pack.chews === 30) {
      setShowUpsellPopup(true)
    }
  }

  function upgradeAndClose(pack: Pack) {
    setSelectedPack(pack)
    setShowUpsellPopup(false)
  }

  async function handleBuyNow() {
    setLoading(true)
    addItem(product, selectedPack.chews, finalPrice, isSubscription)

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
          pack_chews: selectedPack.chews,
          is_subscription: isSubscription,
          utm_source: utmSource,
          session_id: sessionId,
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }),
      })

      fbq('AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: finalPrice,
        currency: 'INR',
      })
    } catch {}

    router.push('/checkout')
  }

  const subscriptionPrice = Math.round(selectedPack.price * 0.9)
  const finalPrice = isSubscription ? subscriptionPrice : selectedPack.price

  return (
    <>
      <div className="space-y-4">
        {/* Pack size selector */}
        <div>
          <p className="text-sm font-semibold text-text mb-2">Pack Size</p>
          <div className="grid grid-cols-3 gap-2">
            {product.packs.map((pack) => {
              const isSelected = selectedPack.chews === pack.chews
              const displayPrice = isSubscription ? Math.round(pack.price * 0.9) : pack.price
              const packDiscount = Math.round(((pack.mrp - displayPrice) / pack.mrp) * 100)
              return (
                <button
                  key={pack.chews}
                  onClick={() => handlePackSelect(pack)}
                  className={`relative flex flex-col items-center rounded-xl border-2 px-2 py-3 transition-all text-center ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-white hover:border-primary/40'
                  }`}
                >
                  {pack.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {pack.badge}
                    </span>
                  )}
                  <span className="font-bold text-sm text-text mt-1">{pack.chews} Chews</span>
                  <span className="text-xs text-muted">{pack.chews} days</span>
                  <span className="font-bold text-primary text-sm mt-1">₹{displayPrice.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-muted line-through">₹{pack.mrp.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-green-600 font-semibold">{packDiscount}% off</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Subscription toggle */}
        <div className="space-y-2">
          {/* Subscribe — prominent */}
          <button
            onClick={() => setIsSubscription(true)}
            className={`relative w-full flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left transition-all ${
              isSubscription
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border bg-white hover:border-primary/40'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              isSubscription ? 'border-primary' : 'border-border'
            }`}>
              {isSubscription && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-text">Subscribe &amp; Save 10%</p>
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">RECOMMENDED</span>
              </div>
              <p className="text-xs text-muted">Auto-delivered every 30 days · Never run out · Cancel anytime</p>
            </div>
          </button>

          {/* One-time — subdued */}
          <button
            onClick={() => setIsSubscription(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
              !isSubscription
                ? 'border-border bg-white'
                : 'border-border/50 bg-white/50 opacity-60 hover:opacity-80'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
              !isSubscription ? 'border-primary' : 'border-border'
            }`}>
              {!isSubscription && <div className="w-2 h-2 rounded-full bg-primary" />}
            </div>
            <p className="text-sm text-muted">One-time purchase</p>
          </button>
        </div>

        {/* Buy now button */}
        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-full font-bold text-base hover:bg-accent-dark transition-all active:scale-95 shadow-sm disabled:opacity-70"
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
            <span className="flex items-center gap-2">
              {isSubscription ? 'Subscribe' : 'Buy Now'} — ₹{finalPrice.toLocaleString('en-IN')}
              {isSubscription && (
                <span className="line-through text-white/60 font-normal text-sm">
                  ₹{selectedPack.price.toLocaleString('en-IN')}
                </span>
              )}
            </span>
          )}
        </button>

        <p className="text-center text-xs text-muted">
          🔒 Secure checkout · Free delivery · 30-day money-back guarantee
        </p>
      </div>

      {/* 30-day upsell popup */}
      {showUpsellPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div className="text-3xl mb-3 text-center">🐾</div>
            <h3 className="text-lg font-bold text-text text-center mb-2">
              Most pet parents go for 60–90 days
            </h3>
            <p className="text-sm text-muted text-center leading-relaxed mb-5">
              Supplements need time to work. Running out mid-course means your baby misses doses while you reorder and we deliver. Most parents top up before they run out.
            </p>

            <div className="space-y-2 mb-4">
              {product.packs.filter((p) => p.chews > 30).map((pack) => {
                const saving = pack.mrp - pack.price
                return (
                  <button
                    key={pack.chews}
                    onClick={() => upgradeAndClose(pack)}
                    className="w-full flex items-center justify-between bg-cream border-2 border-border hover:border-primary rounded-xl px-4 py-3 transition-all group"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-text text-sm group-hover:text-primary">
                        {pack.chews} Chews — {pack.chews} days
                        {pack.badge && (
                          <span className="ml-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {pack.badge}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-green-600 font-medium">Save ₹{saving.toLocaleString('en-IN')}</p>
                    </div>
                    <p className="font-bold text-text">₹{pack.price.toLocaleString('en-IN')}</p>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setShowUpsellPopup(false)}
              className="w-full text-center text-sm text-muted hover:text-text py-2 transition-colors"
            >
              Continue with 30 days
            </button>
          </div>
        </div>
      )}
    </>
  )
}
