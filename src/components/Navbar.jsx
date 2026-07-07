import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, LayoutGrid } from 'lucide-react'
import Button from './ui/Button'
import { fadeUpVariant, staggerContainer } from '../utils/animations'
import { useAuth } from '../context/AuthContext'
import { useAuthModal } from '../context/AuthModalContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Templates', to: '/templates' },
  { label: 'Pricing', to: '/pricing' },
]

function UserChip({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const initials = user.fullName
    ? user.fullName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 ring-espresso/15 hover:ring-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
          <span className="text-[9px] font-bold text-espresso">{initials}</span>
        </div>
        <span className="text-xs font-medium text-espresso/80 max-w-[80px] truncate hidden sm:block">
          {user.fullName}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="absolute right-0 top-full mt-2 w-48 bg-cream rounded-2xl ring-1 ring-espresso/10 shadow-lg shadow-espresso/10 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-espresso/8">
              <p className="text-xs font-semibold text-espresso truncate">{user.fullName}</p>
              <p className="text-[10px] text-espresso/40 truncate mt-0.5">{user.phone}</p>
            </div>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-medium text-espresso/70 hover:text-espresso hover:bg-warm-100 transition-colors duration-200"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              My Dashboard
            </Link>
            <button
              onClick={() => { setOpen(false); onLogout() }}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-medium text-espresso/70 hover:text-espresso hover:bg-warm-100 transition-colors duration-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const lastScrollY = useRef(0)
  const { user, logout } = useAuth()
  const { openAuthModal } = useAuthModal()

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

  function handleCreateClick(e) {
    if (!user) {
      e.preventDefault()
      openAuthModal({ mode: 'login', redirectAfter: '/create' })
    }
  }

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
        <Link to="/" className="flex items-baseline gap-1 flex-shrink-0 -translate-y-0.5">
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

        {/* Desktop CTA — auth-aware */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/create">
                <Button size="sm" variant="primary">Create Invitation</Button>
              </Link>
              <UserChip user={user} onLogout={logout} />
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal({ mode: 'login' })}
                className="text-sm font-medium text-espresso/70 hover:text-espresso transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
              >
                Sign In
              </button>
              <Link to="/create" onClick={handleCreateClick}>
                <Button size="sm" variant="primary">Create Invitation</Button>
              </Link>
            </>
          )}
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

              {user ? (
                <>
                  <motion.div variants={fadeUpVariant}>
                    <Link to="/create" onClick={() => setMenuOpen(false)}>
                      <Button size="lg" variant="primary">Create Invitation</Button>
                    </Link>
                  </motion.div>
                  <motion.div variants={fadeUpVariant}>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 text-sm font-medium text-espresso/60 hover:text-espresso transition-colors duration-300"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      My Dashboard
                    </Link>
                  </motion.div>
                  <motion.div variants={fadeUpVariant}>
                    <button
                      onClick={() => { setMenuOpen(false); logout() }}
                      className="flex items-center gap-2 text-sm font-medium text-espresso/60 hover:text-espresso transition-colors duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out ({user.fullName})
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={fadeUpVariant}>
                    <button
                      onClick={() => { setMenuOpen(false); openAuthModal({ mode: 'login' }) }}
                      className="font-display text-2xl font-medium text-espresso/60 hover:text-gold transition-colors duration-300"
                    >
                      Sign In
                    </button>
                  </motion.div>
                  <motion.div variants={fadeUpVariant}>
                    <Link to="/create" onClick={(e) => { setMenuOpen(false); handleCreateClick(e) }}>
                      <Button size="lg" variant="primary">Create Invitation</Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
