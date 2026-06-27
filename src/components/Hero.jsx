import { imageMap } from '../data/imageMap'
import { useImages } from '../context/useImages'

function Hero({ onOpenMenu, onOpenWhatsApp }) {
  const { getImageForSlot, getAltForSlot } = useImages()
  const heroSrc = getImageForSlot('hero-main-apron', imageMap.hero.src)
  const heroAlt = getAltForSlot('hero-main-apron', imageMap.hero.alt)

  return (
    <section id="top" className="hero-section">
      <div className="hero-media">
        <img src={heroSrc} alt={heroAlt} fetchPriority="high" />
      </div>
      <div className="hero-content reveal is-visible">
        <p className="eyebrow">Rand Airport, Germiston</p>
        <h1>Harvard Cafe</h1>
        <p className="hero-copy">
          Great food. Great views. A legendary airport atmosphere.
        </p>
        <div className="hero-actions">
          <button className="btn primary order-cta-button" type="button" onClick={onOpenMenu}>View Menu</button>
          <a className="btn" href="#contact">Find Us</a>
          <button className="btn ghost light" type="button" onClick={onOpenWhatsApp}>WhatsApp Us</button>
        </div>
      </div>
      <div className="terminal-strip" aria-label="Today at The Harvard Cafe">
        <span>Airport Views</span>
        <span>Warm Cafe Dining</span>
        <span>Family Friendly</span>
      </div>
    </section>
  )
}

export default Hero
