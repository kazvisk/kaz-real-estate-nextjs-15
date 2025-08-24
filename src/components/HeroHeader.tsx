'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from './AnimatedText'

export default function HeroHeader() {
  const [mounted, setMounted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLightBackground, setIsLightBackground] = useState(false)
  
  const actionWords = ['buy.', 'sell.', 'invest.', 'grow.']

  useEffect(() => {
    setMounted(true)
    // Check if user is on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    // Check background lightness based on scroll position
    const checkBackground = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      // If scrolled past hero section, background is light
      setIsLightBackground(scrollY > heroHeight * 0.8)
    }
    
    checkMobile()
    checkBackground()
    
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', checkBackground)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', checkBackground)
    }
  }, [])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  if (!mounted) return null

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{
        fontFamily: 'Manrope, sans-serif',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh'
      }}
    >
      {/* Video Background with Poster Fallback */}
      <div className="absolute inset-0 bg-slate-800">
        {/* Background poster image - always shows */}
        <div className="absolute inset-0 z-10">
          <img 
            src="/videos/poster.jpg"
            alt="Kaz Visk Realty Background"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            onError={(e) => {
              console.log('Poster image failed to load:', e);
              // Fallback to WebP if JPG fails
              e.currentTarget.src = '/videos/poster.webp';
            }}
          />
        </div>
        
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
      <nav className="relative z-40 flex items-center justify-between px-8 md:px-16 py-8 text-white">
        {/* Logo */}
        <div className="flex items-center gap-4 text-white font-bold">
          <img 
            src="/kvlogo.svg" 
            alt="Kaz Visk Realty Logo" 
            className="h-16 w-auto"
          />
        </div>

        {/* Navigation Menu - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-12">
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=About Kaz Visk Realty&body=Hi Kaz, I'd like to learn more about your services."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            ABOUT
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=Looking to Buy in San Francisco&body=Hi Kaz, I'm interested in buying a property in San Francisco. Please contact me."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            BUY
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=Looking to Sell in San Francisco&body=Hi Kaz, I'm interested in selling my property in San Francisco. Please contact me."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            SELL
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=San Francisco Neighborhoods&body=Hi Kaz, I'd like to learn more about San Francisco neighborhoods and areas."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            NEIGHBORHOODS
          </a>
          <a 
            href="mailto:kaz@kazviskrealty.com?subject=Contact Kaz Visk Realty&body=Hi Kaz, I'd like to get in touch about your real estate services."
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            CONTACT
          </a>
        </div>

        {/* Menu Toggle */}
        <button className="text-white font-normal hover:opacity-75 transition-opacity duration-300" style={{ fontSize: '0.95rem' }}>
          MENU ☰
        </button>
      </nav>

      {/* Main Content - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-30 px-4">
        <div className="text-center max-w-6xl mx-auto w-full">
          {/* Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white font-medium mb-8 break-words"
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
            className="text-white font-normal max-w-4xl mx-auto mb-12 px-4"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <a 
              href="mailto:kaz@kazviskrealty.com?subject=Looking to Buy in San Francisco&body=Hi Kaz, I'm interested in buying a property in San Francisco. Please contact me to discuss my needs and how you can help me find the perfect home."
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white text-white font-medium rounded-lg hover:bg-white/15 hover:backdrop-blur-xl hover:border-white/40 transition-all duration-300 shadow-sm hover:shadow-xl"
              aria-label="Find properties to buy"
            >
              Looking to Buy
            </a>
            <a 
              href="mailto:kaz@kazviskrealty.com?subject=Looking to Sell in San Francisco&body=Hi Kaz, I'm interested in selling my property in San Francisco. Please contact me to discuss how you can help me get the best value for my home."
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white text-white font-medium rounded-lg hover:bg-white/15 hover:backdrop-blur-xl hover:border-white/40 transition-all duration-300 shadow-sm hover:shadow-xl"
              aria-label="Sell your property"
            >
              Looking to Sell
            </a>
          </motion.div>
        </div>
      </div>

      {/* Mobile-only contact buttons */}
      {isMobile && (
        <div className="fixed bottom-8 right-8 z-30 flex flex-col gap-4">
          {/* Email button */}
          <a 
            href="mailto:kaz@kazviskrealty.com"
            className="w-14 h-14 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
            style={{
              backgroundColor: isLightBackground 
                ? 'rgba(148, 148, 153, 0.15)'  // #949499 with 15% opacity
                : 'rgba(255, 255, 255, 0.1)',  // White with 10% opacity
              borderColor: isLightBackground 
                ? 'rgba(148, 148, 153, 0.25)'  // #949499 with 25% opacity
                : 'rgba(255, 255, 255, 0.3)',  // White with 30% opacity
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            onMouseEnter={(e) => {
              if (isLightBackground) {
                e.currentTarget.style.backgroundColor = 'rgba(148, 148, 153, 0.25)'
                e.currentTarget.style.borderColor = 'rgba(148, 148, 153, 0.35)'
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (isLightBackground) {
                e.currentTarget.style.backgroundColor = 'rgba(148, 148, 153, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(148, 148, 153, 0.25)'
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }
            }}
            aria-label="Email Kaz Visk Realty"
          >
            <svg 
              className="w-6 h-6 drop-shadow-lg"
              style={{ color: isLightBackground ? '#949499' : 'white' }}
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
            className="w-14 h-14 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
            style={{
              backgroundColor: isLightBackground 
                ? 'rgba(148, 148, 153, 0.15)'  // #949499 with 15% opacity
                : 'rgba(255, 255, 255, 0.1)',  // White with 10% opacity
              borderColor: isLightBackground 
                ? 'rgba(148, 148, 153, 0.25)'  // #949499 with 25% opacity
                : 'rgba(255, 255, 255, 0.3)',  // White with 30% opacity
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            onMouseEnter={(e) => {
              if (isLightBackground) {
                e.currentTarget.style.backgroundColor = 'rgba(148, 148, 153, 0.25)'
                e.currentTarget.style.borderColor = 'rgba(148, 148, 153, 0.35)'
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (isLightBackground) {
                e.currentTarget.style.backgroundColor = 'rgba(148, 148, 153, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(148, 148, 153, 0.25)'
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }
            }}
            aria-label="Call Kaz Visk Realty at 415-513-3387"
          >
            <svg 
              className="w-6 h-6 drop-shadow-lg"
              style={{ color: isLightBackground ? '#949499' : 'white' }}
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