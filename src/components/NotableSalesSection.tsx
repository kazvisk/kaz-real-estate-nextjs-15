'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Sale = {
  neighborhood: string
  address: string
  price: string
  role: 'Represented Buyer' | 'Represented Seller'
  imageSrc?: string
  imageAlt?: string
}

// ── Fill in your 4 sales here ──────────────────────────────────────────────
const sales: Sale[] = [
  {
    neighborhood: 'Neighborhood',
    address: 'Street Address',
    price: '$0,000,000',
    role: 'Represented Buyer',
  },
  {
    neighborhood: 'Neighborhood',
    address: 'Street Address',
    price: '$0,000,000',
    role: 'Represented Seller',
  },
  {
    neighborhood: 'Neighborhood',
    address: 'Street Address',
    price: '$0,000,000',
    role: 'Represented Buyer',
  },
  {
    neighborhood: 'Neighborhood',
    address: 'Street Address',
    price: '$0,000,000',
    role: 'Represented Seller',
  },
]
// ───────────────────────────────────────────────────────────────────────────

function SaleCard({ sale, index }: { sale: Sale; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Photo */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: '4/3',
          background: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {sale.imageSrc ? (
          <Image
            src={sale.imageSrc}
            alt={sale.imageAlt ?? sale.address}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>
              property photo
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <p
          className="uppercase mb-1"
          style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.2em' }}
        >
          {sale.neighborhood}
        </p>
        <p className="text-white font-medium mb-2" style={{ fontSize: '0.95rem' }}>
          {sale.address}
        </p>
        <div className="flex items-center justify-between">
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{sale.price}</span>
          <span
            className="rounded-full px-2 py-0.5"
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.65rem',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            {sale.role}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function NotableSalesSection() {
  return (
    <section
      className="py-20 px-6 md:px-16"
      style={{ backgroundColor: '#0a0d14', fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase mb-3"
              style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em' }}
            >
              Notable Sales
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white font-medium"
              style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)', letterSpacing: '-0.02em' }}
            >
              Transactions that speak.
            </motion.h2>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
            {sales.length} transactions
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {sales.map((sale, i) => (
            <SaleCard key={i} sale={sale} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
