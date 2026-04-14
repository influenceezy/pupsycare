import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'
import { getBlogPosts } from '@/lib/db'

const BASE_URL = 'https://pupsycare.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts = getBlogPosts(true)
    blogPages = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    // DB may not be initialised at build time
  }

  return [...staticPages, ...productPages, ...blogPages]
}
