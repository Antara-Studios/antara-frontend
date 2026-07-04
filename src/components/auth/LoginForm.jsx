import { useState, useRef, useEffect } from 'react'
import { Eye, EyeOff, Phone, Lock, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

// 6-box OTP input
function OtpInput({ value, onChange, disabled }) {
  const inputs = useRef([])

  function handleChange(i, e) {
    const digit = e.target.value.replace(/\D/g, '').slice(-1)
    const next = value.split('')
    next[i] = digit
    const joined = next.join('')
    onChange(joined)
    if (digit && i < 5) inputs.current[i + 1]?.focus()
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text) {
      onChange(text.padEnd(6, '').slice(0, 6))
      inputs.current[Math.min(text.length, 5)]?.focus()
    }
    e.preventDefault()
  }

  return (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          className={`
            w-11 h-12 text-center text-lg font-semibold text-espresso rounded-xl
            ring-1 bg-warm-50 outline-none transition-all duration-200
            focus:ring-2 focus:ring-gold disabled:opacity-50
            ${value[i] ? 'ring-gold bg-gold/5' : 'ring-espresso/15'}
          `}
        />
      ))}
    </div>
  )
}

const SLIDE = {
  initial: (dir) => ({ opacity: 0, x: dir * 32 }),
  animate: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -32 }),
  transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
}

export default function LoginForm({ onSuccess }) {
  const { requestLoginOtp, verifyLoginOtp, loading, error, clearError } = useAuth()
  const [step, setStep] = useState(1) // 1 = credentials, 2 = OTP
  const [dir, setDir] = useState(1)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [resendTimer, setResendTimer] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => setResendTimer((t) => t - 1), 1000)
    }
    return () => clearTimeout(timerRef.current)
  }, [resendTimer])

  function validateCredentials() {
    const errs = {}
    if (!phone.trim()) errs.phone = 'Phone number is required'
    else if (!/^\+?[0-9]{10,13}$/.test(phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid phone number'
    if (!password) errs.password = 'Password is required'
    return errs
  }

  async function handleCredentialsSubmit(e) {
    e.preventDefault()
    clearError()
    const errs = validateCredentials()
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return }
    setFieldErrors({})
    const result = await requestLoginOtp({ phone: phone.trim(), password })
    if (result.success) {
      setDir(1)
      setStep(2)
      setResendTimer(30)
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault()
    clearError()
    if (otp.length < 6) { setFieldErrors({ otp: 'Enter all 6 digits' }); return }
    setFieldErrors({})
    const result = await verifyLoginOtp({ phone: phone.trim(), otp })
    if (result.success && onSuccess) onSuccess()
  }

  async function handleResend() {
    clearError()
    setOtp('')
    await requestLoginOtp({ phone: phone.trim(), password })
    setResendTimer(30)
  }

  function goBack() {
    clearError()
    setDir(-1)
    setStep(1)
    setOtp('')
    setFieldErrors({})
  }

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait" custom={dir}>
        {step === 1 && (
          <motion.form
            key="login-creds"
            custom={dir}
            {...SLIDE}
            onSubmit={handleCredentialsSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm ring-1 ring-red-200">{error}</div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-espresso/50">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/30" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setFieldErrors((p) => ({ ...p, phone: undefined })) }}
                  placeholder="+91 99999 99999"
                  className={`w-full rounded-xl ring-1 bg-warm-50 pl-11 pr-4 py-3 text-sm text-espresso placeholder-espresso/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 ${fieldErrors.phone ? 'ring-red-400 bg-red-50' : 'ring-espresso/15'}`}
                />
              </div>
              {fieldErrors.phone && <p className="text-xs text-red-500">{fieldErrors.phone}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-espresso/50">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })) }}
                  placeholder="••••••••"
                  className={`w-full rounded-xl ring-1 bg-warm-50 pl-11 pr-11 py-3 text-sm text-espresso placeholder-espresso/30 focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 ${fieldErrors.password ? 'ring-red-400 bg-red-50' : 'ring-espresso/15'}`}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-espresso/30 hover:text-espresso/60 transition-colors duration-200" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-espresso text-cream text-sm font-semibold hover:bg-espresso/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold flex items-center justify-center gap-2">
              {loading ? <><div className="w-4 h-4 rounded-full border-2 border-cream/30 border-t-cream animate-spin" />Sending OTP...</> : 'Send OTP'}
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="login-otp"
            custom={dir}
            {...SLIDE}
            onSubmit={handleOtpSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <button type="button" onClick={goBack} className="flex items-center gap-1.5 text-xs text-espresso/50 hover:text-espresso transition-colors duration-200 self-start -mt-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <div className="text-center">
              <p className="text-sm text-espresso/60">OTP sent to</p>
              <p className="text-sm font-semibold text-espresso mt-0.5">{phone}</p>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm ring-1 ring-red-200">{error}</div>
            )}

            <div className="flex flex-col gap-2">
              <OtpInput value={otp} onChange={(v) => { setOtp(v); setFieldErrors((p) => ({ ...p, otp: undefined })) }} disabled={loading} />
              {fieldErrors.otp && <p className="text-xs text-red-500 text-center">{fieldErrors.otp}</p>}
            </div>

            <button type="submit" disabled={loading || otp.length < 6} className="w-full py-3 rounded-xl bg-espresso text-cream text-sm font-semibold hover:bg-espresso/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold flex items-center justify-center gap-2">
              {loading ? <><div className="w-4 h-4 rounded-full border-2 border-cream/30 border-t-cream animate-spin" />Verifying...</> : 'Verify & Sign In'}
            </button>

            <p className="text-center text-xs text-espresso/50">
              {resendTimer > 0 ? (
                <>Resend OTP in <span className="font-semibold text-espresso/70">{resendTimer}s</span></>
              ) : (
                <button type="button" onClick={handleResend} className="text-gold font-semibold hover:underline">Resend OTP</button>
              )}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
