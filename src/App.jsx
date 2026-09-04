import { useEffect, useState } from 'react'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FunctionsSection from './components/FunctionsSection'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import HistoryTimeline from './components/HistoryTimeline'
import MenuSection from './components/MenuSection'
import Offerings from './components/Offerings'
import SpecialsSection from './components/SpecialsSection'
import { contactDetails } from './data/contact'
import useScrollReveal from './hooks/useScrollReveal'
import './styles/global.css'

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

function PublicSite({ menuOnly = false }) {
  useScrollReveal()

  if (menuOnly) {
    return (
      <>
        <Header compact />
        <main>
          <MenuSection standalone />
          <ContactSection />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="quick-action-strip reveal-on-scroll reveal-up" aria-label="Quick actions">
          <a className="quick-action-button" href="#menu">View Menu</a>
          <a className="quick-action-button" href={contactDetails.phonePrimary.href}>Call</a>
          <a className="quick-action-button" href={contactDetails.email.href}>Email</a>
          <a className="quick-action-button" href={contactDetails.directions} target="_blank" rel="noreferrer">Directions</a>
        </section>
        <Offerings />
        <MenuSection />
        <SpecialsSection />
        <Gallery />
        <FunctionsSection />
        <HistoryTimeline />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const route = useHashRoute()
  const isAdminRoute = window.location.pathname.replace(/\/$/, '') === '/admin' || route === '#/admin'
  const [adminUnlocked, setAdminUnlocked] = useState(() => sessionStorage.getItem('harvard_gallery_access') === 'true')

  if (isAdminRoute) {
    return adminUnlocked ? (
      <AdminDashboard onLogout={() => setAdminUnlocked(false)} />
    ) : (
      <AdminLogin onLogin={() => setAdminUnlocked(true)} />
    )
  }

  if (route === '#/order' || route === '#/menu') {
    return <PublicSite menuOnly />
  }

  return <PublicSite />
}

export default App
