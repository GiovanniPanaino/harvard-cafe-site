import { useCallback, useEffect, useState } from 'react'
import { getBookings, getFunctionEnquiries, getSpecials } from '../api/client'
import AdminPlaceholderPanel from './AdminPlaceholderPanel'
import BookingsPanel from './BookingsPanel'
import FunctionsPanel from './FunctionsPanel'
import SpecialsPanel from './SpecialsPanel'

function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [functions, setFunctions] = useState([])
  const [specials, setSpecials] = useState([])
  const [lastUpdated, setLastUpdated] = useState('')
  const [error, setError] = useState('')

  const pendingCount =
    bookings.filter((item) => item.status === 'pending').length +
    functions.filter((item) => item.status === 'pending').length

  const notifyPending = useCallback(() => {
    // Placeholder for a future sound file or browser notification.
    if (pendingCount > 0) console.info('Pending restaurant items need attention.')
  }, [pendingCount])

  const refresh = useCallback(async () => {
    setError('')
    try {
      const [bookingData, functionData, specialData] = await Promise.all([
        getBookings(),
        getFunctionEnquiries().catch(() => ({ enquiries: [] })),
        getSpecials(),
      ])
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
        <BookingsPanel bookings={bookings} onUpdated={refresh} />
        <FunctionsPanel enquiries={functions} />
        <SpecialsPanel specials={specials} />
        {/* TODO xneelo: PHP photo upload to /uploads, persisted through /data/site-content.json with file locking and manager login. */}
        <AdminPlaceholderPanel title="Photo / Gallery Manager" body="Future compact upload rows for hero, gallery, functions, airshow, heritage and contact image slots." />
        {/* TODO xneelo: PDF upload/replace flow for store-level staff without cPanel access. */}
        <AdminPlaceholderPanel title="PDF Menu Manager" body="Future menu PDF replacement for store-level staff without cPanel access." />
        <AdminPlaceholderPanel title="Airshow Message Manager" body="Future controls for airshow banner copy, event-day contact links and featured image slot." />
        <AdminPlaceholderPanel title="Content Links / Settings" body="Future editing for phone, email, maps, trading hours and social links." />
      </div>
    </main>
  )
}

export default AdminDashboard
