import { useEffect, useRef, useState } from 'react'
import functionImageOne from '../images/Function10.webp'
import functionImageTwo from '../images/Function15.webp'
import pizzaImage from '../images/Pizza2.webp'
import prawnsImage from '../images/Prawns.webp'
import ribsImage from '../images/Ribs.webp'
import seafoodComboImage from '../images/SeafoodCombo3.webp'
import sushiImage from '../images/Sushi.webp'
import { atmosphereCarouselImages, aviationCarouselImages, defaultGalleryImages as galleryImages } from '../data/galleryImages'

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
        <h2>A glimpse of the food, functions and café atmosphere.</h2>
      </div>
      <div className="gallery-grid">
        {galleryImages.map((item) =>
          item.id === 'gallery-1' ? (
            <FoodCarousel key={item.id} />
          ) : item.id === 'gallery-6' ? (
            <FunctionsGalleryCarousel key={item.id} />
          ) : item.id === 'gallery-9' ? (
            <AutomaticGalleryCarousel key={item.id} images={atmosphereCarouselImages} title="Garden & Bar Atmosphere" className="gallery-atmosphere-carousel" />
          ) : item.id === 'gallery-10' ? (
            <AutomaticGalleryCarousel key={item.id} images={aviationCarouselImages} title="Aviation Heritage" className="gallery-aviation-carousel" />
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

const functionCarouselImages = [
  { src: functionImageOne, alt: 'Function tables with flowers and green runners beside the apron' },
  { src: functionImageTwo, alt: 'Guests at a decorated function table beside the apron' },
]

function shuffleImages(sourceImages, previousImage) {
  const images = [...sourceImages]
  for (let index = images.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[images[index], images[other]] = [images[other], images[index]]
  }
  if (images.length > 1 && images[0].src === previousImage) {
    ;[images[0], images[1]] = [images[1], images[0]]
  }
  return images
}

function FunctionsGalleryCarousel() {
  return <AutomaticGalleryCarousel images={functionCarouselImages} title="Functions at The Harvard Café" className="gallery-functions-carousel" />
}

function AutomaticGalleryCarousel({ images, title, className }) {
  const [order] = useState(() => shuffleImages(images))
  const [activeImage, setActiveImage] = useState(order[0])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cycle = order
    let index = 0
    let timer

    const updateTimer = () => {
      window.clearInterval(timer)
      if (motion.matches) return
      timer = window.setInterval(() => {
        index += 1
        if (index === cycle.length) {
          cycle = shuffleImages(images, cycle[cycle.length - 1].src)
          index = 0
        }
        setActiveImage(cycle[index])
      }, 2000)
    }

    updateTimer()
    motion.addEventListener('change', updateTimer)
    return () => {
      window.clearInterval(timer)
      motion.removeEventListener('change', updateTimer)
    }
  }, [images, order])

  return (
    <figure className={className} data-reveal-child>
      <img src={activeImage.src} alt={activeImage.alt} loading="lazy" />
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
    </figure>
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
