'use client'

import HeroHeader from '@/components/HeroHeader'
import MeetKazSection from '@/components/MeetKazSection'

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroHeader />
      <MeetKazSection />
    </main>
  )
}

