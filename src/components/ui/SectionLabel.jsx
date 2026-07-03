import { motion } from 'framer-motion'
import Badge from './Badge'
import useScrollReveal from '../../hooks/useScrollReveal'
import { fadeUpVariant, staggerContainer } from '../../utils/animations'

export default function SectionLabel({
  badge,
  heading,
  subheading,
  align = 'center',
  badgeVariant = 'gold',
  className = '',
}) {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`
        flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-16
        ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}
        ${className}
      `}
    >
      {badge && (
        <motion.div variants={fadeUpVariant}>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUpVariant}
        className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-espresso leading-tight break-words"
      >
        {heading}
      </motion.h2>
      {subheading && (
        <motion.p
          variants={fadeUpVariant}
          className="text-espresso/60 text-lg max-w-2xl leading-relaxed"
        >
          {subheading}
        </motion.p>
      )}
    </motion.div>
  )
}
