# Antara Studios — Complete Build Task List

> Premium Digital Wedding Invitation Platform
> Stack: Vite + React 18 + Tailwind CSS v3 + Framer Motion + React Router v6

---

## PHASE 1 — PROJECT SCAFFOLDING

### 1.1 Initialize Project
- [ ] Run `npm create vite@8 . -- --template react` in project root (select "Ignore files and continue")
- [ ] Verify `package.json`, `vite.config.js`, `src/`, `index.html` are created

### 1.2 Install All Dependencies
- [ ] Run: `npm install`
- [ ] Run: `npm install framer-motion react-router-dom`
- [ ] Run: `npm install -D tailwindcss@3 postcss autoprefixer`
- [ ] Run: `npm install lucide-react`
- [ ] Run: `npx tailwindcss init -p` (generates `tailwind.config.js` + `postcss.config.js`)

### 1.3 Configure Tailwind (`tailwind.config.js`)
- [ ] Set `content` to `["./index.html", "./src/**/*.{js,jsx}"]`
- [ ] Add custom `colors`: cream, warm-50/100/200/300, espresso, gold, sage, blush, champagne
- [ ] Add custom `fontFamily`: display (Playfair Display), sans (Plus Jakarta Sans)
- [ ] Add custom `animation` + `keyframes`: fadeUp, float, float-slow, shimmer, pulse-soft
- [ ] Add custom `transitionTimingFunction`: spring `cubic-bezier(0.32, 0.72, 0, 1)`

### 1.4 Configure Global CSS (`src/index.css`)
- [ ] Add Tailwind directives: `@tailwind base/components/utilities`
- [ ] Add Google Fonts import: Playfair Display (400,500,600,700,900i) + Plus Jakarta Sans (300,400,500,600,700)
- [ ] Set `html` base: `scroll-behavior: smooth`
- [ ] Set `body`: background `#FDFBF7`, color `#2C1810`, font Plus Jakarta Sans
- [ ] Add custom thin scrollbar styles (warm-toned)
- [ ] Add `.grain-overlay` as `position: fixed; inset: 0; pointer-events: none; opacity: 0.025` background-noise pattern
- [ ] Add `::selection` styles with gold background

### 1.5 Configure `index.html`
- [ ] Set `<title>`: "Antara Studios — Beautiful Digital Wedding Invitations"
- [ ] Add meta description + og tags
- [ ] Add Google Fonts `<link>` preconnect + stylesheet href
- [ ] Set `lang="en"`

### 1.6 Configure `vite.config.js`
- [ ] Confirm `@vitejs/plugin-react` plugin is active
- [ ] Add resolve alias: `@` → `./src`

---

## PHASE 2 — DESIGN SYSTEM & SHARED UTILITIES

### 2.1 Create `src/utils/animations.js`
- [ ] Export `fadeUpVariant`: hidden = `{ opacity:0, y:40, filter:'blur(8px)' }`, visible = `{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.8, ease:[0.32,0.72,0,1] } }`
- [ ] Export `staggerContainer`: `{ hidden:{}, visible:{ transition:{ staggerChildren:0.12 } } }`
- [ ] Export `scaleIn`: scale 0.92 → 1 with spring ease
- [ ] Export `slideInLeft`, `slideInRight` x-translate variants
- [ ] Export `cardHover`: `{ rest:{y:0}, hover:{y:-6, transition:{...}} }`
- [ ] Export `springTransition`: `{ type:'spring', stiffness:300, damping:30 }`

### 2.2 Create `src/hooks/useScrollReveal.js`
- [ ] Use `IntersectionObserver` (NOT window scroll listener)
- [ ] Return `{ ref, inView }` — `inView` flips true once element enters viewport
- [ ] Options: `threshold: 0.15`, `triggerOnce: true`

