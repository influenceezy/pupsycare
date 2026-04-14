'use client'

import { useState } from 'react'

interface FAQ {
  q: string
  a: string
}

export default function ProductFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-cream transition-colors"
          >
            <span className="font-semibold text-text text-sm pr-4">{faq.q}</span>
            <svg
              className={`w-5 h-5 text-muted transition-transform shrink-0 ${open === i ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-5 pb-4 pt-1 bg-white border-t border-border">
              <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
