import { Check, X } from 'lucide-react'
import Pricing from '../sections/Pricing'
import CTABanner from '../sections/CTABanner'

const comparisonFeatures = [
  { feature: 'Number of Invitations', free: '1', premium: '5', elite: 'Unlimited' },
  { feature: 'Template Library', free: 'Basic (10)', premium: 'Full (50+)', elite: 'Full (50+)' },
  { feature: 'Custom Domain', free: false, premium: true, elite: true },
  { feature: 'RSVP Management', free: false, premium: true, elite: true },
  { feature: 'Guest Analytics', free: false, premium: true, elite: true },
  { feature: 'WhatsApp Sharing', free: true, premium: true, elite: true },
  { feature: 'Countdown Timer', free: false, premium: true, elite: true },
  { feature: 'Photo Gallery', free: false, premium: true, elite: true },
  { feature: 'Background Music', free: false, premium: true, elite: true },
  { feature: 'Multilingual Support', free: false, premium: true, elite: true },
  { feature: 'AI Wording Generator', free: false, premium: false, elite: true },
  { feature: 'AI Color Palette', free: false, premium: false, elite: true },
  { feature: 'White-label Branding', free: false, premium: false, elite: true },
  { feature: 'Priority Support', free: false, premium: false, elite: true },
  { feature: 'Dedicated Manager', free: false, premium: false, elite: true },
  { feature: 'QR Code Generator', free: true, premium: true, elite: true },
  { feature: 'Password Protection', free: false, premium: true, elite: true },
]

const pricingFaqs = [
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes, you can upgrade from Free to Premium or Elite at any time. Your invitation progress and data are preserved automatically.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and wallet payments (Paytm, PhonePe, Google Pay) via our secure Razorpay integration.',
  },
  {
    q: 'Is there a trial period for Premium?',
    a: "All paid plans come with a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your payment — no questions asked.",
  },
  {
    q: 'Do you offer discounts for wedding planners or agencies?',
    a: 'Yes! We have special agency plans with volume discounts for wedding planners managing multiple couples. Contact us at hello@antara.studio for custom pricing.',
  },
]

function CellValue({ value }) {
  if (value === true) return <Check className="w-4 h-4 text-sage mx-auto" strokeWidth={2.5} />
  if (value === false) return <X className="w-4 h-4 text-espresso/20 mx-auto" strokeWidth={2} />
  return <span className="text-sm text-espresso/70">{value}</span>
}

export default function PricingPage() {
  return (
    <main className="pt-24 min-h-screen">
      {/* Reuse Pricing section */}
      <Pricing />

      {/* Feature comparison table */}
      <section className="py-20 bg-warm-50" aria-label="Feature comparison">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-espresso text-center mb-12">
            Full Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl ring-1 ring-espresso/8">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-warm-100 border-b border-espresso/10">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-espresso/50 w-[40%]">Feature</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-espresso">Free</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gold">Premium</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-espresso">Elite</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-espresso/6 ${i % 2 === 0 ? 'bg-cream' : 'bg-warm-50'}`}>
                    <td className="px-6 py-3.5 text-sm text-espresso/80">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center"><CellValue value={row.free} /></td>
                    <td className="px-6 py-3.5 text-center bg-gold/3"><CellValue value={row.premium} /></td>
                    <td className="px-6 py-3.5 text-center"><CellValue value={row.elite} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-20" aria-label="Pricing FAQ">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-espresso text-center mb-12">
            Pricing Questions
          </h2>
          <div className="flex flex-col gap-6">
            {pricingFaqs.map(({ q, a }) => (
              <div key={q} className="flex flex-col gap-2 p-6 rounded-2xl bg-warm-50 ring-1 ring-espresso/8">
                <h3 className="font-semibold text-espresso text-sm">{q}</h3>
                <p className="text-sm text-espresso/60 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  )
}
