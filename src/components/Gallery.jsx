import { imageMap } from '../data/imageMap'
import { useImages } from '../context/useImages'

function Gallery() {
  const { getImageForSlot, getAltForSlot } = useImages()

  return (
    <section className="section gallery-preview-section dark-band" id="gallery">
      <div className="section-heading centered reveal">
        <p className="eyebrow">Gallery</p>
        <h2>Food, aircraft, apron light, and the Harvard Cafe atmosphere.</h2>
      </div>
      <div className="gallery-grid">
        {imageMap.gallery.map((item, index) => (
          <figure className="reveal" style={{ '--stagger': `${index * 70}ms` }} key={`${item.category}-${item.src}`}>
            <img src={getImageForSlot(`gallery-${index + 1}`, item.src)} alt={getAltForSlot(`gallery-${index + 1}`, item.alt)} loading="lazy" />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="section-actions reveal">
        <a className="btn primary" href="#gallery">View Gallery</a>
      </div>
    </section>
  )
}

export default Gallery
