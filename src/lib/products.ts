export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  mrp: number
  flavor: string
  format: string
  forDogs: string
  problem: string
  benefits: string[]
  ingredients: { name: string; benefit: string }[]
  feedingGuide: { weight: string; chews: string }[]
  image: string
  images: string[]
  category: string
  badge?: string
  signs: string[]
  howItWorks: { step: string; desc: string }[]
  resultsTimeline: { period: string; result: string }[]
  faqs: { q: string; a: string }[]
}

export const products: Product[] = [
  {
    id: 'happy-joints',
    slug: 'happy-joints',
    name: 'Happy Joints',
    tagline: 'Move freely. Live fully.',
    price: 899,
    mrp: 1199,
    flavor: 'Chicken',
    format: 'Soft Chews',
    forDogs: 'All sizes, especially 5+ years',
    problem: 'Joint pain, stiffness, and reduced mobility in dogs',
    category: 'Joint Health',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
      'https://images.unsplash.com/photo-1534361960057-19f4434a29d9?w=800&q=80',
    ],
    benefits: [
      'Supports healthy cartilage and joint lubrication',
      'Reduces stiffness — especially after rest',
      'Helps dogs move with more ease and comfort',
      'Anti-inflammatory support with Turmeric',
      'Results typically seen within 3–4 weeks',
      'Chicken flavour — dogs actually look forward to it',
    ],
    signs: [
      'Limping or favouring one leg',
      'Reluctant to climb stairs or jump',
      'Stiff after resting, especially in the morning',
      'Licking or chewing at their joints',
      'Slower on walks than they used to be',
      'Less playful or active overall',
    ],
    howItWorks: [
      {
        step: 'Give as a treat',
        desc: 'Give 1–4 chews daily based on your dog\'s weight. Chicken flavour means most dogs eat them eagerly — no hiding required.',
      },
      {
        step: 'Nutrients reach the joints',
        desc: 'Glucosamine, Chondroitin, and MSM absorb into the bloodstream and start rebuilding cartilage while reducing inflammation.',
      },
      {
        step: 'Watch them move freely',
        desc: 'Within 3–4 weeks you\'ll notice more ease of movement, less morning stiffness, and more enthusiasm on walks.',
      },
    ],
    resultsTimeline: [
      { period: 'Week 1–2', result: 'Supplement builds up in the system. Some dogs show early signs of more comfort and alertness.' },
      { period: 'Week 3–4', result: 'Visible reduction in stiffness. Dogs often start moving more freely and hesitate less at stairs.' },
      { period: 'Week 5–6', result: 'Full effect — improved mobility, easier movement, and noticeably more enthusiasm for walks and play.' },
    ],
    ingredients: [
      { name: 'Glucosamine HCl', benefit: 'Rebuilds cartilage and lubricates joints' },
      { name: 'Chondroitin Sulfate', benefit: 'Slows cartilage breakdown, reduces pain' },
      { name: 'MSM', benefit: 'Reduces inflammation and supports tissue repair' },
      { name: 'Turmeric Extract', benefit: 'Natural anti-inflammatory, antioxidant support' },
    ],
    feedingGuide: [
      { weight: 'Under 10 kg', chews: '1 chew daily' },
      { weight: '10–25 kg', chews: '2 chews daily' },
      { weight: '25–40 kg', chews: '3 chews daily' },
      { weight: 'Above 40 kg', chews: '4 chews daily' },
    ],
    faqs: [
      {
        q: 'Is it safe to give every day?',
        a: 'Yes. Happy Joints is formulated for daily use. All ingredients are at safe, therapeutic doses — calibrated specifically for dogs. It\'s made in a GMP-certified facility in India.',
      },
      {
        q: 'How long before I see results?',
        a: 'Most dog parents notice reduced stiffness and improved movement within 3–4 weeks of consistent daily use. For older dogs or more severe cases, allow up to 6 weeks.',
      },
      {
        q: 'My dog is a picky eater — will they eat this?',
        a: 'Happy Joints is chicken-flavoured and soft in texture, so most dogs treat it like a snack. If your dog is very picky, crumble one chew over their food for the first few days.',
      },
      {
        q: 'Can it be given alongside regular food or other medications?',
        a: 'Yes, it can be given with or without food. The ingredients are natural and generally safe alongside most medications. If your dog is on prescription drugs, check with your vet first.',
      },
      {
        q: 'What if it doesn\'t work for my dog?',
        a: 'We stand behind every purchase with a 30-day satisfaction guarantee. If you don\'t see improvement within 4 weeks of consistent use, contact us and we\'ll make it right — no questions asked.',
      },
      {
        q: 'Is this made in India?',
        a: 'Yes. Pupsy Care is proudly made in India, in GMP-certified facilities. We use globally sourced, vet-validated ingredients and keep pricing fair for Indian families.',
      },
    ],
  },
  {
    id: 'shine-coat',
    slug: 'shine-coat',
    name: 'Shine Coat',
    tagline: 'The coat they deserve.',
    price: 799,
    mrp: 999,
    flavor: 'Salmon',
    format: 'Soft Chews',
    forDogs: 'All dogs, especially during shedding season',
    problem: 'Excessive shedding, dull coat, dry or itchy skin',
    category: 'Skin & Coat',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    ],
    benefits: [
      'Visibly reduces shedding within 4–6 weeks',
      'Adds shine and lustre to dull, brittle coats',
      'Soothes dry, itchy, flaky skin from within',
      'Strengthens hair follicles to reduce breakage',
      'Salmon-flavoured — irresistible even to picky eaters',
      'Works year-round, not just during shedding season',
    ],
    signs: [
      'Hair everywhere — on clothes, sofa, and floor',
      'Coat looks dull, rough, or brittle',
      'Dry, flaky, or itchy skin',
      'Constant scratching or biting at skin',
      'Coat has lost its natural shine and softness',
      'Red or irritated skin patches',
    ],
    howItWorks: [
      {
        step: 'Give as a treat',
        desc: 'Give 1–4 chews daily based on weight. The salmon flavour makes it a treat your dog looks forward to every morning.',
      },
      {
        step: 'Nourish from the inside',
        desc: 'Omega-3, Biotin, and Zinc absorb into the bloodstream and nourish skin cells and hair follicles at the root.',
      },
      {
        step: 'See the transformation',
        desc: 'Shedding slows, itching calms, and your dog\'s coat becomes visibly softer and shinier within 4–6 weeks.',
      },
    ],
    resultsTimeline: [
      { period: 'Week 1–2', result: 'Nutrients begin nourishing skin cells and follicles. Itching and scratching may start to reduce.' },
      { period: 'Week 3–4', result: 'Noticeably less shedding. Coat starts to feel softer, less brittle, and more manageable.' },
      { period: 'Week 5–6', result: 'Full effect — coat visibly shinier, shedding under control, skin calm and itch-free.' },
    ],
    ingredients: [
      { name: 'Omega-3 (EPA & DHA)', benefit: 'Reduces skin inflammation, improves coat shine' },
      { name: 'Omega-6', benefit: 'Supports skin barrier and moisture retention' },
      { name: 'Biotin', benefit: 'Strengthens hair follicles and promotes growth' },
      { name: 'Zinc', benefit: 'Reduces shedding, supports healthy skin cell renewal' },
    ],
    feedingGuide: [
      { weight: 'Under 10 kg', chews: '1 chew daily' },
      { weight: '10–25 kg', chews: '2 chews daily' },
      { weight: '25–40 kg', chews: '3 chews daily' },
      { weight: 'Above 40 kg', chews: '4 chews daily' },
    ],
    faqs: [
      {
        q: 'How long until the shedding reduces?',
        a: 'Most dogs show noticeably less shedding and improved coat shine by week 4–6 of daily use. Skin health improves from the inside out, so consistency is key.',
      },
      {
        q: 'My dog scratches constantly. Will this actually help?',
        a: 'Yes — Omega-3 and Zinc in Shine Coat specifically target skin inflammation and dryness, which are the root causes of itching and scratching. It addresses the problem at the source, not just the surface.',
      },
      {
        q: 'Is it safe for puppies?',
        a: 'Shine Coat is formulated for dogs 6 months and older. For puppies under 6 months, consult your vet before starting any supplement.',
      },
      {
        q: 'Can I give it alongside other medications?',
        a: 'The ingredients are natural and generally safe alongside most medications. However, if your dog is on blood thinners or has a specific health condition, check with your vet first.',
      },
      {
        q: 'What if my dog doesn\'t like salmon flavour?',
        a: 'Most dogs love salmon, but if yours is hesitant, crumble one chew over their regular food for the first week. After a few days, they usually start eating it straight.',
      },
      {
        q: 'What does the 30-day guarantee mean?',
        a: 'Simple: if you don\'t see visible improvement in your dog\'s coat and skin within 30 days of consistent use, contact us for a full refund. No receipts, no forms, no hassle.',
      },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getOtherProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug !== slug)
}
