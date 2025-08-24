import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'KAZVISK REALTY - Luxury Real Estate San Francisco',
  description: 'Your local partner in real estate — whether you\'re moving in or moving on. Expert guidance for buying, selling, and investing in San Francisco properties.',
  keywords: 'real estate, San Francisco, buy home, sell house, property investment, real estate agent, luxury homes',
  authors: [{ name: 'Kazvisk Realty' }],
  creator: 'Kazvisk Realty',
  publisher: 'Kazvisk Realty',
  robots: 'index, follow',
  openGraph: {
    title: 'KAZVISK REALTY - Your San Francisco Real Estate Partner',
    description: 'Expert real estate services in San Francisco. Helping you buy, sell, invest, and grow your property portfolio.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kazvisk Realty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAZVISK REALTY - San Francisco Real Estate',
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
      </head>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
