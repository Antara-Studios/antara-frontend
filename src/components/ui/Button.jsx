import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const variants = {
  primary: 'bg-espresso text-cream hover:bg-espresso-light',
  secondary: 'bg-gold text-espresso hover:bg-gold-light',
  ghost: 'bg-transparent text-espresso hover:bg-espresso/8',
  outline: 'bg-transparent text-espresso border border-espresso/30 hover:border-espresso/60 hover:bg-espresso/5',
}

const sizes = {
  sm: 'px-4 py-2 text-xs gap-2',
  md: 'px-5 py-2.5 text-sm gap-2.5',
  lg: 'px-6 py-3 text-sm gap-2.5 sm:px-8 sm:py-4 sm:text-base sm:gap-3',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={`
        group relative inline-flex items-center justify-between rounded-full font-medium
        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <span className="flex-1 text-left">{children}</span>
      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
        {icon || <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
      </span>
    </motion.button>
  )
}
