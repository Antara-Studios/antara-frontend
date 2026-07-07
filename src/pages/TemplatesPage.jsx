import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Star, SlidersHorizontal, X } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { useAuthModal } from '../context/AuthModalContext'
import { getTemplatePrice } from '../data/templatePricing'

const allTemplates = [
  {
    id: 1,
    name: 'Royal Rajasthani',
    style: 'Hindu',
    bg: 'bg-gradient-to-br from-red-900 via-orange-900 to-yellow-800',
    cardBg: '#7B1C1C',
    accent: '#C9A96E',
    textColor: '#FFF8EE',
    mutedColor: '#FFECC0',
    ornament: '❧',
    coupleNames: 'Priya & Arjun',
    weddingDate: '14th February 2026',
    weddingVenue: 'Udaipur, Rajasthan',
    decorLine: '— शुभ विवाह —',
    rating: 4.9,
    uses: '2.1k',
    price: 'Premium',
  },
  {
    id: 2,
    name: 'Garden Bloom',
    style: 'Christian',
    bg: 'bg-gradient-to-br from-blush to-pink-200',
    cardBg: '#F2D9D0',
    accent: '#A0614F',
    textColor: '#4A1C14',
    mutedColor: '#7A3A2E',
    ornament: '✦',
    coupleNames: 'Sarah & James',
    weddingDate: 'Saturday, 6th June 2026',
    weddingVenue: 'Rose Garden, London',
    decorLine: '— Together Forever —',
    rating: 4.8,
    uses: '1.4k',
    price: 'Free',
  },
  {
    id: 3,
    name: 'Emerald Nikah',
    style: 'Muslim',
    bg: 'bg-gradient-to-br from-emerald-800 to-teal-700',
    cardBg: '#1A4A3A',
    accent: '#C9A96E',
    textColor: '#F0FFF8',
    mutedColor: '#A8D8C8',
    ornament: '☽',
    coupleNames: 'Aisha & Khalid',
    weddingDate: '20th Rajab 1447',
    weddingVenue: 'Grand Mosque Hall, Dubai',
    decorLine: '— بسم الله الرحمن الرحيم —',
    rating: 4.7,
    uses: '980',
    price: 'Premium',
  },
  {
    id: 4,
    name: 'Lotus Mandapam',
    style: 'South Indian',
    bg: 'bg-gradient-to-br from-yellow-700 to-amber-600',
    cardBg: '#7A4A08',
    accent: '#FFD700',
    textColor: '#FFF8E1',
    mutedColor: '#FFE88A',
    ornament: '✿',
    coupleNames: 'Kavya & Vikram',
    weddingDate: 'Vaikasi Visakam, 2026',
    weddingVenue: 'Kapaleeshwarar Temple, Chennai',
    decorLine: '— శుభ కళ్యాణం —',
    rating: 4.9,
    uses: '1.8k',
    price: 'Premium',
  },
  {
    id: 5,
    name: 'Seaside Vows',
    style: 'Destination',
    bg: 'bg-gradient-to-br from-sky-700 to-cyan-500',
    cardBg: '#0E4D6E',
    accent: '#7DD3F0',
    textColor: '#F0FAFF',
    mutedColor: '#B8E8FA',
    ornament: '⛵',
    coupleNames: 'Emma & Luca',
    weddingDate: 'July 12th, 2026',
    weddingVenue: 'Santorini, Greece',
    decorLine: '— Where the sea meets forever —',
    rating: 4.6,
    uses: '760',
    price: 'Free',
  },
  {
    id: 6,
    name: 'Modern Minimal',
    style: 'Modern',
    bg: 'bg-gradient-to-br from-stone-800 to-stone-600',
    cardBg: '#2A2420',
    accent: '#C9A96E',
    textColor: '#F5F0EB',
    mutedColor: '#C0B8B0',
    ornament: '◆',
    coupleNames: 'Zoe & Marcus',
    weddingDate: 'September 19, 2026',
    weddingVenue: 'The Warehouse, NYC',
    decorLine: '— simply, together —',
    rating: 4.8,
    uses: '3.2k',
    price: 'Free',
  },
  {
    id: 7,
    name: 'Floral Romance',
    style: 'Christian',
    bg: 'bg-gradient-to-br from-rose-200 to-pink-300',
    cardBg: '#E8C0C8',
    accent: '#8B2252',
    textColor: '#3A0A1A',
    mutedColor: '#7A3A52',
    ornament: '✾',
    coupleNames: 'Isabella & Thomas',
    weddingDate: 'May 3rd, 2026',
    weddingVenue: 'St. Mary\'s Chapel, Bath',
    decorLine: '— Love in full bloom —',
    rating: 4.7,
    uses: '890',
    price: 'Premium',
  },
  {
    id: 8,
    name: 'Golden Heritage',
    style: 'Hindu',
    bg: 'bg-gradient-to-br from-amber-700 to-yellow-600',
    cardBg: '#6A3A08',
    accent: '#FFD700',
    textColor: '#FFFBF0',
    mutedColor: '#FFE8A0',
    ornament: '卐',
    coupleNames: 'Meera & Rohit',
    weddingDate: 'Akshaya Tritiya, 2026',
    weddingVenue: 'Birla Mandir, Jaipur',
    decorLine: '— शुभ लग्न —',
    rating: 4.9,
    uses: '1.5k',
    price: 'Premium',
  },
  {
    id: 9,
    name: 'Sacred Union',
    style: 'Muslim',
    bg: 'bg-gradient-to-br from-indigo-900 to-purple-800',
    cardBg: '#1A1050',
    accent: '#C9A96E',
    textColor: '#F5F0FF',
    mutedColor: '#C0B0F0',
    ornament: '✦',
    coupleNames: 'Fatima & Omar',
    weddingDate: '15th Muharram 1448',
    weddingVenue: 'Islamic Centre, Istanbul',
    decorLine: '— ماشاء الله —',
    rating: 4.8,
    uses: '720',
    price: 'Free',
  },
  {
    id: 10,
    name: 'Tropical Bliss',
    style: 'Destination',
    bg: 'bg-gradient-to-br from-teal-600 to-emerald-400',
    cardBg: '#0E5A48',
    accent: '#A8F0D8',
    textColor: '#F0FFFA',
    mutedColor: '#B8F0E0',
    ornament: '✿',
    coupleNames: 'Mia & Rafael',
    weddingDate: 'March 22nd, 2026',
    weddingVenue: 'Bali Clifftop, Indonesia',
    decorLine: '— paradise found —',
    rating: 4.6,
    uses: '540',
    price: 'Premium',
  },
  {
    id: 11,
    name: 'Ivory Classic',
    style: 'Christian',
    bg: 'bg-gradient-to-br from-stone-200 to-warm-300',
    cardBg: '#EDE5D8',
    accent: '#6A5A40',
    textColor: '#2C1810',
    mutedColor: '#5A4A30',
    ornament: '❦',
    coupleNames: 'Charlotte & William',
    weddingDate: 'October 10th, 2026',
    weddingVenue: 'Blenheim Palace, Oxford',
    decorLine: '— timeless & true —',
    rating: 4.7,
    uses: '1.1k',
    price: 'Free',
  },
  {
    id: 12,
    name: 'Velvet Luxe',
    style: 'Modern',
    bg: 'bg-gradient-to-br from-purple-900 to-pink-800',
    cardBg: '#2A0A3A',
    accent: '#E0A0C0',
    textColor: '#FFF0F8',
    mutedColor: '#D0A8C8',
    ornament: '◈',
    coupleNames: 'Nova & Dorian',
    weddingDate: 'December 31st, 2026',
    weddingVenue: 'The Velvet Room, Paris',
    decorLine: '— luxury unbound —',
    rating: 4.9,
    uses: '2.0k',
    price: 'Premium',
  },
]

