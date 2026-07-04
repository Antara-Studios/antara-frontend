import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import { fadeUpVariant, staggerContainer } from '../../utils/animations'

// accent="underline"        — SVG brush underline beneath the last word
// accent="underline:Word"   — SVG brush underline beneath a specific word
// accent="highlight"        — warm champagne block behind the last word
// accent="highlight:Word"   — warm champagne block behind a specific word
// accent="gradient"         — espresso-to-gold gradient across the full heading
// accent="asterisk"         — gold ornamental ✦ marks flanking the heading
// accent="italic:Word"      — target word in italic gold, slightly scaled up

function HeadingWithAccent({ heading, accent }) {
  if (accent?.startsWith('underline')) {
    const target = accent.includes(':') ? accent.split(':')[1] : null
    if (target) {
      const idx = heading.indexOf(target)
      if (idx === -1) return <>{heading}</>
      const before = heading.slice(0, idx)
      const after = heading.slice(idx + target.length)
      return (
        <>
          {before}
          <span className="relative inline-block">
            {target}
            <svg
              aria-hidden="true"
              viewBox="0 0 220 12"
              fill="none"
              className="absolute -bottom-3 left-0 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M4 8.5 C30 4, 70 11, 110 7 C150 3, 190 9, 216 6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-gold"
              />
            </svg>
          </span>
          {after}
        </>
      )
    }
    const words = heading.split(' ')
    const last = words.pop()
    return (
      <>
        {words.join(' ')}{' '}
        <span className="relative inline-block">
          {last}
          <svg
            aria-hidden="true"
            viewBox="0 0 220 12"
            fill="none"
            className="absolute -bottom-1 left-0 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M4 8.5 C30 4, 70 11, 110 7 C150 3, 190 9, 216 6"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-gold"
            />
          </svg>
        </span>
      </>
    )
  }

  if (accent?.startsWith('highlight')) {
    const target = accent.includes(':') ? accent.split(':')[1] : null
    if (target) {
      const idx = heading.indexOf(target)
      if (idx === -1) return <>{heading}</>
      const before = heading.slice(0, idx)
      const after = heading.slice(idx + target.length)
      return (
        <>
          {before}
          <span className="relative inline-block px-2">
            <span
              aria-hidden="true"
              className="absolute inset-0 -skew-x-2 rounded-sm bg-gold/20"
            />
            <span className="relative">{target}</span>
          </span>
          {after}
        </>
      )
    }
    const words = heading.split(' ')
    const last = words.pop()
    return (
      <>
        {words.join(' ')}{' '}
        <span className="relative inline-block px-2">
          <span
            aria-hidden="true"
            className="absolute inset-0 -skew-x-2 rounded-sm bg-gold/20"
          />
          <span className="relative">{last}</span>
        </span>
      </>
    )
  }

  if (accent === 'gradient') {
    return (
      <span
        className="bg-gradient-to-r from-espresso via-espresso to-gold bg-clip-text text-transparent"
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {heading}
      </span>
    )
  }

  if (accent === 'asterisk') {
    return (
      <span className="inline-flex items-center gap-3">
        <span aria-hidden="true" className="text-gold text-2xl sm:text-3xl leading-none select-none">✦</span>
        {heading}
        <span aria-hidden="true" className="text-gold text-2xl sm:text-3xl leading-none select-none">✦</span>
      </span>
    )
  }

  if (accent?.startsWith('italic:')) {
    const target = accent.split(':')[1]
    const idx = heading.indexOf(target)
    if (idx === -1) return <>{heading}</>
    const before = heading.slice(0, idx)
    const after = heading.slice(idx + target.length)
    return (
      <>
        {before}
        <span
          className="italic text-gold"
          style={{ fontStyle: 'italic' }}
        >
          {target}
        </span>
        {after}
      </>
    )
  }

  return <>{heading}</>
}

export default function SectionLabel({
  heading,
  subheading,
  align = 'center',
  accent,
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
      <motion.h2
        variants={fadeUpVariant}
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-espresso leading-tight tracking-tight break-words"
      >
        <HeadingWithAccent heading={heading} accent={accent} />
      </motion.h2>
      {subheading && (
        <motion.p
          variants={fadeUpVariant}
          className="text-espresso/50 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          {subheading}
        </motion.p>
      )}
    </motion.div>
  )
}
