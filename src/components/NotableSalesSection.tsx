'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Sale = {
  address: string
  description: string
  role: 'Represented Buyer' | 'Represented Seller'
  price: string
  beds: number
  baths: number
  imageSrc: string
  imageAlt: string
}

const sales: Sale[] = [
  {
    address: '59 Collingwood Street',
    description:
      'A thoughtfully updated Castro residence where designer finishes meet a flexible floor plan built for how you actually live.',
    role: 'Represented Buyer',
    price: '$3,150,000',
    beds: 4,
    baths: 3,
    imageSrc: '/59-collingwood.webp',
    imageAlt: '59 Collingwood Street',
  },
  {
    address: '3700 16th Street',
    description:
      'A corner-lot Mission Dolores home bathed in natural light, blending classic SF bones with a refreshed, move-in-ready interior.',
    role: 'Represented Seller',
    price: '$3,200,000',
    beds: 5,
    baths: 3.5,
    imageSrc: '/3700-16th-st.webp',
    imageAlt: '3700 16th Street',
  },
  {
    address: '17 Roque Moraes',
    description:
      'A serene Marin retreat where clean-lined architecture opens onto sunlit decks, mature landscaping, and a sense of quiet.',
    role: 'Represented Buyer',
    price: '$2,600,000',
    beds: 4,
    baths: 3,
    imageSrc: '/17-roque-moraes.webp',
    imageAlt: '17 Roque Moraes',
  },
  {
    address: '695 48th Avenue',
    description:
      'An Outer Richmond home moments from Ocean Beach, offering a functional layout and a calm, neighborhood-feel setting.',
    role: 'Represented Seller',
    price: '$2,110,000',
    beds: 3,
    baths: 2,
    imageSrc: '/695-48th-ave.webp',
    imageAlt: '695 48th Avenue',
  },
]

const spring = { type: 'spring' as const, stiffness: 260, damping: 30, mass: 0.85 }

// How far (as % of the stage width) each offset-slot sits from center.
// Ghost is at ±1 slot. We want its inner edge to clear the active card's outer edge.
// Active card = 100% wide. Ghost = GHOST_SCALE wide.
// Center of ghost at SLOT_X% → its inner edge at (SLOT_X - GHOST_SCALE/2 * 100)%.
// We want that > 50 (outer edge of active card). So SLOT_X > 50 + GHOST_SCALE*50.
// GHOST_SCALE=0.68 → threshold=84; 88 gives a comfortable gap.
const SLOT_X = 88
const GHOST_SCALE = 0.68
const GHOST_OPACITY = 0.38
// Subtle image-only tilt: positive offset → right card leans right (outer edge back),
// negative offset → left card leans left. Applied only to the image div, not the card.
const GHOST_IMG_ROTATE_Y = 12

