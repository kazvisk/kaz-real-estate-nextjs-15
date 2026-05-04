'use client'

import { motion } from 'framer-motion'

const items = [
  {
    number: '01',
    title: 'Deep Local Knowledge',
    body: 'I know San Francisco neighborhood by neighborhood — pricing trends, micro-markets, and what sellers and buyers actually care about.',
  },
  {
    number: '02',
    title: 'Modern Strategy',
    body: 'Data-driven decisions, sharp negotiation, and a clear plan — no guesswork, no pressure.',
  },
  {
    number: '03',
    title: 'Full Transparency',
    body: "You'll always know where things stand. I communicate clearly and honestly at every step.",
  },
  {
    number: '04',
    title: 'Backed by Vanguard Properties',
    body: "The reach and reputation of one of SF's top brokerages, with the personal attention of a dedicated agent.",
  },
]

export default function WhyWorkWithMeSection() {
  return (
    <section
      className="py-28 px-6 md:px-16"
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
          Why Work With Me
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white font-medium mb-12"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
        >
          The difference is in the details.
        </motion.h2>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-start gap-8 py-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span
                className="shrink-0 pt-0.5"
                style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', minWidth: '24px' }}
              >
                {item.number}
              </span>
              <div>
                <p className="text-white font-medium mb-2" style={{ fontSize: '1.2rem' }}>
                  {item.title}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: '1.75' }}>
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
