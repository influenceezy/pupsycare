import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAdminSession, getStats } from '@/lib/db'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token || !validateAdminSession(token)) redirect('/admin/login')

  const stats = getStats()

  const funnel = [
    { label: 'Page Views', value: stats.totalVisits, icon: '👀' },
    { label: 'Product Views', value: stats.productViews, icon: '🛍️' },
    { label: 'Add to Cart', value: stats.addToCart, icon: '🛒' },
    { label: 'Checkout Attempts', value: stats.checkoutAttempts, icon: '💳' },
    { label: 'Waitlist Signups', value: stats.waitlistSignups, icon: '✅' },
  ]

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Validation metrics for Pupsy Care India</p>
      </div>

      {/* Period stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today's Visits" value={stats.todayVisits} icon="📅" color="blue" />
        <StatCard label="This Week" value={stats.weekVisits} icon="📊" color="green" />
        <StatCard label="Total Visits" value={stats.totalVisits} icon="🌐" color="purple" />
        <StatCard label="Leads Captured" value={stats.waitlistSignups} icon="🎯" color="orange" />
      </div>

      {/* Funnel */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-5">Conversion Funnel</h2>
        <div className="space-y-3">
          {funnel.map((step, i) => {
            const prev = i === 0 ? step.value : funnel[i - 1].value
            const pct = prev > 0 ? Math.round((step.value / prev) * 100) : 0
            const total = funnel[0].value
            const width = total > 0 ? Math.round((step.value / total) * 100) : 0
            const dropoff = i > 0 ? 100 - pct : null

            return (
              <div key={step.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <span>{step.icon}</span>
                    <span className="font-medium text-gray-700">{step.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {dropoff !== null && (
                      <span className="text-xs text-red-400">↓ {dropoff}% drop</span>
                    )}
                    <span className="font-bold text-gray-900">{step.value.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${Math.max(width, 1)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* CVR */}
        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <CvrStat label="Visit → Cart" a={stats.totalVisits} b={stats.addToCart} />
          <CvrStat label="Cart → Checkout" a={stats.addToCart} b={stats.checkoutAttempts} />
          <CvrStat label="Checkout → Lead" a={stats.checkoutAttempts} b={stats.waitlistSignups} />
          <CvrStat label="Overall CVR" a={stats.totalVisits} b={stats.waitlistSignups} />
        </div>
      </div>

      {/* Top pages + sources side by side */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Top Pages</h2>
          {stats.visitsByPage.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {stats.visitsByPage.slice(0, 8).map((row) => (
                <div key={row.page_url} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[200px]">{row.page_url || '/'}</span>
                  <span className="font-medium text-gray-900 ml-2">{row.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Traffic Sources</h2>
          {stats.visitsBySource.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
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
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Device split */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Device Breakdown</h2>
        <div className="flex gap-6">
          {stats.visitsByDevice.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : stats.visitsByDevice.map((row) => {
            const total = stats.visitsByDevice.reduce((s, r) => s + r.count, 0)
            const pct = total > 0 ? Math.round((row.count / total) * 100) : 0
            return (
              <div key={row.device} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{pct}%</p>
                <p className="text-sm text-gray-500 capitalize">{row.device}</p>
                <p className="text-xs text-gray-400">{row.count} visits</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-100',
    green: 'bg-green-50 border-green-100',
    purple: 'bg-purple-50 border-purple-100',
    orange: 'bg-orange-50 border-orange-100',
  }
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
  )
}

function CvrStat({ label, a, b }: { label: string; a: number; b: number }) {
  const pct = a > 0 ? ((b / a) * 100).toFixed(1) : '0.0'
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{pct}%</p>
    </div>
  )
}
