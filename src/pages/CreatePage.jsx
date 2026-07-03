import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star, Check, Upload, Copy, Share2 } from 'lucide-react'
import Badge from '../components/ui/Badge'

const TOTAL_STEPS = 5

const templates = [
  { id: 1, name: 'Royal Rajasthani', style: 'Hindu', bg: 'bg-gradient-to-br from-red-900 to-yellow-800' },
  { id: 2, name: 'Garden Bloom', style: 'Christian', bg: 'bg-gradient-to-br from-blush to-pink-200' },
  { id: 3, name: 'Emerald Nikah', style: 'Muslim', bg: 'bg-gradient-to-br from-emerald-800 to-teal-700' },
  { id: 4, name: 'Lotus Mandapam', style: 'South Indian', bg: 'bg-gradient-to-br from-yellow-700 to-amber-600' },
  { id: 5, name: 'Seaside Vows', style: 'Destination', bg: 'bg-gradient-to-br from-sky-700 to-cyan-500' },
  { id: 6, name: 'Modern Minimal', style: 'Modern', bg: 'bg-gradient-to-br from-stone-800 to-stone-600' },
]

const colorPalettes = [
  { id: 1, name: 'Warm Gold', colors: ['#C9A96E', '#2C1810', '#F5EFE6'] },
  { id: 2, name: 'Royal Crimson', colors: ['#8B0000', '#FFD700', '#FFF5E6'] },
  { id: 3, name: 'Sage Garden', colors: ['#7A8C6E', '#2C1810', '#F0EDE8'] },
  { id: 4, name: 'Dusty Rose', colors: ['#D4A0A0', '#4A2C1C', '#FDF8F3'] },
  { id: 5, name: 'Midnight Navy', colors: ['#1a2744', '#C9A96E', '#F5F5F0'] },
  { id: 6, name: 'Emerald Isle', colors: ['#2D5A27', '#C9A96E', '#F5F0E8'] },
]

const fontPairings = [
  { id: 1, name: 'Classic Elegance', display: 'Playfair Display', body: 'Plus Jakarta Sans' },
  { id: 2, name: 'Modern Grace', display: 'Cormorant Garamond', body: 'DM Sans' },
  { id: 3, name: 'Romantic Serif', display: 'EB Garamond', body: 'Lato' },
]

const modules = [
  { id: 'rsvp', label: 'RSVP Management' },
  { id: 'countdown', label: 'Countdown Timer' },
  { id: 'music', label: 'Background Music' },
  { id: 'map', label: 'Venue Map' },
  { id: 'gallery', label: 'Photo Gallery' },
]