### 2.3 Create `src/components/ui/Button.jsx`
- [ ] Props: `variant` (primary/secondary/ghost/outline), `size` (sm/md/lg), `icon`, `children`, `onClick`, `className`
- [ ] Shape: `rounded-full` pill, generous padding
- [ ] Button-in-button icon: trailing arrow wrapped in its own `w-8 h-8 rounded-full bg-black/10` circle, flush right
- [ ] Framer Motion: `whileTap={{ scale: 0.97 }}`, inner icon `group-hover:translate-x-1 group-hover:-translate-y-px`
- [ ] Transition: `duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]`

### 2.4 Create `src/components/ui/Badge.jsx`
- [ ] Eyebrow pill: `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium`
- [ ] Variants: gold (gold bg/dark text), sage (sage bg/white text), glass (white/10 bg + blur)

### 2.5 Create `src/components/ui/Card.jsx`
- [ ] Double-bezel outer shell: `bg-warm-100/60 ring-1 ring-espresso/8 p-1.5 rounded-[2rem]`
- [ ] Inner core: own bg, `shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]`, `rounded-[calc(2rem-6px)]`
- [ ] Props: `hoverable` (adds lift on hover), `className`, `children`

### 2.6 Create `src/components/ui/SectionLabel.jsx`
- [ ] Renders: `<Badge>` eyebrow + `<h2>` heading + optional `<p>` subheading
- [ ] Framer Motion fade-up on scroll via `useScrollReveal`
- [ ] Props: `badge`, `heading`, `subheading`, `align` (left/center)

---

## PHASE 3 — LAYOUT COMPONENTS

### 3.1 Create `src/components/Navbar.jsx`
- [ ] Position: `fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max`
- [ ] Style: `backdrop-blur-xl bg-cream/80 ring-1 ring-espresso/10 rounded-full px-6 py-3`
- [ ] Logo: "Antara" in Playfair Display italic + "Studios" in light sans
- [ ] Nav links: Home, Templates, How It Works, Pricing, Portfolio — `text-sm font-medium`
- [ ] CTA: "Create Invitation" primary Button component
- [ ] Scroll effect: `useEffect` + `useState(scrolled)` — on scroll add more blur + slight shadow
- [ ] Mobile hamburger (visible below `md:`):
  - [ ] Two `<span>` lines, `absolute` positioned inside fixed-size wrapper
  - [ ] Open: line 1 = `rotate-45 translate-y-[5px]`, line 2 = `-rotate-45 -translate-y-[5px]`
  - [ ] Transition: `duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]`
- [ ] Mobile menu overlay:
  - [ ] `fixed inset-0 z-40 bg-cream/95 backdrop-blur-3xl flex flex-col items-center justify-center`
  - [ ] Framer Motion `AnimatePresence` — overlay fades in/out
  - [ ] Nav links stagger in: each `motion.div` with `variants={fadeUpVariant}` + increasing delay
  - [ ] Close on link click or outside tap

### 3.2 Create `src/components/Footer.jsx`
- [ ] Background: `bg-warm-100` with `border-t border-espresso/10`
- [ ] Top section: Logo + tagline "Crafting Memories, Digitally"
- [ ] 4-column grid (collapses to 2 on tablet, 1 on mobile):
  - Brand column: logo, tagline, social icons (Instagram, Pinterest, YouTube, Mail)
  - Templates column: links to template categories
  - Company column: About, Blog, Careers, Contact
  - Connect column: WhatsApp support link, email, trust badges
- [ ] Bottom bar: `border-t border-espresso/8` — copyright left, "Made with love" right
- [ ] Social icons: Lucide light stroke, `w-4 h-4`

---

## PHASE 4 — HOMEPAGE SECTIONS

### 4.1 Create `src/sections/Hero.jsx`
- [ ] Wrapper: `min-h-[100dvh] relative overflow-hidden flex items-center`
- [ ] Background: `radial-gradient(ellipse 80% 60% at 50% 40%, #F5EFE6 0%, #FDFBF7 70%)`
- [ ] Grain overlay: `<div className="grain-overlay" aria-hidden="true" />`
- [ ] Floating decorative elements (CSS `animate-float`):
  - [ ] 3 gold rings (`border border-gold/30 rounded-full`) at different sizes + positions
  - [ ] 5 gold dots (`bg-gold/20 rounded-full w-2 h-2`) scattered
