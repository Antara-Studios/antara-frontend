import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useAuthModal } from '../context/AuthModalContext'
import { getTemplatePrice } from '../data/templatePricing'

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

function TemplateCard({ template, onUseTemplate }) {
  const price = getTemplatePrice(template.id)
  return (
    <div>
      {/* Card visual */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl ${template.bg}`}
        style={{ minHeight: '200px' }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          {/* Top: Style + price badges */}
          <div className="flex items-start justify-between">
            <span className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-full bg-black/30 text-white/80 backdrop-blur-sm">
              {template.style}
            </span>
            <span className="text-[9px] px-2 py-1 rounded-full bg-black/30 text-white/80 backdrop-blur-sm font-medium">
              {price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`}
            </span>
          </div>

          {/* Bottom: Name + uses */}
          <div>
            <h3 className="font-display text-xl font-bold text-white">{template.name}</h3>
            <p className="text-xs text-white/50 mt-0.5">{template.uses} couples</p>
          </div>
        </div>
      </motion.div>

      {/* Actions — below the card */}
      <div className="flex items-center gap-2 mt-3">
        <button className="flex-1 py-2 rounded-full text-xs font-medium ring-1 ring-espresso/15 text-espresso/70 hover:ring-espresso/30 hover:text-espresso transition-all duration-200 active:scale-[0.97]">
          Preview
        </button>
        <button
          onClick={onUseTemplate}
          className="flex-1 py-2 rounded-full text-xs font-medium bg-espresso text-cream hover:bg-espresso-light transition-all duration-200 active:scale-[0.97]"
        >
          Use Template
        </button>
      </div>
    </div>
  )
}

export default function Templates() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { user } = useAuth()
  const { openAuthModal } = useAuthModal()
  const navigate = useNavigate()

  const filtered = activeFilter === 'All'
    ? templates
    : templates.filter((t) => t.style === activeFilter)

  function handleUseTemplate(template) {
    if (!user) {
      openAuthModal({
        mode: 'login',
        redirectAfter: { path: '/create', state: { preselectedTemplateId: template.id } },
      })
    } else {
      navigate('/create', { state: { preselectedTemplateId: template.id } })
    }
  }

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

        {/* Mobile: centered snap carousel — hidden on md+ */}
        <div
          className="md:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-touch pb-2"
          style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
        >
          <div className="flex" style={{ paddingLeft: 'calc(50vw - 40vw / 2)', paddingRight: 'calc(50vw - 40vw / 2)' }}>
            {filtered.map((template) => (
              <div
                key={template.id}
                className="flex-shrink-0 snap-center mx-2"
                style={{ width: '80vw' }}
              >
                <TemplateCard template={template} onUseTemplate={() => handleUseTemplate(template)} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Bento Grid — hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} onUseTemplate={() => handleUseTemplate(template)} />
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
