import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPosts } from '@/lib/db'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `https://pupsycare.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://pupsycare.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.created_at).toISOString(),
      modifiedTime: new Date(post.updated_at).toISOString(),
      authors: ['https://pupsycare.com/about'],
      tags: [post.category ?? 'Dog Health'],
    },
  }
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post || !post.published) notFound()

  const allPosts = getBlogPosts(true).filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <JsonLd
        type="article"
        headline={post.title}
        description={post.excerpt ?? post.title}
        datePublished={new Date(post.created_at).toISOString()}
        dateModified={new Date(post.updated_at).toISOString()}
      />
      <JsonLd
        type="breadcrumb"
        items={[
          { name: 'Home', url: 'https://pupsycare.com' },
          { name: 'Blog', url: 'https://pupsycare.com/blog' },
          { name: post.title, url: `https://pupsycare.com/blog/${post.slug}` },
        ]}
      />
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-primary">Blog</Link>
        <span>›</span>
        <span className="text-text line-clamp-1">{post.title}</span>
      </nav>

      <div className="grid md:grid-cols-3 gap-10">
        <article className="md:col-span-2">
          {/* Category + date */}
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            )}
            <span className="text-xs text-muted">{formatDate(post.created_at)}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-text leading-tight mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-muted leading-relaxed mb-8 border-l-4 border-primary pl-4 italic">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author + CTA */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                PC
              </div>
              <div>
                <p className="font-semibold text-text">Pupsy Care Team</p>
                <p className="text-sm text-muted">Dog health enthusiasts & pet parents</p>
              </div>
            </div>
            <div className="bg-cream rounded-2xl border border-border p-6 text-center">
              <p className="font-bold text-text mb-2">Ready to help your dog feel better?</p>
              <p className="text-muted text-sm mb-4">Our vet-formulated supplements support joint health and coat care naturally.</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-dark transition-colors text-sm"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related posts */}
          {allPosts.length > 0 && (
            <div className="bg-cream rounded-2xl border border-border p-5">
              <h3 className="font-bold text-text mb-4">More Articles</h3>
              <div className="space-y-4">
                {allPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                    <p className="text-sm font-semibold text-text group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted mt-1">{formatDate(p.created_at)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Product promo */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5">
            <p className="text-sm font-bold text-text mb-2">🐾 Pupsy Care Supplements</p>
            <p className="text-xs text-muted mb-4">Vet-formulated. Made in India. Results in 3–6 weeks.</p>
            <Link href="/shop" className="block text-center bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">
              View Products
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
