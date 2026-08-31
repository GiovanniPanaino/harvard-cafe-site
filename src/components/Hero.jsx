import { imageMap } from '../data/imageMap'

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-media">
        <img src={imageMap.hero.src} alt={imageMap.hero.alt} fetchPriority="high" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">Vintage aviation dining at Rand Airport</p>
        <h1>The Harvard Cafe</h1>
        <p className="hero-copy">
          Where time flies over warm plates, apron views, family breakfasts, and the unmistakable mood of
          South African aviation heritage.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#/order">Order Take Away</a>
          <a className="btn btn-secondary" href="#menu">View Menu</a>
          <a className="btn btn-outline" href="#bookings">Book a Table</a>
          <a className="btn btn-ghost" href="#functions">Functions</a>
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
