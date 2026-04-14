'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/leads', label: 'Leads', icon: '📋' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { href: '/admin/blog', label: 'Blog', icon: '✏️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">Pupsy Care</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <span>🌐</span>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <span>🚪</span>
          {loggingOut ? 'Logging out...' : 'Log Out'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-200 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-bold text-sm">Admin Panel</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
