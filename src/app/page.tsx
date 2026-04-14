import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'
import JsonLd from '@/components/JsonLd'

const testimonials = [
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    dog: 'Bruno, 8-yr Labrador',
    text: 'Bruno used to struggle getting up in the mornings. After 5 weeks on Happy Joints, he\'s moving like he\'s 3 again. Our vet noticed the difference too!',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Arjun Mehta',
    city: 'Bangalore',
    dog: 'Luna, 4-yr Golden Retriever',
    text: 'Luna\'s shedding has reduced dramatically. Her coat looks incredible — even my groomer asked what I changed. Shine Coat is now a permanent part of her routine.',
    rating: 5,
    avatar: 'AM',
  },
  {
    name: 'Kavita Reddy',
    city: 'Hyderabad',
    dog: 'Rocky, 6-yr German Shepherd',
    text: 'Rocky has been on Happy Joints for 2 months. He\'s back to chasing his ball and climbing stairs without hesitation. The difference is night and day.',
    rating: 5,
    avatar: 'KR',
  },
  {
    name: 'Rohan Kapoor',
    city: 'Delhi',
    dog: 'Mango, 3-yr Beagle',
    text: 'Mango had really itchy, dry skin. Shine Coat sorted it out in about 6 weeks. No more constant scratching and the coat is shiny and soft. Totally worth it.',
    rating: 5,
    avatar: 'RK',
  },
]

const trustSignals = [
  { icon: '🔬', label: 'Vet-Formulated', desc: 'Developed with veterinary guidance' },
  { icon: '🇮🇳', label: 'Made in India', desc: 'Certified Indian manufacturing' },
  { icon: '🌿', label: 'Natural Ingredients', desc: 'No artificial additives or fillers' },
  { icon: '🐾', label: '10,000+ Happy Dogs', desc: 'Trusted by Indian pet parents' },
]

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
    q: 'Can I give both products together?',
    a: 'Absolutely. Many customers use both Happy Joints and Shine Coat together. They target different systems and ingredients are safe in combination.',
  },
  {
    q: 'My dog is a picky eater. Will they eat this?',
    a: 'Our chews are flavoured with real chicken and salmon — highly palatable even for fussy eaters. If they refuse, try crumbling it over food.',
  },
  {
    q: 'What\'s your return policy?',
    a: 'If you\'re not satisfied within 30 days, contact hello@pupsycare.com and we\'ll make it right.',
  },
  {
    q: 'Where do you ship?',
    a: 'We\'re based in Bengaluru and currently shipping across major Indian cities, working towards pan-India coverage.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd type="organization" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                Made in India · Vet-Formulated
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
                Because they can&apos;t tell you{' '}
                <span className="text-primary">where it hurts.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Premium soft chews for your dog&apos;s joint health and coat care — made with natural
                ingredients and loved by Indian pet parents.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/blog" className="inline-flex items-center gap-2 border border-border text-text px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors">
                  Learn More
                </Link>
              </div>
              <p className="text-xs text-muted mt-4">Starting at ₹799 · Free shipping above ₹999</p>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                  alt="Happy, healthy dog"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs font-semibold text-text">4.9/5 rating</p>
                  <p className="text-xs text-muted">1,200+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-y border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-text">{t.label}</p>
                  <p className="text-xs text-muted">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Is your dog struggling with...</h2>
          <p className="text-muted max-w-xl mx-auto">The most common concerns Indian pet parents bring to their vets — and nutrition is often at the root.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              emoji: '🦴', title: 'Joint Pain & Stiffness', color: 'primary',
              items: ['Slow to rise in the mornings', 'Reluctant to climb stairs or jump', 'Shorter, more hesitant walks', 'Occasional limping'],
              href: '/product/happy-joints', cta: 'See Happy Joints',
            },
            {
              emoji: '✨', title: 'Excessive Shedding & Dull Coat', color: 'accent',
              items: ['Fur everywhere, year-round', 'Dry, dull, or brittle coat', 'Itchy, flaky, or irritated skin', 'Constant scratching or licking'],
              href: '/product/shine-coat', cta: 'See Shine Coat',
            },
          ].map((card) => (
            <div key={card.title} className="bg-cream rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">{card.emoji}</span>
              </div>
              <h3 className="text-xl font-bold text-text mb-3">{card.title}</h3>
              <ul className="space-y-2 text-muted text-sm mb-6">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">●</span>{item}
                  </li>
                ))}
              </ul>
              <Link href={card.href} className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
                {card.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Our Products</h2>
            <p className="text-muted">Two targeted formulas. One happy dog.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-cream rounded-2xl overflow-hidden border border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">{product.badge}</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">{product.category}</p>
                      <h3 className="text-xl font-bold text-text">{product.name}</h3>
                      <p className="text-sm text-muted mt-1">{product.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold text-text">₹{product.price}</p>
                      <p className="text-xs text-muted line-through">₹{product.mrp}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5 mb-6">
                    {product.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted">
                        <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Link href={`/product/${product.slug}`} className="flex-1 text-center border border-border text-text px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-border transition-colors">
                      Learn More
                    </Link>
                    <AddToCartButton product={product} className="flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">How It Works</h2>
          <p className="text-muted max-w-lg mx-auto">Simple daily ritual. Real, lasting results.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Give Daily', desc: 'One soft chew a day, like a treat. Dogs love the flavour — no hiding required.', icon: '🐾' },
            { step: '02', title: 'Stay Consistent', desc: 'Supplements work gradually. Stick with it daily for 4–6 weeks for meaningful results.', icon: '📅' },
            { step: '03', title: 'See the Difference', desc: 'Watch your dog move freely, shed less, and carry a coat that turns heads.', icon: '✨' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">{item.step}</p>
              <h3 className="text-lg font-bold text-text mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-cream border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Loved by Indian Pet Parents</h2>
            <div className="flex items-center justify-center gap-1 text-yellow-400">
              <span className="text-xl">★★★★★</span>
              <span className="text-muted text-sm ml-2">4.9/5 from 1,200+ reviews</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-5 border border-border">
                <div className="flex text-yellow-400 text-sm mb-3">{'★'.repeat(t.rating)}</div>
                <p className="text-sm text-muted leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{t.name}</p>
                    <p className="text-xs text-muted">{t.dog} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Frequently Asked Questions</h2>
        </div>
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
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to give them the best?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of Indian pet parents who&apos;ve made the switch to science-backed, natural supplements.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-cream transition-colors">
            Shop Now — From ₹799
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
