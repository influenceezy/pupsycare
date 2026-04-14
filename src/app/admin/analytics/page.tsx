import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAdminSession, getStats } from '@/lib/db'

export default async function AdminAnalyticsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token || !validateAdminSession(token)) redirect('/admin/login')

  const stats = getStats()

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Detailed breakdown of site traffic and performance</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 mb-1">Today</p>
          <p className="text-3xl font-bold text-gray-900">{stats.todayVisits.toLocaleString()}</p>
          <p className="text-sm text-gray-500">page views</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 mb-1">This Week</p>
          <p className="text-3xl font-bold text-gray-900">{stats.weekVisits.toLocaleString()}</p>
          <p className="text-sm text-gray-500">page views</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-xs text-gray-500 mb-1">All Time</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalVisits.toLocaleString()}</p>
          <p className="text-sm text-gray-500">page views</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Pages */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Visits by Page</h2>
          {stats.visitsByPage.length === 0 ? (
            <p className="text-gray-400 text-sm">No page view data yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.visitsByPage.map((row) => {
                const max = stats.visitsByPage[0]?.count ?? 1
                const pct = Math.round((row.count / max) * 100)
                return (
                  <div key={row.page_url}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 truncate max-w-[200px]">{row.page_url || '/'}</span>
                      <span className="font-medium text-gray-900 ml-2">{row.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Sources */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Traffic Sources (UTM)</h2>
          {stats.visitsBySource.length === 0 ? (
            <p className="text-gray-400 text-sm">No UTM data yet. Add UTM params to your ads.</p>
          ) : (
            <div className="space-y-3">
              {stats.visitsBySource.map((row) => {
                const total = stats.visitsBySource.reduce((s, r) => s + r.count, 0)
                const pct = total > 0 ? Math.round((row.count / total) * 100) : 0
                return (
                  <div key={row.source}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 capitalize">{row.source}</span>
                      <span className="font-medium text-gray-900">{row.count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Device */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Device Breakdown</h2>
        {stats.visitsByDevice.length === 0 ? (
          <p className="text-gray-400 text-sm">No device data yet.</p>
        ) : (
          <div className="flex flex-wrap gap-8">
            {stats.visitsByDevice.map((row) => {
              const total = stats.visitsByDevice.reduce((s, r) => s + r.count, 0)
              const pct = total > 0 ? Math.round((row.count / total) * 100) : 0
              return (
                <div key={row.device} className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-1">{pct}%</div>
                  <div className="text-sm capitalize text-gray-600">{row.device}</div>
                  <div className="text-xs text-gray-400">{row.count.toLocaleString()} visits</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Events summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Event Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Product Views', value: stats.productViews, icon: '🛍️' },
            { label: 'Add to Cart', value: stats.addToCart, icon: '🛒' },
            { label: 'Checkout Starts', value: stats.checkoutAttempts, icon: '💳' },
            { label: 'Checkout Submits', value: stats.checkoutSubmits, icon: '📝' },
          ].map((e) => (
            <div key={e.label} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{e.icon}</div>
              <div className="text-xl font-bold text-gray-900">{e.value.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{e.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
