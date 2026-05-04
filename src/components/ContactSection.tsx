'use client'

import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section
      className="py-28 px-6 md:px-16"
      style={{ backgroundColor: '#0a0d14', fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl px-8 py-16 text-center"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p
            className="text-xs font-semibold uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}
          >
            Get In Touch
          </p>

          <h2
            className="text-white font-medium mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Ready to make a move?
          </h2>

          <p
            className="mb-10 mx-auto"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.15rem',
              lineHeight: '1.75',
              maxWidth: '440px',
            }}
          >
            Whether you&apos;re buying, selling, or just exploring &mdash; let&apos;s
            talk. No pressure, no obligation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <a
              href="mailto:kaz@kazviskrealty.com?subject=Contact Kaz Visk Realty&body=Hi Kaz, I'd like to get in touch about your real estate services."
              className="px-7 py-3.5 rounded-full font-semibold transition-opacity duration-200 hover:opacity-85"
              style={{
                background: '#ffffff',
                color: '#000000',
                letterSpacing: '0.04em',
                fontSize: '0.9rem',
              }}
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

          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
            kaz@kazviskrealty.com
          </p>
        </motion.div>
      </div>
    </section>
  )
}