const styles = ['Hindu', 'Christian', 'Muslim', 'South Indian', 'Modern', 'Destination']
const sortOptions = ['Popular', 'Newest', 'Price: Low to High']

function TemplateCard({ template, onUseTemplate }) {
  const { cardBg, accent, textColor, mutedColor, ornament, coupleNames, decorLine } = template

  return (
    <div>
      {/* Preview card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl"
        style={{ backgroundColor: cardBg, minHeight: '180px' }}
      >
        {/* Top meta row */}
        <div className="flex items-center justify-between px-4 pt-3.5 pb-0">
          <span
            className="text-[9px] uppercase tracking-widest font-medium opacity-45"
            style={{ color: textColor }}
          >
            {template.style}
          </span>
          <Badge variant={getTemplatePrice(template.id) === 0 ? 'sage' : 'gold'} className="text-[8px] px-2 py-0.5">
            {getTemplatePrice(template.id) === 0 ? 'Free' : `₹${getTemplatePrice(template.id).toLocaleString('en-IN')}`}
          </Badge>
        </div>

        {/* Font & text preview — the actual content */}
        <div className="flex flex-col items-center justify-center text-center px-6 py-6">
          {/* Ornament */}
          <span className="text-base leading-none mb-2 opacity-70" style={{ color: accent }}>
            {ornament}
          </span>
          {/* Couple names in display font — this is the preview */}
          <h3
            className="font-display text-2xl font-bold leading-snug mb-2"
            style={{ color: textColor }}
          >
            {coupleNames}
          </h3>
          {/* One line of flavour text showing the template's script/language */}
          <p
            className="text-[11px] opacity-50 leading-relaxed"
            style={{ color: mutedColor, fontFamily: 'serif', fontStyle: 'italic' }}
          >
            {decorLine}
          </p>
        </div>
      </motion.div>

      {/* Actions — below the card, outside it */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div>
          <p className="text-[13px] font-medium text-espresso">{template.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3 h-3 fill-gold text-gold" />
            <span className="text-[11px] text-espresso/50">{template.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 rounded-full text-xs font-medium ring-1 ring-espresso/15 text-espresso/70 hover:ring-espresso/30 hover:text-espresso transition-all duration-200 active:scale-[0.97]">
            Preview
          </button>
          <button
            onClick={onUseTemplate}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-espresso text-cream hover:bg-espresso-light transition-all duration-200 active:scale-[0.97]"
          >
            Use
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  const [selectedStyles, setSelectedStyles] = useState([])
  const [selectedPrice, setSelectedPrice] = useState('All')
  const [sortBy, setSortBy] = useState('Popular')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [displayCount, setDisplayCount] = useState(12)
  const { user } = useAuth()
  const { openAuthModal } = useAuthModal()
  const navigate = useNavigate()

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

  const toggleStyle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    )
  }

  const filtered = allTemplates
    .filter((t) => {
      const matchStyle = selectedStyles.length === 0 || selectedStyles.includes(t.style)
      const price = getTemplatePrice(t.id)
      const matchPrice =
        selectedPrice === 'All' ||
        (selectedPrice === 'Free' && price === 0) ||
        (selectedPrice === 'Paid' && price > 0)
      return matchStyle && matchPrice
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return getTemplatePrice(a.id) - getTemplatePrice(b.id)
      return 0 // Popular / Newest keep original order
    })
    .slice(0, displayCount)

  return (
    <main className="pt-20 md:pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Filter Sidebar (desktop) */}
          <aside className="hidden lg:flex flex-col gap-8 w-52 flex-shrink-0">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest font-semibold text-espresso/35 mb-4">Style</h3>
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
                    <span className="text-sm text-espresso/65 group-hover:text-espresso transition-colors duration-200">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-widest font-semibold text-espresso/35 mb-4">Price</h3>
              <div className="flex flex-col gap-2.5">
                {['All', 'Free', 'Paid'].map((price) => (
                  <label key={price} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setSelectedPrice(price)}
                      className={`w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        selectedPrice === price ? 'border-gold' : 'border-espresso/20'
                      }`}
                    >
                      {selectedPrice === price && <div className="w-2 h-2 rounded-full bg-gold" />}
                    </div>
                    <span className="text-sm text-espresso/65 group-hover:text-espresso transition-colors duration-200">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <p className="text-sm text-espresso/45">
                {filtered.length} template{filtered.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full ring-1 ring-espresso/15 text-sm text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUseTemplate={() => handleUseTemplate(template)}
                />
              ))}
            </div>

            {/* Load More */}
            {displayCount < allTemplates.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setDisplayCount((c) => c + 6)}
                  className="px-8 py-3 rounded-full ring-1 ring-espresso/20 text-sm font-medium text-espresso hover:bg-warm-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Load more
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
                  <h4 className="text-[10px] uppercase tracking-widest font-semibold text-espresso/35 mb-4">Style</h4>
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
                  <h4 className="text-[10px] uppercase tracking-widest font-semibold text-espresso/35 mb-4">Price</h4>
                  <div className="flex gap-2">
                    {['All', 'Free', 'Paid'].map((price) => (
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
                  Apply filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
