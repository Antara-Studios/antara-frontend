import { useState, useEffect, useCallback } from 'react'
import { api } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { isPaidTemplate } from '../data/templatePricing'

export function usePurchases() {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPurchases = useCallback(async () => {
    if (!user) {
      setPurchases([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await api.get('/payment/purchases')
      setPurchases(data.data || [])
    } catch (err) {
      // Gracefully handle if the endpoint doesn't exist yet
      setError(err.message)
      setPurchases([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchPurchases()
  }, [fetchPurchases])

  // Free templates are always accessible.
  // Paid templates require a non-expired purchase record.
  function hasAccess(templateId) {
    if (!isPaidTemplate(templateId)) return true
    const now = new Date()
    return purchases.some(
      (p) => Number(p.templateId) === Number(templateId) && new Date(p.expiresAt) > now
    )
  }

  return { purchases, loading, error, hasAccess, refetch: fetchPurchases }
}
