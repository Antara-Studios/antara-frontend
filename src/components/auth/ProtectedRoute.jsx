import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAuthModal } from '../../context/AuthModalContext'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Wraps a route element. If the user is not logged in, opens the auth modal
 * and redirects them to home. After successful login the modal navigates to
 * the originally requested path.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const { openAuthModal } = useAuthModal()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      openAuthModal({ mode: 'login', redirectAfter: location.pathname })
      navigate('/', { replace: true })
    }
  }, [user])

  if (!user) return null

  return children
}
