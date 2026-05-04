'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from './CartStore'
import { fbq } from './MetaPixel'

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  city: string
  pincode: string
}

// Update this to your WhatsApp community invite link
const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/K5OZbkpNj1J4gOjjHanfaV'

const STORAGE_KEY = 'pupsy_shipping'

export default function CheckoutClient() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)

  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', address: '', city: '', pincode: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [confirmed, setConfirmed] = useState(false)
  const [waitlistPos, setWaitlistPos] = useState(42)
  const [loading, setLoading] = useState(false)
  const [pincodeLoading, setPincodeLoading] = useState(false)

  // Restore saved details on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormData>
        setForm((prev) => ({ ...prev, ...parsed }))
      }
    } catch {}
  }, [])

  // Persist details whenever form changes (skip empty forms)
  useEffect(() => {
    if (!form.name && !form.phone) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    } catch {}
  }, [form])

  // Auto-fill city from pincode via free India postal API
  async function handlePincodeChange(value: string) {
    setForm((prev) => ({ ...prev, pincode: value }))
    if (!/^\d{6}$/.test(value)) return
    setPincodeLoading(true)
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${value}`)
      const data = await res.json()
      if (data?.[0]?.Status === 'Success') {
        const district: string = data[0].PostOffice?.[0]?.District ?? ''
        if (district) setForm((prev) => ({ ...prev, city: district }))
      }
    } catch {} finally {
      setPincodeLoading(false)
    }
  }

  useEffect(() => {
    if (items.length === 0) return
    const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'checkout_start',
        cart_items: items.map((i) => i.product.id),
        session_id: sessionId,
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      }),
    }).catch(() => {})

    fbq('InitiateCheckout', {
      content_ids: items.map((i) => i.product.id),
      num_items: items.reduce((sum, i) => sum + i.quantity, 0),
      value: total,
      currency: 'INR',
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function validate(): boolean {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit Indian mobile number'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.pincode.trim()) e.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = 'Enter a valid 6-digit pincode'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
    const utmSource = sessionStorage.getItem('utm_source') ?? undefined
    const utmMedium = sessionStorage.getItem('utm_medium') ?? undefined
    const utmCampaign = sessionStorage.getItem('utm_campaign') ?? undefined
    const utmContent = sessionStorage.getItem('utm_content') ?? undefined

    const orderTotal = total
    const pos = Math.floor(Math.random() * (89 - 23 + 1)) + 23
    setWaitlistPos(pos)

    // Snapshot cart items before clearing (needed for pixel after clearCart)
    const cartIds = items.map((i) => i.product.id)

    try {
      // Save lead to DB immediately on Place Order
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          pincode: form.pincode,
          products: items.map((i) => `${i.product.name} (${i.packLabel}${i.isSubscription ? ', Monthly' : ''})`),
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_content: utmContent,
          session_id: sessionId,
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }),
      })
    } catch {
      // Proceed even if lead save fails — user still sees confirmation
    }

    // Track checkout_submit
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'checkout_submit',
        session_id: sessionId,
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      }),
    }).catch(() => {})

    // Fire Meta Pixel Purchase event
    fbq('Purchase', {
      content_ids: cartIds,
      content_type: 'product',
      value: orderTotal,
      currency: 'INR',
    })

    clearCart()
    try { localStorage.removeItem(STORAGE_KEY) } catch {}

    setLoading(false)
    setConfirmed(true)
  }

  if (items.length === 0 && !confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-text mb-3">Nothing to checkout</h1>
        <p className="text-muted mb-8">Add some products to your cart first.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} noValidate>
              <div className="bg-white rounded-2xl border border-border p-6 mb-6">
                <h2 className="font-bold text-text mb-5">Shipping Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Full Name *</label>
                    <input
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 ${errors.name ? 'border-red-400' : 'border-border'}`}
                      placeholder="Rajan Kumar"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 ${errors.phone ? 'border-red-400' : 'border-border'}`}
                      placeholder="9983524747"
                      maxLength={10}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text mb-1">Email (optional)</label>
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="rajan@email.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text mb-1">Address *</label>
                    <textarea
                      autoComplete="street-address"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      rows={2}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none ${errors.address ? 'border-red-400' : 'border-border'}`}
                      placeholder="Flat 4B, Sunrise Apartments, MG Road"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Pincode *</label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        value={form.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value.replace(/\D/g, ''))}
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 ${errors.pincode ? 'border-red-400' : 'border-border'}`}
                        placeholder="560001"
                        maxLength={6}
                      />
                      {pincodeLoading && (
                        <svg className="absolute right-3 top-3 w-4 h-4 animate-spin text-muted" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      )}
                    </div>
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">
                      City *
                      {pincodeLoading && <span className="text-xs text-primary font-normal ml-1">detecting…</span>}
                    </label>
                    <input
                      type="text"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 ${errors.city ? 'border-red-400' : 'border-border'}`}
                      placeholder="Bangalore"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-3.5 rounded-full font-bold text-base hover:bg-accent-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Placing your order…
                  </>
                ) : (
                  'Place Order →'
                )}
              </button>
              <p className="text-center text-xs text-muted mt-2">🔒 Your information is safe with us</p>
            </form>
          </div>

          {/* Order summary */}
          <div className="bg-cream rounded-2xl border border-border p-6 h-fit">
            <h2 className="font-bold text-text mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between text-sm">
                  <span className="text-muted">
                    {item.product.name} · {item.packLabel}
                    {item.isSubscription && ' (Monthly)'}
                    {item.quantity > 1 && ` × ${item.quantity}`}
                  </span>
                  <span className="font-medium text-text">₹{(item.packPrice * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1 mb-3">
              <div className="flex justify-between text-sm text-muted">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-text border-t border-border pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmed && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-text mb-2">You&apos;re on the waitlist!</h2>
            <p className="text-muted mb-2 leading-relaxed">
              You&apos;re <strong className="text-accent text-lg">#{waitlistPos}</strong> in line.
            </p>
            <div className="bg-cream rounded-xl p-4 border border-border mb-6">
              <p className="text-sm text-muted mb-1">We&apos;ll WhatsApp you the moment we restock</p>
              <p className="text-xs text-muted">(usually within 5–7 days)</p>
              <div className="mt-3 bg-white rounded-lg px-4 py-2 border border-border">
                <p className="text-xs text-muted">Notifying you at:</p>
                <p className="font-bold text-text">+91 {form.phone}</p>
              </div>
            </div>
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-full font-bold hover:opacity-90 transition-opacity mb-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join our WhatsApp Community
            </a>
            <a
              href="https://instagram.com/pupsycareindia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-bold hover:opacity-90 transition-opacity mb-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Follow us on Instagram
            </a>
            <Link href="/" className="block text-center text-sm text-primary font-semibold hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
