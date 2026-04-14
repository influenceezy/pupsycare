import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { createAdminSession } from '@/lib/db'

// Hashed version of "password" — change in production
const ADMIN_EMAIL = 'admin@pupsycare.com'
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('password', 10)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (email !== ADMIN_EMAIL) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    if (!valid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = Math.random().toString(36).slice(2) + Date.now().toString(36)
    createAdminSession(token)

    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
