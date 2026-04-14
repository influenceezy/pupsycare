import Database from 'better-sqlite3'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'pupsy.db')

let db: Database.Database

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initDb(db)
  }
  return db
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      page_url TEXT,
      product_id TEXT,
      product_name TEXT,
      cart_items TEXT,
      cart_total REAL,
      timestamp INTEGER NOT NULL,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      device TEXT,
      session_id TEXT,
      ip TEXT
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      city TEXT,
      pincode TEXT,
      products TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      waitlist_position INTEGER,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      excerpt TEXT,
      category TEXT,
      published INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL
    );
  `)

  // Seed blog posts if none exist
  const blogCount = db.prepare('SELECT COUNT(*) as count FROM blog_posts').get() as { count: number }
  if (blogCount.count === 0) {
    seedBlogPosts(db)
  }
}

function seedBlogPosts(db: Database.Database) {
  const now = Date.now()
  const posts = [
    {
      title: '5 Signs Your Dog Has Joint Pain (And What To Do)',
      slug: '5-signs-your-dog-has-joint-pain',
      excerpt: 'Joint pain in dogs is more common than most pet parents realise. Here\'s how to spot the early warning signs — and what you can do to help.',
      category: 'Dog Health',
      content: `<h2>Is Your Dog Trying to Tell You Something?</h2>
<p>Dogs are masters at hiding pain. It's an instinct — in the wild, showing weakness makes you a target. So by the time your dog is visibly limping, they may have been quietly suffering for months.</p>
<p>The good news: once you know what to look for, the signs are there. Here are five things most pet parents miss.</p>

<h2>1. They're Slower to Get Up in the Morning</h2>
<p>Does your dog take a few extra seconds — or even minutes — to rise after sleeping? This is one of the earliest signs of joint stiffness. Joints stiffen when they're not moving, so the first step after rest is the hardest.</p>
<p>Watch how your dog moves in those first few minutes of the day. A dog with healthy joints bounces up eagerly. One with joint pain hesitates, shifts their weight, or struggles.</p>

<h2>2. They've Stopped Jumping on the Sofa (or Bed)</h2>
<p>If your dog suddenly stops doing something they used to do — jumping, climbing stairs, leaping into the car — that's a behavioural change worth noticing. Dogs don't stop doing things they love without a reason. Pain is usually that reason.</p>

<h2>3. They Lick or Chew at Their Joints</h2>
<p>Dogs often lick or chew at sore areas on their body. If you notice your dog repeatedly attending to their wrists, elbows, hips, or knees — especially with no visible skin issue — they may be trying to soothe an aching joint.</p>

<h2>4. They're Less Excited About Walks</h2>
<p>A dog who used to race to the door at the sound of "walkies" but now drags their feet or turns back early is sending a clear message. Exercise hurts when joints aren't working properly.</p>
<p>This is especially common in larger breeds and senior dogs. If your dog is 5+ years old and slowing down on walks, joint health deserves a look.</p>

<h2>5. Personality Changes — More Grumpy or Withdrawn</h2>
<p>Chronic pain changes personalities — in humans and dogs alike. A dog in persistent discomfort may snap when touched in certain areas, become less social, sleep more, or seem generally "off".</p>
<p>If your normally affectionate dog has become irritable or aloof, don't dismiss it as "just getting old." Pain is treatable.</p>

<h2>What Can You Do?</h2>
<p>First, a vet visit is always the right first step to rule out serious conditions. Beyond that:</p>
<ul>
<li><strong>Weight management</strong> — Every extra kg adds significant stress to joints.</li>
<li><strong>Low-impact exercise</strong> — Short, gentle walks are better than one long one. Swimming is excellent if available.</li>
<li><strong>Joint supplements</strong> — Glucosamine, Chondroitin, MSM, and Turmeric are well-studied for supporting joint health and reducing inflammation. Daily supplementation can make a real difference over 4–8 weeks.</li>
<li><strong>Warm sleeping spots</strong> — Cold floors worsen joint stiffness. An orthopedic dog bed helps.</li>
</ul>

