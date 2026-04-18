'use client'

import HeroHeader from '@/components/HeroHeader'
import MeetKazSection from '@/components/MeetKazSection'
import NotableSalesSection from '@/components/NotableSalesSection'
import WhyWorkWithMeSection from '@/components/WhyWorkWithMeSection'
import MarketInsightsSection from '@/components/MarketInsightsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#0a0d14' }}>
      <HeroHeader />
      <MeetKazSection />
      <NotableSalesSection />
      <WhyWorkWithMeSection />
      <MarketInsightsSection />
      <ContactSection />
    </main>
  )
}

