import { cookies } from 'next/headers'
import { deleteAdminSession } from '@/lib/db'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (token) {
      deleteAdminSession(token)
    }
    cookieStore.delete('admin_session')
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 500 })
  }
}
