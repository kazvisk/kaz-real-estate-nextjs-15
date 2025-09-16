import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Kaz Viskanta | San Francisco Real Estate Agent | Background & Experience',
  description: 'Learn about Kaz Viskanta (also known as Kaz Visk), your trusted San Francisco real estate agent. Discover his background, experience, and approach to helping clients buy and sell luxury homes in SF.',
  keywords: 'About Kaz Viskanta, Kaz Visk background, San Francisco realtor experience, luxury real estate agent bio, Kaz Viskanta story, CA DRE #02318574',
  openGraph: {
    title: 'About Kaz Viskanta | San Francisco Real Estate Agent',
    description: 'Learn about Kaz Viskanta (also known as Kaz Visk), your trusted San Francisco real estate agent specializing in luxury homes.',
    url: 'https://www.kazviskrealty.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.kazviskrealty.com/about'
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}