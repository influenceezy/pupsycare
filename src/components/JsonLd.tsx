// Renders JSON-LD <script> tags for structured data (SEO)

interface OrganizationProps {
  type: 'organization'
}

interface ProductProps {
  type: 'product'
  name: string
  description: string
  image: string
  price: number
  currency?: string
  sku: string
  brand?: string
  ratingValue?: number
  reviewCount?: number
}

interface ArticleProps {
  type: 'article'
  headline: string
  description: string
  datePublished: string
  dateModified: string
  authorName?: string
}

interface BreadcrumbProps {
  type: 'breadcrumb'
  items: { name: string; url: string }[]
}

type JsonLdProps = OrganizationProps | ProductProps | ArticleProps | BreadcrumbProps

export default function JsonLd(props: JsonLdProps) {
  let data: Record<string, unknown>

  if (props.type === 'organization') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Pupsy Care India',
      alternateName: 'Pupsy',
      url: 'https://pupsycare.com',
      logo: 'https://pupsycare.com/logo.png',
      description:
        'Vet-formulated dog supplements made in India. Natural ingredients. Real results in 3–6 weeks.',
      slogan: 'Safe, Happy, Loved',
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123, 12th Cross, Indiranagar',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560038',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@pupsycare.com',
        availableLanguage: ['English', 'Hindi'],
      },
      sameAs: [
        'https://instagram.com/pupsycareindia',
      ],
    }
  } else if (props.type === 'product') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: props.name,
      description: props.description,
      image: props.image,
      sku: props.sku,
      brand: {
        '@type': 'Brand',
        name: props.brand ?? 'Pupsy Care India',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: props.currency ?? 'INR',
        price: props.price,
        availability: 'https://schema.org/InStock',
        url: `https://pupsycare.com/product/${props.sku}`,
        seller: {
          '@type': 'Organization',
          name: 'Pupsy Care India',
        },
      },
      ...(props.ratingValue && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: props.ratingValue,
          bestRating: 5,
          worstRating: 1,
          reviewCount: props.reviewCount ?? 1,
        },
      }),
    }
  } else if (props.type === 'article') {
    data = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: props.headline,
      description: props.description,
      datePublished: props.datePublished,
      dateModified: props.dateModified,
      author: {
        '@type': 'Organization',
        name: props.authorName ?? 'Pupsy Care Team',
        url: 'https://pupsycare.com/about',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Pupsy Care India',
        logo: {
          '@type': 'ImageObject',
          url: 'https://pupsycare.com/logo.png',
        },
      },
    }
  } else {
    data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: props.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
