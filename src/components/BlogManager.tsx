'use client'

import { useState } from 'react'
import type { BlogPost } from '@/lib/db'

type Mode = 'list' | 'create' | 'edit'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogManager({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [mode, setMode] = useState<Mode>('list')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', category: 'Dog Health', content: '', published: true })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function startCreate() {
    setForm({ title: '', slug: '', excerpt: '', category: 'Dog Health', content: '', published: true })
    setEditingPost(null)
    setMode('create')
  }

  function startEdit(post: BlogPost) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? '',
      category: post.category ?? 'Dog Health',
      content: post.content,
      published: !!post.published,
    })
    setEditingPost(post)
    setMode('edit')
  }

  async function handleSave() {
    setSaving(true)
    setMessage('')
    try {
      if (mode === 'create') {
        const res = await fetch('/api/admin/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to create post')
      } else if (mode === 'edit' && editingPost) {
        const res = await fetch(`/api/admin/blog/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed to update post')
      }
      // Refresh list
      const res = await fetch('/api/admin/blog')
      const updated = await res.json()
      setPosts(updated)
      setMode('list')
      setMessage('Saved successfully!')
    } catch (e) {
      setMessage('Error saving post')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    setPosts(posts.filter((p) => p.id !== id))
  }

  if (mode === 'list') {
    return (
      <div>
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm mb-4">
            {message}
          </div>
        )}
        <div className="flex justify-end mb-4">
          <button
            onClick={startCreate}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            + New Post
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{post.title}</p>
                    <p className="text-xs text-gray-400">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{post.category ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(post.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEdit(post)} className="text-primary text-xs font-semibold hover:underline">Edit</button>
                      <button onClick={() => handleDelete(post.id)} className="text-red-400 text-xs hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">No posts yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setMode('list')} className="text-gray-400 hover:text-gray-600 transition-colors">
          ← Back
        </button>
        <h2 className="text-lg font-bold text-gray-900">{mode === 'create' ? 'New Post' : 'Edit Post'}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="5 Signs Your Dog Has Joint Pain..."
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              {['Dog Health', 'Nutrition', 'Grooming Tips', 'Pupsy Updates'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            placeholder="Short description shown on the blog listing page..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML supported)</label>
          <textarea
            rows={16}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-y font-mono text-xs"
            placeholder="<h2>Your heading</h2><p>Your content...</p>"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="published" className="text-sm text-gray-700">Published (visible on site)</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving || !form.title || !form.slug}
            className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Post'}
          </button>
          <button
            onClick={() => setMode('list')}
            className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
