import { useState, useEffect } from 'react'
import {
  ClipboardList, Timer, MapPin, Music, Image, QrCode,
  MessageCircle, Globe, Gift, Shirt, Hotel, Calendar,
  Users, Lock, BarChart2,
} from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel'
import useScrollReveal from '../hooks/useScrollReveal'

function useCounter(target, inView) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = (target / duration) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return count
}

function StatCounter({ value, label, suffix = '' }) {
  const { ref, inView } = useScrollReveal()
  const count = useCounter(value, inView)

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-display text-4xl md:text-5xl font-bold text-espresso">
        {count}{suffix}
      </span>
      <span className="text-sm text-espresso/50">{label}</span>
    </div>
  )
}

const smallFeatures = [
  { icon: Music, name: 'Background Music', desc: 'Set the mood with custom playlists' },
  { icon: Image, name: 'Photo Gallery', desc: 'Beautiful couple photo collections' },
  { icon: QrCode, name: 'QR Code', desc: 'Instant invitation sharing' },
  { icon: MessageCircle, name: 'WhatsApp Sharing', desc: 'One-tap invite forwarding' },
  { icon: Globe, name: 'Multilingual', desc: 'Invitations in 10+ languages' },
  { icon: Gift, name: 'Gift Registry', desc: 'Curated wishlist integration' },
  { icon: Shirt, name: 'Dress Code', desc: 'Visual attire guidance' },
  { icon: Hotel, name: 'Accommodation', desc: 'Hotel suggestions for guests' },
  { icon: Calendar, name: 'Event Schedule', desc: 'Full ceremony timeline' },
  { icon: Users, name: 'Family Introductions', desc: 'Meet both families section' },
  { icon: Lock, name: 'Password Protection', desc: 'Private invitations only' },
  { icon: BarChart2, name: 'Analytics', desc: 'Track opens and RSVPs' },
]

export default function Features() {
  return (
    <section className="py-32 bg-warm-50" aria-label="Platform Features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel
          badge="Platform Features"
          heading="Everything You Need"
          subheading="Optional modules — add only what matters to you"
          align="center"
        />

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 mb-16 py-10 border-y border-espresso/8">
          <StatCounter value={15} suffix="+" label="Modules" />
          <StatCounter value={50} suffix="+" label="Templates" />
          <StatCounter value={10000} suffix="+" label="Invitations Sent" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* RSVP Management — Large (col-span-2, row-span-2) */}
          <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-warm-200 to-champagne ring-1 ring-espresso/8 p-1.5 rounded-[2rem]">
            <div className="bg-cream/80 rounded-[calc(2rem-6px)] h-full p-6 flex flex-col gap-5">
              <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-espresso text-lg">RSVP Management</h3>
                <p className="text-sm text-espresso/60 mt-1 leading-relaxed">Real-time guest responses with meal preferences, dietary restrictions, and headcount tracking.</p>
              </div>
              {/* Mini RSVP table visual */}
              <div className="flex-1 rounded-xl bg-warm-50 border border-espresso/8 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-espresso/8 flex items-center gap-3 bg-warm-100/60">
                  <span className="text-[10px] uppercase tracking-widest text-espresso/40 font-semibold">Guest List</span>
                  <span className="ml-auto text-[10px] text-sage font-medium">24 confirmed</span>
                </div>
                {[
                  { name: 'Raj & Sunita Sharma', status: 'Attending', meal: 'Veg', color: 'text-sage' },
                  { name: 'Preet & Manpreet Kaur', status: 'Attending', meal: 'Non-veg', color: 'text-sage' },
                  { name: 'Amit Verma', status: 'Pending', meal: '—', color: 'text-gold' },
                  { name: 'Neha & Rahul Gupta', status: 'Declined', meal: '—', color: 'text-espresso/30' },
                ].map((guest, i) => (
                  <div key={i} className="px-4 py-2 flex items-center gap-3 border-b border-espresso/5 last:border-0">
                    <div className="w-6 h-6 rounded-full bg-espresso/8 flex items-center justify-center text-[9px] font-semibold text-espresso/40">
                      {guest.name[0]}
                    </div>
                    <span className="text-xs text-espresso/70 flex-1 truncate">{guest.name}</span>
                    <span className={`text-[10px] font-medium ${guest.color}`}>{guest.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Countdown Timer — Medium (col-span-2) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-espresso to-espresso-light ring-1 ring-white/5 p-1.5 rounded-[2rem]">
            <div className="rounded-[calc(2rem-6px)] h-full p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                <Timer className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-cream text-base">Countdown Timer</h3>
              <div className="flex items-center gap-3">
                {['32', '14', '08', '45'].map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-cream">{val}</span>
                    </div>
                    <span className="text-[9px] text-cream/40 uppercase tracking-widest">
                      {['Days', 'Hrs', 'Min', 'Sec'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Venue Map — Medium (col-span-2) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-sage/20 to-warm-100 ring-1 ring-espresso/8 p-1.5 rounded-[2rem]">
            <div className="bg-cream/60 rounded-[calc(2rem-6px)] h-full p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-sage/15 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sage" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-espresso text-base">Venue Map & Directions</h3>
              <div className="flex-1 rounded-xl bg-sage/10 border border-sage/20 p-4 flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-sage mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <div>
                    <p className="text-xs font-semibold text-espresso">The Grand Leela Palace</p>
                    <p className="text-[11px] text-espresso/50">Lake Pichola, Udaipur, Rajasthan 313001</p>
                  </div>
                </div>
                <div className="mt-auto flex gap-2">
                  <button className="flex-1 py-1.5 bg-sage text-white text-[10px] font-medium rounded-full">Google Maps</button>
                  <button className="flex-1 py-1.5 bg-espresso/8 text-espresso text-[10px] font-medium rounded-full">Apple Maps</button>
                </div>
              </div>
            </div>
          </div>

          {/* Small feature cards */}
          {smallFeatures.map(({ icon: Icon, name, desc }) => (
            <div key={name} className="bg-warm-100/60 ring-1 ring-espresso/8 p-1.5 rounded-[1.5rem]">
              <div className="bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] rounded-[calc(1.5rem-6px)] h-full p-4 flex flex-col gap-3">
                <div className="w-8 h-8 rounded-lg bg-espresso/5 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-espresso/50" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-espresso">{name}</h4>
                  <p className="text-[11px] text-espresso/50 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
