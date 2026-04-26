import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TrackPageView from '@/components/TrackPageView'
import MetaPixel from '@/components/MetaPixel'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pupsycare.com'),
  title: {
    default: 'Pupsy Care India — Safe, Happy, Loved',
    template: '%s | Pupsy Care India',
  },
  description:
    'Vet-formulated dog supplements made in India. Happy Joints chews for mobility & joint relief. Shine Coat chews for a lustrous, itch-free coat. Natural ingredients, real results.',
  keywords: [
    'dog supplements India',
    'dog joint supplement',
    'dog coat supplement',
    'glucosamine for dogs India',
    'omega 3 for dogs India',
    'dog health supplements',
    'pet supplements India',
    'pupsy care',
    'dog chews India',
    'vet formulated dog supplements',
  ],
  authors: [{ name: 'Pupsy Care India', url: 'https://pupsycare.com' }],
  creator: 'Pupsy Care India',
  publisher: 'Pupsy Care India',
  category: 'Pet Health',
  alternates: {
    canonical: 'https://pupsycare.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://pupsycare.com',
    siteName: 'Pupsy Care India',
    title: 'Pupsy Care India — Safe, Happy, Loved',
    description:
      'Vet-formulated dog supplements made in India. Happy Joints for mobility, Shine Coat for a lustrous coat. Natural ingredients, real results.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pupsy Care India — Premium Dog Supplements',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pupsycareindia',
    creator: '@pupsycareindia',
    title: 'Pupsy Care India — Safe, Happy, Loved',
    description:
      'Vet-formulated dog supplements made in India. Natural ingredients. Real results in 3–6 weeks.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    // google: 'your-google-site-verification-token',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-warm-white text-text antialiased">
        <MetaPixel />
        <TrackPageView />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
