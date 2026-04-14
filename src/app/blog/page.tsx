import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dog health tips, nutrition guides, and expert advice for Indian pet parents from Pupsy Care.',
}

const categoryColors: Record<string, string> = {
  'Dog Health': 'bg-primary/10 text-primary',
  'Nutrition': 'bg-accent/10 text-accent-dark',
  'Grooming Tips': 'bg-yellow-100 text-yellow-700',
  'Pupsy Updates': 'bg-purple-100 text-purple-700',
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getBlogPosts(true)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">Pupsy Blog</h1>
        <p className="text-muted max-w-2xl">
          Practical advice on dog health, nutrition, and care — written for Indian pet parents by the Pupsy team.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All Posts', 'Dog Health', 'Nutrition', 'Grooming Tips', 'Pupsy Updates'].map((cat) => (
          <span key={cat} className={`px-3 py-1 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
            cat === 'All Posts' ? 'bg-primary text-white border-primary' : 'border-border text-muted hover:border-primary hover:text-primary'
          }`}>
            {cat}
          </span>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted">No posts yet. Check back soon!</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Placeholder image based on category */}
              <div className="h-40 bg-gradient-to-br from-cream to-border flex items-center justify-center text-5xl">
                {post.category === 'Dog Health' ? '🦴' : post.category === 'Nutrition' ? '🥗' : '✨'}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category ?? ''] ?? 'bg-cream text-muted'}`}>
                    {post.category ?? 'General'}
                  </span>
                  <span className="text-xs text-muted">{formatDate(post.created_at)}</span>
                </div>
                <h2 className="font-bold text-text group-hover:text-primary transition-colors leading-snug mb-2 flex-1">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                )}
                <span className="text-primary text-sm font-semibold group-hover:underline">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="mt-16 bg-cream rounded-2xl border border-border p-8 text-center">
        <h3 className="text-xl font-bold text-text mb-2">Get dog care tips in your inbox</h3>
        <p className="text-muted text-sm mb-6">Join 3,000+ Indian pet parents. No spam, just useful stuff.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
