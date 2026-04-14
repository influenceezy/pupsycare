import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { validateAdminSession, getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/db'

async function checkAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  return token ? validateAdminSession(token) : false
}

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/admin/blog/[id]'>) {
  if (!(await checkAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  const post = await getBlogPostById(Number(id))
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(post)
}

export async function PUT(request: NextRequest, ctx: RouteContext<'/api/admin/blog/[id]'>) {
  if (!(await checkAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  const body = await request.json()
  const { title, slug, content, excerpt, category, published } = body

  await updateBlogPost(Number(id), { title, slug, content, excerpt, category, published: published ? 1 : 0 })
  return Response.json({ ok: true })
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<'/api/admin/blog/[id]'>) {
  if (!(await checkAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  await deleteBlogPost(Number(id))
  return Response.json({ ok: true })
}
