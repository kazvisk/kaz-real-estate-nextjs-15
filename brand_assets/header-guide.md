# Header Section Specifications

## 📋 Overview
Create a luxury hero header that exactly matches `brand_assets/reference.jpeg` using the provided brand assets.

## 🖼 Asset Usage
- **Background**: Use `brand_assets/headerbackground.jpg` 
- **House Image**: Use `brand_assets/houseforheader.png`
- **Reference**: Follow layout in `brand_assets/reference.jpeg`

## 🎨 Layout Specifications

### Background
- Full viewport height hero section
- Background image: `headerbackground.jpg`
- Overlay gradient if needed for text readability
- Ensure responsive scaling

### Typography Hierarchy
```
Logo: "KAZVIS REALTY" (top-left)
- Font: Manrope 700
- Size: 24px desktop, 20px mobile
- Color: White
- Letter-spacing: -0.05em

Main Headline: "Extraordinary living begins here."
- Font: Manrope 700
- Size: 72px desktop, 48px mobile  
- Color: White
- Letter-spacing: -0.05em
- Line-height: 1.1
- Text-align: center

Subheading: "Timeless architecture, exclusive locations..."
- Font: Manrope 500
- Size: 20px desktop, 16px mobile
- Color: White/Light gray
- Letter-spacing: -0.02em
- Line-height: 1.4
- Text-align: center
- Max-width: 600px, centered
```

### Layout Positioning
```
Logo: Top-left corner (32px from edges)
Plus Icon: Top-right corner (32px from edges)  
Text Content: Centered vertically and horizontally
House Image: Bottom-right, positioned as shown in reference
```

### Interactive Elements
- Plus icon (+) in top-right corner
- Subtle hover effects on interactive elements
- Smooth scroll indicator (optional)

## 📱 Responsive Behavior
- **Desktop**: Full layout as reference
- **Tablet**: Adjust typography sizes, maintain positioning
- **Mobile**: Stack elements, smaller house image, adjusted spacing

## 🎭 Animations
- Fade-in animation on page load
- Subtle parallax effect on background
- Smooth hover transitions
- House image entrance animation

## 🔧 Technical Requirements
- Use Next.js Image component for optimization
- Implement proper alt tags for accessibility
- Ensure fast loading with optimized images
- Semantic HTML structure for SEO

## ✅ Completion Checklist
- [ ] Background image implemented correctly
- [ ] House image positioned as reference
- [ ] Typography matches specifications exactly
- [ ] Logo and plus icon positioned correctly
- [ ] Responsive design works on all devices
- [ ] Animations are smooth and professional
- [ ] Page loads quickly
- [ ] Accessibility standards met