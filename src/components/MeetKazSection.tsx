'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MeetKazSection() {
  return (
    <section 
      className="py-20 px-6 md:px-16" 
      style={{ backgroundColor: '#131925' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0">
              <Image
                src="/headshot.jpg"
                alt="Kaz Visk - San Francisco Real Estate Agent"
                fill
                className="object-cover rounded-2xl shadow-xl"
                priority
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:pl-8 flex flex-col justify-center min-h-full"
          >
            {/* Section Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-medium text-white mb-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Meet Kaz
            </motion.h2>

            {/* Professional Credentials */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg text-gray-400 mb-8 font-medium whitespace-nowrap"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              San Francisco REALTOR® — CA DRE #02318574
            </motion.p>

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg text-gray-300 mb-6 leading-relaxed"
            >
              I'm Kaz Visk, a San Francisco real estate agent passionate about helping people find their place in this city. Whether you're buying your first home, upgrading your space, or moving on to new opportunities, I guide you through the process with transparency, strategy, and care.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              As your local partner, I bring market knowledge, negotiation skills, and a modern approach to real estate—so you feel confident every step of the way.
            </motion.p>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              {/* Learn More Button */}
              <a
                href="#"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium rounded-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-xl"
              >
                Learn More
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </a>

              {/* Contact Icons */}
              <div className="flex gap-3">
                {/* Email Icon */}
                <a
                  href="mailto:kaz@kazviskrealty.com"
                  className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                  aria-label="Email Kaz Visk"
                >
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>

                {/* Phone Icon */}
                <a
                  href="tel:+14155133387"
                  className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                  aria-label="Call Kaz Visk"
                >
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>

                {/* LinkedIn Icon */}
                <a
                  href="https://www.linkedin.com/in/kazvisk/"
                  className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Website Icon */}
                <a
                  href="https://vanguardproperties.com/agents/kaz-visk"
                  className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                  aria-label="Vanguard Properties"
                >
                  <img 
                    src="/favicon/favicon.ico" 
                    alt="Website" 
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}