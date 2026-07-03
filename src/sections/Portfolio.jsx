import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'

const portfolioItems = [
  { id: 1, name: 'Hindu Rajasthani', height: 'h-80', bg: 'bg-gradient-to-br from-red-800 via-orange-800 to-yellow-700' },
  { id: 2, name: 'South Indian Hindu', height: 'h-48', bg: 'bg-gradient-to-br from-yellow-600 to-orange-500' },
  { id: 3, name: 'Christian Church', height: 'h-64', bg: 'bg-gradient-to-br from-blue-900 to-slate-700' },
  { id: 4, name: 'Muslim Nikah', height: 'h-64', bg: 'bg-gradient-to-br from-emerald-800 to-yellow-700' },
  { id: 5, name: 'Destination Goa', height: 'h-48', bg: 'bg-gradient-to-br from-teal-500 to-coral-400 bg-gradient-to-br from-teal-500 to-orange-400' },
  { id: 6, name: 'Beach Wedding', height: 'h-80', bg: 'bg-gradient-to-br from-amber-200 to-sky-400' },
  { id: 7, name: 'Modern Minimalist', height: 'h-64', bg: 'bg-gradient-to-br from-stone-800 to-stone-500' },
  { id: 8, name: 'Royal Heritage', height: 'h-48', bg: 'bg-gradient-to-br from-rose-900 to-amber-700' },
  { id: 9, name: 'Garden Bohemian', height: 'h-64', bg: 'bg-gradient-to-br from-sage to-blush' },
]

function PortfolioItem({ item }) {
  return (
    <motion.div
      className={`break-inside-avoid rounded-2xl overflow-hidden relative group mb-4 ${item.bg} ${item.height}`}
      whileHover="hover"
      initial="rest"
    >
      {/* Overlay on hover */}
      <AnimatePresence>
        <motion.div
          variants={{
            rest: { opacity: 0, y: '100%' },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 bg-espresso/70 backdrop-blur-sm flex flex-col items-center justify-end pb-6 gap-3"
        >
          <span className="text-cream font-display font-semibold text-lg">{item.name}</span>
          <button className="px-5 py-2 bg-gold text-espresso text-xs font-semibold rounded-full hover:bg-gold-light transition-colors duration-300">
            View Design
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Style name always visible at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
        <span className="text-white/80 text-xs font-medium">{item.name}</span>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  return (
    <section className="py-32" aria-label="Portfolio" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel
          badge="Our Portfolio"
          heading="Invitations Across Every Culture"
          align="center"
        />

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {portfolioItems.map((item) => (
            <PortfolioItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/templates">
            <Button size="lg" variant="outline">See Full Portfolio</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
