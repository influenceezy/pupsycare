import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAdminSession } from '@/lib/db'
import LeadsTable from '@/components/LeadsTable'

export default async function AdminLeadsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token || !validateAdminSession(token)) redirect('/admin/login')

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Waitlist Leads</h1>
        <p className="text-gray-500 text-sm mt-1">All phone numbers and details captured from checkout</p>
      </div>
      <LeadsTable />
    </div>
  )
}
