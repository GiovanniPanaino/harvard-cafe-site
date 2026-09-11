import { useEffect, useState } from 'react'
import apronSideAtmosphere from '../images/ApronSideAtmosphere.mp4'
import functionImageOne from '../images/Function10.webp'
import functionImageTwo from '../images/Function15.webp'
import harvardPlaneImage from '../images/HrvardPlane.webp'
import foodAndDrinks from '../videos/FoodAndDrinks.mp4'

const offerings = [
  ['Apron-side atmosphere', 'apron-video', 'Aircraft, open sky and Rand Airport energy.'],
  ['Food and drinks', 'food-video', 'Breakfasts, burgers, grills, coffee and drinks.'],
  ['Aviation heritage', 'harvard-plane', 'A bold cafe identity shaped by flight.'],
  ['Functions and events', 'functions-carousel', 'Birthdays, clubs, corporate days and celebrations.'],
]

const functionImages = [
  { src: functionImageOne, alt: 'Function setup at The Harvard Café' },
  { src: functionImageTwo, alt: 'Celebration setup at The Harvard Café' },
]

function Offerings() {
  return (
    <section className="section" id="offerings" data-reveal="fade-up">
      <div className="section-heading">
        <p className="eyebrow">Why Visit Harvard Café</p>
        <h2>Food, flight and gathering in one memorable setting.</h2>
      </div>
      <div className="feature-grid">
        {offerings.map(([title, mediaType, body]) => (
          <article className="feature-card image-feature-card" key={title} data-reveal-child>
            <OfferingMedia type={mediaType} />
            <div>
              <span className="feature-icon">*</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function OfferingMedia({ type }) {
  if (type === 'apron-video' || type === 'food-video') {
    const isApronVideo = type === 'apron-video'

    return (
      <video
        src={isApronVideo ? apronSideAtmosphere : foodAndDrinks}
        aria-label={isApronVideo ? 'Apron-side atmosphere at The Harvard Café' : 'Food and drinks at The Harvard Café'}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    )
  }

  if (type === 'functions-carousel') return <FunctionCarousel />

  return <img src={harvardPlaneImage} alt="Harvard aeroplane at Rand Airport" loading="lazy" />
}

function FunctionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % functionImages.length)
    }, 2000)

    return () => window.clearInterval(timer)
  }, [])

  const activeImage = functionImages[activeIndex]

  return (
    <div className="feature-function-carousel">
      <img key={activeImage.src} src={activeImage.src} alt={activeImage.alt} loading="lazy" />
    </div>
  )
}

export default Offerings
