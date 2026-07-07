import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, FileText, Receipt, User, LogOut, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { usePurchases } from '../hooks/usePurchases'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const TABS = [
  { id: 'templates', label: 'My Templates', icon: LayoutGrid },
  { id: 'invitations', label: 'Invitations', icon: FileText },
  { id: 'orders', label: 'Order History', icon: Receipt },
  { id: 'account', label: 'Account', icon: User },
]

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-warm-100 rounded-2xl h-40" />
  )
}

function MyTemplatesTab({ purchases, loading }) {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center">
          <LayoutGrid className="w-7 h-7 text-espresso/30" />
        </div>
        <div>
          <p className="font-semibold text-espresso">No templates yet</p>
          <p className="text-sm text-espresso/50 mt-1">Browse our collection and pick your favourite.</p>
        </div>
        <Button size="sm" variant="primary" onClick={() => navigate('/templates')}>
          Browse Templates
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {purchases.map((purchase) => (
        <motion.div
          key={purchase.razorpayOrderId || purchase.templateId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 p-5 bg-cream rounded-2xl ring-1 ring-espresso/8"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-espresso text-sm">Template #{purchase.templateId}</p>
              <p className="text-xs text-espresso/40 mt-0.5">
                Valid until {formatDate(purchase.expiresAt)}
              </p>
            </div>
            <Badge variant="sage" className="text-[9px]">Active</Badge>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => navigate('/create', { state: { preselectedTemplateId: purchase.templateId } })}
          >
            Create Invitation
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

function InvitationsTab() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center">
        <FileText className="w-7 h-7 text-espresso/30" />
      </div>
      <div>
        <p className="font-semibold text-espresso">No invitations yet</p>
        <p className="text-sm text-espresso/50 mt-1">Create your first invitation to see it here.</p>
      </div>
      <Button size="sm" variant="primary" onClick={() => navigate('/create')}>
        <Plus className="w-4 h-4 mr-1" />
        Create Invitation
      </Button>
    </div>
  )
}

function OrderHistoryTab({ purchases, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse bg-warm-100 rounded-2xl h-16" />
        ))}
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center">
          <Receipt className="w-7 h-7 text-espresso/30" />
        </div>
        <p className="font-semibold text-espresso">No orders yet</p>
        <p className="text-sm text-espresso/50">Your purchase receipts will appear here.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="hidden sm:grid grid-cols-4 px-4 py-2 text-[10px] uppercase tracking-widest text-espresso/35 font-semibold">
        <span>Template</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Status</span>
      </div>
      {purchases.map((purchase) => (
        <div
          key={purchase.razorpayOrderId || purchase.templateId}
          className="grid grid-cols-2 sm:grid-cols-4 items-center gap-2 p-4 bg-cream rounded-2xl ring-1 ring-espresso/8"
        >
          <p className="text-sm font-medium text-espresso">Template #{purchase.templateId}</p>
          <p className="text-xs text-espresso/50 sm:col-span-1 text-right sm:text-left">
            {formatDate(purchase.purchasedAt)}
          </p>
          <p className="text-sm font-semibold text-espresso sm:text-right">
            {purchase.amount ? `₹${(purchase.amount / 100).toLocaleString('en-IN')}` : '—'}
          </p>
          <div className="sm:text-right">
            <Badge variant="sage" className="text-[9px]">Paid</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

function AccountTab({ user, onLogout }) {
  return (
    <div className="max-w-md flex flex-col gap-5">
      <div className="p-5 bg-cream rounded-2xl ring-1 ring-espresso/8 flex flex-col gap-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-espresso/35">Profile</h3>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-espresso/40 mb-1">Full Name</p>
            <p className="text-sm font-medium text-espresso">{user.fullName || '—'}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-espresso/40 mb-1">Phone</p>
            <p className="text-sm font-medium text-espresso">{user.phone || '—'}</p>
          </div>
        </div>
        <p className="text-xs text-espresso/40 leading-relaxed">
          To update your profile details, contact us at{' '}
          <a href="mailto:hello@antara.studio" className="text-gold hover:underline">
            hello@antara.studio
          </a>
        </p>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-5 py-3 rounded-2xl ring-1 ring-espresso/15 text-sm font-medium text-espresso/70 hover:text-espresso hover:ring-espresso/30 transition-all duration-200 w-fit"
      >
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </div>
  )
}

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
    <main className="pt-20 md:pt-24 min-h-screen bg-warm-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-espresso">My Dashboard</h1>
          <p className="text-espresso/50 mt-1 text-sm">Welcome back, {user?.fullName?.split(' ')[0] || 'there'}.</p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 p-1 bg-warm-100 rounded-2xl mb-8 overflow-x-auto hide-scrollbar">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap
                transition-all duration-300 flex-shrink-0
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
                ${activeTab === id
                  ? 'bg-espresso text-cream shadow-sm'
                  : 'text-espresso/60 hover:text-espresso'}
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            {activeTab === 'templates' && (
              <MyTemplatesTab purchases={purchases} loading={loading} />
            )}
            {activeTab === 'invitations' && <InvitationsTab />}
            {activeTab === 'orders' && (
              <OrderHistoryTab purchases={purchases} loading={loading} />
            )}
            {activeTab === 'account' && (
              <AccountTab user={user} onLogout={handleLogout} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
