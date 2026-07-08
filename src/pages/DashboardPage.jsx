import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  LayoutGrid, FileText, Receipt, User,
  LogOut, ChevronRight, CalendarDays,
  Sparkles, ArrowRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { usePurchases } from '../hooks/usePurchases'

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function getInitials(name) {
  if (!name) return '?'
  return name.trim().split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

// Template name map — same IDs as templatePricing.js
const TEMPLATE_NAMES = {
  1: 'Royal Rajasthani', 2: 'Garden Bloom', 3: 'Emerald Nikah',
  4: 'Lotus Mandapam', 5: 'Seaside Vows', 6: 'Modern Minimal',
  7: 'Floral Romance', 8: 'Golden Heritage', 9: 'Sacred Union',
  10: 'Tropical Bliss', 11: 'Ivory Classic', 12: 'Velvet Luxe',
}

const TEMPLATE_GRADIENTS = {
  1: 'from-red-900 to-yellow-800',
  2: 'from-pink-200 to-rose-300',
  3: 'from-emerald-800 to-teal-700',
  4: 'from-yellow-700 to-amber-600',
  5: 'from-sky-700 to-cyan-500',
  6: 'from-stone-800 to-stone-600',
  7: 'from-rose-200 to-pink-300',
  8: 'from-amber-700 to-yellow-600',
  9: 'from-indigo-900 to-purple-800',
  10: 'from-teal-600 to-emerald-400',
  11: 'from-stone-200 to-stone-300',
  12: 'from-purple-900 to-pink-800',
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-warm-200/70 rounded-2xl ${className}`} />
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, subtitle, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center">
        <Icon className="w-9 h-9 text-espresso/20" strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-display text-lg font-bold text-espresso">{title}</p>
        <p className="text-sm text-espresso/50 mt-1 leading-relaxed max-w-[240px] mx-auto">{subtitle}</p>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-6 py-3 bg-espresso text-cream rounded-full text-sm font-semibold active:scale-[0.97] transition-transform duration-150"
        >
          {action}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ─── My Templates Tab ────────────────────────────────────────────────────────

function MyTemplatesTab({ purchases, loading, navigate }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => <Skeleton key={i} className="h-36" />)}
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <EmptyState
        icon={Sparkles}
        title="No templates yet"
        subtitle="Browse our collection and pick the perfect design for your wedding."
        action="Browse Templates"
        onAction={() => navigate('/templates')}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {purchases.map((purchase) => {
        const gradient = TEMPLATE_GRADIENTS[purchase.templateId] || 'from-espresso to-espresso-light'
        const name = TEMPLATE_NAMES[purchase.templateId] || `Template #${purchase.templateId}`
        const isExpired = purchase.expiresAt && new Date(purchase.expiresAt) <= new Date()

        return (
          <motion.div
            key={purchase.razorpayOrderId || purchase.templateId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl ring-1 ring-espresso/8 bg-cream"
          >
            {/* Gradient banner */}
            <div className={`h-20 bg-gradient-to-r ${gradient} relative`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <p className="font-display text-lg font-bold text-white leading-tight">{name}</p>
                {isExpired ? (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/80 text-white font-medium backdrop-blur-sm">
                    Expired
                  </span>
                ) : (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-sage/80 text-white font-medium backdrop-blur-sm">
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Card body */}
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-espresso/50">
                <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs">
                  {isExpired ? 'Expired' : 'Valid'} until {formatDate(purchase.expiresAt)}
                </span>
              </div>
              <button
                onClick={() => navigate('/create', { state: { preselectedTemplateId: purchase.templateId } })}
                disabled={isExpired}
                className="flex items-center gap-1.5 px-4 py-2 bg-espresso text-cream rounded-full text-xs font-semibold flex-shrink-0 disabled:opacity-40 active:scale-[0.97] transition-transform duration-150"
              >
                Create
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Invitations Tab ─────────────────────────────────────────────────────────

function InvitationsTab({ navigate }) {
  return (
    <EmptyState
      icon={FileText}
      title="No invitations yet"
      subtitle="Once you create an invitation, it will appear here for easy access and sharing."
      action="Create Invitation"
      onAction={() => navigate('/create')}
    />
  )
}

// ─── Order History Tab ───────────────────────────────────────────────────────

function OrderHistoryTab({ purchases, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2].map((i) => <Skeleton key={i} className="h-24" />)}
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="No orders yet"
        subtitle="Your purchase receipts will appear here after you buy a template."
      />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {purchases.map((purchase, idx) => {
        const name = TEMPLATE_NAMES[purchase.templateId] || `Template #${purchase.templateId}`
        const amount = purchase.amount ? `₹${(purchase.amount / 100).toLocaleString('en-IN')}` : '—'

        return (
          <motion.div
            key={purchase.razorpayOrderId || purchase.templateId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 bg-cream rounded-2xl ring-1 ring-espresso/8"
          >
            {/* Top row: name + amount */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-espresso truncate">{name}</p>
                <p className="text-xs text-espresso/45 mt-0.5">{formatDate(purchase.purchasedAt)}</p>
              </div>
              <p className="font-display text-lg font-bold text-espresso flex-shrink-0">{amount}</p>
            </div>

            {/* Bottom row: order ID + status */}
            <div className="flex items-center justify-between pt-3 border-t border-espresso/6">
              <p className="text-[11px] text-espresso/35 font-mono truncate max-w-[200px]">
                {purchase.razorpayOrderId || '—'}
              </p>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-sage/15 text-sage-dark font-semibold flex-shrink-0">
                Paid
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Account Tab ─────────────────────────────────────────────────────────────

function AccountTab({ user, onLogout }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Avatar + name hero */}
      <div className="flex items-center gap-4 p-5 bg-cream rounded-2xl ring-1 ring-espresso/8">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
          <span className="font-display text-lg font-bold text-espresso">
            {getInitials(user?.fullName)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-bold text-espresso truncate">
            {user?.fullName || 'Welcome'}
          </p>
          <p className="text-xs text-espresso/45 mt-0.5 truncate">{user?.phone || '—'}</p>
        </div>
      </div>

      {/* Profile details */}
      <div className="bg-cream rounded-2xl ring-1 ring-espresso/8 overflow-hidden">
        <div className="px-4 py-3 border-b border-espresso/6">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-espresso/35">
            Profile Details
          </p>
        </div>
        <div className="divide-y divide-espresso/6">
          <div className="px-4 py-3.5">
            <p className="text-[10px] uppercase tracking-widest text-espresso/35 mb-1">Full Name</p>
            <p className="text-sm font-medium text-espresso">{user?.fullName || '—'}</p>
          </div>
          <div className="px-4 py-3.5">
            <p className="text-[10px] uppercase tracking-widest text-espresso/35 mb-1">Phone</p>
            <p className="text-sm font-medium text-espresso">{user?.phone || '—'}</p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="p-4 bg-warm-100 rounded-2xl">
        <p className="text-xs text-espresso/50 leading-relaxed">
          To update your profile or get help, contact us at{' '}
          <a
            href="mailto:hello@antarastudios.online"
            className="text-gold font-medium"
          >
            hello@antarastudios.online
          </a>
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl ring-1 ring-espresso/15 text-sm font-semibold text-espresso/70 active:bg-warm-100 transition-colors duration-150"
      >
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'templates', label: 'Templates', icon: LayoutGrid },
  { id: 'invitations', label: 'Invitations', icon: FileText },
  { id: 'orders', label: 'Orders', icon: Receipt },
  { id: 'account', label: 'Account', icon: User },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('templates')
  const { user, logout } = useAuth()
  const { purchases, loading } = usePurchases()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">

      {/* ── Scrollable content ── */}
      <div className="flex-1 pb-4">
        <div className="max-w-2xl mx-auto px-4 pt-32 pb-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            >
              {activeTab === 'templates' && (
                <MyTemplatesTab purchases={purchases} loading={loading} navigate={navigate} />
              )}
              {activeTab === 'invitations' && <InvitationsTab navigate={navigate} />}
              {activeTab === 'orders' && (
                <OrderHistoryTab purchases={purchases} loading={loading} />
              )}
              {activeTab === 'account' && (
                <AccountTab user={user} onLogout={handleLogout} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom tab bar — sticky so it stays at bottom of viewport but
           never overlaps the footer; it scrolls away naturally when the
           footer comes into view because it lives in the normal flow ── */}
      <nav
        className="sticky bottom-0 z-40 bg-cream/95 backdrop-blur-xl border-t border-espresso/8"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="max-w-2xl mx-auto flex">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex-1 flex flex-col items-center gap-1 py-3 relative focus-visible:outline-none"
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${active ? 'text-espresso' : 'text-espresso/35'}`}
                  strokeWidth={active ? 2 : 1.5}
                />
                <span className={`text-[10px] font-semibold transition-colors duration-200 ${active ? 'text-espresso' : 'text-espresso/35'}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
