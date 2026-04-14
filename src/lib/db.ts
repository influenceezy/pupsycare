import postgres from 'postgres'

declare global {
  // eslint-disable-next-line no-var
  var _sql: postgres.Sql | undefined
}

const sql =
  global._sql ??
  postgres(process.env.DATABASE_URL!, {
    ssl: 'require',
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    types: {
      // PostgreSQL BIGINT (OID 20) returns strings by default to avoid precision
      // loss. Our timestamps are epoch milliseconds which fit safely in a JS number.
      bigint: {
        to: 20,
        from: [20],
        serialize: (n: number) => String(n),
        parse: (s: string) => Number(s),
      },
    },
  })

if (process.env.NODE_ENV !== 'production') {
  global._sql = sql
}

// ─── Event Tracking ──────────────────────────────────────────────────────────
export async function insertEvent(event: {
  event_type: string
  page_url?: string
  product_id?: string
  product_name?: string
  cart_items?: string
  cart_total?: number
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  device?: string
  session_id?: string
  ip?: string
}) {
  await sql`
    INSERT INTO events (event_type, page_url, product_id, product_name, cart_items, cart_total, timestamp, utm_source, utm_medium, utm_campaign, utm_content, device, session_id, ip)
    VALUES (
      ${event.event_type},
      ${event.page_url ?? null},
      ${event.product_id ?? null},
      ${event.product_name ?? null},
      ${event.cart_items ?? null},
      ${event.cart_total ?? null},
      ${Date.now()},
      ${event.utm_source ?? null},
      ${event.utm_medium ?? null},
      ${event.utm_campaign ?? null},
      ${event.utm_content ?? null},
      ${event.device ?? null},
      ${event.session_id ?? null},
      ${event.ip ?? null}
    )
  `
}

// ─── Lead Management ─────────────────────────────────────────────────────────
export async function insertLead(lead: {
  name: string
  phone: string
  email?: string
  city?: string
  pincode?: string
  products?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  waitlist_position?: number
}) {
  await sql`
    INSERT INTO leads (name, phone, email, city, pincode, products, utm_source, utm_medium, utm_campaign, utm_content, waitlist_position, created_at)
    VALUES (
      ${lead.name},
      ${lead.phone},
      ${lead.email ?? null},
      ${lead.city ?? null},
      ${lead.pincode ?? null},
      ${lead.products ?? null},
      ${lead.utm_source ?? null},
      ${lead.utm_medium ?? null},
      ${lead.utm_campaign ?? null},
      ${lead.utm_content ?? null},
      ${lead.waitlist_position ?? null},
      ${Date.now()}
    )
  `
}

