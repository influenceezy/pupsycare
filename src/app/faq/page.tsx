import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Pupsy Care India dog supplements, shipping, and returns.',
}

const faqs = [
  {
    q: 'How long before I see results?',
    a: 'Most pet parents notice visible improvement within 3–6 weeks of daily use. Joint stiffness often improves in 2–3 weeks; coat changes take 4–6 weeks.',
  },
  {
    q: 'Are the chews safe for all dogs?',
    a: 'Yes — formulated for all breeds and sizes. Adjust dose by weight. If your dog is on medication or has a health condition, check with your vet first.',
  },
  {
    q: 'Can I use multiple products together?',
    a: 'Absolutely. All three formulas target different systems — joints, coat, and gut — and are safe in combination. Many customers stack two or all three for complete daily wellness.',
  },
  {
    q: "My dog is a picky eater. Will they eat this?",
    a: 'Our chews are flavoured with real chicken and salmon — highly palatable even for fussy eaters. If they refuse, try crumbling it over food.',
  },
  {
    q: "What's your return policy?",
    a: 'Unopened, unused products can be returned within 7 days of delivery. See our Refund Policy for full details.',
  },
  {
    q: 'Where do you ship?',
    a: 'We currently ship across India. See our Shipping Policy for delivery timelines and charges.',
  },
  {
    q: 'Who makes Pupsy Care products?',
    a: 'Pupsy Care is a trade name of Shash Digital Services Private Limited, registered in Rajasthan, India.',
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">Frequently Asked Questions</h1>
      <p className="text-muted mb-10">
        Have a question we haven&apos;t answered here? <a href="/contact" className="text-primary hover:underline">Contact us</a> and we&apos;ll help out.
      </p>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="group bg-cream rounded-xl border border-border p-5 cursor-pointer">
            <summary className="flex items-center justify-between font-semibold text-text list-none">
              {faq.q}
              <svg className="w-5 h-5 text-muted group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-3 text-sm text-muted leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