<p>At Pupsy Care, our Happy Joints chews are formulated with therapeutic doses of Glucosamine, Chondroitin, MSM, and Turmeric — all in a chicken-flavoured soft chew your dog will actually eat. Most pet parents report visible improvement within 3–4 weeks.</p>`,
      published: 1,
      created_at: now - 7 * 24 * 3600 * 1000,
      updated_at: now - 7 * 24 * 3600 * 1000,
    },
    {
      title: 'Why Is My Dog Shedding So Much? A Complete Guide',
      slug: 'why-is-my-dog-shedding-so-much',
      excerpt: 'Shedding is normal — but excessive shedding isn\'t. Learn the difference, what causes it, and how to get your dog\'s coat back to its glorious best.',
      category: 'Dog Health',
      content: `<h2>First, Let's Talk About Normal Shedding</h2>
<p>All dogs shed. Even "hypoallergenic" breeds like Poodles and Shih Tzus shed — just much less. Shedding is how dogs replace old or damaged fur, and it's perfectly natural.</p>
<p>Most dogs shed more during seasonal changes — especially spring (when they lose their winter coat) and autumn. This is called "coat blowing" and can look alarming if you're not expecting it.</p>
<p>But there's a difference between normal seasonal shedding and excessive, year-round shedding that leaves clumps on your sofa and clouds of fur every time your dog walks by.</p>

<h2>Why Dogs Shed Excessively</h2>

<h3>1. Poor Nutrition</h3>
<p>A dog's coat is a direct reflection of their diet. Skin and hair require specific nutrients — particularly Omega-3 and Omega-6 fatty acids, Biotin, and Zinc. When these are deficient, the result is dull, brittle fur that falls out easily and skin that's dry, flaky, or itchy.</p>
<p>Many commercial dog foods use low-quality ingredients and plant-based fats that don't provide the Omega-3s dogs need. Fish-based supplements fill this gap effectively.</p>

<h3>2. Dehydration</h3>
<p>Dehydrated skin = more shedding. Make sure your dog always has access to fresh water, and consider adding wet food to their diet if they're on a dry kibble-only plan.</p>

<h3>3. Allergies</h3>
<p>Food allergies (commonly chicken, beef, dairy, or grains) and environmental allergies (dust mites, pollen, mould) can cause excessive shedding, skin irritation, itching, and hot spots. If your dog is scratching constantly alongside heavy shedding, allergies might be the cause.</p>

<h3>4. Stress</h3>
<p>Dogs can shed excessively when stressed — a vet visit, a new pet in the house, moving home, or changes in routine. This is temporary, but chronic stress leads to chronic shedding.</p>

<h3>5. Hormonal Imbalances</h3>
<p>Conditions like hypothyroidism or Cushing's disease affect coat quality significantly. If your dog's shedding is accompanied by weight changes, excessive thirst, or a pot-bellied appearance, a vet check is important.</p>

<h2>What Actually Helps</h2>

<h3>Omega-3 Supplements</h3>
<p>This is the most evidence-backed intervention for coat health. Omega-3 fatty acids (EPA and DHA) reduce skin inflammation, improve skin barrier function, and result in shinier, less brittle fur. Most dogs need supplementation because their regular diet doesn't provide enough.</p>

<h3>Regular Brushing</h3>
<p>Brushing removes dead fur before it ends up on your furniture and distributes natural skin oils through the coat. Aim for 3–4 times a week for most breeds, daily for double-coated breeds.</p>

<h3>Bathing with the Right Shampoo</h3>
<p>Over-bathing strips natural oils. Once a month is usually enough (unless your dog loves mud). Use a gentle, dog-specific shampoo — human shampoos throw off the skin's pH balance.</p>

<h3>Address the Root Cause</h3>
<p>If you suspect allergies or hormonal issues, a vet visit is the right call. No amount of supplementation will fix a medical condition that needs treatment.</p>

