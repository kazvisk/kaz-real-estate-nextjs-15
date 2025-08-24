'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from './AnimatedText'

export default function HeroHeader() {
  const [mounted, setMounted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  
  const actionWords = ['buy.', 'sell.', 'invest.', 'grow.']

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  if (!mounted) return null

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      style={{
        fontFamily: 'Manrope, sans-serif'
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          className="w-full h-full object-cover"
          poster="/videos/poster.jpg"
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
        >
          <source 
            src="/videos/final.webm" 
            type="video/webm" 
          />
          <source 
            src="/videos/final.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-8 text-white">
        {/* Logo */}
        <div className="text-white font-medium text-lg">
          KAZ VISK REALTY
        </div>

        {/* Navigation Menu - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-12">
          <a href="#" className="font-normal hover:opacity-75 transition-opacity duration-300" style={{ fontSize: '0.95rem' }}>
            WHO ARE WE?
          </a>
          <a href="#" className="font-normal hover:opacity-75 transition-opacity duration-300" style={{ fontSize: '0.95rem' }}>
            OUR PORTFOLIO
          </a>
          <a href="#" className="font-normal hover:opacity-75 transition-opacity duration-300" style={{ fontSize: '0.95rem' }}>
            CONNECT WITH US
          </a>
        </div>

        {/* Menu Toggle */}
        <button className="text-white font-normal hover:opacity-75 transition-opacity duration-300" style={{ fontSize: '0.95rem' }}>
          MENU ☰
        </button>
      </nav>

      {/* Main Content - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white font-medium mb-8 whitespace-nowrap"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 7rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            Helping you{' '}
            <AnimatedText 
              words={actionWords}
              className="text-white"
              typeSpeed={120}
              deleteSpeed={60}
              pauseTime={2000}
            />
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white font-normal max-w-4xl mx-auto mb-12"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              lineHeight: '1.6',
              opacity: '0.95'
            }}
          >
            Your local partner in real estate — whether you're moving in or moving on.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              className="px-8 py-4 border-2 border-white bg-transparent text-white font-medium rounded hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Find properties to buy"
            >
              Looking to Buy
            </button>
            <button 
              className="px-8 py-4 border-2 border-white bg-transparent text-white font-medium rounded hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Sell your property"
            >
              Looking to Sell
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}