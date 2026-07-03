import { Link } from 'react-router-dom'
import { Instagram, Youtube, Mail, MessageCircle, Heart } from 'lucide-react'

const templateLinks = [
  'Hindu Weddings',
  'Christian Weddings',
  'Muslim Nikah',
  'South Indian',
  'Destination Weddings',
  'Modern Minimal',
]

const companyLinks = [
  { label: 'About Us', to: '#' },
  { label: 'Blog', to: '#' },
  { label: 'Careers', to: '#' },
  { label: 'Contact', to: '#' },
]

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@antara.studio' },
]

export default function Footer() {
  return (
    <footer className="bg-warm-100 border-t border-espresso/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold italic text-espresso">Antara</span>
              <span className="font-sans text-sm font-light text-espresso/60 tracking-wide">Studios</span>
            </Link>
            <p className="text-sm text-espresso/60 leading-relaxed">
              Crafting Memories, Digitally. Premium digital wedding invitations for every culture and style.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-espresso/5 flex items-center justify-center text-espresso/50 hover:text-espresso hover:bg-espresso/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Templates Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso/40">Templates</h3>
            <ul className="flex flex-col gap-3">
              {templateLinks.map((label) => (
                <li key={label}>
                  <Link
                    to="/templates"
                    className="text-sm text-espresso/60 hover:text-espresso transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso/40">Company</h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-espresso/60 hover:text-espresso transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-espresso/40">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/919999999999"
                className="flex items-center gap-2 text-sm text-espresso/60 hover:text-espresso transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4 text-sage" strokeWidth={1.5} />
                WhatsApp Support
              </a>
              <a
                href="mailto:hello@antara.studio"
                className="flex items-center gap-2 text-sm text-espresso/60 hover:text-espresso transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-sage" strokeWidth={1.5} />
                hello@antara.studio
              </a>
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-espresso/40">
                  <span className="w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center text-sage text-[10px]">✓</span>
                  SSL Secured
                </div>
                <div className="flex items-center gap-2 text-xs text-espresso/40">
                  <span className="w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center text-sage text-[10px]">✓</span>
                  30-Day Guarantee
                </div>
                <div className="flex items-center gap-2 text-xs text-espresso/40">
                  <span className="w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center text-sage text-[10px]">✓</span>
                  10,000+ Happy Couples
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-espresso/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-espresso/40">
            &copy; {new Date().getFullYear()} Antara Studios. All rights reserved.
          </p>
          <p className="text-xs text-espresso/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-blush fill-blush" /> in India
          </p>
        </div>
      </div>
    </footer>
  )
}
