import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthModal } from '../../context/AuthModalContext'
import { useAuth } from '../../context/AuthContext'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import GoogleButton from './GoogleButton'

export default function AuthModal() {
  const { isOpen, mode, redirectAfter, closeAuthModal, switchMode } = useAuthModal()
  const { clearError } = useAuth()
  const navigate = useNavigate()
  const [showClassicForm, setShowClassicForm] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Clear auth errors and reset classic form toggle whenever modal opens or mode switches
  useEffect(() => {
    if (isOpen) {
      clearError()
      setShowClassicForm(false)
    }
  }, [isOpen, mode])

  function handleSuccess() {
    closeAuthModal()
    if (redirectAfter) {
      if (typeof redirectAfter === 'string') {
        navigate(redirectAfter)
      } else {
        navigate(redirectAfter.path, { state: redirectAfter.state })
      }
    }
  }

  function handleSwitchMode(newMode) {
    clearError()
    switchMode(newMode)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[60] bg-espresso/50 backdrop-blur-sm"
            onClick={closeAuthModal}
          />

          {/* Centering container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 pointer-events-none">
          {/* Modal panel */}
          <motion.div
            key="auth-modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="
              w-full max-w-md
              bg-cream rounded-[2rem] shadow-2xl shadow-espresso/20
              max-h-[90vh] overflow-y-auto
              pointer-events-auto
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-cream rounded-t-[2rem] px-6 pt-6 pb-4 flex items-start justify-between border-b border-espresso/8 z-10">
              <div>
                <h2 className="font-display text-2xl font-bold text-espresso">
                  Welcome
                </h2>
                <p className="text-sm text-espresso/50 mt-1">
                  Sign in or create your Antara Studios account
                </p>
              </div>
              <button
                onClick={closeAuthModal}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center text-espresso/60 hover:text-espresso hover:bg-warm-200 transition-all duration-200 flex-shrink-0 mt-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main content */}
            <div className="px-6 py-5 flex flex-col gap-4">

              {/* PRIMARY: Google button */}
              <GoogleButton onSuccess={handleSuccess} />

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-espresso/10" />
                <span className="text-[10px] uppercase tracking-widest text-espresso/30 font-semibold">or</span>
                <div className="flex-1 h-px bg-espresso/10" />
              </div>

              {/* Toggle to show classic phone+password form */}
              <button
                type="button"
                onClick={() => setShowClassicForm((v) => !v)}
                className="text-xs text-espresso/40 hover:text-espresso/70 transition-colors duration-200 text-center"
              >
                {showClassicForm ? 'Hide phone sign-in' : 'Use phone number instead'}
              </button>

              {/* Classic phone+password form — hidden by default */}
              <AnimatePresence>
                {showClassicForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Tab switcher */}
                    <div className="flex gap-1 p-1 bg-warm-100 rounded-full mb-4">
                      <button
                        onClick={() => handleSwitchMode('login')}
                        className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                          mode === 'login'
                            ? 'bg-espresso text-cream shadow-sm'
                            : 'text-espresso/60 hover:text-espresso'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => handleSwitchMode('register')}
                        className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                          mode === 'register'
                            ? 'bg-espresso text-cream shadow-sm'
                            : 'text-espresso/60 hover:text-espresso'
                        }`}
                      >
                        Register
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {mode === 'login' ? (
                        <motion.div
                          key="login-form"
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 16 }}
                          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                        >
                          <LoginForm onSuccess={handleSuccess} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="register-form"
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                        >
                          <RegisterForm onSuccess={handleSuccess} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer switch */}
                    <div className="pt-4 text-center">
                      <p className="text-xs text-espresso/50">
                        {mode === 'login' ? (
                          <>
                            Don&apos;t have an account?{' '}
                            <button
                              onClick={() => handleSwitchMode('register')}
                              className="text-gold font-semibold hover:underline"
                            >
                              Register
                            </button>
                          </>
                        ) : (
                          <>
                            Already have an account?{' '}
                            <button
                              onClick={() => handleSwitchMode('login')}
                              className="text-gold font-semibold hover:underline"
                            >
                              Sign In
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom padding */}
            <div className="pb-2" />
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
