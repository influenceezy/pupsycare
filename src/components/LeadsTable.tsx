'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Lead } from '@/lib/db'

function formatDate(ts: number) {
  return new Date(ts).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    const res = await fetch(`/api/admin/leads?${params}`)
    const data = await res.json()
    setLeads(data.leads ?? [])
    setTotal(data.total ?? 0)
    setPages(data.pages ?? 1)
    setLoading(false)
  }, [page, search])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  function handleExport() {
    const params = new URLSearchParams({ export: 'csv' })
    if (search) params.set('search', search)
    window.open(`/api/admin/leads?${params}`, '_blank')
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name, phone, email, city..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
        >
          ↓ Export CSV
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        {total.toLocaleString()} lead{total !== 1 ? 's' : ''} total
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">City</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Products</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">UTM</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">Loading...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">No leads yet. Run some ads!</td>
                </tr>
              ) : leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(lead.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:+91${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{lead.email ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.city ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs max-w-[120px] truncate">
                    {lead.products ? JSON.parse(lead.products).join(', ') : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{lead.utm_source ?? 'direct'}</td>
                  <td className="px-4 py-3">
                    <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">
                      #{lead.waitlist_position ?? '?'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-sm text-gray-600 disabled:opacity-40 hover:text-gray-900"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-500">Page {page} of {pages}</span>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="text-sm text-gray-600 disabled:opacity-40 hover:text-gray-900"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