- [ ] Content (centered, max-w-4xl):
  - [ ] `<Badge>` eyebrow: "✦ Digital Wedding Invitations"
  - [ ] `<h1>` split into words, each wrapped in `motion.span` with staggered `fadeUpVariant`
    - Line 1: "Beautiful Digital" — Playfair Display, `text-6xl md:text-8xl font-bold`
    - Line 2: "Invitations" — Playfair Display italic, gold color
    - Line 3: "Crafted in Minutes" — lighter weight, smaller, with animated SVG underline
  - [ ] `<p>` body copy: fade up after headline completes
  - [ ] Two CTA buttons: "Explore Templates" (primary) + "Watch Demo" (ghost) — fade up last
- [ ] Right side floating invitation card mockup (desktop only, `hidden md:block`):
  - [ ] `motion.div` with `animate={{ y: [0,-10,0] }}` float loop
  - [ ] Styled as invitation card: cream bg, gold border, couple name, date, floral corner accents (CSS)
  - [ ] Double-bezel outer shell
- [ ] Scroll indicator: `motion.div` animated pulsing chevron down + "Scroll to explore" text

### 4.2 Create `src/sections/DemoStrip.jsx`
- [ ] Section: `py-24 overflow-hidden`
- [ ] `<SectionLabel>` badge="Live Previews" heading="Experience Before You Decide"
- [ ] Horizontal scroll container: `flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4` (hide scrollbar via CSS)
- [ ] Framer Motion `drag="x"` on the inner flex container for desktop drag-scroll
- [ ] 4 invitation preview cards (snap-align-start):
  - Card 1 "Floral Romance": `bg-gradient-to-br from-blush to-pink-100`, couple: "Priya & Arjun", date: "Feb 14, 2025"
  - Card 2 "Royal Heritage": `bg-gradient-to-br from-red-900 to-yellow-900`, couple: "Meera & Vikram"
  - Card 3 "Modern Minimal": `bg-gradient-to-br from-stone-900 to-stone-700`, text white
  - Card 4 "Garden Dreams": `bg-gradient-to-br from-sage to-green-100`, couple: "Sara & James"
  - Each card: `w-72 flex-shrink-0 aspect-[9/16] rounded-[2rem]` with double-bezel, styled invitation content inside
- [ ] Hover overlay: "View Full Preview →" button slides up with `AnimatePresence`
- [ ] "View All Templates →" text link after container

### 4.3 Create `src/sections/Templates.jsx`
- [ ] Section: `py-32`
- [ ] `<SectionLabel>` + filter tabs
- [ ] Filter tabs: All | Hindu | Christian | Muslim | South Indian | Modern | Destination
  - [ ] `useState(activeFilter)` — active tab has gold underline + espresso text
  - [ ] Smooth tab indicator using `motion.div layoutId="tab-indicator"`
- [ ] Bento grid: `grid grid-cols-3 gap-4` (desktop), `grid-cols-2` (tablet), `grid-cols-1` (mobile)
  - [ ] Card 1: `col-span-2 row-span-2` — large featured template "Royal Rajasthani"
  - [ ] Cards 2-5: `col-span-1` standard
  - [ ] Card 6: `col-span-2` wide — "Modern Minimal" landscape
- [ ] Each template card:
  - [ ] Tall colored gradient background
  - [ ] Template name (bottom left, white Playfair Display)
  - [ ] Style badge (top right)
  - [ ] Star rating + usage count
  - [ ] Hover: overlay `bg-espresso/60 backdrop-blur-sm` slides up, reveals "Preview" + "Use Template" buttons
  - [ ] Framer Motion `whileHover` + `AnimatePresence` for overlay
- [ ] "Browse All 50+ Templates →" Button below grid

### 4.4 Create `src/sections/Features.jsx`
- [ ] Section: `py-32 bg-warm-50`
- [ ] `<SectionLabel>` badge="Platform Features" heading="Everything You Need" subheading="Optional modules — add only what matters to you"
- [ ] Stats row: 3 animated counters — "15+ Modules", "50+ Templates", "10k+ Invitations Sent"
  - [ ] Counter animates 0 → target when in viewport (using `useScrollReveal` + `useEffect`)
