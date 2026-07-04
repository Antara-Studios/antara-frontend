import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const plans = [
  {
    name: 'Free',
    monthly: 0,
    annual: 0,
    description: 'Perfect for trying out Antara Studios',
    cta: 'Get Started Free',
    features: [
      { label: '1 Invitation', included: true },
      { label: 'Basic Templates', included: true },
      { label: 'Standard Link', included: true },
      { label: 'RSVP Management', included: false },
      { label: 'Analytics', included: false },
      { label: 'Custom Domain', included: false },
      { label: 'AI Features', included: false },
      { label: 'Priority Support', included: false },
    ],
  },
  {
    name: 'Premium',
    monthly: 499,
    annual: 349,
    description: 'Everything you need for a perfect wedding',
    cta: 'Start Premium',
    recommended: true,
    features: [
      { label: '5 Invitations', included: true },
      { label: 'All 50+ Templates', included: true },
      { label: 'Custom Domain', included: true },
      { label: 'RSVP Management', included: true },
      { label: 'Analytics Dashboard', included: true },
      { label: 'WhatsApp Sharing', included: true },
      { label: 'AI Features', included: false },
      { label: 'Priority Support', included: false },
    ],
  },
  {
    name: 'Elite',
    monthly: 999,
    annual: 699,
    description: 'The ultimate experience for elite weddings',
    cta: 'Go Elite',
    features: [
      { label: 'Unlimited Invitations', included: true },
      { label: 'All 50+ Templates', included: true },
      { label: 'White-label Branding', included: true },
      { label: 'RSVP Management', included: true },
      { label: 'Analytics Dashboard', included: true },
      { label: 'AI Personalization', included: true },
      { label: 'Priority Support', included: true },
      { label: 'Dedicated Manager', included: true },
    ],
  },
]

function PricingCard({ plan, isAnnual }) {
  const price = isAnnual ? plan.annual : plan.monthly

  return (
    <div
      className={`
        relative flex flex-col gap-5 sm:gap-6 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 ring-1
        ${plan.recommended
          ? 'bg-espresso text-cream ring-gold ring-2 lg:scale-105 lg:z-10 order-first md:order-none'
          : 'bg-cream ring-espresso/10'}
      `}
    >
      {plan.recommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="gold">Most Popular</Badge>
        </div>
      )}

      <div>
        <h3 className={`text-lg font-semibold ${plan.recommended ? 'text-cream' : 'text-espresso'}`}>
          {plan.name}
        </h3>
        <p className={`text-sm mt-1 ${plan.recommended ? 'text-cream/60' : 'text-espresso/50'}`}>
          {plan.description}
        </p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className={`text-sm ${plan.recommended ? 'text-cream/60' : 'text-espresso/40'}`}>₹</span>
        <motion.span
          key={price}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-display text-4xl sm:text-5xl font-bold ${plan.recommended ? 'text-cream' : 'text-espresso'}`}
        >
          {price.toLocaleString()}
        </motion.span>
        <span className={`text-sm ${plan.recommended ? 'text-cream/50' : 'text-espresso/40'}`}>/mo</span>
      </div>

      <Link to="/create" className="block">
        <Button
          variant={plan.recommended ? 'secondary' : 'outline'}
          size="md"
          className="w-full"
        >
          {plan.cta}
        </Button>
      </Link>

      <ul className="flex flex-col gap-3">
        {plan.features.map(({ label, included }) => (
          <li key={label} className="flex items-center gap-3">
            {included ? (
              <Check className="w-4 h-4 text-sage flex-shrink-0" strokeWidth={2} />
            ) : (
              <X className={`w-4 h-4 flex-shrink-0 ${plan.recommended ? 'text-cream/20' : 'text-espresso/20'}`} strokeWidth={2} />
            )}
            <span className={`text-sm ${included ? (plan.recommended ? 'text-cream/80' : 'text-espresso/80') : (plan.recommended ? 'text-cream/30' : 'text-espresso/30')}`}>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-label="Pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel heading="Simple, Transparent Pricing" align="center" accent="highlight:Transparent" />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-espresso' : 'text-espresso/40'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual((v) => !v)}
            aria-label="Toggle annual pricing"
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${isAnnual ? 'bg-gold' : 'bg-espresso/20'}`}
          >
            <motion.div
              animate={{ x: isAnnual ? 24 : 2 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
            />
          </button>
          <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-espresso' : 'text-espresso/40'}`}>
            Annual
            <span className="text-[10px] px-2 py-0.5 bg-sage/15 text-sage rounded-full font-semibold">Save 30%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start lg:items-center">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-sm text-espresso/40 mt-10">
          30-day money-back guarantee &bull; No credit card required for free plan
        </p>
      </div>
    </section>
  )
}
