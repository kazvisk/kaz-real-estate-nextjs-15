'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/headerbackground.jpg"
          alt="San Francisco Skyline"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 text-white font-bold mb-4">
            <img 
              src="/kvlogo.svg" 
              alt="Kaz Visk Realty Logo" 
              className="h-16 w-auto"
            />
            <div className="flex flex-col text-center">
              <span className="text-2xl leading-tight">Kaz Visk</span>
              <span className="text-xl leading-tight">Realty</span>
            </div>
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold text-white/10 select-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
            This Page Got a Better Offer Elsewhere
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            The page you're looking for seems to have moved on to new opportunities. 
            But don't worry - I'm here to help you find exactly what you're looking for.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Link
            href="/"
            className="px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white text-white font-medium rounded-lg hover:bg-white/15 hover:backdrop-blur-2xl hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Return Home
          </Link>
          <a
            href="mailto:kaz@kazviskrealty.com?subject=Help Finding a Page&body=Hi Kaz, I was looking for a page on your site but got a 404 error. Can you help me find what I'm looking for?"
            className="px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white text-white font-medium rounded-lg hover:bg-white/15 hover:backdrop-blur-2xl hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Get Help
          </a>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-400"
        >
          <p className="mb-2">Need immediate assistance?</p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="tel:+14155133387"
              className="flex items-center gap-2 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (415) 513-3387
            </a>
            <a
              href="mailto:kaz@kazviskrealty.com"
              className="flex items-center gap-2 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              kaz@kazviskrealty.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
