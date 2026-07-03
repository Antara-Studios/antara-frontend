import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LayoutTemplate, Edit3, Share2 } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'
import useScrollReveal from '../hooks/useScrollReveal'
import { staggerContainer, fadeUpVariant } from '../utils/animations'

const steps = [
  {
    number: '01',
    icon: LayoutTemplate,
    title: 'Choose Template',
    description: 'Browse our curated collection of 50+ premium designs crafted for every culture, style, and budget.',
  },
  {
    number: '02',
    icon: Edit3,
    title: 'Add Your Details',
    description: "Enter your names, wedding date, venue, and photos. Our AI will personalize every element to match your story.",
  },
  {
    number: '03',
    icon: Share2,
    title: 'Share with Everyone',
    description: 'Send via WhatsApp, share a QR code, or post your unique link. Reach every guest in seconds.',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useScrollReveal()

  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-label="How It Works" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel
          badge="Simple Process"
          heading="Three Steps to Your Dream Invitation"
          align="center"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative"
        >
          {/* Connecting dots (desktop only) */}
          <div className="hidden md:flex absolute top-16 left-[calc(16.66%-20px)] right-[calc(16.66%-20px)] items-center pointer-events-none" aria-hidden="true">
            <div className="flex-1 border-t-2 border-dashed border-espresso/10" />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={fadeUpVariant}
                custom={i}
                className="relative flex flex-col gap-4 sm:gap-5 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-warm-50 ring-1 ring-espresso/8"
              >
                {/* Ghost step number — hidden on mobile to prevent clip into previous section */}
                <span
                  className="hidden sm:block absolute -top-8 left-4 font-display text-[120px] font-bold leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(44,24,16,0.04)' }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-espresso">{step.title}</h3>
                  <p className="text-sm text-espresso/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link to="/create">
            <Button size="lg" variant="primary">Start Creating Now</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
