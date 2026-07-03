const variants = {
  gold: 'bg-gold text-espresso',
  sage: 'bg-sage text-white',
  glass: 'bg-white/10 backdrop-blur-sm text-espresso border border-espresso/10',
}

export default function Badge({ children, variant = 'gold', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1
        text-[10px] uppercase tracking-[0.2em] font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
