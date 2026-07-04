import Hero from '../sections/Hero'
import Templates from '../sections/Templates'
import Features from '../sections/Features'
import HowItWorks from '../sections/HowItWorks'
import AIPersonalization from '../sections/AIPersonalization'
import Pricing from '../sections/Pricing'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'
import CTABanner from '../sections/CTABanner'

export default function Home() {
  return (
    <main className="pt-20 md:pt-24">
      <Hero />
      <Templates />
      <Features />
      <HowItWorks />
      <AIPersonalization />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </main>
  )
}
