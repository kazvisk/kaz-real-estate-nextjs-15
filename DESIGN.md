---
version: alpha
name: Kaz Visk Realty
description: "A dark editorial luxury real estate design system for a San Francisco agent, blending cinematic property imagery, restrained white typography, translucent surfaces, and calm data-forward tools."
colors:
  primary: "#FFFFFF"
  on-primary: "#000000"
  secondary: "#949499"
  on-secondary: "#FFFFFF"
  tertiary: "#DC3C46"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#DC3C4629"
  on-tertiary-container: "#FFFFFF"
  background: "#0A0D14"
  on-background: "#FFFFFF"
  surface: "#0A0D14"
  surface-alt: "#131925"
  surface-container-low: "#111520"
  surface-container: "#1A1F2E"
  surface-container-high: "#242A38"
  surface-translucent: "#FFFFFF0A"
  surface-translucent-strong: "#FFFFFF14"
  surface-translucent-hover: "#FFFFFF26"
  on-surface: "#FFFFFF"
  on-surface-muted: "#FFFFFFA6"
  on-surface-subtle: "#FFFFFF8C"
  on-surface-secondary: "#FFFFFF59"
  on-surface-faint: "#FFFFFF33"
  outline: "#FFFFFF2E"
  outline-muted: "#FFFFFF1F"
  outline-subtle: "#FFFFFF14"
  outline-hairline: "#FFFFFF0F"
  scrim: "#00000080"
  scrim-strong: "#000000A6"
  map-default: "#781E28"
  map-hover: "#A02D37"
  map-selected: "#DC3C46"
  map-border: "#FFFFFF8C"
  map-halo: "#00000080"
  light-background: "#F8FAFC"
  light-surface: "#FFFFFF"
  light-text: "#1F2937"
  light-text-muted: "#374151"
  action-blue: "#2563EB"
  action-blue-hover: "#1D4ED8"
  error: "#DC2626"
  on-error: "#FFFFFF"
typography:
  display-hero:
    fontFamily: Manrope
    fontSize: 112px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
    fontFeature: "\"kern\" 1, \"liga\" 1, \"calt\" 1"
  display-hero-mobile:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
    fontFeature: "\"kern\" 1, \"liga\" 1, \"calt\" 1"
  headline-xl:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.02em
  title-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.01em
  title-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: 0em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0em
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  nav-label:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0em
  button-label:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.04em
  section-label:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.18em
  micro-label:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: 600
    lineHeight: 14px
    letterSpacing: 0.14em
  stat-display:
    fontFamily: Manrope
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.03em
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
radii:
  none: "{rounded.none}"
  sm: "{rounded.sm}"
  md: "{rounded.md}"
  lg: "{rounded.lg}"
  xl: "{rounded.xl}"
  full: "{rounded.full}"
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  5xl: 80px
  6xl: 112px
  nav-x-mobile: 32px
  nav-x-desktop: 64px
  nav-y: 32px
  page-x-mobile: 24px
  page-x-desktop: 64px
  section-y: 112px
  content-max: 1152px
  carousel-max: 1376px
  panel-width: 320px
shadows:
  none: "none"
  media-card: "0 40px 80px -20px #000000A6, 0 10px 30px -10px #00000080"
  media-card-recessed: "0 20px 40px -20px #00000066"
  panel: "0 32px 64px -12px #00000099"
  floating: "0 24px 48px #00000080"
  mobile-action: "0 25px 50px -12px #00000080"
  subtle: "0 10px 30px -10px #00000080"
elevation:
  base:
    backgroundColor: "{colors.background}"
    boxShadow: "{shadows.none}"
  tonal-card:
    backgroundColor: "{colors.surface-translucent}"
    borderColor: "{colors.outline-subtle}"
    boxShadow: "{shadows.none}"
  media-raised:
    backgroundColor: "{colors.surface-translucent}"
    borderColor: "{colors.outline-subtle}"
    boxShadow: "{shadows.media-card}"
  tool-panel:
    backgroundColor: "{colors.surface-container-low}"
    borderColor: "{colors.outline-subtle}"
    boxShadow: "{shadows.panel}"
motion:
  duration-instant: 120ms
  duration-fast: 150ms
  duration-standard: 200ms
  duration-slow: 300ms
  duration-reveal: 600ms
  duration-page: 800ms
  duration-hero: 1000ms
  ease-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  ease-luxury: "cubic-bezier(0.22, 1, 0.36, 1)"
  spring-stiffness: 260
  spring-damping: 30
  spring-mass: 0.85
