'use client'

import { motion } from 'framer-motion'

export default function NickBalls() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="relative z-40 flex items-center justify-between px-8 md:px-16 py-8 text-white bg-[#131925]">
        {/* Logo */}
        <div className="flex items-center gap-4 text-white font-bold">
          <a href="/">
            <img 
              src="/kvlogo.svg" 
              alt="Kaz Viskanta Realty Logo" 
              className="h-16 w-auto"
            />
          </a>
        </div>

        {/* Navigation Menu - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-12">
          <a 
            href="/"
            className="font-medium hover:opacity-75 transition-opacity duration-300 cursor-pointer" 
            style={{ fontSize: '0.95rem' }}
          >
            HOME
          </a>
          <a 
            href="/about"
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
            href="mailto:kaz@kazviskrealty.com?subject=Contact Kaz Viskanta&body=Hi Kaz, I'd like to get in touch about your real estate services."
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

      {/* Hero Section */}
      <section 
        className="py-20 px-6 md:px-16" 
        style={{ backgroundColor: '#131925' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 
              className="text-5xl md:text-6xl font-medium text-white mb-4"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Nick Balls
            </h1>
            <p 
              className="text-lg text-gray-400 font-medium"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Google Maps
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Maps Iframe Section */}
      <section 
        className="py-8 px-6 md:px-16 pb-20" 
        style={{ backgroundColor: '#131925' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ minHeight: '600px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509037!2d-122.41941558468145!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              className="w-full h-full"
              style={{ 
                minHeight: '600px',
                border: 'none'
              }}
              title="Google Maps"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </main>
  )
}

