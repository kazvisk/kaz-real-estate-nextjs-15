# Homepage Redesign — Design Spec
**Date:** 2026-04-17  
**Status:** Approved

## Overview

Redesign the homepage of kazviskrealty.com to provide substantive content below the existing hero section. The hero (`HeroHeader`) stays unchanged. Six sections total, all using the existing dark theme (`#0a0d14`, Manrope font, white text with opacity variants).

---

## Section Order

1. **Hero** — existing `HeroHeader` component, unchanged
2. **Meet Kaz** — existing bio content, restyled to match dark theme
3. **Notable Sales** — 4 placeholder transaction cards
4. **Why Work With Me** — numbered editorial list of value props
5. **Market Insights** — 3 static stat cards
6. **Contact** — centered CTA bar

---

## Section Specs

### ② Meet Kaz (restyled)

**Current state:** `MeetKazSection` uses `#131925` background, does not match the rest of the site.

**New design:**
- Background: `#0a0d14` (matches site-wide theme)
- Section label: `ABOUT` in small uppercase tracking-widest, `rgba(255,255,255,0.35)`
- Layout: 2-column grid — square headshot on left (`headshot.jpg`, rounded-2xl), bio content on right
- Name: `font-size: clamp(1.4rem, 2.5vw, 2rem)`, `font-weight: 500`, `letter-spacing: -0.02em`
- Credential line: `San Francisco REALTOR® · CA DRE #02318574`, small uppercase, `rgba(255,255,255,0.35)`
- Bio text: existing copy, `rgba(255,255,255,0.65)`, `font-size: 14–16px`, `line-height: 1.7`
- CTA row: "About Me →" button + email/phone/LinkedIn/Vanguard icon circles (same icons as current `MeetKazSection`)
- Button style: `rgba(255,255,255,0.08)` background, `1px solid rgba(255,255,255,0.12)` border, rounded-lg
- Framer Motion: slide-in animations (same pattern as existing `MeetKazSection`)
- Replace existing `MeetKazSection` component entirely

### ③ Notable Sales

**Purpose:** Showcase 4 transactions as placeholder cards — user fills in real data.

**Layout:** 2×2 grid on desktop, 1 column on mobile

**Each card contains:**
- Property photo (placeholder `<div>` with `rgba(255,255,255,0.05)` background — user replaces with `<Image>`)
- Neighborhood label: uppercase, `rgba(255,255,255,0.35)`, `letter-spacing: 3px`
- Street address: white, `font-weight: 500`
- Sale price: `rgba(255,255,255,0.6)`
- Role badge: pill-shaped, `"Represented Buyer"` or `"Represented Seller"`, `rgba(255,255,255,0.1)` background

**Section header:**
- Label: `NOTABLE SALES`, uppercase tracking
- Headline: `"Transactions that speak."` — animated in with Framer Motion on viewport entry
- Right-aligned: `"4 transactions"` in `rgba(255,255,255,0.2)`

**Card style:** `rgba(255,255,255,0.04)` background, `1px solid rgba(255,255,255,0.08)` border, `border-radius: 10px`, `overflow: hidden`

**Data shape (TypeScript):**
```ts
type Sale = {
  neighborhood: string
  address: string
  price: string       // e.g. "$1,250,000"
  role: 'Represented Buyer' | 'Represented Seller'
  imageSrc?: string   // optional — falls back to placeholder
  imageAlt?: string
}
```

Defined as a static array in the component file for easy editing.

### ④ Why Work With Me

**Layout:** Numbered editorial list, full width, border-separated rows

**Items (4):**
1. **Deep Local Knowledge** — "I know San Francisco neighborhood by neighborhood — pricing trends, micro-markets, and what sellers and buyers actually care about."
2. **Modern Strategy** — "Data-driven decisions, sharp negotiation, and a clear plan — no guesswork, no pressure."
3. **Full Transparency** — "You'll always know where things stand. I communicate clearly and honestly at every step."
4. **Backed by Vanguard Properties** — "The reach and reputation of one of SF's top brokerages, with the personal attention of a dedicated agent."

**Row structure:** number (`01`–`04`) in `rgba(255,255,255,0.2)` + title in white `font-weight: 500` + body in `rgba(255,255,255,0.5)`, separated by `1px solid rgba(255,255,255,0.06)` borders

**Section header:**
- Label: `WHY WORK WITH ME`
- Headline: `"The difference is in the details."`

### ⑤ Market Insights

**Layout:** 3 stat cards in a row (1 column on mobile), plus a footnote line

**Stats (static, manually updated monthly):**
| Stat | Label |
|------|-------|
| $1.2M | Median Sale Price |
| 18 | Avg. Days on Market |
| 104% | Sale-to-List Ratio |

**Card style:** same glass card as Notable Sales cards

**Stat typography:** large number `font-size: clamp(1.8rem, 3vw, 2.5rem)`, `font-weight: 500`, white; label in `rgba(255,255,255,0.35)` uppercase tracking

**Footnote:** `"Data updated monthly · SF MLS"` + inline link `"Want a custom market report?"` → `mailto:kaz@kazviskrealty.com?subject=Custom Market Report`

**Section header:**
- Label: `MARKET INSIGHTS`
- Headline: `"The SF market, right now."`

### ⑥ Contact

**Layout:** Centered, full-width section

**Content:**
- Label: `GET IN TOUCH`
- Headline: `"Ready to make a move?"`
- Subtext: `"Whether you're buying, selling, or just exploring — let's talk. No pressure, no obligation."`
- Primary button: `"EMAIL KAZ"` → `mailto:kaz@kazviskrealty.com?subject=Contact Kaz Visk Realty` — white pill, black text
- Secondary button: `"415-513-3387"` → `tel:+14155133387` — transparent pill, white border
- Footnote: `kaz@kazviskrealty.com` in `rgba(255,255,255,0.2)`

**Button style:** matches search page bottom bar exactly — pill-shaped (`border-radius: 30px`), `font-weight: 600`, `letter-spacing: 0.04em`

---

## Styling System

All sections share:
- **Background:** `#0a0d14`
- **Font:** `Manrope, sans-serif`
- **Section padding:** `py-20 px-6 md:px-16`
- **Max width:** `max-w-6xl mx-auto`
- **Section label:** `text-xs font-semibold uppercase tracking-widest`, `rgba(255,255,255,0.35)`, `letter-spacing: 0.18em` — matches search page pattern
- **Section headline:** `font-size: clamp(1.6rem, 3.2vw, 2.8rem)`, `font-weight: 500`, `letter-spacing: -0.02em`
- **Card containers:** `rgba(255,255,255,0.04)` bg, `1px solid rgba(255,255,255,0.08)` border, `border-radius: 10–12px`
- **Animations:** Framer Motion `whileInView`, `initial={{ opacity: 0, y: 20 }}`, `once: true`

---

## File Structure

- `src/app/page.tsx` — updated to import new section components
- `src/components/MeetKazSection.tsx` — rewritten in place (same file, same name)
- `src/components/NotableSalesSection.tsx` — new component
- `src/components/WhyWorkWithMeSection.tsx` — new component
- `src/components/MarketInsightsSection.tsx` — new component
- `src/components/ContactSection.tsx` — new component

---

## Out of Scope

- Hero section changes
- Navigation changes
- Mobile hamburger menu
- Dynamic/live market data (static numbers only for now)
- Testimonials, credentials, or social proof sections
- Search embed on homepage
