import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse Pupsy Care\'s vet-formulated dog supplements — Happy Joints for mobility, Shine Coat for a lustrous coat, and Probiotic & Gut Wellness for digestion and immunity.',
}

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">All Products</h1>
        <p className="text-muted">Vet-formulated supplements for your dog&apos;s specific needs.</p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Joint Health', 'Skin & Coat', 'Gut Health'].map((f) => (
          <span key={f} className={`px-4 py-1.5 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
            f === 'All' ? 'bg-primary text-white border-primary' : 'border-border text-muted hover:border-primary hover:text-primary'
          }`}>
            {f}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-border group hover:shadow-lg transition-shadow flex flex-col">
            <Link href={`/product/${product.slug}`} className="relative h-52 overflow-hidden block">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              <span className="absolute top-3 right-3 bg-white/90 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                {product.category}
              </span>
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <Link href={`/product/${product.slug}`}>
                <h2 className="text-lg font-bold text-text mb-1 hover:text-primary transition-colors">{product.name}</h2>
              </Link>
              <p className="text-sm text-muted mb-3 flex-1">{product.tagline}</p>
              <ul className="space-y-1 mb-4">
                {product.benefits.slice(0, 2).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-muted">
                    <svg className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-text">₹{product.price}</span>
                  <span className="text-xs text-muted line-through ml-2">₹{product.mrp}</span>
                </div>
                <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <Link
                  href={`/product/${product.slug}`}
                  className="flex-1 text-center border border-border text-text px-3 py-2 rounded-full text-sm font-medium hover:bg-cream transition-colors"
                >
                  Details
                </Link>
                <AddToCartButton product={product} className="flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust section */}
      <div className="mt-16 bg-cream rounded-2xl p-8 border border-border text-center">
        <p className="text-2xl font-bold text-text mb-2">Not sure which to choose?</p>
        <p className="text-muted mb-6">Each formula targets a different system — and they&apos;re safe to use together.</p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-xl p-4 border border-border">
            <p className="font-semibold text-text mb-1">Joint pain, stiffness, slow movement</p>
            <p className="text-muted text-xs mb-3">→ For dogs 5+ years or larger breeds showing mobility issues</p>
            <Link href="/product/happy-joints" className="text-primary font-semibold hover:underline text-xs">Happy Joints →</Link>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <p className="font-semibold text-text mb-1">Excessive shedding, dull or dry coat</p>
            <p className="text-muted text-xs mb-3">→ For all dogs, especially during shedding seasons</p>
            <Link href="/product/shine-coat" className="text-primary font-semibold hover:underline text-xs">Shine Coat →</Link>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border">
            <p className="font-semibold text-text mb-1">Loose stools, paw licking, gut issues</p>
            <p className="text-muted text-xs mb-3">→ For dogs with sensitive stomachs or skin driven by gut imbalance</p>
            <Link href="/product/gut-health" className="text-primary font-semibold hover:underline text-xs">Probiotic & Gut Wellness →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
