import { useState } from 'react'
import ExperienceSection from './components/ExperienceSection'
import FeaturedMenuPreview from './components/FeaturedMenuPreview'
import FinalCTASection from './components/FinalCTASection'
import Footer from './components/Footer'
import FunctionsBookings from './components/FunctionsBookings'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import LocationContactSection from './components/LocationContactSection'
import MessageModal from './components/MessageModal'
import MenuModal from './components/MenuModal'
import { ImageProvider } from './context/ImageContext'
import { useScrollReveal } from './hooks/useScrollReveal'
import './styles/global.css'

function PublicSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    mode: 'whatsapp',
    defaultSubject: 'Harvard Cafe Website Enquiry',
    defaultIntroMessage: '',
    instanceId: 0,
  })
  useScrollReveal()

  function openMessageModal(mode, options = {}) {
    setMessageModal({
      isOpen: true,
      mode,
      defaultSubject: options.defaultSubject || 'Harvard Cafe Website Enquiry',
      defaultIntroMessage: options.defaultIntroMessage || '',
      instanceId: Date.now(),
    })
  }

  function closeMessageModal() {
    setMessageModal((current) => ({ ...current, isOpen: false }))
  }

  return (
    <>
      <Header />
      <main className="home-page">
        <Hero onOpenMenu={() => setMenuOpen(true)} onOpenWhatsApp={() => openMessageModal('whatsapp')} />
        <ExperienceSection />
        <FeaturedMenuPreview
          onOpenMenu={() => setMenuOpen(true)}
          onOpenEmail={() => openMessageModal('email', { defaultSubject: 'Harvard Cafe Menu Request' })}
          onOpenWhatsApp={() => openMessageModal('whatsapp', { defaultIntroMessage: 'I would like to ask about the current menu.' })}
        />
        <FunctionsBookings
          onOpenEmail={() => openMessageModal('email', {
            defaultSubject: 'Function Booking Enquiry',
            defaultIntroMessage: 'I would like to enquire about a function or group booking.',
          })}
        />
        <Gallery />
        <LocationContactSection
          onOpenEmail={() => openMessageModal('email')}
          onOpenWhatsApp={() => openMessageModal('whatsapp')}
        />
        <FinalCTASection
          onOpenMenu={() => setMenuOpen(true)}
          onOpenEmail={() => openMessageModal('email')}
          onOpenWhatsApp={() => openMessageModal('whatsapp')}
        />
      </main>
      <Footer />
      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <MessageModal
        key={messageModal.instanceId}
        isOpen={messageModal.isOpen}
        mode={messageModal.mode}
        defaultSubject={messageModal.defaultSubject}
        defaultIntroMessage={messageModal.defaultIntroMessage}
        onClose={closeMessageModal}
      />
    </>
  )
}

function App() {
  return (
    <ImageProvider>
      <PublicSite />
    </ImageProvider>
  )
}

export default App
