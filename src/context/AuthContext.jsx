import { createContext, useContext, useState } from 'react'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
} from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase'
import { api } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('antara_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Internal state held between multi-step flows
  const [_verificationId, setVerificationId] = useState(null)
  const [_pendingCreds, setPendingCreds] = useState(null)

  function clearError() {
    setError(null)
  }

  // ─── Firebase reCAPTCHA / OTP helpers ───────────────────────────────────────

  function getOrCreateRecaptcha() {
    if (window._recaptchaVerifier) return window._recaptchaVerifier
    window._recaptchaVerifier = new RecaptchaVerifier(
      firebaseAuth,
      'recaptcha-container',
      { size: 'invisible' }
    )
    return window._recaptchaVerifier
  }

  function clearRecaptcha() {
    if (window._recaptchaVerifier) {
      try { window._recaptchaVerifier.clear() } catch {}
      window._recaptchaVerifier = null
    }
  }

  async function sendFirebaseOtp(phone) {
    clearRecaptcha()
    const recaptcha = getOrCreateRecaptcha()
    const provider = new PhoneAuthProvider(firebaseAuth)
    const verificationId = await provider.verifyPhoneNumber(phone, recaptcha)
    setVerificationId(verificationId)
    return verificationId
  }

  async function verifyFirebaseOtp(otp) {
    if (!_verificationId) throw new Error('No verification in progress. Please restart.')
    const credential = PhoneAuthProvider.credential(_verificationId, otp)
    const result = await signInWithCredential(firebaseAuth, credential)
    const idToken = await result.user.getIdToken()
    return idToken
  }

  // ─── LOGIN ──────────────────────────────────────────────────────────────────

  // Step 1: Validate credentials with backend, then send Firebase SMS OTP
  async function requestLoginOtp({ phone, password }) {
    setLoading(true)
    setError(null)
    try {
      // Validate credentials against backend — sets httpOnly cookies on success
      const data = await api.post('/auth/login', { phone, password })
      const loggedInUser = data.data.user

      localStorage.setItem('antara_user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      setPendingCreds({ phone, password })

      // Send Firebase OTP to the phone number
      await sendFirebaseOtp(phone)

      return { success: true }
    } catch (err) {
      const msg = err.message || 'Failed to sign in. Please check your credentials.'
      setError(msg)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP with Firebase, then link phone on backend
  async function verifyLoginOtp({ phone, otp }) {
    setLoading(true)
    setError(null)
    try {
      if (!/^\d{6}$/.test(otp)) {
        setError('Enter a valid 6-digit OTP.')
        return { success: false }
      }

      const idToken = await verifyFirebaseOtp(otp)

      // Link / confirm phone verification on backend
      await api.post('/auth/phone', { idToken })

      const updated = { ...user, phoneVerified: true }
      localStorage.setItem('antara_user', JSON.stringify(updated))
      setUser(updated)

      clearRecaptcha()
      return { success: true }
    } catch (err) {
      const msg = err.message || 'OTP verification failed. Please try again.'
      setError(msg)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // ─── REGISTER ───────────────────────────────────────────────────────────────

  // Step 1: Collect phone + password, send Firebase SMS OTP
  async function requestRegisterOtp({ phone, password }) {
    setLoading(true)
    setError(null)
    try {
      setPendingCreds({ phone, password })
      await sendFirebaseOtp(phone)
      return { success: true }
    } catch (err) {
      const msg = err.message || 'Failed to send OTP. Please try again.'
      setError(msg)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP with Firebase, store idToken for final step
  async function verifyRegisterOtp({ otp }) {
    setLoading(true)
    setError(null)
    try {
      if (!/^\d{6}$/.test(otp)) {
        setError('Enter a valid 6-digit OTP.')
        return { success: false }
      }

      const idToken = await verifyFirebaseOtp(otp)
      setPendingCreds((prev) => ({ ...prev, idToken }))

      return { success: true }
    } catch (err) {
      const msg = err.message || 'OTP verification failed. Please try again.'
      setError(msg)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Register on backend with fullName, then link phone, then auto-login
  async function completeRegistration({ phone, fullName }) {
    setLoading(true)
    setError(null)
    try {
      const { password, idToken } = _pendingCreds || {}

      if (!password) {
        throw new Error('Session expired. Please start registration again.')
      }

      // Create account on backend
      await api.post('/auth/register', { fullName, phone, password })

      // Link the verified phone number
      if (idToken) {
        await api.post('/auth/phone', { idToken })
      }

      // Auto-login to get JWT cookies set
      const loginData = await api.post('/auth/login', { phone, password })
      const newUser = { ...loginData.data.user, phoneVerified: !!idToken }

      localStorage.setItem('antara_user', JSON.stringify(newUser))
      setUser(newUser)

      clearRecaptcha()
      setPendingCreds(null)
      setVerificationId(null)

      return { success: true }
    } catch (err) {
      const msg = err.message || 'Registration failed. Please try again.'
      setError(msg)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // ─── LOGOUT ─────────────────────────────────────────────────────────────────

  async function logout() {
    try {
      await api.post('/auth/logout')
    } catch {
      // proceed with local logout even if server call fails
    }
    localStorage.removeItem('antara_user')
    setUser(null)
    clearRecaptcha()
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      requestLoginOtp,
      verifyLoginOtp,
      requestRegisterOtp,
      verifyRegisterOtp,
      completeRegistration,
      logout,
      clearError,
    }}>
      {/* Invisible reCAPTCHA anchor required by Firebase Phone Auth */}
      <div id="recaptcha-container" />
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
