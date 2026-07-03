import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <motion.div
      className={`relative w-72 flex-shrink-0 snap-start ${card.bg} rounded-[2rem] overflow-hidden group`}
      style={{ aspectRatio: '9/16' }}
      whileHover="hover"
      initial="rest"
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

      {/* Hover Overlay */}
      <AnimatePresence>
        <motion.div
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 bg-espresso/70 backdrop-blur-sm flex items-end justify-center pb-8 z-20"
        >
          <button className="px-6 py-2.5 bg-cream text-espresso text-xs font-semibold rounded-full hover:bg-gold transition-colors duration-300">
            View Full Preview →
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Template name badge */}
      <div className="absolute top-4 left-4 z-30">
        <span className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-full bg-black/20 text-white/80">
          {card.name}
        </span>
      </div>
    </motion.div>
  )
}

export default function DemoStrip() {
  const constraintsRef = useRef(null)

  return (
    <section className="py-24 overflow-hidden" aria-label="Live Previews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel badge="Live Previews" heading="Experience Before You Decide" align="center" />
      </div>

      {/* Drag scroll container */}
      <div ref={constraintsRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          className="flex gap-6 px-4 sm:px-8 lg:px-16 pb-4 cursor-grab active:cursor-grabbing overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))' }}
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
