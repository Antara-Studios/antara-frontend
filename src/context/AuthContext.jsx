import { createContext, useContext, useState } from 'react'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPopup,
} from 'firebase/auth'
import { firebaseAuth, googleProvider } from '../utils/firebase'
import { api, setAccessToken, clearAccessToken } from '../utils/api'

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

  // ─── Error message mapper ────────────────────────────────────────────────────

  function friendlyError(err) {
    const code = err?.code || ''

    // Firebase error codes → plain English
    const firebaseMap = {
      'auth/invalid-phone-number':       'Please enter a valid 10-digit phone number (e.g. +91 98765 43210).',
      'auth/too-many-requests':          'Too many attempts. Please wait a few minutes and try again.',
      'auth/invalid-verification-code':  'Incorrect OTP. Please check the code and try again.',
      'auth/code-expired':               'OTP has expired. Please request a new one.',
      'auth/missing-phone-number':       'Phone number is required.',
      'auth/quota-exceeded':             'SMS limit reached. Please try again later.',
      'auth/user-disabled':              'This account has been disabled. Please contact support.',
      'auth/network-request-failed':     'Network error. Please check your connection and try again.',
      'auth/captcha-check-failed':       'Security check failed. Please refresh the page and try again.',
      'auth/missing-verification-code':  'Please enter the OTP sent to your phone.',
      'auth/popup-closed-by-user':        'Sign-in was cancelled. Please try again.',
      'auth/popup-blocked':               'Pop-up was blocked. Please allow pop-ups for this site.',
      'auth/cancelled-popup-request':     '',
    }
    if (firebaseMap[code]) return firebaseMap[code]

    // Backend HTTP errors — map status codes to helpful messages
    const status = err?.status
    const backendMsg = err?.message
    if (status === 401) return backendMsg || 'Incorrect phone number or password. Please try again.'
    if (status === 404) return 'No account found with this phone number. Please register first.'
    if (status === 409) return 'An account with this phone number already exists. Please sign in instead.'
    if (status === 400) return backendMsg || 'Please check your details and try again.'
    if (status >= 500)  return 'Server error. Please try again in a moment.'

    // Pass through any other message as-is
    return backendMsg || 'Something went wrong. Please try again.'
  }

  // ─── Phone number normaliser ─────────────────────────────────────────────────

  function normalisePhone(raw) {
    // Strip all spaces and dashes
    const digits = raw.replace(/[\s\-]/g, '')
    // Already has + prefix — return as-is
    if (digits.startsWith('+')) return digits
    // 10-digit Indian number — prepend +91
    if (/^\d{10}$/.test(digits)) return `+91${digits}`
    // Has country code without + (e.g. 919876543210)
    if (/^\d{12}$/.test(digits)) return `+${digits}`
    return digits
  }

  // ─── Firebase reCAPTCHA / OTP helpers ───────────────────────────────────────

  function clearRecaptcha() {
    if (window._recaptchaVerifier) {
      try { window._recaptchaVerifier.clear() } catch {}
      window._recaptchaVerifier = null
    }
    const container = document.getElementById('recaptcha-container')
    if (container) container.innerHTML = ''
  }

  async function sendFirebaseOtp(phone) {
    // Always destroy and recreate — never reuse a previous verifier
    clearRecaptcha()
    const recaptcha = new RecaptchaVerifier(
      firebaseAuth,
      'recaptcha-container',
      { size: 'invisible' }
    )
    window._recaptchaVerifier = recaptcha
    const provider = new PhoneAuthProvider(firebaseAuth)
    const verificationId = await provider.verifyPhoneNumber(normalisePhone(phone), recaptcha)
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
      // Validate credentials against backend
      const data = await api.post('/auth/login', { phone, password })
      const loggedInUser = data.data.user

      // Store access token in memory for Bearer auth
      if (data.data.accessToken) setAccessToken(data.data.accessToken)

      localStorage.setItem('antara_user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      setPendingCreds({ phone, password })

      // Send Firebase OTP to the phone number
      await sendFirebaseOtp(phone)

      return { success: true }
    } catch (err) {
      setError(friendlyError(err))
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
      setError(friendlyError(err))
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
      setError(friendlyError(err))
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
      setError(friendlyError(err))
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

      // Auto-login to get access token
      const loginData = await api.post('/auth/login', { phone, password })
      const newUser = { ...loginData.data.user, phoneVerified: !!idToken }

      // Store access token in memory for Bearer auth
      if (loginData.data.accessToken) setAccessToken(loginData.data.accessToken)

      localStorage.setItem('antara_user', JSON.stringify(newUser))
      setUser(newUser)

      clearRecaptcha()
      setPendingCreds(null)
      setVerificationId(null)

      return { success: true }
    } catch (err) {
      setError(friendlyError(err))
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // ─── GOOGLE SIGN-IN ─────────────────────────────────────────────────────────

  async function signInWithGoogle() {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider)
      const idToken = await result.user.getIdToken()
      const data = await api.post('/auth/google', { idToken })
      const googleUser = data.data.user

      // Store access token in memory for Bearer auth
      if (data.data.accessToken) setAccessToken(data.data.accessToken)

      localStorage.setItem('antara_user', JSON.stringify(googleUser))
      setUser(googleUser)
      return { success: true, isNewUser: data.data.isNewUser }
    } catch (err) {
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        return { success: false }
      }
      setError(friendlyError(err))
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // ─── LOGOUT ─────────────────────────────────────────────────────────────────

  async function logout() {
    clearAccessToken()
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
      signInWithGoogle,
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
