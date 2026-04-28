import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminSession } from '@/lib/db'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const emailMatch = email === ADMIN_EMAIL
    const passwordMatch = typeof password === 'string' && password === ADMIN_PASSWORD
    if (!emailMatch || !passwordMatch) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = Math.random().toString(36).slice(2) + Date.now().toString(36)
    await createAdminSession(token)

    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[admin/auth]', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
