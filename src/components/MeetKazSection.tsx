'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MeetKazSection() {
  return (
    <section
      id="meet-kaz"
      className="py-28 px-6 md:px-16"
      style={{ backgroundColor: '#0a0d14', fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase mb-10"
          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}
        >
          About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0">
              <Image
                src="/headshot.jpg"
                alt="Kaz Viskanta - San Francisco Real Estate Agent"
                fill
                className="object-cover rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                priority
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h2
              className="text-white font-medium mb-2"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              Kaz Viskanta
            </h2>

            <p
              className="font-medium mb-8"
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              San Francisco REALTOR® &mdash; CA DRE #02318574
            </p>

            <p
              className="mb-5 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.125rem', lineHeight: '1.8' }}
            >
              I&apos;m Kaz Viskanta, a San Francisco real estate agent passionate about
              helping people find their place in this city. Whether you&apos;re buying
              your first home, upgrading your space, or moving on to new
              opportunities, I guide you through the process with transparency,
              strategy, and care.
            </p>

            <p
              className="mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.125rem', lineHeight: '1.8' }}
            >
              As your local partner, I bring market knowledge, negotiation
              skills, and a modern approach to real estate — so you feel
              confident every step of the way.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 font-medium rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              >
                About Me
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <div className="flex gap-3">
                {/* Email */}
                <a
                  href="mailto:kaz@kazviskrealty.com"
                  aria-label="Email Kaz Viskanta"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                {/* Phone */}
                <a
                  href="tel:+14155133387"
                  aria-label="Call Kaz Viskanta"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/kazvisk/"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Vanguard */}
                <a
                  href="https://vanguardproperties.com/agents/kaz-visk"
                  aria-label="Vanguard Properties"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <img src="/favicon/vangaurd.ico" alt="Vanguard Properties" className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
