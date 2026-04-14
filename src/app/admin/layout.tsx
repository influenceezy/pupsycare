import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAdminSession } from '@/lib/db'
import AdminSidebar from '@/components/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  const isAuthed = token ? validateAdminSession(token) : false

  // Login page itself is not protected
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isAuthed && <AdminSidebar />}
      <main className={`flex-1 ${isAuthed ? 'md:ml-60' : ''}`}>
        {children}
      </main>
    </div>
  )
}
