export interface Pack {
  chews: number
  price: number
  mrp: number
  badge?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  mrp: number
  packs: Pack[]
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
    packs: [
      { chews: 30, price: 899, mrp: 1199 },
      { chews: 60, price: 1699, mrp: 2399, badge: 'Most Popular' },
      { chews: 90, price: 2349, mrp: 3399, badge: 'Best Value' },
    ],
    flavor: 'Chicken',
    format: 'Soft Chews',
    forDogs: 'All sizes, especially 5+ years',
    problem: 'Joint pain, stiffness, and reduced mobility in dogs',
    category: 'Joint Health',
    badge: 'Best Seller',
    image: '/products/happy-joints/1.png',
    images: [
      '/products/happy-joints/1.png',
      '/products/happy-joints/2.png',
      '/products/happy-joints/3.png',
      '/products/happy-joints/4.png',
      '/products/happy-joints/5.png',
      '/products/happy-joints/6.png',
      '/products/happy-joints/7.png',
    ],
    benefits: [
      'Maintains bone strength and density',
      'Reduces joint inflammation and pain',
      'Slows arthritis onset with Chondroitin & Collagen',
      'Helps relieve hip dysplasia symptoms',
      'Supports cartilage rebuilding with Glucosamine & MSM',
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
      { name: 'Collagen Peptide (Bovine)', benefit: 'Primary structural protein for cartilage and joint health' },
      { name: 'Glucosamine HCl', benefit: 'Increases cartilage production and joint fluid' },
      { name: 'Chondroitin Sulfate', benefit: 'Protects cartilage from breakdown, reduces pain' },
      { name: 'MSM', benefit: 'Reduces joint pain and inflammation, supports tissue repair' },
      { name: 'Fish Oil (EPA & DHA)', benefit: 'Reduces joint pain, tenderness and inflammation' },
      { name: 'Calcium', benefit: 'Strengthens bones and supports skeletal structure' },
      { name: 'Cissus Quadrangularis', benefit: 'Supports bone healing and recovery' },
      { name: 'Hyaluronic Acid', benefit: 'Lubricates joints and retains moisture in connective tissue' },
      { name: 'Green-Lipped Mussel Extract', benefit: 'Natural source of joint-supporting omega fatty acids' },
      { name: 'Shallaki (Boswellia Serrata)', benefit: 'Reduces joint inflammation and stiffness' },
      { name: 'Turmeric', benefit: 'Natural anti-inflammatory and antioxidant' },
      { name: 'Astaxanthin', benefit: 'Powerful antioxidant that protects joint tissue' },
      { name: 'Eggshell Powder', benefit: 'Natural source of calcium and collagen' },
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
    packs: [
      { chews: 30, price: 799, mrp: 999 },
      { chews: 60, price: 1499, mrp: 1999, badge: 'Most Popular' },
      { chews: 90, price: 2099, mrp: 2799, badge: 'Best Value' },
    ],
    flavor: 'Chicken',
    format: 'Soft Chews',
    forDogs: 'All dogs, especially during shedding season',
    problem: 'Excessive shedding, dull coat, dry or itchy skin',
    category: 'Skin & Coat',
    image: '/products/shine-coat/1.png',
    images: [
      '/products/shine-coat/1.png',
      '/products/shine-coat/2.png',
      '/products/shine-coat/3.png',
      '/products/shine-coat/4.png',
      '/products/shine-coat/5.png',
      '/products/shine-coat/6.png',
    ],
    benefits: [
      'Maintains fur quality and coat shine',
      'Reduces dry and itchy skin from within',
      'Minimizes excessive shedding',
      'Helps relieve inflamed and irritated skin',
      'Strengthens hair follicles with Biotin & Collagen',
      'Chicken flavour — irresistible even to picky eaters',
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
        desc: 'Give 1–4 chews daily based on weight. The chicken flavour makes it a treat your dog looks forward to every morning.',
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
      { period: 'Month 1', result: 'Foundation-laying phase. Nutrients absorb and begin nourishing skin cells and follicles from within.' },
      { period: 'Months 2–3', result: 'Noticeable reduction in shedding. Coat becomes softer and more manageable.' },
      { period: 'Months 4–5', result: 'Increased coat shine and skin moisture. Itching and dryness visibly reduced.' },
      { period: 'Month 6+', result: 'Consistent healthy fur and skin. Reduced chances of allergic reactions and flare-ups.' },
    ],
    ingredients: [
      { name: 'Collagen Peptide (Bovine)', benefit: 'Primary protein for skin, coat, and nail enhancement' },
      { name: 'Fish Oil (EPA & DHA)', benefit: 'Promotes silky coat, reduces itching and flakiness' },
      { name: 'Biotin', benefit: 'Adds shine and supports moisturized, healthy skin' },
      { name: 'Zinc', benefit: 'Promotes skin health and cell growth' },
      { name: 'Selenium', benefit: 'Reduces shedding and promotes healthier hair growth' },
      { name: 'Hyaluronic Acid', benefit: 'Retains skin moisture, reduces dryness and itching' },
      { name: 'Aloe Barbadensis Extract', benefit: 'Anti-bacterial, soothes irritated and inflamed skin' },
      { name: 'Turmeric', benefit: 'Antioxidant supporting a healthy coat' },
      { name: 'Astaxanthin', benefit: 'Combats free radicals, improves skin elasticity' },
      { name: 'Flaxseed Powder', benefit: 'Reduces skin inflammation, supports hydration' },
      { name: 'Hempseed Powder', benefit: 'Reduces shedding and maintains coat health' },
      { name: 'Vitamins A, D & E', benefit: 'Support collagen formation for skin and hair development' },
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
        a: 'Shine Coat is formulated for dogs 4 months (16 weeks) and older. For puppies under 4 months, consult your vet before starting any supplement.',
      },
      {
        q: 'Can I give it alongside other medications?',
        a: 'The ingredients are natural and generally safe alongside most medications. However, if your dog is on blood thinners or has a specific health condition, check with your vet first.',
      },
      {
        q: 'What if my dog is hesitant about the chews?',
        a: 'Most dogs take to the chicken-flavoured chews immediately, but if yours is hesitant, crumble one chew over their regular food for the first week. After a few days, they usually start eating it straight.',
      },
      {
        q: 'What does the 30-day guarantee mean?',
        a: 'Simple: if you don\'t see visible improvement in your dog\'s coat and skin within 30 days of consistent use, contact us for a full refund. No receipts, no forms, no hassle.',
      },
    ],
  },
  {
    id: 'gut-health',
    slug: 'gut-health',
    name: 'Pupsy Happy Tummy Probiotic',
    tagline: 'Good gut, happy dog.',
    price: 849,
    mrp: 1099,
    packs: [
      { chews: 30, price: 849, mrp: 1099 },
      { chews: 60, price: 1599, mrp: 2199, badge: 'Most Popular' },
      { chews: 90, price: 2199, mrp: 2999, badge: 'Best Value' },
    ],
    flavor: 'Chicken',
    format: 'Soft Chews',
    forDogs: 'All dogs, especially sensitive stomachs',
    problem: 'Loose stools, digestive discomfort, and gut-driven skin issues',
    category: 'Gut Health',
    badge: 'New',
    image: '/products/gut-health/1.png',
    images: [
      '/products/gut-health/1.png',
      '/products/gut-health/2.png',
      '/products/gut-health/3.png',
      '/products/gut-health/4.png',
      '/products/gut-health/5.png',
      '/products/gut-health/6.png',
    ],
    benefits: [
      'Fixes loose stools and irregular digestion',
      'Reduces paw licking and skin irritation caused by gut imbalance',
      'Builds gut-driven immunity against seasonal allergies',
      'Improves energy and coat appearance over time',
      '14 probiotic strains + prebiotics + digestive enzymes',
      'Chicken flavour — dogs treat it like a snack',
    ],
    signs: [
      'Loose stools or inconsistent digestion',
      'Eating grass or scooting frequently',
      'Constant paw licking or scratching',
      'Dull coat or flaky skin despite regular grooming',
      'Low energy or sluggishness after meals',
      'Seasonal allergies and recurring skin flare-ups',
    ],
    howItWorks: [
      {
        step: 'Give daily with food',
        desc: 'One soft chew during or after a meal. The chicken flavour makes it effortless — just hand it over like a treat.',
      },
      {
        step: 'Probiotics colonise the gut',
        desc: '14 strains of live probiotics and prebiotics work together to balance gut flora and improve digestion from within.',
      },
      {
        step: 'Health radiates outward',
        desc: 'Better gut means calmer skin, firmer stools, stronger immunity — and a visibly happier, more energetic dog.',
      },
    ],
    resultsTimeline: [
      { period: 'Week 2', result: 'Stools become more consistent and firm. Digestive discomfort begins to ease.' },
      { period: 'Week 4', result: 'Reduced paw licking and itching. Less skin irritation driven by gut inflammation.' },
      { period: 'Week 6+', result: 'Improved coat condition and energy levels. Stronger immunity and fewer allergy flare-ups.' },
    ],
    ingredients: [
      { name: '14-Strain Probiotic Blend', benefit: 'Balances gut flora, supports digestion and immunity' },
      { name: 'Prebiotics (FOS + Inulin)', benefit: 'Feeds good bacteria, supports nutrient absorption and stool consistency' },
      { name: 'Digestive Enzyme Blend', benefit: 'Improves nutrient utilisation and reduces bloating' },
      { name: 'Chicory Root', benefit: 'Prebiotic fibre that promotes healthy bowel movement' },
      { name: 'Papaya Powder', benefit: 'Supports gastrointestinal wellness and digestion' },
      { name: 'Ginger', benefit: 'Anti-inflammatory, aids digestion and soothes the gut lining' },
      { name: 'Pumpkin', benefit: 'Soothes the digestive tract, supports stool quality' },
      { name: 'Fennel & Ajowan Seeds', benefit: 'Reduces bloating and flatulence, promotes gut comfort' },
    ],
    feedingGuide: [
      { weight: 'All sizes', chews: '1 chew daily with or after food' },
    ],
    faqs: [
      {
        q: 'How quickly will I see results?',
        a: 'Most dog parents notice firmer stools within 1–2 weeks of daily use. Reduced paw licking and skin irritation typically follow by week 4. For full gut-to-coat results, consistent use for 6+ weeks is recommended.',
      },
      {
        q: 'Can I give this to a puppy?',
        a: 'Pupsy Happy Tummy Probiotic is suitable for dogs 4 months (16 weeks) and older. For younger puppies, check with your vet first.',
      },
      {
        q: 'My dog already eats probiotic yogurt. Is this different?',
        a: 'Yes — significantly. Pupsy Happy Tummy Probiotic contains 14 scientifically selected probiotic strains, complemented by prebiotics and digestive enzymes, all at therapeutic doses formulated specifically for dogs. Yogurt alone doesn\'t come close.',
      },
      {
        q: 'Can I use this alongside Happy Joints or Shine Coat?',
        a: 'Absolutely. All three formulas target different systems and are safe in combination. Pupsy Happy Tummy Probiotic pairs especially well with Shine Coat, since gut health and coat health are closely linked.',
      },
      {
        q: 'My dog has a very sensitive stomach. Is this safe to start?',
        a: 'Yes — Pupsy Happy Tummy Probiotic is formulated for sensitive digestion. All ingredients are natural and gentle. If your dog is especially sensitive, start with half a chew for the first 3–4 days before moving to a full chew.',
      },
      {
        q: 'Is it made in India?',
        a: 'Yes. Made in GMP-certified facilities in India, with globally sourced, vet-validated ingredients. No artificial preservatives, MSG, or fillers.',
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
