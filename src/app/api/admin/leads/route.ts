import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { validateAdminSession, getLeads, getLeadsCount, getAllLeadsForExport } from '@/lib/db'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token || !(await validateAdminSession(token))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') ?? undefined
  const page = parseInt(searchParams.get('page') ?? '1')
  const exportCsv = searchParams.get('export') === 'csv'

  if (exportCsv) {
    const leads = await getAllLeadsForExport()
    const rows = [
      ['ID', 'Date', 'Name', 'Phone', 'Email', 'City', 'Pincode', 'Products', 'UTM Source', 'UTM Campaign', 'Waitlist Position'],
      ...leads.map((l) => [
        String(l.id),
        new Date(l.created_at).toLocaleString('en-IN'),
        l.name,
        l.phone,
        l.email ?? '',
        l.city ?? '',
        l.pincode ?? '',
        l.products ?? '',
        l.utm_source ?? '',
        l.utm_campaign ?? '',
        String(l.waitlist_position ?? ''),
      ]),
    ]
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="pupsy-leads-${Date.now()}.csv"`,
      },
    })
  }

  const leads = await getLeads(search, page)
  const total = await getLeadsCount(search)

  return Response.json({ leads, total, page, pages: Math.ceil(total / 50) })
}