export default function CreatePage() {
  const [step, setStep] = useState(1)
  const [saveStatus, setSaveStatus] = useState('saved')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedPalette, setSelectedPalette] = useState(1)
  const [selectedFont, setSelectedFont] = useState(1)
  const [enabledModules, setEnabledModules] = useState({ rsvp: true, countdown: false, music: false, map: true, gallery: false })
  const [isDragging, setIsDragging] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const saveTimerRef = useRef(null)

  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    venueName: '',
    venueCity: '',
  })

  // Auto-save simulation
  useEffect(() => {
    setSaveStatus('saving')
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => setSaveStatus('saved'), 1500)
    return () => clearTimeout(saveTimerRef.current)
  }, [formData, selectedTemplate, selectedPalette, selectedFont, enabledModules])

  const isStep1Valid = selectedTemplate !== null
  const isStep2Valid = formData.brideName && formData.groomName && formData.weddingDate && formData.venueName && formData.venueCity

  const canGoNext = () => {
    if (step === 1) return isStep1Valid
    if (step === 2) return isStep2Valid
    return true
  }

  const handlePublish = () => {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  const handleCopyLink = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleModule = (id) => {
    setEnabledModules((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)
  const selectedPaletteData = colorPalettes.find((p) => p.id === selectedPalette)

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-xl border-b border-espresso/8 px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <Link to="/" className="flex items-baseline gap-1 flex-shrink-0">
          <span className="font-display text-lg font-bold italic text-espresso">Antara</span>
          <span className="font-sans text-xs font-light text-espresso/50">Studios</span>
        </Link>

        {/* Step indicator */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <p className="text-xs text-espresso/50 font-medium">Step {step} of {TOTAL_STEPS}</p>
          <div className="w-full max-w-xs bg-espresso/10 rounded-full h-1 overflow-hidden">
            <motion.div
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="h-full bg-gold rounded-full"
            />
          </div>
        </div>

        {/* Save status */}
        <div className="flex-shrink-0 text-xs text-espresso/40 flex items-center gap-1.5">
          {saveStatus === 'saving' ? (
            <>
              <div className="w-3 h-3 rounded-full border border-espresso/30 border-t-transparent animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-3 h-3 text-sage" />
              Saved
            </>
          )}
        </div>
      </header>

      {/* Step Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Template */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="p-6 md:p-12 max-w-5xl mx-auto"
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-espresso">Choose Your Template</h2>
                <p className="text-espresso/50 mt-2">Select a design that speaks to your love story.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`
                      relative overflow-hidden rounded-2xl ${template.bg} h-48 text-left
                      transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                      ${selectedTemplate === template.id ? 'ring-2 ring-gold scale-[1.02]' : 'hover:scale-[1.01]'}
                    `}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-espresso" strokeWidth={2.5} />
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                      <p className="font-display text-base font-bold text-white">{template.name}</p>
                      <Badge variant="glass" className="mt-1">{template.style}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Couple Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="p-6 md:p-12 max-w-2xl mx-auto"
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-espresso">Your Details</h2>
                <p className="text-espresso/50 mt-2">Tell us about your celebration.</p>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { key: 'brideName', label: "Bride's Name", placeholder: 'Priya Sharma' },
                  { key: 'groomName', label: "Groom's Name", placeholder: 'Arjun Mehta' },
                  { key: 'venueName', label: 'Venue Name', placeholder: 'The Grand Leela Palace' },
                  { key: 'venueCity', label: 'Venue City', placeholder: 'Udaipur, Rajasthan' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="relative group">
                    <label className="absolute -top-2 left-4 text-[10px] uppercase tracking-widest font-semibold text-espresso/40 bg-cream px-1">
                      {label}
                    </label>
                    <input
                      type="text"
                      value={formData[key]}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full rounded-2xl ring-1 ring-espresso/20 focus:ring-gold focus:ring-2 bg-cream px-5 py-4 font-display text-espresso placeholder-espresso/25 text-base outline-none transition-all duration-300"
                    />
                  </div>
                ))}
                <div className="relative group">
                  <label className="absolute -top-2 left-4 text-[10px] uppercase tracking-widest font-semibold text-espresso/40 bg-cream px-1">
                    Wedding Date
                  </label>
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, weddingDate: e.target.value }))}
                    className="w-full rounded-2xl ring-1 ring-espresso/20 focus:ring-gold focus:ring-2 bg-cream px-5 py-4 font-display text-espresso text-base outline-none transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Upload Photos */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="p-6 md:p-12 max-w-3xl mx-auto"
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-espresso">Upload Photos</h2>
                <p className="text-espresso/50 mt-2">Add your beautiful memories to the invitation.</p>
              </div>

              {/* Main drag-drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false) }}
                className={`
                  border-2 border-dashed rounded-3xl p-12 text-center mb-6 transition-all duration-300
                  ${isDragging ? 'border-gold bg-gold/5' : 'border-espresso/20 hover:border-espresso/40'}
                `}
              >
                <Upload className="w-8 h-8 text-espresso/20 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-sm font-medium text-espresso/60">Drag & drop your photos here</p>
                <p className="text-xs text-espresso/35 mt-1">or click to browse — PNG, JPG up to 10MB</p>
                <button className="mt-4 px-5 py-2 rounded-full bg-espresso/5 text-espresso/60 text-xs font-medium hover:bg-espresso/10 transition-colors duration-300">
                  Browse Files
                </button>
              </div>

              {/* Photo slots */}
              <div className="grid grid-cols-3 gap-4">
                {['Couple Photo', 'Family Photo 1', 'Family Photo 2'].map((label) => (
                  <div
                    key={label}
                    className="aspect-square rounded-2xl border-2 border-dashed border-espresso/15 hover:border-espresso/30 transition-colors duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-espresso/5 group-hover:bg-espresso/8 flex items-center justify-center transition-colors duration-300">
                      <span className="text-espresso/30 text-xl">+</span>
                    </div>
                    <span className="text-xs text-espresso/35 text-center px-2">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Customize */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="p-6 md:p-12 max-w-3xl mx-auto"
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-espresso">Customize</h2>
                <p className="text-espresso/50 mt-2">Make it uniquely yours.</p>
              </div>

              <div className="flex flex-col gap-10">
                {/* Color Palettes */}
                <div>
                  <h3 className="text-sm font-semibold text-espresso mb-4">Color Palette</h3>
                  <div className="flex flex-wrap gap-3">
                    {colorPalettes.map((palette) => (
                      <button
                        key={palette.id}
                        onClick={() => setSelectedPalette(palette.id)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-full ring-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                          selectedPalette === palette.id ? 'ring-gold bg-gold/5' : 'ring-espresso/15 hover:ring-espresso/30'
                        }`}
                      >
                        <div className="flex gap-1">
                          {palette.colors.map((c, i) => (
                            <div key={i} className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-espresso/70">{palette.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Pairings */}
                <div>
                  <h3 className="text-sm font-semibold text-espresso mb-4">Font Pairing</h3>
                  <div className="flex flex-col gap-3">
                    {fontPairings.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl ring-1 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                          selectedFont === font.id ? 'ring-gold bg-gold/5' : 'ring-espresso/10 hover:ring-espresso/20'
                        }`}
                      >
                        <div>
                          <p className="text-xs text-espresso/40 uppercase tracking-widest mb-1">{font.name}</p>
                          <p className="font-display text-lg text-espresso">{font.display}</p>
                          <p className="text-xs text-espresso/50 mt-0.5">{font.body}</p>
                        </div>
                        {selectedFont === font.id && (
                          <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                            <Check className="w-3 h-3 text-espresso" strokeWidth={2.5} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Modules */}
                <div>
                  <h3 className="text-sm font-semibold text-espresso mb-4">Optional Modules</h3>
                  <div className="flex flex-col gap-3">
                    {modules.map(({ id, label }) => (
                      <div key={id} className="flex items-center justify-between p-4 rounded-2xl bg-cream ring-1 ring-espresso/8">
                        <span className="text-sm text-espresso/80">{label}</span>
                        <button
                          onClick={() => toggleModule(id)}
                          aria-label={`Toggle ${label}`}
                          className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${enabledModules[id] ? 'bg-gold' : 'bg-espresso/15'}`}
                        >
                          <motion.div
                            animate={{ x: enabledModules[id] ? 20 : 2 }}
                            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Preview & Publish */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="p-6 md:p-12 max-w-3xl mx-auto"
            >
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-espresso">Preview & Publish</h2>
                <p className="text-espresso/50 mt-2">Your invitation is ready to share with the world.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Invitation Preview */}
                <div className={`relative rounded-[2rem] overflow-hidden ${selectedTemplateData?.bg || 'bg-gradient-to-br from-warm-200 to-champagne'}`} style={{ minHeight: '400px' }}>
                  <div className="absolute inset-4 border border-white/20 rounded-[1.5rem] pointer-events-none" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <span className="text-white/50 text-[9px] uppercase tracking-[0.3em]">Together with their families</span>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="font-display text-3xl font-bold text-white">{formData.brideName || 'Bride'}</h3>
                      <span className="font-display text-xl italic text-white/60">&amp;</span>
                      <h3 className="font-display text-3xl font-bold text-white">{formData.groomName || 'Groom'}</h3>
                    </div>
                    <div className="w-12 h-px bg-white/20" />
                    <div>
                      <p className="text-white/80 text-sm">{formData.weddingDate ? new Date(formData.weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Wedding Date'}</p>
                      <p className="text-white/40 text-xs mt-1">{formData.venueName || 'Venue'}</p>
                      <p className="text-white/30 text-xs">{formData.venueCity || 'City'}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="glass">{selectedTemplateData?.name || 'Template'}</Badge>
                  </div>
                </div>

                {/* Share options */}
                <div className="flex flex-col gap-5">
                  <div className="p-5 rounded-2xl bg-cream ring-1 ring-espresso/8">
                    <p className="text-xs uppercase tracking-widest font-semibold text-espresso/40 mb-3">Your Unique Link</p>
                    <p className="text-sm font-medium text-espresso font-mono break-all">
                      antara.studio/invite/{formData.brideName ? formData.brideName.toLowerCase().replace(/\s+/g, '-') : 'your-name'}-{formData.groomName ? formData.groomName.toLowerCase().replace(/\s+/g, '-') : 'partner'}
                    </p>
                    <button
                      onClick={handleCopyLink}
                      className="mt-3 flex items-center gap-2 text-xs font-medium text-gold hover:text-gold-dark transition-colors duration-300"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366]/10 text-[#128C7E] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors duration-300">
                      <Share2 className="w-4 h-4" />
                      WhatsApp
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-espresso/5 text-espresso text-xs font-semibold hover:bg-espresso/10 transition-colors duration-300">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.928 1.4 5.6L0 24l6.6-1.4C8.172 23.493 10.075 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                      QR Code
                    </button>
                  </div>

                  <button
                    onClick={handlePublish}
                    className="w-full py-4 bg-espresso text-cream rounded-2xl font-semibold text-sm hover:bg-espresso-light transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  >
                    Publish Invitation ✦
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 bg-cream/90 backdrop-blur-xl border-t border-espresso/8 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-espresso/60 hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-1.5">
          {[...Array(TOTAL_STEPS)].map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${i + 1 === step ? 'w-6 h-2 bg-gold' : i + 1 < step ? 'w-2 h-2 bg-gold/40' : 'w-2 h-2 bg-espresso/15'}`}
            />
          ))}
        </div>

        {step < TOTAL_STEPS ? (
          <button
            onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
            disabled={!canGoNext()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-espresso text-cream text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-espresso-light transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-espresso text-sm font-semibold hover:bg-gold-light transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Publish ✦
          </button>
        )}
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-espresso text-cream px-6 py-3.5 rounded-2xl shadow-2xl"
          >
            <div className="w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-sage" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-semibold">Invitation Published!</p>
              <p className="text-xs text-cream/50">Your guests can now view it live.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
