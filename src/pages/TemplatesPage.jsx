import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Star, SlidersHorizontal, X } from 'lucide-react'
import Badge from '../components/ui/Badge'

const allTemplates = [
  { id: 1, name: 'Royal Rajasthani', style: 'Hindu', bg: 'bg-gradient-to-br from-red-900 via-orange-900 to-yellow-800', rating: 4.9, uses: '2.1k', price: 'Premium' },
  { id: 2, name: 'Garden Bloom', style: 'Christian', bg: 'bg-gradient-to-br from-blush to-pink-200', rating: 4.8, uses: '1.4k', price: 'Free' },
  { id: 3, name: 'Emerald Nikah', style: 'Muslim', bg: 'bg-gradient-to-br from-emerald-800 to-teal-700', rating: 4.7, uses: '980', price: 'Premium' },
  { id: 4, name: 'Lotus Mandapam', style: 'South Indian', bg: 'bg-gradient-to-br from-yellow-700 to-amber-600', rating: 4.9, uses: '1.8k', price: 'Premium' },
  { id: 5, name: 'Seaside Vows', style: 'Destination', bg: 'bg-gradient-to-br from-sky-700 to-cyan-500', rating: 4.6, uses: '760', price: 'Free' },
  { id: 6, name: 'Modern Minimal', style: 'Modern', bg: 'bg-gradient-to-br from-stone-800 to-stone-600', rating: 4.8, uses: '3.2k', price: 'Free' },
  { id: 7, name: 'Floral Romance', style: 'Christian', bg: 'bg-gradient-to-br from-rose-200 to-pink-300', rating: 4.7, uses: '890', price: 'Premium' },
  { id: 8, name: 'Golden Heritage', style: 'Hindu', bg: 'bg-gradient-to-br from-amber-700 to-yellow-600', rating: 4.9, uses: '1.5k', price: 'Premium' },
  { id: 9, name: 'Sacred Union', style: 'Muslim', bg: 'bg-gradient-to-br from-indigo-900 to-purple-800', rating: 4.8, uses: '720', price: 'Free' },
  { id: 10, name: 'Tropical Bliss', style: 'Destination', bg: 'bg-gradient-to-br from-teal-600 to-emerald-400', rating: 4.6, uses: '540', price: 'Premium' },
  { id: 11, name: 'Ivory Classic', style: 'Christian', bg: 'bg-gradient-to-br from-stone-200 to-warm-300', rating: 4.7, uses: '1.1k', price: 'Free' },
  { id: 12, name: 'Velvet Luxe', style: 'Modern', bg: 'bg-gradient-to-br from-purple-900 to-pink-800', rating: 4.9, uses: '2.0k', price: 'Premium' },
]

const styles = ['Hindu', 'Christian', 'Muslim', 'South Indian', 'Modern', 'Destination']
const sortOptions = ['Popular', 'Newest', 'Price: Low to High']

export default function TemplatesPage() {
  const [search, setSearch] = useState('')
  const [selectedStyles, setSelectedStyles] = useState([])
  const [selectedPrice, setSelectedPrice] = useState('All')
  const [sortBy, setSortBy] = useState('Popular')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)

  const toggleStyle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    )
  }

  const filtered = allTemplates
    .filter((t) => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
      const matchStyle = selectedStyles.length === 0 || selectedStyles.includes(t.style)
      const matchPrice = selectedPrice === 'All' || t.price === selectedPrice
      return matchSearch && matchStyle && matchPrice
    })
    .slice(0, displayCount)

  return (
    <main className="pt-20 md:pt-24 min-h-screen">
      {/* Hero bar */}
      <div className="bg-espresso py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-4">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream">All Templates</h1>
          <p className="text-cream/50 text-lg max-w-xl">
            50+ premium wedding invitation designs across every culture, style, and tradition.
          </p>
          {/* Search */}
          <div className="relative w-full max-w-md mt-4">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full rounded-full ring-1 ring-cream/20 bg-white/10 text-cream placeholder-cream/30 pl-12 pr-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar (desktop) */}
          <aside className="hidden lg:flex flex-col gap-8 w-56 flex-shrink-0">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-espresso/40 mb-4">Style</h3>
              <div className="flex flex-col gap-2.5">
                {styles.map((style) => (
                  <label key={style} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleStyle(style)}
                      className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        selectedStyles.includes(style) ? 'bg-gold border-gold' : 'border-espresso/20 hover:border-gold/50'
                      }`}
                    >
                      {selectedStyles.includes(style) && <span className="text-[8px] text-white font-bold">✓</span>}
                    </div>
                    <span className="text-sm text-espresso/70 group-hover:text-espresso transition-colors duration-200">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-espresso/40 mb-4">Price</h3>
              <div className="flex flex-col gap-2.5">
                {['All', 'Free', 'Premium'].map((price) => (
                  <label key={price} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setSelectedPrice(price)}
                      className={`w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        selectedPrice === price ? 'border-gold' : 'border-espresso/20'
                      }`}
                    >
                      {selectedPrice === price && <div className="w-2 h-2 rounded-full bg-gold" />}
                    </div>
                    <span className="text-sm text-espresso/70 group-hover:text-espresso transition-colors duration-200">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <p className="text-sm text-espresso/50">{filtered.length} templates found</p>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full ring-1 ring-espresso/15 text-sm text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                {/* Sort dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-full ring-1 ring-espresso/15 text-sm text-espresso bg-cream focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative overflow-hidden rounded-2xl ${template.bg} group`}
                  style={{ minHeight: '240px' }}
                  whileHover="hover"
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] uppercase tracking-widest px-2 py-1 rounded-full bg-black/30 text-white/80 backdrop-blur-sm">
                        {template.style}
                      </span>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="text-[10px] text-white/80">{template.rating}</span>
                        </div>
                        <Badge variant={template.price === 'Free' ? 'sage' : 'gold'} className="text-[8px]">
                          {template.price}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{template.name}</h3>
                      <p className="text-xs text-white/50">{template.uses} couples</p>
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
                      className="absolute inset-0 bg-espresso/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6"
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
              ))}
            </div>

            {/* Load More */}
            {displayCount < allTemplates.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setDisplayCount((c) => c + 6)}
                  className="px-8 py-3 rounded-full ring-1 ring-espresso/20 text-sm font-medium text-espresso hover:bg-warm-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-0 inset-x-0 z-50 bg-cream rounded-t-[2rem] p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-espresso">Filters</h3>
                <button
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                  className="w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center text-espresso/60 hover:text-espresso"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-espresso/40 mb-4">Style</h4>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style) => (
                      <button
                        key={style}
                        onClick={() => toggleStyle(style)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                          selectedStyles.includes(style) ? 'bg-gold border-gold text-espresso' : 'border-espresso/15 text-espresso/60'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-espresso/40 mb-4">Price</h4>
                  <div className="flex gap-2">
                    {['All', 'Free', 'Premium'].map((price) => (
                      <button
                        key={price}
                        onClick={() => setSelectedPrice(price)}
                        className={`flex-1 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                          selectedPrice === price ? 'bg-gold border-gold text-espresso' : 'border-espresso/15 text-espresso/60'
                        }`}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full py-3 bg-espresso text-cream rounded-full text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
