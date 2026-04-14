import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products, getProduct, getOtherProduct } from '@/lib/products'
import ProductGallery from '@/components/ProductGallery'
import ProductCTA from '@/components/ProductCTA'
import ProductFAQ from '@/components/ProductFAQ'
import StickyAddToCart from '@/components/StickyAddToCart'
import ProductTracker from '@/components/ProductTracker'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/product/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  const desc = `${product.tagline} — ${product.problem}. ${product.format}, ${product.flavor} flavour. Vet-formulated, made in India. ₹${product.price}.`
  return {
    title: `${product.name} — Dog ${product.category} Supplement`,
    description: desc,
    keywords: [product.name, product.category, 'dog supplement India', ...product.ingredients.map((i) => i.name)],
    alternates: { canonical: `https://pupsycare.com/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: desc,
      url: `https://pupsycare.com/product/${product.slug}`,
      images: [{ url: product.image, width: 800, height: 600, alt: product.name }],
    },
  }
}

const reviews = [
  { name: 'Sneha R.', city: 'Pune', rating: 5, text: 'Absolutely love this product. My dog was hesitant at first but now looks forward to it every morning like a treat.' },
  { name: 'Vikram S.', city: 'Chennai', rating: 5, text: 'Saw a huge difference in 4 weeks. Highly recommend to anyone with a senior dog.' },
  { name: 'Meera K.', city: 'Bangalore', rating: 5, text: 'Great product, prompt delivery, and the customer support team was very helpful when I had questions.' },
  { name: 'Aditya P.', city: 'Mumbai', rating: 4, text: 'Good product, took about 5 weeks to see results but definitely seeing improvement now.' },
  { name: 'Priya N.', city: 'Delhi', rating: 5, text: 'My vet actually approved this after I showed her the ingredients list. Really impressed by the quality.' },
  { name: 'Rahul M.', city: 'Hyderabad', rating: 5, text: 'My 9-year-old Lab is like a puppy again on walks. Cannot believe the difference in just one month.' },
]

const starBreakdown = [
  { stars: 5, count: 118 },
  { stars: 4, count: 18 },
  { stars: 3, count: 4 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
]
const totalReviews = starBreakdown.reduce((s, r) => s + r.count, 0)

const trustBadges = [
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Vet Formulated',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8L3 21" />
      </svg>
    ),
    label: 'Made in India 🇮🇳',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    label: '30-Day Guarantee',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    label: 'No Artificial Additives',
  },
]