export async function getLeads(search?: string, page = 1, limit = 50): Promise<Lead[]> {
  const offset = (page - 1) * limit
  if (search) {
    const q = `%${search}%`
    return sql<Lead[]>`
      SELECT * FROM leads
      WHERE name ILIKE ${q} OR phone ILIKE ${q} OR email ILIKE ${q} OR city ILIKE ${q}
      ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `
  }
  return sql<Lead[]>`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
}

export async function getLeadsCount(search?: string): Promise<number> {
  if (search) {
    const q = `%${search}%`
    const [{ count }] = await sql<[{ count: string }]>`
      SELECT COUNT(*)::int as count FROM leads
      WHERE name ILIKE ${q} OR phone ILIKE ${q} OR email ILIKE ${q} OR city ILIKE ${q}
    `
    return Number(count)
  }
  const [{ count }] = await sql<[{ count: string }]>`SELECT COUNT(*)::int as count FROM leads`
  return Number(count)
}

export async function getAllLeadsForExport(): Promise<Lead[]> {
  return sql<Lead[]>`SELECT * FROM leads ORDER BY created_at DESC`
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export async function getStats() {
  const todayStart = new Date().setHours(0, 0, 0, 0)
  const weekStart = Date.now() - 7 * 24 * 3600 * 1000

  const [
    [{ c: totalVisits }],
    [{ c: todayVisits }],
    [{ c: weekVisits }],
    [{ c: addToCart }],
    [{ c: checkoutAttempts }],
    [{ c: waitlistSignups }],
    [{ c: productViews }],
    [{ c: checkoutSubmits }],
    visitsByPage,
    visitsBySource,
    visitsByDevice,
  ] = await Promise.all([
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM events WHERE event_type = 'page_view'`,
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM events WHERE event_type = 'page_view' AND timestamp >= ${todayStart}`,
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM events WHERE event_type = 'page_view' AND timestamp >= ${weekStart}`,
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM events WHERE event_type = 'add_to_cart'`,
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM events WHERE event_type = 'checkout_start'`,
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM leads`,
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM events WHERE event_type = 'product_view'`,
    sql<[{ c: string }]>`SELECT COUNT(*)::int as c FROM events WHERE event_type = 'checkout_submit'`,
    sql<{ page_url: string; count: number }[]>`
      SELECT page_url, COUNT(*)::int as count FROM events
      WHERE event_type = 'page_view' AND page_url IS NOT NULL
      GROUP BY page_url ORDER BY count DESC LIMIT 10
    `,
    sql<{ source: string; count: number }[]>`
      SELECT COALESCE(utm_source, 'direct') as source, COUNT(*)::int as count FROM events
      WHERE event_type = 'page_view'
      GROUP BY source ORDER BY count DESC LIMIT 10
    `,
    sql<{ device: string; count: number }[]>`
      SELECT COALESCE(device, 'unknown') as device, COUNT(*)::int as count FROM events
      WHERE event_type = 'page_view'
      GROUP BY device ORDER BY count DESC
    `,
  ])

  return {
    totalVisits: Number(totalVisits),
    todayVisits: Number(todayVisits),
    weekVisits: Number(weekVisits),
    addToCart: Number(addToCart),
    checkoutAttempts: Number(checkoutAttempts),
    waitlistSignups: Number(waitlistSignups),
    productViews: Number(productViews),
    checkoutSubmits: Number(checkoutSubmits),
    visitsByPage,
    visitsBySource,
    visitsByDevice,
  }
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export async function getBlogPosts(published?: boolean): Promise<BlogPost[]> {
  if (published) {
    return sql<BlogPost[]>`SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC`
  }
  return sql<BlogPost[]>`SELECT * FROM blog_posts ORDER BY created_at DESC`
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const [post] = await sql<BlogPost[]>`SELECT * FROM blog_posts WHERE slug = ${slug}`
  return post
}

export async function getBlogPostById(id: number): Promise<BlogPost | undefined> {
  const [post] = await sql<BlogPost[]>`SELECT * FROM blog_posts WHERE id = ${id}`
  return post
}

export async function createBlogPost(
  post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>,
): Promise<{ id: number }> {
  const now = Date.now()
  const [{ id }] = await sql<[{ id: number }]>`
    INSERT INTO blog_posts (title, slug, content, excerpt, category, published, created_at, updated_at)
    VALUES (${post.title}, ${post.slug}, ${post.content}, ${post.excerpt ?? null}, ${post.category ?? null}, ${post.published}, ${now}, ${now})
    RETURNING id
  `
  return { id }
}

export async function updateBlogPost(
  id: number,
  post: Partial<Omit<BlogPost, 'id' | 'created_at'>>,
): Promise<void> {
  await sql`
    UPDATE blog_posts
    SET title = ${post.title ?? null},
        slug = ${post.slug ?? null},
        content = ${post.content ?? null},
        excerpt = ${post.excerpt ?? null},
        category = ${post.category ?? null},
        published = ${post.published ?? null},
        updated_at = ${Date.now()}
    WHERE id = ${id}
  `
}

export async function deleteBlogPost(id: number): Promise<void> {
  await sql`DELETE FROM blog_posts WHERE id = ${id}`
}

// ─── Admin Sessions ───────────────────────────────────────────────────────────
export async function createAdminSession(token: string): Promise<void> {
  await sql`INSERT INTO admin_sessions (token, created_at) VALUES (${token}, ${Date.now()})`
}

export async function validateAdminSession(token: string): Promise<boolean> {
  const [session] = await sql`SELECT id FROM admin_sessions WHERE token = ${token}`
  return !!session
}

export async function deleteAdminSession(token: string): Promise<void> {
  await sql`DELETE FROM admin_sessions WHERE token = ${token}`
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Lead {
  id: number
  name: string
  phone: string
  email: string | null
  city: string | null
  pincode: string | null
  products: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  waitlist_position: number | null
  created_at: number
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string | null
  published: number
  created_at: number
  updated_at: number
}
