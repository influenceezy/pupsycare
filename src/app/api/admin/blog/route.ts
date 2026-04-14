import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { validateAdminSession, getBlogPosts, createBlogPost } from '@/lib/db'

async function checkAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  return token ? validateAdminSession(token) : false
}

export async function GET() {
  if (!(await checkAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const posts = getBlogPosts()
  return Response.json(posts)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, slug, content, excerpt, category, published } = body

  if (!title || !slug || !content) {
    return Response.json({ error: 'title, slug and content are required' }, { status: 400 })
  }

  const result = createBlogPost({ title, slug, content, excerpt, category, published: published ? 1 : 0 })
  return Response.json({ ok: true, id: result.lastInsertRowid })
}
