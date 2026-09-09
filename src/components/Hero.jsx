import { contactDetails } from '../data/contact'
import nightGardenPoster from '../images/NightGarden.webp'
import heroFlybyVideo from '../videos/flyby.mp4'

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-media">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={nightGardenPoster}
          aria-hidden="true"
        >
          <source src={heroFlybyVideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero-content" data-reveal="fly-left">
        <p className="eyebrow">Rand Airport apron dining</p>
        <h1>The Harvard Café</h1>
        <p className="hero-copy">
          Where time flies. Eat, meet and unwind beside the runway at Rand Airport.
        </p>
        <div className="hero-actions" data-reveal-child>
          <a className="btn btn-primary" href="#menu">View Menu</a>
          <a className="btn btn-secondary hero-functions-link" href="#functions">Function Enquiries</a>
          <a className="btn btn-outline" href={contactDetails.directions} target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </div>
      <div className="terminal-strip" data-reveal="fade-up" aria-label="Today at The Harvard Café">
        <span data-reveal-child>Where Time Flies</span>
        <span data-reveal-child>Apron Seating</span>
        <span data-reveal-child>Family Friendly</span>
      </div>
    </section>
  )
}

export default Hero
