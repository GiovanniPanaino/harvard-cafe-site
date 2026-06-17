import { useCallback, useEffect, useState } from 'react'
import { getBookings, getFunctionEnquiries, getOrders, getSpecials } from '../api/client'
import AdminPlaceholderPanel from './AdminPlaceholderPanel'
import BookingsPanel from './BookingsPanel'
import FunctionsPanel from './FunctionsPanel'
import MenuManager from './MenuManager'
import OrdersPanel from './OrdersPanel'
import PhotoManager from './PhotoManager'
import SpecialsPanel from './SpecialsPanel'

function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [bookings, setBookings] = useState([])
  const [functions, setFunctions] = useState([])
  const [specials, setSpecials] = useState([])
  const [lastUpdated, setLastUpdated] = useState('')
  const [error, setError] = useState('')

  const pendingCount =
    orders.filter((item) => item.status === 'pending').length +
    bookings.filter((item) => item.status === 'pending').length +
    functions.filter((item) => item.status === 'pending').length

  const notifyPending = useCallback(() => {
    // Placeholder for a future sound file or browser notification.
    if (pendingCount > 0) console.info('Pending restaurant items need attention.')
  }, [pendingCount])

  const refresh = useCallback(async () => {
    setError('')
    try {
      const [orderData, bookingData, functionData, specialData] = await Promise.all([
        getOrders(),
        getBookings(),
        getFunctionEnquiries().catch(() => ({ enquiries: [] })),
        getSpecials(),
      ])
      setOrders(orderData.orders || [])
      setBookings(bookingData.bookings || [])
      setFunctions(functionData.enquiries || [])
      setSpecials(specialData.specials || [])
      setLastUpdated(new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    } catch (refreshError) {
      setError(refreshError.message)
    }
  }, [])

  useEffect(() => {
    const firstRun = window.setTimeout(refresh, 0)
    const timer = window.setInterval(refresh, 10000)
    return () => {
      window.clearTimeout(firstRun)
      window.clearInterval(timer)
    }
  }, [refresh])

  useEffect(() => {
    notifyPending()
  }, [notifyPending])

  function logout() {
    localStorage.removeItem('harvard_admin_unlocked')
    window.location.reload()
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="eyebrow">Restaurant laptop view</p>
          <h1>Harvard Command Deck</h1>
        </div>
        <div className="admin-actions">
          <span className={pendingCount > 0 ? 'alert-badge active' : 'alert-badge'}>{pendingCount} pending</span>
          <button className="btn" type="button" onClick={refresh}>Manual refresh</button>
          <button className="btn ghost" type="button" onClick={logout}>Lock</button>
        </div>
      </header>
      {error && <p className="admin-error">{error}</p>}
      <p className="last-updated">Auto-refresh every 10 seconds. Last updated: {lastUpdated || 'loading'}</p>
      <div className="admin-grid">
        <OrdersPanel orders={orders} onUpdated={refresh} />
        <BookingsPanel bookings={bookings} onUpdated={refresh} />
        <FunctionsPanel enquiries={functions} />
        <SpecialsPanel specials={specials} />
        <MenuManager />
        <PhotoManager />
        <AdminPlaceholderPanel title="Airshow/Event Mode Placeholder" body="Future controls for event menus, VIP seating, platters, and pre-order capacity." />
        <AdminPlaceholderPanel title="Customer Database Placeholder" body="Future customer lookup, repeat-order insights, and opt-in marketing tags." />
        <AdminPlaceholderPanel title="Reports Snapshot Placeholder" body="Future revenue, order volume, booking conversion, and special-performance summaries." />
      </div>
    </main>
  )
}

export default AdminDashboard
