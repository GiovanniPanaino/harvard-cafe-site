import { imageMap } from '../data/imageMap'
import { contactDetails } from '../data/contact'

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-media">
        <img src={imageMap.hero.src} alt={imageMap.hero.alt} fetchPriority="high" />
      </div>
      <div className="hero-content reveal-on-scroll reveal-left">
        <p className="eyebrow">Rand Airport apron dining</p>
        <h1>The Harvard Cafe</h1>
        <p className="hero-copy">
          Where time flies. Eat, meet and unwind beside the runway at Rand Airport.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#menu">View Menu</a>
          <a className="btn btn-secondary" href="#functions">Function Enquiries</a>
          <a className="btn btn-outline" href={contactDetails.directions} target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </div>
      <div className="terminal-strip reveal-on-scroll reveal-up" aria-label="Today at The Harvard Cafe">
        <span>Where Time Flies</span>
        <span>Apron Seating</span>
        <span>Family Friendly</span>
      </div>
    </section>
  )
}

export default Hero
