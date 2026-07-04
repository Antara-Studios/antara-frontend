import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'

export default function RegisterPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Already logged in — send to home
  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user])

  function handleSuccess() {
    navigate('/')
  }

  return (
    <main className="min-h-screen bg-warm-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-baseline gap-1">
            <span className="font-display text-3xl font-bold italic text-espresso">Antara</span>
            <span className="font-sans text-sm font-light text-espresso/60 tracking-wide">Studios</span>
          </Link>
          <p className="mt-3 text-espresso/50 text-sm">Create your account</p>
        </div>

        <div className="bg-cream rounded-[2rem] p-8 shadow-lg shadow-espresso/8 ring-1 ring-espresso/8">
          <RegisterForm onSuccess={handleSuccess} />

          <p className="text-center text-xs text-espresso/50 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
