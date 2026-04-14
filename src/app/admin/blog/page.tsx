import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAdminSession, getBlogPosts } from '@/lib/db'
import BlogManager from '@/components/BlogManager'

export default async function AdminBlogPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token || !validateAdminSession(token)) redirect('/admin/login')

  const posts = getBlogPosts()

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
        <p className="text-gray-500 text-sm mt-1">Create, edit, and manage blog posts</p>
      </div>
      <BlogManager initialPosts={posts} />
    </div>
  )
}
