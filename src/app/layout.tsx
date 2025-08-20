import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KAZVIS REALTY - Luxury Real Estate San Francisco',
  description: 'Extraordinary living begins here. Timeless architecture, exclusive locations, and unparalleled luxury in San Francisco real estate.',
  keywords: 'luxury real estate, San Francisco, premium properties, high-end homes',
  openGraph: {
    title: 'KAZVIS REALTY - Luxury Real Estate San Francisco',
    description: 'Extraordinary living begins here. Timeless architecture, exclusive locations, and unparalleled luxury.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
