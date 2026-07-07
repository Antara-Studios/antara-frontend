import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'
import Button from '../components/ui/Button'

const pillars = [
  {
    title: 'Free Templates',
    price: '₹0',
    subtitle: 'Always free, forever',
    features: [
      'Instant access — no payment needed',
      'Full customization (colors, fonts, modules)',
      'WhatsApp & QR code sharing',
      'Published invitation hosted for free',
    ],
  },
  {
    title: 'Premium Templates',
    price: '₹800 – ₹1,200',
    subtitle: 'Pay once · Valid for 1 year',
    features: [
      'One-time purchase per template',
      'Secure payment via Razorpay',
      '365-day access from purchase date',
      'All features unlocked (RSVP, Gallery, Music…)',
    ],
    highlighted: true,
  },
  {
    title: 'Your Invitation',
    price: 'Yours forever',
    subtitle: 'After you publish',
    features: [
      'Unique shareable link',
      'RSVP management dashboard',
      'Live countdown timer',
      'Guest analytics & tracking',
    ],
  },
]

export default function Pricing() {
  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-label="Pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel
          heading="One Template, One Perfect Wedding"
          align="center"
          accent="highlight:Perfect"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch mt-4">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className={`
                relative flex flex-col gap-5 rounded-[2rem] p-6 ring-1
                ${pillar.highlighted
                  ? 'bg-espresso text-cream ring-gold ring-2'
                  : 'bg-cream ring-espresso/10'}
              `}
            >
              <div>
                <h3 className={`text-lg font-semibold ${pillar.highlighted ? 'text-cream' : 'text-espresso'}`}>
                  {pillar.title}
                </h3>
                <p className={`text-sm mt-1 ${pillar.highlighted ? 'text-cream/60' : 'text-espresso/50'}`}>
                  {pillar.subtitle}
                </p>
              </div>

              <div>
                <span className={`font-display text-3xl sm:text-4xl font-bold ${pillar.highlighted ? 'text-cream' : 'text-espresso'}`}>
                  {pillar.price}
                </span>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {pillar.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pillar.highlighted ? 'text-gold' : 'text-sage'}`}
                      strokeWidth={2}
                    />
                    <span className={`text-sm leading-snug ${pillar.highlighted ? 'text-cream/80' : 'text-espresso/70'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/templates">
            <Button size="lg" variant="primary">Browse Templates</Button>
          </Link>
        </div>

        <p className="text-center text-sm text-espresso/40 mt-6">
          No subscriptions · No hidden fees · Pay only for what you love
        </p>
      </div>
    </section>
  )
}
