import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Reach out to Pupsy Care India — we\'re here to help with any questions about your dog\'s health.',
}

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">Contact Us</h1>
        <p className="text-muted max-w-xl">
          Have a question about your dog&apos;s health or our products? We&apos;re here to help.
          Expect a reply within 24 hours.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <ContactForm />

        {/* Contact info */}
        <div className="space-y-6">
          {/* WhatsApp */}
          <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.556 4.121 1.528 5.854L.054 23.678a.5.5 0 00.617.617l5.824-1.474A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 01-5.196-1.458l-.373-.22-3.868.979.998-3.65-.242-.375A10 10 0 1112 22z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-text">Chat on WhatsApp</p>
                <p className="text-sm text-muted">Fastest response — usually within 2 hours</p>
              </div>
            </div>
            <a
              href="https://wa.me/919983524747"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-green-500 text-white px-4 py-2.5 rounded-full font-semibold hover:bg-green-600 transition-colors text-sm"
            >
              Open WhatsApp Chat
            </a>
          </div>

          {/* Contact details */}
          <div className="bg-cream rounded-2xl border border-border p-6 space-y-4">
            <h3 className="font-bold text-text">Other ways to reach us</h3>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-xl">📧</span>
              <div>
                <p className="font-medium text-text">Email</p>
                <a href="mailto:hello@pupsycare.com" className="text-primary hover:underline">hello@pupsycare.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-xl mt-0.5">📍</span>
              <div>
                <p className="font-medium text-text">Address</p>
                <p className="text-muted">123, 12th Cross, Indiranagar<br />Bengaluru, Karnataka 560038</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-xl">🕐</span>
              <div>
                <p className="font-medium text-text">Business Hours</p>
                <p className="text-muted">Monday–Saturday, 10am–6pm IST</p>
              </div>
            </div>
          </div>

          {/* FAQ CTA */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5 text-center">
            <p className="text-sm font-semibold text-text mb-1">Looking for quick answers?</p>
            <p className="text-xs text-muted mb-3">Check our FAQ — most questions are answered there.</p>
            <a href="/#faq" className="text-primary text-sm font-semibold hover:underline">View FAQ →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
