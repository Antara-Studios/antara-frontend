import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import useScrollReveal from '../hooks/useScrollReveal'
import { staggerContainer, fadeUpVariant } from '../utils/animations'

export default function CTABanner() {
  const { ref, inView } = useScrollReveal()

  return (
    <section
      className="py-32 relative overflow-hidden"
      aria-label="Call to action"
      style={{
        background: 'linear-gradient(135deg, #EDE0D0 0%, #F0E2C8 50%, #F5EFE6 100%)',
      }}
    >
      {/* Floating decorative rings */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-8 left-[10%] w-40 h-40 border border-gold/20 rounded-full animate-float" style={{ willChange: 'transform' }} />
        <div className="absolute top-12 left-[12%] w-24 h-24 border border-gold/15 rounded-full animate-float" style={{ willChange: 'transform', animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 right-[8%] w-56 h-56 border border-gold/15 rounded-full animate-float-slow" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-12 right-[12%] w-32 h-32 border border-gold/20 rounded-full animate-float-slow" style={{ willChange: 'transform', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-20 h-20 border border-gold/10 rounded-full animate-float-delay" style={{ willChange: 'transform' }} />
        <div className="absolute top-1/3 right-[20%] w-8 h-8 bg-gold/15 rounded-full animate-pulse-soft" />
        <div className="absolute bottom-1/3 left-[30%] w-4 h-4 bg-gold/20 rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8"
      >
        <motion.h2
          variants={fadeUpVariant}
          className="font-display text-4xl md:text-6xl font-bold text-espresso leading-tight max-w-3xl"
        >
          Start Your Wedding Story Today
        </motion.h2>

        <motion.p variants={fadeUpVariant} className="text-lg text-espresso/60 max-w-xl leading-relaxed">
          Join 10,000+ couples who chose Antara Studios to share their love story with the world — beautifully and digitally.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/create">
            <Button size="lg" variant="primary">Create Free Invitation</Button>
          </Link>
          <Link to="/templates">
            <Button size="lg" variant="outline">View Templates</Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
