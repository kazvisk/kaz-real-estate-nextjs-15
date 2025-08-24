import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Kaz Visk | Luxury San Francisco Real Estate Agent',
  description: 'Your local partner in real estate — whether you\'re moving in or moving on. Expert guidance for buying, selling, and investing in San Francisco properties.',
  keywords: 'real estate, San Francisco, buy home, sell house, property investment, real estate agent, luxury homes',
  authors: [{ name: 'Kaz Visk Realty' }],
  creator: 'Kaz Visk Realty',
  publisher: 'Kaz Visk Realty',
  robots: 'index, follow',
  openGraph: {
    title: 'Kaz Visk | Luxury San Francisco Real Estate Agent',
    description: 'Expert real estate services in San Francisco. Helping you buy, sell, invest, and grow your property portfolio.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kaz Visk Realty',
    images: [
      {
        url: '/kazviskimg.jpg',
        width: 1200,
        height: 630,
        alt: 'Kaz Visk - Luxury San Francisco Real Estate Agent'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaz Visk | Luxury San Francisco Real Estate Agent',
    description: 'Your local partner in real estate — whether you\'re moving in or moving on.',
  },
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#1e40af',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/videos/poster.jpg" />
        <link rel="preload" as="video" href="/videos/final.webm" type="video/webm" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
