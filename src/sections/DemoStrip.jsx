import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../components/ui/SectionLabel'

const cards = [
  {
    id: 1,
    name: 'Floral Romance',
    couple: 'Priya & Arjun',
    date: 'Feb 14, 2025',
    venue: 'Leela Palace, Udaipur',
    bg: 'bg-gradient-to-br from-blush to-pink-100',
    textColor: 'text-espresso',
    accentColor: 'border-pink-300/50',
    style: 'Hindu Wedding',
  },
  {
    id: 2,
    name: 'Royal Heritage',
    couple: 'Meera & Vikram',
    date: 'Mar 22, 2025',
    venue: 'Umaid Bhawan, Jodhpur',
    bg: 'bg-gradient-to-br from-red-900 to-yellow-900',
    textColor: 'text-yellow-100',
    accentColor: 'border-yellow-600/40',
    style: 'Rajasthani',
  },
  {
    id: 3,
    name: 'Modern Minimal',
    couple: 'Ananya & Rohan',
    date: 'Apr 5, 2025',
    venue: 'The Taj, Mumbai',
    bg: 'bg-gradient-to-br from-stone-900 to-stone-700',
    textColor: 'text-stone-100',
    accentColor: 'border-stone-500/40',
    style: 'Contemporary',
  },
  {
    id: 4,
    name: 'Garden Dreams',
    couple: 'Sara & James',
    date: 'May 18, 2025',
    venue: 'Bloom Estate, Goa',
    bg: 'bg-gradient-to-br from-sage to-green-100',
    textColor: 'text-espresso',
    accentColor: 'border-sage-dark/30',
    style: 'Destination',
  },
]

function InvitationCard({ card }) {
  return (
    <div
      className={`relative w-52 xs:w-60 sm:w-72 flex-shrink-0 snap-start ${card.bg} rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden`}
      style={{ aspectRatio: '9/16' }}
    >
      {/* Outer bezel sim */}
      <div className="absolute inset-1.5 border border-white/10 rounded-[calc(2rem-6px)] pointer-events-none z-10" />

      {/* Card Content */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 ${card.textColor}`}>
        <div className={`absolute inset-6 border ${card.accentColor} rounded-[1.5rem]`} />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.3em] opacity-60">{card.style}</span>
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-display text-3xl font-bold leading-none">{card.couple.split(' & ')[0]}</h3>
            <span className="font-display text-xl italic opacity-70">&amp;</span>
            <h3 className="font-display text-3xl font-bold leading-none">{card.couple.split(' & ')[1]}</h3>
          </div>
          <div className="w-12 h-px bg-current opacity-20" />
          <div className="text-center">
            <p className="text-xs font-medium opacity-80">{card.date}</p>
            <p className="text-[11px] opacity-50 mt-0.5">{card.venue}</p>
          </div>
        </div>
      </div>

      {/* Always-visible preview button at bottom — tap-friendly on mobile */}
      <div className="absolute bottom-0 inset-x-0 z-20 pb-6 flex justify-center">
        <button className="px-5 py-2.5 bg-cream/90 text-espresso text-xs font-semibold rounded-full backdrop-blur-sm active:bg-gold hover:bg-gold transition-colors duration-300">
          View Full Preview →
        </button>
      </div>

      {/* Template name badge */}
      <div className="absolute top-4 left-4 z-30">
        <span className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-full bg-black/20 text-white/80">
          {card.name}
        </span>
      </div>
    </div>
  )
}

export default function DemoStrip() {
  const constraintsRef = useRef(null)

  return (
    <section className="py-16 sm:py-20 lg:py-24 overflow-hidden" aria-label="Live Previews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel heading="Experience Before You Decide" align="center" accent="underline:Experience" />
      </div>

      {/* Scroll container: touch-pan-y allows vertical page scroll on mobile,
          hide-scrollbar hides the scrollbar, scroll-touch enables iOS momentum */}
      <div ref={constraintsRef} className="overflow-hidden touch-pan-y">
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          className="flex gap-4 sm:gap-6 pb-4 cursor-grab active:cursor-grabbing overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-touch"
          style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))', paddingRight: '1rem' }}
        >
          {cards.map((card) => (
            <InvitationCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex justify-center">
        <Link
          to="/templates"
          className="text-sm font-medium text-espresso/60 hover:text-gold transition-colors duration-300 flex items-center gap-1"
        >
          View All Templates →
        </Link>
      </div>
    </section>
  )
}
