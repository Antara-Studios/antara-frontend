import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'

const testimonials = [
  {
    quote: "Antara Studios made our invitation process so seamless. The Rajasthani template was absolutely stunning and all our guests were blown away by the digital experience.",
    name: "Priya & Arjun Sharma",
    date: "February 2025",
    initials: "PA",
    gradientFrom: "#E8C4B8",
    gradientTo: "#C9A96E",
    style: "Udaipur",
  },
  {
    quote: "We wanted something that reflected our South Indian heritage while feeling modern. The Lotus Mandapam template was perfect. RSVP management saved us hours!",
    name: "Meera & Vikram Iyer",
    date: "March 2025",
    initials: "MV",
    gradientFrom: "#C9A96E",
    gradientTo: "#A8883A",
    style: "Chennai",
  },
  {
    quote: "As a Christian couple, we loved how the Garden Bloom template felt intimate and elegant. Our guests said it was the most beautiful digital invitation they'd received.",
    name: "Sara & James D'Souza",
    date: "April 2025",
    initials: "SJ",
    gradientFrom: "#9AAD8C",
    gradientTo: "#7A8C6E",
    style: "Goa",
  },
  {
    quote: "The Emerald Nikah design was everything we hoped for. Classic, sophisticated, and deeply rooted in our tradition. The multilingual support was a blessing for our elder guests.",
    name: "Fatima & Omar Shaikh",
    date: "January 2025",
    initials: "FO",
    gradientFrom: "#5C6E52",
    gradientTo: "#3d5a32",
    style: "Hyderabad",
  },
  {
    quote: "We chose the Modern Minimal template for our destination wedding in Bali and it was absolutely perfect. Clean, chic, and unforgettable. The countdown feature was everyone's favorite!",
    name: "Ananya & Rohan Kapoor",
    date: "May 2025",
    initials: "AR",
    gradientFrom: "#2C1810",
    gradientTo: "#4A2C1C",
    style: "Bali",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [])

  const prev = () => {
    stopAutoplay()
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
    startAutoplay()
  }

  const next = () => {
    stopAutoplay()
    setCurrent((c) => (c + 1) % testimonials.length)
    startAutoplay()
  }

  const t = testimonials[current]

  return (
    <section className="py-32 bg-warm-100" aria-label="Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel badge="Love Stories" heading="What Couples Are Saying" align="center" />

        <div
          className="relative flex items-center gap-6 max-w-3xl mx-auto"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-cream ring-1 ring-espresso/10 flex items-center justify-center text-espresso/50 hover:text-espresso hover:ring-espresso/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Testimonial Slide */}
          <div className="flex-1 min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className="w-full flex flex-col items-center text-center gap-6"
              >
                {/* Decorative quote mark */}
                <span className="font-display text-8xl text-gold/20 leading-none select-none" aria-hidden="true">
                  &ldquo;
                </span>

                {/* Quote */}
                <blockquote className="font-display italic text-xl md:text-2xl text-espresso leading-relaxed -mt-8">
                  {t.quote}
                </blockquote>

                {/* Stars */}
                <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                {/* Avatar + Name */}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})` }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-espresso text-sm">{t.name}</p>
                    <p className="text-xs text-espresso/40">{t.date}</p>
                    <p className="text-xs text-gold mt-0.5">{t.style}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-cream ring-1 ring-espresso/10 flex items-center justify-center text-espresso/50 hover:text-espresso hover:ring-espresso/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { stopAutoplay(); setCurrent(i); startAutoplay() }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`
                rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                ${i === current ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-espresso/20 hover:bg-espresso/40'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
