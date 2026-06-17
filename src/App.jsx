import { useEffect, useMemo, useState } from 'react'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'
import AirshowSection from './components/AirshowSection'
import BookingForm from './components/BookingForm'
import CartPanel from './components/CartPanel'
import ContactSection from './components/ContactSection'
import DailySpecials from './components/DailySpecials'
import Footer from './components/Footer'
import FunctionsSection from './components/FunctionsSection'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import HistoryTimeline from './components/HistoryTimeline'
import MenuSection from './components/MenuSection'
import Offerings from './components/Offerings'
import TakeawayForm from './components/TakeawayForm'
import { ImageProvider } from './context/ImageContext'
import { MenuProvider } from './context/MenuContext'
import './styles/global.css'

function PublicSite() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.qty, 0), [cart])

  function addToCart(menuItem) {
    setCart((current) => {
      const existing = current.find((item) => item.id === menuItem.id)
      if (existing) {
        return current.map((item) => (item.id === menuItem.id ? { ...item, qty: item.qty + 1 } : item))
      }
      return [...current, { ...menuItem, qty: 1 }]
    })
    setCartOpen(true)
  }

  function updateQty(itemId, qty) {
    setCart((current) =>
      current
        .map((item) => (item.id === itemId ? { ...item, qty: Math.max(0, qty) } : item))
        .filter((item) => item.qty > 0),
    )
  }

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Offerings />
        <MenuSection onAddToCart={addToCart} />
        <DailySpecials />
        <FunctionsSection />
        <Gallery />
        <BookingForm />
        <TakeawayForm cart={cart} setCart={setCart} updateQty={updateQty} />
        <HistoryTimeline />
        <AirshowSection />
        <ContactSection />
      </main>
      <Footer />
      <CartPanel cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} updateQty={updateQty} />
    </>
  )
}

function App() {
  const [route, setRoute] = useState(() => ({
    hash: window.location.hash,
    pathname: window.location.pathname.replace(/\/$/, ''),
  }))
  const [adminUnlocked, setAdminUnlocked] = useState(() => localStorage.getItem('harvard_admin_unlocked') === 'true')
  const isAdminRoute = route.hash === '#/admin' || route.pathname === '/admin'

  useEffect(() => {
    function syncRoute() {
      setRoute({
        hash: window.location.hash,
        pathname: window.location.pathname.replace(/\/$/, ''),
      })
    }

    window.addEventListener('hashchange', syncRoute)
    window.addEventListener('popstate', syncRoute)
    return () => {
      window.removeEventListener('hashchange', syncRoute)
      window.removeEventListener('popstate', syncRoute)
    }
  }, [])

  if (isAdminRoute) {
    return (
      <MenuProvider>
        <ImageProvider>{adminUnlocked ? <AdminDashboard /> : <AdminLogin onLogin={() => setAdminUnlocked(true)} />}</ImageProvider>
      </MenuProvider>
    )
  }

  return (
    <MenuProvider>
      <ImageProvider>
        <PublicSite />
      </ImageProvider>
    </MenuProvider>
  )
}

export default App