- [ ] Bento grid `grid grid-cols-4 gap-4` (desktop), `grid-cols-2` (tablet/mobile):
  - [ ] Large card (col-span-2 row-span-2): RSVP Management — icon + title + description + mini visual (styled table of RSVPs)
  - [ ] Medium card (col-span-2): Countdown Timer — live countdown display
  - [ ] Medium card (col-span-2): Venue Map & Directions — map pin icon + address block
  - [ ] Small cards (col-span-1 each): Background Music, Photo Gallery, QR Code, WhatsApp Sharing, Multilingual Support, Gift Registry, Dress Code, Accommodation, Event Schedule, Family Introductions, Password Protection, Analytics
- [ ] Each card: double-bezel, Lucide icon (light stroke), feature name bold, 1-line description
- [ ] Featured large cards have subtle gradient bg and mini illustration

### 4.5 Create `src/sections/HowItWorks.jsx`
- [ ] Section: `py-32`
- [ ] `<SectionLabel>` badge="Simple Process" heading="Three Steps to Your Dream Invitation"
- [ ] 3 step cards in `grid grid-cols-3 gap-8` (desktop), `grid-cols-1` (mobile):
  - [ ] Step 1: Choose Template — browse curated designs
  - [ ] Step 2: Add Your Details — names, date, venue, photos
  - [ ] Step 3: Share with Everyone — WhatsApp, QR code, unique link
- [ ] Each step card:
  - [ ] Ghost step number: Playfair Display `text-[120px] font-bold text-espresso/5 absolute -top-8 left-4`
  - [ ] Lucide icon in gold circle
  - [ ] Step title `text-xl font-semibold`
  - [ ] Description `text-sm text-espresso/60`
- [ ] Connecting dots/line between steps (desktop only): `hidden md:flex` absolute positioned dashes
- [ ] Staggered Framer Motion reveal: cards animate in left → center → right with 0.2s delay each
- [ ] "Start Creating Now →" primary Button below

### 4.6 Create `src/sections/AIPersonalization.jsx`
- [ ] Section: `py-32 bg-warm-50`
- [ ] Editorial split: `grid grid-cols-2 gap-16` (desktop), `grid-cols-1` (mobile)
- [ ] Left block:
  - [ ] `<Badge>` "Powered by AI"
  - [ ] `<h2>` "Intelligence Meets Elegance"
  - [ ] 4 feature bullets with icon + text:
    - AI Wording Generator
    - Color Palette from Your Photos
    - Smart Font Pairing
    - Automated Event Schedule
  - [ ] "Try AI Features →" primary Button
- [ ] Right block: animated demo card
  - [ ] Double-bezel card showing typewriter animation: text types out invitation wording character by character
  - [ ] `useState(text)` + `useEffect` interval to simulate typing
  - [ ] Soft glowing background orb: `absolute` positioned `rounded-full bg-gold/20 blur-3xl w-64 h-64`
  - [ ] "AI Generated" badge top-right of card

### 4.7 Create `src/sections/Pricing.jsx`
- [ ] Section: `py-32`
- [ ] `<SectionLabel>` badge="Pricing" heading="Simple, Transparent Pricing"
- [ ] Monthly/Annual toggle: `useState(isAnnual)` — toggle switch UI, annual shows "Save 30%" badge
- [ ] 3 pricing cards in `grid grid-cols-3 gap-6` (desktop), `grid-cols-1` (mobile):
  - Free: ₹0/mo — 1 invitation, basic templates, standard link
  - Premium (RECOMMENDED): ₹499/mo or ₹349/mo annual — 5 invitations, all features, analytics, custom domain
  - Elite: ₹999/mo or ₹699/mo annual — unlimited, white-label, AI features, priority support
- [ ] Recommended card:
  - [ ] `scale-105` (desktop)
  - [ ] `ring-2 ring-gold`
  - [ ] "Most Popular" `<Badge>` at top
  - [ ] Different background: `bg-espresso text-cream` (dark card)
