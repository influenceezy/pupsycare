'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCartStore } from './CartStore'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount())

  useEffect(() => { setMounted(true) }, [])

  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null

  const links = [
    { href: '/shop', label: 'Shop' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="Pupsy Care India — Safe, Happy, Loved"
              width={160}
              height={56}
              className="h-12 w-auto sm:h-10"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith(l.href) ? 'text-primary' : 'text-muted'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2 text-text hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-text"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith(l.href) ? 'text-primary bg-cream' : 'text-text hover:bg-cream'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-primary text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
