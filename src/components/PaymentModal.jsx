import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import Button from './ui/Button'

export default function PaymentModal({ templateId, templateName, price, onSuccess, onClose, onDismiss }) {
  const { user } = useAuth()
  const [status, setStatus] = useState('idle') // 'idle' | 'creating' | 'verifying' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  async function handlePay() {
    setStatus('creating')
    setErrorMsg(null)

    try {
      // 1. Create order on backend
      const res = await api.post('/payment/create-order', {
        amount: price,
        templateId,
      })
      const order = res.order

      // 2. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'Antara Studios',
        description: `${templateName} — Wedding Invitation Template`,
        prefill: {
          name: user?.fullName || '',
          contact: user?.phone || '',
        },
        theme: { color: '#C9A96E' },
        modal: {
          backdropclose: false,
          ondismiss: () => {
            // User closed the Razorpay popup without paying
            setStatus('idle')
            ;(onDismiss || onClose)()
          },
        },
        handler: async (response) => {
          // 3. Verify on backend
          setStatus('verifying')
          try {
            await api.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            setStatus('success')
            setTimeout(() => {
              onSuccess()
            }, 1200)
          } catch {
            setStatus('error')
            setErrorMsg('Payment verification failed. Contact support if money was deducted.')
          }
        },
      })

      rzp.on('payment.failed', (resp) => {
        setStatus('error')
        setErrorMsg(resp.error?.description || 'Payment failed. Please try again.')
      })

      rzp.open()
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Could not initiate payment. Please try again.')
    }
  }

  const isLoading = status === 'creating' || status === 'verifying'

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          key="payment-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[60] bg-espresso/50 backdrop-blur-sm"
          onClick={!isLoading ? onClose : undefined}
        />

        {/* Centering container */}
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 pointer-events-none">
          <motion.div
            key="payment-modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="w-full max-w-sm bg-cream rounded-[2rem] shadow-2xl shadow-espresso/20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-espresso/8">
              <div>
                <h2 className="font-display text-2xl font-bold text-espresso">Unlock Template</h2>
                <p className="text-sm text-espresso/50 mt-1">One-time purchase · 1 year access</p>
              </div>
              {!isLoading && (
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center text-espresso/60 hover:text-espresso hover:bg-warm-200 transition-all duration-200 flex-shrink-0 mt-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-5">

              {/* Template info */}
              <div className="flex items-center justify-between p-4 bg-warm-50 rounded-2xl ring-1 ring-espresso/8">
                <div>
                  <p className="text-xs text-espresso/50 mb-0.5">Template</p>
                  <p className="text-sm font-semibold text-espresso">{templateName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-espresso/50 mb-0.5">Amount</p>
                  <p className="font-display text-2xl font-bold text-espresso">
                    ₹{price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Success state */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <CheckCircle className="w-12 h-12 text-sage" strokeWidth={1.5} />
                  <div className="text-center">
                    <p className="font-semibold text-espresso">Payment Successful!</p>
                    <p className="text-xs text-espresso/50 mt-1">Unlocking your template…</p>
                  </div>
                </motion.div>
              )}

              {/* Error state */}
              {status === 'error' && errorMsg && (
                <div className="flex items-start gap-3 p-3.5 bg-red-50 rounded-xl ring-1 ring-red-200">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 leading-relaxed">{errorMsg}</p>
                </div>
              )}

              {/* CTA — hidden on success */}
              {status !== 'success' && (
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={handlePay}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {status === 'creating' ? 'Preparing…' : 'Verifying…'}
                    </span>
                  ) : (
                    `Pay ₹${price.toLocaleString('en-IN')} Securely`
                  )}
                </Button>
              )}

              {/* Trust note */}
              <div className="flex items-center justify-center gap-2 text-espresso/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[11px]">Secured by Razorpay · UPI, Cards, Net Banking</span>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  )
}