<h2>Our Shine Coat Formula</h2>
<p>Pupsy's Shine Coat chews combine Omega-3 (from salmon oil), Omega-6, Biotin, and Zinc in a salmon-flavoured soft chew. Together, these nutrients strengthen the hair follicle, reduce skin inflammation, and improve coat lustre. Most pet parents see a noticeable reduction in shedding within 4–6 weeks.</p>`,
      published: 1,
      created_at: now - 14 * 24 * 3600 * 1000,
      updated_at: now - 14 * 24 * 3600 * 1000,
    },
    {
      title: 'How To Choose The Right Supplement For Your Dog',
      slug: 'how-to-choose-the-right-supplement-for-your-dog',
      excerpt: 'The pet supplement market is flooded with products making big claims. Here\'s a straightforward framework to help you choose wisely — and avoid wasting money on things that don\'t work.',
      category: 'Nutrition',
      content: `<h2>The Problem With Most Pet Supplements</h2>
<p>Walk into any pet store in India and you'll find shelves full of supplements. Each promises miracles. Most deliver nothing. The pet supplement industry is largely unregulated, which means brands can make almost any claim without proving it.</p>
<p>So how do you separate the good from the gimmicky? Here's what to actually look for.</p>

<h2>1. Start With the Problem, Not the Product</h2>
<p>Before you buy anything, get specific about what you're trying to address:</p>
<ul>
<li>Is your dog stiff in the mornings? (Joint support)</li>
<li>Is their coat dull and shedding excessively? (Skin & coat support)</li>
<li>Is their digestion off? (Probiotics and digestive enzymes)</li>
<li>Are they anxious? (Calming supplements)</li>
</ul>
<p>A supplement that "does everything" usually does nothing particularly well. Look for targeted formulas designed for specific concerns.</p>

<h2>2. Check the Ingredient List (Not Just the Claims)</h2>
<p>The front of a package will say whatever sounds good. The back tells the truth. For joint supplements, look for:</p>
<ul>
<li><strong>Glucosamine</strong> — The building block of cartilage. Dose matters: you want at least 500mg per serving for a medium dog.</li>
<li><strong>Chondroitin</strong> — Works alongside Glucosamine to protect cartilage and reduce inflammation.</li>
<li><strong>MSM (Methylsulfonylmethane)</strong> — An anti-inflammatory that supports tissue repair.</li>
<li><strong>Turmeric / Curcumin</strong> — Natural anti-inflammatory with good evidence in both human and animal studies.</li>
</ul>
<p>For skin and coat supplements, look for:</p>
<ul>
<li><strong>Omega-3 (EPA & DHA)</strong> — Preferably from fish oil (not flaxseed, which dogs convert poorly to usable Omega-3).</li>
<li><strong>Biotin</strong> — A B-vitamin critical for skin and coat health.</li>
<li><strong>Zinc</strong> — Supports skin barrier function and reduces excessive shedding.</li>
</ul>

<h2>3. Look for Transparent Dosing</h2>
<p>Some companies list ingredients without quantities — this is a red flag. "Proprietary blend" often means they're using just enough of each ingredient to list it, not enough to actually do anything.</p>
<p>Demand transparency. Good brands show you exactly how much of each active ingredient is in each serving.</p>

<h2>4. Format Matters for Compliance</h2>
<p>The best supplement in the world is useless if your dog won't eat it. Tablets and capsules are notoriously difficult to get into dogs. Powders work better but can be refused if mixed into food.</p>
<p>Soft chews with real flavourings (chicken, salmon) get eaten consistently. If your dog treats it like a reward, you'll never miss a dose.</p>

<h2>5. Give It Time</h2>
<p>Supplements are not medications. They work gradually by supporting the body's natural processes. Most quality supplements take 4–8 weeks of consistent use before you see meaningful results.</p>
<p>If a brand promises results in a week, be sceptical. If you're not seeing any change after 8–10 weeks of consistent use, the supplement probably isn't the right fit.</p>

<h2>6. Made In India — Why It Matters</h2>
<p>Indian dogs live in Indian climates — hot, humid summers, monsoon seasons, dust and pollution. Supplements formulated for and tested in Western environments may not account for these factors.</p>
<p>Beyond that, buying Indian supports local manufacturing, keeps prices fair, and means shorter supply chains — fresher product in your dog's bowl.</p>

<h2>The Pupsy Difference</h2>
<p>We built Pupsy because we couldn't find supplements that ticked all these boxes. Our products use therapeutic doses of clinically supported ingredients, in a chicken or salmon-flavoured soft chew format dogs love — and we're fully transparent about every ingredient and dose.</p>
<p>We're a small, India-based brand that cares more about your dog's results than our margins. That's why we're in validation mode right now — making sure our products work before we scale.</p>`,
      published: 1,
      created_at: now - 21 * 24 * 3600 * 1000,
      updated_at: now - 21 * 24 * 3600 * 1000,
    },
  ]

  const insert = db.prepare(`
    INSERT INTO blog_posts (title, slug, excerpt, category, content, published, created_at, updated_at)
    VALUES (@title, @slug, @excerpt, @category, @content, @published, @created_at, @updated_at)
  `)
  for (const post of posts) {
    insert.run(post)
  }
}