export default async function ProductPage({ params }: PageProps<'/product/[slug]'>) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const other = getOtherProduct(slug)
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12">
        <JsonLd
          type="product"
          name={product.name}
          description={`${product.tagline} — ${product.problem}. ${product.format}, ${product.flavor} flavour.`}
          image={`https://pupsycare.com${product.image}`}
          price={product.price}
          sku={product.slug}
          ratingValue={4.9}
          reviewCount={142}
        />
        <JsonLd
          type="breadcrumb"
          items={[
            { name: 'Home', url: 'https://pupsycare.com' },
            { name: 'Shop', url: 'https://pupsycare.com/shop' },
            { name: product.name, url: `https://pupsycare.com/product/${product.slug}` },
          ]}
        />
        <ProductTracker productId={product.id} productName={product.name} />

        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>›</span>
          <span className="text-text">{product.name}</span>
        </nav>

        {/* ── HERO ── */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} badge={product.badge} />

          {/* Info */}
          <div>
            <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-1">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">{product.name}</h1>
            <p className="text-muted text-lg mb-4">{product.tagline}</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex text-yellow-400 text-lg">{'★'.repeat(5)}</div>
              <span className="text-sm font-semibold text-text">4.9</span>
              <span className="text-muted text-sm">({totalReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-bold text-text">₹{product.price}</span>
              <span className="text-muted line-through text-lg">₹{product.mrp}</span>
              <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-0.5 rounded-full">
                Save {discount}%
              </span>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-3 mb-5">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 bg-cream border border-border rounded-full px-3 py-1.5">
                  <span className="text-primary text-sm">{b.icon}</span>
                  <span className="text-xs font-medium text-text">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { label: 'Format', value: product.format },
                { label: 'Flavour', value: product.flavor },
                { label: 'Best For', value: product.forDogs },
                { label: 'Made In', value: 'India 🇮🇳' },
              ].map((spec) => (
                <div key={spec.label} className="bg-cream rounded-xl p-3 border border-border">
                  <p className="text-xs text-muted">{spec.label}</p>
                  <p className="text-sm font-semibold text-text">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTA — anchor for sticky bar */}
            <div id="product-cta-anchor">
              <ProductCTA product={product} />
            </div>

            {/* Delivery reassurance */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Ships in 24 hrs
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Free delivery
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30-day guarantee
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-5 pt-5 border-t border-border">
              <h3 className="font-semibold text-text mb-3 text-sm uppercase tracking-wide">What it does</h3>
              <ul className="space-y-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── PROBLEM HOOK ── */}
        <div className="bg-cream border border-border rounded-2xl p-6 sm:p-8 mb-14">
          <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">Sound familiar?</p>
          <h2 className="text-2xl font-bold text-text mb-6">Is your dog showing these signs?</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {product.signs.map((sign) => (
              <div key={sign} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-border">
                <div className="w-5 h-5 rounded border-2 border-primary/40 shrink-0" />
                <span className="text-sm text-text">{sign}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted leading-relaxed">
            If you said yes to any of these, <span className="font-semibold text-text">{product.name}</span> was made for your dog. It addresses the root cause — not just the symptoms.
          </p>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="mb-14">
          <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">Simple to use</p>
          <h2 className="text-2xl font-bold text-text mb-8">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {product.howItWorks.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  {i < product.howItWorks.length - 1 && (
                    <div className="hidden sm:block flex-1 h-px bg-border" />
                  )}
                </div>
                <h3 className="font-bold text-text mb-1">{step.step}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RESULTS TIMELINE ── */}
        <div className="bg-cream border border-border rounded-2xl p-6 sm:p-8 mb-14">
          <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">What to expect</p>
          <h2 className="text-2xl font-bold text-text mb-6">Results week by week</h2>
          <div className="space-y-4">
            {product.resultsTimeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mt-1 shrink-0" />
                  {i < product.resultsTimeline.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="font-bold text-text text-sm mb-0.5">{item.period}</p>
                  <p className="text-sm text-muted leading-relaxed">{item.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INGREDIENTS + FEEDING GUIDE ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="bg-cream rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-text mb-4">Key Ingredients</h2>
            <div className="space-y-4">
              {product.ingredients.map((ing) => (
                <div key={ing.name} className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-text">{ing.name}</p>
                    <p className="text-xs text-muted">{ing.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cream rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-text mb-4">Feeding Guide</h2>
            <div className="space-y-2">
              {product.feedingGuide.map((row) => (
                <div key={row.weight} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-border">
                  <span className="text-sm text-muted">{row.weight}</span>
                  <span className="text-sm font-semibold text-text">{row.chews}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-3">Best given in the morning, with or without food.</p>
          </div>
        </div>

        {/* ── REVIEWS ── */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-text mb-8">What dog parents are saying</h2>

          {/* Summary */}
          <div className="flex flex-col sm:flex-row gap-8 bg-cream border border-border rounded-2xl p-6 mb-6">
            <div className="flex flex-col items-center justify-center sm:border-r sm:border-border sm:pr-8 shrink-0">
              <span className="text-5xl font-bold text-text">4.9</span>
              <div className="flex text-yellow-400 text-lg my-1">{'★'.repeat(5)}</div>
              <span className="text-sm text-muted">{totalReviews} reviews</span>
            </div>
            <div className="flex-1 space-y-2">
              {starBreakdown.map(({ stars, count }) => (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <span className="text-muted w-8 text-right shrink-0">{stars}★</span>
                  <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${(count / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-muted w-6 shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white rounded-xl p-5 border border-border">
                <div className="flex text-yellow-400 text-sm mb-2">{'★'.repeat(r.rating)}</div>
                <p className="text-sm text-muted leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                <p className="text-sm font-semibold text-text">
                  {r.name} <span className="text-muted font-normal">· {r.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-text mb-6">Frequently Asked Questions</h2>
          <ProductFAQ faqs={product.faqs} />
        </div>

        {/* ── MONEY-BACK GUARANTEE ── */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 flex gap-5 items-start mb-14">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-text text-lg mb-1">30-Day Money-Back Guarantee</h3>
            <p className="text-sm text-muted leading-relaxed">
              Try {product.name} risk-free. If you don&rsquo;t see a real improvement in your dog within 30 days of consistent use, we&rsquo;ll refund you completely — no questions, no forms, no hassle. We&rsquo;re that confident.
            </p>
          </div>
        </div>

        {/* ── FREQUENTLY BOUGHT TOGETHER ── */}
        {other && (
          <div className="bg-cream rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold text-text mb-4">Frequently Bought Together</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <span className="text-2xl text-muted font-light">+</span>
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border">
                  <Image src={other.image} alt={other.name} fill className="object-cover" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text mb-1">{product.name} + {other.name}</p>
                <p className="text-sm text-muted mb-3">
                  Complete daily wellness — joint mobility and a healthy, shiny coat in one routine.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="font-bold text-text">₹{product.price + other.price}</span>
                    <span className="text-muted line-through ml-2">₹{product.mrp + other.mrp}</span>
                  </div>
                  <Link
                    href={`/product/${other.slug}`}
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    Add {other.name} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile CTA */}
      <StickyAddToCart product={product} />
    </>
  )
}
