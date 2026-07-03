import { motion } from 'framer-motion'

export default function Card({ children, hoverable = false, className = '', innerClassName = '' }) {
  const Wrapper = hoverable ? motion.div : 'div'

  const hoverProps = hoverable
    ? {
        whileHover: { y: -6, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
      }
    : {}

  return (
    <Wrapper
      {...hoverProps}
      className={`
        bg-warm-100/60 ring-1 ring-espresso/8 p-1.5 rounded-[2rem]
        ${hoverable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div
        className={`
          bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]
          rounded-[calc(2rem-6px)] h-full
          ${innerClassName}
        `}
      >
        {children}
      </div>
    </Wrapper>
  )
}
