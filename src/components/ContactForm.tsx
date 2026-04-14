'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    // In production, this would hit a contact API. For now, just simulate.
    await new Promise((r) => setTimeout(r, 800))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="bg-green-50 rounded-2xl border border-green-200 p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-text mb-2">Message sent!</h3>
        <p className="text-muted text-sm">We&apos;ll get back to you within 24 hours. Or ping us on WhatsApp for a faster reply.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 space-y-4">
      <h2 className="font-bold text-text mb-2">Send us a message</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="9876543210"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Email *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          placeholder="Tell us about your dog and how we can help..."
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
