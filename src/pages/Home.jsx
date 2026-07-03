import Hero from '../sections/Hero'
import DemoStrip from '../sections/DemoStrip'
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
    <main className="pt-24">
      <Hero />
      <DemoStrip />
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
