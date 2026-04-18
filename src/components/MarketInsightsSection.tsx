'use client'

import { motion } from 'framer-motion'

// ── Update these numbers monthly ──────────────────────────────────────────
const stats = [
  { value: '$1.2M', label: 'Median Sale Price' },
  { value: '18',   label: 'Avg. Days on Market' },
  { value: '104%', label: 'Sale-to-List Ratio' },
]
// ─────────────────────────────────────────────────────────────────────────

export default function MarketInsightsSection() {
  return (
    <section
      className="py-20 px-6 md:px-16"
      style={{ backgroundColor: '#0a0d14', fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase mb-3"
          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}
        >
          Market Insights
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white font-medium mb-10"
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)', letterSpacing: '-0.02em' }}
        >
          The SF market, right now.
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-xl p-6"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                className="text-white font-medium mb-2"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </p>
              <p
                className="uppercase"
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.18em' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
          Data updated monthly &middot; SF MLS &middot;{' '}
          <a
            href="mailto:kaz@kazviskrealty.com?subject=Custom Market Report&body=Hi Kaz, I'd like a custom market report for my area."
            className="underline underline-offset-4 transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.4)', textDecorationColor: 'rgba(255,255,255,0.2)' }}
          >
            Want a custom market report?
          </a>
        </p>
      </div>
    </section>
  )
}
