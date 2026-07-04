import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import Button from '../components/ui/Button'
import { fadeUpVariant, staggerContainer } from '../utils/animations'

const headlineWords = ['Beautiful', 'Digital']
const headline2 = 'Invitations'
const headline3 = ['Crafted', 'in', 'Minutes']

export default function Hero() {
  return (
    <section
      className="min-h-[100dvh] relative overflow-hidden flex items-center"
      aria-label="Hero"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #F5EFE6 0%, #FDFBF7 70%)',
      }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Floating decorative rings — hidden on mobile to prevent bleed */}
      <div aria-hidden="true" className="pointer-events-none">
        <div className="hidden sm:block absolute top-1/4 left-[8%] w-32 h-32 border border-gold/30 rounded-full animate-float" style={{ willChange: 'transform' }} />
        <div className="hidden sm:block absolute top-[55%] left-[4%] w-20 h-20 border border-gold/20 rounded-full animate-float-slow" style={{ willChange: 'transform' }} />
        <div className="hidden sm:block absolute top-[20%] right-[6%] w-48 h-48 border border-gold/15 rounded-full animate-float-delay" style={{ willChange: 'transform' }} />
        {/* Gold dots — visible on all screens */}
        <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-gold/20 rounded-full animate-pulse-soft" />
        <div className="absolute top-[65%] left-[15%] w-2 h-2 bg-gold/30 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] right-[18%] w-2 h-2 bg-gold/25 rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[75%] right-[25%] w-2 h-2 bg-gold/20 rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[15%] right-[35%] w-2 h-2 bg-gold/30 rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 pt-24 sm:pt-28 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 sm:gap-8"
          >
            {/* Headline */}
            <div className="flex flex-col gap-1">
              {/* Line 1: Beautiful Digital */}
              <div className="flex flex-wrap gap-x-3 sm:gap-x-4 overflow-hidden">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={word}
                    variants={fadeUpVariant}
                    custom={i}
                    className="font-display text-[2.75rem] xs:text-5xl sm:text-6xl md:text-8xl font-bold text-espresso leading-none"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 2: Invitations (italic gold) */}
              <motion.div variants={fadeUpVariant} className="overflow-hidden">
                <span className="font-display text-[2.75rem] xs:text-5xl sm:text-6xl md:text-8xl font-bold italic text-gold leading-none">
                  {headline2}
                </span>
              </motion.div>

              {/* Line 3: Crafted in Minutes + SVG underline */}
              <div className="flex flex-col items-start gap-1 mt-2 overflow-hidden">
                <div className="flex flex-wrap gap-x-2 sm:gap-x-3 items-center">
                  {headline3.map((word, i) => (
                    <motion.span
                      key={word + i}
                      variants={fadeUpVariant}
                      custom={i + 3}
                      className="font-display text-xl sm:text-3xl md:text-4xl font-normal text-espresso/70 leading-none"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                {/* Animated SVG underline — on its own line so it never wraps into words */}
                <motion.svg
                  variants={fadeUpVariant}
                  custom={6}
                  viewBox="0 0 120 8"
                  className="w-24 md:w-32 h-2 text-gold"
                  fill="none"
                >
                  <motion.path
                    d="M2 6 Q30 2 60 6 Q90 10 118 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1, ease: [0.32, 0.72, 0, 1] }}
                  />
                </motion.svg>
              </div>
            </div>

            {/* CTA Buttons — stack vertically on mobile */}
            <motion.div variants={fadeUpVariant} custom={4} className="flex flex-col xs:flex-row gap-3 mt-2 sm:mt-4">
              <Link to="/templates" className="w-full xs:w-auto">
                <Button size="md" variant="primary" className="w-full xs:w-auto sm:!px-8 sm:!py-4 sm:!text-base">Explore Templates</Button>
              </Link>
              <Button size="md" variant="ghost" className="w-full xs:w-auto sm:!px-8 sm:!py-4 sm:!text-base">Watch Demo</Button>
            </motion.div>
          </motion.div>

          {/* Floating Invitation Card Mockup (desktop only) */}
          <div className="hidden lg:flex justify-center items-center relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ willChange: 'transform' }}
              className="relative"
            >
              {/* Outer bezel */}
              <div className="bg-warm-100/60 ring-1 ring-espresso/8 p-2 rounded-[2.5rem] shadow-2xl shadow-espresso/10">
                {/* Inner card */}
                <div className="bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] rounded-[calc(2.5rem-8px)] w-72 p-8 flex flex-col items-center gap-6 relative overflow-hidden">
                  {/* Floral corner accents */}
                  <div aria-hidden="true" className="absolute top-4 left-4 w-16 h-16 border border-gold/20 rounded-full" />
                  <div aria-hidden="true" className="absolute top-4 left-4 w-10 h-10 border border-gold/15 rounded-full" />
                  <div aria-hidden="true" className="absolute bottom-4 right-4 w-16 h-16 border border-gold/20 rounded-full" />
                  <div aria-hidden="true" className="absolute bottom-4 right-4 w-10 h-10 border border-gold/15 rounded-full" />

                  {/* Gold border frame */}
                  <div className="absolute inset-4 border border-gold/30 rounded-[1.5rem] pointer-events-none" />

                  <div className="flex flex-col items-center gap-4 relative z-10 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">Together with their families</p>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="font-display text-2xl font-bold text-espresso">Priya</h3>
                      <span className="font-display text-gold text-lg italic">&amp;</span>
                      <h3 className="font-display text-2xl font-bold text-espresso">Arjun</h3>
                    </div>
                    <div className="w-16 h-px bg-gold/30" />
                    <p className="text-xs text-espresso/60 tracking-wide">request the pleasure of your company</p>
                    <div className="flex flex-col items-center gap-1">
                      <p className="font-display text-sm font-semibold text-espresso">14th February 2025</p>
                      <p className="text-[11px] text-espresso/50">The Grand Leela Palace, Udaipur</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[9px] uppercase tracking-widest">Hindu Ceremony</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-gold text-espresso text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                Live Preview
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 inset-x-0 mx-auto w-fit flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-espresso/40">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-espresso/40" />
      </motion.div>
    </section>
  )
}
