import { cookies } from 'next/headers'
import { validateAdminSession, getStats } from '@/lib/db'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token || !validateAdminSession(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stats = getStats()
  return Response.json(stats)
}
