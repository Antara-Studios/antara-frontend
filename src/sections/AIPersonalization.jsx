import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wand2, Palette, Type, CalendarCheck } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import useScrollReveal from '../hooks/useScrollReveal'
import { fadeUpVariant, staggerContainer, slideInLeft, slideInRight } from '../utils/animations'

const features = [
  { icon: Wand2, label: 'AI Wording Generator', desc: 'Craft beautiful invitation text in your preferred language and tone.' },
  { icon: Palette, label: 'Color Palette from Your Photos', desc: 'Extract perfect colors from your couple photos automatically.' },
  { icon: Type, label: 'Smart Font Pairing', desc: 'AI recommends perfect font combinations for your wedding style.' },
  { icon: CalendarCheck, label: 'Automated Event Schedule', desc: 'Generate a complete ceremony timeline from your inputs.' },
]

const fullText = `Together with their families,\n\nPriya Sharma\n&\nArjun Mehta\n\nrequest the pleasure of your company\nat their wedding celebration\n\nSaturday, the 14th of February\nTwo Thousand and Twenty Five\n\nThe Grand Leela Palace\nUdaipur, Rajasthan`

export default function AIPersonalization() {
  const [displayText, setDisplayText] = useState('')
  const { ref: leftRef, inView: leftInView } = useScrollReveal()
  const { ref: rightRef, inView: rightInView } = useScrollReveal()

  useEffect(() => {
    if (!rightInView) return
    let i = 0
    setDisplayText('')
    const timer = setInterval(() => {
      i++
      setDisplayText(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [rightInView])

  return (
    <section className="py-32 bg-warm-50" aria-label="AI Personalization">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Block */}
          <motion.div
            ref={leftRef}
            variants={staggerContainer}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8"
          >
            <motion.div variants={slideInLeft}>
              <Badge variant="gold">Powered by AI</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUpVariant}
              className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight"
            >
              Intelligence Meets Elegance
            </motion.h2>
            <div className="flex flex-col gap-5">
              {features.map(({ icon: Icon, label, desc }, i) => (
                <motion.div key={label} variants={fadeUpVariant} custom={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-espresso">{label}</h4>
                    <p className="text-sm text-espresso/55 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUpVariant}>
              <Link to="/create">
                <Button size="lg" variant="primary">Try AI Features</Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Block: Typewriter Card */}
          <motion.div
            ref={rightRef}
            variants={slideInRight}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="flex justify-center relative"
          >
            {/* Glowing background orb */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Double-bezel card */}
            <div className="relative bg-warm-100/60 ring-1 ring-espresso/8 p-1.5 rounded-[2rem] w-full max-w-sm">
              <div className="bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] rounded-[calc(2rem-6px)] p-5 sm:p-8 relative min-h-[320px] sm:min-h-[400px]">
                {/* AI badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="gold">AI Generated</Badge>
                </div>

                {/* Typewriter text */}
                <div className="mt-8">
                  <pre className="font-display text-sm text-espresso leading-relaxed whitespace-pre-wrap break-words font-normal">
                    {displayText}
                    <span className="inline-block w-0.5 h-4 bg-gold animate-pulse-soft ml-0.5 align-middle" />
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