// ─── Event Tracking ──────────────────────────────────────────────────────────
export function insertEvent(event: {
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
  const d = getDb()
  return d.prepare(`
    INSERT INTO events (event_type, page_url, product_id, product_name, cart_items, cart_total, timestamp, utm_source, utm_medium, utm_campaign, utm_content, device, session_id, ip)
    VALUES (@event_type, @page_url, @product_id, @product_name, @cart_items, @cart_total, @timestamp, @utm_source, @utm_medium, @utm_campaign, @utm_content, @device, @session_id, @ip)
  `).run({ ...event, timestamp: Date.now() })
}

// ─── Lead Management ─────────────────────────────────────────────────────────
export function insertLead(lead: {
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
  const d = getDb()
  return d.prepare(`
    INSERT INTO leads (name, phone, email, city, pincode, products, utm_source, utm_medium, utm_campaign, utm_content, waitlist_position, created_at)
    VALUES (@name, @phone, @email, @city, @pincode, @products, @utm_source, @utm_medium, @utm_campaign, @utm_content, @waitlist_position, @created_at)
  `).run({ ...lead, created_at: Date.now() })
}

export function getLeads(search?: string, page = 1, limit = 50) {
  const d = getDb()
  const offset = (page - 1) * limit
  if (search) {
    const q = `%${search}%`
    return d.prepare(`
      SELECT * FROM leads WHERE name LIKE ? OR phone LIKE ? OR email LIKE ? OR city LIKE ?
      ORDER BY created_at DESC LIMIT ? OFFSET ?
    `).all(q, q, q, q, limit, offset) as Lead[]
  }
  return d.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset) as Lead[]
}

export function getLeadsCount(search?: string) {
  const d = getDb()
  if (search) {
    const q = `%${search}%`
    return (d.prepare(`SELECT COUNT(*) as count FROM leads WHERE name LIKE ? OR phone LIKE ? OR email LIKE ? OR city LIKE ?`).get(q, q, q, q) as { count: number }).count
  }
  return (d.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number }).count
}