- [ ] Each card features checklist: `✓` items with `text-sage` checkmarks, `✗` grayed out for unavailable
- [ ] CTA button per card ("Get Started Free" / "Start Premium" / "Go Elite")
- [ ] Trust note below: "30-day money-back guarantee • No credit card for free plan"

### 4.8 Create `src/sections/Testimonials.jsx`
- [ ] Section: `py-32 bg-warm-100`
- [ ] `<SectionLabel>` badge="Love Stories" heading="What Couples Are Saying"
- [ ] 5 testimonials array (hardcoded data)
- [ ] `useState(current, 0)` + `useEffect` autoplay interval 5000ms
- [ ] Pause autoplay on hover (`onMouseEnter/Leave` → `clearInterval/setInterval`)
- [ ] `AnimatePresence mode="wait"` for slide transitions
- [ ] Each slide:
  - [ ] Large `"` quote mark in Playfair Display gold (decorative)
  - [ ] Quote text: Playfair Display italic, `text-xl md:text-2xl`
  - [ ] Couple avatar: circular `div` with gradient + initials (no real image)
  - [ ] Couple name: bold sans, wedding date: light sans
  - [ ] 5 gold stars
  - [ ] Wedding style tag: "Hindu Wedding, Jaipur"
- [ ] Prev/Next arrow buttons (left/right of card)
- [ ] Dot indicators below: active dot = gold filled, others = espresso/20

### 4.9 Create `src/sections/Portfolio.jsx`
- [ ] Section: `py-32`
- [ ] `<SectionLabel>` badge="Our Portfolio" heading="Invitations Across Every Culture"
- [ ] Masonry-style using `columns-3 gap-4` (desktop), `columns-2` (tablet), `columns-1` (mobile)
- [ ] 9 portfolio items with different heights (`h-48`, `h-64`, `h-80` varied):
  - Hindu Rajasthani — deep red/gold gradient
  - South Indian Hindu — turmeric/vermilion gradient
  - Christian Church — navy/silver gradient
  - Muslim Nikah — emerald/gold gradient
  - Destination Goa — teal/coral gradient
  - Beach Wedding — sandy/sky gradient
  - Modern Minimalist — charcoal/cream gradient
  - Royal Heritage — burgundy/champagne gradient
  - Garden Bohemian — sage/blush gradient
- [ ] Each item: `break-inside-avoid rounded-2xl overflow-hidden relative`
- [ ] Overlay on hover: semi-transparent dark overlay slides up, shows style name + "View Design"
- [ ] "See Full Portfolio →" Button below

### 4.10 Create `src/sections/FAQ.jsx`
- [ ] Section: `py-32 bg-warm-50`
- [ ] 2-column layout: left `<SectionLabel>` + "Still have questions? Contact us" link, right accordion
- [ ] `useState(openIndex, null)` — only one open at a time
- [ ] 8 FAQ items (hardcoded array of `{ question, answer }`)
- [ ] Each item:
  - [ ] Header row: question text + `ChevronDown` icon (rotates `180deg` when open)
  - [ ] `AnimatePresence` + `motion.div` for answer — `initial={{ height:0, opacity:0 }}` → `animate={{ height:'auto', opacity:1 }}`
  - [ ] Bottom border separator `border-b border-espresso/10`
- [ ] Click toggles `openIndex === i ? null : i`

### 4.11 Create `src/sections/CTABanner.jsx`
- [ ] Full-width section: `py-32 bg-gradient-to-br from-warm-200 via-champagne to-warm-100 relative overflow-hidden`
- [ ] Floating decorative rings (CSS `animate-float` at different speeds)
- [ ] Centered content:
  - [ ] `<h2>` "Start Your Wedding Story Today" — Playfair Display, large
  - [ ] `<p>` "Join 10,000+ couples who chose Antara Studios"
  - [ ] Two Buttons: "Create Free Invitation" (primary dark) + "View Templates" (outline)
- [ ] Framer Motion: content `fadeUpVariant` on scroll

