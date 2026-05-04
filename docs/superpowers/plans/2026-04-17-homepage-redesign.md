# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five content sections below the hero on the homepage — Meet Kaz (restyled), Notable Sales, Why Work With Me, Market Insights, and Contact.

**Architecture:** Each section is a standalone React component in `src/components/`. The homepage `page.tsx` imports and composes them in order. All components share the same dark theme (`#0a0d14`, Manrope, Framer Motion scroll animations) as the existing search page.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/components/MeetKazSection.tsx` | Restyle bio section to dark theme |
| Create | `src/components/NotableSalesSection.tsx` | 4-card 2×2 sales grid |
| Create | `src/components/WhyWorkWithMeSection.tsx` | Numbered editorial list of value props |
| Create | `src/components/MarketInsightsSection.tsx` | 3 static stat cards |
| Create | `src/components/ContactSection.tsx` | Centered CTA with email + phone |
| Modify | `src/app/page.tsx` | Import and compose all sections |

---

## Task 1: Restyle MeetKazSection

**Files:**
- Modify: `src/components/MeetKazSection.tsx`

- [ ] **Step 1: Replace the entire file contents**

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function MeetKazSection() {
  return (
    <section
      id="meet-kaz"
      className="py-20 px-6 md:px-16"
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
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
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
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}
            >
              I&apos;m Kaz Viskanta, a San Francisco real estate agent passionate about
              helping people find their place in this city. Whether you&apos;re buying
              your first home, upgrading your space, or moving on to new
              opportunities, I guide you through the process with transparency,
              strategy, and care.
            </p>

            <p
              className="mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty"
git add src/components/MeetKazSection.tsx
git commit -m "restyle: update MeetKazSection to match dark site theme"
```

---

## Task 2: Create NotableSalesSection

**Files:**
- Create: `src/components/NotableSalesSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
        style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
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
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>property photo</span>
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
        {/* Header */}
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

        {/* 2×2 grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {sales.map((sale, i) => (
            <SaleCard key={i} sale={sale} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty"
git add src/components/NotableSalesSection.tsx
git commit -m "feat: add NotableSalesSection with 4 placeholder cards"
```

---

## Task 3: Create WhyWorkWithMeSection

**Files:**
- Create: `src/components/WhyWorkWithMeSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
      className="py-20 px-6 md:px-16"
      style={{ backgroundColor: '#0a0d14', fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)', letterSpacing: '-0.02em' }}
        >
          The difference is in the details.
        </motion.h2>

        {/* Editorial list */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-start gap-6 py-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span
                className="shrink-0 pt-0.5"
                style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', minWidth: '24px' }}
              >
                {item.number}
              </span>
              <div>
                <p className="text-white font-medium mb-1.5" style={{ fontSize: '1rem' }}>
                  {item.title}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: '1.7' }}>
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty"
git add src/components/WhyWorkWithMeSection.tsx
git commit -m "feat: add WhyWorkWithMeSection with numbered editorial list"
```

---

## Task 4: Create MarketInsightsSection

**Files:**
- Create: `src/components/MarketInsightsSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
        {/* Header */}
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

        {/* Stat cards */}
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

        {/* Footnote */}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty"
git add src/components/MarketInsightsSection.tsx
git commit -m "feat: add MarketInsightsSection with 3 static stat cards"
```

---

## Task 5: Create ContactSection

**Files:**
- Create: `src/components/ContactSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section
      className="py-24 px-6 md:px-16"
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
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
          >
            Ready to make a move?
          </h2>

          <p
            className="mb-10 mx-auto"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              lineHeight: '1.7',
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty" && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty"
git add src/components/ContactSection.tsx
git commit -m "feat: add ContactSection with centered CTA"
```

---

## Task 6: Wire Up page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
'use client'

import HeroHeader from '@/components/HeroHeader'
import MeetKazSection from '@/components/MeetKazSection'
import NotableSalesSection from '@/components/NotableSalesSection'
import WhyWorkWithMeSection from '@/components/WhyWorkWithMeSection'
import MarketInsightsSection from '@/components/MarketInsightsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#0a0d14' }}>
      <HeroHeader />
      <MeetKazSection />
      <NotableSalesSection />
      <WhyWorkWithMeSection />
      <MarketInsightsSection />
      <ContactSection />
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript and build**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty" && npx tsc --noEmit && npm run build
```

Expected: build completes with no errors. Ignore any prerender timing warnings.

- [ ] **Step 3: Verify visually in dev server**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty" && npm run dev
```

Open http://localhost:8000 and scroll through the full page. Verify:
- Hero plays video as before (unchanged)
- Meet Kaz section uses dark background `#0a0d14` (no more `#131925` mismatch)
- Notable Sales shows 2×2 grid of 4 placeholder cards
- Why Work With Me shows numbered 01–04 editorial list
- Market Insights shows 3 stat cards
- Contact shows centered white + outlined button pair
- No visible gap or color mismatch between sections on scroll

- [ ] **Step 4: Commit**

```bash
cd "/Users/kazvisk/Documents/Website Backups/Realty Backup/kazviskrealty"
git add src/app/page.tsx
git commit -m "feat: wire up full homepage with all redesigned sections"
```
