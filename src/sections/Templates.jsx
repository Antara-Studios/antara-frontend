import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'

const filters = ['All', 'Hindu', 'Christian', 'Muslim', 'South Indian', 'Modern', 'Destination']

const templates = [
  {
    id: 1,
    name: 'Royal Rajasthani',
    style: 'Hindu',
    bg: 'bg-gradient-to-br from-red-900 via-orange-900 to-yellow-800',
    rating: 4.9,
    uses: '2.1k',
    featured: true,
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 2,
    name: 'Garden Bloom',
    style: 'Christian',
    bg: 'bg-gradient-to-br from-blush to-pink-200',
    rating: 4.8,
    uses: '1.4k',
    span: 'col-span-1',
  },
  {
    id: 3,
    name: 'Emerald Nikah',
    style: 'Muslim',
    bg: 'bg-gradient-to-br from-emerald-800 to-teal-700',
    rating: 4.7,
    uses: '980',
    span: 'col-span-1',
  },
  {
    id: 4,
    name: 'Lotus Mandapam',
    style: 'South Indian',
    bg: 'bg-gradient-to-br from-yellow-700 to-amber-600',
    rating: 4.9,
    uses: '1.8k',
    span: 'col-span-1',
  },
  {
    id: 5,
    name: 'Seaside Vows',
    style: 'Destination',
    bg: 'bg-gradient-to-br from-sky-700 to-cyan-500',
    rating: 4.6,
    uses: '760',
    span: 'col-span-1',
  },
  {
    id: 6,
    name: 'Modern Minimal',
    style: 'Modern',
    bg: 'bg-gradient-to-br from-stone-800 to-stone-600',
    rating: 4.8,
    uses: '3.2k',
    span: 'lg:col-span-2',
  },
]

function TemplateCard({ template }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${template.bg} group ${template.span} h-full`}
      style={{ minHeight: '200px' }}
      whileHover="hover"
      initial="rest"
    >
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Top: Style badge + rating */}
        <div className="flex items-start justify-between">
          <span className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-full bg-black/30 text-white/80 backdrop-blur-sm">
            {template.style}
          </span>
          <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-[10px] text-white/80">{template.rating}</span>
          </div>
        </div>

        {/* Bottom: Name + uses */}
        <div>
          <h3 className="font-display text-xl font-bold text-white">{template.name}</h3>
          <p className="text-xs text-white/50 mt-0.5">{template.uses} couples</p>
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        <motion.div
          variants={{
            rest: { opacity: 0, y: '100%' },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 bg-espresso/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6"
        >
          <button className="w-full py-2.5 bg-cream text-espresso text-xs font-semibold rounded-full hover:bg-gold transition-colors duration-300">
            Preview
          </button>
          <Link to="/create" className="w-full">
            <button className="w-full py-2.5 bg-gold text-espresso text-xs font-semibold rounded-full hover:bg-gold-light transition-colors duration-300">
              Use Template
            </button>
          </Link>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function Templates() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? templates
    : templates.filter((t) => t.style === activeFilter)

  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-label="Templates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel heading="50+ Premium Templates" align="center" accent="gradient" />

        {/* Filter Tabs — scrollable row on mobile, centered wrap on desktop */}
        <div className="flex items-center gap-1 mb-8 md:mb-12 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap hide-scrollbar scroll-touch pb-1 flex-nowrap sm:flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                relative flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                ${activeFilter === filter ? 'text-espresso' : 'text-espresso/50 hover:text-espresso/80'}
              `}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-warm-200 rounded-full"
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </div>

        {/* Mobile: horizontal swipe strip — hidden on md+ */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-touch pb-2" style={{ marginLeft: '-1rem', marginRight: '-1rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <div className="flex gap-3">
          {filtered.map((template) => (
            <div
              key={template.id}
              className="flex-shrink-0 snap-start w-[72vw] xs:w-[65vw] h-56"
            >
              <TemplateCard template={template} />
            </div>
          ))}
          </div>
        </div>

        {/* Desktop: Bento Grid — hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link to="/templates">
            <Button size="lg" variant="outline">Browse All 50+ Templates</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