---

## PHASE 5 — PAGES

### 5.1 Create `src/pages/Home.jsx`
- [ ] Import all 11 sections
- [ ] Render in order inside `<main className="pt-24">`:
  Hero → DemoStrip → Templates → Features → HowItWorks → AIPersonalization → Pricing → Testimonials → Portfolio → FAQ → CTABanner
- [ ] No additional logic needed — sections manage their own state/animations

### 5.2 Create `src/pages/TemplatesPage.jsx`
- [ ] Hero bar: dark espresso background, "All Templates" h1, subtitle
- [ ] Search input (top center): `rounded-full ring-1 ring-espresso/20 px-5 py-3`
- [ ] Filter sidebar (left, `w-64`) + Template grid (right):
  - Filters: Style checkboxes, Color swatches, Culture (checkboxes), Price (Free/Premium radio)
- [ ] Grid: `grid-cols-3` (desktop), `grid-cols-2` (tablet), `grid-cols-1` (mobile), 12 template cards
- [ ] Sort dropdown: Popular | Newest | Price: Low to High
- [ ] "Load More" button at bottom (simulated — just renders more static cards)
- [ ] Mobile: filter collapses into a "Filters" bottom sheet triggered by button

### 5.3 Create `src/pages/PricingPage.jsx`
- [ ] Reuse `<Pricing />` section component at top
- [ ] Feature comparison table below:
  - [ ] `<table>` with rows = features, columns = Free | Premium | Elite
  - [ ] Alternating row backgrounds (`bg-warm-50`)
  - [ ] `✓` (sage) / `✗` (espresso/30) / text values in cells
- [ ] Pricing FAQ section (4 pricing-specific questions)
- [ ] CTA banner at bottom

### 5.4 Create `src/pages/CreatePage.jsx`
- [ ] No Navbar/Footer padding — full immersive creation experience
- [ ] Top bar: "Antara Studios" logo (left) + step indicator (center) + "Save Draft" (right)
- [ ] Step indicator: `Step 1 of 5` + progress bar `w-[20%]` → `w-[40%]` etc
- [ ] `useState(step, 1)` for current step
- [ ] Auto-save simulation: every 3s show "Saving..." → "Saved ✓" with `useEffect` + `setInterval`
- [ ] Step 1 — Choose Template:
  - [ ] `grid grid-cols-3 gap-4` of template cards
  - [ ] Click to select: selected card gets `ring-2 ring-gold scale-[1.02]`
  - [ ] `useState(selectedTemplate)`
- [ ] Step 2 — Couple Details:
  - [ ] Form fields: Bride Name, Groom Name, Wedding Date (date input), Venue Name, Venue City
  - [ ] Large elegant inputs: `rounded-2xl ring-1 ring-espresso/20 px-5 py-4 font-display`
  - [ ] Floating label animation on focus (CSS `:focus-within`)
  - [ ] `useState(formData)` controlled inputs
- [ ] Step 3 — Upload Photos:
  - [ ] Drag-drop zone: `border-2 border-dashed border-espresso/20 rounded-3xl p-12 text-center`
  - [ ] `onDragOver`, `onDrop` handlers (just `preventDefault` for now, no real upload)
  - [ ] Photo slots: Couple Photo, Family Photo 1, Family Photo 2 (placeholders with `+` icon)
- [ ] Step 4 — Customize:
  - [ ] Color palette row: 6 preset palettes (click to select)
  - [ ] Font selector: 3 font pairings (click to preview)
  - [ ] Optional modules checklist: toggle switches for RSVP, Countdown, Music, Map, Gallery
- [ ] Step 5 — Preview & Publish:
  - [ ] Full invitation preview (styled div matching selected template)
  - [ ] "Your unique link": `antara.studio/invite/your-name` (static display)
  - [ ] Share buttons: Copy Link, WhatsApp, Download QR Code (all static/visual)
  - [ ] "Publish Invitation" primary Button (shows success toast)
- [ ] Back/Next buttons with validation (Next disabled if required fields empty)
- [ ] Framer Motion page transitions between steps: `AnimatePresence` slide left/right

