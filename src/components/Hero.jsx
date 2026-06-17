import { imageMap } from '../data/imageMap'
import { useImages } from '../context/ImageContext'

function Hero() {
  const { getImageForSlot, getAltForSlot } = useImages()
  const heroSrc = getImageForSlot('hero-main-apron', imageMap.hero.src)
  const heroAlt = getAltForSlot('hero-main-apron', imageMap.hero.alt)

  return (
    <section id="top" className="hero-section">
      <div className="hero-media">
        <img src={heroSrc} alt={heroAlt} fetchPriority="high" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">Vintage aviation dining at Rand Airport</p>
        <h1>The Harvard Cafe</h1>
        <p className="hero-copy">
          Where time flies over warm plates, apron views, family breakfasts, and the unmistakable mood of
          South African aviation heritage.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#menu">View Menu</a>
          <a className="btn" href="#bookings">Book a Table</a>
          <a className="btn" href="#takeaway">Order Takeaway</a>
          <a className="btn ghost" href="#functions">Functions</a>
        </div>
      </div>
      <div className="terminal-strip" aria-label="Today at The Harvard Cafe">
        <span>Ready for Takeoff</span>
        <span>Apron Seating</span>
        <span>Family Friendly</span>
      </div>
    </section>
  )
}

export default Hero
