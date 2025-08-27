import type { Metadata } from 'next'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Kaz Viskanta | Luxury San Francisco Real Estate Agent | Buy & Sell Homes',
  description: 'Kaz Viskanta (also known as Kaz Visk) is your trusted San Francisco real estate agent specializing in luxury homes, condos, and investment properties. Expert guidance for buying, selling, and investing in San Francisco real estate. CA DRE #02318574',
  keywords: 'Kaz Viskanta, Kaz Visk, Kaz Viskanta real estate, Kaz Visk realtor, Kaz Viskanta San Francisco, Kaz Visk San Francisco, San Francisco real estate agent, luxury homes San Francisco, buy home San Francisco, sell house San Francisco, San Francisco realtor, luxury real estate agent, San Francisco condos, San Francisco investment properties, Pacific Heights real estate, Marina District homes, Nob Hill properties, Russian Hill real estate, San Francisco luxury market, Kaz Viskanta reviews, Kaz Visk reviews, CA DRE #02318574',
  authors: [{ name: 'Kaz Viskanta', url: 'https://www.kazviskrealty.com' }],
  creator: 'Kaz Viskanta',
  publisher: 'Kaz Visk Realty',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  alternates: {
    canonical: 'https://www.kazviskrealty.com'
  },
  openGraph: {
    title: 'Kaz Viskanta | Luxury San Francisco Real Estate Agent | Buy & Sell Homes',
    description: 'Kaz Viskanta (also known as Kaz Visk) is your trusted San Francisco real estate agent specializing in luxury homes, condos, and investment properties. Expert guidance for buying, selling, and investing in San Francisco real estate.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kaz Visk Realty',
    url: 'https://www.kazviskrealty.com',
    images: [
      {
        url: 'https://www.kazviskrealty.com/kazviskimg.jpg',
        width: 1200,
        height: 630,
        alt: 'Kaz Viskanta - Luxury San Francisco Real Estate Agent',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaz Viskanta | Luxury San Francisco Real Estate Agent | Buy & Sell Homes',
    description: 'Kaz Viskanta (also known as Kaz Visk) is your trusted San Francisco real estate agent specializing in luxury homes, condos, and investment properties.',
    images: ['https://www.kazviskrealty.com/kazviskimg.jpg']
  },
  verification: {
    google: 'your-google-verification-code-here', // Add your Google Search Console verification code
  },
  category: 'Real Estate',
  classification: 'Business',
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'San Francisco',
    'geo.position': '37.7749;-122.4194',
    'ICBM': '37.7749, -122.4194'
  }
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
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://www.kazviskrealty.com/#person",
                "name": "Kaz Viskanta",
                "alternateName": ["Kaz Visk"],
                "givenName": "Kaz",
                "familyName": "Viskanta",
                "jobTitle": "Real Estate Agent",
                "description": "Luxury San Francisco real estate agent specializing in buying, selling, and investing in premium properties",
                "url": "https://www.kazviskrealty.com",
                "email": "kaz@kazviskrealty.com",
                "telephone": "+1-415-513-3387",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "San Francisco",
                  "addressRegion": "CA",
                  "addressCountry": "US"
                },
                "worksFor": {
                  "@type": "Organization",
                  "name": "Kaz Visk Realty",
                  "url": "https://www.kazviskrealty.com"
                },
                "sameAs": [
                  "https://www.linkedin.com/in/kazvisk/",
                  "https://vanguardproperties.com/agents/kaz-visk"
                ],
                "image": "https://www.kazviskrealty.com/kazviskimg.jpg"
              },
              {
                "@context": "https://schema.org",
                "@type": "RealEstateAgent",
                "@id": "https://www.kazviskrealty.com/#realestateagent",
                "name": "Kaz Viskanta",
                "alternateName": ["Kaz Visk", "Kaz Visk Realty"],
                "description": "Luxury San Francisco real estate agent specializing in buying, selling, and investing in premium properties",
                "url": "https://www.kazviskrealty.com",
                "telephone": "+1-415-513-3387",
                "email": "kaz@kazviskrealty.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "San Francisco",
                  "addressRegion": "CA",
                  "addressCountry": "US"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 37.7749,
                  "longitude": -122.4194
                },
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "San Francisco"
                  },
                  {
                    "@type": "Neighborhood",
                    "name": "Pacific Heights"
                  },
                  {
                    "@type": "Neighborhood", 
                    "name": "Marina District"
                  },
                  {
                    "@type": "Neighborhood",
                    "name": "Nob Hill"
                  },
                  {
                    "@type": "Neighborhood",
                    "name": "Russian Hill"
                  }
                ],
                "serviceArea": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.7749,
                    "longitude": -122.4194
                  },
                  "geoRadius": "50000"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Real Estate Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Buy Real Estate",
                        "description": "Expert guidance for buying luxury homes in San Francisco"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Sell Real Estate",
                        "description": "Professional marketing and sales services for San Francisco properties"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Real Estate Investment",
                        "description": "Investment property guidance and portfolio management"
                      }
                    }
                  ]
                },
                "sameAs": [
                  "https://www.linkedin.com/in/kazvisk/",
                  "https://vanguardproperties.com/agents/kaz-visk"
                ],
                "image": "https://www.kazviskrealty.com/kazviskimg.jpg",
                "logo": "https://www.kazviskrealty.com/kvlogo.svg"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.kazviskrealty.com/#website",
                "url": "https://www.kazviskrealty.com",
                "name": "Kaz Viskanta Realty",
                "alternateName": ["Kaz Visk Realty"],
                "description": "San Francisco luxury real estate services by Kaz Viskanta",
                "publisher": {
                  "@id": "https://www.kazviskrealty.com/#person"
                },
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.kazviskrealty.com/?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ]
              }
            ])
          }}
        />
        
        {/* Additional semantic markup for name variations */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.kazviskrealty.com/#organization",
              "name": "Kaz Viskanta Realty",
              "alternateName": ["Kaz Visk Realty", "KV Realty"],
              "url": "https://www.kazviskrealty.com",
              "founder": {
                "@type": "Person",
                "name": "Kaz Viskanta",
                "alternateName": "Kaz Visk"
              },
              "employee": {
                "@type": "Person",
                "name": "Kaz Viskanta", 
                "alternateName": "Kaz Visk",
                "jobTitle": "Principal Agent"
              },
              "areaServed": "San Francisco, CA",
              "description": "San Francisco luxury real estate services by Kaz Viskanta (Kaz Visk)"
            })
          }}
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
