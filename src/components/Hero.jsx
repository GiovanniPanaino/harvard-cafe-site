import { useState } from 'react'
import { contactDetails } from '../data/contact'
import nightGardenPoster from '../images/NightGarden.webp'
import heroFlybyVideo from '../videos/HarvardFlyby-web.mp4'

function Hero() {
  const [videoState, setVideoState] = useState('loading')

  const handleVideoReady = () => {
    setVideoState((currentState) => currentState === 'error' ? currentState : 'ready')
  }

  const handleVideoError = (event) => {
    const video = event.currentTarget

    if (video.error && video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setVideoState('error')
    }
  }

  const handleSourceError = (event) => {
    const failedSource = event.currentTarget.src
    const video = event.currentTarget.parentElement

    window.setTimeout(() => {
      if (video?.currentSrc === failedSource && video.readyState === HTMLMediaElement.HAVE_NOTHING) {
        setVideoState('error')
      }
    }, 0)
  }

  return (
    <section id="top" className="hero-section">
      <div className="hero-media">
        <video
          className={`hero-video${videoState === 'ready' ? ' is-ready' : ''}${videoState === 'error' ? ' is-error' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={nightGardenPoster}
          aria-hidden="true"
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onPlaying={handleVideoReady}
          onError={handleVideoError}
        >
          <source src={heroFlybyVideo} type="video/mp4" onError={handleSourceError} />
        </video>
        {videoState === 'error' ? (
          <img
            className="hero-fallback-image"
            src={nightGardenPoster}
            alt=""
            aria-hidden="true"
          />
        ) : null}
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
