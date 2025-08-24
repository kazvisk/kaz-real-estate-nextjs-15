'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from './AnimatedText'

export default function HeroHeader() {
  const [mounted, setMounted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const actionWords = ['buy.', 'sell.', 'invest.', 'grow.']

  useEffect(() => {
    setMounted(true)
    // Check if user is on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
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
      {/* Video Background with Poster Fallback */}
      <div className="absolute inset-0 bg-slate-800">
        {/* Background poster image - always shows */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{ 
            backgroundImage: 'url(/videos/poster.jpg)',
            minHeight: '100vh'
          }}
        />
        
        {/* Video overlay - only shows when loaded and NOT mobile */}
        {!isMobile && (
          <video 
            className="absolute inset-0 w-full h-full object-cover z-15"
            style={{ 
              opacity: videoLoaded ? 1 : 0,
              zIndex: 15
            }}
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
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 z-20" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-30 flex items-center justify-between px-8 md:px-16 py-8 text-white">
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
      <div className="absolute inset-0 flex items-center justify-center z-30 px-4">
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

      {/* Mobile-only contact buttons */}
      {isMobile && (
        <div className="absolute bottom-8 right-8 z-30 flex flex-col gap-4">
          {/* Email button */}
          <a 
            href="mailto:kaz@kazviskrealty.com"
            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
            aria-label="Email Kaz Visk Realty"
          >
            <svg 
              className="w-6 h-6 text-gray-800" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </a>

          {/* Phone button */}
          <a 
            href="tel:+14155133387"
            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300"
            aria-label="Call Kaz Visk Realty at 415-513-3387"
          >
            <svg 
              className="w-6 h-6 text-gray-800" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
          </a>
        </div>
      )}
    </section>
  )
}