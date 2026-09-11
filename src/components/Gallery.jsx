import { useEffect, useRef, useState } from 'react'
import pizzaImage from '../images/Pizza2.webp'
import prawnsImage from '../images/Prawns.webp'
import ribsImage from '../images/Ribs.webp'
import seafoodComboImage from '../images/SeafoodCombo3.webp'
import sushiImage from '../images/Sushi.webp'
import { defaultGalleryImages as galleryImages } from '../data/galleryImages'

const foodCarouselImages = [
  { src: pizzaImage, alt: 'Freshly prepared pizza at The Harvard Café' },
  { src: prawnsImage, alt: 'Prawn dish served at The Harvard Café' },
  { src: ribsImage, alt: 'Ribs served at The Harvard Café' },
  { src: sushiImage, alt: 'Sushi platter at The Harvard Café' },
  { src: seafoodComboImage, alt: 'Seafood combination platter at The Harvard Café' },
]

function Gallery() {
  return (
    <section className="section gallery-section" id="gallery" data-reveal="fade-up">
      <div className="section-heading">
        <p className="eyebrow">Gallery</p>
        <h2>A glimpse of the food, apron, aircraft and atmosphere.</h2>
      </div>
      <div className="gallery-grid">
        {galleryImages.slice(0, 10).map((item) =>
          item.id === 'gallery-1' ? (
            <FoodCarousel key={item.id} />
          ) : (
            <figure key={item.id} data-reveal-child>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.category}</span>
              </figcaption>
            </figure>
          ),
        )}
      </div>
    </section>
  )
}

function FoodCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isPaused || prefersReducedMotion) return undefined

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % foodCarouselImages.length)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused])

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + foodCarouselImages.length) % foodCarouselImages.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % foodCarouselImages.length)
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const distance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(distance) < 40) return
    if (distance > 0) showPrevious()
    else showNext()
  }

  const activeImage = foodCarouselImages[activeIndex]

  return (
    <figure
      className="gallery-carousel"
      data-reveal-child
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX
      }}
      onTouchEnd={handleTouchEnd}
    >
      <img
        className="gallery-carousel-image"
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        loading="lazy"
      />
      <figcaption>
        <strong>Food</strong>
        <span>From our kitchen</span>
      </figcaption>
    </figure>
  )
}

export default Gallery