effects:
  image-scrim: "linear overlay using #00000080 above photography or video"
  glass-blur-sm: "backdrop-filter: blur(4px)"
  glass-blur-md: "backdrop-filter: blur(8px)"
  glass-blur-lg: "backdrop-filter: blur(12px)"
  glass-blur-xl: "backdrop-filter: blur(24px)"
components:
  page-shell-dark:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.body-md}"
  navigation:
    backgroundColor: "transparent"
    textColor: "{colors.on-background}"
    typography: "{typography.nav-label}"
    height: 128px
    padding: "32px 64px"
  navigation-dark-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.nav-label}"
    height: 128px
    padding: "32px 64px"
  hero-headline:
    textColor: "{colors.on-background}"
    typography: "{typography.display-hero}"
  section-heading:
    textColor: "{colors.on-background}"
    typography: "{typography.headline-lg}"
  section-label:
    textColor: "{colors.on-surface-secondary}"
    typography: "{typography.section-label}"
  body-copy:
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.body-lg}"
  button-glass:
    backgroundColor: "{colors.surface-translucent}"
    textColor: "{colors.on-background}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    height: 56px
    padding: "16px 32px"
  button-glass-hover:
    backgroundColor: "{colors.surface-translucent-hover}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-label}"
    rounded: "{rounded.full}"
    height: 48px
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.button-label}"
    rounded: "{rounded.full}"
    height: 48px
    padding: "14px 28px"
  button-accent:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
    height: 64px
    padding: "20px"
  button-accent-hover:
    backgroundColor: "{colors.action-blue-hover}"
  translucent-card:
    backgroundColor: "{colors.surface-translucent}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
  stat-card:
    backgroundColor: "{colors.surface-translucent}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.2xl}"
  media-card:
    backgroundColor: "{colors.surface-translucent}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 0px
  contact-card:
    backgroundColor: "{colors.surface-translucent}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "64px 32px"
  icon-button:
    backgroundColor: "{colors.surface-translucent}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    width: 40px
    height: 40px
  mobile-floating-action:
    backgroundColor: "{colors.surface-translucent-strong}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    width: 56px
    height: 56px
  search-frame:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.lg}"
    padding: 0px
  data-panel:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  map-selected-area:
    backgroundColor: "{colors.map-selected}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.none}"
    padding: 0px
  input-field:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: "{spacing.md}"
---

## Overview

Kaz Visk Realty uses a cinematic, dark luxury language: full-bleed property imagery, white typography, quiet motion, and restrained translucent controls. The interface should feel like a private showing rather than a loud brokerage site. It is polished, calm, and high-trust, with enough data density to support serious buyers and sellers without losing the premium atmosphere.

The primary mood is editorial and architectural. Large centered headlines sit over dimmed photography, while downstream sections use an almost-black canvas with glassy cards, hairline dividers, and generous vertical spacing. The brand voice is direct and human: confident, local, strategic, never flashy.

## Colors

The foundation is deep ink: `#0A0D14` for the main canvas and `#131925` for slightly lifted dark sections. White is the primary brand and action color. It appears as text, logo, primary CTAs, map labels, and dividers. Most hierarchy is created through white opacity rather than a large palette.

Use translucent white surfaces sparingly: `#FFFFFF0A` for cards, `#FFFFFF14` for stronger panels, and `#FFFFFF1F` to `#FFFFFF2E` for borders. These surfaces should read as faint glass, not frosted novelty. Text hierarchy steps down through white alpha: full white for headlines, about 65% for primary body copy, 35% for section labels, and 20% for faint metadata.

Accent color is deliberately limited. Burgundy red `#DC3C46` belongs to map selection, score bars, issue/status accents, and other data highlights. Blue `#2563EB` appears only in the contact-card experience as a utility action. Do not spread either accent across the marketing homepage; the homepage should remain monochrome, photographic, and restrained.

Light surfaces are secondary exceptions for embedded tools, email-signature style artifacts, and legacy informational sections. When a tool brings its own light UI, frame it in the dark system with rounded containers and heavy dark shadows.

## Typography

The entire system uses Manrope. It should feel modern, rounded, and precise without becoming techy. Headline weights stay medium rather than bold; the luxury signal comes from scale, spacing, and quiet confidence, not typographic force.