export default function NotableSalesSection() {
  const [active, setActive] = useState(0)
  const n = sales.length
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % n)
    }, 6000)
  }, [n])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const go = (dir: number) => {
    setActive((prev) => (prev + dir + n) % n)
    startTimer()
  }

  const goTo = (i: number) => {
    setActive(i)
    startTimer()
  }

  return (
    <section
      className="px-6 md:px-16"
      style={{
        backgroundColor: '#0a0d14',
        fontFamily: 'Manrope, sans-serif',
        paddingTop: '7rem',
        paddingBottom: '7rem',
      }}
    >
      {/* Header — constrained width */}
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase mb-4"
          style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em' }}
        >
          Notable Sales
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white font-medium mb-14"
          style={{
            fontSize: 'clamp(1.8rem, 3.4vw, 3rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Transactions that speak.
        </motion.h2>
      </div>

      {/* Carousel frame — wider than max-w-6xl so ghosts have room beside the active card.
         overflow-hidden + horizontal mask fades ghosts into the dark bg at the edges. */}
      <div
        className="relative mx-auto select-none"
        style={{
          maxWidth: '86rem',
          overflow: 'hidden',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)',
        }}
      >
        {/* Stage — sets the layout width of the ACTIVE card.
            All cards are absolutely positioned and translated relative to this box. */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: 'clamp(300px, 42vw, 560px)' }}
        >
          {/* Sizer ghost: reserves vertical space for image + details so the stage has real height */}
          <div aria-hidden style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            <div style={{ aspectRatio: '16 / 10', width: '100%' }} />
            {/* Details block reservation — enough for address + description + role pill */}
            <div style={{ minHeight: '13rem' }} />
          </div>

          {/* Arrow buttons sit on top of the image row, vertically centered */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ top: 0 }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                aspectRatio: '16 / 10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 -22px',
                pointerEvents: 'none',
              }}
            >
              <button
                type="button"
                aria-label="Previous sale"
                onClick={() => go(-1)}
                className="flex items-center justify-center"
                style={{
                  marginLeft: '-22px',
                  width: 44, height: 44,
                  borderRadius: '9999px',
                  background: 'rgba(10,13,20,0.88)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#fff',
                  zIndex: 50,
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                  pointerEvents: 'all',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next sale"
                onClick={() => go(1)}
                className="flex items-center justify-center"
                style={{
                  marginRight: '-22px',
                  width: 44, height: 44,
                  borderRadius: '9999px',
                  background: 'rgba(10,13,20,0.88)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: '#fff',
                  zIndex: 50,
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                  pointerEvents: 'all',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Card layer — all slides always mounted, transforms interpolated simultaneously via spring.
              NO rotateY / 3D transforms — ghosts use only translateX + scale + opacity.
              This keeps image geometry perfectly flat (matching the reference). */}
          <div className="absolute inset-0">
            {sales.map((sale, i) => {
              let offset = i - active
              if (offset > n / 2) offset -= n
              if (offset < -n / 2) offset += n
              const abs = Math.abs(offset)
              const isActive = offset === 0
              const visible = abs <= 1

              // Pure 2-D: translate + uniform scale. No perspective, no rotation.
              const xPct = offset * SLOT_X
              const scale = isActive ? 1 : GHOST_SCALE
              const opacity = isActive ? 1 : abs === 1 ? GHOST_OPACITY : 0
              const zIndex = isActive ? 30 : visible ? 10 : 0

              return (
                <motion.article
                  key={sale.address}
                  aria-hidden={!isActive}
                  className="absolute inset-0"
                  style={{
                    // transformOrigin y = center of image portion.
                    // Image is 16:10 → height = 62.5% of width.
                    // Stage width ≈ 560px → image height ≈ 350px, image center at ~175px.
                    // Total card height ≈ 350 + 208 (13rem) = 558px → 175/558 ≈ 31%.
                    // Scaling from here keeps ghost images vertically centered to the active image.
                    transformOrigin: 'center 31%',
                    pointerEvents: isActive ? 'auto' : 'none',
                    willChange: 'transform, opacity',
                  }}
                  initial={false}
                  animate={{ x: `${xPct}%`, scale, opacity, zIndex }}
                  transition={spring}
                >
                  {/* Single perspective wrapper — rotateY tilts image AND text together as one unit */}
                  <div
                    style={{
                      perspective: '1100px',
                      perspectiveOrigin: offset < 0 ? '100% 40%' : '0% 40%',
                    }}
                  >
                    <motion.div
                      initial={false}
                      animate={{ rotateY: isActive ? 0 : offset * GHOST_IMG_ROTATE_Y }}
                      transition={spring}
                      style={{ transformOrigin: 'center center' }}
                    >
                      {/* Image */}
                      <div
                        className="relative w-full overflow-hidden rounded-2xl"
                        style={{
                          aspectRatio: '16 / 10',
                          border: '1px solid rgba(255,255,255,0.08)',
                          boxShadow: isActive
                            ? '0 40px 80px -20px rgba(0,0,0,0.65), 0 10px 30px -10px rgba(0,0,0,0.5)'
                            : '0 20px 40px -20px rgba(0,0,0,0.4)',
                          backgroundColor: 'rgba(255,255,255,0.04)',
                        }}
                      >
                        <Image
                          src={sale.imageSrc}
                          alt={sale.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 560px, 100vw"
                          priority={i === 0}
                        />
                      </div>

                      {/* Details — tilts with the image as one rigid card */}
                      <div className="mt-6 grid grid-cols-2 gap-6">
                        <div>
                          <h3
                            className="text-white font-medium mb-2"
                            style={{
                              fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                              letterSpacing: '-0.01em',
                              lineHeight: 1.2,
                            }}
                          >
                            {sale.address}
                          </h3>
                          <p
                            className="mb-3"
                            style={{
                              color: 'rgba(255,255,255,0.55)',
                              fontSize: '0.9rem',
                              lineHeight: 1.55,
                            }}
                          >
                            {sale.description}
                          </p>
                          <span
                            className="inline-block rounded-full px-3 py-1"
                            style={{
                              color: 'rgba(255,255,255,0.6)',
                              fontSize: '0.65rem',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              border: '1px solid rgba(255,255,255,0.12)',
                              background: 'rgba(255,255,255,0.04)',
                            }}
                          >
                            {sale.role}
                          </span>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-white font-medium mb-2"
                            style={{
                              fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {sale.price}
                          </p>
                          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
                            {sale.beds} {sale.beds === 1 ? 'bedroom' : 'bedrooms'}
                          </p>
                          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
                            {sale.baths} {sale.baths === 1 ? 'bathroom' : 'bathrooms'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dot pager — constrained width again to match the header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mt-12">
          {sales.map((sale, i) => {
            const isActive = i === active
            return (
              <button
                key={sale.address}
                type="button"
                aria-label={`Go to sale ${i + 1}`}
                aria-current={isActive}
                onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{
                  width: isActive ? 28 : 8,
                  height: 8,
                  borderRadius: 9999,
                  background: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
