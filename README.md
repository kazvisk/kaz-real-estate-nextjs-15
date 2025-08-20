# KAZVIS REALTY - Luxury Real Estate Website

A sophisticated Next.js 14 website for luxury real estate in San Francisco, featuring modern design, smooth animations, and professional code structure.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

## ✨ Features

### Hero Header Section
- **Full viewport height** luxury hero section
- **Pixel-perfect design** matching brand reference
- **Manrope typography** with professional spacing
- **Smooth animations** using Framer Motion
- **Responsive design** for all devices
- **Optimized images** with Next.js Image component

### Typography System
- **Manrope font family** with weights 400-800
- **Luxury letter spacing** (-0.05em for headlines, -0.02em for body)
- **Professional line heights** (1.1 for headlines, 1.4 for body)
- **OpenType features** enabled for premium typography

### Performance & SEO
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Image optimization** with WebP/AVIF formats
- **SEO metadata** for luxury real estate keywords
- **Accessibility compliance** with proper ARIA labels

## 🎨 Design System

### Colors
- Primary background: Black (`#000000`)
- Text: White (`#FFFFFF`)
- Overlay gradients for text readability

### Typography Hierarchy
```
Logo: KAZVIS REALTY
- Font: Manrope 700
- Size: 24px desktop, 20px mobile
- Color: White

Headline: "Extraordinary living begins here."
- Font: Manrope 700
- Size: 72px desktop, 48px mobile
- Color: White

Subheading: Luxury description
- Font: Manrope 500
- Size: 20px desktop, 16px mobile
- Color: White/90% opacity
```

### Animations
- **Staggered fade-in** for content elements
- **Smooth hover effects** on interactive elements
- **Luxury micro-interactions** with Framer Motion
- **Performance optimized** animations

## 📁 Project Structure

```
kazviskrealty/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles & typography
│   └── components/
│       └── HeroHeader.tsx      # Main hero section
├── public/                     # Static assets
│   ├── headerbackground.jpg    # Hero background image
│   └── houseforheader.png      # Architectural house image
├── brand_assets/               # Original brand files
└── [config files]             # Next.js, TypeScript, Tailwind configs
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom luxury design system
- **Animations**: Framer Motion for smooth interactions
- **Fonts**: Google Fonts (Manrope)
- **Images**: Next.js Image optimization with modern formats
- **Development**: ESLint, TypeScript strict mode

## 📱 Responsive Design

- **Desktop**: Full luxury layout with large typography
- **Tablet**: Adjusted spacing and medium typography
- **Mobile**: Optimized layout with smaller elements

## 🎯 Key Features Implemented

✅ **Pixel-perfect hero header** matching reference design  
✅ **Luxury typography system** with Manrope font  
✅ **Smooth animations** and micro-interactions  
✅ **Responsive design** for all screen sizes  
✅ **Image optimization** for fast loading  
✅ **SEO optimization** for luxury real estate  
✅ **Accessibility compliance** with proper semantics  
✅ **Professional code structure** with TypeScript  

## 🔄 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Code Quality
npm run type-check   # TypeScript type checking
```

## 🌟 Design Philosophy

This website embodies luxury real estate principles:
- **Sophisticated aesthetics** with clean, minimal design
- **Premium typography** with careful spacing and hierarchy
- **High-quality imagery** showcasing architectural excellence
- **Smooth interactions** providing professional user experience
- **San Francisco luxury market** positioning and branding

## 📄 License

Private luxury real estate website for KAZVIS REALTY.