---

## PHASE 6 — APP SHELL & ROUTING

### 6.1 Create `src/App.jsx`
- [ ] Import `BrowserRouter`, `Routes`, `Route`, `useLocation` from react-router-dom
- [ ] Import `AnimatePresence` from framer-motion
- [ ] Import Navbar, Footer, Home, TemplatesPage, PricingPage, CreatePage
- [ ] Inner component `AppContent` (to use `useLocation` inside router):
  - [ ] `const location = useLocation()`
  - [ ] Render `<Navbar />` (hidden on `/create` route)
  - [ ] `<AnimatePresence mode="wait">` wrapping `<Routes key={location.pathname}>`
  - [ ] Routes: `/` → Home, `/templates` → TemplatesPage, `/pricing` → PricingPage, `/create` → CreatePage
  - [ ] Render `<Footer />` (hidden on `/create` route)
- [ ] Each page wrapped in `<motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}`

### 6.2 Update `src/main.jsx`
- [ ] `import React from 'react'`
- [ ] `import ReactDOM from 'react-dom/client'`
- [ ] `import App from './App.jsx'`
- [ ] `import './index.css'`
- [ ] `ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)`

---

## PHASE 7 — TAILWIND CONFIG (Full Values)

```js
// tailwind.config.js
colors: {
  cream: '#FDFBF7',
  warm: { 50:'#FDF8F3', 100:'#F5EFE6', 200:'#EDE0D0', 300:'#E0CCBA', 400:'#C9B49A' },
  espresso: { DEFAULT:'#2C1810', light:'#4A2C1C', 50:'#F7F0EB' },
  gold: { DEFAULT:'#C9A96E', light:'#DFC088', dark:'#A8883A' },
  sage: { DEFAULT:'#7A8C6E', light:'#9AAD8C', dark:'#5C6E52' },
  blush: '#E8C4B8',
  champagne: '#F0E2C8',
},
fontFamily: {
  display: ['"Playfair Display"', 'Georgia', 'serif'],
  sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
},
transitionTimingFunction: {
  spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
},
animation: {
  'float': 'float 6s ease-in-out infinite',
  'float-slow': 'float 10s ease-in-out infinite',
  'float-delay': 'float 8s ease-in-out 2s infinite',
  'fade-up': 'fadeUp 0.8s cubic-bezier(0.32,0.72,0,1) forwards',
  'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
  'shimmer': 'shimmer 2s linear infinite',
},
keyframes: {
  float: { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-14px)' } },
  fadeUp: { from:{ opacity:'0', transform:'translateY(32px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
  pulseSoft: { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.55' } },
  shimmer: { from:{ backgroundPosition:'-200% 0' }, to:{ backgroundPosition:'200% 0' } },
},
```

---

## PHASE 8 — PERFORMANCE & ACCESSIBILITY

### 8.1 Performance Rules (enforced throughout all files)
- [ ] Animate ONLY `transform` + `opacity` — never `width`, `height`, `top`, `left`
- [ ] `backdrop-blur` ONLY on fixed Navbar + mobile overlay (never on scroll containers)
- [ ] `IntersectionObserver` for all scroll reveals (never `window.addEventListener('scroll')`)
- [ ] `will-change: transform` only on actively animating floating elements
- [ ] No external image URLs — all visuals are CSS gradients + styled divs

### 8.2 Accessibility
- [ ] `aria-label` on all icon-only buttons (hamburger, close, prev/next arrows)
- [ ] `role="navigation"` + `aria-label="Main navigation"` on `<nav>`
- [ ] Semantic HTML: `<header>`, `<main>`, `<section aria-label="...">`, `<footer>`
- [ ] Focus ring visible on all interactive elements (Tailwind `focus-visible:ring-2`)
- [ ] FAQ `<button>` with `aria-expanded` attribute
- [ ] Color contrast: espresso on cream passes WCAG AA

