import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'

const faqs = [
  {
    question: 'How long does it take to create a digital wedding invitation?',
    answer: 'Most couples complete their invitation in under 30 minutes. With our step-by-step creation flow, you simply choose a template, enter your details, upload photos, and customize colors. Our AI assistant can even generate beautiful wording for you instantly.',
  },
  {
    question: 'Can I share my invitation on WhatsApp and social media?',
    answer: 'Absolutely! Every invitation gets a unique shareable link that works perfectly on WhatsApp, Instagram, Facebook, and email. You can also download a QR code for physical display at venues or event cards.',
  },
  {
    question: 'Is it possible to have multiple events in one invitation?',
    answer: 'Yes! Our Event Schedule module lets you include all ceremonies — Mehendi, Sangeet, Haldi, Wedding, Reception — with separate timings, venues, and dress codes. Each event can have its own map and directions.',
  },
  {
    question: 'Can guests RSVP directly from the digital invitation?',
    answer: 'Yes. Our built-in RSVP system lets guests confirm attendance, select meal preferences, and indicate dietary restrictions directly from the invitation. You receive real-time updates on your dashboard with guest counts and responses.',
  },
  {
    question: 'What happens after I publish my invitation?',
    answer: 'Your invitation goes live instantly at your unique link (e.g., antara.studio/invite/priya-arjun). You can continue editing it anytime — updates reflect for all guests who open the link. Premium users get analytics showing opens, locations, and RSVP rates.',
  },
  {
    question: 'Do you support regional languages?',
    answer: 'Yes! Antara Studios supports invitation creation in English, Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, and Punjabi. Our AI wording generator can produce elegant invitation text in any of these languages.',
  },
  {
    question: 'Is there a limit on how many people can view my invitation?',
    answer: 'No limits — ever. Whether 10 or 10,000 guests view your invitation, it stays fast and beautiful. Our infrastructure scales automatically. The invitation limits in our plans refer to how many separate wedding invitations you can create, not views.',
  },
  {
    question: 'What if I need help customizing my invitation?',
    answer: 'Our support team is available via WhatsApp chat for all customers. Premium and Elite plan holders get priority support with response times under 2 hours. Elite customers get a dedicated wedding concierge who can assist with full customization.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-warm-50" aria-label="FAQ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <SectionLabel
              badge="FAQ"
              heading="Frequently Asked Questions"
              align="left"
            />
            <p className="text-espresso/60 leading-relaxed -mt-8">
              Everything you need to know about creating your perfect digital wedding invitation with Antara Studios.
            </p>
            <a
              href="mailto:hello@antara.studio"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            >
              Still have questions? Contact us →
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-espresso/10 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset rounded-sm"
                >
                  <span className="text-sm font-semibold text-espresso leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-espresso/40 flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-espresso/60 leading-relaxed pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
