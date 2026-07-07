import Pricing from '../sections/Pricing'
import CTABanner from '../sections/CTABanner'

const pricingFaqs = [
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, UPI, net banking, and wallet payments (Paytm, PhonePe, Google Pay) via our secure Razorpay integration.',
  },
  {
    q: 'How long is my template access valid after purchasing?',
    a: 'Your access is valid for 365 days (1 year) from the date of purchase. You can create and edit your invitation anytime within this period.',
  },
  {
    q: 'Can I use a purchased template for multiple invitations?',
    a: 'Each purchase unlocks the template for one invitation. If you need the same template for another event, you can re-purchase it at the same price.',
  },
  {
    q: 'What happens when my access expires?',
    a: "Your published invitation remains live. You just won't be able to edit it further. You can re-purchase the template at any time to regain editing access.",
  },
  {
    q: 'Do you offer refunds?',
    a: "If you haven't started customizing your template, we offer a full refund within 24 hours of purchase. Contact us at hello@antara.studio for refund requests.",
  },
  {
    q: 'Do you offer discounts for wedding planners or agencies?',
    a: 'Yes! We have special agency plans with volume discounts for wedding planners managing multiple couples. Contact us at hello@antara.studio for custom pricing.',
  },
]

export default function PricingPage() {
  return (
    <main className="pt-20 md:pt-24 min-h-screen">
      <Pricing />

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