Hero display text is oversized and centered, with tight negative tracking and a 1.1 line height. Section headings use the same medium-weight voice at smaller sizes. Eyebrows are uppercase, tiny, and widely tracked, acting like editorial section markers.

Body copy is generous and readable. Marketing paragraphs sit at 18px with a loose 1.75 to 1.8 line height. Navigation uses compact uppercase labels around 15px with normal letter spacing. Button labels are either natural-case medium text in glass CTAs or uppercase semi-bold text with slight tracking in primary contact actions.

Avoid adding decorative serif typography. The brand is premium through restraint, photography, and proportion, not through ornamental font pairing.

## Layout

The layout is spacious and centered. Marketing sections use a max content width of about 1152px, 64px desktop side padding, 24px mobile side padding, and 112px vertical section padding. The homepage hero fills the viewport and centers its message vertically over media. The navigation sits high, wide, and airy, with the logo at left, links across the middle, and the menu affordance at right.

Cards and panels are not dense by default. Use 32px internal padding for stat cards and translucent content groups, 64px vertical padding for large contact cards, and 16px to 24px gaps between grouped controls. Carousels can exceed the core content width to allow side previews and edge fading, but primary text should remain aligned to the main content measure.

Data and map surfaces are more utilitarian. They still use the same dark canvas, rounded frames, and white hierarchy, but panels may be narrower, denser, and more grid-like. Map and listing tools should be treated as embedded instruments inside a premium frame.

## Elevation & Depth

Depth is dark and cinematic. The base UI does not rely on bright drop shadows because most surfaces already sit on a near-black canvas. Hierarchy comes from tonal layers, borders, transparency, and photography.

Media cards and embedded tools are the main elevated objects. Use large, soft black shadows such as `0 40px 80px -20px #000000A6` for active image cards and `0 32px 64px -12px #00000099` for search frames or panels. Translucent cards usually need only a hairline border and no visible shadow.

The hero uses a black scrim over photography or video so white type remains readable. Do not remove the scrim unless the media is already dark enough to maintain strong contrast.

## Shapes

The shape language is modern but controlled. Marketing cards, property images, search frames, and data panels use 16px corners. Smaller controls use 8px or 12px. Primary contact CTAs and pager dots use fully rounded pills.

Circular forms are reserved for avatars, floating mobile contact buttons, social/contact icons, map controls, and carousel arrows. Do not make every component pill-shaped. The system needs a balance of architectural rectangles and soft touch targets.

## Components

Navigation should be transparent over the hero and dark over utility pages. Keep the white KV mark large and crisp, with ample horizontal breathing room. Links are uppercase, medium-weight, and reduce opacity on hover.

Hero CTAs are ghost-glass buttons: transparent white fill, white border, rounded 8px corners, and a slightly stronger translucent fill on hover. They should feel like overlays on the image, not solid blocks.

Primary contact CTAs are white pills with black text. Secondary contact CTAs are transparent pills with subtle white borders and muted white text. In the contact-card page, the blue "Add to Contacts" action is allowed as a utility exception.

Marketing cards use translucent white fills and hairline borders. Stat cards prioritize one large value, then a small uppercase label. List sections use divider lines instead of individual card containers.

Property media should be large, rounded, and cinematic. Active carousel imagery receives the heaviest shadow. Supporting slide previews should fade and scale down rather than compete with the active card.

Map surfaces use burgundy fills for neighborhoods, white borders, white labels, and dark tooltips. Selected areas use the brighter red, while side panels stay dark and data-dense.

## Do's and Don'ts

- Do keep the homepage primarily monochrome, dark, photographic, and quiet.
- Do use large white Manrope headlines with tight tracking for the main brand voice.
- Do use white opacity steps for hierarchy before introducing new colors.
- Do frame third-party or light tools inside dark rounded containers with strong shadows.
- Do reserve burgundy red for maps, data highlights, and selected states.
- Don't introduce broad gradients, bright decorative accents, or playful colors into marketing sections.
- Don't overuse glass effects; translucent panels should be subtle and functional.
- Don't use heavy borders. Prefer 1px white-alpha hairlines.
- Don't make all buttons solid. Solid white is for primary conversion moments only.
- Don't crowd sections. The luxury feel depends on generous spacing and a calm reading rhythm.
