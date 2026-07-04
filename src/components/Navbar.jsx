import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './ui/Button'
import { fadeUpVariant, staggerContainer } from '../utils/animations'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Templates', to: '/templates' },
  { label: 'Pricing', to: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? '-150%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className={`
          fixed top-3 md:top-6 z-50
          left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-max
          backdrop-blur-xl bg-cream/80 ring-1 ring-espresso/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3
          flex items-center justify-between md:justify-start gap-3 md:gap-8
          ${scrolled ? 'shadow-lg shadow-espresso/10 bg-cream/90 backdrop-blur-2xl' : ''}
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-baseline gap-1 flex-shrink-0">
          <span className="font-display text-xl font-bold italic text-espresso">Antara</span>
          <span className="font-sans text-sm font-light text-espresso/60 tracking-wide">Studios</span>
        </Link>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`
                text-sm font-medium transition-colors duration-300
                hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm
                ${location.pathname === link.to ? 'text-espresso' : 'text-espresso/60'}
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="/create">
            <Button size="sm" variant="primary">Create Invitation</Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden relative w-5 h-4 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
        >
          <span
            className={`
              absolute left-0 w-full h-0.5 bg-espresso rounded-full
              transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
              ${menuOpen ? 'top-[7px] rotate-45' : 'top-[3px]'}
            `}
          />
          <span
            className={`
              absolute left-0 w-full h-0.5 bg-espresso rounded-full
              transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
              ${menuOpen ? 'top-[7px] -rotate-45' : 'top-[9px]'}
            `}
          />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-3xl flex flex-col items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.div key={link.to} variants={fadeUpVariant} custom={i}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-medium text-espresso hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeUpVariant}>
                <Link to="/create" onClick={() => setMenuOpen(false)}>
                  <Button size="lg" variant="primary">Create Invitation</Button>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
