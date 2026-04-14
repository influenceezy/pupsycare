'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from './CartStore'

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  city: string
  pincode: string
}

type ModalState = 'hidden' | 'waitlist' | 'thankyou'

const STORAGE_KEY = 'pupsy_shipping'

export default function CheckoutClient() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.total())
  const clearCart = useCartStore((s) => s.clearCart)

  const [form, setForm] = useState<FormData>({
    name: '', phone: '', email: '', address: '', city: '', pincode: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [modal, setModal] = useState<ModalState>('hidden')
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

    // Track checkout_submit
    const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
    const utmSource = sessionStorage.getItem('utm_source') ?? undefined
    const utmMedium = sessionStorage.getItem('utm_medium') ?? undefined
    const utmCampaign = sessionStorage.getItem('utm_campaign') ?? undefined
    const utmContent = sessionStorage.getItem('utm_content') ?? undefined

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'checkout_submit',
        session_id: sessionId,
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      }),
    }).catch(() => {})

    // Show waitlist modal immediately
    const pos = Math.floor(Math.random() * (89 - 23 + 1)) + 23
    setWaitlistPos(pos)
    setModal('waitlist')
  }

  async function handleJoinWaitlist() {
    setLoading(true)
    const sessionId = sessionStorage.getItem('pupsy_session') ?? undefined
    const utmSource = sessionStorage.getItem('utm_source') ?? undefined
    const utmMedium = sessionStorage.getItem('utm_medium') ?? undefined
    const utmCampaign = sessionStorage.getItem('utm_campaign') ?? undefined
    const utmContent = sessionStorage.getItem('utm_content') ?? undefined

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          pincode: form.pincode,
          products: items.map((i) => i.product.name),
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_content: utmContent,
          session_id: sessionId,
          device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }),
      })
      clearCart()
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
      setModal('thankyou')
    } catch {
      setModal('thankyou')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && modal === 'hidden') {
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
                      placeholder="9876543210"
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
                className="w-full bg-accent text-white py-3.5 rounded-full font-bold text-base hover:bg-accent-dark transition-colors"
              >
                Place Order →
              </button>
              <p className="text-center text-xs text-muted mt-2">🔒 Your information is safe with us</p>
            </form>
          </div>

          {/* Order summary */}
          <div className="bg-cream rounded-2xl border border-border p-6 h-fit">
            <h2 className="font-bold text-text mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-muted">{product.name} × {quantity}</span>
                  <span className="font-medium text-text">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1 mb-3">
              <div className="flex justify-between text-sm text-muted">
                <span>Shipping</span>
                <span>{total >= 999 ? 'Free' : '₹99'}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-text border-t border-border pt-3">
              <span>Total</span>
              <span>₹{total < 999 ? total + 99 : total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {modal !== 'hidden' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            {modal === 'waitlist' ? (
              <>
                <div className="text-5xl mb-4">🐕</div>
                <h2 className="text-2xl font-bold text-text mb-2">Oops! You&apos;re too fast!</h2>
                <p className="text-muted mb-4 leading-relaxed">
                  This product just sold out! You&apos;re{' '}
                  <strong className="text-accent text-lg">#{waitlistPos}</strong> on the waitlist.
                </p>
                <div className="bg-cream rounded-xl p-4 border border-border mb-6">
                  <p className="text-sm text-muted mb-1">We&apos;ll WhatsApp you the moment we restock</p>
                  <p className="text-xs text-muted">(usually within 5–7 days)</p>
                  <div className="mt-3 bg-white rounded-lg px-4 py-2 border border-border">
                    <p className="text-xs text-muted">Notifying you at:</p>
                    <p className="font-bold text-text">+91 {form.phone}</p>
                  </div>
                </div>
                <button
                  onClick={handleJoinWaitlist}
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary-dark transition-colors disabled:opacity-60"
                >
                  {loading ? 'Saving...' : 'Join Waitlist — Confirm My Spot'}
                </button>
                <p className="text-xs text-muted mt-3">No spam. WhatsApp only when stock arrives.</p>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-text mb-2">You&apos;re on the list!</h2>
                <p className="text-muted mb-6 leading-relaxed">
                  We&apos;ll WhatsApp <strong>{form.phone}</strong> the moment your order ships.
                  Usually 5–7 days. Thanks for your patience!
                </p>
                <a
                  href="https://instagram.com/pupsycareindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-bold hover:opacity-90 transition-opacity mb-3"
                >
                  Follow us on Instagram
                </a>
                <Link href="/" className="block text-center text-sm text-primary font-semibold hover:underline">
                  Back to Home
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
