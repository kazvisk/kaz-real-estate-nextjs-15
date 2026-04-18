'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function FlipWord({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words, interval])

  return (
    <span className="inline-block relative" style={{ minWidth: '4ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '60%', opacity: 0, rotateX: -40 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-60%', opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ transformOrigin: 'center', display: 'inline-block' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function SearchPage() {
  return (
    <main
      className="min-h-screen w-full overflow-x-hidden flex flex-col"
      style={{ fontFamily: 'Manrope, sans-serif', background: '#0a0d14' }}
    >
      {/* Navigation */}
      <nav className="relative z-40 flex items-center justify-between px-8 md:px-16 py-8 text-white bg-[#0a0d14]">
        <div className="flex items-center gap-4 text-white font-bold">
          <a href="/"><img src="/kvlogo.svg" alt="Kaz Viskanta Realty Logo" className="h-16 w-auto" /></a>
        </div>

        <div className="hidden md:flex items-center gap-12">
          <a href="/about" className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" style={{ fontSize: '0.95rem' }}>ABOUT</a>
          <a href="/search" className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" style={{ fontSize: '0.95rem' }}>SEARCH</a>
          <a href="mailto:kaz@kazviskrealty.com?subject=Looking to Buy in San Francisco&body=Hi Kaz, I'm interested in buying a property in San Francisco. Please contact me." className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" style={{ fontSize: '0.95rem' }}>BUY</a>
          <a href="mailto:kaz@kazviskrealty.com?subject=Looking to Sell in San Francisco&body=Hi Kaz, I'm interested in selling my property in San Francisco. Please contact me." className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" style={{ fontSize: '0.95rem' }}>SELL</a>
          <a href="mailto:kaz@kazviskrealty.com?subject=San Francisco Neighborhoods&body=Hi Kaz, I'd like to learn more about San Francisco neighborhoods and areas." className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" style={{ fontSize: '0.95rem' }}>NEIGHBORHOODS</a>
          <a href="mailto:kaz@kazviskrealty.com?subject=Contact Kaz Visk Realty&body=Hi Kaz, I'd like to get in touch about your real estate services." className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" style={{ fontSize: '0.95rem' }}>CONTACT</a>
        </div>

        <button className="text-white font-normal hover:opacity-75 transition-opacity duration-300" style={{ fontSize: '0.95rem' }}>
          MENU ☰
        </button>
      </nav>

      {/* Header */}
      <div className="px-8 md:px-16 pt-12 pb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}
        >
          Property Search
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white font-medium whitespace-nowrap"
          style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 3.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: '1.15',
            overflow: 'hidden',
          }}
        >
          Find your{' '}
          <FlipWord
            words={['home.', 'condo.', 'apartment.', 'loft.', 'townhouse.', 'investment.', 'penthouse.', 'Victorian.', 'Edwardian.']}
            interval={2600}
          />
        </motion.h1>
      </div>

      {/* iframe — fills all remaining height */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="flex-1 mx-8 md:mx-16 mb-8 rounded-2xl overflow-hidden"
        style={{
          minHeight: '88vh',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 64px -12px rgba(0,0,0,0.6)',
        }}
      >
        <iframe
          src="https://kaz.realscout.com/homesearch/map"
          width="100%"
          height="100%"
          style={{ border: 'none', minHeight: '88vh', display: 'block' }}
          allow="geolocation"
          title="San Francisco Property Search"
        />
      </motion.div>

      {/* Bottom action bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mx-8 md:mx-16 mb-10 px-10 py-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: off-market hint */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-white opacity-30 shrink-0" />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
            Not every listing makes it online —{' '}
            <a
              href="mailto:kaz@kazviskrealty.com?subject=Off-Market Opportunities&body=Hi Kaz, I'm interested in learning about off-market properties. Please reach out."
              className="text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-all duration-200 font-medium"
            >
              inquire privately
            </a>
          </p>
        </div>

        {/* Right: direct contact */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:kaz@kazviskrealty.com?subject=I found a listing I'm interested in"
            className="px-7 py-3.5 rounded-full font-semibold transition-opacity duration-200 hover:opacity-85"
            style={{ background: '#ffffff', color: '#000000', letterSpacing: '0.04em', fontSize: '0.9rem' }}
          >
            EMAIL KAZ
          </a>
          <a
            href="tel:+14155133387"
            className="px-7 py-3.5 rounded-full font-semibold transition-all duration-200"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.18)',
              letterSpacing: '0.04em',
              fontSize: '0.9rem',
            }}
          >
            415-513-3387
          </a>
        </div>
      </motion.div>
    </main>
  )
}
