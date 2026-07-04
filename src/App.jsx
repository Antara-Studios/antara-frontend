import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import TemplatesPage from './pages/TemplatesPage'
import PricingPage from './pages/PricingPage'
import CreatePage from './pages/CreatePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import { AuthModalProvider } from './context/AuthModalContext'
import AuthModal from './components/auth/AuthModal'
import ProtectedRoute from './components/auth/ProtectedRoute'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AppContent() {
  const location = useLocation()
  const isCreatePage = location.pathname === '/create'
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      <ScrollToTop />
      {!isCreatePage && !isAuthPage && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/templates"
            element={
              <PageWrapper>
                <TemplatesPage />
              </PageWrapper>
            }
          />
          <Route
            path="/pricing"
            element={
              <PageWrapper>
                <PricingPage />
              </PageWrapper>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <CreatePage />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <LoginPage />
              </PageWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <PageWrapper>
                <RegisterPage />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      {!isCreatePage && !isAuthPage && <Footer />}

      {/* Global auth modal — rendered at root so it's available everywhere */}
      <AuthModal />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthModalProvider>
          <AppContent />
        </AuthModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