### 8.3 Responsive Breakpoints
- [ ] All sections: `min-h-[100dvh]` NOT `h-screen` (fixes iOS Safari jump)
- [ ] Max content width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [ ] All grid layouts: start `grid-cols-1`, scale up with `md:grid-cols-2 lg:grid-cols-3`
- [ ] Bento grid asymmetry (col-span-2 etc) ONLY from `md:` upward
- [ ] Touch targets minimum `44x44px` on all clickable elements

---

## PHASE 9 — FINAL VERIFICATION

### 9.1 Dev Server Check
- [ ] `npm run dev` → no errors in terminal
- [ ] Browser: `localhost:5173` loads homepage
- [ ] No console errors or React key warnings
- [ ] Google Fonts loaded (check Network tab)

### 9.2 Page-by-Page QA
- [ ] `/` — All 11 sections render, correct order, no overflow
- [ ] `/templates` — Filter tabs work, grid renders 12 cards
- [ ] `/pricing` — Toggle switches Annual/Monthly, comparison table renders
- [ ] `/create` — Step 1→5 navigation works, progress bar updates

### 9.3 Interaction QA
- [ ] Navbar: floats, blurs on scroll, hamburger morphs to X on mobile
- [ ] Mobile menu: opens full screen, links stagger in, closes on click
- [ ] Hero: headline words animate in staggered, floating card floats
- [ ] DemoStrip: drag to scroll on desktop
- [ ] Templates: filter tabs switch with smooth indicator
- [ ] Features: stat counters animate on scroll
- [ ] HowItWorks: steps stagger in on scroll
- [ ] AIPersonalization: typewriter animation runs
- [ ] Pricing: toggle updates prices, recommended card highlighted
- [ ] Testimonials: carousel auto-plays, pauses on hover, arrows work
- [ ] Portfolio: hover overlay slides up
- [ ] FAQ: accordion opens/closes smoothly, only one open at a time
- [ ] CreatePage: form fields controlled, step validation works

### 9.4 Visual QA
- [ ] Warm cream background throughout (no pure white `#fff`)
- [ ] Playfair Display renders for all headings
- [ ] Plus Jakarta Sans renders for all body text
- [ ] Gold accent appears consistently (badges, highlights, active states)
- [ ] Double-bezel cards visible on Features, DemoStrip, AIPersonalization sections
- [ ] No horizontal scrollbar on any page at 375px, 768px, 1280px widths
- [ ] Section padding is generous (`py-24` minimum)
- [ ] Typography hierarchy clear: `text-5xl` headings → `text-lg` subheads → `text-sm` body

---

## FILE CREATION ORDER

```
01. package.json            (manual write or vite init)
02. vite.config.js
03. tailwind.config.js
04. postcss.config.js
05. index.html
06. src/index.css
07. src/main.jsx
08. src/utils/animations.js
09. src/hooks/useScrollReveal.js
10. src/components/ui/Button.jsx
11. src/components/ui/Badge.jsx
12. src/components/ui/Card.jsx
13. src/components/ui/SectionLabel.jsx
14. src/components/Navbar.jsx
15. src/components/Footer.jsx
16. src/sections/Hero.jsx
17. src/sections/DemoStrip.jsx
18. src/sections/Templates.jsx
19. src/sections/Features.jsx
20. src/sections/HowItWorks.jsx
21. src/sections/AIPersonalization.jsx
22. src/sections/Pricing.jsx
23. src/sections/Testimonials.jsx
24. src/sections/Portfolio.jsx
25. src/sections/FAQ.jsx
26. src/sections/CTABanner.jsx
27. src/pages/Home.jsx
28. src/pages/TemplatesPage.jsx
29. src/pages/PricingPage.jsx
30. src/pages/CreatePage.jsx
31. src/App.jsx
32. src/main.jsx            (final update)
```

---

## DEPENDENCIES REFERENCE

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "framer-motion": "^11.12.0",
  "lucide-react": "^0.468.0"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.49",
  "tailwindcss": "^3.4.16",
  "vite": "^6.0.1"
}
```

---

*Total files: 32 | Sections: 11 | Pages: 4 | Shared components: 7 | Utility files: 2*
