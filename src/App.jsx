import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import TemplatesPage from './pages/TemplatesPage'
import PricingPage from './pages/PricingPage'
import CreatePage from './pages/CreatePage'

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

  return (
    <>
      <ScrollToTop />
      {!isCreatePage && <Navbar />}

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
              <PageWrapper>
                <CreatePage />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      {!isCreatePage && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
