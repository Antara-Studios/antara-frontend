import { createContext, useContext, useState } from 'react'

const AuthModalContext = createContext(null)

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [redirectAfter, setRedirectAfter] = useState(null)

  function openAuthModal({ mode: initialMode = 'login', redirectAfter: redirect = null } = {}) {
    setMode(initialMode)
    setRedirectAfter(redirect)
    setIsOpen(true)
  }

  function closeAuthModal() {
    setIsOpen(false)
    setRedirectAfter(null)
  }

  function switchMode(newMode) {
    setMode(newMode)
  }

  return (
    <AuthModalContext.Provider value={{ isOpen, mode, redirectAfter, openAuthModal, closeAuthModal, switchMode }}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error('useAuthModal must be used inside AuthModalProvider')
  return ctx
}