export function getAllLeadsForExport() {
  const d = getDb()
  return d.prepare('SELECT * FROM leads ORDER BY created_at DESC').all() as Lead[]
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export function getStats() {
  const d = getDb()
  const todayStart = new Date().setHours(0, 0, 0, 0)
  const weekStart = Date.now() - 7 * 24 * 3600 * 1000

  const totalVisits = (d.prepare("SELECT COUNT(*) as c FROM events WHERE event_type = 'page_view'").get() as { c: number }).c
  const todayVisits = (d.prepare("SELECT COUNT(*) as c FROM events WHERE event_type = 'page_view' AND timestamp >= ?").get(todayStart) as { c: number }).c
  const weekVisits = (d.prepare("SELECT COUNT(*) as c FROM events WHERE event_type = 'page_view' AND timestamp >= ?").get(weekStart) as { c: number }).c
  const addToCart = (d.prepare("SELECT COUNT(*) as c FROM events WHERE event_type = 'add_to_cart'").get() as { c: number }).c
  const checkoutAttempts = (d.prepare("SELECT COUNT(*) as c FROM events WHERE event_type = 'checkout_start'").get() as { c: number }).c
  const waitlistSignups = (d.prepare('SELECT COUNT(*) as c FROM leads').get() as { c: number }).c
  const productViews = (d.prepare("SELECT COUNT(*) as c FROM events WHERE event_type = 'product_view'").get() as { c: number }).c
  const checkoutSubmits = (d.prepare("SELECT COUNT(*) as c FROM events WHERE event_type = 'checkout_submit'").get() as { c: number }).c

  const visitsByPage = d.prepare(`
    SELECT page_url, COUNT(*) as count FROM events WHERE event_type = 'page_view' AND page_url IS NOT NULL
    GROUP BY page_url ORDER BY count DESC LIMIT 10
  `).all() as { page_url: string; count: number }[]

  const visitsBySource = d.prepare(`
    SELECT COALESCE(utm_source, 'direct') as source, COUNT(*) as count FROM events WHERE event_type = 'page_view'
    GROUP BY source ORDER BY count DESC LIMIT 10
  `).all() as { source: string; count: number }[]

  const visitsByDevice = d.prepare(`
    SELECT COALESCE(device, 'unknown') as device, COUNT(*) as count FROM events WHERE event_type = 'page_view'
    GROUP BY device ORDER BY count DESC
  `).all() as { device: string; count: number }[]

  return {
    totalVisits, todayVisits, weekVisits,
    addToCart, checkoutAttempts, waitlistSignups,
    productViews, checkoutSubmits,
    visitsByPage, visitsBySource, visitsByDevice,
  }
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export function getBlogPosts(published?: boolean) {
  const d = getDb()
  if (published) {
    return d.prepare('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC').all() as BlogPost[]
  }
  return d.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all() as BlogPost[]
}

export function getBlogPost(slug: string) {
  const d = getDb()
  return d.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(slug) as BlogPost | undefined
}

export function getBlogPostById(id: number) {
  const d = getDb()
  return d.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id) as BlogPost | undefined
}

export function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const d = getDb()
  const now = Date.now()
  return d.prepare(`
    INSERT INTO blog_posts (title, slug, content, excerpt, category, published, created_at, updated_at)
    VALUES (@title, @slug, @content, @excerpt, @category, @published, @created_at, @updated_at)
  `).run({ ...post, created_at: now, updated_at: now })
}

export function updateBlogPost(id: number, post: Partial<Omit<BlogPost, 'id' | 'created_at'>>) {
  const d = getDb()
  return d.prepare(`
    UPDATE blog_posts SET title=@title, slug=@slug, content=@content, excerpt=@excerpt, category=@category, published=@published, updated_at=@updated_at
    WHERE id=@id
  `).run({ ...post, id, updated_at: Date.now() })
}

export function deleteBlogPost(id: number) {
  const d = getDb()
  return d.prepare('DELETE FROM blog_posts WHERE id = ?').run(id)
}

// ─── Admin Sessions ───────────────────────────────────────────────────────────
export function createAdminSession(token: string) {
  const d = getDb()
  return d.prepare('INSERT INTO admin_sessions (token, created_at) VALUES (?, ?)').run(token, Date.now())
}

export function validateAdminSession(token: string) {
  const d = getDb()
  const session = d.prepare('SELECT * FROM admin_sessions WHERE token = ?').get(token)
  return !!session
}

export function deleteAdminSession(token: string) {
  const d = getDb()
  return d.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token)
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
